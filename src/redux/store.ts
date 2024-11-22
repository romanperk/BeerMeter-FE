import { configureStore } from '@reduxjs/toolkit';
import userReducer from './users/userSlice';
import drawerReducer from './drawer/drawerSlice';
import { userRtk } from './users/userRtk';
import { listsRtk } from './lists/listsRtk';
import { itemsRtk } from './items/itemsRtk';

const store = configureStore({
  reducer: {
    auth: userReducer,
    drawer: drawerReducer,
    [userRtk.reducerPath]: userRtk.reducer,
    [listsRtk.reducerPath]: listsRtk.reducer,
    [itemsRtk.reducerPath]: itemsRtk.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userRtk.middleware, listsRtk.middleware, itemsRtk.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
