import { createSelector } from '@reduxjs/toolkit';

export const selectAllEmployees = (state) => state.employees.employees;
export const selectEmployee = (state) => state.employees.employee;
export const selectIsLoading = (state) => state.employees.isLoading;
export const selectFilter = (state) => state.filter.filter;

export const selectVisibleEmployees = createSelector(
  [selectAllEmployees, selectFilter],
  (employees, employeeFilter) => {
    return employees.filter((employee) => {
      if (employeeFilter.trim() === '') {
        return employee;
      }
      return (
        employee.name.toLowerCase().includes(employeeFilter.toLowerCase()) ||
        employee.role.toLowerCase().includes(employeeFilter.toLowerCase())
      );
    });
  }
);
