// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './users/authSlice';
import drawerReducer from './drawer/drawerSlice';
import { userRtk } from './users/userRtk';

const store = configureStore({
  reducer: {
    auth: userReducer,
    drawer: drawerReducer,
    [userRtk.reducerPath]: userRtk.reducer, // Fixed: change this to use the reducer directly
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userRtk.middleware), // Keep middleware addition
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
