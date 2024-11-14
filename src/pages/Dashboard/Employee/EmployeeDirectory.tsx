import React, { FC, useEffect } from 'react';

import EmployeesTable from '../../../components/EmployeesTable/EmployeesTable';
import EmployeesFilter from '../../../components/EmployeesFilter/EmployeesFilter';
import SwiperDepartments from '../../../components/SwiperDepartments/SwiperDepartments';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../../utils/hooks/hooks';
import { fetchEmployees } from '../../../redux/slices/employees/employees.thunks';

const EmployeeDirectory: FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams('');
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  return (
    <>
      <SwiperDepartments />
      <EmployeesFilter
        setSearchParams={setSearchParams}
        params={searchParams.get('filters') || ''}
      />
      <EmployeesTable params={searchParams.get('filters') || ''} />
    </>
  );
};

export default EmployeeDirectory;
