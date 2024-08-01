'use client';

import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material';
import theme from '@/theme/theme';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </AppRouterCacheProvider>
    </Provider>
  );
}
import store from '@/store';
