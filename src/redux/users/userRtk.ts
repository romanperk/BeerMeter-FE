import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from './authSlice';

export const userRtk = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/users/' }),
  endpoints: (builder) => ({
    getUser: builder.query<IUser, string>({
      query: (uid) => `/getUser/${uid}`,
    }),
    createUser: builder.mutation<IUser, { email: string; uid: string }>({
      query: (newUser) => ({
        url: '/createUser',
        method: 'POST',
        body: newUser,
      }),
    }),
    updateUser: builder.mutation<
      IUser,
      { uid: string; firstName: string; lastName: string; favDrink: string }
    >({
      query: (updatedUser) => ({
        url: `/updateUserInfo/${updatedUser.uid}`,
        method: 'PUT',
        body: {
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          favDrink: updatedUser.favDrink,
        },
      }),
    }),
  }),
});

export const { useGetUserQuery, useCreateUserMutation, useUpdateUserMutation } = userRtk;
