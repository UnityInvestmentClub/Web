import './SSGTable.css';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, AllCommunityModule, RowClickedEvent, StateUpdatedEvent, GridState } from 'ag-grid-community';
import { FaStar } from 'react-icons/fa';
import { useLocation } from 'wouter';
import { getDateWithLocalTimeZone } from '@utils/';
import { Preparer, SSG, PropsBase } from '@_types/';

interface Props extends PropsBase {
  ssgs: SSG[]
}

export const SSGTable = ({ ssgs, className = '' }: Props) => {
  const [_, navigate] = useLocation();

  const getTableState = () => {
    return JSON.parse(localStorage.getItem('table-state')) ?? {};
  }

  const storeTableState = (state: GridState) => {
    localStorage.setItem('table-state', JSON.stringify(state));
  };

  const columns: ColDef[] = [
    { 
      headerName: 'Presented', 
      field: 'isPresentedVersion', 
      width: 125, 
      sortable: false, 
      filter: true, 
      resizable: false, 
      suppressMovable: true,
      cellRenderer: (params: { value: boolean }) => params.value ? <FaStar className='star-icon' /> : ''
    },
    { 
      headerName: 'Name', 
      field: 'name', 
      width: 200, 
      filter: true, 
      resizable: false, 
      suppressMovable: true,
      comparator: (a: string, b: string) => {
        if (a.toUpperCase() === b.toUpperCase()) return 0;
        
        return (a.toUpperCase() > b.toUpperCase()) ? 1 : -1;
      }
    },
    { 
      headerName: 'Ticker', 
      field: 'stockTicker', 
      width: 125, 
      filter: true, 
      resizable: false, 
      suppressMovable: true,
      valueFormatter: (params: { value: string }) => params.value.toUpperCase(),
      comparator: (a: string, b: string) => {
        if (a.toUpperCase() === b.toUpperCase()) return 0;
        
        return (a.toUpperCase() > b.toUpperCase()) ? 1 : -1;
      }
    },
    { 
      headerName: 'Zone', 
      field: 'currentPriceZone', 
      width: 125, 
      filter: true, 
      resizable: false, suppressMovable: true 
    },
    {
      headerName: 'Reported Price',
      field: 'currentStockPrice',
      width: 200,
      filter: true, 
      resizable: false, 
      suppressMovable: true,
      valueFormatter: (params: { value: number }) => `$${params.value.toFixed(2)}`
    },
    {
      headerName: 'Forecasted Return',
      field: 'fcTotalAnnualReturn',
      width: 200,
      filter: 'agNumberColumnFilter', 
      resizable: false, 
      suppressMovable: true,
      valueFormatter: (params: { value: number[] }) => params.value[1] ? `${(params.value[1] * 100).toFixed(1)}%` : '',
      comparator: (a: number[], b: number[]) => {
        if (a[1] === b[1]) return 0;
        if (Number.isNaN(a[1])) return -1;
        if (Number.isNaN(b[1])) return 1;
        
        return (a[1] > b[1]) ? 1 : -1;
      }
    },
    { 
      headerName: 'Prepared Date', 
      field: 'preparedDate', 
      width: 175, 
      filter: 'agDateColumnFilter', 
      resizable: false, 
      suppressMovable: true,
      valueFormatter: (params: { value: string}) => {
        var date = getDateWithLocalTimeZone(params.value);

        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
      }
    },
    { 
      headerName: 'Meeting Date', 
      field: 'meetingDate', 
      width: 175, 
      filter: 'agDateColumnFilter', 
      resizable: false, 
      suppressMovable: true,
      valueFormatter: (params: { value: string}) => {
        var date = getDateWithLocalTimeZone(params.value);
        
        if (!params.value) return '';

        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
      }
    },
    {
      headerName: 'Prepared By',
      field: 'preparedBy',
      width: 400,
      filter: true,
      resizable: false,
      suppressMovable: true,
      valueFormatter: (params: { value: Preparer[] }) => params.value.map((preparer: Preparer) => `${preparer.firstName} ${preparer.lastName}`).join(', ')
    }
  ];

  return (
    <div className={`ssg-table ${className}`}>
      <AgGridReact
        initialState={getTableState()}
        rowData={ssgs}
        columnDefs={columns}
        modules={[AllCommunityModule]}
        domLayout='autoHeight'
        pagination
        paginationPageSize={20}
        paginationPageSizeSelector={[20, 100, 250]}
        suppressCellFocus={true}
        suppressColumnVirtualisation={true}
        onRowClicked={({ data: ssg }: RowClickedEvent) => navigate(`/ssg/${ssg.id}`)}
        onStateUpdated={({ state }: StateUpdatedEvent) => storeTableState(state)}
      />
    </div>
  );
};