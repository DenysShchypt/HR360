import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import SwiperDepartments from '../../../components/SwiperDepartments/SwiperDepartments';

const Employee: FC = () => {
  return (
    <div>
      <SwiperDepartments />
      <Outlet />
    </div>
  );
};

export default Employee;
