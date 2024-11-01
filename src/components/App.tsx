import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import ErrorPage from '../pages/ErrorPage';
import { PrivateRoute } from '../routes/PrivateRouter';
import { PublicRoute } from '../routes/PublicRoute';
// import { RolesRoute } from '../routes/RolesRoute';
import Auth from '../pages/Auth/Auth';
import DashboardLayout from './DashboardLayout/DashboardLayout';
import Dashboard from '../pages/Dashboard/Dashboard';

const App: FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/login"
          element={<PublicRoute redirectTo="/" component={<Auth />} />}
        />
        <Route
          path="/register"
          element={<PublicRoute redirectTo="/" component={<Auth />} />}
        />
        <Route
          path="/"
          element={
            <PrivateRoute
              redirectTo="/login"
              component={<Navigate to="/dashboard" />}
            />
          }
        />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="employee" element={<Dashboard />}>
            <Route path="directory" element={<h1>Dashboard directory</h1>} />
            <Route path="attendance" element={<h1>Dashboard attendance</h1>} />
            <Route path="requests" element={<h1>Dashboard requests</h1>} />
            <Route path="absence" element={<h1>Dashboard absence</h1>} />
          </Route>
          {/* <Route
            path="employees"
            element={
              <RolesRoute
                component={<Dashboard />}
                roles={['HR', 'Admin', 'Employee']}
              />
            }
          /> */}
          {/* <Route
            path="trainees"
            element={
              <RolesRoute
                component={<h1>Dashboard Trainee</h1>}
                roles={['HR', 'Admin', 'Trainee']}
              />
            }
          />
          <Route
            path="admin"
            element={
              <RolesRoute
                component={<h1>Dashboard Admin</h1>}
                roles={['Admin']}
              />
            }
          /> */}
        </Route>
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
