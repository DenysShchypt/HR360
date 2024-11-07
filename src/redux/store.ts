import { configureStore } from '@reduxjs/toolkit';
import { authSliceReducer } from './slices/auth/auth.slice';
import { departmentsSliceReducer } from './slices/departments/departments.slice';

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    departments: departmentsSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: [
          'payload.headers',
          'payload.config',
          'payload.request',
          'payload.config.transformRequest',
          'payload.config.transformResponse',
        ],
        ignoredPaths: ['auth.token', 'auth.user'],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
