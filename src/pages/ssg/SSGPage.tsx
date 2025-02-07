import './SSGPage.css';
import { KeyboardEvent, useEffect, useState } from 'react';
import { ValidationError, InferType, object, string, number, date, boolean, array } from 'yup';
import { useLocation, useParams } from 'wouter';
import { useProfile, useSSG, useMeetingDate, useAppState } from '@hooks/';
import { Input, MultiSelect, Checkbox, Button, LoadingSpinner, Select } from '@components/';
import { HistoricalSheet, ForecastSheet, PriceZones } from '@features/';
import { getDateWithLocalTimeZone, processSSG } from '@utils/';
import { SSG, Profile, Preparer, MeetingDate } from '@_types/';

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

  currentPriceZone: null,

  fcRevenueProjection: Array(5).fill(NaN),
  
  fcEPSProjection: Array(5).fill(NaN),
  
  fcStockPriceDownsideProjection: Array(5).fill(NaN),
  fcStockPriceBaseProjection: Array(5).fill(NaN),
  fcStockPriceUpsideProjection: Array(5).fill(NaN)
} as SSG;

const initialSSGFormError = {
  name: false,
  isPresentedVersion: false,
  meetingDateId: false,
  stockTicker: false,
  preparedBy: false,
  preparedDate: false,
  sourceData: false,
  sourceDate: false,
  yearsOfData: false,
  currentStockPrice: false,
  currentStockPriceDate: false,
  currentDividend: false
}

