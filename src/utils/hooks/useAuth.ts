import { useAppSelector } from './hooks';
import {
  selectIsLoading,
  selectIsLoggedIn,
  selectUser,
} from '../../redux/slices/auth/auth.selectors';

export const useAuth = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const isLoading = useAppSelector(selectIsLoading);
  const user = useAppSelector(selectUser);

  return {
    isLoggedIn,
    isLoading,
    user,
  };
};
