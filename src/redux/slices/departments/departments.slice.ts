import { createSlice } from '@reduxjs/toolkit';
import { IDepartments } from '../../../common/types/depaptments';
import { fetchDepartments } from './departments.thunks';

const initialState: IDepartments = {
  departments: [],
  isLoading: false,
};

const departmentsSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDepartments.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDepartments.fulfilled, (state, action) => {
      state.departments = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchDepartments.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const departmentsSliceReducer = departmentsSlice.reducer;
