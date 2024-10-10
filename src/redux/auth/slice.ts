import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  uid: string | null;
  authenticated: boolean;
}

const initialState: AuthState = {
  uid: null,
  authenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.uid = action.payload;
      state.authenticated = true;
    },
    logout: (state) => {
      state.uid = null;
      state.authenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
