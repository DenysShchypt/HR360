import React, { FC, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import ErrorPage from '../pages/ErrorPage';
import { PrivateRoute } from '../routes/PrivateRouter';
import { PublicRoute } from '../routes/PublicRoute';
import Auth from '../pages/Auth/Auth';
import DashboardLayout from './DashboardLayout/DashboardLayout';
import Dashboard from '../pages/Dashboard/Dashboard';
import { useAppDispatch } from '../utils/hooks/hooks';
import { checkCurrentUser } from '../redux/slices/auth/auth.thunks';

const App: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkCurrentUser());
  }, [dispatch]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/login"
          element={<PublicRoute redirectTo="/dashboard" component={<Auth />} />}
        />
        <Route
          path="/register"
          element={<PublicRoute redirectTo="/dashboard" component={<Auth />} />}
        />
        <Route
          path="/"
          element={
            <PrivateRoute redirectTo="/login" component={<DashboardLayout />} />
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute redirectTo="/login" component={<DashboardLayout />} />
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="employee" element={<Dashboard />}>
            <Route path="directory" element={<h1>Dashboard directory</h1>} />
            <Route path="attendance" element={<h1>Dashboard attendance</h1>} />
            <Route path="requests" element={<h1>Dashboard requests</h1>} />
            <Route path="absence" element={<h1>Dashboard absence</h1>} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
