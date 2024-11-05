import { createSlice } from '@reduxjs/toolkit';
import {
  checkCurrentUser,
  login,
  logout,
  registerGoogle,
  registerUser,
} from './auth.thunks';
import { IAuthState } from '../../../common/types/auth';

const initialState: IAuthState = {
  user: {
    email: '',
    username: '',
    uid: '',
    photo: '',
  },
  isLoading: false,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, () => {
        return initialState;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(checkCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkCurrentUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(checkCurrentUser.rejected, (state) => {
        state.user = null;
        state.isLoading = false;
      })
      .addCase(registerGoogle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(registerGoogle.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const authSliceReducer = authSlice.reducer;
