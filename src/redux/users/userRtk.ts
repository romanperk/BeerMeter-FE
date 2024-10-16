import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from './authSlice';

export const userRtk = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
  endpoints: (builder) => ({
    getUser: builder.query<IUser, string>({
      query: (uid) => `users/getUser/${uid}`,
    }),
  }),
});

export const { useGetUserQuery } = userRtk;
