import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/tiptap/styles.css';
import { useState } from 'react';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Router } from './Router';
import { theme } from './theme';
import { AuthContext } from './context/AuthContext';

export default function App() {
  const [isAuthenticated, updateAuth] = useState(() => !!localStorage.getItem('token'));
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || '{}'));

  return (
    <MantineProvider theme={theme}>
      <AuthContext.Provider value={{ isAuthenticated, updateAuth, user, setUser }}>
        <Notifications />
        <Router />
      </AuthContext.Provider>
    </MantineProvider>
  );
}
