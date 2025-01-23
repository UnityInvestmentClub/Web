export type Preparer = {
  id?: string,
  firstName: string,
  lastName: string
};

export type PreparerDTO = {
  id: string,
  first_name: string,
  last_name: string,
};

export type SSG = {
  id?: string,
  name: string,
  version: string,
  isPresentedVersion: boolean,
  stockTicker: string,
  preparedDate: string,
  sourceData: string,
  sourceDate: string,
  yearsOfData: number,
  currentStockPrice: number,
  currentStockPriceDate: string,
  currentDividend: number,
  startingYear: number,
  preparedBy: Preparer[],
  meetingDateId: string,
  
  revenue: number[],

  revenueGrowth: number[],

  netProfit: number[],

  incomeTaxRate: number[],

  preTaxNetIncome: number[],

  preTaxIncomeGrowth: number[],

  preTaxProfitMargin: number[],

  eps: number[],

  epsGrowth: number[],

  highStockPrice: number[],

  lowStockPrice: number[],

  highPERatio: number[],

  lowPERatio: number[],

  dividendPerShare: number[],

  dividendGrowth: number[],

  dividendPayout: number[],

  highYield: number[],

  outstandingShares: number[],

  outstandingShareGrowth: number[],

  fcRevenueGrowthDefault: number[],

  fcRevenueGrowth: number[],

  fcRevenueDefault: number[],

  fcRevenue: number[],

  fcPreTaxProfitMarginDefault: number[],

  fcPreTaxProfitMargin: number[],

  fcPreTaxNetIncomeDefault: number[],

  fcPreTaxNetIncome: number[],

  fcIncomeTaxRateDefault: number[],

  fcIncomeTaxRate: number[],

  fcNetProfitDefault: number[],

  fcNetProfit: number[],

  fcOutstandingShareGrowthDefault: number[],

  fcOutstandingShareGrowth: number[],

  fcOutstandingSharesDefault: number[],

  fcOutstandingShares: number[],

  fcEPSDefault: number[],

  fcEPS: number[],

  fcEPSGrowthDefault: number[],

  fcEPSGrowth: number[],

  fcPERatioDefault: number[],

  fcPERatio: number[],

  fcStockPriceDefault: number[],

  fcStockPrice: number[],

  fcTotalStockPriceGrowthDefault: number[],

  fcTotalStockPriceGrowth: number[],

  fcAnnualStockPriceGrowthDefault: number[],

  fcAnnualStockPriceGrowth: number[],

  currentDividendYield: number[],

  fcTotalAnnualReturnDefault: number[],

  fcTotalAnnualReturn: number[],

  highEndHoldThreshold: number,
  lowEndHoldThreshold: number,

  highEndHoldPrice: number,
  lowEndHoldPrice: number,
  
  currentPriceZone: 'BUY' | 'HOLD' | 'SELL'
};

