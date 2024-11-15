import './index.css';
import { CellChange, ReactGrid } from '@silevis/reactgrid';
import { HistoricalDataRowId, YearFormat, OneDecimalFormat, TwoDecimalFormat, PercentFormat, cornerCell, nonEditable, numberCell, textCell } from '@constants/';
import { SSG, PropsBase } from '@_types/';

interface Props extends PropsBase {
  ssg: SSG,
  onChange: (changes: CellChange[]) => void
}

const entryRow = (data: number[], format: Intl.NumberFormat) => {
  // if (format === PercentFormat) {
  //   return data.map((value: number) => {
  //     var newValue = OneDecimalFormat.format(parseFloat())
  //     return numberCell(value, format, 'entry-cell')
  //   });
  // }

  return data.map((value: number) => numberCell(value, format, 'entry-cell'));
};

const fixedRow = (data: number[], format: Intl.NumberFormat) => data.map((value: number) => nonEditable(numberCell(value, format)));

export const HistoricalSheet = ({ ssg, onChange }: Props) => {
  const rows = [
    {
      rowId: HistoricalDataRowId.Header,
      cells: [
        cornerCell(),
        numberCell(ssg.startingYear, YearFormat, 'entry-cell'),
        nonEditable(numberCell(ssg.startingYear + 1, YearFormat)),
        nonEditable(numberCell(ssg.startingYear + 2, YearFormat)),
        nonEditable(numberCell(ssg.startingYear + 3, YearFormat)),
        nonEditable(numberCell(ssg.startingYear + 4, YearFormat)),
        nonEditable(numberCell(ssg.startingYear + 5, YearFormat)),
        nonEditable(numberCell(ssg.startingYear + 6, YearFormat)),
        nonEditable(numberCell(ssg.startingYear + 7, YearFormat)),
        nonEditable(numberCell(ssg.startingYear + 8, YearFormat)),
        nonEditable(numberCell(ssg.startingYear + 9, YearFormat))
      ]
    },
    {
      rowId: HistoricalDataRowId.Revenue,
      cells: [
        nonEditable(textCell('Revenue')),
        ...entryRow(ssg.revenue, OneDecimalFormat)
      ]
    },
    {
      rowId: HistoricalDataRowId.RevenueGrowth,
      cells: [
        nonEditable(textCell('Revenue Growth')),
        ...fixedRow([ NaN, ...ssg.revenueGrowth ], PercentFormat)
      ]
    },
    {
      rowId: HistoricalDataRowId.NetProfit,
      cells: [
        nonEditable(textCell('Net Profit')),
        ...entryRow(ssg.netProfit, OneDecimalFormat)
      ]
    },
    {
      rowId: HistoricalDataRowId.IncomeTaxRate,
      cells: [
        nonEditable(textCell('Income Tax Rate')),
        ...entryRow(ssg.incomeTaxRate, PercentFormat)
      ]
    },
    {
      rowId: HistoricalDataRowId.PreTaxNetIncome,
      cells: [
        nonEditable(textCell('Pre-Tax Net Income')),
        ...fixedRow(ssg.preTaxNetIncome, OneDecimalFormat)
      ]
    },
    {
      rowId: HistoricalDataRowId.PreTaxIncomeGrowth,
      cells: [
        nonEditable(textCell('Pre-Tax Income Growth')),
        ...fixedRow([ NaN, ...ssg.preTaxIncomeGrowth ], PercentFormat)
      ]
    },
    {
      rowId: HistoricalDataRowId.PreTaxProfitMargin,
      cells: [
        nonEditable(textCell('Pre-Tax Profit Margin')),
        ...fixedRow(ssg.preTaxProfitMargin, PercentFormat)
      ]
    },
    {
      rowId: HistoricalDataRowId.EPS,
      cells: [
        nonEditable(textCell('EPS')),
        ...entryRow(ssg.eps, TwoDecimalFormat)
      ]
    },
    {
      rowId: HistoricalDataRowId.EPSGrowth,
      cells: [
        nonEditable(textCell('EPS Growth')),
        ...fixedRow([ NaN, ...ssg.epsGrowth ], PercentFormat)
      ]
    },
    {
      rowId: HistoricalDataRowId.HighStockPrice,
      cells: [
        nonEditable(textCell('High Stock Price')),
        ...entryRow(ssg.highStockPrice, TwoDecimalFormat)
      ]
    },
    {
      rowId: HistoricalDataRowId.LowStockPrice,
      cells: [
        nonEditable(textCell('Low Stock Price')),
        ...entryRow(ssg.lowStockPrice, TwoDecimalFormat)
      ]
    },
    
    {
      rowId: HistoricalDataRowId.HighPERatio,
      cells: [
        nonEditable(textCell('High PE Ratio')),
        ...fixedRow(ssg.highPERatio, OneDecimalFormat)
      ]
    },
    {
      rowId: HistoricalDataRowId.LowPERatio,
      cells: [
        nonEditable(textCell('Low PE Ratio')),
        ...fixedRow(ssg.lowPERatio, OneDecimalFormat)
      ]
    },    
    {
      rowId: HistoricalDataRowId.DividendPerShare,
      cells: [
        nonEditable(textCell('Dividend Per Share')),
        ...entryRow(ssg.dividendPerShare, TwoDecimalFormat)
      ]
    },
    {
      rowId: HistoricalDataRowId.DividendGrowth,
      cells: [
        nonEditable(textCell('Dividend Growth')),
        ...fixedRow([ NaN, ...ssg.dividendGrowth ], PercentFormat)
      ]
    },
    {
      rowId: HistoricalDataRowId.DividendPayout,
      cells: [
        nonEditable(textCell('Dividend Payout')),
        ...fixedRow(ssg.dividendPayout, PercentFormat)
      ]
    },
    {
      rowId: HistoricalDataRowId.HighYield,
      cells: [
        nonEditable(textCell('High Yield')),
        ...fixedRow(ssg.highYield, PercentFormat)
      ]
    },
    {
      rowId: HistoricalDataRowId.OutstandingShares,
      cells: [
        nonEditable(textCell('Outstanding Shares')),
        ...entryRow(ssg.outstandingShares, OneDecimalFormat)
      ]
    },

    {
      rowId: HistoricalDataRowId.OutstandingShareGrowth,
      cells: [
        nonEditable(textCell('Outstanding Share Growth')),
        ...fixedRow([ NaN, ...ssg.outstandingShareGrowth ], PercentFormat)
      ]
    }
  ];

  const columns = [
    { columnId: -1, width: 250 },
    { columnId: 0, width: 125 },
    { columnId: 1, width: 125 },
    { columnId: 2, width: 125 },
    { columnId: 3, width: 125 },
    { columnId: 4, width: 125 },
    { columnId: 5, width: 125 },
    { columnId: 6, width: 125 },
    { columnId: 7, width: 125 },
    { columnId: 8, width: 125 },
    { columnId: 9, width: 125 }
  ];

  return (
    <div className='historical-sheet'>
      <ReactGrid rows={rows} columns={columns} onCellsChanged={onChange} enableRangeSelection />
    </div>
  );
};