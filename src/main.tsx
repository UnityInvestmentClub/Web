import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppStateProvider, SupabaseProvider } from '@context/';
import { Layout } from '@layout/';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SupabaseProvider>
      <AppStateProvider>
        <Layout />
      </AppStateProvider>
    </SupabaseProvider>
  </React.StrictMode>
);
