import './HistoricalSheet.css';
import { Row, Column, Cell } from '@silevis/reactgrid';
import { BaseSheet, NumberCell, FixedCell } from '@components/';
import { YearFormat, OneDecimalFormat, TwoDecimalFormat, PercentFormat } from '@constants/';
import { SSG, PropsBase, SSGDataField } from '@_types/';

type OnChangeFunction = (value: number, colIndex: number) => void;

interface Props extends PropsBase {
  ssg: SSG,
  onChange: (field: SSGDataField) => OnChangeFunction
}

const fixedCell = (value?: string, className?: string) => ({ Template: FixedCell, props: { value, className } } as Cell);

const numberCell = (value: number, format: Intl.NumberFormat, className?: string) => ({ Template: NumberCell, props: { value: value.toString(), format, className }} as Cell);

const entryCell = (value: number, format: Intl.NumberFormat, onChange: OnChangeFunction, className?: string) => ({ Template: NumberCell, props: { value, format, className, onChange }} as Cell);

export const HistoricalSheet = ({ ssg, onChange }: Props) => {
  const rows: Row[] = [
    { rowIndex: 0, height: 35 },
    { rowIndex: 1, height: 35 },
    { rowIndex: 2, height: 35 },
    { rowIndex: 3, height: 35 },
    { rowIndex: 4, height: 35 },
    { rowIndex: 5, height: 35 },
    { rowIndex: 6, height: 35 },
    { rowIndex: 7, height: 35 },
    { rowIndex: 8, height: 35 },
    { rowIndex: 9, height: 35 },
    { rowIndex: 10, height: 35 },
    { rowIndex: 11, height: 35 },
    { rowIndex: 12, height: 35 },
    { rowIndex: 13, height: 35 },
    { rowIndex: 14, height: 35 },
    { rowIndex: 15, height: 35 },
    { rowIndex: 16, height: 35 },
    { rowIndex: 17, height: 35 },
    { rowIndex: 18, height: 35 },
    { rowIndex: 19, height: 35 }
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
    // row 1
    fixedCell(),
    entryCell(ssg.startingYear, YearFormat, onChange('startingYear'), 'entry-cell'),
    fixedCell(`${ssg.startingYear + 1}`),
    fixedCell(`${ssg.startingYear + 2}`),
    fixedCell(`${ssg.startingYear + 3}`),
    fixedCell(`${ssg.startingYear + 4}`),
    fixedCell(`${ssg.startingYear + 5}`),
    fixedCell(`${ssg.startingYear + 6}`),
    fixedCell(`${ssg.startingYear + 7}`),
    fixedCell(`${ssg.startingYear + 8}`),
    fixedCell(`${ssg.startingYear + 9}`),

    // row 2
    fixedCell('Revenue', 'title-cell'),
    entryCell(ssg.revenue[0], OneDecimalFormat, onChange('revenue'), 'entry-cell top-shadow'),
    entryCell(ssg.revenue[1], OneDecimalFormat, onChange('revenue'), 'entry-cell top-shadow'),
    entryCell(ssg.revenue[2], OneDecimalFormat, onChange('revenue'), 'entry-cell top-shadow'),
    entryCell(ssg.revenue[3], OneDecimalFormat, onChange('revenue'), 'entry-cell top-shadow'),
    entryCell(ssg.revenue[4], OneDecimalFormat, onChange('revenue'), 'entry-cell top-shadow'),
    entryCell(ssg.revenue[5], OneDecimalFormat, onChange('revenue'), 'entry-cell top-shadow'),
    entryCell(ssg.revenue[6], OneDecimalFormat, onChange('revenue'), 'entry-cell top-shadow'),
    entryCell(ssg.revenue[7], OneDecimalFormat, onChange('revenue'), 'entry-cell top-shadow'),
    entryCell(ssg.revenue[8], OneDecimalFormat, onChange('revenue'), 'entry-cell top-shadow'),
    entryCell(ssg.revenue[9], OneDecimalFormat, onChange('revenue'), 'entry-cell top-shadow'),
    
    // row 3
    fixedCell('Revenue Growth', 'title-cell'),
    fixedCell('', 'number-cell'),
    numberCell(ssg.revenueGrowth[0], PercentFormat, 'number-cell'),
    numberCell(ssg.revenueGrowth[1], PercentFormat, 'number-cell'),
    numberCell(ssg.revenueGrowth[2], PercentFormat, 'number-cell'),
    numberCell(ssg.revenueGrowth[3], PercentFormat, 'number-cell'),
    numberCell(ssg.revenueGrowth[4], PercentFormat, 'number-cell'),
    numberCell(ssg.revenueGrowth[5], PercentFormat, 'number-cell'),
    numberCell(ssg.revenueGrowth[6], PercentFormat, 'number-cell'),
    numberCell(ssg.revenueGrowth[7], PercentFormat, 'number-cell'),
    numberCell(ssg.revenueGrowth[8], PercentFormat, 'number-cell'),
    
    // row 4
    fixedCell('Net Profit', 'title-cell'),
    entryCell(ssg.netProfit[0], OneDecimalFormat, onChange('netProfit'), 'entry-cell'),
    entryCell(ssg.netProfit[1], OneDecimalFormat, onChange('netProfit'), 'entry-cell'),
    entryCell(ssg.netProfit[2], OneDecimalFormat, onChange('netProfit'), 'entry-cell'),
    entryCell(ssg.netProfit[3], OneDecimalFormat, onChange('netProfit'), 'entry-cell'),
    entryCell(ssg.netProfit[4], OneDecimalFormat, onChange('netProfit'), 'entry-cell'),
    entryCell(ssg.netProfit[5], OneDecimalFormat, onChange('netProfit'), 'entry-cell'),
    entryCell(ssg.netProfit[6], OneDecimalFormat, onChange('netProfit'), 'entry-cell'),
    entryCell(ssg.netProfit[7], OneDecimalFormat, onChange('netProfit'), 'entry-cell'),
    entryCell(ssg.netProfit[8], OneDecimalFormat, onChange('netProfit'), 'entry-cell'),
    entryCell(ssg.netProfit[9], OneDecimalFormat, onChange('netProfit'), 'entry-cell'),
    
    // row 5
    fixedCell('Income Tax Rate', 'title-cell'),
    entryCell(ssg.incomeTaxRate[0], PercentFormat, onChange('incomeTaxRate'), 'entry-cell'),
    entryCell(ssg.incomeTaxRate[1], PercentFormat, onChange('incomeTaxRate'), 'entry-cell'),
    entryCell(ssg.incomeTaxRate[2], PercentFormat, onChange('incomeTaxRate'), 'entry-cell'),
    entryCell(ssg.incomeTaxRate[3], PercentFormat, onChange('incomeTaxRate'), 'entry-cell'),
    entryCell(ssg.incomeTaxRate[4], PercentFormat, onChange('incomeTaxRate'), 'entry-cell'),
    entryCell(ssg.incomeTaxRate[5], PercentFormat, onChange('incomeTaxRate'), 'entry-cell'),
    entryCell(ssg.incomeTaxRate[6], PercentFormat, onChange('incomeTaxRate'), 'entry-cell'),
    entryCell(ssg.incomeTaxRate[7], PercentFormat, onChange('incomeTaxRate'), 'entry-cell'),
    entryCell(ssg.incomeTaxRate[8], PercentFormat, onChange('incomeTaxRate'), 'entry-cell'),
    entryCell(ssg.incomeTaxRate[9], PercentFormat, onChange('incomeTaxRate'), 'entry-cell'),
    
    // row 6
    fixedCell('Pre-Tax Net Income', 'title-cell'),
    numberCell(ssg.preTaxNetIncome[0], OneDecimalFormat, 'number-cell'),
    numberCell(ssg.preTaxNetIncome[1], OneDecimalFormat, 'number-cell'),
    numberCell(ssg.preTaxNetIncome[2], OneDecimalFormat, 'number-cell'),
    numberCell(ssg.preTaxNetIncome[3], OneDecimalFormat, 'number-cell'),
    numberCell(ssg.preTaxNetIncome[4], OneDecimalFormat, 'number-cell'),
    numberCell(ssg.preTaxNetIncome[5], OneDecimalFormat, 'number-cell'),
    numberCell(ssg.preTaxNetIncome[6], OneDecimalFormat, 'number-cell'),
    numberCell(ssg.preTaxNetIncome[7], OneDecimalFormat, 'number-cell'),
    numberCell(ssg.preTaxNetIncome[8], OneDecimalFormat, 'number-cell'),
    numberCell(ssg.preTaxNetIncome[9], OneDecimalFormat, 'number-cell'),

    // row 7
    fixedCell('Pre-Tax Income Growth', 'title-cell'),
    fixedCell('', 'number-cell'),
    numberCell(ssg.preTaxIncomeGrowth[0], PercentFormat, 'number-cell'),
    numberCell(ssg.preTaxIncomeGrowth[1], PercentFormat, 'number-cell'),
    numberCell(ssg.preTaxIncomeGrowth[2], PercentFormat, 'number-cell'),
    numberCell(ssg.preTaxIncomeGrowth[3], PercentFormat, 'number-cell'),
    numberCell(ssg.preTaxIncomeGrowth[4], PercentFormat, 'number-cell'),
    numberCell(ssg.preTaxIncomeGrowth[5], PercentFormat, 'number-cell'),
    numberCell(ssg.preTaxIncomeGrowth[6], PercentFormat, 'number-cell'),
    numberCell(ssg.preTaxIncomeGrowth[7], PercentFormat, 'number-cell'),
    numberCell(ssg.preTaxIncomeGrowth[8], PercentFormat, 'number-cell'),
    
    // row 8
    fixedCell('Pre-Tax Profit Margin', 'title-cell'),
    numberCell(ssg.preTaxProfitMargin[0], PercentFormat, 'number-cell'),
    numberCell(ssg.preTaxProfitMargin[1], PercentFormat, 'number-cell'),
    numberCell(ssg.preTaxProfitMargin[2], PercentFormat, 'number-cell'),
    numberCell(ssg.preTaxProfitMargin[3], PercentFormat, 'number-cell'),
    numberCell(ssg.preTaxProfitMargin[4], PercentFormat, 'number-cell'),
    numberCell(ssg.preTaxProfitMargin[5], PercentFormat, 'number-cell'),
    numberCell(ssg.preTaxProfitMargin[6], PercentFormat, 'number-cell'),
    numberCell(ssg.preTaxProfitMargin[7], PercentFormat, 'number-cell'),
    numberCell(ssg.preTaxProfitMargin[8], PercentFormat, 'number-cell'),
    numberCell(ssg.preTaxProfitMargin[9], PercentFormat, 'number-cell'),
    
    // row 9
    fixedCell('EPS', 'title-cell'),
    entryCell(ssg.eps[0], TwoDecimalFormat, onChange('eps'), 'entry-cell'),
    entryCell(ssg.eps[1], TwoDecimalFormat, onChange('eps'), 'entry-cell'),
    entryCell(ssg.eps[2], TwoDecimalFormat, onChange('eps'), 'entry-cell'),
    entryCell(ssg.eps[3], TwoDecimalFormat, onChange('eps'), 'entry-cell'),
    entryCell(ssg.eps[4], TwoDecimalFormat, onChange('eps'), 'entry-cell'),
    entryCell(ssg.eps[5], TwoDecimalFormat, onChange('eps'), 'entry-cell'),
    entryCell(ssg.eps[6], TwoDecimalFormat, onChange('eps'), 'entry-cell'),
    entryCell(ssg.eps[7], TwoDecimalFormat, onChange('eps'), 'entry-cell'),
    entryCell(ssg.eps[8], TwoDecimalFormat, onChange('eps'), 'entry-cell'),
    entryCell(ssg.eps[9], TwoDecimalFormat, onChange('eps'), 'entry-cell'),
    
    // row 10
    fixedCell('EPS Growth', 'title-cell'),
    fixedCell('', 'number-cell'),
    numberCell(ssg.epsGrowth[0], PercentFormat, 'number-cell'),
    numberCell(ssg.epsGrowth[1], PercentFormat, 'number-cell'),
    numberCell(ssg.epsGrowth[2], PercentFormat, 'number-cell'),
    numberCell(ssg.epsGrowth[3], PercentFormat, 'number-cell'),
    numberCell(ssg.epsGrowth[4], PercentFormat, 'number-cell'),
    numberCell(ssg.epsGrowth[5], PercentFormat, 'number-cell'),
    numberCell(ssg.epsGrowth[6], PercentFormat, 'number-cell'),
    numberCell(ssg.epsGrowth[7], PercentFormat, 'number-cell'),
    numberCell(ssg.epsGrowth[8], PercentFormat, 'number-cell'),
    
    // row 11
    fixedCell('High Stock Price', 'title-cell'),
    entryCell(ssg.highStockPrice[0], TwoDecimalFormat, onChange('highStockPrice'), 'entry-cell'),
    entryCell(ssg.highStockPrice[1], TwoDecimalFormat, onChange('highStockPrice'), 'entry-cell'),
    entryCell(ssg.highStockPrice[2], TwoDecimalFormat, onChange('highStockPrice'), 'entry-cell'),
    entryCell(ssg.highStockPrice[3], TwoDecimalFormat, onChange('highStockPrice'), 'entry-cell'),
    entryCell(ssg.highStockPrice[4], TwoDecimalFormat, onChange('highStockPrice'), 'entry-cell'),
    entryCell(ssg.highStockPrice[5], TwoDecimalFormat, onChange('highStockPrice'), 'entry-cell'),
    entryCell(ssg.highStockPrice[6], TwoDecimalFormat, onChange('highStockPrice'), 'entry-cell'),
    entryCell(ssg.highStockPrice[7], TwoDecimalFormat, onChange('highStockPrice'), 'entry-cell'),
    entryCell(ssg.highStockPrice[8], TwoDecimalFormat, onChange('highStockPrice'), 'entry-cell'),
    entryCell(ssg.highStockPrice[9], TwoDecimalFormat, onChange('highStockPrice'), 'entry-cell'),
    
    // row 12
    fixedCell('Low Stock Price', 'title-cell'),
    entryCell(ssg.lowStockPrice[0], TwoDecimalFormat, onChange('lowStockPrice'), 'entry-cell'),
    entryCell(ssg.lowStockPrice[1], TwoDecimalFormat, onChange('lowStockPrice'), 'entry-cell'),
    entryCell(ssg.lowStockPrice[2], TwoDecimalFormat, onChange('lowStockPrice'), 'entry-cell'),
    entryCell(ssg.lowStockPrice[3], TwoDecimalFormat, onChange('lowStockPrice'), 'entry-cell'),
    entryCell(ssg.lowStockPrice[4], TwoDecimalFormat, onChange('lowStockPrice'), 'entry-cell'),
    entryCell(ssg.lowStockPrice[5], TwoDecimalFormat, onChange('lowStockPrice'), 'entry-cell'),
    entryCell(ssg.lowStockPrice[6], TwoDecimalFormat, onChange('lowStockPrice'), 'entry-cell'),
    entryCell(ssg.lowStockPrice[7], TwoDecimalFormat, onChange('lowStockPrice'), 'entry-cell'),
    entryCell(ssg.lowStockPrice[8], TwoDecimalFormat, onChange('lowStockPrice'), 'entry-cell'),
    entryCell(ssg.lowStockPrice[9], TwoDecimalFormat, onChange('lowStockPrice'), 'entry-cell'),
    
    // row 13
    fixedCell('High PE Ratio', 'title-cell'),
    numberCell(ssg.highPERatio[0], OneDecimalFormat, 'number-cell'),
    numberCell(ssg.highPERatio[1], OneDecimalFormat, 'number-cell'),
    numberCell(ssg.highPERatio[2], OneDecimalFormat, 'number-cell'),
    numberCell(ssg.highPERatio[3], OneDecimalFormat, 'number-cell'),
    numberCell(ssg.highPERatio[4], OneDecimalFormat, 'number-cell'),
    numberCell(ssg.highPERatio[5], OneDecimalFormat, 'number-cell'),
    numberCell(ssg.highPERatio[6], OneDecimalFormat, 'number-cell'),
    numberCell(ssg.highPERatio[7], OneDecimalFormat, 'number-cell'),
    numberCell(ssg.highPERatio[8], OneDecimalFormat, 'number-cell'),
    numberCell(ssg.highPERatio[9], OneDecimalFormat, 'number-cell'),

    // row 14
    fixedCell('Low PE Ratio', 'title-cell'),
    numberCell(ssg.lowPERatio[0], OneDecimalFormat, 'number-cell'),
    numberCell(ssg.lowPERatio[1], OneDecimalFormat, 'number-cell'),
    numberCell(ssg.lowPERatio[2], OneDecimalFormat, 'number-cell'),
    numberCell(ssg.lowPERatio[3], OneDecimalFormat, 'number-cell'),
    numberCell(ssg.lowPERatio[4], OneDecimalFormat, 'number-cell'),
    numberCell(ssg.lowPERatio[5], OneDecimalFormat, 'number-cell'),
    numberCell(ssg.lowPERatio[6], OneDecimalFormat, 'number-cell'),
    numberCell(ssg.lowPERatio[7], OneDecimalFormat, 'number-cell'),
    numberCell(ssg.lowPERatio[8], OneDecimalFormat, 'number-cell'),
    numberCell(ssg.lowPERatio[9], OneDecimalFormat, 'number-cell'),
    
    // row 15
    fixedCell('Dividend Per Share', 'title-cell'),
    entryCell(ssg.dividendPerShare[0], TwoDecimalFormat, onChange('dividendPerShare'), 'entry-cell'),
    entryCell(ssg.dividendPerShare[1], TwoDecimalFormat, onChange('dividendPerShare'), 'entry-cell'),
    entryCell(ssg.dividendPerShare[2], TwoDecimalFormat, onChange('dividendPerShare'), 'entry-cell'),
    entryCell(ssg.dividendPerShare[3], TwoDecimalFormat, onChange('dividendPerShare'), 'entry-cell'),
    entryCell(ssg.dividendPerShare[4], TwoDecimalFormat, onChange('dividendPerShare'), 'entry-cell'),
    entryCell(ssg.dividendPerShare[5], TwoDecimalFormat, onChange('dividendPerShare'), 'entry-cell'),
    entryCell(ssg.dividendPerShare[6], TwoDecimalFormat, onChange('dividendPerShare'), 'entry-cell'),
    entryCell(ssg.dividendPerShare[7], TwoDecimalFormat, onChange('dividendPerShare'), 'entry-cell'),
    entryCell(ssg.dividendPerShare[8], TwoDecimalFormat, onChange('dividendPerShare'), 'entry-cell'),
    entryCell(ssg.dividendPerShare[9], TwoDecimalFormat, onChange('dividendPerShare'), 'entry-cell'),

    // row 16
    fixedCell('Dividend Growth', 'title-cell'),
    fixedCell('', 'number-cell'),
    numberCell(ssg.dividendGrowth[0], PercentFormat, 'number-cell'),
    numberCell(ssg.dividendGrowth[1], PercentFormat, 'number-cell'),
    numberCell(ssg.dividendGrowth[2], PercentFormat, 'number-cell'),
    numberCell(ssg.dividendGrowth[3], PercentFormat, 'number-cell'),
    numberCell(ssg.dividendGrowth[4], PercentFormat, 'number-cell'),
    numberCell(ssg.dividendGrowth[5], PercentFormat, 'number-cell'),
    numberCell(ssg.dividendGrowth[6], PercentFormat, 'number-cell'),
    numberCell(ssg.dividendGrowth[7], PercentFormat, 'number-cell'),
    numberCell(ssg.dividendGrowth[8], PercentFormat, 'number-cell'),
    
    // row 17
    fixedCell('Dividend Payout', 'title-cell'),
    numberCell(ssg.dividendPayout[0], PercentFormat, 'number-cell'),
    numberCell(ssg.dividendPayout[1], PercentFormat, 'number-cell'),
    numberCell(ssg.dividendPayout[2], PercentFormat, 'number-cell'),
    numberCell(ssg.dividendPayout[3], PercentFormat, 'number-cell'),
    numberCell(ssg.dividendPayout[4], PercentFormat, 'number-cell'),
    numberCell(ssg.dividendPayout[5], PercentFormat, 'number-cell'),
    numberCell(ssg.dividendPayout[6], PercentFormat, 'number-cell'),
    numberCell(ssg.dividendPayout[7], PercentFormat, 'number-cell'),
    numberCell(ssg.dividendPayout[8], PercentFormat, 'number-cell'),
    numberCell(ssg.dividendPayout[9], PercentFormat, 'number-cell'),
    
    // row 18
    fixedCell('High Yield', 'title-cell'),
    numberCell(ssg.highYield[0], PercentFormat, 'number-cell'),
    numberCell(ssg.highYield[1], PercentFormat, 'number-cell'),
    numberCell(ssg.highYield[2], PercentFormat, 'number-cell'),
    numberCell(ssg.highYield[3], PercentFormat, 'number-cell'),
    numberCell(ssg.highYield[4], PercentFormat, 'number-cell'),
    numberCell(ssg.highYield[5], PercentFormat, 'number-cell'),
    numberCell(ssg.highYield[6], PercentFormat, 'number-cell'),
    numberCell(ssg.highYield[7], PercentFormat, 'number-cell'),
    numberCell(ssg.highYield[8], PercentFormat, 'number-cell'),
    numberCell(ssg.highYield[9], PercentFormat, 'number-cell'),
    
    // row 19
    fixedCell('Outstanding Shares', 'title-cell'),
    entryCell(ssg.outstandingShares[0], OneDecimalFormat, onChange('outstandingShares'), 'entry-cell'),
    entryCell(ssg.outstandingShares[1], OneDecimalFormat, onChange('outstandingShares'), 'entry-cell'),
    entryCell(ssg.outstandingShares[2], OneDecimalFormat, onChange('outstandingShares'), 'entry-cell'),
    entryCell(ssg.outstandingShares[3], OneDecimalFormat, onChange('outstandingShares'), 'entry-cell'),
    entryCell(ssg.outstandingShares[4], OneDecimalFormat, onChange('outstandingShares'), 'entry-cell'),
    entryCell(ssg.outstandingShares[5], OneDecimalFormat, onChange('outstandingShares'), 'entry-cell'),
    entryCell(ssg.outstandingShares[6], OneDecimalFormat, onChange('outstandingShares'), 'entry-cell'),
    entryCell(ssg.outstandingShares[7], OneDecimalFormat, onChange('outstandingShares'), 'entry-cell'),
    entryCell(ssg.outstandingShares[8], OneDecimalFormat, onChange('outstandingShares'), 'entry-cell'),
    entryCell(ssg.outstandingShares[9], OneDecimalFormat, onChange('outstandingShares'), 'entry-cell'),

    // row 20
    fixedCell('Outstanding Share Growth', 'title-cell'),
    fixedCell('', 'number-cell'),
    numberCell(ssg.outstandingShareGrowth[0], PercentFormat, 'number-cell'),
    numberCell(ssg.outstandingShareGrowth[1], PercentFormat, 'number-cell'),
    numberCell(ssg.outstandingShareGrowth[2], PercentFormat, 'number-cell'),
    numberCell(ssg.outstandingShareGrowth[3], PercentFormat, 'number-cell'),
    numberCell(ssg.outstandingShareGrowth[4], PercentFormat, 'number-cell'),
    numberCell(ssg.outstandingShareGrowth[5], PercentFormat, 'number-cell'),
    numberCell(ssg.outstandingShareGrowth[6], PercentFormat, 'number-cell'),
    numberCell(ssg.outstandingShareGrowth[7], PercentFormat, 'number-cell'),
    numberCell(ssg.outstandingShareGrowth[8], PercentFormat, 'number-cell')
  ];

  return (
    <div className='historical-sheet'>
      <BaseSheet id='historical' rows={rows} columns={columns} cells={cells} stickyLeftColumns={1} />
    </div>
  );
};