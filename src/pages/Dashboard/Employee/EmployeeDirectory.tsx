import React, { FC, useEffect, useMemo } from 'react';
import EmployeesTable from '../../../components/EmployeesTable/EmployeesTable';
import EmployeesFilter from '../../../components/EmployeesFilter/EmployeesFilter';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../../utils/hooks/hooks';
import { fetchEmployees } from '../../../redux/slices/employees/employees.thunks';

const EmployeeDirectory: FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useMemo(() => {
    const entries = Object.fromEntries([...searchParams]);
    return {
      ...entries,
      status: searchParams.getAll('status'),
      employment: searchParams.getAll('employment'),
    };
  }, [searchParams]) as {
    search?: string;
    department?: string;
    status: string[];
    employment: string[];
  };

  const { search, department, status, employment } = params;
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  return (
    <>
      <EmployeesFilter
        setSearchParams={setSearchParams}
        search={search || ''}
        department={department || ''}
        status={status || []}
        employment={employment || []}
      />
      <EmployeesTable
        search={search || ''}
        department={department || ''}
        status={status || []}
        employment={employment || []}
      />
    </>
  );
};

export default EmployeeDirectory;
