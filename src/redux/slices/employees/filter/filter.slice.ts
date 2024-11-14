import { createSlice } from '@reduxjs/toolkit';
import { IFilter } from '../../../../common/types/employees';

const initialState: IFilter = {
  filter: [],
  departments: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    statusFilter: (state, action) => {
      state.filter = action.payload;
    },
    departmentsFilter: (state, action) => {
      state.departments = action.payload;
    },
  },
});

export const { statusFilter, departmentsFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
