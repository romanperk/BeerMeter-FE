import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from './userSlice';
const base_url = import.meta.env.VITE_BASE_URL;

export const userRtk = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({ baseUrl: `${base_url}/api/users/` }),
  endpoints: (builder) => ({
    getUser: builder.query<IUser, string>({
      query: (userId) => `/getUser/${userId}`,
    }),
    createUser: builder.mutation<IUser, { email: string; userId: string }>({
      query: (newUser) => ({
        url: '/createUser',
        method: 'POST',
        body: newUser,
      }),
    }),
    updateUser: builder.mutation<
      IUser,
      { userId: string; firstName: string; lastName: string; favDrink: string }
    >({
      query: (updatedUser) => ({
        url: `/updateUserInfo/${updatedUser.userId}`,
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
