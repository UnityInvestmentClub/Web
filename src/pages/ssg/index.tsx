import './index.css';
import '@silevis/reactgrid/styles.css';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'wouter';
import { ReactGrid, CellChange } from '@silevis/reactgrid';
import { useProfile, useSSG } from '@hooks/';
import { getHistoricalDataRows, getHistoricalDataColumns, getForecastDataRows, getForecastDataColumns, getForecastDefaultRows, getForecastDefaultColumns } from '../../utils/ssg-grid';
import { calculateSSG } from '../../utils/ssg';
import { HistoricalDataRowId, ForecastDataRowId } from '@constants/';
import { InputChangeEvent, SelectChangeEvent, SSG, Profile } from '@_types/';

const initialData = {
  ssg: {
    name: '',
    isPresentedVersion: false,
    presentedMonth: '',
    stockTicker: '',
    preparedBy: '',
    preparedDate: '',
    sourceData: '',
    sourceDate: '',
    yearsOfData: 10,
    currentStockPrice: NaN,
    currentStockPriceDate: '',
    currentDividend: NaN,
    startingYear: 2014,
  
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
  const [data, setData] = useState(structuredClone(initialData));
  const [_, navigate] = useLocation();
  const { getSSG, createSSG, updateSSG } = useSSG();
  const { getProfiles } = useProfile();
  const routeParams = useParams();

  useEffect(() => {
    const loadData = async () => {
      try {
        var ssg = routeParams[0]
          ? await getSSG(routeParams[0])
          : structuredClone(initialData.ssg);

        var profiles = await getProfiles();
        console.log(profiles);

        setData({ ssg, profiles });
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

  const onFormChange = (e: InputChangeEvent | SelectChangeEvent) => {
    var { name, value, type } = e.target;
    var newValue;
    
    switch (type) {
      case 'checkbox':
        if ('checked' in e.target)
          newValue = e.target.checked;
        break;
      case 'number':
        newValue = Number(value);
        break;
      default:
        newValue = value;
        break;
    }

    if (name === 'currentStockPrice' || name === 'currentDividend')
      setData({
        ...data,
        ssg: calculateSSG({ ...data.ssg, [name]: newValue })
      });
    else
      setData({
        ...data,
        ssg: { ...data.ssg, [name]: newValue }
      });
  };

  const onSSGChange = (changes: CellChange[]) => {
    var updatedSSG = { ...data.ssg };

    changes.forEach((change: CellChange) => {
      if (change.type !== 'number')
        return;
      
      var idx = change.columnId as number;
      var rowId = change.rowId as string;
      var newValue = change.newCell.value ?? NaN;

      switch (rowId) {
        case HistoricalDataRowId.Header:
          updatedSSG.startingYear = newValue;
          break;
        case HistoricalDataRowId.Revenue:
        case HistoricalDataRowId.NetProfit:
        case HistoricalDataRowId.EPS:
        case HistoricalDataRowId.HighStockPrice:
        case HistoricalDataRowId.LowStockPrice:
        case HistoricalDataRowId.DividendPerShare:
        case HistoricalDataRowId.OutstandingShares:
        case ForecastDataRowId.PERatio:
          updatedSSG[rowId][idx] = newValue;
          break;
        case HistoricalDataRowId.IncomeTaxRate:
        case ForecastDataRowId.RevenueGrowth:
        case ForecastDataRowId.PreTaxProfitMargin:
        case ForecastDataRowId.IncomeTaxRate:
        case ForecastDataRowId.OutstandingShareGrowth:
          updatedSSG[rowId][idx] = (Math.abs(newValue) >= 1)
            ? newValue / 100
            : newValue;
          break;
      }
    });
    
    setData({ ...data, ssg: calculateSSG(updatedSSG)});
  };

  return (
    <div className='ssg'>
      <div className='ssg-form'>
        <div className='ssg-row'>
          <div className='ssg-input-container'>
            <p className='ssg-input-label'>Name</p>
            <input className='ssg-input' type='text' name='name' value={data.ssg.name} onChange={onFormChange}></input>
          </div>
          <div className='ssg-input-container'>
            <p className='ssg-input-label'>Presented Version</p>
            <input className='ssg-input' type='checkbox' name='isPresentedVersion' checked={data.ssg.isPresentedVersion} onChange={onFormChange}></input>
          </div>
          {data.ssg.isPresentedVersion ? <div className='ssg-input-container'>
            <p className='ssg-input-label'>Presented Month</p>
            <select className='ssg-select' name='presentedMonth' value={data.ssg.presentedMonth} onChange={onFormChange}>
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
            </select>
          </div> : <div />}
        </div>
        <div className='ssg-row'>
          <div className='ssg-input-container'>
            <p className='ssg-input-label'>Ticker</p>
            <input className='ssg-input' type='text' name='stockTicker' value={data.ssg.stockTicker} onChange={onFormChange}></input>
          </div>
          <div className='ssg-input-container'>
            <p className='ssg-input-label'>Prepared By</p>
            <input className='ssg-input' type='text' name='preparedBy' value={data.ssg.preparedBy} onChange={onFormChange}></input>
          </div>
          <div className='ssg-input-container'>
            <p className='ssg-input-label'>Prepared Date</p>
            <input className='ssg-input' type='date' name='preparedDate' value={data.ssg.preparedDate} onChange={onFormChange}></input>
          </div>
        </div>
        <div className='ssg-row'>
          <div className='ssg-input-container'>
            <p className='ssg-input-label'>Source of Data</p>
            <input className='ssg-input' type='text' name='sourceData' value={data.ssg.sourceData} onChange={onFormChange}></input>
          </div>
          <div className='ssg-input-container'>
            <p className='ssg-input-label'>Source Date</p>
            <input className='ssg-input' type='date' name='sourceDate' value={data.ssg.sourceDate} onChange={onFormChange}></input>
          </div>
          <div className='ssg-input-container'>
            <p className='ssg-input-label'>Years of Available Data</p>
            <input className='ssg-input' type='number' name='yearsOfData' value={data.ssg.yearsOfData || ''} onChange={onFormChange}></input>
          </div>
        </div>
        <div className='ssg-row'>
          <div className='ssg-input-container'>
            <p className='ssg-input-label'>Current Stock Price</p>
            <input className='ssg-input' type='number' name='currentStockPrice' value={data.ssg.currentStockPrice || ''} onChange={onFormChange}></input>
          </div>
          <div className='ssg-input-container'>
            <p className='ssg-input-label'>Current Price Date</p>
            <input className='ssg-input' type='date' name='currentStockPriceDate' value={data.ssg.currentStockPriceDate} onChange={onFormChange}></input>
          </div>
          <div className='ssg-input-container'>
            <p className='ssg-input-label'>Current Dividend</p>
            <input className='ssg-input' type='number' name='currentDividend' value={data.ssg.currentDividend || ''} onChange={onFormChange}></input>
          </div>
        </div>
      </div>
      <div className='ssg-historical'>
        <ReactGrid rows={getHistoricalDataRows(data.ssg)} columns={getHistoricalDataColumns()} onCellsChanged={onSSGChange} enableRangeSelection />
      </div>
      <div className='ssg-forecast'>
        <ReactGrid rows={getForecastDataRows(data.ssg)} columns={getForecastDataColumns()} onCellsChanged={onSSGChange} enableRangeSelection />
        <div className='ssg-forecast-default'>
          <ReactGrid rows={getForecastDefaultRows(data.ssg)} columns={getForecastDefaultColumns()} enableRangeSelection />
        </div>
      </div>
      <div className='ssg-buttons'>
        {routeParams[0]
          ? <button className='ssg-save-button' onClick={handleSave}>Save</button>
          : <button className='ssg-save-button' onClick={handleCreate}>Create</button>
        }
      </div>
    </div>
  );
};