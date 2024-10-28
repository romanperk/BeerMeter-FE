import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IList } from './listsSlice';
const base_url = import.meta.env.VITE_BASE_URL;

export const listsRtk = createApi({
  reducerPath: 'lists',
  baseQuery: fetchBaseQuery({ baseUrl: `${base_url}/api/lists/` }),
  endpoints: (builder) => ({
    getLists: builder.query({
      query: () => `/`,
    }),
    getList: builder.query<IList, string>({
      query: (listId) => `/getList/${listId}`,
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
        url: `/updateListInfo/${updatedList.listId}`,
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
