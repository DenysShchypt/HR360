import React, { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '../../utils/hooks/hooks';
import styles from './Auth.module.css';
import { IFormData, IFormDataRegister } from '../../common/types/auth';
import { LoginSchema, RegisterSchema } from '../../utils/yup/authForm';
import SignIn from '../../components/AuthComponent/SignIn/SignIn';
import SignUp from '../../components/AuthComponent/SignUp/SignUp';
import Statistic from '../../components/AuthComponent/Statistic/Statistic';
import { login, registerUser } from '../../redux/slices/auth/auth.thunks';

const Auth: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData | IFormDataRegister>({
    resolver: yupResolver(
      location.pathname === '/login' ? LoginSchema : RegisterSchema
    ),
  });

  const onFormSubmit: SubmitHandler<IFormData | IFormDataRegister> = async (
    data
  ) => {
    if (location.pathname === '/login') {
      try {
        const loginData = data as IFormData;
        dispatch(login(loginData));
        navigate('/dashboard');
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const registerData = data as IFormDataRegister;
        dispatch(registerUser(registerData));
        navigate('/dashboard');
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onFormSubmit)} className={styles.form_wrap}>
        <div>
          {location.pathname === '/login' ? (
            <SignIn
              navigate={navigate}
              register={register}
              errors={errors}
              // loading={loading}
            />
          ) : location.pathname === '/register' ? (
            <SignUp
              navigate={navigate}
              register={register}
              errors={errors}
              // loading={loading}
            />
          ) : null}
        </div>
      </form>
      <Statistic />
    </>
  );
};

export default Auth;
