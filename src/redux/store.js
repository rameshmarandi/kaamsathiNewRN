import {configureStore} from '@reduxjs/toolkit';
// import rootReducer from './features';
import {persistStore, persistReducer} from 'redux-persist';
import rootReducer from './reducer';

import { storage } from '../utility/mmkvStorage';
// import Reactotron from 'reactotron-react-native';

export const reduxStorage = {
  setItem: (key, value) => {
    storage.setKey(key, value);
    return Promise.resolve(true);
  },
  getItem: (key) => {
    const value = storage.getKey(key);
    return Promise.resolve(value);
  },
  removeItem: (key) => {
    storage.deleteKey(key);
    return Promise.resolve();
  },
};


const persistConfig = {
  key: 'root',
  storage: reduxStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [
  // Reactotron.createEnhancer(),
  /* other middlewares */
];

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(middlewares),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
