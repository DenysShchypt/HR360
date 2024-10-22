import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import ErrorPage from '../pages/ErrorPage';
import { PrivateRoute } from '../routes/PrivateRouter';

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
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
          <Route element={<Layout />} />
          <Route
            path="/login"
            element={<PublicRoute redirectTo="/" component={<SignInPage />} />}
          />
          <Route
            path="/register"
            element={<PublicRoute redirectTo="/" component={<SignUpPage />} />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
