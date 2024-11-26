import { createSlice } from '@reduxjs/toolkit';
import { addEmployeeActivity } from './activity.thunks';
import { IActivity } from '../../../../common/types/activity';
interface ActivityState {
  activities: IActivity[];
  isLoading: boolean;
}
const activitySlice = createSlice({
  name: 'activity',
  initialState: {
    activities: [],
    isLoading: false,
  } as ActivityState,
  reducers: {},
  extraReducers: (builder) => {
    const handlePending = (state: { isLoading: boolean }) => {
      state.isLoading = true;
    };
    const handleRejected = (state: { isLoading: boolean }) => {
      state.isLoading = false;
    };
    builder
      .addCase(addEmployeeActivity.pending, handlePending)
      .addCase(addEmployeeActivity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activities.push(action.payload);
      })
      .addCase(addEmployeeActivity.rejected, handleRejected);
    // .addCase(editEmployeeActivity.pending, handlePending)
    // .addCase(editEmployeeActivity.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.activities.push(action.payload);
    // })
    // .addCase(editEmployeeActivity.rejected, handleRejected)
    // .addCase(removeEmployeeActivity.pending, handlePending)
    // .addCase(removeEmployeeActivity.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.activities.push(action.payload);
    // })
    // .addCase(removeEmployeeActivity.rejected, handleRejected);
  },
});

export const activitySliceReducer = activitySlice.reducer;
