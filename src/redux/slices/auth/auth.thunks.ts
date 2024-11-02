import { createAsyncThunk } from '@reduxjs/toolkit';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  UserCredential,
  User,
} from 'firebase/auth';
import {
  IFormData,
  IFormDataRegister,
  IPublicUser,
} from '../../../common/types/auth';
import { IError } from '../../../common/types/errors';
import { auth, db } from '../../../common/firebase/firebase';

export const login = createAsyncThunk<
  IPublicUser,
  IFormData,
  { rejectValue: string }
>('auth/login', async (data, { rejectWithValue }) => {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    const user = userCredential.user;

    const docRef = doc(db, 'Users', user.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error('User document does not exist.');
    }

    const userData = docSnap.data() as IPublicUser;
    return userData;
  } catch (error) {
    const typedError = error as IError;
    if (typedError.response?.data?.message) {
      return rejectWithValue(typedError.response.data.message);
    } else if (typedError.message) {
      return rejectWithValue(typedError.message);
    } else {
      return rejectWithValue('An unknown error occurred during login.');
    }
  }
});

export const registerUser = createAsyncThunk<
  IPublicUser,
  IFormDataRegister,
  { rejectValue: string }
>('auth/register', async (data, { rejectWithValue }) => {
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    const user = userCredential.user;
    if (user) {
      await setDoc(doc(db, 'Users', user.uid), {
        email: user.email,
        username: data.username,
      });
    }
    const docRef = doc(db, 'Users', user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const userData = docSnap.data() as IPublicUser;
      return userData;
    } else {
      throw new Error('User document does not exist.');
    }
  } catch (error) {
    const typedError = error as IError;
    if (typedError.response?.data?.message) {
      return rejectWithValue(typedError.response.data.message);
    } else if (typedError.message) {
      return rejectWithValue(typedError.message);
    } else {
      return rejectWithValue('An unknown error occurred during registration.');
    }
  }
});
export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await auth.signOut();
    } catch (error) {
      const typedError = error as IError;
      if (typedError.response?.data?.message) {
        return rejectWithValue(typedError.response.data.message);
      } else if (typedError.message) {
        return rejectWithValue(typedError.message);
      } else {
        return rejectWithValue('An unknown error occurred during logout.');
      }
    }
  }
);

export const checkCurrentUser = createAsyncThunk<
  IPublicUser | null,
  void,
  { rejectValue: string }
>('auth/checkCurrentUser', async (_, { rejectWithValue }) => {
  try {
    const currentUser = await new Promise<User | null>((resolve, reject) => {
      onAuthStateChanged(
        auth,
        (user) => {
          resolve(user);
        },
        (error) => {
          reject(error);
        }
      );
    });

    if (!currentUser) {
      throw new Error('No user is currently logged in.');
    }
    const docRef = doc(db, 'Users', currentUser.uid);
    const docSnap = await getDoc(docRef);
    const userData = docSnap.data() as IPublicUser;

    return userData;
  } catch (error) {
    const typedError = error as IError;
    if (typedError.response?.data?.message) {
      return rejectWithValue(typedError.response.data.message);
    } else if (typedError.message) {
      return rejectWithValue(typedError.message);
    } else {
      return rejectWithValue(
        'An unknown error occurred while checking current user.'
      );
    }
  }
});
