import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { login } from '@/api';
import classes from './Login.module.css';
import { AuthContext } from '@/context/AuthContext';

export function Login() {
  const form = useForm({
    initialValues: { email: '', password: '' },
    validate: {
      email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value: string) => (value.length < 6 ? 'Password must have at least 6 characters' : null),
    },
  });
  const navigate = useNavigate();
  const { updateAuth, setUser } = useContext(AuthContext);

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const result = await login(values.email, values.password);
      if (result.status === 201) {
        notifications.show({
          title: 'Login successful 😇',
          message: 'Welcome back!',
        });
        updateAuth(true);
        setUser(result.data.user);
        localStorage.setItem('user', JSON.stringify(result.data.user));
        navigate('/posts');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component={Link} to="/register">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput label="Email" placeholder="you@mantine.dev" required {...form.getInputProps('email')} />
          <PasswordInput label="Password" placeholder="Your password" required mt="md" {...form.getInputProps('password')} />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button type="submit" fullWidth mt="xl">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
