import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { sungloApi } from './api';
import authslice from './slice/authslice';

export const makeStore = (): any => {
  return configureStore({
    reducer: {
      auth: authslice,
      [sungloApi.reducerPath]: sungloApi.reducer,
    },
    middleware: (gDM) => gDM().concat(sungloApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
