import React, { FC, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';

const Layout: FC = () => {
  return (
    <div>
      <Sidebar />
      {/* <Headers />  */}
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Layout;
