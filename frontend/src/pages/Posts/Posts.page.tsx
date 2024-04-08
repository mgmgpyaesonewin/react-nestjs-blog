import { useState } from 'react';
import { Container, Flex, Pagination, SimpleGrid } from '@mantine/core';
import { Post } from '@/components/Post/Post';
import { usePosts } from '@/hooks/usePosts';

export function PostsPage() {
  const { posts, page, setPage, totalPages, deletePost } = usePosts();
  const [currentPage, setCurrentPage] = useState(page);

  const handlePageChange = (newPage: any) => {
    setCurrentPage(newPage);
    setPage(newPage);
  };

  return (
    <Container py="xl">
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        {
          posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              handleDelete={(event: React.MouseEvent<HTMLButtonElement>) => {
              event.stopPropagation();
              deletePost(+post.id);
            }} />
          ))
        }
      </SimpleGrid>
      <Flex justify="center" mt="xl">
        <Pagination total={totalPages} value={currentPage} onChange={handlePageChange} />
      </Flex>
    </Container>
  );
}
