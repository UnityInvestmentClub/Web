import './DashboardPage.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ClientSideRowModelModule, PaginationModule, TextFilterModule, DateFilterModule, RowClickedEvent } from 'ag-grid-community';
import { LoadingSpinner } from '@components/';
import { useSSG } from '@hooks/';
import { Preparer, SSG } from '@_types/';

export const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [ssgs, setSSGs] = useState([] as SSG[]);

  const { getSSGs } = useSSG();
  
  const [_, navigate] = useLocation();

  useEffect(() => {
    const loadData = async () => {
      try {
        setSSGs(await getSSGs());

        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    }
    
    loadData();
  }, [getSSGs]);

  const columns: ColDef[] = [
    { headerName: 'Name', field: 'name', width: 250, filter: true, resizable: false, suppressMovable: true },
    { headerName: 'Ticker', field: 'stockTicker', width: 150, filter: true, resizable: false, suppressMovable: true },
    {
      headerName: 'Prepared By',
      field: 'preparedBy',
      width: 400,
      filter: true,
      resizable: false,
      suppressMovable: true,
      valueFormatter: params => params.value.map((preparer: Preparer) => `${preparer.firstName} ${preparer.lastName}`).join(', ')
    },
    { headerName: 'Prepared Date', field: 'preparedDate', width: 298, filter: 'agDateColumnFilter', resizable: false, suppressMovable: true }
  ];

  return isLoading
    ? (<LoadingSpinner />)
    : (<div className='dashboard'>
      <div className='ssg-table'>
        <div className='ssg-create'>
          <button className='ssg-create-button' onClick={() => navigate(`/ssg`)}>Create SSG</button>
        </div>
        <div className='ssg-list'>
          <AgGridReact
            rowData={ssgs}
            columnDefs={columns}
            modules={[ClientSideRowModelModule, PaginationModule, TextFilterModule, DateFilterModule]}
            domLayout='autoHeight'
            pagination
            paginationPageSize={100}
            paginationPageSizeSelector={[100, 250, 500]}
            onRowClicked={({ data: ssg }: RowClickedEvent) => navigate(`/ssg/${ssg.id}`)}
          />
        </div>
      </div>
    </div>);
};
