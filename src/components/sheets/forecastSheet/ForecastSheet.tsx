import './ForecastSheet.css';
import { Row, Column, Cell } from '@silevis/reactgrid';
import { BaseSheet, NumberCell, FixedCell } from '@components/';
import { OneDecimalFormat, TwoDecimalFormat, PercentFormat } from '@constants/';
import { SSG, PropsBase, SSGDataField } from '@_types/';

type OnChangeFunction = (value: number, colIndex: number) => void;

interface Props extends PropsBase {
  ssg: SSG,
  onChange: (field: SSGDataField) => OnChangeFunction
}

const fixedCell = (value?: string, className?: string) => ({ Template: FixedCell, props: { value, className } } as Cell);

const numberCell = (value: number, format: Intl.NumberFormat, className?: string) => ({ Template: NumberCell, props: { value: value.toString(), format, className }} as Cell);

const entryCell = (value: number, format: Intl.NumberFormat, onChange: OnChangeFunction, className?: string) => ({ Template: NumberCell, props: { value, format, className, onChange }} as Cell);

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
    // row 1
    fixedCell(),
    fixedCell('Downside'),
    fixedCell('Base'),
    fixedCell('Upside'),

    // row 2
    fixedCell('Revenue Growth', 'title-cell'),
    entryCell(ssg.fcRevenueGrowth[0], PercentFormat, onChange('fcRevenueGrowth'), 'downside-cell corner-shadow'),
    entryCell(ssg.fcRevenueGrowth[1], PercentFormat, onChange('fcRevenueGrowth'), 'base-cell top-shadow'),
    entryCell(ssg.fcRevenueGrowth[2], PercentFormat, onChange('fcRevenueGrowth'), 'upside-cell top-shadow'),
    
    // row 3
    fixedCell('Revenue', 'title-cell'),
    numberCell(ssg.fcRevenue[0], OneDecimalFormat, 'number-cell left-shadow'),
    numberCell(ssg.fcRevenue[1], OneDecimalFormat, 'number-cell'),
    numberCell(ssg.fcRevenue[2], OneDecimalFormat, 'number-cell'),

    // row 4
    fixedCell('Pre-Tax Profit Margin', 'title-cell'),
    entryCell(ssg.fcPreTaxProfitMargin[0], PercentFormat, onChange('fcPreTaxProfitMargin'), 'downside-cell left-shadow'),
    entryCell(ssg.fcPreTaxProfitMargin[1], PercentFormat, onChange('fcPreTaxProfitMargin'), 'base-cell'),
    entryCell(ssg.fcPreTaxProfitMargin[2], PercentFormat, onChange('fcPreTaxProfitMargin'), 'upside-cell'),

    // row 5
    fixedCell('Pre-Tax Net Income', 'title-cell'),
    numberCell(ssg.fcPreTaxNetIncome[0], OneDecimalFormat, 'number-cell left-shadow'),
    numberCell(ssg.fcPreTaxNetIncome[1], OneDecimalFormat, 'number-cell'),
    numberCell(ssg.fcPreTaxNetIncome[2], OneDecimalFormat, 'number-cell'),

    // row 6
    fixedCell('Income Tax Rate', 'title-cell'),
    entryCell(ssg.fcIncomeTaxRate[0], PercentFormat, onChange('fcIncomeTaxRate'), 'downside-cell left-shadow'),
    entryCell(ssg.fcIncomeTaxRate[1], PercentFormat, onChange('fcIncomeTaxRate'), 'base-cell'),
    entryCell(ssg.fcIncomeTaxRate[2], PercentFormat, onChange('fcIncomeTaxRate'), 'upside-cell'),

    // row 7
    fixedCell('Net Profit', 'title-cell'),
    numberCell(ssg.fcNetProfit[0], OneDecimalFormat, 'number-cell left-shadow'),
    numberCell(ssg.fcNetProfit[1], OneDecimalFormat, 'number-cell'),
    numberCell(ssg.fcNetProfit[2], OneDecimalFormat, 'number-cell'),

    // row 8
    fixedCell('Outstanding Share Growth', 'title-cell'),
    entryCell(ssg.fcOutstandingShareGrowth[0], PercentFormat, onChange('fcOutstandingShareGrowth'), 'downside-cell left-shadow'),
    entryCell(ssg.fcOutstandingShareGrowth[1], PercentFormat, onChange('fcOutstandingShareGrowth'), 'base-cell'),
    entryCell(ssg.fcOutstandingShareGrowth[2], PercentFormat, onChange('fcOutstandingShareGrowth'), 'upside-cell'),

    // row 9
    fixedCell('Outstanding Shares', 'title-cell'),
    numberCell(ssg.fcOutstandingShares[0], OneDecimalFormat, 'number-cell left-shadow'),
    numberCell(ssg.fcOutstandingShares[1], OneDecimalFormat, 'number-cell'),
    numberCell(ssg.fcOutstandingShares[2], OneDecimalFormat, 'number-cell'),
    
    // row 10
    fixedCell('EPS', 'title-cell'),
    numberCell(ssg.fcEPS[0], TwoDecimalFormat, 'number-cell left-shadow'),
    numberCell(ssg.fcEPS[1], TwoDecimalFormat, 'number-cell'),
    numberCell(ssg.fcEPS[2], TwoDecimalFormat, 'number-cell'),

    // row 11
    fixedCell('EPS Growth', 'title-cell'),
    numberCell(ssg.fcEPSGrowth[0], PercentFormat, 'number-cell left-shadow'),
    numberCell(ssg.fcEPSGrowth[1], PercentFormat, 'number-cell'),
    numberCell(ssg.fcEPSGrowth[2], PercentFormat, 'number-cell'),

    // row 12
    fixedCell('PE Ratio', 'title-cell'),
    entryCell(ssg.fcPERatio[0], OneDecimalFormat, onChange('fcPERatio'), 'downside-cell left-shadow'),
    entryCell(ssg.fcPERatio[1], OneDecimalFormat, onChange('fcPERatio'), 'base-cell'),
    entryCell(ssg.fcPERatio[2], OneDecimalFormat, onChange('fcPERatio'), 'upside-cell'),
    
    // row 13
    fixedCell('Stock Price', 'title-cell'),
    numberCell(ssg.fcStockPrice[0], TwoDecimalFormat, 'number-cell left-shadow'),
    numberCell(ssg.fcStockPrice[1], TwoDecimalFormat, 'number-cell'),
    numberCell(ssg.fcStockPrice[2], TwoDecimalFormat, 'number-cell'),

    // row 14
    fixedCell('Total Stock Price Growth', 'title-cell'),
    numberCell(ssg.fcTotalStockPriceGrowth[0], PercentFormat, 'number-cell left-shadow'),
    numberCell(ssg.fcTotalStockPriceGrowth[1], PercentFormat, 'number-cell'),
    numberCell(ssg.fcTotalStockPriceGrowth[2], PercentFormat, 'number-cell'),
    
    // row 15
    fixedCell('Annual Stock Price Growth', 'title-cell'),
    numberCell(ssg.fcAnnualStockPriceGrowth[0], PercentFormat, 'number-cell left-shadow'),
    numberCell(ssg.fcAnnualStockPriceGrowth[1], PercentFormat, 'number-cell'),
    numberCell(ssg.fcAnnualStockPriceGrowth[2], PercentFormat, 'number-cell'),
    
    // row 16
    fixedCell('Current Dividend Yield', 'title-cell'),
    numberCell(ssg.currentDividendYield[0], PercentFormat, 'number-cell left-shadow'),
    numberCell(ssg.currentDividendYield[1], PercentFormat, 'number-cell'),
    numberCell(ssg.currentDividendYield[2], PercentFormat, 'number-cell'),
    
    // row 17
    fixedCell('Total Annual Return', 'title-cell'),
    numberCell(ssg.fcTotalAnnualReturn[0], PercentFormat, 'number-cell left-shadow'),
    numberCell(ssg.fcTotalAnnualReturn[1], PercentFormat, 'number-cell'),
    numberCell(ssg.fcTotalAnnualReturn[2], PercentFormat, 'number-cell')
  ];

  const defaultCells: Cell[] = [
    // row 1
    fixedCell('Downside', 'header-cell'),
    fixedCell('Base', 'header-cell'),
    fixedCell('Upside', 'header-cell'),

    // row 2
    numberCell(ssg.fcRevenueGrowthDefault[0], PercentFormat, 'downside-cell top-shadow'),
    numberCell(ssg.fcRevenueGrowthDefault[1], PercentFormat, 'base-cell top-shadow'),
    numberCell(ssg.fcRevenueGrowthDefault[2], PercentFormat, 'upside-cell top-shadow'),
    
    // row 3
    numberCell(ssg.fcRevenueDefault[0], OneDecimalFormat, 'number-cell'),
    numberCell(ssg.fcRevenueDefault[1], OneDecimalFormat, 'number-cell'),
    numberCell(ssg.fcRevenueDefault[2], OneDecimalFormat, 'number-cell'),

    // row 4
    numberCell(ssg.fcPreTaxProfitMarginDefault[0], PercentFormat, 'downside-cell'),
    numberCell(ssg.fcPreTaxProfitMarginDefault[1], PercentFormat, 'base-cell'),
    numberCell(ssg.fcPreTaxProfitMarginDefault[2], PercentFormat, 'upside-cell'),

    // row 5
    numberCell(ssg.fcPreTaxNetIncomeDefault[0], OneDecimalFormat, 'number-cell'),
    numberCell(ssg.fcPreTaxNetIncomeDefault[1], OneDecimalFormat, 'number-cell'),
    numberCell(ssg.fcPreTaxNetIncomeDefault[2], OneDecimalFormat, 'number-cell'),

    // row 6
    numberCell(ssg.fcIncomeTaxRateDefault[0], PercentFormat, 'downside-cell'),
    numberCell(ssg.fcIncomeTaxRateDefault[1], PercentFormat, 'base-cell'),
    numberCell(ssg.fcIncomeTaxRateDefault[2], PercentFormat, 'upside-cell'),

    // row 7
    numberCell(ssg.fcNetProfitDefault[0], OneDecimalFormat, 'number-cell'),
    numberCell(ssg.fcNetProfitDefault[1], OneDecimalFormat, 'number-cell'),
    numberCell(ssg.fcNetProfitDefault[2], OneDecimalFormat, 'number-cell'),

    // row 8
    numberCell(ssg.fcOutstandingShareGrowthDefault[0], PercentFormat, 'downside-cell'),
    numberCell(ssg.fcOutstandingShareGrowthDefault[1], PercentFormat, 'base-cell'),
    numberCell(ssg.fcOutstandingShareGrowthDefault[2], PercentFormat, 'upside-cell'),

    // row 9
    numberCell(ssg.fcOutstandingSharesDefault[0], OneDecimalFormat, 'number-cell'),
    numberCell(ssg.fcOutstandingSharesDefault[1], OneDecimalFormat, 'number-cell'),
    numberCell(ssg.fcOutstandingSharesDefault[2], OneDecimalFormat, 'number-cell'),
    
    // row 10
    numberCell(ssg.fcEPSDefault[0], TwoDecimalFormat, 'number-cell'),
    numberCell(ssg.fcEPSDefault[1], TwoDecimalFormat, 'number-cell'),
    numberCell(ssg.fcEPSDefault[2], TwoDecimalFormat, 'number-cell'),

    // row 11
    numberCell(ssg.fcEPSGrowthDefault[0], PercentFormat, 'number-cell'),
    numberCell(ssg.fcEPSGrowthDefault[1], PercentFormat, 'number-cell'),
    numberCell(ssg.fcEPSGrowthDefault[2], PercentFormat, 'number-cell'),

    // row 12
    numberCell(ssg.fcPERatioDefault[0], OneDecimalFormat, 'downside-cell'),
    numberCell(ssg.fcPERatioDefault[1], OneDecimalFormat, 'base-cell'),
    numberCell(ssg.fcPERatioDefault[2], OneDecimalFormat, 'upside-cell'),
    
    // row 13
    numberCell(ssg.fcStockPriceDefault[0], TwoDecimalFormat, 'number-cell'),
    numberCell(ssg.fcStockPriceDefault[1], TwoDecimalFormat, 'number-cell'),
    numberCell(ssg.fcStockPriceDefault[2], TwoDecimalFormat, 'number-cell'),

    // row 14
    numberCell(ssg.fcTotalStockPriceGrowthDefault[0], PercentFormat, 'number-cell'),
    numberCell(ssg.fcTotalStockPriceGrowthDefault[1], PercentFormat, 'number-cell'),
    numberCell(ssg.fcTotalStockPriceGrowthDefault[2], PercentFormat, 'number-cell'),
    
    // row 15
    numberCell(ssg.fcAnnualStockPriceGrowthDefault[0], PercentFormat, 'number-cell'),
    numberCell(ssg.fcAnnualStockPriceGrowthDefault[1], PercentFormat, 'number-cell'),
    numberCell(ssg.fcAnnualStockPriceGrowthDefault[2], PercentFormat, 'number-cell'),
    
    // row 16
    numberCell(ssg.currentDividendYield[0], PercentFormat, 'number-cell'),
    numberCell(ssg.currentDividendYield[1], PercentFormat, 'number-cell'),
    numberCell(ssg.currentDividendYield[2], PercentFormat, 'number-cell'),
    
    // row 17
    numberCell(ssg.fcTotalAnnualReturnDefault[0], PercentFormat, 'number-cell'),
    numberCell(ssg.fcTotalAnnualReturnDefault[1], PercentFormat, 'number-cell'),
    numberCell(ssg.fcTotalAnnualReturnDefault[2], PercentFormat, 'number-cell')
  ];

  return (
    <div className='forecast-sheet'>
      <BaseSheet id='forecast' rows={rows} columns={forecastColumns} cells={forecastCells} stickyLeftColumns={1} />
      <div className='forecast-sheet-default'>
        <BaseSheet id='default' rows={rows} columns={defaultColumns} cells={defaultCells} />
      </div>
    </div>
  );
};