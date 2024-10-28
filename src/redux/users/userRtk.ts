import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { IUser } from './userSlice';
import supabase from '../../services/supabase';
const base_url = import.meta.env.VITE_BASE_URL;

const baseQueryWithAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args: string | FetchArgs,
  api,
  extraOptions
) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session ? session.access_token : null;

  const baseQuery = fetchBaseQuery({
    baseUrl: `${base_url}/api/users/`,
    prepareHeaders: (headers) => {
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });

  return baseQuery(args, api, extraOptions);
};

export const userRtk = createApi({
  reducerPath: 'users',
  baseQuery: baseQueryWithAuth,
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
