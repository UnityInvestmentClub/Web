import { Row, Column, DefaultCellTypes } from "@silevis/reactgrid";
import { ForecastDataRowId, HistoricalDataRowId, IndexRow, IndexForecastRow } from "../constants.ts";

const YearFormat = new Intl.NumberFormat("en-US", { useGrouping: false });
const OneDecimalFormat = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1, minimumFractionDigits: 1 });
const TwoDecimalFormat = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 1 });
const PercentFormat = new Intl.NumberFormat("en-US", { style: "percent", useGrouping: false, maximumFractionDigits: 1, minimumFractionDigits: 1 });

export const getHistoricalDataRows = (ssg: any): Row[] => {
  return [
    historicalHeaderRow(ssg.startingYear),
    
    row(HistoricalDataRowId.Revenue, "Revenue", ssg.revenue, OneDecimalFormat),
    fixed(growthRow(HistoricalDataRowId.RevenueGrowth, "Revenue Growth", ssg.revenueGrowth, PercentFormat)),

    row(HistoricalDataRowId.NetProfit, "Net Profit", ssg.netProfit, OneDecimalFormat),
    row(HistoricalDataRowId.IncomeTaxRate, "Income Tax Rate", ssg.incomeTaxRate, PercentFormat),
    fixed(row(HistoricalDataRowId.PreTaxNetIncome, "Pre-Tax Net Income", ssg.preTaxNetIncome, OneDecimalFormat)),
    fixed(growthRow(HistoricalDataRowId.PreTaxIncomeGrowth, "Pre-Tax Income Growth", ssg.preTaxIncomeGrowth, PercentFormat)),
    fixed(row(HistoricalDataRowId.PreTaxProfitMargin, "Pre-Tax Profit Margin", ssg.preTaxProfitMargin, PercentFormat)),

    row(HistoricalDataRowId.EPS, "EPS", ssg.eps, TwoDecimalFormat),
    fixed(growthRow(HistoricalDataRowId.EPSGrowth, "EPS Growth", ssg.epsGrowth, PercentFormat)),

    row(HistoricalDataRowId.HighStockPrice, "High Stock Price", ssg.highStockPrice, TwoDecimalFormat),
    row(HistoricalDataRowId.LowStockPrice, "Low Stock Price", ssg.lowStockPrice, TwoDecimalFormat),
    fixed(row(HistoricalDataRowId.HighPERatio, "High PE Ratio", ssg.highPERatio, OneDecimalFormat)),
    fixed(row(HistoricalDataRowId.LowPERatio, "Low PE Ratio", ssg.lowPERatio, OneDecimalFormat)),
    
    row(HistoricalDataRowId.DividendPerShare, "Dividend Per Share", ssg.dividendPerShare, TwoDecimalFormat),
    fixed(growthRow(HistoricalDataRowId.DividendGrowth, "Dividend Growth", ssg.dividendGrowth, PercentFormat)),
    fixed(row(HistoricalDataRowId.DividendPayout, "Dividend Payout", ssg.dividendPayout, PercentFormat)),
    fixed(row(HistoricalDataRowId.HighYield, "High Yield", ssg.highYield, PercentFormat)),

    row(HistoricalDataRowId.OutstandingShares, "Outstanding Shares", ssg.outstandingShares, OneDecimalFormat),
    fixed(growthRow(HistoricalDataRowId.OutstandingShareGrowth, "Outstanding Share Growth", ssg.outstandingShareGrowth, PercentFormat))
  ];
};

export const getHistoricalDataColumns = (): Column[] => {
  var dataColumns = IndexRow.map((idx): Column => ({ columnId: idx, width: 100 }));

  return [
    { columnId: -1, width: 250 },
    ...dataColumns
  ];
};

