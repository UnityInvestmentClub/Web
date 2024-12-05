import './SSGPage.css';
import MultiSelect, { MultiValue } from 'react-select';
import { ChangeEvent, useEffect, useState } from 'react';
import { useLocation, useParams } from 'wouter';
import { useProfile, useSSG } from '@hooks/';
import { Input, Select, Checkbox, HistoricalSheet, ForecastSheet, LoadingSpinner } from '@components/';
import { calculateSSG } from '@utils/';
import { SSG, Profile, Preparer, SSGDataField, SSGFormField } from '@_types/';

const initialData = {
  ssg: {
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
  } as SSG,
  profiles: [] as Profile[]
}

export const SSGPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(initialData);
  const [_, navigate] = useLocation();
  const { getSSG, createSSG, updateSSG } = useSSG();
  const { getProfiles } = useProfile();
  const routeParams = useParams();

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        var ssg = routeParams[0]
          ? await getSSG(routeParams[0])
          : initialData.ssg;

        var profiles = await getProfiles();

        setData({ ssg, profiles });
        
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    };
    
    loadData();
  }, [routeParams, getSSG, getProfiles]);
  
  const handleCreate = async () => {
    try {
      await createSSG(data.ssg);

      navigate('/');
    } catch (e) {
      console.error(e)
    }
  };

  const handleSave = async () => {
    try {
      await updateSSG(data.ssg.id, data.ssg);

      navigate('/');
    } catch (e) {
      console.error(e)
    }
  };

  const onFormChange = ({ target }: ChangeEvent) => {
    var { name, value } = (target as HTMLInputElement | HTMLSelectElement);
    var newValue: boolean | string | number;

    switch(name as SSGFormField) {
      case 'isPresentedVersion':
        newValue = (target as HTMLInputElement).checked;
        break;
      case 'currentDividend':
      case 'currentStockPrice':
      case 'yearsOfData':
        newValue = Number(value);
        break;
      case 'currentStockPriceDate':
      case 'name':
      case 'preparedDate':
      case 'presentedMonth':
      case 'sourceData':
      case 'sourceDate':
      case 'stockTicker':
        newValue = value;
        break;
    }

    console.log(name, newValue);
    
    setData(data => ({
      ...data,
      ssg: calculateSSG({ ...data.ssg, [name]: newValue })
    }));
  };

  const getPreparerOptions = () => {
    return data.profiles.map((profile: Profile) => ({
      id: profile.id,
      firstName: profile.firstName,
      lastName: profile.lastName
    }));
  };

  const onPreparedByChange = (preparers: MultiValue<Preparer>) => {
    setData(data => ({
      ...data,
      ssg: { ...data.ssg, preparedBy: preparers as Preparer[] || [] }
    }));
  };

  const onSheetChange = (field: SSGDataField) => (value: number, colIndex: number) => {
    setData(data => {
      var updatedSSG = { ...data.ssg };

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

      return {
        ...data,
        ssg: calculateSSG(updatedSSG)
      };
    });
  };

  return isLoading
    ? <LoadingSpinner />
    : <div className='ssg'>
      <div className='ssg-form'>
        <div className='ssg-row'>
          <Input type='text' name='name' label='Name' value={data.ssg.name} onChange={onFormChange} />
          <Checkbox name='isPresentedVersion' label='Presented Version' checked={data.ssg.isPresentedVersion} onChange={onFormChange} />
          {data.ssg.isPresentedVersion ? <Select name='presentedMonth' label='Presented Month' value={data.ssg.presentedMonth} onChange={onFormChange}>
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
          <Input type='text' name='stockTicker' label='Ticker' value={data.ssg.stockTicker} onChange={onFormChange} />
          <div className='ssg-input-container'>
            <p className='ssg-input-label'>Prepared By</p>
            <MultiSelect isMulti onChange={onPreparedByChange} value={data.ssg.preparedBy} options={getPreparerOptions()} getOptionValue={(profile: Preparer) => profile.id} getOptionLabel={(profile: Preparer) => `${profile.firstName} ${profile.lastName}`} closeMenuOnSelect={false} />
          </div>
          <Input type='date' name='preparedDate' label='Prepared Date' value={data.ssg.preparedDate} onChange={onFormChange} />
        </div>
        <div className='ssg-row'>
          <Input type='text' name='sourceData' label='Source of Data' value={data.ssg.sourceData} onChange={onFormChange} />
          <Input type='date' name='sourceDate' label='Source Date' value={data.ssg.sourceDate} onChange={onFormChange} />
          <Input type='number' name='yearsOfData' label='Years of Available Data' value={data.ssg.yearsOfData || ''} onChange={onFormChange} />
        </div>
        <div className='ssg-row'>
          <Input type='number' name='currentStockPrice' label='Current Stock Price' value={data.ssg.currentStockPrice || ''} onChange={onFormChange} />
          <Input type='date' name='currentStockPriceDate' label='Current Price Date' value={data.ssg.currentStockPriceDate} onChange={onFormChange} />
          <Input type='number' name='currentDividend' label='Current Dividend' value={data.ssg.currentDividend || ''} onChange={onFormChange} />
        </div>
      </div>

      <HistoricalSheet ssg={data.ssg} onChange={onSheetChange} />
      <ForecastSheet ssg={data.ssg} onChange={onSheetChange} />

      <div className='ssg-buttons'>
        {routeParams[0]
          ? <button className='ssg-save-button' onClick={handleSave}>Save</button>
          : <button className='ssg-save-button' onClick={handleCreate}>Create</button>
        }
      </div>
    </div>;
};