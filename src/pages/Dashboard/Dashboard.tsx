import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

const Dashboard: FC = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default Dashboard;
