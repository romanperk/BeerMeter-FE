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
    getItem: builder.query({
      query: (itemId) => {
        return `/getItem/${itemId}`;
      },
    }),
    getItems: builder.query({
      query: (listId) => {
        return `/getItems/${listId}`;
      },
    }),
    createItem: builder.mutation<
      IItem,
      {
        listId: string;
        name: string;
        type: string;
        size?: number;
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
    increaseItemAmount: builder.mutation({
      query: (itemId) => ({
        url: `/increase/${itemId}`,
        method: 'PUT',
      }),
    }),
    updateItem: builder.mutation<IItem, { amount?: number; name?: string; itemId: string; size?: string; type?: string, price?: string }>({
      query: (updatedItem) => ({
        url: `/updateItem/${updatedItem.itemId}`,
        method: 'PUT',
        body: {
          name: updatedItem.name,
          size: updatedItem.size,
          type: updatedItem.type,
          amount: updatedItem.amount,
          price: updatedItem.price,
        },
      }),
    }),
    deleteItem: builder.mutation({
      query: (itemId) => ({
        url: `/deleteItem/${itemId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetItemsQuery,
  useGetItemQuery,
  useIncreaseItemAmountMutation,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation
} = itemsRtk;