export type SSGDTO = {
  id: string
  name: string,
  version: string,
  is_presented_version: boolean,
  stock_ticker: string,
  prepared_date: string,
  source_data: string,
  source_date: string,
  years_of_data: number,
  current_stock_price: number,
  current_stock_price_date: string,
  current_dividend: number,
  starting_year: number,
  prepared_by?: PreparerDTO[],
  meeting_date_id: string,
  
  revenue_year_1: number,
  revenue_year_2: number,
  revenue_year_3: number,
  revenue_year_4: number,
  revenue_year_5: number,
  revenue_year_6: number,
  revenue_year_7: number,
  revenue_year_8: number,
  revenue_year_9: number,
  revenue_year_10: number,

  revenue_growth_year_2: number,
  revenue_growth_year_3: number,
  revenue_growth_year_4: number,
  revenue_growth_year_5: number,
  revenue_growth_year_6: number,
  revenue_growth_year_7: number,
  revenue_growth_year_8: number,
  revenue_growth_year_9: number,
  revenue_growth_year_10: number,

  net_profit_year_1: number,
  net_profit_year_2: number,
  net_profit_year_3: number,
  net_profit_year_4: number,
  net_profit_year_5: number,
  net_profit_year_6: number,
  net_profit_year_7: number,
  net_profit_year_8: number,
  net_profit_year_9: number,
  net_profit_year_10: number,
  
  income_tax_rate_year_1: number,
  income_tax_rate_year_2: number,
  income_tax_rate_year_3: number,
  income_tax_rate_year_4: number,
  income_tax_rate_year_5: number,
  income_tax_rate_year_6: number,
  income_tax_rate_year_7: number,
  income_tax_rate_year_8: number,
  income_tax_rate_year_9: number,
  income_tax_rate_year_10: number,

  pre_tax_net_income_year_1: number,
  pre_tax_net_income_year_2: number,
  pre_tax_net_income_year_3: number,
  pre_tax_net_income_year_4: number,
  pre_tax_net_income_year_5: number,
  pre_tax_net_income_year_6: number,
  pre_tax_net_income_year_7: number,
  pre_tax_net_income_year_8: number,
  pre_tax_net_income_year_9: number,
  pre_tax_net_income_year_10: number,

  pre_tax_income_growth_year_2: number,
  pre_tax_income_growth_year_3: number,
  pre_tax_income_growth_year_4: number,
  pre_tax_income_growth_year_5: number,
  pre_tax_income_growth_year_6: number,
  pre_tax_income_growth_year_7: number,
  pre_tax_income_growth_year_8: number,
  pre_tax_income_growth_year_9: number,
  pre_tax_income_growth_year_10: number,

  pre_tax_profit_margin_year_1: number,
  pre_tax_profit_margin_year_2: number,
  pre_tax_profit_margin_year_3: number,
  pre_tax_profit_margin_year_4: number,
  pre_tax_profit_margin_year_5: number,
  pre_tax_profit_margin_year_6: number,
  pre_tax_profit_margin_year_7: number,
  pre_tax_profit_margin_year_8: number,
  pre_tax_profit_margin_year_9: number,
  pre_tax_profit_margin_year_10: number,

  eps_year_1: number,
  eps_year_2: number,
  eps_year_3: number,
  eps_year_4: number,
  eps_year_5: number,
  eps_year_6: number,
  eps_year_7: number,
  eps_year_8: number,
  eps_year_9: number,
  eps_year_10: number,

  eps_growth_year_2: number,
  eps_growth_year_3: number,
  eps_growth_year_4: number,
  eps_growth_year_5: number,
  eps_growth_year_6: number,
  eps_growth_year_7: number,
  eps_growth_year_8: number,
  eps_growth_year_9: number,
  eps_growth_year_10: number,

  high_stock_price_year_1: number,
  high_stock_price_year_2: number,
  high_stock_price_year_3: number,
  high_stock_price_year_4: number,
  high_stock_price_year_5: number,
  high_stock_price_year_6: number,
  high_stock_price_year_7: number,
  high_stock_price_year_8: number,
  high_stock_price_year_9: number,
  high_stock_price_year_10: number,

  low_stock_price_year_1: number,
  low_stock_price_year_2: number,
  low_stock_price_year_3: number,
  low_stock_price_year_4: number,
  low_stock_price_year_5: number,
  low_stock_price_year_6: number,
  low_stock_price_year_7: number,
  low_stock_price_year_8: number,
  low_stock_price_year_9: number,
  low_stock_price_year_10: number,

  high_pe_ratio_year_1: number,
  high_pe_ratio_year_2: number,
  high_pe_ratio_year_3: number,
  high_pe_ratio_year_4: number,
  high_pe_ratio_year_5: number,
  high_pe_ratio_year_6: number,
  high_pe_ratio_year_7: number,
  high_pe_ratio_year_8: number,
  high_pe_ratio_year_9: number,
  high_pe_ratio_year_10: number,

  low_pe_ratio_year_1: number,
  low_pe_ratio_year_2: number,
  low_pe_ratio_year_3: number,
  low_pe_ratio_year_4: number,
  low_pe_ratio_year_5: number,
  low_pe_ratio_year_6: number,
  low_pe_ratio_year_7: number,
  low_pe_ratio_year_8: number,
  low_pe_ratio_year_9: number,
  low_pe_ratio_year_10: number,

  dividend_per_share_year_1: number,
  dividend_per_share_year_2: number,
  dividend_per_share_year_3: number,
  dividend_per_share_year_4: number,
  dividend_per_share_year_5: number,
  dividend_per_share_year_6: number,
  dividend_per_share_year_7: number,
  dividend_per_share_year_8: number,
  dividend_per_share_year_9: number,
  dividend_per_share_year_10: number,

  dividend_growth_year_2: number,
  dividend_growth_year_3: number,
  dividend_growth_year_4: number,
  dividend_growth_year_5: number,
  dividend_growth_year_6: number,
  dividend_growth_year_7: number,
  dividend_growth_year_8: number,
  dividend_growth_year_9: number,
  dividend_growth_year_10: number,

  dividend_payout_year_1: number,
  dividend_payout_year_2: number,
  dividend_payout_year_3: number,
  dividend_payout_year_4: number,
  dividend_payout_year_5: number,
  dividend_payout_year_6: number,
  dividend_payout_year_7: number,
  dividend_payout_year_8: number,
  dividend_payout_year_9: number,
  dividend_payout_year_10: number,

  high_yield_year_1: number,
  high_yield_year_2: number,
  high_yield_year_3: number,
  high_yield_year_4: number,
  high_yield_year_5: number,
  high_yield_year_6: number,
  high_yield_year_7: number,
  high_yield_year_8: number,
  high_yield_year_9: number,
  high_yield_year_10: number,

  outstanding_shares_year_1: number,
  outstanding_shares_year_2: number,
  outstanding_shares_year_3: number,
  outstanding_shares_year_4: number,
  outstanding_shares_year_5: number,
  outstanding_shares_year_6: number,
  outstanding_shares_year_7: number,
  outstanding_shares_year_8: number,
  outstanding_shares_year_9: number,
  outstanding_shares_year_10: number,

  outstanding_shares_growth_year_2: number,
  outstanding_shares_growth_year_3: number,
  outstanding_shares_growth_year_4: number,
  outstanding_shares_growth_year_5: number,
  outstanding_shares_growth_year_6: number,
  outstanding_shares_growth_year_7: number,
  outstanding_shares_growth_year_8: number,
  outstanding_shares_growth_year_9: number,
  outstanding_shares_growth_year_10: number,

  fc_revenue_growth_default_downside: number,
  fc_revenue_growth_default_base: number,
  fc_revenue_growth_default_upside: number,

  fc_revenue_growth_downside: number,
  fc_revenue_growth_base: number,
  fc_revenue_growth_upside: number,

  fc_revenue_year_5_default_downside: number,
  fc_revenue_year_5_default_base: number,
  fc_revenue_year_5_default_upside: number,
  
  fc_revenue_year_5_downside: number,
  fc_revenue_year_1_base: number,
  fc_revenue_year_2_base: number,
  fc_revenue_year_3_base: number,
  fc_revenue_year_4_base: number,
  fc_revenue_year_5_base: number,
  fc_revenue_year_5_upside: number,

  fc_pre_tax_profit_margin_default_downside: number,
  fc_pre_tax_profit_margin_default_base: number,
  fc_pre_tax_profit_margin_default_upside: number,

  fc_pre_tax_profit_margin_downside: number,
  fc_pre_tax_profit_margin_base: number,
  fc_pre_tax_profit_margin_upside: number,

  fc_pre_tax_net_income_year_5_default_downside: number,
  fc_pre_tax_net_income_year_5_default_base: number,
  fc_pre_tax_net_income_year_5_default_upside: number,
  
  fc_pre_tax_net_income_year_5_downside: number,
  fc_pre_tax_net_income_year_5_base: number,
  fc_pre_tax_net_income_year_5_upside: number,

  fc_income_tax_rate_default_downside: number,
  fc_income_tax_rate_default_base: number,
  fc_income_tax_rate_default_upside: number,

  fc_income_tax_rate_downside: number,
  fc_income_tax_rate_base: number,
  fc_income_tax_rate_upside: number,

  fc_net_profit_year_5_default_downside: number,
  fc_net_profit_year_5_default_base: number,
  fc_net_profit_year_5_default_upside: number,
  
  fc_net_profit_year_5_downside: number,
  fc_net_profit_year_5_base: number,
  fc_net_profit_year_5_upside: number,

  fc_outstanding_shares_growth_default_downside: number,
  fc_outstanding_shares_growth_default_base: number,
  fc_outstanding_shares_growth_default_upside: number,

  fc_outstanding_shares_growth_downside: number,
  fc_outstanding_shares_growth_base: number,
  fc_outstanding_shares_growth_upside: number,

  fc_outstanding_shares_year_5_default_downside: number,
  fc_outstanding_shares_year_5_default_base: number,
  fc_outstanding_shares_year_5_default_upside: number,
  
  fc_outstanding_shares_year_5_downside: number,
  fc_outstanding_shares_year_5_base: number,
  fc_outstanding_shares_year_5_upside: number,

  fc_eps_year_5_default_downside: number,
  fc_eps_year_5_default_base: number,
  fc_eps_year_5_default_upside: number,
  
  fc_eps_year_5_downside: number,
  fc_eps_year_1_base: number,
  fc_eps_year_2_base: number,
  fc_eps_year_3_base: number,
  fc_eps_year_4_base: number,
  fc_eps_year_5_base: number,
  fc_eps_year_5_upside: number,

  fc_eps_growth_default_downside: number,
  fc_eps_growth_default_base: number,
  fc_eps_growth_default_upside: number,

  fc_eps_growth_downside: number,
  fc_eps_growth_base: number,
  fc_eps_growth_upside: number,

  fc_pe_ratio_default_downside: number,
  fc_pe_ratio_default_base: number,
  fc_pe_ratio_default_upside: number,

  fc_pe_ratio_downside: number,
  fc_pe_ratio_base: number,
  fc_pe_ratio_upside: number,

  fc_stock_price_year_5_default_downside: number,
  fc_stock_price_year_5_default_base: number,
  fc_stock_price_year_5_default_upside: number,

  
  fc_stock_price_year_1_downside: number,
  fc_stock_price_year_2_downside: number,
  fc_stock_price_year_3_downside: number,
  fc_stock_price_year_4_downside: number,
  fc_stock_price_year_5_downside: number,
  fc_stock_price_year_1_base: number,
  fc_stock_price_year_2_base: number,
  fc_stock_price_year_3_base: number,
  fc_stock_price_year_4_base: number,
  fc_stock_price_year_5_base: number,
  fc_stock_price_year_1_upside: number,
  fc_stock_price_year_2_upside: number,
  fc_stock_price_year_3_upside: number,
  fc_stock_price_year_4_upside: number,
  fc_stock_price_year_5_upside: number,

  fc_total_stock_price_growth_default_downside: number,
  fc_total_stock_price_growth_default_base: number,
  fc_total_stock_price_growth_default_upside: number,

  fc_total_stock_price_growth_downside: number,
  fc_total_stock_price_growth_base: number,
  fc_total_stock_price_growth_upside: number,

  fc_annual_stock_price_growth_default_downside: number,
  fc_annual_stock_price_growth_default_base: number,
  fc_annual_stock_price_growth_default_upside: number,

  fc_annual_stock_price_growth_downside: number,
  fc_annual_stock_price_growth_base: number,
  fc_annual_stock_price_growth_upside: number,

  current_dividend_yield: number,

  fc_total_annual_return_default_downside: number,
  fc_total_annual_return_default_base: number,
  fc_total_annual_return_default_upside: number,
  
  fc_total_annual_return_downside: number,
  fc_total_annual_return_base: number,
  fc_total_annual_return_upside: number,

  high_end_hold_threshold: number,
  low_end_hold_threshold: number,

  high_end_hold_price: number,
  low_end_hold_price: number,

  current_price_zone: 'BUY' | 'HOLD' | 'SELL'
};