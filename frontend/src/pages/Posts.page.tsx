import { Container, Pagination, SimpleGrid } from '@mantine/core';
import { Post } from '@/components/Post/Post';

export function PostsPage() {
  return (
    <Container py="xl">
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        {
          Array.from({ length: 10 }).map((_, index) => (
            <Post key={index} />
          ))
        }
      </SimpleGrid>
      <Pagination total={10} />
    </Container>
  );
}
