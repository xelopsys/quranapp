/* eslint-disable no-param-reassign */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';

import appReducerSlice from '../slice/app-slice';

const persistConfig = {
  key: 'app',
  storage: AsyncStorage,
};

export const appReducer = combineReducers({
  app: appReducerSlice,
});

export type RootState = ReturnType<typeof appReducer>;

const persistedReducer = persistReducer(persistConfig, appReducer);

function makeStore() {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
}

export const store = makeStore();

export const persistor = persistStore(store);
