import { createSlice } from '@reduxjs/toolkit';

const initialState: UserState = {
  user: undefined,
  loading: true,
  error: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
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
        userId: action.payload.userId || null,
        email: action.payload.email || null,
      };
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = undefined;
    },
  },
});

export const { loginSuccess, loginFailure, logout, login } = userSlice.actions;
export default userSlice.reducer;

interface UserState {
  user: IUser | undefined;
  loading: boolean;
  error: boolean | null;
  isLoggedIn: boolean;
}

export interface IUser {
  userId: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  createdAt?: string | null;
  favDrink?: string | null;
  isNewUser?: boolean;
}

export interface IEmailLayout {
  email: string;
  password: string;
}
