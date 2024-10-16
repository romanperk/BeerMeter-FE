import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  user: IUser | undefined;
  loading: boolean;
  error: boolean | null;
  isLoggedIn: boolean;
}

export interface IUser {
  uid: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  firstSignIn?: string | null;
  favDrink?: string | null;
}

const initialState: AuthState = {
  user: undefined,
  loading: true,
  error: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    login: (state, action) => {
      state.user = {
        uid: action.payload.uid || null,
        email: action.payload.email || null,
      };
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { loginSuccess, loginFailure, logout, login } = authSlice.actions;
export default authSlice.reducer;
