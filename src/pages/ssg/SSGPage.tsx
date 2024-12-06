import './SSGPage.css';
import MultiSelect, { MultiValue } from 'react-select';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'wouter';
import { useProfile, useSSG } from '@hooks/';
import { Input, Select, Checkbox, HistoricalSheet, ForecastSheet, LoadingSpinner } from '@components/';
import { calculateSSG } from '@utils/';
import { SSG, Profile, Preparer, SSGDataField, SSGFormField } from '@_types/';

const initialSSG = {
  name: '',
  isPresentedVersion: false,
  presentedMonth: '',
  stockTicker: '',
  preparedDate: '',
  sourceData: '',
  sourceDate: '',
  yearsOfData: 10,
  currentStockPrice: 0,
  currentStockPriceDate: '',
  currentDividend: 0,
  startingYear: 2014,
  preparedBy: [] as Preparer[],

  revenue: Array(10).fill(NaN),
  revenueGrowth: Array(9).fill(NaN),

  netProfit: Array(10).fill(NaN),
  incomeTaxRate: Array(10).fill(NaN),
  preTaxNetIncome: Array(10).fill(NaN),
  preTaxIncomeGrowth: Array(9).fill(NaN),
  preTaxProfitMargin: Array(10).fill(NaN),

  eps: Array(10).fill(NaN),
  epsGrowth: Array(9).fill(NaN),

  highStockPrice: Array(10).fill(NaN),
  lowStockPrice: Array(10).fill(NaN),
  highPERatio: Array(10).fill(NaN),
  lowPERatio: Array(10).fill(NaN),

  dividendPerShare: Array(10).fill(NaN),
  dividendGrowth: Array(9).fill(NaN),
  dividendPayout: Array(10).fill(NaN),
  highYield: Array(10).fill(NaN),

  outstandingShares: Array(10).fill(NaN),
  outstandingShareGrowth: Array(9).fill(NaN),

  fcRevenueGrowthDefault: Array(3).fill(NaN),
  fcRevenueGrowth: Array(3).fill(NaN),
  fcRevenueDefault: Array(3).fill(NaN),
  fcRevenue: Array(3).fill(NaN),

  fcPreTaxProfitMarginDefault: Array(3).fill(NaN),
  fcPreTaxProfitMargin: Array(3).fill(NaN),
  fcPreTaxNetIncomeDefault: Array(3).fill(NaN),
  fcPreTaxNetIncome: Array(3).fill(NaN),

  fcIncomeTaxRateDefault: Array(3).fill(NaN),
  fcIncomeTaxRate: Array(3).fill(NaN),
  fcNetProfitDefault: Array(3).fill(NaN),
  fcNetProfit: Array(3).fill(NaN),

  fcOutstandingShareGrowthDefault: Array(3).fill(NaN),
  fcOutstandingShareGrowth: Array(3).fill(NaN),
  fcOutstandingSharesDefault: Array(3).fill(NaN),
  fcOutstandingShares: Array(3).fill(NaN),

  fcEPSDefault: Array(3).fill(NaN),
  fcEPS: Array(3).fill(NaN),
  fcEPSGrowthDefault: Array(3).fill(NaN),
  fcEPSGrowth: Array(3).fill(NaN),

  fcPERatioDefault: Array(3).fill(NaN),
  fcPERatio: Array(3).fill(NaN),

  fcStockPriceDefault: Array(3).fill(NaN),
  fcStockPrice: Array(3).fill(NaN),

  fcTotalStockPriceGrowthDefault: Array(3).fill(NaN),
  fcTotalStockPriceGrowth: Array(3).fill(NaN),

  fcAnnualStockPriceGrowthDefault: Array(3).fill(NaN),
  fcAnnualStockPriceGrowth: Array(3).fill(NaN),

  currentDividendYield: Array(3).fill(NaN),

  fcTotalAnnualReturnDefault: Array(3).fill(NaN),
  fcTotalAnnualReturn: Array(3).fill(NaN)
};

