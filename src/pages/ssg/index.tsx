import './index.css';
import "@silevis/reactgrid/styles.css";
import { useState } from 'react';
import { ReactGrid, CellChange } from '@silevis/reactgrid';
import { getHistoricalDataRows, getHistoricalDataColumns, getForecastDataRows, getForecastDataColumns, getForecastDefaultRows, getForecastDefaultColumns } from '../../utils/ssg-grid';
import { calculateSSG } from '../../utils/ssg';
import { HistoricalDataRowId, ForecastDataRowId, EmptySSG } from '../../constants.ts';

//TODO: convert ssg hooks to global context with reducers

export default () => {
  const [ssg, setSSG] = useState(EmptySSG);

  const historicalDataRows = getHistoricalDataRows(ssg);
  const historicalDataCols = getHistoricalDataColumns();

  const forecastDataRows = getForecastDataRows(ssg);
  const forecastDataColumns = getForecastDataColumns();

  const forecastDefaultRows = getForecastDefaultRows(ssg);
  const forecastDefaultColumns = getForecastDefaultColumns();

  const onSSGFormChange = (e: any) => {
    var property = e.target.name;
    var updatedSSG = { ...ssg };

    switch (property) {
      case "isPresentedVersion":
        updatedSSG[property] = e.target.checked;
        break;
      case "presentedMonth":
        updatedSSG[property] = Number(e.target.value);
        break;
      default:
        updatedSSG[property] = e.target.value;
        break;
    }
    
    setSSG(calculateSSG(updatedSSG));
  };

  const onSSGChange = (changes: CellChange[]) => {
    changes.forEach((change: CellChange) => {
      if (change.type !== "number")
        return;
      
      var idx = change.columnId as number;
      var rowId = change.rowId as string;
      var updatedSSG = { ...ssg };

      switch (rowId) {
        case HistoricalDataRowId.Header:
          updatedSSG.startingYear = change.newCell.value;
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
        default:
          updatedSSG[rowId][idx] = change.newCell.value;
          break;
      }

      setSSG(calculateSSG(updatedSSG));
    });
  };

  return (
    <div className='ssg'>
      <form className='ssg-form'>
        <div className='ssg-row'>
          <div className='ssg-input'>
            <p className='ssg-input-label'>Name</p>
            <input type='text' name='name' value={ssg.name} onChange={onSSGFormChange}></input>
          </div>
          <div className='ssg-input'>
            <p className='ssg-input-label'>Presented Version</p>
            <input type='checkbox' name='isPresentedVersion' checked={ssg.isPresentedVersion} onChange={onSSGFormChange}></input>
          </div>
          {ssg.isPresentedVersion ? <div className='ssg-input'>
            <p className='ssg-input-label'>Presented Month</p>
            <select name='presentedMonth' value={ssg.presentedMonth} onChange={onSSGFormChange}>
              <option value="0">Select</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div> : <div />}
        </div>
        <div className='ssg-row'>
          <div className='ssg-input'>
            <p className='ssg-input-label'>Ticker</p>
            <input type='text' name='stockTicker' value={ssg.stockTicker} onChange={onSSGFormChange}></input>
          </div>
          <div className='ssg-input'>
            <p className='ssg-input-label'>Prepared By</p>
            <input type='text' name='preparedBy' value={ssg.preparedBy} onChange={onSSGFormChange}></input>
          </div>
          {<div className='ssg-input'>
            <p className='ssg-input-label'>Prepared Date</p>
            <input type='date' name='preparedDate' value={ssg.preparedDate} onChange={onSSGFormChange}></input>
          </div>}
        </div>
        <div className='ssg-row'>
          <div className='ssg-input'>
            <p className='ssg-input-label'>Source of Data</p>
            <input type='text' name='sourceData' value={ssg.sourceData} onChange={onSSGFormChange}></input>
          </div>
          <div className='ssg-input'>
            <p className='ssg-input-label'>Source Date</p>
            <input type='date' name='sourceDate' value={ssg.sourceDate} onChange={onSSGFormChange}></input>
          </div>
          <div className='ssg-input'>
            <p className='ssg-input-label'>Years of Available Data</p>
            <input type='text' name='yearsOfData' value={ssg.yearsOfData} onChange={onSSGFormChange}></input>
          </div>
        </div>
        <div className='ssg-row'>
          <div className='ssg-input'>
            <p className='ssg-input-label'>Current Stock Price</p>
            <input type='text' name='currentStockPrice' value={ssg.currentStockPrice} onChange={onSSGFormChange}></input>
          </div>
          <div className='ssg-input'>
            <p className='ssg-input-label'>Current Price Date</p>
            <input type='date' name='currentStockPriceDate' value={ssg.currentStockPriceDate} onChange={onSSGFormChange}></input>
          </div>
          <div className='ssg-input'>
            <p className='ssg-input-label'>Current Dividend</p>
            <input type='text' name='currentDividend' value={ssg.currentDividend} onChange={onSSGFormChange}></input>
          </div>
        </div>
      </form>
      <div className='ssg-historical'>
        <ReactGrid rows={historicalDataRows} columns={historicalDataCols} onCellsChanged={onSSGChange} enableRangeSelection />
      </div>
      <div className='ssg-forecast'>
        <ReactGrid rows={forecastDataRows} columns={forecastDataColumns} onCellsChanged={onSSGChange} enableRangeSelection />
        <div className='ssg-forecast-default'>
          <ReactGrid rows={forecastDefaultRows} columns={forecastDefaultColumns} enableRangeSelection />
        </div>
      </div>
      <div className='ssg-save'>
        <button className='ssg-save-button' onClick={() => console.log(ssg)}>Save</button>
      </div>
    </div>
  );
};