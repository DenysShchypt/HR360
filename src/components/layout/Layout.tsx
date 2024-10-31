import React, { FC, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';

const Layout: FC = () => {
  return (
    <div>
      <Header />
      <Breadcrumbs />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Layout;
