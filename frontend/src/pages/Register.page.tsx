import { Container, Title, Anchor, Paper, TextInput, Text, PasswordInput, Group, Checkbox, Button } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { register } from '@/api';
import classes from './Login.module.css';

export function Register() {
  const form = useForm({
    initialValues: { name: '', email: '', password: '', confirmPassword: '' },
    validate: {
      name: (value: string) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value: string) => (value.length < 6 ? 'Password must have at least 6 characters' : null),
      confirmPassword: (value: string, values: { password: string }) =>
        value !== values.password ? 'Passwords do not match' : null,
    },
  });
  const navigate = useNavigate();

  const handleSubmit = async (values: { name: string; email: string; password: string }) => {
    try {
      const result = await register(values.name, values.email, values.password);
      if (result.status === 201) {
        notifications.show({
          title: 'Registeration is successful 😇',
          message: 'Please login to continue.',
        });
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already Register Account?{' '}
        <Anchor size="sm" component={Link} to="/login">
          Login Here
        </Anchor>
      </Text>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput label="Username" placeholder="Name" required {...form.getInputProps('name')} />
          <TextInput label="Email" placeholder="you@mantine.dev" required mt="md" {...form.getInputProps('email')} />
          <PasswordInput label="Password" placeholder="Your password" required mt="md" {...form.getInputProps('password')} />
          <PasswordInput label="Confirm Password" placeholder="Confirm your password" required mt="md" {...form.getInputProps('confirmPassword')} />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
          </Group>
          <Button type="submit" fullWidth mt="xl">
            Register Now
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
