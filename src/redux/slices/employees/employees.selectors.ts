import { createSelector } from '@reduxjs/toolkit';
import { IEmployee } from '../../../common/types/employees';

export const selectAllEmployees = (state) => state.employees.employees;
export const selectEmployee = (state) => state.employees.employee;
export const selectIsLoading = (state) => state.employees.isLoading;
export const selectFilterStatus = (state) => state.filter.status;
export const selectFilterEmployment = (state) => state.filter.employment;
export const selectDepartmentsFilter = (state) => state.filter.departments;

export const selectVisibleEmployees = createSelector(
  [
    selectAllEmployees,
    selectDepartmentsFilter,
    selectFilterStatus,
    selectFilterEmployment,
  ],
  (employees, departmentsFilter, filterStatus, filterEmployment) => {
    return employees.filter((employee: IEmployee) => {
      const matchesStatus =
        filterStatus.length === 0 || filterStatus.includes(employee.status);

      const matchesEmployment =
        filterEmployment.length === 0 ||
        filterEmployment.includes(employee.employment);

      const matchesDepartment =
        !departmentsFilter || employee.department === departmentsFilter;
      return matchesDepartment && matchesStatus && matchesEmployment;
    });
  }
);
