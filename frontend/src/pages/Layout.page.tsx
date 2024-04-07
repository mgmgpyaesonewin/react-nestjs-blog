import { MantineProvider, AppShell, Group, Burger, UnstyledButton, Button } from '@mantine/core';
import { Link, Outlet } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { useContext } from 'react';
import { theme } from '@/theme';
import classes from './Layout.module.css';
import { AuthContext } from '@/context/AuthContext';
import { Navbar } from '@/components/Navbar/Navbar';

export function LayoutPage() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <MantineProvider theme={theme}>
      <AppShell
        header={{ height: 60 }}
        navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !mobileOpened, desktop: !desktopOpened } }}
        padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
          <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
          <UnstyledButton className={classes.control}>PyaeSone Blog</UnstyledButton>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <Navbar />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
