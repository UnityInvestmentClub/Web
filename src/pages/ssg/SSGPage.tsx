import './SSGPage.css';
import { KeyboardEvent, useEffect, useState } from 'react';
import { ValidationError, object, string, number, date, boolean, array } from 'yup';
import { useLocation, useParams } from 'wouter';
import { useProfile, useSSG, useAppState } from '@hooks/';
import { Input, MultiSelect, Checkbox, HistoricalSheet, ForecastSheet, LoadingSpinner, PriceZones } from '@components/';
import { calculateSSG } from '@utils/';
import { SSG, Profile, Preparer, SSGDataField, SSGFormField } from '@_types/';

const initialSSG = {
  name: '',
  version: '3.0',
  isPresentedVersion: false,
  stockTicker: '',
  preparedBy: [] as Preparer[],
  preparedDate: '',
  sourceData: '',
  sourceDate: '',
  yearsOfData: 10,
  currentStockPrice: 0,
  currentStockPriceDate: '',
  currentDividend: 0,
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
  fcTotalAnnualReturn: Array(3).fill(NaN),

  highEndHoldThreshold: .05,
  lowEndHoldThreshold: .12,

  highEndHoldPrice: null,
  lowEndHoldPrice: null,

  currentPriceZone: null
} as SSG;

const initialSSGError = {
  name: false,
  isPresentedVersion: false,
  stockTicker: false,
  preparedBy: false,
  preparedDate: false,
  sourceData: false,
  sourceDate: false,
  yearsOfData: false,
  currentStockPrice: false,
  currentStockPriceDate: false,
  currentDividend: false,
  lowEndHoldThreshold: false,
  highEndHoldThreshold: false
}

const ssgSchema = object({
  name: string().required(),
  isPresentedVersion: boolean(),
  stockTicker: string().required(),
  preparedBy: array().min(1),
  preparedDate: date().required(),
  sourceData: string().required(),
  sourceDate: date().required(),
  yearsOfData: number().required().integer().min(1),
  currentStockPrice: number().required().min(.01),
  currentStockPriceDate: date().required(),
  currentDividend: number().required().min(0),
  lowEndHoldThreshold: number().required(),
  highEndHoldThreshold: number().required()
});

