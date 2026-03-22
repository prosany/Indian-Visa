import QueryProvider from '@/lib/QueryProvider';
import ReduxProvider from '@/lib/ReduxProvider';
import { PropsWithChildren } from 'react';

const CoreProviderLayout = ({ children }: PropsWithChildren) => {
  return (
    <QueryProvider>
      <ReduxProvider>{children}</ReduxProvider>
    </QueryProvider>
  );
};

export default CoreProviderLayout;
