'use client';

import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from '@/global/store';

interface ReduxWrapperProps extends PropsWithChildren {
  children: React.ReactNode;
}

const ReduxProvider = ({ children }: ReduxWrapperProps) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
