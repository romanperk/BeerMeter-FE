import { Dispatch } from '@reduxjs/toolkit';
import { auth } from '../../services/firebase';
import { loginSuccess, loginFailure, logout } from './authSlice';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const login = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      dispatch(loginSuccess(user));
    } catch (error) {
      dispatch(loginFailure(error));
    }
  };
};

export const logoutUser = () => {
  return async (dispatch: Dispatch) => {
    try {
      await signOut(auth);
      dispatch(logout());
    } catch (error) {
      console.error('Logout error: ', error);
    }
  };
};
