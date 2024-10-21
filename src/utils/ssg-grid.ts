import { Row, Column, DefaultCellTypes } from '@silevis/reactgrid';
import { ForecastDataRowId, HistoricalDataRowId, IndexRow, IndexForecastRow } from '../constants';

const YearFormat = new Intl.NumberFormat('en-US', { useGrouping: false });
const OneDecimalFormat = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1, minimumFractionDigits: 1 });
const TwoDecimalFormat = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 1 });
const PercentFormat = new Intl.NumberFormat('en-US', { style: 'percent', useGrouping: false, maximumFractionDigits: 1, minimumFractionDigits: 1 });

export const getHistoricalDataRows = (ssg: any) => {
  return [
    historicalHeaderRow(ssg.startingYear),
    
    historicalEntryRow(HistoricalDataRowId.Revenue, 'Revenue', ssg.revenue, OneDecimalFormat),
    fixedRow(HistoricalDataRowId.RevenueGrowth, 'Revenue Growth', [ NaN, ...ssg.revenueGrowth ], PercentFormat),

    historicalEntryRow(HistoricalDataRowId.NetProfit, 'Net Profit', ssg.netProfit, OneDecimalFormat),
    historicalEntryRow(HistoricalDataRowId.IncomeTaxRate, 'Income Tax Rate', ssg.incomeTaxRate, PercentFormat),
    fixedRow(HistoricalDataRowId.PreTaxNetIncome, 'Pre-Tax Net Income', ssg.preTaxNetIncome, OneDecimalFormat),
    fixedRow(HistoricalDataRowId.PreTaxIncomeGrowth, 'Pre-Tax Income Growth', [ NaN, ...ssg.preTaxIncomeGrowth ], PercentFormat),
    fixedRow(HistoricalDataRowId.PreTaxProfitMargin, 'Pre-Tax Profit Margin', ssg.preTaxProfitMargin, PercentFormat),

    historicalEntryRow(HistoricalDataRowId.EPS, 'EPS', ssg.eps, TwoDecimalFormat),
    fixedRow(HistoricalDataRowId.EPSGrowth, 'EPS Growth', [ NaN, ...ssg.epsGrowth ], PercentFormat),

    historicalEntryRow(HistoricalDataRowId.HighStockPrice, 'High Stock Price', ssg.highStockPrice, TwoDecimalFormat),
    historicalEntryRow(HistoricalDataRowId.LowStockPrice, 'Low Stock Price', ssg.lowStockPrice, TwoDecimalFormat),
    fixedRow(HistoricalDataRowId.HighPERatio, 'High PE Ratio', ssg.highPERatio, OneDecimalFormat),
    fixedRow(HistoricalDataRowId.LowPERatio, 'Low PE Ratio', ssg.lowPERatio, OneDecimalFormat),
    
    historicalEntryRow(HistoricalDataRowId.DividendPerShare, 'Dividend Per Share', ssg.dividendPerShare, TwoDecimalFormat),
    fixedRow(HistoricalDataRowId.DividendGrowth, 'Dividend Growth', [ NaN, ...ssg.dividendGrowth ], PercentFormat),
    fixedRow(HistoricalDataRowId.DividendPayout, 'Dividend Payout', ssg.dividendPayout, PercentFormat),
    fixedRow(HistoricalDataRowId.HighYield, 'High Yield', ssg.highYield, PercentFormat),

    historicalEntryRow(HistoricalDataRowId.OutstandingShares, 'Outstanding Shares', ssg.outstandingShares, OneDecimalFormat),
    fixedRow(HistoricalDataRowId.OutstandingShareGrowth, 'Outstanding Share Growth', [ NaN, ...ssg.outstandingShareGrowth ], PercentFormat)
  ];
};

export const getHistoricalDataColumns = () => {
  var dataColumns = IndexRow.map((idx: number) => ({ columnId: idx, width: 100 }));

  return [
    { columnId: -1, width: 250 },
    ...dataColumns
  ];
};

