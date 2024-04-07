import { TextInput, SimpleGrid, Group, Title, Button, Container } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Editor } from '@/components/Editor/Editor';

export function CreatePostPage() {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validate: {
      name: (value) => value.trim().length < 2,
      email: (value) => !/^\S+@\S+$/.test(value),
      subject: (value) => value.trim().length === 0,
    },
  });

  return (
    <Container size={760} my={40}>
      <form onSubmit={form.onSubmit(() => {})}>
        <Title
          order={2}
          size="h1"
          style={{ fontFamily: 'Greycliff CF, var(--mantine-font-family)' }}
          fw={900}
          ta="center"
        >
          Create Your Post
        </Title>

        <TextInput
          label="Subject"
          placeholder="Subject"
          mt="md"
          name="subject"
          {...form.getInputProps('subject')}
        />

        <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
          <TextInput
            label="Category"
            placeholder="Your name"
            name="name"
            {...form.getInputProps('name')}
          />
        </SimpleGrid>

        <SimpleGrid mt="xl">
          <Editor
            value={form.values.message}
            {...form.getInputProps('message')}
          />
        </SimpleGrid>

        <Group justify="center" mt="xl">
          <Button type="submit" size="md">
            Send message
          </Button>
        </Group>
      </form>
    </Container>
  );
}
