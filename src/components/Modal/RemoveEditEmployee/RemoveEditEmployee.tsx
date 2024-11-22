import React, { FC, useEffect, useMemo } from 'react';
import styles from './RemoveEditEmployee.module.css';
import EmployeesFilter from '../../EmployeesFilter/EmployeesFilter';
import { useSearchParams } from 'react-router-dom';
import { fetchEmployees } from '../../../redux/slices/employees/employees.thunks';
import { useAppDispatch } from '../../../utils/hooks/hooks';
import EmployeesTable from '../../EmployeesTable/EmployeesTable';

const RemoveEditEmployee: FC = () => {
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

  const { search, department } = params;
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  return (
    <div className={styles.modal_wrap}>
      <EmployeesFilter
        setSearchParams={setSearchParams}
        search={search || ''}
        department={department || ''}
        settings
      />
      <EmployeesTable
        search={search || ''}
        department={department || ''}
        settings
      />
    </div>
  );
};

export default RemoveEditEmployee;
