import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  open: boolean;
}

const initialState: AuthState = {
  open: false,
};

const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    toggleDrawer: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
  },
});

export const { toggleDrawer } = drawerSlice.actions;
export default drawerSlice.reducer;
