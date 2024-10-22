import React, { ReactElement } from 'react';
import { useAuth } from '../utils/hooks/useAuth';
import ErrorPage from '../pages/ErrorPage';

interface PropTypes {
  component: ReactElement;
  roles: string[];
}

export const RolesRoute: React.FC<PropTypes> = ({
  component: Component,
  roles,
}) => {
  const { userRole } = useAuth();
  const canAccess = userRole !== undefined && roles.includes(userRole);

  return canAccess ? Component : <ErrorPage />;
};

export default RolesRoute;
