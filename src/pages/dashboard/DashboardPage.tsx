import './DashboardPage.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useSSG } from '@hooks/';
import { SSG } from '@_types/';

export const DashboardPage = () => {
  const [ssgs, setSSGs] = useState([] as SSG[]);
  const [_, navigate] = useLocation();
  const { getSSGs } = useSSG();

  useEffect(() => {
    const loadData = async () => {
      try {
        setSSGs(await getSSGs());
      } catch (e) {
        console.error(e);
      }
    }
    
    loadData();
  }, [getSSGs]);

  const SSGList = () => {
    var ssgListRows = ssgs.map((ssg: SSG) => {
      return <div className='ssg-list-row' onClick={() => navigate(`/ssg/${ssg.id}`)} key={ssg.id}>
        <div className='ssg-list-cell'>{ssg.name}</div>
        <div className='ssg-list-cell'>{ssg.stockTicker}</div>
        <div className='ssg-list-cell'>{ssg.preparedBy.map(preparer => `${preparer.firstName} ${preparer.lastName}`).join(', ')}</div>
        <div className='ssg-list-cell'>{ssg.preparedDate}</div>
      </div>
    });
    
    return (
      <div className='ssg-list'>
        <div className='ssg-list-header'>
          <div className='ssg-list-cell'>Name</div>
          <div className='ssg-list-cell'>Stock Ticker</div>
          <div className='ssg-list-cell'>Prepared By</div>
          <div className='ssg-list-cell'>Prepared Date</div>
        </div>
        {ssgListRows}
      </div>
    );
  };

  return (
    <div className='dashboard'>
      <SSGList />
      <div className='ssg-new'>
        <button className='ssg-new-button' onClick={() => navigate(`/ssg`)}>Create New SSG</button>
      </div>
    </div>
  );
};
