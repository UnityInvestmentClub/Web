import './BaseSheet.css';
import { ReactGrid, Row, Column, Cell, NumericalRange, CellsLookup, useReactGridAPI } from '@silevis/reactgrid';
import { PropsBase } from '@_types/';
import { PercentFormat } from '@constants/';

interface Props extends PropsBase {
  id: string,
  rows: Row[],
  columns: Column[],
  cells: Cell[],
  stickyLeftColumns?: number
}

export const BaseSheet = ({ id, rows, columns, cells, stickyLeftColumns  }: Props) => {
  var gridAPI = useReactGridAPI(id);

  const onCopy = (
    { clipboardData }: React.ClipboardEvent<HTMLDivElement>,
    { startRowIdx, endRowIdx, startColIdx, endColIdx}: NumericalRange
  ) => {
    var copiedRows: string[] = [];

    for (let rowIdx = startRowIdx; rowIdx < endRowIdx; rowIdx++) {
      var copiedRow: number[] = [];

      for (let colIdx = startColIdx; colIdx < endColIdx; colIdx++){
        const cell = gridAPI.getCellByIndexes(rowIdx, colIdx);

        copiedRow.push(
          cell.props.format === PercentFormat
            ? cell.props.value * 100
            : cell.props.value
        );
      }
      
      copiedRows.push(copiedRow.map((value: number) => !isNaN(value) ? value : '').join('\t'));
    }

    clipboardData.setData('text', copiedRows.join('\n'));

    return true;
  };

  const onPaste = (
    { clipboardData}: React.ClipboardEvent<HTMLDivElement>,
    { startRowIdx, startColIdx}: NumericalRange,
    cellsLookup: CellsLookup
  ) => {
    const copiedText = clipboardData.getData('text');
    const copiedRows = copiedText.split('\n').map((copiedRow: string) => copiedRow.split('\t'));

    if (copiedRows.length === 0 || copiedRows.every((copiedRow: string[]) => copiedRow.length === 0))
      return true;

    copiedRows.forEach((copiedRow: string[], rowIdx: number) => {
      copiedRow.forEach((copiedData: string, colIdx: number) => {
        const formattedValue = copiedData.replace(/[^0-9.-]/g, '');

        cellsLookup
          .get(`${startRowIdx + rowIdx} ${startColIdx + colIdx}`)
          ?.onStringValueReceived(`${formattedValue}`);
      })
    });
  
    gridAPI.setSelectedArea({
      startRowIdx: startRowIdx,
      endRowIdx: Math.min(startRowIdx + copiedRows.length, gridAPI.getRows().length),
      startColIdx: startColIdx,
      endColIdx: Math.min(startColIdx + copiedRows[0].length, gridAPI.getColumns().length)
    });

    return true;
  };

  const indexedCells = cells.map((cell: Cell, idx: number) => ({
    ...cell,
    rowIndex: Math.trunc(idx / columns.length),
    colIndex: idx % columns.length
  }));

  return (
    <div className='base-sheet'>
      <ReactGrid id={id} rows={rows} columns={columns} cells={indexedCells} stickyLeftColumns={stickyLeftColumns} onCopy={onCopy} onPaste={onPaste} moveRightOnEnter disableFillHandle />
    </div>
  );
};