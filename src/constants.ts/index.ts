export const enum HistoricalDataRowId {
  Header = "historical-header",
  Revenue = "revenue",
  RevenueGrowth = "revenueGrowth",
  NetProfit = "netProfit",
  IncomeTaxRate = "incomeTaxRate",
  PreTaxNetIncome = "preTaxNetIncome",
  PreTaxIncomeGrowth = "preTaxIncomeGrowth",
  PreTaxProfitMargin = "preTaxProfitMargin",
  EPS = "eps",
  EPSGrowth = "epsGrowth",
  HighStockPrice = "highStockPrice",
  LowStockPrice = "lowStockPrice",
  HighPERatio = "highPERatio",
  LowPERatio = "lowPERatio",
  DividendPerShare = "dividendPerShare",
  DividendGrowth = "dividendGrowth",
  DividendPayout = "dividendPayout",
  HighYield = "highYield",
  OutstandingShares = "outstandingShares",
  OutstandingShareGrowth = "outstandingShareGrowth"
};

export const enum ForecastDataRowId {
  Header = "forecast-header",
  RevenueGrowth = "fcRevenueGrowth",
  Revenue = "fcRevenue",
  PreTaxProfitMargin = "fcPreTaxProfitMargin",
  PreTaxNetIncome = "fcPreTaxNetIncome",
  IncomeTaxRate = "fcIncomeTaxRate",
  NetProfit = "fcNetProfit",
  OutstandingShareGrowth = "fcOutstandingShareGrowth",
  OutstandingShares = "fcOutstandingShares",
  EPS = "fcEPS",
  EPSGrowth = "fcEPSGrowth",
  PERatio= "fcPERatio",
  StockPrice = "fcStockPrice",
  TotalStockPriceGrowth = "fcTotalStockPriceGrowth",
  AnnualStockPriceGrowth = "fcAnnualStockPriceGrowth",
  CurrentDividendYield = "currentDividendYield",
  TotalAnnualReturn = "fcTotalAnnualReturn"
};

export const EmptySSG: any = {
  //TODO: convert static fields to input
  startingYear: 2014,
  presentStockPrice: 283,
  presentDividend: 7.6,
  yearsOfData: 10,

  revenue: Array(10).fill(NaN),
  revenueGrowth: Array(9).fill(NaN),

  netProfit: Array(10).fill(NaN),
  incomeTaxRate: Array(10).fill(NaN),
  preTaxNetIncome: Array(10).fill(NaN),
  preTaxIncomeGrowth: Array(9).fill(NaN),
  preTaxProfitMargin: Array(10).fill(NaN),

  eps: Array(10).fill(NaN),
  epsGrowth: Array(9).fill(NaN),

  highStockPrice: Array(10).fill(NaN),
  lowStockPrice: Array(10).fill(NaN),
  highPERatio: Array(10).fill(NaN),
  lowPERatio: Array(10).fill(NaN),

  dividendPerShare: Array(10).fill(NaN),
  dividendGrowth: Array(9).fill(NaN),
  dividendPayout: Array(10).fill(NaN),
  highYield: Array(10).fill(NaN),

  outstandingShares: Array(10).fill(NaN),
  outstandingShareGrowth: Array(9).fill(NaN),

  fcRevenueGrowthDefault: Array(3).fill(NaN),
  fcRevenueGrowth: Array(3).fill(NaN),
  fcRevenue: Array(3).fill(NaN),

  fcPreTaxProfitMarginefault: Array(3).fill(NaN),
  fcPreTaxProfitMargin: Array(3).fill(NaN),
  fcPreTaxNetIncome: Array(3).fill(NaN),

  fcIncomeTaxRateDefault: Array(3).fill(NaN),
  fcIncomeTaxRate: Array(3).fill(NaN),
  fcNetProfit: Array(3).fill(NaN),

  fcOutstandingShareGrowthDefault: Array(3).fill(NaN),
  fcOutstandingShareGrowth: Array(3).fill(NaN),
  fcOutstandingShares: Array(3).fill(NaN),

  fcEPS: Array(3).fill(NaN),
  fcEPSGrowth: Array(3).fill(NaN),

  fcPERatioDefault: Array(3).fill(NaN),
  fcPERatio: Array(3).fill(NaN),

  fcStockPrice: Array(3).fill(NaN),
  fcTotalStockPriceGrowth: Array(3).fill(NaN),
  fcAnnualStockPriceGrowth: Array(3).fill(NaN),
  currentDividendYield: Array(3).fill(NaN),
  fcTotalAnnualReturn: Array(3).fill(NaN)
};

export const IndexRow: number[] = Array(10).fill(NaN).map((_, idx) => idx);
export const IndexGrowthRow: number[] = Array(9).fill(NaN).map((_, idx) => idx);
export const IndexForecastRow: number[] = Array(3).fill(NaN).map((_, idx) => idx);