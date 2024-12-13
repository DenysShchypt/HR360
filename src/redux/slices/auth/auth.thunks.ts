import { createAsyncThunk } from '@reduxjs/toolkit';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {
  // createUserWithEmailAndPassword,
  onAuthStateChanged,
  // signInWithEmailAndPassword,
  // UserCredential,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth';
import {
  IFormData,
  IFormDataRegister,
  IPublicUser,
} from '../../../common/types/auth';
import { IError } from '../../../common/types/errors';
import { auth, db } from '../../../common/firebase/firebase';
import { instance } from '../../../common/axios';

export const registerUser = createAsyncThunk<
  IPublicUser,
  IFormDataRegister,
  { rejectValue: string }
>('auth/register', async (data: IFormDataRegister, { rejectWithValue }) => {
  try {
    const resRegisterUser = await instance.post('auth/register', data);
    localStorage.setItem('token', resRegisterUser.data.tokens.token);
    return resRegisterUser.data;
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
export const login = createAsyncThunk<
  IPublicUser,
  IFormData,
  { rejectValue: string }
>('auth/login', async (data: IFormData, { rejectWithValue }) => {
  try {
    const resRegisterUser = await instance.post('auth/login', data);
    localStorage.setItem('token', resRegisterUser.data.tokens.token);
    return resRegisterUser.data;
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

// export const registerUser = createAsyncThunk<
//   IPublicUser,
//   IFormDataRegister,
//   { rejectValue: string }
// >('auth/register', async (data, { rejectWithValue }) => {
//   try {
//     const userCredential: UserCredential = await createUserWithEmailAndPassword(
//       auth,
//       data.email,
//       data.password
//     );
//     const user = userCredential.user;
//     if (user) {
//       await setDoc(doc(db, 'Users', user.uid), {
//         email: user.email,
//         username: data.username,
//       });
//     }
//     const docRef = doc(db, 'Users', user.uid);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       const userData = docSnap.data() as IPublicUser;
//       return userData;
//     } else {
//       throw new Error('User document does not exist.');
//     }
//   } catch (error) {
//     const typedError = error as IError;
//     if (typedError.response?.data?.message) {
//       return rejectWithValue(typedError.response.data.message);
//     } else if (typedError.message) {
//       return rejectWithValue(typedError.message);
//     } else {
//       return rejectWithValue('An unknown error occurred during registration.');
//     }
//   }
// });
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

export const registerGoogle = createAsyncThunk<
  IPublicUser | null,
  void,
  { rejectValue: string }
>('auth/registerGoogle', async (_, { rejectWithValue }) => {
  try {
    const provider = new GoogleAuthProvider();
    let result;

    result = await getRedirectResult(auth);
    if (!result) {
      try {
        result = await signInWithPopup(auth, provider);
      } catch (popupError) {
        if (popupError.message.includes('popup-closed-by-user')) {
          await signInWithRedirect(auth, provider);
          return null;
        } else {
          throw popupError;
        }
      }
    }

    if (result && result.user) {
      const user = result.user;

      await setDoc(doc(db, 'Users', user.uid), {
        email: user.email || '',
        username: user.displayName || '',
        photo: user.photoURL || '',
      });

      const docRef = doc(db, 'Users', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data() as IPublicUser;
        return userData;
      } else {
        throw new Error('User data could not be retrieved from Firestore');
      }
    }

    return null;
  } catch (error) {
    const typedError = error as IError;

    if (typedError.response?.data?.message) {
      return rejectWithValue(typedError.response.data.message);
    } else if (typedError.message) {
      return rejectWithValue(typedError.message);
    } else {
      return rejectWithValue(
        'An unknown error occurred while registering with Google.'
      );
    }
  }
});

// import { setLogLevel } from 'firebase/app';
// setLogLevel('debug');

// export const login = createAsyncThunk<
//   IPublicUser,
//   IFormData,
//   { rejectValue: string }
// >('auth/login', async (data, { rejectWithValue }) => {
//   try {
//     const userCredential: UserCredential = await signInWithEmailAndPassword(
//       auth,
//       data.email,
//       data.password
//     );
//     const user = userCredential.user;

//     const docRef = doc(db, 'Users', user.uid);
//     const docSnap = await getDoc(docRef);

//     if (!docSnap.exists()) {
//       throw new Error('User document does not exist.');
//     }

//     const userData = docSnap.data() as IPublicUser;
//     return userData;
//   } catch (error) {
//     const typedError = error as IError;
//     if (typedError.response?.data?.message) {
//       return rejectWithValue(typedError.response.data.message);
//     } else if (typedError.message) {
//       return rejectWithValue(typedError.message);
//     } else {
//       return rejectWithValue('An unknown error occurred during login.');
//     }
//   }
// });
