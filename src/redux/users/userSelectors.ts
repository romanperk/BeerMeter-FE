import { RootState } from '../store';

export const getUser = (state: RootState) => state.auth.user;
export const getUserUid = (state: RootState) => state.auth.user?.uid;
export const getUserFirstName = (state: RootState) => state.auth.user?.firstName;
export const getUserLastName = (state: RootState) => state.auth.user?.lastName;