const ssgSchema = object({
  name: string().required(),
  isPresentedVersion: boolean(),
  meetingDateId: string()
    .when('isPresentedVersion', {
      is: true,
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
  stockTicker: string().required(),
  preparedBy: array().min(1),
  preparedDate: date().required(),
  sourceData: string().required(),
  sourceDate: date().required(),
  yearsOfData: number().required().integer().min(1),
  currentStockPrice: number().required().min(.01),
  currentStockPriceDate: date().required(),
  currentDividend: number().required().min(0)
});

export const SSGPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [ssg, setSSG] = useState(initialSSG);
  const [canUserSave, setCanUserSave] = useState(true);

  const [undoStack, setUndoStack] = useState([] as SSG[]);
  const [redoStack, setRedoStack] = useState([] as SSG[]);

  const [ssgFormError, setSSGFormError] = useState(initialSSGFormError);
  const [ssgSaveError, setSSGSaveError] = useState(null);

  const [profiles, setProfiles] = useState([] as Profile[]);
  const [meetingDates, setMeetingDates] = useState([] as MeetingDate[]);
  
  const { getSSG, createSSG, updateSSG } = useSSG();
  const { getProfiles } = useProfile();
  const { getMeetingDates } = useMeetingDate();
  const { isMacOS, authId, isAdmin } = useAppState();

  const [_, navigate] = useLocation();
  const routeParams = useParams();

  useEffect(() => {
    const loadData = async () => {
      try {
        // Reset states
        setIsLoading(true);
        setSSGSaveError(null);
        setSSGFormError(initialSSGFormError);
        
        // Fetch profile and meeting dates data
        setProfiles(await getProfiles());
        setMeetingDates(await getMeetingDates());

        // Fetch SSG and evaluate whether user can save
        if (!routeParams[0]) {
          // New SSG
          setCanUserSave(true);
          setSSG(initialSSG);
        } else {
          // Existing SSG
          const ssg = await getSSG(routeParams[0]);

          const isAuthorOrPreparer = (authId === ssg.createdBy || ssg.preparedBy.some((preparer: Preparer) => authId === preparer.id));
          const isAfterMeetingDate = (new Date() > getDateWithLocalTimeZone(ssg?.meetingDate));

          setCanUserSave((isAuthorOrPreparer && !isAfterMeetingDate) || isAdmin);
          setSSG(ssg);
        }

        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    };
    
    loadData();
  }, [routeParams, authId, isAdmin, getSSG, getProfiles, getMeetingDates]);

  const onFormChange = (name: string, value: unknown) => {
    if (name === 'currentDividend' || name === 'currentStockPrice' || name === 'yearsOfData') {
      setSSG(ssg => processSSG({ ...ssg, [name]: value }));
    } else {
      setSSG(ssg => ({ ...ssg, [name]: value }));
    }

    const inputSchema = ssgSchema.pick([name as keyof InferType<typeof ssgSchema>]);
    const isInputValid = inputSchema.isValidSync({ [name]: value, isPresentedVersion: ssg.isPresentedVersion }); // Including isPresentedVersion for the meetingDateId field schema
    setSSGFormError(ssgFormError => ({ ...ssgFormError, [name]: !isInputValid }));

    if (ssgSaveError && ssgSchema.isValidSync({ ...ssg, [name]: value }))
      setSSGSaveError(null);
  };

  const onSheetChange = (field: keyof SSG) => (value: number, colIndex: number) => {
    if (field === 'startingYear') {
      setSSG(ssg => ({ ...ssg, [field]: value }));
    } else {
      setSSG(ssg => {
        var newSSG = structuredClone(ssg);
        (newSSG[field] as number[])[colIndex - 1] = value;

        return processSSG(newSSG);
      });
    }

    // NOTE: Old change handler, might need again for undo/redo
    // setSSG(ssg => {
    //   // setUndoStack(stack => { console.log('test2'); return [...stack, ssg] });
    //   // setRedoStack([]);
      
    //   var newSSG = structuredClone(ssg);

    //   if (field === 'startingYear') {
    //     newSSG.startingYear = value;
    //   } else {
    //     (newSSG[field] as number[])[colIndex - 1] = value;
    //   }

    //   return processSSG(newSSG);
    // });
  };

  // TODO: Finish undo/redo feature
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
      if (!canUserSave)
        return;

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

        setSSGFormError(ssgFormError => ({ ...ssgFormError, ...errors }));
      }

      setSSGSaveError('Something went wrong! Check everything is entered correctly');
    }
  };

  return isLoading
    ? (<LoadingSpinner />)
    : (<div className='ssg' onKeyDown={onKeyDown}>
      <div className='ssg-form'>
        <div className='ssg-row'>
          <Input className='ssg-form-input big-cell' type='text' name='name' label='Name' value={ssg.name} error={ssgFormError.name} onChange={onFormChange} />
          <Input className='ssg-form-input small-cell' type='text' name='stockTicker' label='Ticker' value={ssg.stockTicker} error={ssgFormError.stockTicker} onChange={onFormChange} />
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
            error={ssgFormError.preparedBy}
            onChange={onFormChange}
          />
          <Input className='ssg-form-input small-cell' type='date' name='preparedDate' label='Prepared Date' value={ssg.preparedDate} error={ssgFormError.preparedDate} onChange={onFormChange} />
        </div>
        <div className='ssg-row'>
          <Input className='ssg-form-input small-cell' type='number' name='yearsOfData' label='Years of Available Data' value={ssg.yearsOfData} error={ssgFormError.yearsOfData} onChange={onFormChange} />
          <Input className='ssg-form-input small-cell' type='text' name='sourceData' label='Source of Data' value={ssg.sourceData} error={ssgFormError.sourceData} onChange={onFormChange} />
          <Input className='ssg-form-input small-cell' type='date' name='sourceDate' label='Source Date' value={ssg.sourceDate} error={ssgFormError.sourceDate} onChange={onFormChange} />
        </div>
        <div className='ssg-row'>
          <Input className='ssg-form-input small-cell' type='number' name='currentDividend' label='Current Dividend' value={ssg.currentDividend} error={ssgFormError.currentDividend} onChange={onFormChange} />
          <Input className='ssg-form-input small-cell' type='number' name='currentStockPrice' label='Current Stock Price' value={ssg.currentStockPrice} error={ssgFormError.currentStockPrice} onChange={onFormChange} />
          <Input className='ssg-form-input small-cell' type='date' name='currentStockPriceDate' label='Current Price Date' value={ssg.currentStockPriceDate} error={ssgFormError.currentStockPriceDate} onChange={onFormChange} />
        </div>
        <div className='ssg-row'>
          <Checkbox className='small-cell' name='isPresentedVersion' label='Presented Version' checked={ssg.isPresentedVersion} onChange={onFormChange} />
          {ssg.isPresentedVersion && <Select className='ssg-form-input small-cell' name='meetingDateId' label='Meeting Date' value={ssg.meetingDateId ?? ''} error={ssgFormError.meetingDateId} onChange={onFormChange}>
            <option key='' value=''>Select a Meeting Date</option>
            {meetingDates.map(meetingDate => (<option key={meetingDate.id} value={meetingDate.id}>{meetingDate.formattedDate}</option>))}
          </Select>}
          <div className='small-cell button-cell'>
            <div className='button-row'>
              <Button className='ssg-save-button' disabled={!canUserSave} onClick={handleSubmit}>Save</Button>
              <Button className='ssg-save-button' disabled>Save As</Button>
            </div>
            {ssgSaveError && <p className='ssg-error'>{ssgSaveError}</p>}
          </div>
        </div>
      </div>

      <HistoricalSheet className='ssg-sheet' ssg={ssg} onChange={onSheetChange} />
      <ForecastSheet className='ssg-sheet' ssg={ssg} onChange={onSheetChange} />

      <div className='ssg-price-zones'>
        <PriceZones ssg={ssg} />

        <p className='price-zone-text'>Yearly Return & Price Hold Threshold</p>
        <div className='ssg-row'>
          <div className='low-threshold'>
            <p>{ssg.lowEndHoldThreshold * 100}%</p>
            {!!ssg.lowEndHoldPrice && <div className='threshold-price'>${ssg.lowEndHoldPrice.toFixed(2)}</div>}
          </div>
          <div className='high-threshold'>
            <p>{ssg.highEndHoldThreshold * 100}%</p>
            {!!ssg.highEndHoldPrice && <div className='threshold-price'>${ssg.highEndHoldPrice.toFixed(2)}</div>}
          </div>
        </div>
      </div>
    </div>);
};