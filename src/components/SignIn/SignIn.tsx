import React, { FC } from 'react';
import { IPropsLogin } from '../../common/types/auth';
import styles from './SignUp.module.css';
import { IoMailOpenOutline } from 'react-icons/io5';
import { GoLock } from 'react-icons/go';
import { VscSignIn } from 'react-icons/vsc';

const SignIn: FC<IPropsLogin> = (props: IPropsLogin) => {
  const {
    navigate,
    register,
    errors,
    // loading
  } = props;
  return (
    <>
      <div className={styles.inputs_wrap}>
        <div>
          <label className={styles.input_wrap}>
            <IoMailOpenOutline size={20} />
            <input
              className={styles.input_field}
              type="email"
              autoComplete="on"
              placeholder="EMAIL"
              {...register('email', {
                required: 'Enter your email',
              })}
            />
          </label>
          {errors.email && (
            <p className={styles.error_message}>{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className={styles.input_wrap}>
            <GoLock size={20} />
            <input
              className={styles.input_field}
              type="password"
              placeholder="PASSWORD"
              autoComplete="on"
              {...register('password', {
                required: 'Enter your password',
              })}
            />
          </label>
          {errors.password && (
            <p className={styles.error_message}>{errors.password.message}</p>
          )}
        </div>
      </div>
      <button type="submit" className={styles.button_send_form}>
        LOGIN
      </button>
      <div className={styles.forgot_password_wrap}>
        <button type="button" className={styles.auxiliary_button}>
          Forgot Password?
        </button>
        <div className={styles.register_wrap}>
          <VscSignIn size={20} />
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              navigate('/register');
            }}
            className={styles.auxiliary_button}
          >
            Register
          </button>
        </div>
      </div>
    </>
  );
};

export default SignIn;
