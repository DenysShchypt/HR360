import React, { FC, useEffect, useMemo } from 'react';

import EmployeesTable from '../../../components/EmployeesTable/EmployeesTable';
import EmployeesFilter from '../../../components/EmployeesFilter/EmployeesFilter';
import SwiperDepartments from '../../../components/SwiperDepartments/SwiperDepartments';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../../utils/hooks/hooks';
import { fetchEmployees } from '../../../redux/slices/employees/employees.thunks';

const EmployeeDirectory: FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useMemo(
    () => Object.fromEntries([...searchParams]),
    [searchParams]
  );
  const { search, department } = params;
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  return (
    <>
      <SwiperDepartments />
      <EmployeesFilter
        setSearchParams={setSearchParams}
        search={search || ''}
        department={department || ''}
      />
      <EmployeesTable search={search || ''} department={department || ''} />
    </>
  );
};

export default EmployeeDirectory;
