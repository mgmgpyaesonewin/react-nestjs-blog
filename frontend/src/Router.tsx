import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LayoutPage } from './pages/Layout.page';
import { Login } from './pages/Login.page';
import { HomePage } from './pages/Home.page';
import { Register } from './pages/Register.page';
import { PostsPage } from './pages/Posts/Posts.page';
import { ProtectedRoute } from './ProtectedRoute';
import { CreatePostPage } from './pages/Posts/CreatePost.page';
import { MyPostsPage } from './pages/Posts/MyPosts.page';
import PostDetail from './pages/Posts/PostDetail.page';
import { EditPostPage } from './pages/Posts/EditPostPage';

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
          {
            path: 'posts/my',
            element: <MyPostsPage />,
          },
          {
            path: 'posts/create',
            element: <CreatePostPage />,
          },
          {
            path: 'posts/:slug',
            element: <PostDetail />,
          },
          {
            path: 'posts/:id/edit',
            element: <EditPostPage />,
          },
        ],
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
