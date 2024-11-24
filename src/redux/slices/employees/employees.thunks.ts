import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IEmployee } from '../../../common/types/employees';
import { IError } from '../../../common/types/errors';

axios.defaults.baseURL = 'https://672cfaadfd8979715640f4b6.mockapi.io';

export const fetchEmployees = createAsyncThunk<
  IEmployee[],
  void,
  { rejectValue: string }
>('employees', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<IEmployee[]>('/employees');
    return response.data;
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
export const fetchEmployee = createAsyncThunk<
  IEmployee,
  string,
  { rejectValue: string }
>('employees/employee', async (id: string, { rejectWithValue }) => {
  try {
    const response = await axios.get<IEmployee>(`/employees/${id}`);
    return response.data;
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

export const addEmployee = createAsyncThunk<
  void,
  IEmployee,
  { rejectValue: string }
>('employees/add', async (body: IEmployee, { rejectWithValue }) => {
  try {
    await axios.post<IEmployee>(`/employees`, body);
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
export const removeEmployee = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('employees/remove', async (id: string, { rejectWithValue }) => {
  try {
    await axios.delete(`/employees/${id}`);
    return id;
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
export const editEmployee = createAsyncThunk<
  { body: IEmployee; id: string },
  { body: IEmployee; id: string },
  { rejectValue: string }
>('employees/edit', async ({ body, id }, { rejectWithValue }) => {
  try {
    const res = await axios.put(`/employees/${id}`, body);
    return { body: res.data, id };
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
