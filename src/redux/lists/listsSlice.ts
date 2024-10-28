import { createSlice } from '@reduxjs/toolkit';

const initialState: ListState = {
  list: undefined,
  loading: true,
  error: null,
};

const listsSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    createList: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },
  },
});

export const { createList } = listsSlice.actions;
export default listsSlice.reducer;

interface ListState {
  list: IList | undefined;
  loading: boolean;
  error: boolean | null;
}

export interface IList {
  listId: string | null;
  place?: string | null;
  type?: string | null;
  createdAt?: string | null;
}
