import './index.css';
import { ReactGrid, CellChange } from '@silevis/reactgrid';
import { ForecastDataRowId, OneDecimalFormat, TwoDecimalFormat, PercentFormat, cornerCell, nonEditable, numberCell, textCell } from '@constants/';
import { SSG, PropsBase } from '@_types/';

interface Props extends PropsBase {
  ssg: SSG,
  onChange: (changes: CellChange[]) => void
}

const entryRow = (data: number[], format: Intl.NumberFormat) => ([
  numberCell(data[0], format, 'downside-cell'),
  numberCell(data[1], format, 'base-cell'),
  numberCell(data[2], format, 'upside-cell')
]);

const fixedRow = (data: number[], format: Intl.NumberFormat) => ([
  nonEditable(numberCell(data[0], format)),
  nonEditable(numberCell(data[1], format)),
  nonEditable(numberCell(data[2], format))
]);

const fixedEntryRow = (data: number[], format: Intl.NumberFormat) => ([
  nonEditable(numberCell(data[0], format, 'downside-cell')),
  nonEditable(numberCell(data[1], format, 'base-cell')),
  nonEditable(numberCell(data[2], format, 'upside-cell'))
]);

export const ForecastSheet = ({ ssg, onChange }: Props) => {
  const forecastRows = [
    {
      rowId: ForecastDataRowId.Header,
      cells: [
        cornerCell(),
        nonEditable(textCell('Downside')),
        nonEditable(textCell('Base')),
        nonEditable(textCell('Upside'))
      ]
    },
    {
      rowId: ForecastDataRowId.RevenueGrowth,
      cells: [
        nonEditable(textCell('Revenue Growth', 'title-cell')),
        ...entryRow(ssg.fcRevenueGrowth, PercentFormat)
      ]
    },
    {
      rowId: ForecastDataRowId.Revenue,
      cells: [
        nonEditable(textCell('Revenue', 'title-cell')),
        ...fixedRow(ssg.fcRevenue, OneDecimalFormat)
      ]
    },
    {
      rowId: ForecastDataRowId.PreTaxProfitMargin,
      cells: [
        nonEditable(textCell('Pre-Tax Profit Margin', 'title-cell')),
        ...entryRow(ssg.fcPreTaxProfitMargin, PercentFormat)
      ]
    },
    {
      rowId: ForecastDataRowId.PreTaxNetIncome,
      cells: [
        nonEditable(textCell('Pre-Tax Net Income', 'title-cell')),
        ...fixedRow(ssg.fcPreTaxNetIncome, OneDecimalFormat)
      ]
    },
    {
      rowId: ForecastDataRowId.IncomeTaxRate,
      cells: [
        nonEditable(textCell('Income Tax Rate', 'title-cell')),
        ...entryRow(ssg.fcIncomeTaxRate, PercentFormat)
      ]
    },
    {
      rowId: ForecastDataRowId.NetProfit,
      cells: [
        nonEditable(textCell('Net Profit', 'title-cell')),
        ...fixedRow(ssg.fcNetProfit, OneDecimalFormat)
      ]
    },
    {
      rowId: ForecastDataRowId.OutstandingShareGrowth,
      cells: [
        nonEditable(textCell('Outstanding Share Growth', 'title-cell')),
        ...entryRow(ssg.fcOutstandingShareGrowth, PercentFormat)
      ]
    },
    {
      rowId: ForecastDataRowId.OutstandingShares,
      cells: [
        nonEditable(textCell('Outstanding Shares', 'title-cell')),
        ...fixedRow(ssg.fcOutstandingShares, OneDecimalFormat)
      ]
    },
    {
      rowId: ForecastDataRowId.EPS,
      cells: [
        nonEditable(textCell('EPS', 'title-cell')),
        ...fixedRow(ssg.fcEPS, TwoDecimalFormat)
      ]
    },
    {
      rowId: ForecastDataRowId.EPSGrowth,
      cells: [
        nonEditable(textCell('EPS Growth', 'title-cell')),
        ...fixedRow(ssg.fcEPSGrowth, PercentFormat)
      ]
    },
    {
      rowId: ForecastDataRowId.PERatio,
      cells: [
        nonEditable(textCell('PE Ratio', 'title-cell')),
        ...entryRow(ssg.fcPERatio, OneDecimalFormat)
      ]
    },
    {
      rowId: ForecastDataRowId.StockPrice,
      cells: [
        nonEditable(textCell('Stock Price', 'title-cell')),
        ...fixedRow(ssg.fcStockPrice, TwoDecimalFormat)
      ]
    },    {
      rowId: ForecastDataRowId.TotalStockPriceGrowth,
      cells: [
        nonEditable(textCell('Total Stock Price Growth', 'title-cell')),
        ...fixedRow(ssg.fcTotalStockPriceGrowth, PercentFormat)
      ]
    },    {
      rowId: ForecastDataRowId.AnnualStockPriceGrowth,
      cells: [
        nonEditable(textCell('Annual Stock Price Growth', 'title-cell')),
        ...fixedRow(ssg.fcAnnualStockPriceGrowth, PercentFormat)
      ]
    },    {
      rowId: ForecastDataRowId.CurrentDividendYield,
      cells: [
        nonEditable(textCell('Current Dividend Yield', 'title-cell')),
        ...fixedRow(ssg.currentDividendYield, PercentFormat)
      ]
    },    {
      rowId: ForecastDataRowId.TotalAnnualReturn,
      cells: [
        nonEditable(textCell('Total Annual Return', 'title-cell')),
        ...fixedRow(ssg.fcTotalAnnualReturn, PercentFormat)
      ]
    },
  ];

  const defaultForecastRows = [
    {
      rowId: ForecastDataRowId.Header,
      cells: [
        nonEditable(textCell('Downside')),
        nonEditable(textCell('Base')),
        nonEditable(textCell('Upside'))
      ]
    },
    {
      rowId: ForecastDataRowId.RevenueGrowth,
      cells: [ ...fixedEntryRow(ssg.fcRevenueGrowthDefault, PercentFormat) ]
    },
    {
      rowId: ForecastDataRowId.Revenue,
      cells: [ ...fixedRow(ssg.fcRevenueDefault, OneDecimalFormat) ]
    },
    {
      rowId: ForecastDataRowId.PreTaxProfitMargin,
      cells: [ ...fixedEntryRow(ssg.fcPreTaxProfitMarginDefault, PercentFormat) ]
    },
    {
      rowId: ForecastDataRowId.PreTaxNetIncome,
      cells: [ ...fixedRow(ssg.fcPreTaxNetIncomeDefault, OneDecimalFormat) ]
    },
    {
      rowId: ForecastDataRowId.IncomeTaxRate,
      cells: [ ...fixedEntryRow(ssg.fcIncomeTaxRateDefault, PercentFormat) ]
    },
    {
      rowId: ForecastDataRowId.NetProfit,
      cells: [ ...fixedRow(ssg.fcNetProfitDefault, OneDecimalFormat) ]
    },
    {
      rowId: ForecastDataRowId.OutstandingShareGrowth,
      cells: [ ...fixedEntryRow(ssg.fcOutstandingShareGrowthDefault, PercentFormat) ]
    },
    {
      rowId: ForecastDataRowId.OutstandingShares,
      cells: [ ...fixedRow(ssg.fcOutstandingSharesDefault, OneDecimalFormat) ]
    },
    {
      rowId: ForecastDataRowId.EPS,
      cells: [ ...fixedRow(ssg.fcEPSDefault, TwoDecimalFormat) ]
    },
    {
      rowId: ForecastDataRowId.EPSGrowth,
      cells: [ ...fixedRow(ssg.fcEPSGrowthDefault, PercentFormat) ]
    },
    {
      rowId: ForecastDataRowId.PERatio,
      cells: [ ...fixedEntryRow(ssg.fcPERatioDefault, OneDecimalFormat) ]
    },
    {
      rowId: ForecastDataRowId.StockPrice,
      cells: [ ...fixedRow(ssg.fcStockPriceDefault, TwoDecimalFormat) ]
    },
    {
      rowId: ForecastDataRowId.TotalStockPriceGrowth,
      cells: [ ...fixedRow(ssg.fcTotalStockPriceGrowthDefault, PercentFormat) ]
    },
    {
      rowId: ForecastDataRowId.AnnualStockPriceGrowth,
      cells: [ ...fixedRow(ssg.fcAnnualStockPriceGrowthDefault, PercentFormat) ]
    },
    {
      rowId: ForecastDataRowId.CurrentDividendYield,
      cells: [ ...fixedRow(ssg.currentDividendYield, PercentFormat) ]
    },
    {
      rowId: ForecastDataRowId.TotalAnnualReturn,
      cells: [ ...fixedRow(ssg.fcTotalAnnualReturnDefault, PercentFormat) ]
    },
  ];

  const forecastColumns = [
    { columnId: -1, width: 250 },
    { columnId: 0, width: 125 },
    { columnId: 1, width: 125 },
    { columnId: 2, width: 125 }
  ];

  const defaultForecastColumns = [
    { columnId: 0, width: 125 },
    { columnId: 1, width: 125 },
    { columnId: 2, width: 125 }
  ];

  return (
    <div className='forecast-sheet'>
        <ReactGrid rows={forecastRows} columns={forecastColumns} onCellsChanged={onChange} enableRangeSelection />
      <div className='forecast-sheet-default'>
        <ReactGrid rows={defaultForecastRows} columns={defaultForecastColumns} onCellsChanged={onChange} enableRangeSelection />
      </div>
    </div>
  );
};