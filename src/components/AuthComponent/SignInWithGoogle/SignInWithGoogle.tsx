import React, { FC } from 'react';
import { FcGoogle } from 'react-icons/fc';
import styles from './SignInwithGoogle.module.css';
import { useAppDispatch } from '../../../utils/hooks/hooks';
import { registerGoogle } from '../../../redux/slices/auth/auth.thunks';

interface ISignInwithGoogleProp {
  textButton: string;
}

const SignInwithGoogle: FC<ISignInwithGoogleProp> = ({ textButton }) => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.button_wrap}>
      <button
        type="button"
        onClick={() => {
          dispatch(registerGoogle());
        }}
        className={styles.button_send_form}
      >
        <FcGoogle size={20} />
        <span className={styles.text}>{textButton}</span>
      </button>
    </div>
  );
};

export default SignInwithGoogle;
