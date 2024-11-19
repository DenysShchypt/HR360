import React, { FC, useEffect, useState } from 'react';
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
  () =>
    import('../pages/Dashboard/Employee/EmployeeDirectory/EmployeeDirectory')
);
const EmployeePage = React.lazy(
  () => import('../pages/Dashboard/Employee/Employee')
);
const EmployeeSettings = React.lazy(
  () => import('../pages/Dashboard/Employee/AddEmployee/AddEmployee')
);

const App: FC = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const checkUser = async () => {
      await dispatch(checkCurrentUser());
      setIsLoading(false);
    };

    checkUser();
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
          <Route path="employee" element={<EmployeePage />}>
            <Route path="directory" element={<EmployeeDirectoryPage />} />
            <Route path="attendance" element={<h1></h1>} />
            <Route path="requests" element={<h1></h1>} />
            <Route path="absence" element={<h1></h1>} />
            <Route path="settings" element={<EmployeeSettings />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