export const getForecastDataRows = (ssg: any) => {
  return [
    forecastHeaderRow(),

    forecastEntryRow(ForecastDataRowId.RevenueGrowth, 'Revenue Growth', ssg.fcRevenueGrowth, PercentFormat),
    fixedRow(ForecastDataRowId.Revenue, 'Revenue', ssg.fcRevenue, OneDecimalFormat),

    forecastEntryRow(ForecastDataRowId.PreTaxProfitMargin, 'Pre-Tax Profit Margin', ssg.fcPreTaxProfitMargin, PercentFormat),
    fixedRow(ForecastDataRowId.PreTaxNetIncome, 'Pre-Tax Net Income', ssg.fcPreTaxNetIncome, OneDecimalFormat),

    forecastEntryRow(ForecastDataRowId.IncomeTaxRate, 'Income Tax Rate', ssg.fcIncomeTaxRate, PercentFormat),
    fixedRow(ForecastDataRowId.NetProfit, 'Net Profit', ssg.fcNetProfit, OneDecimalFormat),

    forecastEntryRow(ForecastDataRowId.OutstandingShareGrowth, 'Outstanding Share Growth', ssg.fcOutstandingShareGrowth, PercentFormat),
    fixedRow(ForecastDataRowId.OutstandingShares, 'Outstanding Shares', ssg.fcOutstandingShares, OneDecimalFormat),
    
    fixedRow(ForecastDataRowId.EPS, 'EPS', ssg.fcEPS, TwoDecimalFormat),
    fixedRow(ForecastDataRowId.EPSGrowth, 'EPS Growth', ssg.fcEPSGrowth, PercentFormat),

    forecastEntryRow(ForecastDataRowId.PERatio, 'PE Ratio', ssg.fcPERatio, OneDecimalFormat),
    
    fixedRow(ForecastDataRowId.StockPrice, 'Stock Price', ssg.fcStockPrice, TwoDecimalFormat),
    fixedRow(ForecastDataRowId.TotalStockPriceGrowth, 'Total Stock Price Growth', ssg.fcTotalStockPriceGrowth, PercentFormat),
    fixedRow(ForecastDataRowId.AnnualStockPriceGrowth, 'Annual Stock Price Growth', ssg.fcAnnualStockPriceGrowth, PercentFormat),
    fixedRow(ForecastDataRowId.CurrentDividendYield, 'Current Dividend Yield', ssg.currentDividendYield, PercentFormat),
    fixedRow(ForecastDataRowId.TotalAnnualReturn, 'Total Annual Return', ssg.fcTotalAnnualReturn, PercentFormat)
  ];
};

export const getForecastDataColumns = () => {
  var dataColumns = IndexForecastRow.map((idx: number) => ({ columnId: idx, width: 100 }));

  return [
    { columnId: -1, width: 250 },
    ...dataColumns
  ];
};

export const getForecastDefaultRows = (ssg: any) => {
  return [
    forecastDefaultHeaderRow(),

    forecastDefaultEntryRow(ForecastDataRowId.RevenueGrowth, ssg.fcRevenueGrowthDefault, PercentFormat),
    forecastDefaultFixedRow(ForecastDataRowId.Revenue, ssg.fcRevenueDefault, OneDecimalFormat),

    forecastDefaultEntryRow(ForecastDataRowId.PreTaxProfitMargin, ssg.fcPreTaxProfitMarginDefault, PercentFormat),
    forecastDefaultFixedRow(ForecastDataRowId.PreTaxNetIncome, ssg.fcPreTaxNetIncomeDefault, OneDecimalFormat),

    forecastDefaultEntryRow(ForecastDataRowId.IncomeTaxRate, ssg.fcIncomeTaxRateDefault, PercentFormat),
    forecastDefaultFixedRow(ForecastDataRowId.NetProfit, ssg.fcNetProfitDefault, OneDecimalFormat),

    forecastDefaultEntryRow(ForecastDataRowId.OutstandingShareGrowth, ssg.fcOutstandingShareGrowthDefault, PercentFormat),
    forecastDefaultFixedRow(ForecastDataRowId.OutstandingShares, ssg.fcOutstandingSharesDefault, OneDecimalFormat),
    
    forecastDefaultFixedRow(ForecastDataRowId.EPS, ssg.fcEPSDefault, TwoDecimalFormat),
    forecastDefaultFixedRow(ForecastDataRowId.EPSGrowth, ssg.fcEPSGrowthDefault, PercentFormat),

    forecastDefaultEntryRow(ForecastDataRowId.PERatio, ssg.fcPERatioDefault, OneDecimalFormat),
    
    forecastDefaultFixedRow(ForecastDataRowId.StockPrice, ssg.fcStockPriceDefault, TwoDecimalFormat),
    forecastDefaultFixedRow(ForecastDataRowId.TotalStockPriceGrowth, ssg.fcTotalStockPriceGrowthDefault, PercentFormat),
    forecastDefaultFixedRow(ForecastDataRowId.AnnualStockPriceGrowth, ssg.fcAnnualStockPriceGrowthDefault, PercentFormat),
    forecastDefaultFixedRow(ForecastDataRowId.CurrentDividendYield, ssg.currentDividendYield, PercentFormat),
    forecastDefaultFixedRow(ForecastDataRowId.TotalAnnualReturn, ssg.fcTotalAnnualReturnDefault, PercentFormat)
  ];
};

