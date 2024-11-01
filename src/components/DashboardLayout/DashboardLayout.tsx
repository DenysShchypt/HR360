import React, { FC, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const DashboardLayout: FC = () => {
  return (
    <div className="dashboard_container">
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default DashboardLayout;
