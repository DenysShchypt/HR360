import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';

const Layout: FC = () => {
  return (
    <div>
      <Sidebar />
      {/* <Headers />  */}
      <Outlet />
    </div>
  );
};

export default Layout;
