import { Container, Pagination, SimpleGrid } from '@mantine/core';
import { Post } from '@/components/Post/Post';
import { usePosts } from '@/hooks/usePosts';

export function PostsPage() {
  const { posts } = usePosts();

  return (
    <Container py="xl">
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        {
          posts.map((post) => (
            <Post key={post.id} post={post} />
          ))
        }
      </SimpleGrid>
      <Pagination total={10} />
    </Container>
  );
}
