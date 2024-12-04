import { createAsyncThunk } from '@reduxjs/toolkit';
import { IError } from '../../../../common/types/errors';
import { IActivity } from '../../../../common/types/activity';

export const addEmployeeActivity = createAsyncThunk<
  IActivity,
  IActivity,
  { rejectValue: string }
>('activity/add', async (body: IActivity, { rejectWithValue }) => {
  try {
    return body;
  } catch (error) {
    const typedError = error as IError;
    if (typedError.response?.data?.message) {
      return rejectWithValue(typedError.response.data.message);
    } else if (typedError.message) {
      return rejectWithValue(typedError.message);
    } else {
      return rejectWithValue('An unknown error occurred.');
    }
  }
});
// export const removeEmployeeActivity = createAsyncThunk<
//   IActivity,
//   IActivity,
//   { rejectValue: string }
// >('activity/remove', async (body: IActivity, { rejectWithValue }) => {
//   try {
//     return body;
//   } catch (error) {
//     const typedError = error as IError;
//     if (typedError.response?.data?.message) {
//       return rejectWithValue(typedError.response.data.message);
//     } else if (typedError.message) {
//       return rejectWithValue(typedError.message);
//     } else {
//       return rejectWithValue('An unknown error occurred.');
//     }
//   }
// });
// export const editEmployeeActivity = createAsyncThunk<
//   IActivity,
//   IActivity,
//   { rejectValue: string }
// >('activity/edit', async (body: IActivity, { rejectWithValue }) => {
//   try {
//     return body;
//   } catch (error) {
//     const typedError = error as IError;
//     if (typedError.response?.data?.message) {
//       return rejectWithValue(typedError.response.data.message);
//     } else if (typedError.message) {
//       return rejectWithValue(typedError.message);
//     } else {
//       return rejectWithValue('An unknown error occurred.');
//     }
//   }
// });
