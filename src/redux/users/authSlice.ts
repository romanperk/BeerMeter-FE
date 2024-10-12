import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  uid: string | null;
  user: IUser;
}

interface IUser {
  firstName: string;
  lastName: string;
}

const initialState: AuthState = {
  uid: null,
  user: {
    firstName: '',
    lastName: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.uid = action.payload;
    },
    logout: (state) => {
      state.uid = null;
    },
    updateUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
