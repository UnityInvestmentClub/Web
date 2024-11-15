import { DefaultCellTypes } from "@silevis/reactgrid"; 

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

export const YearFormat = new Intl.NumberFormat('en-US', { useGrouping: false });
export const OneDecimalFormat = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1, minimumFractionDigits: 1 });
export const TwoDecimalFormat = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 1 });
export const PercentFormat = new Intl.NumberFormat('en-US', { style: 'percent', useGrouping: false, maximumFractionDigits: 1, minimumFractionDigits: 1 });

export const textCell = (text: string, className?: string): DefaultCellTypes => ({ type: 'text', text, className: `cell ${className}` });
export const numberCell = (value: number, format: Intl.NumberFormat, className?: string ): DefaultCellTypes => ({ type: 'number', value, format, className: `cell ${className}` });
export const nonEditable = (cell: DefaultCellTypes) => ({ ...cell, nonEditable: true });
export const cornerCell = () => nonEditable(textCell('', 'corner-cell'));