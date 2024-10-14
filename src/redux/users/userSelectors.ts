import { RootState } from '../store';

export const getUser = (state: RootState) => state.auth.user;
export const getUserEmail = (state: RootState) => state.auth.user.email;
export const getUserFirstName = (state: RootState) => state.auth.user.firstName;
export const getUserLastName = (state: RootState) => state.auth.user.lastName;
