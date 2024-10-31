import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';

const DashboardLayout: FC = () => {
  return (
    <div className="dashboard_container">
      <Breadcrumbs />
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