export const getForecastDefaultColumns = () => {
  var dataColumns = IndexForecastRow.map((idx: number) => ({ columnId: idx, width: 100 }));

  return [
    ...dataColumns
  ];
};

const fixedRow = (id: string, title: string, dataRow: number[], format: Intl.NumberFormat) => {
  var fixedCells = dataRow.map((data: number) => nonEditable(numberCell(data, format)));

  return {
    rowId: id,
    cells: [
      nonEditable(textCell(title)),
      ...fixedCells
    ]
  };
};

const historicalEntryRow = (id: string, title: string, dataRow: number[], format: Intl.NumberFormat) => {
  var entryCells = dataRow.map((data: number) => numberCell(data, format, 'ssg-entry-cell'));

  return {
    rowId: id,
    cells: [
      nonEditable(textCell(title)),
      ...entryCells
    ]
  };
};

const historicalHeaderRow = (startingYear: number) => {
  var headerCells = IndexRow.map((idx: number) =>
    (idx === 0)
      ? numberCell(startingYear, YearFormat, 'ssg-entry-cell')
      : nonEditable(numberCell(startingYear + idx, YearFormat))
  );

  return {
    rowId: HistoricalDataRowId.Header,
    cells: [
      nonEditable(textCell('', 'ssg-corner-cell')),
      ...headerCells
    ]
  };
};

const forecastEntryRow = (id: string, title: string, dataRow: number[], format: Intl.NumberFormat) => {
  return {
    rowId: id,
    cells: [
      nonEditable(textCell(title)),
      numberCell(dataRow[0], format, 'ssg-downside-cell'),
      numberCell(dataRow[1], format, 'ssg-base-cell'),
      numberCell(dataRow[2], format, 'ssg-upside-cell')
    ]
  };
};

const forecastHeaderRow = () => {
  return {
    rowId: ForecastDataRowId.Header,
    cells: [
      nonEditable(textCell('', 'ssg-corner-cell')),
      nonEditable(textCell('Downside')),
      nonEditable(textCell('Base')),
      nonEditable(textCell('Upside'))
    ]
  };
};

const forecastDefaultEntryRow = (id: string, dataRow: number[], format: Intl.NumberFormat) => {
  return {
    rowId: id,
    cells: [
      nonEditable(numberCell(dataRow[0], format, 'ssg-downside-cell')),
      nonEditable(numberCell(dataRow[1], format, 'ssg-base-cell')),
      nonEditable(numberCell(dataRow[2], format, 'ssg-upside-cell'))
    ]
  };
};

const forecastDefaultFixedRow = (id: string, dataRow: number[], format: Intl.NumberFormat) => {
  return {
    rowId: id,
    cells: [
      nonEditable(numberCell(dataRow[0], format)),
      nonEditable(numberCell(dataRow[1], format)),
      nonEditable(numberCell(dataRow[2], format))
    ]
  };
};

const forecastDefaultHeaderRow = () => {
  return {
    rowId: ForecastDataRowId.Header,
    cells: [
      nonEditable(textCell('Downside')),
      nonEditable(textCell('Base')),
      nonEditable(textCell('Upside'))
    ]
  };
};

const textCell = (text: string, className?: string): DefaultCellTypes => ({ type: 'text', text, className: `ssg-cell ${className}` });
const numberCell = (value: number, format: Intl.NumberFormat, className?: string ): DefaultCellTypes => ({ type: 'number', value, format, className: `ssg-cell ${className}` });

const nonEditable = (cell: DefaultCellTypes) => ({ ...cell, nonEditable: true });