import React from 'react';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const Layout: FC = () => {
  return (
    <div>
      {/* <Sidebar />
      <Headers /> */}
      <Outlet />
    </div>
  );
};

export default Layout;
