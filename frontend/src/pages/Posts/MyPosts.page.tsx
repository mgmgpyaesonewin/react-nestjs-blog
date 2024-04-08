import { useState } from 'react';
import { Anchor, Button, Container, Flex, Pagination, SimpleGrid } from '@mantine/core';
import { IconTablePlus } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { Post } from '@/components/Post/Post';
import { usePosts } from '@/hooks/usePosts';

export function MyPostsPage() {
  const { posts, page, setPage, totalPages } = usePosts(true);
  const [currentPage, setCurrentPage] = useState(page);

  const handlePageChange = (newPage: any) => {
    setCurrentPage(newPage);
    setPage(newPage);
  };

  return (
    <Container py="xl">
      <Flex justify="end">
        <Anchor size="sm" component={Link} to="/posts/create">
          <Button variant="filled" my="sm" leftSection={<IconTablePlus size={14} />}>Create</Button>
        </Anchor>
      </Flex>
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        {
          posts.map((post) => (
            <Post key={post.id} post={post} />
          ))
        }
      </SimpleGrid>
      <Flex justify="center" mt="xl">
        <Pagination total={totalPages} value={currentPage} onChange={handlePageChange} />
      </Flex>
    </Container>
  );
}
