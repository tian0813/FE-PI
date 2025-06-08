import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import SignInPage from './pages/sign-in.tsx';
import SignUpPage from './pages/sign-up.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ROUTES } from './utils/constants.ts';
import ProtectedRoute from './components/protected.tsx';
import { AuthProvider } from './context/auth-context.tsx';

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: (
      <ProtectedRoute>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.REGISTER,
    element: <SignUpPage />,
  },
  {
    path: ROUTES.LOGIN,
    element: <SignInPage />

  }
]);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
)
