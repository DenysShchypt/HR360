import React, { FC } from 'react';
import { FcGoogle } from 'react-icons/fc';
import styles from './SignInWithGoogle.module.css';
import { useAppDispatch } from '../../../utils/hooks/hooks';
import { registerGoogle } from '../../../redux/slices/auth/auth.thunks';

interface ISignInWithGoogleProp {
  textButton: string;
}

const SignInWithGoogle: FC<ISignInWithGoogleProp> = ({ textButton }) => {
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

export default SignInWithGoogle;
