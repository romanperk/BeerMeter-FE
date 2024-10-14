import { configureStore } from '@reduxjs/toolkit';
import userReducer from './users/userSlice';
import drawerReducer from './drawer/drawerSlice';

const store = configureStore({
  reducer: {
    auth: userReducer,
    drawer: drawerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
