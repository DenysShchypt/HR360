import { Navigate } from 'react-router-dom';

import React, { ReactElement } from 'react';
import { useAuth } from '../utils/hooks/useAuth';

interface PropTypes {
  component: ReactElement;
  redirectTo: string;
}

export const PrivateRoute: React.FC<PropTypes> = ({
  component: Component,
  redirectTo = '/',
}) => {
  const { isLoggedIn, isLoading } = useAuth();
  const shouldRedirect = !isLoggedIn && !isLoading;

  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};
