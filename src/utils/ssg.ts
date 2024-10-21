import { IndexForecastRow, IndexGrowthRow } from '../constants';

export const calculateSSG = (olsSSG: any) => {
  var ssg = { ...olsSSG };

  // Historical Data Calculations

  ssg.revenueGrowth = getGrowth(ssg.revenue);

  ssg.preTaxNetIncome = getDivision(ssg.netProfit, getCompliment(ssg.incomeTaxRate));

  ssg.preTaxIncomeGrowth = getGrowth(ssg.preTaxNetIncome);

  ssg.preTaxProfitMargin = getDivision(ssg.preTaxNetIncome, ssg.revenue);

  ssg.epsGrowth = getGrowth(ssg.eps);

  ssg.highPERatio = getDivision(ssg.highStockPrice, ssg.eps);

  ssg.lowPERatio = getDivision(ssg.lowStockPrice, ssg.eps);

  ssg.dividendGrowth = getGrowth(ssg.dividendPerShare);

  ssg.dividendPayout = getDivision(ssg.dividendPerShare, ssg.eps)
                        .map((payout: number) => (payout > 0) ? payout : NaN);
  
  ssg.highYield = getDivision(ssg.dividendPerShare, ssg.lowStockPrice);

  ssg.outstandingShareGrowth = getGrowth(ssg.outstandingShares);

  // Default Forecast Operations (5 Years Forward)

  ssg.fcRevenueGrowthDefault = forecastRevenueGrowth(ssg.yearsOfData, ssg.revenue, ssg.revenueGrowth);
  
  ssg.fcPreTaxProfitMarginDefault = forecastPreTaxProfitMargin(ssg.yearsOfData, ssg.preTaxProfitMargin);
  
  ssg.fcIncomeTaxRateDefault = forecastIncomeTaxRate(ssg.yearsOfData, ssg.incomeTaxRate);
  
  ssg.fcOutstandingShareGrowthDefault = forecastOutstandingSharesGrowth(ssg.yearsOfData, ssg.outstandingShareGrowth);
  
  ssg.fcPERatioDefault = forecastPERatio(ssg.startingYear, ssg.highPERatio, ssg.lowPERatio);

  // Forecast Calculations (Default and User-Entered Values)

  // TODO: Make base case project for each year
  ssg.fcRevenueDefault = getFiveYearAfterGrowth(ssg.revenue[9], ssg.fcRevenueGrowthDefault);
  ssg.fcRevenue = getFiveYearAfterGrowth(ssg.revenue[9], ssg.fcRevenueGrowth);

  ssg.fcPreTaxNetIncomeDefault = getMultiplication(ssg.fcRevenueDefault, ssg.fcPreTaxProfitMarginDefault);
  ssg.fcPreTaxNetIncome = getMultiplication(ssg.fcRevenue, ssg.fcPreTaxProfitMargin);

  ssg.fcNetProfitDefault = getMultiplication(ssg.fcPreTaxNetIncomeDefault, getCompliment(ssg.fcIncomeTaxRateDefault));
  ssg.fcNetProfit = getMultiplication(ssg.fcPreTaxNetIncome, getCompliment(ssg.fcIncomeTaxRate));

  ssg.fcOutstandingSharesDefault = getFiveYearAfterGrowth(ssg.outstandingShares[9], ssg.fcOutstandingShareGrowthDefault);
  ssg.fcOutstandingShares = getFiveYearAfterGrowth(ssg.outstandingShares[9], ssg.fcOutstandingShareGrowth);

  // TODO: Make base case project for each year
  ssg.fcEPSDefault = getDivision(ssg.fcNetProfitDefault, ssg.fcOutstandingSharesDefault);
  ssg.fcEPS = getDivision(ssg.fcNetProfit, ssg.fcOutstandingShares);
  
  ssg.fcEPSGrowthDefault = getFiveYearGrowth(ssg.eps[9], ssg.fcEPSDefault);
  ssg.fcEPSGrowth = getFiveYearGrowth(ssg.eps[9], ssg.fcEPS);

  // TODO: Make downside, base, and upside project for each year
  ssg.fcStockPriceDefault = getMultiplication(ssg.fcEPSDefault, ssg.fcPERatioDefault);
  ssg.fcStockPrice = getMultiplication(ssg.fcEPS, ssg.fcPERatio);

  ssg.fcTotalStockPriceGrowthDefault = getTotalFiveYearGrowth(ssg.currentStockPrice, ssg.fcStockPriceDefault);
  ssg.fcTotalStockPriceGrowth = getTotalFiveYearGrowth(ssg.currentStockPrice, ssg.fcStockPrice);

  ssg.fcAnnualStockPriceGrowthDefault = getFiveYearGrowth(ssg.currentStockPrice, ssg.fcStockPriceDefault);
  ssg.fcAnnualStockPriceGrowth = getFiveYearGrowth(ssg.currentStockPrice, ssg.fcStockPrice);

  ssg.currentDividendYield = Array(3).fill((ssg.currentDividend / ssg.currentStockPrice));

  ssg.fcTotalAnnualReturnDefault = getAddition(ssg.fcAnnualStockPriceGrowthDefault, ssg.currentDividendYield);
  ssg.fcTotalAnnualReturn = getAddition(ssg.fcAnnualStockPriceGrowth, ssg.currentDividendYield);

  return ssg;
};

const getCompliment = (taxRateRow: number[]) => taxRateRow.map((taxRate: number) => 1 - taxRate);

