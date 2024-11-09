import { createSlice } from '@reduxjs/toolkit';
import { IFilter } from '../../../../common/types/employees';

const initialState: IFilter = {
  filter: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    statusFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { statusFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
