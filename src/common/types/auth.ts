import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { NavigateFunction } from 'react-router-dom';

export interface IAuthState {
  user: IPublicUser | null;
  isLoading: boolean;
  isLoggedIn: boolean;
}

export interface IPublicUser {
  id: string;
  username?: string;
  email: string;
  photo?: string;
}

export interface IFormData extends FieldValues {
  email: string;
  password: string;
}

export interface IFormDataRegister extends IFormData {
  username: string;
}

export interface IPropsLogin<TFieldValues extends IFormData = IFormData> {
  navigate: NavigateFunction;
  register: UseFormRegister<IFormData>;
  errors: FieldErrors<TFieldValues>;
  //   loading: boolean;
}
export interface IPropsRegister<
  TFieldValues extends IFormDataRegister = IFormDataRegister,
> {
  register: UseFormRegister<IFormDataRegister | IFormData>;
  navigate: NavigateFunction;
  errors: FieldErrors<TFieldValues>;
  //   loading: boolean;
}

export interface IFormData extends FieldValues {
  email: string;
  password: string;
}
