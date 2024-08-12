import './index.css';
import "@silevis/reactgrid/styles.css";
import { useState } from 'react';
import { ReactGrid, CellChange } from '@silevis/reactgrid';
import { getHistoricalDataRows, getHistoricalDataColumns, getForecastDataRows, getForecastDataColumns } from '../../utils/ssg-grid';
import { calculateSSG } from '../../utils/ssg';
import { HistoricalDataRowId, ForecastDataRowId, EmptySSG } from '../../constants.ts';

//TODO: convert ssg hooks to global context with reducers

export default () => {
  const [ssg, setSSG] = useState(EmptySSG);

  const historicalDataRows = getHistoricalDataRows(ssg);
  const historicalDataCols = getHistoricalDataColumns();

  const forecastDataRows = getForecastDataRows(ssg);
  const forecastDataColumns = getForecastDataColumns();

  const onSSGChange = (changes: CellChange[]) => {
    changes.forEach((change: CellChange) => {
      if (change.type !== "number")
        return;
      
      var idx = change.columnId as number;
      var rowId = change.rowId as string;
      var updatedSSG = { ...ssg };

      switch(rowId) {
        case HistoricalDataRowId.Header:
          updatedSSG.startingYear = change.newCell.value;
          break;
        case HistoricalDataRowId.IncomeTaxRate:
        case ForecastDataRowId.RevenueGrowth:
        case ForecastDataRowId.PreTaxProfitMargin:
        case ForecastDataRowId.IncomeTaxRate:
        case ForecastDataRowId.OutstandingShareGrowth:
          updatedSSG[rowId][idx] = change.newCell.value / 100;
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
      <ReactGrid rows={historicalDataRows} columns={historicalDataCols} onCellsChanged={onSSGChange} />
      <br />
      <ReactGrid rows={forecastDataRows} columns={forecastDataColumns} onCellsChanged={onSSGChange} />
    </div>
  );
};