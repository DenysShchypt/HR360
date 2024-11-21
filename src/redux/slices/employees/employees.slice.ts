import { createSlice } from '@reduxjs/toolkit';
import { IEmployees } from '../../../common/types/employees';
import {
  addEmployee,
  fetchEmployee,
  fetchEmployees,
  removeEmployee,
} from './employees.thunks';

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
    const handlePending = (state: typeof initialState) => {
      state.isLoading = true;
    };

    const handleRejected = (state: typeof initialState) => {
      state.isLoading = false;
    };
    builder
      .addCase(fetchEmployees.pending, handlePending)
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, handleRejected)
      .addCase(fetchEmployee.pending, handlePending)
      .addCase(fetchEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employee = action.payload;
      })
      .addCase(fetchEmployee.rejected, handleRejected)
      .addCase(addEmployee.pending, handlePending)
      .addCase(addEmployee.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addEmployee.rejected, handleRejected)
      .addCase(removeEmployee.pending, handlePending)
      .addCase(removeEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employees = state.employees.filter(
          (employee) => employee.id !== action.payload
        );
      })
      .addCase(removeEmployee.rejected, handleRejected);
  },
});

export const employeesSliceReducer = employeesSlice.reducer;
