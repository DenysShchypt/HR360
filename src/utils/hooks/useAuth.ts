import { useAppSelector } from './hooks';
import {
  selectIsLoading,
  selectIsLoggedIn,
  selectUser,
  selectUserRole,
} from '../../redux/slices/auth/auth.selectors';

export const useAuth = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const isLoading = useAppSelector(selectIsLoading);
  const user = useAppSelector(selectUser);
  const userRole = useAppSelector(selectUserRole);

  return {
    isLoggedIn,
    isLoading,
    user,
    userRole,
  };
};