export const getForecastDataRows = (ssg: any): Row[] => {
  return [
    forecastHeaderRow(),

    row(ForecastDataRowId.RevenueGrowth, "Revenue Growth", ssg.fcRevenueGrowth, PercentFormat),
    fixed(row(ForecastDataRowId.Revenue, "Revenue", ssg.fcRevenue, OneDecimalFormat)),

    row(ForecastDataRowId.PreTaxProfitMargin, "Pre-Tax Profit Margin", ssg.fcPreTaxProfitMargin, PercentFormat),
    fixed(row(ForecastDataRowId.PreTaxNetIncome, "Pre-Tax Net Income", ssg.fcPreTaxNetIncome, OneDecimalFormat)),

    row(ForecastDataRowId.IncomeTaxRate, "Income Tax Rate", ssg.fcIncomeTaxRate, PercentFormat),
    fixed(row(ForecastDataRowId.NetProfit, "Net Profit", ssg.fcNetProfit, OneDecimalFormat)),

    row(ForecastDataRowId.OutstandingShareGrowth, "Outstanding Share Growth", ssg.fcOutstandingShareGrowth, PercentFormat),
    fixed(row(ForecastDataRowId.OutstandingShares, "Outstanding Shares", ssg.fcOutstandingShares, OneDecimalFormat)),
    
    fixed(row(ForecastDataRowId.EPS, "EPS", ssg.fcEPS, TwoDecimalFormat)),
    fixed(row(ForecastDataRowId.EPSGrowth, "EPS Growth", ssg.fcEPSGrowth, PercentFormat)),

    row(ForecastDataRowId.PERatio, "PE Ratio", ssg.fcPERatio, OneDecimalFormat),
    
    fixed(row(ForecastDataRowId.StockPrice, "Stock Price", ssg.fcStockPrice, TwoDecimalFormat)),
    fixed(row(ForecastDataRowId.TotalStockPriceGrowth, "Total Stock Price Growth", ssg.fcTotalStockPriceGrowth, PercentFormat)),
    fixed(row(ForecastDataRowId.AnnualStockPriceGrowth, "Annual Stock Price Growth", ssg.fcAnnualStockPriceGrowth, PercentFormat)),
    fixed(row(ForecastDataRowId.CurrentDividendYield, "Current Dividend Yield", ssg.currentDividendYield, PercentFormat)),
    fixed(row(ForecastDataRowId.TotalAnnualReturn, "Total Annual Return", ssg.fcTotalAnnualReturn, PercentFormat))
  ];
};

export const getForecastDataColumns = (): Column[] => {
  var dataColumns = IndexForecastRow.map((idx): Column => ({ columnId: idx, width: 100 }));

  return [
    { columnId: -1, width: 250 },
    ...dataColumns
  ];
};

const row = (id: string, title: string, dataRow: number[], format: Intl.NumberFormat): Row => {
  var numberCells = dataRow.map((data): DefaultCellTypes => numberCell(data, format));

  return {
    rowId: id,
    cells: [
      nonEditable(textCell(title)),
      ...numberCells
    ]
  };
};

const growthRow = (id: string, title: string, dataRow: number[], format: Intl.NumberFormat): Row => {
  var numberCells = dataRow.map((data): DefaultCellTypes => numberCell(data, format));

  return {
    rowId: id,
    cells: [
      nonEditable(textCell(title)),
      nonEditable(emptyCell),
      ...numberCells
    ]
  };
};

const historicalHeaderRow = (startingYear: number): Row => {
  var headerCells = IndexRow.map((idx): DefaultCellTypes =>
    (idx === 0)
      ? numberCell(startingYear, YearFormat)
      : nonEditable(numberCell(startingYear + idx, YearFormat))
  );

  return {
    rowId: HistoricalDataRowId.Header,
    cells: [
      nonEditable(emptyCell),
      ...headerCells
    ]
  };
};

const forecastHeaderRow = (): Row => {
  return {
    rowId: ForecastDataRowId.Header,
    cells: [
      nonEditable(emptyCell),
      textCell("Downside"),
      textCell("Base"),
      textCell("Upside")
    ]
  };
};

const fixed = (row: Row): Row => ({ ...row, cells: row.cells.map((cell): DefaultCellTypes => nonEditable(cell)) });

const emptyCell: DefaultCellTypes = { type: "text", text: "" };
const textCell = (text: string, className?: string): DefaultCellTypes => ({ type: "text", text, className });
const numberCell = (value: number, format: Intl.NumberFormat, className?: string ): DefaultCellTypes => ({ type: "number", value, format, className });

const nonEditable = (cell: DefaultCellTypes): DefaultCellTypes => ({ ...cell, nonEditable: true });