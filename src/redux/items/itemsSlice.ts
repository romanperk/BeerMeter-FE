import { createSlice } from '@reduxjs/toolkit';

const initialState: ItemState = {
  item: undefined,
  loading: true,
  error: null,
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    createItem: (state, action) => {
      state.item = action.payload;
      state.loading = false;
    },
  },
});

export const { createItem } = itemsSlice.actions;
export default itemsSlice.reducer;

interface ItemState {
  item: IItem | undefined;
  loading: boolean;
  error: boolean | null;
}

export interface IItem {
  itemId: string;
  listId: string;
  name?: string | null;
  type?: string | null;
  size?: string | null;
  amount?: number | null;
  price?: string | null;
}
