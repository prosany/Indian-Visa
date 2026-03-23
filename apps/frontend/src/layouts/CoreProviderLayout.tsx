import QueryProvider from '@/provider/QueryProvider';
import ReduxProvider from '@/provider/ReduxProvider';
import { PropsWithChildren } from 'react';

const CoreProviderLayout = ({ children }: PropsWithChildren) => {
  return (
    <QueryProvider>
      <ReduxProvider>{children}</ReduxProvider>
    </QueryProvider>
  );
};

export default CoreProviderLayout;
