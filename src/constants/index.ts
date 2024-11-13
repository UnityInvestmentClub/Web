export const DBId = import.meta.env.VITE_DB_ID;
export const DBKey = import.meta.env.VITE_DB_KEY;

export const SSGTable = 'ssgs';
export const ProfileTable = 'profiles';
export const SSGProfileTable = 'rel_ssg_profile';

export const enum HistoricalDataRowId {
  Header = 'historical-header',
  Revenue = 'revenue',
  RevenueGrowth = 'revenueGrowth',
  NetProfit = 'netProfit',
  IncomeTaxRate = 'incomeTaxRate',
  PreTaxNetIncome = 'preTaxNetIncome',
  PreTaxIncomeGrowth = 'preTaxIncomeGrowth',
  PreTaxProfitMargin = 'preTaxProfitMargin',
  EPS = 'eps',
  EPSGrowth = 'epsGrowth',
  HighStockPrice = 'highStockPrice',
  LowStockPrice = 'lowStockPrice',
  HighPERatio = 'highPERatio',
  LowPERatio = 'lowPERatio',
  DividendPerShare = 'dividendPerShare',
  DividendGrowth = 'dividendGrowth',
  DividendPayout = 'dividendPayout',
  HighYield = 'highYield',
  OutstandingShares = 'outstandingShares',
  OutstandingShareGrowth = 'outstandingShareGrowth'
}

export const enum ForecastDataRowId {
  Header = 'forecast-header',
  RevenueGrowth = 'fcRevenueGrowth',
  Revenue = 'fcRevenue',
  PreTaxProfitMargin = 'fcPreTaxProfitMargin',
  PreTaxNetIncome = 'fcPreTaxNetIncome',
  IncomeTaxRate = 'fcIncomeTaxRate',
  NetProfit = 'fcNetProfit',
  OutstandingShareGrowth = 'fcOutstandingShareGrowth',
  OutstandingShares = 'fcOutstandingShares',
  EPS = 'fcEPS',
  EPSGrowth = 'fcEPSGrowth',
  PERatio= 'fcPERatio',
  StockPrice = 'fcStockPrice',
  TotalStockPriceGrowth = 'fcTotalStockPriceGrowth',
  AnnualStockPriceGrowth = 'fcAnnualStockPriceGrowth',
  CurrentDividendYield = 'currentDividendYield',
  TotalAnnualReturn = 'fcTotalAnnualReturn'
}

export const IndexRow = Array(10).fill(NaN).map((_, idx: number) => idx);
export const IndexGrowthRow = Array(9).fill(NaN).map((_, idx: number) => idx);
export const IndexForecastRow = Array(3).fill(NaN).map((_, idx: number) => idx);