export const SSGPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [ssg, setSSG] = useState(initialSSG);
  const [undoStack, setUndoStack] = useState([] as SSG[]);
  const [redoStack, setRedoStack] = useState([] as SSG[]);
  const [ssgError, setSSGError] = useState(initialSSGError);
  const [ssgFormError, setSSGFormError] = useState(null);
  const [profiles, setProfiles] = useState([] as Profile[]);
  
  const { getSSG, createSSG, updateSSG } = useSSG();
  const { getProfiles } = useProfile();
  const { isMacOS } = useAppState();

  const [_, navigate] = useLocation();
  const routeParams = useParams();

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setSSGFormError(null);
        setSSGError(initialSSGError);

        setSSG(routeParams[0] ? await getSSG(routeParams[0]) : initialSSG);

        setProfiles(await getProfiles());
        
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    };
    
    loadData();
  }, [routeParams, getSSG, getProfiles]);

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const onFormChange = (name: string, value: any) => {
    var newValue = value;

    switch(name as SSGFormField) {
      case 'currentDividend':
      case 'currentStockPrice':
      case 'yearsOfData':
        setSSG(ssg => calculateSSG({ ...ssg, [name]: newValue }));
        break;
      case 'lowEndHoldThreshold':
      case 'highEndHoldThreshold':
        newValue = (value !== '') ? value / 100 : '';
        setSSG(ssg => calculateSSG({ ...ssg, [name]: newValue }));
        break;
      default:
        setSSG(ssg => ({ ...ssg, [name]: newValue }));
        break;
    }

    setSSGError(ssgError => ({
      ...ssgError,
      [name]: !ssgSchema.pick([name as SSGFormField]).isValidSync({ [name]: newValue })
    }));

    if (ssgSchema.isValidSync({ ...ssg, [name]: newValue }))
      setSSGFormError(null);
  };

  const onSheetChange = (field: SSGDataField) => (value: number, colIndex: number) => {
    setSSG(ssg => {
      // setUndoStack(stack => { console.log('test2'); return [...stack, ssg] });
      // setRedoStack([]);
      
      var updatedSSG = structuredClone(ssg);

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
          break;
      }

      return calculateSSG(updatedSSG);
    });
  };

  const onKeyDown = ({ ctrlKey, metaKey, key }: KeyboardEvent) => {
    return;
    if ((!isMacOS && ctrlKey) || metaKey) {
      if (key === 'z')
        handleSheetUndo();

      if (key === 'y')
        handleSheetRedo();
    }

  };

  const handleSheetUndo = () => {
    if (undoStack.length > 0) {
      const previousState = undoStack[undoStack.length - 1];
      setUndoStack(prev => prev.slice(0, prev.length - 1));
      setRedoStack(prev => [ssg, ...prev]);
      setSSG(previousState);
  }
  };

  const handleSheetRedo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack[0];
      setRedoStack(prev => prev.slice(1));
      setUndoStack(prev => [...prev, ssg]);
      setSSG(nextState);
  }
  };

  const handleSubmit = async() => {
    try {
      ssgSchema.validateSync(ssg, { abortEarly: false });

      routeParams[0]
        ? await updateSSG(ssg)
        : await createSSG(ssg);

      navigate('/');
    } catch (error) {
      if (error instanceof ValidationError) {
        var errors = { };

        for (const innerError of error.inner) {
          errors = { ...errors, [innerError.path]: true };
        }

        setSSGError(ssgError => ({ ...ssgError, ...errors }));
      }

      setSSGFormError('Something went wrong! Check everything is entered correctly!');
    }
  };

  return isLoading
    ? (<LoadingSpinner />)
    : (<div className='ssg' onKeyDown={onKeyDown}>
      <div className='ssg-form'>
        <div className='ssg-row'>
          <Input className='ssg-form-input big-cell' type='text' name='name' label='Name' value={ssg.name} error={ssgError.name} onChange={onFormChange} />
          <Input className='ssg-form-input small-cell' type='text' name='stockTicker' label='Ticker' value={ssg.stockTicker} error={ssgError.stockTicker} onChange={onFormChange} />
        </div>
        <div className='ssg-row'>
          <MultiSelect<Preparer>
            className='ssg-form-input big-cell'
            name='preparedBy'
            label='Prepared By'
            value={ssg.preparedBy}
            options={profiles.map((profile: Profile) => ({ id: profile.id, firstName: profile.firstName, lastName: profile.lastName}))}
            getOptionsValue={(option: Preparer) => option.id}
            getOptionsLabel={(option: Preparer) => `${option.firstName} ${option.lastName}`}
            error={ssgError.preparedBy}
            onChange={onFormChange}
          />
          <Input className='ssg-form-input small-cell' type='date' name='preparedDate' label='Prepared Date' value={ssg.preparedDate} error={ssgError.preparedDate} onChange={onFormChange} />
        </div>
        <div className='ssg-row'>
          <Input className='ssg-form-input small-cell' type='number' name='yearsOfData' label='Years of Available Data' value={ssg.yearsOfData} error={ssgError.yearsOfData} onChange={onFormChange} />
          <Input className='ssg-form-input small-cell' type='text' name='sourceData' label='Source of Data' value={ssg.sourceData} error={ssgError.sourceData} onChange={onFormChange} />
          <Input className='ssg-form-input small-cell' type='date' name='sourceDate' label='Source Date' value={ssg.sourceDate} error={ssgError.sourceDate} onChange={onFormChange} />
        </div>
        <div className='ssg-row'>
          <Input className='ssg-form-input small-cell' type='number' name='currentDividend' label='Current Dividend' value={ssg.currentDividend} error={ssgError.currentDividend} onChange={onFormChange} />
          <Input className='ssg-form-input small-cell' type='number' name='currentStockPrice' label='Current Stock Price' value={ssg.currentStockPrice} error={ssgError.currentStockPrice} onChange={onFormChange} />
          <Input className='ssg-form-input small-cell' type='date' name='currentStockPriceDate' label='Current Price Date' value={ssg.currentStockPriceDate} error={ssgError.currentStockPriceDate} onChange={onFormChange} />
        </div>
        <div className='ssg-row'>
          <Checkbox className='ssg-form-input small-cell' name='isPresentedVersion' label='Presented Version' checked={ssg.isPresentedVersion} onChange={onFormChange} />
          <div className='ssg-form-input small-cell button-cell'>
            <button className='ssg-save-button' onClick={handleSubmit}>Save</button>
            {ssgFormError && <p className='ssg-error'>{ssgFormError}</p>}
          </div>
        </div>
      </div>

      <HistoricalSheet className='ssg-sheet' ssg={ssg} onChange={onSheetChange} />
      <ForecastSheet className='ssg-sheet' ssg={ssg} onChange={onSheetChange} />

      <div className='ssg-price-zones'>
        <PriceZones ssg={ssg} />

        <div className='ssg-row'>
          <Input className='ssg-threshold-input' type='number' name='lowEndHoldThreshold' label='Low End HoldThreshold %' value={ssg.lowEndHoldThreshold.toString() !== '' ? (ssg.lowEndHoldThreshold * 100).toFixed() : ''} error={ssgError.lowEndHoldThreshold} onChange={onFormChange} />
          <Input className='ssg-threshold-input right-cell' type='number' name='highEndHoldThreshold' label='High End Hold Threshold %' value={ssg.highEndHoldThreshold.toString() !== '' ? (ssg.highEndHoldThreshold * 100).toFixed() : ''} error={ssgError.highEndHoldThreshold} onChange={onFormChange} />
        </div>
      </div>
    </div>);
};