export const SSGPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [ssg, setSSG] = useState(initialSSG as SSG);
  const [profiles, setProfiles] = useState([] as Profile[]);
  
  const { getSSG, createSSG, updateSSG } = useSSG();
  const { getProfiles } = useProfile();

  const [_, navigate] = useLocation();
  const routeParams = useParams();

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        setSSG(routeParams[0] ? await getSSG(routeParams[0]) : initialSSG);

        setProfiles(await getProfiles());
        
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    };
    
    loadData();
  }, [routeParams, getSSG, getProfiles]);

  const getPreparerOptions = () => {
    return profiles.map((profile: Profile) => ({
      id: profile.id,
      firstName: profile.firstName,
      lastName: profile.lastName
    }));
  };

  const onFormChange = (name: string, value: any) => {
    switch(name as SSGFormField) {
      case 'currentDividend':
      case 'currentStockPrice':
      case 'yearsOfData':
        setSSG(ssg => calculateSSG({ ...ssg, [name]: Number(value) }));
        break;
      default:
        setSSG(ssg => ({ ...ssg, [name]: value }));
        break;
    }
  };

  const onSheetChange = (field: SSGDataField) => (value: number, colIndex: number) => {
    setSSG(ssg => {
      var updatedSSG = { ...ssg };

      switch (field) {
        case 'startingYear':
          updatedSSG.startingYear = value;
          break;
        case 'incomeTaxRate':
        case 'fcRevenueGrowth':
        case 'fcPreTaxProfitMargin':
        case 'fcIncomeTaxRate':
        case 'fcOutstandingShareGrowth':
          updatedSSG[field][colIndex - 1] = value / 100;
          break;
        case 'dividendPerShare':
        case 'eps':
        case 'highStockPrice':
        case 'lowStockPrice':
        case 'netProfit':
        case 'outstandingShares':
        case 'revenue':
        case 'fcPERatio':
          updatedSSG[field][colIndex - 1] = value;
      }

      return calculateSSG(updatedSSG);
    });
  };

  const handleSubmit = async() => {
    try {
      routeParams[0]
        ? await updateSSG(ssg.id, ssg)
        : await createSSG(ssg);

      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  return isLoading
    ? (<LoadingSpinner />)
    : (<div className='ssg'>
      <div className='ssg-form'>
        <div className='ssg-row'>
          <Input type='text' name='name' label='Name' value={ssg.name} onChange={onFormChange} />
          <Checkbox name='isPresentedVersion' label='Presented Version' checked={ssg.isPresentedVersion} onChange={onFormChange} />
          {ssg.isPresentedVersion ? <Select name='presentedMonth' label='Presented Month' value={ssg.presentedMonth} onChange={onFormChange}>
            <option value=''>Select a Month</option>
            <option value='January'>January</option>
            <option value='February'>February</option>
            <option value='March'>March</option>
            <option value='April'>April</option>
            <option value='May'>May</option>
            <option value='June'>June</option>
            <option value='July'>July</option>
            <option value='August'>August</option>
            <option value='September'>September</option>
            <option value='October'>October</option>
            <option value='November'>November</option>
            <option value='December'>December</option>
          </Select> : null}
        </div>
        <div className='ssg-row'>
          <Input type='text' name='stockTicker' label='Ticker' value={ssg.stockTicker} onChange={onFormChange} />
          <div className='ssg-input-container'>
            <p className='ssg-input-label'>Prepared By</p>
            <MultiSelect isMulti onChange={(preparers: MultiValue<Preparer>) => onFormChange('preparedBy', preparers as Preparer[] || [])} value={ssg.preparedBy} options={getPreparerOptions()} getOptionValue={(profile: Preparer) => profile.id} getOptionLabel={(profile: Preparer) => `${profile.firstName} ${profile.lastName}`} closeMenuOnSelect={false} />
          </div>
          <Input type='date' name='preparedDate' label='Prepared Date' value={ssg.preparedDate} onChange={onFormChange} />
        </div>
        <div className='ssg-row'>
          <Input type='text' name='sourceData' label='Source of Data' value={ssg.sourceData} onChange={onFormChange} />
          <Input type='date' name='sourceDate' label='Source Date' value={ssg.sourceDate} onChange={onFormChange} />
          <Input type='number' name='yearsOfData' label='Years of Available Data' value={ssg.yearsOfData || ''} onChange={onFormChange} />
        </div>
        <div className='ssg-row'>
          <Input type='number' name='currentStockPrice' label='Current Stock Price' value={ssg.currentStockPrice || ''} onChange={onFormChange} />
          <Input type='date' name='currentStockPriceDate' label='Current Price Date' value={ssg.currentStockPriceDate} onChange={onFormChange} />
          <Input type='number' name='currentDividend' label='Current Dividend' value={ssg.currentDividend || ''} onChange={onFormChange} />
        </div>
      </div>

      <HistoricalSheet ssg={ssg} onChange={onSheetChange} />
      <ForecastSheet ssg={ssg} onChange={onSheetChange} />

      <div className='ssg-buttons'>
        <button className='ssg-save-button' onClick={handleSubmit}>
          {routeParams[0] ? 'Save' : 'Create'}
        </button>
      </div>
    </div>);
};