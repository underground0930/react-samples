import { TanstackQueryProvider } from './tanstack-query-provider';
import { NuqsProvider } from './nuqs-provider';

export const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <TanstackQueryProvider>
      <NuqsProvider>
        {children}
      </NuqsProvider>
    </TanstackQueryProvider>
  );
};
