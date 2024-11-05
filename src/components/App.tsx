import React, { FC, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import ErrorPage from '../pages/ErrorPage';
import { PrivateRoute } from '../routes/PrivateRouter';
import { PublicRoute } from '../routes/PublicRoute';
import DashboardLayout from './DashboardLayout/DashboardLayout';
import { useAppDispatch } from '../utils/hooks/hooks';
import { checkCurrentUser } from '../redux/slices/auth/auth.thunks';

const AuthPage = React.lazy(() => import('../pages/Auth/Auth'));
const DashboardPage = React.lazy(() => import('../pages/Dashboard/Dashboard'));
const EmployeeDirectoryPage = React.lazy(
  () => import('../pages/Dashboard/Employee/EmployeeDirectory')
);

const App: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkCurrentUser());
  }, [dispatch]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/register"
          element={
            <PublicRoute redirectTo="/dashboard" component={<AuthPage />} />
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute redirectTo="/dashboard" component={<AuthPage />} />
          }
        />
        <Route
          path="/"
          element={<PrivateRoute component={<DashboardLayout />} />}
        />
        <Route
          path="/dashboard"
          element={<PrivateRoute component={<DashboardLayout />} />}
        >
          <Route index element={<DashboardPage />} />
          <Route path="employee">
            <Route path="directory" element={<EmployeeDirectoryPage />} />
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
