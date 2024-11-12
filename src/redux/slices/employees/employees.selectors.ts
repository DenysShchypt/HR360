import { createSelector } from '@reduxjs/toolkit';

export const selectAllEmployees = (state) => state.employees.employees;
export const selectEmployee = (state) => state.employees.employee;
export const selectIsLoading = (state) => state.employees.isLoading;
export const selectFilter = (state) => state.filter.filter;
export const selectDepartmentsFilter = (state) => state.filter.departments;

export const selectVisibleEmployees = createSelector(
  [selectAllEmployees, selectFilter, selectDepartmentsFilter],
  (employees, employeeFilter, departmentsFilter) => {
    const lowerCaseEmployeeFilter = employeeFilter.trim().toLowerCase();

    return employees.filter((employee) => {
      const matchesDepartment =
        !departmentsFilter || employee.department === departmentsFilter;

      const matchesEmployeeFilter =
        lowerCaseEmployeeFilter === '' ||
        employee.name.toLowerCase().includes(lowerCaseEmployeeFilter) ||
        employee.role.toLowerCase().includes(lowerCaseEmployeeFilter);

      return matchesDepartment && matchesEmployeeFilter;
    });
  }
);
