import './index.css';
import '@silevis/reactgrid/styles.css';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'wouter';
import { ReactGrid, CellChange, Row, Column } from '@silevis/reactgrid';
import { useApi } from '../../hooks';
import { getHistoricalDataRows, getHistoricalDataColumns, getForecastDataRows, getForecastDataColumns, getForecastDefaultRows, getForecastDefaultColumns } from '../../utils/ssg-grid';
import { calculateSSG } from '../../utils/ssg';
import { HistoricalDataRowId, ForecastDataRowId, EmptySSG } from '../../constants/';

export const SSGPage = () => {
  const [ssg, setSSG] = useState(EmptySSG);
  const [_, navigate] = useLocation();
  const { getSSG, saveSSG, updateSSG } = useApi();
  const routeParams = useParams();

  useEffect(() => {
    if (routeParams[0])
      getSSG(Number(routeParams[0]))
        .then(data => convertDTOToSSG(data))
        .then(data => setSSG(data))
        .catch(error => console.error(error));
    else
      setSSG(EmptySSG);
  }, [routeParams]);

  const convertDTOToSSG = (data: any) => {
    return {
      name: data.name,
      isPresentedVersion: data.is_presented_version,
      presentedMonth: data.presented_month,
      stockTicker: data.stock_ticker,
      preparedBy: '',
      preparedDate: data.prepared_date.toString(),
      sourceData: data.source_data,
      sourceDate: data.source_date.toString(),
      yearsOfData: data.years_of_data,
      currentStockPrice: data.current_stock_price,
      currentStockPriceDate: data.current_stock_price_date.toString(),
      currentDividend: data.current_dividend,
      startingYear: data.starting_year,
      
      revenue: [
        data.revenue_year_1,
        data.revenue_year_2,
        data.revenue_year_3,
        data.revenue_year_4,
        data.revenue_year_5,
        data.revenue_year_6,
        data.revenue_year_7,
        data.revenue_year_8,
        data.revenue_year_9,
        data.revenue_year_10
      ],

      revenueGrowth: [
        data.revenue_growth_year_1,
        data.revenue_growth_year_2,
        data.revenue_growth_year_3,
        data.revenue_growth_year_4,
        data.revenue_growth_year_5,
        data.revenue_growth_year_6,
        data.revenue_growth_year_7,
        data.revenue_growth_year_8,
        data.revenue_growth_year_9
      ],

      netProfit: [
        data.net_profit_year_1,
        data.net_profit_year_2,
        data.net_profit_year_3,
        data.net_profit_year_4,
        data.net_profit_year_5,
        data.net_profit_year_6,
        data.net_profit_year_7,
        data.net_profit_year_8,
        data.net_profit_year_9,
        data.net_profit_year_10
      ],

      incomeTaxRate: [
        data.income_tax_rate_year_1,
        data.income_tax_rate_year_2,
        data.income_tax_rate_year_3,
        data.income_tax_rate_year_4,
        data.income_tax_rate_year_5,
        data.income_tax_rate_year_6,
        data.income_tax_rate_year_7,
        data.income_tax_rate_year_8,
        data.income_tax_rate_year_9,
        data.income_tax_rate_year_10
      ],

      preTaxNetIncome: [
        data.pre_tax_net_income_year_1,
        data.pre_tax_net_income_year_2,
        data.pre_tax_net_income_year_3,
        data.pre_tax_net_income_year_4,
        data.pre_tax_net_income_year_5,
        data.pre_tax_net_income_year_6,
        data.pre_tax_net_income_year_7,
        data.pre_tax_net_income_year_8,
        data.pre_tax_net_income_year_9,
        data.pre_tax_net_income_year_10
      ],

      preTaxIncomeGrowth: [
        data.pre_tax_income_growth_year_1,
        data.pre_tax_income_growth_year_2,
        data.pre_tax_income_growth_year_3,
        data.pre_tax_income_growth_year_4,
        data.pre_tax_income_growth_year_5,
        data.pre_tax_income_growth_year_6,
        data.pre_tax_income_growth_year_7,
        data.pre_tax_income_growth_year_8,
        data.pre_tax_income_growth_year_9
      ],

      preTaxProfitMargin: [
        data.pre_tax_profit_margin_year_1,
        data.pre_tax_profit_margin_year_2,
        data.pre_tax_profit_margin_year_3,
        data.pre_tax_profit_margin_year_4,
        data.pre_tax_profit_margin_year_5,
        data.pre_tax_profit_margin_year_6,
        data.pre_tax_profit_margin_year_7,
        data.pre_tax_profit_margin_year_8,
        data.pre_tax_profit_margin_year_9,
        data.pre_tax_profit_margin_year_10
      ],

      eps: [
        data.eps_year_1,
        data.eps_year_2,
        data.eps_year_3,
        data.eps_year_4,
        data.eps_year_5,
        data.eps_year_6,
        data.eps_year_7,
        data.eps_year_8,
        data.eps_year_9,
        data.eps_year_10
      ],

      epsGrowth: [
        data.eps_growth_year_1,
        data.eps_growth_year_2,
        data.eps_growth_year_3,
        data.eps_growth_year_4,
        data.eps_growth_year_5,
        data.eps_growth_year_6,
        data.eps_growth_year_7,
        data.eps_growth_year_8,
        data.eps_growth_year_9
      ],

      highStockPrice: [
        data.high_stock_price_year_1,
        data.high_stock_price_year_2,
        data.high_stock_price_year_3,
        data.high_stock_price_year_4,
        data.high_stock_price_year_5,
        data.high_stock_price_year_6,
        data.high_stock_price_year_7,
        data.high_stock_price_year_8,
        data.high_stock_price_year_9,
        data.high_stock_price_year_10
      ],

      lowStockPrice: [
        data.low_stock_price_year_1,
        data.low_stock_price_year_2,
        data.low_stock_price_year_3,
        data.low_stock_price_year_4,
        data.low_stock_price_year_5,
        data.low_stock_price_year_6,
        data.low_stock_price_year_7,
        data.low_stock_price_year_8,
        data.low_stock_price_year_9,
        data.low_stock_price_year_10
      ],

      highPERatio: [
        data.high_pe_ratio_year_1,
        data.high_pe_ratio_year_2,
        data.high_pe_ratio_year_3,
        data.high_pe_ratio_year_4,
        data.high_pe_ratio_year_5,
        data.high_pe_ratio_year_6,
        data.high_pe_ratio_year_7,
        data.high_pe_ratio_year_8,
        data.high_pe_ratio_year_9,
        data.high_pe_ratio_year_10
      ],

      lowPERatio: [
        data.low_pe_ratio_year_1,
        data.low_pe_ratio_year_2,
        data.low_pe_ratio_year_3,
        data.low_pe_ratio_year_4,
        data.low_pe_ratio_year_5,
        data.low_pe_ratio_year_6,
        data.low_pe_ratio_year_7,
        data.low_pe_ratio_year_8,
        data.low_pe_ratio_year_9,
        data.low_pe_ratio_year_10
      ],

      dividendPerShare: [
        data.dividend_per_share_year_1,
        data.dividend_per_share_year_2,
        data.dividend_per_share_year_3,
        data.dividend_per_share_year_4,
        data.dividend_per_share_year_5,
        data.dividend_per_share_year_6,
        data.dividend_per_share_year_7,
        data.dividend_per_share_year_8,
        data.dividend_per_share_year_9,
        data.dividend_per_share_year_10
      ],

      dividendGrowth: [
        data.dividend_growth_year_1,
        data.dividend_growth_year_2,
        data.dividend_growth_year_3,
        data.dividend_growth_year_4,
        data.dividend_growth_year_5,
        data.dividend_growth_year_6,
        data.dividend_growth_year_7,
        data.dividend_growth_year_8,
        data.dividend_growth_year_9
      ],

      dividendPayout: [
        data.dividend_payout_year_1,
        data.dividend_payout_year_2,
        data.dividend_payout_year_3,
        data.dividend_payout_year_4,
        data.dividend_payout_year_5,
        data.dividend_payout_year_6,
        data.dividend_payout_year_7,
        data.dividend_payout_year_8,
        data.dividend_payout_year_9,
        data.dividend_payout_year_10
      ],

      highYield: [
        data.high_yield_year_1,
        data.high_yield_year_2,
        data.high_yield_year_3,
        data.high_yield_year_4,
        data.high_yield_year_5,
        data.high_yield_year_6,
        data.high_yield_year_7,
        data.high_yield_year_8,
        data.high_yield_year_9,
        data.high_yield_year_10
      ],

      outstandingShares: [
        data.outstanding_shares_year_1,
        data.outstanding_shares_year_2,
        data.outstanding_shares_year_3,
        data.outstanding_shares_year_4,
        data.outstanding_shares_year_5,
        data.outstanding_shares_year_6,
        data.outstanding_shares_year_7,
        data.outstanding_shares_year_8,
        data.outstanding_shares_year_9,
        data.outstanding_shares_year_10
      ],

      outstandingShareGrowth: [
        data.outstanding_shares_growth_year_1,
        data.outstanding_shares_growth_year_2,
        data.outstanding_shares_growth_year_3,
        data.outstanding_shares_growth_year_4,
        data.outstanding_shares_growth_year_5,
        data.outstanding_shares_growth_year_6,
        data.outstanding_shares_growth_year_7,
        data.outstanding_shares_growth_year_8,
        data.outstanding_shares_growth_year_9
      ],

      fcRevenueGrowthDefault: [
        data.fc_revenue_growth_default_downside,
        data.fc_revenue_growth_default_base,
        data.fc_revenue_growth_default_upside
      ],

      fcRevenueGrowth: [
        data.fc_revenue_growth_downside,
        data.fc_revenue_growth_base,
        data.fc_revenue_growth_upside
      ],

      fcRevenueDefault: [
        data.fc_revenue_year_5_default_downside,
        data.fc_revenue_year_5_default_base,
        data.fc_revenue_year_5_default_upside
      ],

      fcRevenue: [
        data.fc_revenue_year_5_downside,
        data.fc_revenue_year_5_base,
        data.fc_revenue_year_5_upside
      ],

      fcPreTaxProfitMarginDefault: [
        data.fc_pre_tax_profit_margin_default_downside,
        data.fc_pre_tax_profit_margin_default_base,
        data.fc_pre_tax_profit_margin_default_upside
      ],

      fcPreTaxProfitMargin: [
        data.fc_pre_tax_profit_margin_downside,
        data.fc_pre_tax_profit_margin_base,
        data.fc_pre_tax_profit_margin_upside
      ],

      fcPreTaxNetIncomeDefault: [
        data.fc_pre_tax_net_income_year_5_default_downside,
        data.fc_pre_tax_net_income_year_5_default_base,
        data.fc_pre_tax_net_income_year_5_default_upside
      ],

      fcPreTaxNetIncome: [
        data.fc_pre_tax_net_income_year_5_downside,
        data.fc_pre_tax_net_income_year_5_base,
        data.fc_pre_tax_net_income_year_5_upside
      ],

      fcIncomeTaxRateDefault: [
        data.fc_income_tax_rate_default_downside,
        data.fc_income_tax_rate_default_base,
        data.fc_income_tax_rate_default_upside
      ],

      fcIncomeTaxRate: [
        data.fc_income_tax_rate_downside,
        data.fc_income_tax_rate_base,
        data.fc_income_tax_rate_upside
      ],

      fcNetProfitDefault: [
        data.fc_net_profit_year_5_default_downside,
        data.fc_net_profit_year_5_default_base,
        data.fc_net_profit_year_5_default_upside
      ],

      fcNetProfit: [
        data.fc_net_profit_year_5_downside,
        data.fc_net_profit_year_5_base,
        data.fc_net_profit_year_5_upside
      ],

      fcOutstandingShareGrowthDefault: [
        data.fc_outstanding_shares_growth_default_downside,
        data.fc_outstanding_shares_growth_default_base,
        data.fc_outstanding_shares_growth_default_upside
      ],

      fcOutstandingShareGrowth: [
        data.fc_outstanding_shares_growth_downside,
        data.fc_outstanding_shares_growth_base,
        data.fc_outstanding_shares_growth_upside
      ],

      fcOutstandingSharesDefault: [
        data.fc_outstanding_shares_year_5_default_downside,
        data.fc_outstanding_shares_year_5_default_base,
        data.fc_outstanding_shares_year_5_default_upside
      ],

      fcOutstandingShares: [
        data.fc_outstanding_shares_year_5_downside,
        data.fc_outstanding_shares_year_5_base,
        data.fc_outstanding_shares_year_5_upside
      ],

      fcEPSDefault: [
        data.fc_eps_year_5_default_downside,
        data.fc_eps_year_5_default_base,
        data.fc_eps_year_5_default_upside
      ],

      fcEPS: [
        data.fc_eps_year_5_downside,
        data.fc_eps_year_5_base,
        data.fc_eps_year_5_upside
      ],

      fcEPSGrowthDefault: [
        data.fc_eps_growth_default_downside,
        data.fc_eps_growth_default_base,
        data.fc_eps_growth_default_upside
      ],

      fcEPSGrowth: [
        data.fc_eps_growth_downside,
        data.fc_eps_growth_base,
        data.fc_eps_growth_upside
      ],

      fcPERatioDefault: [
        data.fc_pe_ratio_default_downside,
        data.fc_pe_ratio_default_base,
        data.fc_pe_ratio_default_upside
      ],

      fcPERatio: [
        data.fc_pe_ratio_downside,
        data.fc_pe_ratio_base,
        data.fc_pe_ratio_upside
      ],

      fcStockPriceDefault: [
        data.fc_stock_price_year_5_default_downside,
        data.fc_stock_price_year_5_default_base,
        data.fc_stock_price_year_5_default_upside
      ],

      fcStockPrice: [
        data.fc_stock_price_year_5_downside,
        data.fc_stock_price_year_5_base,
        data.fc_stock_price_year_5_upside
      ],

      fcTotalStockPriceGrowthDefault: [
        data.fc_total_stock_price_growth_default_downside,
        data.fc_total_stock_price_growth_default_base,
        data.fc_total_stock_price_growth_default_upside
      ],

      fcTotalStockPriceGrowth: [
        data.fc_total_stock_price_growth_downside,
        data.fc_total_stock_price_growth_base,
        data.fc_total_stock_price_growth_upside
      ],

      fcAnnualStockPriceGrowthDefault: [
        data.fc_annual_stock_price_growth_default_downside,
        data.fc_annual_stock_price_growth_default_base,
        data.fc_annual_stock_price_growth_default_upside
      ],

      fcAnnualStockPriceGrowth: [
        data.fc_annual_stock_price_growth_downside,
        data.fc_annual_stock_price_growth_base,
        data.fc_annual_stock_price_growth_upside
      ],

      currentDividendYield: Array(3).fill(data.current_dividend_yield),

      fcTotalAnnualReturnDefault: [
        data.fc_total_annual_return_default_downside,
        data.fc_total_annual_return_default_base,
        data.fc_total_annual_return_default_upside
      ],

      fcTotalAnnualReturn: [
        data.fc_total_annual_return_downside,
        data.fc_total_annual_return_base,
        data.fc_total_annual_return_upside
      ]
    };
  };
  
  const convertSSGToDTO = (ssg: any) => {
    return {
      name: ssg.name,
      is_presented_version: ssg.isPresentedVersion,
      presented_month: ssg.presentedMonth,
      stock_ticker: ssg.stockTicker,
      prepared_date: new Date(ssg.preparedDate),
      source_data: ssg.sourceData,
      source_date: new Date(ssg.sourceDate),
      years_of_data: ssg.yearsOfData,
      current_stock_price: ssg.currentStockPrice,
      current_stock_price_date: new Date(ssg.currentStockPriceDate),
      current_dividend: ssg.currentDividend,
      starting_year: ssg.startingYear,
      
      revenue_year_1: ssg.revenue[0],
      revenue_year_2: ssg.revenue[1],
      revenue_year_3: ssg.revenue[2],
      revenue_year_4: ssg.revenue[3],
      revenue_year_5: ssg.revenue[4],
      revenue_year_6: ssg.revenue[5],
      revenue_year_7: ssg.revenue[6],
      revenue_year_8: ssg.revenue[7],
      revenue_year_9: ssg.revenue[8],
      revenue_year_10: ssg.revenue[9],

      revenue_growth_year_1: ssg.revenueGrowth[0],
      revenue_growth_year_2: ssg.revenueGrowth[1],
      revenue_growth_year_3: ssg.revenueGrowth[2],
      revenue_growth_year_4: ssg.revenueGrowth[3],
      revenue_growth_year_5: ssg.revenueGrowth[4],
      revenue_growth_year_6: ssg.revenueGrowth[5],
      revenue_growth_year_7: ssg.revenueGrowth[6],
      revenue_growth_year_8: ssg.revenueGrowth[7],
      revenue_growth_year_9: ssg.revenueGrowth[8],

      net_profit_year_1: ssg.netProfit[0],
      net_profit_year_2: ssg.netProfit[1],
      net_profit_year_3: ssg.netProfit[2],
      net_profit_year_4: ssg.netProfit[3],
      net_profit_year_5: ssg.netProfit[4],
      net_profit_year_6: ssg.netProfit[5],
      net_profit_year_7: ssg.netProfit[6],
      net_profit_year_8: ssg.netProfit[7],
      net_profit_year_9: ssg.netProfit[8],
      net_profit_year_10: ssg.netProfit[9],
      
      income_tax_rate_year_1: ssg.incomeTaxRate[0],
      income_tax_rate_year_2: ssg.incomeTaxRate[1],
      income_tax_rate_year_3: ssg.incomeTaxRate[2],
      income_tax_rate_year_4: ssg.incomeTaxRate[3],
      income_tax_rate_year_5: ssg.incomeTaxRate[4],
      income_tax_rate_year_6: ssg.incomeTaxRate[5],
      income_tax_rate_year_7: ssg.incomeTaxRate[6],
      income_tax_rate_year_8: ssg.incomeTaxRate[7],
      income_tax_rate_year_9: ssg.incomeTaxRate[8],
      income_tax_rate_year_10: ssg.incomeTaxRate[9],

      pre_tax_net_income_year_1: ssg.preTaxNetIncome[0],
      pre_tax_net_income_year_2: ssg.preTaxNetIncome[1],
      pre_tax_net_income_year_3: ssg.preTaxNetIncome[2],
      pre_tax_net_income_year_4: ssg.preTaxNetIncome[3],
      pre_tax_net_income_year_5: ssg.preTaxNetIncome[4],
      pre_tax_net_income_year_6: ssg.preTaxNetIncome[5],
      pre_tax_net_income_year_7: ssg.preTaxNetIncome[6],
      pre_tax_net_income_year_8: ssg.preTaxNetIncome[7],
      pre_tax_net_income_year_9: ssg.preTaxNetIncome[8],
      pre_tax_net_income_year_10: ssg.preTaxNetIncome[9],

      pre_tax_income_growth_year_1: ssg.preTaxIncomeGrowth[0],
      pre_tax_income_growth_year_2: ssg.preTaxIncomeGrowth[1],
      pre_tax_income_growth_year_3: ssg.preTaxIncomeGrowth[2],
      pre_tax_income_growth_year_4: ssg.preTaxIncomeGrowth[3],
      pre_tax_income_growth_year_5: ssg.preTaxIncomeGrowth[4],
      pre_tax_income_growth_year_6: ssg.preTaxIncomeGrowth[5],
      pre_tax_income_growth_year_7: ssg.preTaxIncomeGrowth[6],
      pre_tax_income_growth_year_8: ssg.preTaxIncomeGrowth[7],
      pre_tax_income_growth_year_9: ssg.preTaxIncomeGrowth[8],

      pre_tax_profit_margin_year_1: ssg.preTaxProfitMargin[0],
      pre_tax_profit_margin_year_2: ssg.preTaxProfitMargin[1],
      pre_tax_profit_margin_year_3: ssg.preTaxProfitMargin[2],
      pre_tax_profit_margin_year_4: ssg.preTaxProfitMargin[3],
      pre_tax_profit_margin_year_5: ssg.preTaxProfitMargin[4],
      pre_tax_profit_margin_year_6: ssg.preTaxProfitMargin[5],
      pre_tax_profit_margin_year_7: ssg.preTaxProfitMargin[6],
      pre_tax_profit_margin_year_8: ssg.preTaxProfitMargin[7],
      pre_tax_profit_margin_year_9: ssg.preTaxProfitMargin[8],
      pre_tax_profit_margin_year_10: ssg.preTaxProfitMargin[9],

      eps_year_1: ssg.eps[0],
      eps_year_2: ssg.eps[1],
      eps_year_3: ssg.eps[2],
      eps_year_4: ssg.eps[3],
      eps_year_5: ssg.eps[4],
      eps_year_6: ssg.eps[5],
      eps_year_7: ssg.eps[6],
      eps_year_8: ssg.eps[7],
      eps_year_9: ssg.eps[8],
      eps_year_10: ssg.eps[9],

      eps_growth_year_1: ssg.epsGrowth[0],
      eps_growth_year_2: ssg.epsGrowth[1],
      eps_growth_year_3: ssg.epsGrowth[2],
      eps_growth_year_4: ssg.epsGrowth[3],
      eps_growth_year_5: ssg.epsGrowth[4],
      eps_growth_year_6: ssg.epsGrowth[5],
      eps_growth_year_7: ssg.epsGrowth[6],
      eps_growth_year_8: ssg.epsGrowth[7],
      eps_growth_year_9: ssg.epsGrowth[8],

      high_stock_price_year_1: ssg.highStockPrice[0],
      high_stock_price_year_2: ssg.highStockPrice[1],
      high_stock_price_year_3: ssg.highStockPrice[2],
      high_stock_price_year_4: ssg.highStockPrice[3],
      high_stock_price_year_5: ssg.highStockPrice[4],
      high_stock_price_year_6: ssg.highStockPrice[5],
      high_stock_price_year_7: ssg.highStockPrice[6],
      high_stock_price_year_8: ssg.highStockPrice[7],
      high_stock_price_year_9: ssg.highStockPrice[8],
      high_stock_price_year_10: ssg.highStockPrice[9],

      low_stock_price_year_1: ssg.lowStockPrice[0],
      low_stock_price_year_2: ssg.lowStockPrice[1],
      low_stock_price_year_3: ssg.lowStockPrice[2],
      low_stock_price_year_4: ssg.lowStockPrice[3],
      low_stock_price_year_5: ssg.lowStockPrice[4],
      low_stock_price_year_6: ssg.lowStockPrice[5],
      low_stock_price_year_7: ssg.lowStockPrice[6],
      low_stock_price_year_8: ssg.lowStockPrice[7],
      low_stock_price_year_9: ssg.lowStockPrice[8],
      low_stock_price_year_10: ssg.lowStockPrice[9],

      high_pe_ratio_year_1: ssg.highPERatio[0],
      high_pe_ratio_year_2: ssg.highPERatio[1],
      high_pe_ratio_year_3: ssg.highPERatio[2],
      high_pe_ratio_year_4: ssg.highPERatio[3],
      high_pe_ratio_year_5: ssg.highPERatio[4],
      high_pe_ratio_year_6: ssg.highPERatio[5],
      high_pe_ratio_year_7: ssg.highPERatio[6],
      high_pe_ratio_year_8: ssg.highPERatio[7],
      high_pe_ratio_year_9: ssg.highPERatio[8],
      high_pe_ratio_year_10: ssg.highPERatio[9],

      low_pe_ratio_year_1: ssg.lowPERatio[0],
      low_pe_ratio_year_2: ssg.lowPERatio[1],
      low_pe_ratio_year_3: ssg.lowPERatio[2],
      low_pe_ratio_year_4: ssg.lowPERatio[3],
      low_pe_ratio_year_5: ssg.lowPERatio[4],
      low_pe_ratio_year_6: ssg.lowPERatio[5],
      low_pe_ratio_year_7: ssg.lowPERatio[6],
      low_pe_ratio_year_8: ssg.lowPERatio[7],
      low_pe_ratio_year_9: ssg.lowPERatio[8],
      low_pe_ratio_year_10: ssg.lowPERatio[9],

      dividend_per_share_year_1: ssg.dividendPerShare[0],
      dividend_per_share_year_2: ssg.dividendPerShare[1],
      dividend_per_share_year_3: ssg.dividendPerShare[2],
      dividend_per_share_year_4: ssg.dividendPerShare[3],
      dividend_per_share_year_5: ssg.dividendPerShare[4],
      dividend_per_share_year_6: ssg.dividendPerShare[5],
      dividend_per_share_year_7: ssg.dividendPerShare[6],
      dividend_per_share_year_8: ssg.dividendPerShare[7],
      dividend_per_share_year_9: ssg.dividendPerShare[8],
      dividend_per_share_year_10: ssg.dividendPerShare[9],

      dividend_growth_year_1: ssg.dividendGrowth[0],
      dividend_growth_year_2: ssg.dividendGrowth[1],
      dividend_growth_year_3: ssg.dividendGrowth[2],
      dividend_growth_year_4: ssg.dividendGrowth[3],
      dividend_growth_year_5: ssg.dividendGrowth[4],
      dividend_growth_year_6: ssg.dividendGrowth[5],
      dividend_growth_year_7: ssg.dividendGrowth[6],
      dividend_growth_year_8: ssg.dividendGrowth[7],
      dividend_growth_year_9: ssg.dividendGrowth[8],

      dividend_payout_year_1: ssg.dividendPayout[0],
      dividend_payout_year_2: ssg.dividendPayout[1],
      dividend_payout_year_3: ssg.dividendPayout[2],
      dividend_payout_year_4: ssg.dividendPayout[3],
      dividend_payout_year_5: ssg.dividendPayout[4],
      dividend_payout_year_6: ssg.dividendPayout[5],
      dividend_payout_year_7: ssg.dividendPayout[6],
      dividend_payout_year_8: ssg.dividendPayout[7],
      dividend_payout_year_9: ssg.dividendPayout[8],
      dividend_payout_year_10: ssg.dividendPayout[9],

      high_yield_year_1: ssg.highYield[0],
      high_yield_year_2: ssg.highYield[1],
      high_yield_year_3: ssg.highYield[2],
      high_yield_year_4: ssg.highYield[3],
      high_yield_year_5: ssg.highYield[4],
      high_yield_year_6: ssg.highYield[5],
      high_yield_year_7: ssg.highYield[6],
      high_yield_year_8: ssg.highYield[7],
      high_yield_year_9: ssg.highYield[8],
      high_yield_year_10: ssg.highYield[9],

      outstanding_shares_year_1: ssg.outstandingShares[0],
      outstanding_shares_year_2: ssg.outstandingShares[1],
      outstanding_shares_year_3: ssg.outstandingShares[2],
      outstanding_shares_year_4: ssg.outstandingShares[3],
      outstanding_shares_year_5: ssg.outstandingShares[4],
      outstanding_shares_year_6: ssg.outstandingShares[5],
      outstanding_shares_year_7: ssg.outstandingShares[6],
      outstanding_shares_year_8: ssg.outstandingShares[7],
      outstanding_shares_year_9: ssg.outstandingShares[8],
      outstanding_shares_year_10: ssg.outstandingShares[9],

      outstanding_shares_growth_year_1: ssg.outstandingShareGrowth[0],
      outstanding_shares_growth_year_2: ssg.outstandingShareGrowth[1],
      outstanding_shares_growth_year_3: ssg.outstandingShareGrowth[2],
      outstanding_shares_growth_year_4: ssg.outstandingShareGrowth[3],
      outstanding_shares_growth_year_5: ssg.outstandingShareGrowth[4],
      outstanding_shares_growth_year_6: ssg.outstandingShareGrowth[5],
      outstanding_shares_growth_year_7: ssg.outstandingShareGrowth[6],
      outstanding_shares_growth_year_8: ssg.outstandingShareGrowth[7],
      outstanding_shares_growth_year_9: ssg.outstandingShareGrowth[8],

      fc_revenue_growth_default_downside: ssg.fcRevenueGrowthDefault[0],
      fc_revenue_growth_default_base: ssg.fcRevenueGrowthDefault[1],
      fc_revenue_growth_default_upside: ssg.fcRevenueGrowthDefault[2],

      fc_revenue_growth_downside: ssg.fcRevenueGrowth[0],
      fc_revenue_growth_base: ssg.fcRevenueGrowth[1],
      fc_revenue_growth_upside: ssg.fcRevenueGrowth[2],

      fc_revenue_year_5_default_downside: ssg.fcRevenueDefault[0],
      fc_revenue_year_5_default_base: ssg.fcRevenueDefault[1],
      fc_revenue_year_5_default_upside: ssg.fcRevenueDefault[2],
      
      fc_revenue_year_5_downside: ssg.fcRevenue[0],
      fc_revenue_year_5_base: ssg.fcRevenue[1],
      fc_revenue_year_5_upside: ssg.fcRevenue[2],

      fc_pre_tax_profit_margin_default_downside: ssg.fcPreTaxProfitMarginDefault[0],
      fc_pre_tax_profit_margin_default_base: ssg.fcPreTaxProfitMarginDefault[1],
      fc_pre_tax_profit_margin_default_upside: ssg.fcPreTaxProfitMarginDefault[2],

      fc_pre_tax_profit_margin_downside: ssg.fcPreTaxProfitMargin[0],
      fc_pre_tax_profit_margin_base: ssg.fcPreTaxProfitMargin[1],
      fc_pre_tax_profit_margin_upside: ssg.fcPreTaxProfitMargin[2],

      fc_pre_tax_net_income_year_5_default_downside: ssg.fcPreTaxNetIncomeDefault[0],
      fc_pre_tax_net_income_year_5_default_base: ssg.fcPreTaxNetIncomeDefault[1],
      fc_pre_tax_net_income_year_5_default_upside: ssg.fcPreTaxNetIncomeDefault[2],
      
      fc_pre_tax_net_income_year_5_downside: ssg.fcPreTaxNetIncome[0],
      fc_pre_tax_net_income_year_5_base: ssg.fcPreTaxNetIncome[1],
      fc_pre_tax_net_income_year_5_upside: ssg.fcPreTaxNetIncome[2],

      fc_income_tax_rate_default_downside: ssg.fcIncomeTaxRateDefault[0],
      fc_income_tax_rate_default_base: ssg.fcIncomeTaxRateDefault[1],
      fc_income_tax_rate_default_upside: ssg.fcIncomeTaxRateDefault[2],

      fc_income_tax_rate_downside: ssg.fcIncomeTaxRate[0],
      fc_income_tax_rate_base: ssg.fcIncomeTaxRate[1],
      fc_income_tax_rate_upside: ssg.fcIncomeTaxRate[2],

      fc_net_profit_year_5_default_downside: ssg.fcNetProfitDefault[0],
      fc_net_profit_year_5_default_base: ssg.fcNetProfitDefault[1],
      fc_net_profit_year_5_default_upside: ssg.fcNetProfitDefault[2],
      
      fc_net_profit_year_5_downside: ssg.fcNetProfit[0],
      fc_net_profit_year_5_base: ssg.fcNetProfit[1],
      fc_net_profit_year_5_upside: ssg.fcNetProfit[2],

      fc_outstanding_shares_growth_default_downside: ssg.fcOutstandingShareGrowthDefault[0],
      fc_outstanding_shares_growth_default_base: ssg.fcOutstandingShareGrowthDefault[1],
      fc_outstanding_shares_growth_default_upside: ssg.fcOutstandingShareGrowthDefault[2],

      fc_outstanding_shares_growth_downside: ssg.fcOutstandingShareGrowth[0],
      fc_outstanding_shares_growth_base: ssg.fcOutstandingShareGrowth[1],
      fc_outstanding_shares_growth_upside: ssg.fcOutstandingShareGrowth[2],

      fc_outstanding_shares_year_5_default_downside: ssg.fcOutstandingSharesDefault[0],
      fc_outstanding_shares_year_5_default_base: ssg.fcOutstandingSharesDefault[1],
      fc_outstanding_shares_year_5_default_upside: ssg.fcOutstandingSharesDefault[2],
      
      fc_outstanding_shares_year_5_downside: ssg.fcOutstandingShares[0],
      fc_outstanding_shares_year_5_base: ssg.fcOutstandingShares[1],
      fc_outstanding_shares_year_5_upside: ssg.fcOutstandingShares[2],

      fc_eps_year_5_default_downside: ssg.fcEPSDefault[0],
      fc_eps_year_5_default_base: ssg.fcEPSDefault[1],
      fc_eps_year_5_default_upside: ssg.fcEPSDefault[2],
      
      fc_eps_year_5_downside: ssg.fcEPS[0],
      fc_eps_year_5_base: ssg.fcEPS[1],
      fc_eps_year_5_upside: ssg.fcEPS[2],

      fc_eps_growth_default_downside: ssg.fcEPSGrowthDefault[0],
      fc_eps_growth_default_base: ssg.fcEPSGrowthDefault[1],
      fc_eps_growth_default_upside: ssg.fcEPSGrowthDefault[2],

      fc_eps_growth_downside: ssg.fcEPSGrowth[0],
      fc_eps_growth_base: ssg.fcEPSGrowth[1],
      fc_eps_growth_upside: ssg.fcEPSGrowth[2],

      fc_pe_ratio_default_downside: ssg.fcPERatioDefault[0],
      fc_pe_ratio_default_base: ssg.fcPERatioDefault[1],
      fc_pe_ratio_default_upside: ssg.fcPERatioDefault[2],

      fc_pe_ratio_downside: ssg.fcPERatio[0],
      fc_pe_ratio_base: ssg.fcPERatio[1],
      fc_pe_ratio_upside: ssg.fcPERatio[2],

      fc_stock_price_year_5_default_downside: ssg.fcStockPriceDefault[0],
      fc_stock_price_year_5_default_base: ssg.fcStockPriceDefault[1],
      fc_stock_price_year_5_default_upside: ssg.fcStockPriceDefault[2],

      fc_stock_price_year_5_downside: ssg.fcStockPrice[0],
      fc_stock_price_year_5_base: ssg.fcStockPrice[1],
      fc_stock_price_year_5_upside: ssg.fcStockPrice[2],

      fc_total_stock_price_growth_default_downside: ssg.fcTotalStockPriceGrowthDefault[0],
      fc_total_stock_price_growth_default_base: ssg.fcTotalStockPriceGrowthDefault[1],
      fc_total_stock_price_growth_default_upside: ssg.fcTotalStockPriceGrowthDefault[2],

      fc_total_stock_price_growth_downside: ssg.fcTotalStockPriceGrowth[0],
      fc_total_stock_price_growth_base: ssg.fcTotalStockPriceGrowth[1],
      fc_total_stock_price_growth_upside: ssg.fcTotalStockPriceGrowth[2],

      fc_annual_stock_price_growth_default_downside: ssg.fcAnnualStockPriceGrowthDefault[0],
      fc_annual_stock_price_growth_default_base: ssg.fcAnnualStockPriceGrowthDefault[1],
      fc_annual_stock_price_growth_default_upside: ssg.fcAnnualStockPriceGrowthDefault[2],

      fc_annual_stock_price_growth_downside: ssg.fcAnnualStockPriceGrowth[0],
      fc_annual_stock_price_growth_base: ssg.fcAnnualStockPriceGrowth[1],
      fc_annual_stock_price_growth_upside: ssg.fcAnnualStockPriceGrowth[2],

      current_dividend_yield: ssg.currentDividendYield[0],

      fc_total_annual_return_default_downside: ssg.fcTotalAnnualReturnDefault[0],
      fc_total_annual_return_default_base: ssg.fcTotalAnnualReturnDefault[1],
      fc_total_annual_return_default_upside: ssg.fcTotalAnnualReturnDefault[2],
      
      fc_total_annual_return_downside: ssg.fcTotalAnnualReturn[0],
      fc_total_annual_return_base: ssg.fcTotalAnnualReturn[1],
      fc_total_annual_return_upside: ssg.fcTotalAnnualReturn[2]
    };
  };
  
  const handleSave = async () => {
    var ssgDTO = convertSSGToDTO(ssg);

    try {
      await saveSSG(ssgDTO);
    } catch (error) {
      console.error(error);
    }
    
    navigate('/');
  };

  const handleUpdate = async () => {
    var ssgDTO = convertSSGToDTO(ssg);

    try {
      await updateSSG(Number(routeParams[0]), ssgDTO);
    } catch (error) {
      console.error(error);
    }
    
    navigate('/');
  };

  const historicalDataRows: Row[] = getHistoricalDataRows(ssg);
  const historicalDataCols: Column[] = getHistoricalDataColumns();

  const forecastDataRows: Row[] = getForecastDataRows(ssg);
  const forecastDataColumns: Column[] = getForecastDataColumns();

  const forecastDefaultRows: Row[] = getForecastDefaultRows(ssg);
  const forecastDefaultColumns: Column[] = getForecastDefaultColumns();

  const onSSGFormChange = (e: any) => {
    var property = e.target.name as string;
    var updatedSSG = structuredClone(ssg);

    switch (property) {
      case 'name':
      case 'stockTicker':
      case 'sourceData':
      case 'preparedBy':
      case 'preparedDate':
      case 'sourceDate':
      case 'currentStockPriceDate':
        updatedSSG[property] = e.target.value;
        break;
      case 'isPresentedVersion':
        updatedSSG.isPresentedVersion = e.target.checked;
        break;
      case 'presentedMonth':
      case 'yearsOfData':
      case 'currentStockPrice':
      case 'currentDividend':
        updatedSSG[property] = Number(e.target.value);
        break;
    }
    
    setSSG(calculateSSG(updatedSSG));
  };

  const onSSGChange = (changes: CellChange[]) => {
    var updatedSSG = structuredClone(ssg);

    changes.forEach((change: CellChange) => {
      if (change.type !== 'number')
        return;
      
      var idx = change.columnId as number;
      var rowId = change.rowId as string;

      switch (rowId) {
        case HistoricalDataRowId.Header:
          updatedSSG.startingYear = change.newCell.value;
          break;
        case HistoricalDataRowId.Revenue:
        case HistoricalDataRowId.NetProfit:
        case HistoricalDataRowId.EPS:
        case HistoricalDataRowId.HighStockPrice:
        case HistoricalDataRowId.LowStockPrice:
        case HistoricalDataRowId.DividendPerShare:
        case HistoricalDataRowId.OutstandingShares:
        case ForecastDataRowId.PERatio:
          updatedSSG[rowId][idx] = change.newCell.value;
          break;
        case HistoricalDataRowId.IncomeTaxRate:
        case ForecastDataRowId.RevenueGrowth:
        case ForecastDataRowId.PreTaxProfitMargin:
        case ForecastDataRowId.IncomeTaxRate:
        case ForecastDataRowId.OutstandingShareGrowth:
          updatedSSG[rowId][idx] = (Math.abs(change.newCell.value) >= 1)
            ? change.newCell.value / 100
            : change.newCell.value;
          break;
      }
    });
    
    setSSG(calculateSSG(updatedSSG));
  };

  return (
    <div className='ssg'>
      <div className='ssg-form'>
        <div className='ssg-row'>
          <div className='ssg-input-container'>
            <p className='ssg-input-label'>Name</p>
            <input className='ssg-input' type='text' name='name' value={ssg.name} onChange={onSSGFormChange}></input>
          </div>
          <div className='ssg-input-container'>
            <p className='ssg-input-label'>Presented Version</p>
            <input className='ssg-input' type='checkbox' name='isPresentedVersion' checked={ssg.isPresentedVersion} onChange={onSSGFormChange}></input>
          </div>
          {ssg.isPresentedVersion ? <div className='ssg-input-container'>
            <p className='ssg-input-label'>Presented Month</p>
            <select className='ssg-select' name='presentedMonth' value={ssg.presentedMonth} onChange={onSSGFormChange}>
              <option value='0'>Select</option>
              <option value='1'>January</option>
              <option value='2'>February</option>
              <option value='3'>March</option>
              <option value='4'>April</option>
              <option value='5'>May</option>
              <option value='6'>June</option>
              <option value='7'>July</option>
              <option value='8'>August</option>
              <option value='9'>September</option>
              <option value='10'>October</option>
              <option value='11'>November</option>
              <option value='12'>December</option>
            </select>
          </div> : <div />}
        </div>
        <div className='ssg-row'>
          <div className='ssg-input-container'>
            <p className='ssg-input-label'>Ticker</p>
            <input className='ssg-input' type='text' name='stockTicker' value={ssg.stockTicker} onChange={onSSGFormChange}></input>
          </div>
          <div className='ssg-input-container'>
            <p className='ssg-input-label'>Prepared By</p>
            <input className='ssg-input' type='text' name='preparedBy' value={ssg.preparedBy} onChange={onSSGFormChange}></input>
          </div>
          <div className='ssg-input-container'>
            <p className='ssg-input-label'>Prepared Date</p>
            <input className='ssg-input' type='date' name='preparedDate' value={ssg.preparedDate} onChange={onSSGFormChange}></input>
          </div>
        </div>
        <div className='ssg-row'>
          <div className='ssg-input-container'>
            <p className='ssg-input-label'>Source of Data</p>
            <input className='ssg-input' type='text' name='sourceData' value={ssg.sourceData} onChange={onSSGFormChange}></input>
          </div>
          <div className='ssg-input-container'>
            <p className='ssg-input-label'>Source Date</p>
            <input className='ssg-input' type='date' name='sourceDate' value={ssg.sourceDate} onChange={onSSGFormChange}></input>
          </div>
          <div className='ssg-input-container'>
            <p className='ssg-input-label'>Years of Available Data</p>
            <input className='ssg-input' type='number' name='yearsOfData' value={ssg.yearsOfData} onChange={onSSGFormChange}></input>
          </div>
        </div>
        <div className='ssg-row'>
          <div className='ssg-input-container'>
            <p className='ssg-input-label'>Current Stock Price</p>
            <input className='ssg-input' type='number' name='currentStockPrice' value={ssg.currentStockPrice} onChange={onSSGFormChange}></input>
          </div>
          <div className='ssg-input-container'>
            <p className='ssg-input-label'>Current Price Date</p>
            <input className='ssg-input' type='date' name='currentStockPriceDate' value={ssg.currentStockPriceDate} onChange={onSSGFormChange}></input>
          </div>
          <div className='ssg-input-container'>
            <p className='ssg-input-label'>Current Dividend</p>
            <input className='ssg-input' type='number' name='currentDividend' value={ssg.currentDividend} onChange={onSSGFormChange}></input>
          </div>
        </div>
      </div>
      <div className='ssg-historical'>
        <ReactGrid rows={historicalDataRows} columns={historicalDataCols} onCellsChanged={onSSGChange} enableRangeSelection />
      </div>
      <div className='ssg-forecast'>
        <ReactGrid rows={forecastDataRows} columns={forecastDataColumns} onCellsChanged={onSSGChange} enableRangeSelection />
        <div className='ssg-forecast-default'>
          <ReactGrid rows={forecastDefaultRows} columns={forecastDefaultColumns} enableRangeSelection />
        </div>
      </div>
      <div className='ssg-buttons'>
        {routeParams[0]
          ? <button className='ssg-save-button' onClick={handleUpdate}>Update</button>
          : <button className='ssg-save-button' onClick={handleSave}>Save</button>
        }
      </div>
    </div>
  );
};