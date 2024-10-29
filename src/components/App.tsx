import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import ErrorPage from '../pages/ErrorPage';
import { PrivateRoute } from '../routes/PrivateRouter';
import { PublicRoute } from '../routes/PublicRoute';
import { RolesRoute } from '../routes/RolesRoute';
import Auth from '../pages/Auth/Auth';

const App: FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute
            redirectTo="login"
            component={<Navigate to="/staff" />}
          />
        }
      />

      <Route path="/staff" element={<Layout />}>
        <Route index element={<Navigate to="hr" />} />
        <Route
          path="hr"
          element={
            <RolesRoute component={<h1>HR Dashboard</h1>} roles={['HR']} />
          }
        />
        <Route
          path="employees"
          element={
            <RolesRoute
              component={<h1>Employee Dashboard</h1>}
              roles={['HR', 'Admin', 'Employee']}
            />
          }
        />
        <Route
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
        />
      </Route>

      <Route
        path="/login"
        element={<PublicRoute redirectTo="/" component={<Auth />} />}
      />
      <Route
        path="/register"
        element={<PublicRoute redirectTo="/" component={<Auth />} />}
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
