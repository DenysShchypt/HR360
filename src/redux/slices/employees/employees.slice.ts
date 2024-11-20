import { createSlice } from '@reduxjs/toolkit';
import { IEmployees } from '../../../common/types/employees';
import { addEmployee, fetchEmployee, fetchEmployees } from './employees.thunks';

const initialState: IEmployees = {
  employees: [],
  employee: null,
  isLoading: false,
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchEmployee.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employee = action.payload;
      })
      .addCase(fetchEmployee.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addEmployee.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employee = action.payload;
      })
      .addCase(addEmployee.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const employeesSliceReducer = employeesSlice.reducer;
