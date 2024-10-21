import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    email: '',
    username: '',
    id: '',
    roles: [],
    token: localStorage.getItem('token') || '',
    verifyLink: '',
  },
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase('auth/login/fulfilled', (state, action) => {
  //         state.isLoading = false;
  //         state.user = { ...action.payload };
  //       })
  //       .addCase('auth/login/rejected', (state, action) => {
  //         state.isLoading = false;
  //         console.error('Login failed:', action.error.message);
  //       })
  //       .addCase('auth/logout', (state, action) => {
  //         state.user = initialState.user;
  //       });
  //   },
});

export const { setLoading } = authSlice.actions;
export const authSliceReducer = authSlice.reducer;
