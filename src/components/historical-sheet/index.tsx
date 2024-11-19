import './index.css';
import { Row, Column, Cell, NonEditableCell } from '@silevis/reactgrid';
import { BaseSheet } from '@components/';
import { NumberCell } from '@components/number-cell';
import { YearFormat, OneDecimalFormat, TwoDecimalFormat, PercentFormat } from '@constants/';
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

const row = (rowIndex: number, title: string, data: number[], format: Intl.NumberFormat, onChange?: (index: number) => (value: number) => void) => ([
  textCell(rowIndex, 0, title),
  ...data.map((value: number, index: number) => numberCell(rowIndex, index + 1, value, format, onChange?.(index)))
]);

export const HistoricalSheet = ({ ssg, onChange }: Props) => {
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
    { rowIndex: 17, height: 30 },
    { rowIndex: 18, height: 30 },
    { rowIndex: 19, height: 30 }
  ]

  const columns: Column[] = [
    { colIndex: 0, width: 250 },
    { colIndex: 1, width: 125, minWidth: 125 },
    { colIndex: 2, width: 125, minWidth: 125 },
    { colIndex: 3, width: 125, minWidth: 125 },
    { colIndex: 4, width: 125, minWidth: 125 },
    { colIndex: 5, width: 125, minWidth: 125 },
    { colIndex: 6, width: 125, minWidth: 125 },
    { colIndex: 7, width: 125, minWidth: 125 },
    { colIndex: 8, width: 125, minWidth: 125 },
    { colIndex: 9, width: 125, minWidth: 125 },
    { colIndex: 10, width: 125, minWidth: 125 }
  ];

  const cells: Cell[] = [
    cornerCell(0, 0),
    numberCell(0, 1, ssg.startingYear, YearFormat, onChange('startingYear')()),
    numberCell(0, 2, ssg.startingYear + 1, YearFormat),
    numberCell(0, 3, ssg.startingYear + 2, YearFormat),
    numberCell(0, 4, ssg.startingYear + 3, YearFormat),
    numberCell(0, 5, ssg.startingYear + 4, YearFormat),
    numberCell(0, 6, ssg.startingYear + 5, YearFormat),
    numberCell(0, 7, ssg.startingYear + 6, YearFormat),
    numberCell(0, 8, ssg.startingYear + 7, YearFormat),
    numberCell(0, 9, ssg.startingYear + 8, YearFormat),
    numberCell(0, 10, ssg.startingYear + 9, YearFormat),

    ...row(1, 'Revenue', ssg.revenue, OneDecimalFormat, onChange('revenue')),
    ...row(2, 'Revenue Growth', [ NaN, ...ssg.revenueGrowth], PercentFormat),
    ...row(3, 'Net Profit', ssg.netProfit, OneDecimalFormat, onChange('netProfit')),
    ...row(4, 'Income Tax Rate', ssg.incomeTaxRate, PercentFormat, onChange('incomeTaxRate')),
    ...row(5, 'Pre-Tax Net Income', ssg.preTaxNetIncome, OneDecimalFormat),
    ...row(6, 'Pre-Tax Income Growth', [ NaN, ...ssg.preTaxIncomeGrowth], PercentFormat),
    ...row(7, 'Pre-Tax Profit Margin', ssg.preTaxProfitMargin, PercentFormat),
    ...row(8, 'EPS', ssg.eps, TwoDecimalFormat, onChange('eps')),
    ...row(9, 'EPS Growth', [ NaN, ...ssg.epsGrowth ], PercentFormat),
    ...row(10, 'High Stock Price', ssg.highStockPrice, TwoDecimalFormat, onChange('highStockPrice')),
    ...row(11, 'Low Stock Price', ssg.lowStockPrice, TwoDecimalFormat, onChange('lowStockPrice')),
    ...row(12, 'High PE Ratio', ssg.highPERatio, OneDecimalFormat),
    ...row(13, 'Low PE Ratio', ssg.lowPERatio, OneDecimalFormat),
    ...row(14, 'Dividend Per Share', ssg.dividendPerShare, TwoDecimalFormat, onChange('dividendPerShare')),
    ...row(15, 'Dividend Growth', [ NaN, ...ssg.dividendGrowth ], PercentFormat),
    ...row(16, 'Dividend Payout', ssg.dividendPayout, PercentFormat),
    ...row(17, 'High Yield', ssg.highYield, PercentFormat),
    ...row(18, 'Outstanding Shares', ssg.outstandingShares, OneDecimalFormat, onChange('outstandingShares')),
    ...row(19, 'Outstanding Share Growth', [ NaN, ...ssg.outstandingShareGrowth], PercentFormat)
  ];

  return (
    <div className='historical-sheet'>
      <BaseSheet id='historical' rows={rows} columns={columns} cells={cells} />
    </div>
  );
};