import { TextInput, SimpleGrid, Group, Title, Button, Container, NativeSelect } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Editor } from '@/components/Editor/Editor';
import { fetcher } from '@/api';
import { useCategories } from '@/hooks/useCategories';
import { CategoryType } from '@/types/CategoryType';

export function EditPostPage() {
  const [formLoaded, setFormLoaded] = useState(false);
  const form = useForm({
    initialValues: {
      title: '',
      status: 'DRAFT',
      category: '',
      content: '',
    },
    validate: {
      title: (value) => value.trim().length < 2,
      status: (value) => !['DRAFT', 'PUBLISHED'].includes(value) ? 'Invalid status' : null,
      content: (value) => value.trim().length < 10,
      category: (value) => !value ? 'Category is required' : null,
    },
  });

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { categories } = useCategories();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await fetcher(`/posts/${id}`, 'GET');
        form.setFieldValue('title', data.title);
        form.setFieldValue('status', data.status);
        form.setFieldValue('category', data.category.id);
        form.setFieldValue('content', data.content);
        setFormLoaded(true);
      } catch (error) {
        console.error('Failed to fetch post:', error);
      }
    };
    fetchPost();
  }, []);

  const handleSubmit = async (values: {
      title: string, content: string, status: string, category: string
    }) => {
    try {
      const result = await fetcher(`/posts/${id}`, 'PATCH', values);
      if (result.status === 200) {
        notifications.show({
          title: 'Post updated successfully',
          message: 'Your post has been updated successfully',
        });
        navigate(-1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!formLoaded) return <div>Loading ... </div>;

  return (
    <Container size={760} my={40}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Title
          order={2}
          size="h1"
          style={{ fontFamily: 'Greycliff CF, var(--mantine-font-family)' }}
          fw={900}
          ta="center"
        >
          Update Your Post
        </Title>

        <TextInput
          label="Post Tile"
          placeholder="Enter your title"
          mt="md"
          name="title"
          {...form.getInputProps('title')}
        />

        <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
          <NativeSelect
            label="Post Category"
            data={categories.map((category: CategoryType) => (
              { value: category.id, label: category.title }
            ))}
            {...form.getInputProps('category')} />
          <NativeSelect label="Post Status" data={['DRAFT', 'PUBLISHED']} {...form.getInputProps('status')} />
        </SimpleGrid>

        <SimpleGrid mt="xl">
          <Editor
            value={form.values.content}
            {...form.getInputProps('content')}
          />
        </SimpleGrid>

        <Group justify="center" mt="xl">
          <Button type="submit" size="md">
            Save
          </Button>
        </Group>
      </form>
    </Container>
  );
}
