import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { IItem } from './itemsSlice';
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
    baseUrl: `${base_url}/api/items/`,
    prepareHeaders: (headers) => {
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });

  return baseQuery(args, api, extraOptions);
};

export const itemsRtk = createApi({
  reducerPath: 'items',
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getItems: builder.query({
      query: (listId) => {
        return `/getItems/${listId}`;
      },
    }),
    createItem: builder.mutation<
      IItem,
      {
        listId: number;
        name: string;
        type: string;
        size: number;
        amount: number;
        price: number;
      }
    >({
      query: (newItem) => ({
        url: '/createItem',
        method: 'POST',
        body: newItem,
      }),
    }),
    updateItem: builder.mutation<IItem, { listId: string; place: string; type: string }>({
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

export const { useGetItemsQuery, useCreateItemMutation, useUpdateItemMutation } = itemsRtk;
