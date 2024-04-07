import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LayoutPage } from './pages/Layout.page';
import { Login } from './pages/Login.page';
import { HomePage } from './pages/Home.page';
import { Register } from './pages/Register.page';
import { PostsPage } from './pages/Posts.page';
import { ProtectedRoute } from './ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      { path: 'login', element: <Login /> },
      {
        path: 'register',
        element: <Register />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'posts', element: <PostsPage /> },
        ],
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
