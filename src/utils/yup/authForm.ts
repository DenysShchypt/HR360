import * as yup from 'yup';
import AppError from '../errors/errors';

export interface ILoginFormValues {
  email: string;
  password: string;
}

export interface IRegisterFormValues {
  username: string;
  email: string;
  password: string;
}

const LoginSchema: yup.ObjectSchema<ILoginFormValues> = yup.object().shape({
  email: yup
    .string()
    .email('Email must be valid')
    .required(AppError.Required_email),
  password: yup
    .string()
    .min(6, AppError.Min_length_password)
    .required(AppError.Required_password),
  // .matches(
  //   /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!@#$%&?]{6,20}$/,
  //   AppError.Wrong_password
  // ),
});

const RegisterSchema: yup.ObjectSchema<IRegisterFormValues> = yup
  .object()
  .shape({
    username: yup.string().required(AppError.Required_firstName),
    email: yup
      .string()
      .email(AppError.Wrong_email)
      .required(AppError.Required_email),
    password: yup
      .string()
      .min(6, AppError.Min_length_password)
      .required(AppError.Required_password),
    // .matches(
    //   /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!@#$%&?]{6,20}$/,
    //   AppError.Wrong_password
    // ),
  });

export { LoginSchema, RegisterSchema };
