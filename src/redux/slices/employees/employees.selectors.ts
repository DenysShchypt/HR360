// import { createSelector } from '@reduxjs/toolkit';
// import { IEmployee } from '../../../common/types/employees';

export const selectAllEmployees = (state) => state.employees.employees;
export const selectEmployee = (state) => state.employees.employee;
export const selectIsLoading = (state) => state.employees.isLoading;
export const selectActivities = (state) => state.activity.activities;
// export const selectFilterStatus = (state) => state.filter.status;
// export const selectFilterEmployment = (state) => state.filter.employment;
// export const selectDepartmentsFilter = (state) => state.filter.departments;
