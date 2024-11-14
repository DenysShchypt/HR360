import { createSelector } from '@reduxjs/toolkit';
import { IEmployee } from '../../../common/types/employees';

export const selectAllEmployees = (state) => state.employees.employees;
export const selectEmployee = (state) => state.employees.employee;
export const selectIsLoading = (state) => state.employees.isLoading;
export const selectFilter = (state) => state.filter.filter;
export const selectDepartmentsFilter = (state) => state.filter.departments;

export const selectVisibleEmployees = createSelector(
  [selectAllEmployees, selectDepartmentsFilter, selectFilter],
  (employees, departmentsFilter) => {
    return employees.filter((employee: IEmployee) => {
      const matchesDepartment =
        !departmentsFilter || employee.department === departmentsFilter;
      return matchesDepartment;
    });
  }
);
