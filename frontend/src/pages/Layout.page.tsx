import { MantineProvider, AppShell, Group, Burger, UnstyledButton, Button } from '@mantine/core';
import { Link, Outlet } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { useContext } from 'react';
import { theme } from '@/theme';
import classes from './Layout.module.css';
import { AuthContext } from '@/context/AuthContext';

export function LayoutPage() {
  const [opened, { toggle }] = useDisclosure();
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <MantineProvider theme={theme}>
      <AppShell
        header={{ height: 60 }}
        navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
        padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <UnstyledButton className={classes.control}>PyaeSone Blog</UnstyledButton>
            <Group ml="xl" gap={4} visibleFrom="sm">
            {isAuthenticated ? (
                <Link to="/posts" className={classes.control}>
                  <Button>Posts</Button>
                </Link>
              ) :
              <>
                <Link to="/login" className={classes.control}>
                  <Button>Log in</Button>
                </Link>
                <Button variant="default">Sign up</Button>
              </>
            }
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        {isAuthenticated ? (
            <Link to="/posts" className={classes.control}>
              <Button>Posts</Button>
            </Link>
          ) :
          <>
            <Link to="/login" className={classes.control}>
              <Button>Log in</Button>
            </Link>
            <Button variant="default">Sign up</Button>
          </>
        }
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
