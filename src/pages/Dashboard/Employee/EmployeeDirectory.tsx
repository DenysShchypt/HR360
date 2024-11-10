import React, { FC } from 'react';

import EmployeesTable from '../../../components/EmployeesTable/EmployeesTable';
import EmployeesFilter from '../../../components/EmployeesFilter/EmployeesFilter';
import SwiperDepartments from '../../../components/SwiperDepartments/SwiperDepartments';

const EmployeeDirectory: FC = () => {
  return (
    <>
      <SwiperDepartments />
      <EmployeesFilter />
      <EmployeesTable />
    </>
  );
};

export default EmployeeDirectory;
