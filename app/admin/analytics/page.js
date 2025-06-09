import React from 'react';
import UniqueVisitors from './_components/UniqueVisitors';
import ProjectVisitors from './_components/ProjectVisitors';

const AnalyticsPage = () => {
    return (
        <div className='h-screen p-10'>
          <h2 className='mt-10 text-2xl font-bold'>Analytics</h2>

          <div className='grid grid-cols-1 gap-10 my-10 md:grid-cols-2'>
            <div>
              <UniqueVisitors />
            </div>
            <div>
              <ProjectVisitors />
            </div>
            

          </div>
          
        </div>
    );
};

export default AnalyticsPage;