const getGrowth = (dataRow: number[]) => {
  return IndexGrowthRow.map((idx: number) => 
    (dataRow[idx] > 0)
      ? (dataRow[idx + 1] / dataRow[idx]) - 1
      : NaN
  );
};

const getDivision = (dataRow1: number[], dataRow2: number[]) => {
  return Array(dataRow1.length).fill(NaN).map((_, idx: number) => dataRow1[idx] / dataRow2[idx]);
};

const getAddition = (dataRow1: number[], dataRow2: number[]) => {
  return IndexForecastRow.map((idx: number) => dataRow1[idx] + dataRow2[idx]);
};

const getMultiplication = (dataRow1: number[], dataRow2: number[]) => {
  return IndexForecastRow.map((idx: number) => dataRow1[idx] * dataRow2[idx]);
};

const getFiveYearAfterGrowth = (latest: number, fcGrowthRow: number[]) => {
  return IndexForecastRow.map((idx: number) => latest * ((1 + fcGrowthRow[idx]) ** 5));
};

const getFiveYearGrowth = (latest: number, fcDataRow: number[]) => {
  return IndexForecastRow.map((idx: number) => ((fcDataRow[idx] / latest) ** 0.2) - 1);
};

const getTotalFiveYearGrowth = (latest: number, fcDataRow: number[]) => {
  return IndexForecastRow.map((idx: number) => (fcDataRow[idx] / latest) - 1);
};

const forecastRevenueGrowth = (yearsOfData: number, revenue: number[], revenueGrowth: number[]) => {
  var latestRevenue = revenue.slice(-Math.min(5, yearsOfData) - 1);
  
  var base = ((latestRevenue.at(-1) / latestRevenue[0]) ** (1 / Math.min(5, yearsOfData))) - 1;

  var downside = (yearsOfData > 5)
    ? ((latestRevenue.at(-1) / latestRevenue[0] / (1 + max(revenueGrowth.slice(-5)))) ** 0.25) - 1
    : NaN;

  var upside = (yearsOfData > 5)
    ? ((latestRevenue.at(-1) / latestRevenue[0] / (1 + min(revenueGrowth.slice(-5)))) ** 0.25) - 1
    : NaN;

  return [ downside, base, upside ];
};

const forecastPreTaxProfitMargin = (yearsOfData: number, preTaxProfitMargin: number[]) => {
  var latestProfitMargin = preTaxProfitMargin.slice(-Math.min(5, yearsOfData));
  
  var base = sum(latestProfitMargin) / latestProfitMargin.length;
  
  var downside = (yearsOfData > 5)
    ? (sum(latestProfitMargin) - max(latestProfitMargin)) / 4
    : NaN;

  var upside = (yearsOfData > 5)
    ? (sum(latestProfitMargin) - min(latestProfitMargin)) / 4
    : NaN;

  return [ downside, base, upside ];
};

const forecastIncomeTaxRate = (yearsOfData: number, incomeTaxRate: number[]) => {
    var latestTaxRate = incomeTaxRate.slice(-Math.min(5, yearsOfData));
  
    var base = median(latestTaxRate);
  
    return Array(3).fill(base);
};

const forecastOutstandingSharesGrowth = (yearsOfData: number, outstandingShareGrowth: number[]) => {
  var latestShareGrowth = outstandingShareGrowth.slice(-Math.min(5, yearsOfData) + 1);
  
  var base = Math.max(-0.05, Math.min(0.05, sum(latestShareGrowth) / latestShareGrowth.length));

  var downside = (yearsOfData > 5)
    ? Math.min(0.05, (sum(latestShareGrowth) - min(latestShareGrowth)) / 3)
    : NaN;

  var upside = (yearsOfData > 5)
    ? Math.max(-0.05, (sum(latestShareGrowth) - max(latestShareGrowth)) / 3)
    : NaN;

  return [ downside, base, upside ];
};

const forecastPERatio = (yearsOfData: number, highStockPrice: number[], lowStockPrice: number[]) => {
  var latestHighPrice = sort(highStockPrice.slice(-Math.min(5, yearsOfData)));
  var latestLowPrice = sort(lowStockPrice.slice(-Math.min(5, yearsOfData)));

  var latestHighPriceExcludingBest = latestHighPrice.slice(0, latestHighPrice.length - 1);
  var base = Math.min(40, median(latestHighPriceExcludingBest));

  var latestLowPricExcludingBest = latestLowPrice.slice(0, latestLowPrice.length - 1);
  var downside = Math.min(20, median(latestLowPricExcludingBest));

  var latestHighPricExcludingWorst = latestHighPrice.slice(1, latestHighPrice.length);
  var upside = Math.min(60, median(latestHighPricExcludingWorst));

  return [ downside, base, upside ];
};

export const sort = (dataRow: number[]) => dataRow.toSorted((a, b) => a - b);

export const max = (dataRow: number[]) => Math.max(...dataRow);

export const min = (dataRow: number[]) => Math.min(...dataRow);

export const sum = (dataRow: number[]) => dataRow.reduce((a, b) => a + b);

export const median = (dataRow: number[]) => {
  var sortedRow = sort(dataRow);
  var idx = Math.floor(sortedRow.length / 2);

  return sortedRow.length % 2 !== 0
    ? sortedRow[idx]
    : (sortedRow[idx] + sortedRow[idx - 1]) / 2;
};