import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  uid: string | null;
  user: IUser;
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string | null;
  firstSignIn: string;
  favDrink: string;
}

const initialState: AuthState = {
  uid: null,
  user: {
    firstName: '',
    lastName: '',
    email: '',
    firstSignIn: '',
    favDrink: '',
  },
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.user.email = action.payload;
    },
    logout: (state) => {
      state.user.email = null;
    },
    updateFirstName: (state, action: PayloadAction<string>) => {
      state.user.firstName = action.payload;
    },
    updateLastName: (state, action: PayloadAction<string>) => {
      state.user.lastName = action.payload;
    },
    setFirstSignIn: (state, action: PayloadAction<string>) => {
      state.user.firstSignIn = action.payload;
    },
    updateFavDrink: (state, action: PayloadAction<string>) => {
      state.user.favDrink = action.payload;
    },
  },
});

export const { login, logout, updateFirstName, updateLastName, setFirstSignIn, updateFavDrink } =
  userSlice.actions;
export default userSlice.reducer;
