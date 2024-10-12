import { configureStore } from '@reduxjs/toolkit';
import authReducer from './users/authSlice';
import drawerReducer from './drawer/drawerSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    drawer: drawerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
