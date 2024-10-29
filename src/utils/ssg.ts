import { IndexForecastRow, IndexGrowthRow } from '../constants';

export const calculateSSG = (ssg: any) => {
  var updatedSSG = { ...ssg };

  // Historical Data Calculations

  updatedSSG.revenueGrowth = getGrowth(updatedSSG.revenue);

  updatedSSG.preTaxNetIncome = getDivision(updatedSSG.netProfit, getCompliment(updatedSSG.incomeTaxRate));

  updatedSSG.preTaxIncomeGrowth = getGrowth(updatedSSG.preTaxNetIncome);

  updatedSSG.preTaxProfitMargin = getDivision(updatedSSG.preTaxNetIncome, updatedSSG.revenue);

  updatedSSG.epsGrowth = getGrowth(updatedSSG.eps);

  updatedSSG.highPERatio = getDivision(updatedSSG.highStockPrice, updatedSSG.eps);

  updatedSSG.lowPERatio = getDivision(updatedSSG.lowStockPrice, updatedSSG.eps);

  updatedSSG.dividendGrowth = getGrowth(updatedSSG.dividendPerShare);

  updatedSSG.dividendPayout = getDivision(updatedSSG.dividendPerShare, updatedSSG.eps)
                        .map((payout: number) => (payout > 0) ? payout : NaN);
  
  updatedSSG.highYield = getDivision(updatedSSG.dividendPerShare, updatedSSG.lowStockPrice);

  updatedSSG.outstandingShareGrowth = getGrowth(updatedSSG.outstandingShares);

  // Default Forecast Operations (5 Years Forward)

  updatedSSG.fcRevenueGrowthDefault = forecastRevenueGrowth(updatedSSG.yearsOfData, updatedSSG.revenue, updatedSSG.revenueGrowth);
  
  updatedSSG.fcPreTaxProfitMarginDefault = forecastPreTaxProfitMargin(updatedSSG.yearsOfData, updatedSSG.preTaxProfitMargin);
  
  updatedSSG.fcIncomeTaxRateDefault = forecastIncomeTaxRate(updatedSSG.yearsOfData, updatedSSG.incomeTaxRate);
  
  updatedSSG.fcOutstandingShareGrowthDefault = forecastOutstandingSharesGrowth(updatedSSG.yearsOfData, updatedSSG.outstandingShareGrowth);
  
  updatedSSG.fcPERatioDefault = forecastPERatio(updatedSSG.startingYear, updatedSSG.highPERatio, updatedSSG.lowPERatio);

  // Forecast Calculations (Default and User-Entered Values)

  // TODO: Make base case project for each year
  updatedSSG.fcRevenueDefault = getFiveYearAfterGrowth(updatedSSG.revenue[9], updatedSSG.fcRevenueGrowthDefault);
  updatedSSG.fcRevenue = getFiveYearAfterGrowth(updatedSSG.revenue[9], updatedSSG.fcRevenueGrowth);

  updatedSSG.fcPreTaxNetIncomeDefault = getMultiplication(updatedSSG.fcRevenueDefault, updatedSSG.fcPreTaxProfitMarginDefault);
  updatedSSG.fcPreTaxNetIncome = getMultiplication(updatedSSG.fcRevenue, updatedSSG.fcPreTaxProfitMargin);

  updatedSSG.fcNetProfitDefault = getMultiplication(updatedSSG.fcPreTaxNetIncomeDefault, getCompliment(updatedSSG.fcIncomeTaxRateDefault));
  updatedSSG.fcNetProfit = getMultiplication(updatedSSG.fcPreTaxNetIncome, getCompliment(updatedSSG.fcIncomeTaxRate));

  updatedSSG.fcOutstandingSharesDefault = getFiveYearAfterGrowth(updatedSSG.outstandingShares[9], updatedSSG.fcOutstandingShareGrowthDefault);
  updatedSSG.fcOutstandingShares = getFiveYearAfterGrowth(updatedSSG.outstandingShares[9], updatedSSG.fcOutstandingShareGrowth);

  // TODO: Make base case project for each year
  updatedSSG.fcEPSDefault = getDivision(updatedSSG.fcNetProfitDefault, updatedSSG.fcOutstandingSharesDefault);
  updatedSSG.fcEPS = getDivision(updatedSSG.fcNetProfit, updatedSSG.fcOutstandingShares);
  
  updatedSSG.fcEPSGrowthDefault = getFiveYearGrowth(updatedSSG.eps[9], updatedSSG.fcEPSDefault);
  updatedSSG.fcEPSGrowth = getFiveYearGrowth(updatedSSG.eps[9], updatedSSG.fcEPS);

  // TODO: Make downside, base, and upside project for each year
  updatedSSG.fcStockPriceDefault = getMultiplication(updatedSSG.fcEPSDefault, updatedSSG.fcPERatioDefault);
  updatedSSG.fcStockPrice = getMultiplication(updatedSSG.fcEPS, updatedSSG.fcPERatio);

  updatedSSG.fcTotalStockPriceGrowthDefault = getTotalFiveYearGrowth(updatedSSG.currentStockPrice, updatedSSG.fcStockPriceDefault);
  updatedSSG.fcTotalStockPriceGrowth = getTotalFiveYearGrowth(updatedSSG.currentStockPrice, updatedSSG.fcStockPrice);

  updatedSSG.fcAnnualStockPriceGrowthDefault = getFiveYearGrowth(updatedSSG.currentStockPrice, updatedSSG.fcStockPriceDefault);
  updatedSSG.fcAnnualStockPriceGrowth = getFiveYearGrowth(updatedSSG.currentStockPrice, updatedSSG.fcStockPrice);

  updatedSSG.currentDividendYield = Array(3).fill((updatedSSG.currentDividend / updatedSSG.currentStockPrice));

  updatedSSG.fcTotalAnnualReturnDefault = getAddition(updatedSSG.fcAnnualStockPriceGrowthDefault, updatedSSG.currentDividendYield);
  updatedSSG.fcTotalAnnualReturn = getAddition(updatedSSG.fcAnnualStockPriceGrowth, updatedSSG.currentDividendYield);

  return updatedSSG;
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