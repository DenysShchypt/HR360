import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IDepartment } from '../../../common/types/depaptments';
import { IError } from '../../../common/types/errors';

axios.defaults.baseURL = 'https://672cfaadfd8979715640f4b6.mockapi.io';

export const fetchDepartments = createAsyncThunk<
  IDepartment[],
  void,
  { rejectValue: string }
>('departments', async (_, { rejectWithValue }) => {
  try {
    const data = await axios.get('/departments');
    return data.data;
  } catch (error) {
    const typedError = error as IError;
    if (typedError.response?.data?.message) {
      return rejectWithValue(typedError.response.data.message);
    } else if (typedError.message) {
      return rejectWithValue(typedError.message);
    } else {
      return rejectWithValue('An unknown error from backend server');
    }
  }
});
