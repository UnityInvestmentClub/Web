import './index.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useApi } from '../../hooks';

//TODO: convert ssg hooks to global context with reducers

export default () => {
  const [ssgList, setSSGList] = useState([]);
  const [_, navigate] = useLocation();
  const { getSSGList } = useApi();

  useEffect(() => {
    getSSGList()
      .then(data => convertDTOListToSSGList(data))
      .then(data => setSSGList(data))
      .catch(error => console.error(error));
  }, []);

  // const fetchSSGs = async () => {
  //   let { data, error } = await client.from('ssgs').select('*').order('created_date', { ascending: false });

  //   if (error)
  //     throw error;

  //   setSSGList(convertDTOListToSSGList(data));
  // };

  const convertDTOListToSSGList = (dataList: any[]) => {
    return dataList.map(data => convertDTOToSSG(data));
  };

  const convertDTOToSSG = (data: any) => {
    return {
      id: data.id,
      name: data.name,
      isPresentedVersion: data.is_presented_version,
      presentedMonth: data.presented_month.toString(),
      stockTicker: data.stock_ticker,
      preparedDate: data.prepared_date.toString(),
      sourceData: data.source_data,
      sourceDate: data.source_date.toString(),
      yearsOfData: data.years_of_data.toString(),
      currentStockPrice: data.current_stock_price.toString(),
      currentStockPriceDate: data.current_stock_price_date.toString(),
      currentDividend: data.current_dividend.toString(),
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

  const SSGList = () => {
    var ssgListRows = ssgList.map((ssg: any) => {
      return <div className='ssg-list-row' onClick={() => navigate(`/ssg/${ssg.id}`)} key={ssg.id}>
        <div className='ssg-list-cell-name'>{ssg.name}</div>
        <div className='ssg-list-cell'>{ssg.stockTicker}</div>
        <div className='ssg-list-cell'>{ssg.preparedBy}</div>
        <div className='ssg-list-cell'>{ssg.preparedDate}</div>
      </div>
    });
    
    return (
      <div className='ssg-list'>
        <div className='ssg-list-header'>
          <div className='ssg-list-cell-name'>Name</div>
          <div className='ssg-list-cell'>Stock Ticker</div>
          <div className='ssg-list-cell'>Prepared By</div>
          <div className='ssg-list-cell'>Prepared Date</div>
        </div>
        {ssgListRows}
      </div>
    );
  };

  return (
    <div className='dashboard'>
      <SSGList />
      <div className='ssg-new'>
        <button className='ssg-new-button' onClick={() => navigate(`/ssg`)}>Create New SSG</button>
      </div>
    </div>
  );
};
