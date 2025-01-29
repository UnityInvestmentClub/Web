import './DashboardPage.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, AllCommunityModule, RowClickedEvent } from 'ag-grid-community';
import { FaStar } from 'react-icons/fa';
import { LoadingSpinner, Button } from '@components/';
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
      suppressMovable: true
    },
    { 
      headerName: 'Ticker', 
      field: 'stockTicker', 
      width: 125, 
      filter: true, 
      resizable: false, 
      suppressMovable: true
    },
    {
      headerName: 'Prepared By',
      field: 'preparedBy',
      width: 400,
      filter: true,
      resizable: false,
      suppressMovable: true,
      valueFormatter: params => params.value.map((preparer: Preparer) => `${preparer.firstName} ${preparer.lastName}`).join(', ')
    },
    { 
      headerName: 'Prepared Date', 
      field: 'preparedDate', 
      width: 175, 
      filter: 'agDateColumnFilter', 
      resizable: false, 
      suppressMovable: true 
    },
    { 
      headerName: 'Meeting Date', 
      field: 'meetingDate', 
      width: 175, 
      filter: 'agDateColumnFilter', 
      resizable: false, 
      suppressMovable: true 
    },
    { 
      headerName: 'Zone', 
      field: 'currentPriceZone', 
      width: 125, 
      filter: true, 
      resizable: false, suppressMovable: true 
    },
    {
      headerName: 'Current Price',
      field: 'currentStockPrice',
      width: 175,
      filter: true, 
      resizable: false, 
      suppressMovable: true, 
      valueFormatter: params => `$${params.value.toFixed(2)}` 
    },
    {
      headerName: 'Forecasted Return',
      field: 'fcTotalAnnualReturn',
      width: 175,
      filter: true, 
      resizable: false, 
      suppressMovable: true, 
      valueFormatter: params => params.value[1] ? `${(params.value[1] * 100).toFixed(1)}%` : '' 
    }
  ];

  return isLoading
    ? (<LoadingSpinner />)
    : (<div className='dashboard'>
      <div className='ssg-table'>
        <div className='ssg-create'>
          <Button className='ssg-create-button' onClick={() => navigate('/ssg')}>Create SSG</Button>
        </div>
        <div className='ssg-list'>
          <AgGridReact
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
          />
        </div>
      </div>
    </div>);
};
