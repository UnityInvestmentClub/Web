import './DashboardPage.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { LoadingSpinner, Button } from '@components/';
import { SSGTable } from '@features/';
import { useSSG } from '@hooks/';
import { SSG } from '@_types/';

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

  return isLoading
    ? (<LoadingSpinner />)
    : (<div className='dashboard'>
      <div className='ssg-table-container'>
        <div className='ssg-create'>
          <Button className='ssg-create-button' onClick={() => navigate('/ssg')}>Create SSG</Button>
        </div>
        
        <SSGTable ssgs={ssgs} />
      </div>
    </div>);
};
