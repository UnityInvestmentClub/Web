import './index.css';
import { Row, Column, Cell, NonEditableCell } from '@silevis/reactgrid';
import { BaseSheet, NumberCell } from '@components/';
import { OneDecimalFormat, TwoDecimalFormat, PercentFormat } from '@constants/';
import { SSG, PropsBase, SSGDataField } from '@_types/';

interface Props extends PropsBase {
  ssg: SSG,
  onChange: (field: SSGDataField) => (index?: number) => (value: number) => void
}

const cornerCell = (rowIndex: number, colIndex: number) => ({
  rowIndex,
  colIndex,
  Template: NonEditableCell
} as Cell);

const numberCell = (rowIndex: number, colIndex: number, value: number, format: Intl.NumberFormat, onValueChanged?: (value: number) => void) => ({
  rowIndex,
  colIndex,
  Template: NumberCell,
  props: {
    value,
    format,
    onValueChanged
  }
} as Cell);

const textCell = (rowIndex: number, colIndex: number, value: string) => ({
  rowIndex,
  colIndex,
  Template: NonEditableCell,
  props: { value }
} as Cell);

const forecastRow = (rowIndex: number, title: string, data: number[], format: Intl.NumberFormat, onChange?: (index: number) => (value: number) => void) => ([
  textCell(rowIndex, 0, title),
  ...(onChange
    ? data.map((value: number, index: number) => numberCell(rowIndex, index + 1, value, format, onChange(index)))
    : data.map((value: number, index: number) => numberCell(rowIndex, index + 1, value, format)))
]);

const defaultRow = (rowIndex: number, data: number[], format: Intl.NumberFormat) => data.map((value: number, index: number) => numberCell(rowIndex, index, value, format))

export const ForecastSheet = ({ ssg, onChange }: Props) => {
  const rows: Row[] = [
    { rowIndex: 0, height: 30 },
    { rowIndex: 1, height: 30 },
    { rowIndex: 2, height: 30 },
    { rowIndex: 3, height: 30 },
    { rowIndex: 4, height: 30 },
    { rowIndex: 5, height: 30 },
    { rowIndex: 6, height: 30 },
    { rowIndex: 7, height: 30 },
    { rowIndex: 8, height: 30 },
    { rowIndex: 9, height: 30 },
    { rowIndex: 10, height: 30 },
    { rowIndex: 12, height: 30 },
    { rowIndex: 13, height: 30 },
    { rowIndex: 14, height: 30 },
    { rowIndex: 15, height: 30 },
    { rowIndex: 16, height: 30 },
  ]

  const forecastColumns: Column[] = [
    { colIndex: 0, width: 250 },
    { colIndex: 1, width: 125, minWidth: 125 },
    { colIndex: 2, width: 125, minWidth: 125 },
    { colIndex: 3, width: 125, minWidth: 125 }
  ];

  const defaultColumns: Column[] = [
    { colIndex: 0, width: 125, minWidth: 125 },
    { colIndex: 1, width: 125, minWidth: 125 },
    { colIndex: 2, width: 125, minWidth: 125 }
  ];

  const forecastCells: Cell[] = [
    cornerCell(0, 0),
    textCell(0, 1, 'Downside'),
    textCell(0, 2, 'Base'),
    textCell(0, 3, 'Upside'),

    ...forecastRow(1, 'Revenue Growth', ssg.fcRevenueGrowth, PercentFormat, onChange('fcRevenueGrowth')),
    ...forecastRow(2, 'Revenue', ssg.fcRevenue, OneDecimalFormat),
    ...forecastRow(3, 'Pre-Tax Profit Margin', ssg.fcPreTaxProfitMargin, PercentFormat, onChange('fcPreTaxProfitMargin')),
    ...forecastRow(4, 'Pre-Tax Net Income', ssg.fcPreTaxNetIncome, OneDecimalFormat),
    ...forecastRow(5, 'Income Tax Rate', ssg.fcIncomeTaxRate, PercentFormat, onChange('fcIncomeTaxRate')),
    ...forecastRow(6, 'Net Profit', ssg.fcNetProfit, OneDecimalFormat),
    ...forecastRow(7, 'Outstanding Share Growth', ssg.fcOutstandingShareGrowth, PercentFormat, onChange('fcOutstandingShareGrowth')),
    ...forecastRow(8, 'Outstanding Shares', ssg.fcOutstandingShares, OneDecimalFormat),
    ...forecastRow(9, 'EPS', ssg.fcEPS, TwoDecimalFormat),
    ...forecastRow(10, 'EPS Growth', ssg.fcEPSGrowth, PercentFormat),
    ...forecastRow(11, 'PE Ratio', ssg.fcPERatio, OneDecimalFormat, onChange('fcPERatio')),
    ...forecastRow(12, 'Stock Price', ssg.fcStockPrice, TwoDecimalFormat),
    ...forecastRow(13, 'Total Stock Price Growth', ssg.fcTotalStockPriceGrowth, PercentFormat),
    ...forecastRow(14, 'Annual Stock Price Growth', ssg.fcAnnualStockPriceGrowth, PercentFormat),
    ...forecastRow(15, 'Current Dividend Yield', ssg.currentDividendYield, PercentFormat),
    ...forecastRow(16, 'Total Annual Return', ssg.fcTotalAnnualReturn, PercentFormat)
  ];

  const defaultCells: Cell[] = [
    textCell(0, 0, 'Downside'),
    textCell(0, 1, 'Base'),
    textCell(0, 2, 'Upside'),

    ...defaultRow(1, ssg.fcRevenueGrowthDefault, PercentFormat),
    ...defaultRow(2, ssg.fcRevenueDefault, OneDecimalFormat),
    ...defaultRow(3, ssg.fcPreTaxProfitMarginDefault, PercentFormat),
    ...defaultRow(4, ssg.fcPreTaxNetIncomeDefault, OneDecimalFormat),
    ...defaultRow(5, ssg.fcIncomeTaxRateDefault, PercentFormat),
    ...defaultRow(6, ssg.fcNetProfitDefault, OneDecimalFormat),
    ...defaultRow(7, ssg.fcOutstandingShareGrowthDefault, PercentFormat),
    ...defaultRow(8, ssg.fcOutstandingSharesDefault, OneDecimalFormat),
    ...defaultRow(9, ssg.fcEPSDefault, TwoDecimalFormat),
    ...defaultRow(10, ssg.fcEPSGrowthDefault, PercentFormat),
    ...defaultRow(11, ssg.fcPERatioDefault, OneDecimalFormat),
    ...defaultRow(12, ssg.fcStockPriceDefault, TwoDecimalFormat),
    ...defaultRow(13, ssg.fcTotalStockPriceGrowthDefault, PercentFormat),
    ...defaultRow(14, ssg.fcAnnualStockPriceGrowthDefault, PercentFormat),
    ...defaultRow(15, ssg.currentDividendYield, PercentFormat),
    ...defaultRow(16, ssg.fcTotalAnnualReturnDefault, PercentFormat)
  ];

  return (
    <div className='forecast-sheet'>
      <BaseSheet id='forecast' rows={rows} columns={forecastColumns} cells={forecastCells} />
      <div className='forecast-sheet-default'>
        <BaseSheet id='default' rows={rows} columns={defaultColumns} cells={defaultCells} />
      </div>
    </div>
  );
};