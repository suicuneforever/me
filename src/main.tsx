import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import Desktop from './components/os/Desktop/Desktop.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queryClient.ts';

const rootRoute = createRootRoute();

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <App />,
});

const desktopRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/desktop',
  component: () => <Desktop />,
});

const routeTree = rootRoute.addChildren([indexRoute, desktopRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    {/* <App /> */}
  </React.StrictMode>,
);
