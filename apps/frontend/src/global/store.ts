import { configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from '@/global/rootReducer';

const persistConfig = {
  key: 'QNET',
  storage,
  whitelist: ['core'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      ignoredPaths: ['splitApi.internal', 'splitApi.internal.endpointMap'],
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      ignoredActionPaths: ['meta.requestId', 'meta.requestStatus'],
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
