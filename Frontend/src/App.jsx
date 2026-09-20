import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './app.routes';
import './features/shared/global.scss';
import { AuthProvider } from './features/auth/auth.context';
import { PostContextProvider } from './features/posts/post.context';
import { ToastProvider } from './context/ToastContext';

const App = () => {
  useEffect(() => {
    const savedTheme = localStorage.getItem('vibefeed-theme') || 'dark';
    if (savedTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, []);

  return (
    <ToastProvider>
      <AuthProvider>
        <PostContextProvider>
          <RouterProvider router={router} />
        </PostContextProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

export default App;
