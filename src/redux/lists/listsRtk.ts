import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { IList } from './listsSlice';
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
    baseUrl: `${base_url}/api/lists/`,
    prepareHeaders: (headers) => {
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });

  return baseQuery(args, api, extraOptions);
};

export const listsRtk = createApi({
  reducerPath: 'lists',
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getLists: builder.query({
      query: (userId) => `/${userId}`,
    }),
    getList: builder.query({
      query: ({ listId, userId }) => {
        return `getList/${listId}?userId=${userId}`;
      },
    }),
    createList: builder.mutation<IList, { place: string; type: string; userId: string }>({
      query: (newList) => ({
        url: '/createList',
        method: 'POST',
        body: newList,
      }),
    }),
    updateList: builder.mutation<IList, { listId: string; place: string; type: string }>({
      query: (updatedList) => ({
        url: `/updateList/${updatedList.listId}`,
        method: 'PUT',
        body: {
          place: updatedList.place,
          type: updatedList.type,
        },
      }),
    }),
  }),
});

export const { useGetListsQuery, useGetListQuery, useCreateListMutation, useUpdateListMutation } = listsRtk;
