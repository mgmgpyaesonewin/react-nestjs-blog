import { Container, SimpleGrid } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { Post } from '@/components/Post/Post';
import { useCategories } from '@/hooks/useCategories';
import { usePosts } from '@/hooks/usePosts';
import { CategoryType } from '@/types/CategoryType';

export function PostsByCategoryIdPage() {
  const { id } = useParams<{ id: string }>();
  const { categories: categoryByPost } = useCategories(`/categories/${id}`);
  const { posts, isLoading, deletePost } = usePosts();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <Container py="xl">
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        {categories.map((category: CategoryType) => {
          const categoryPosts = posts.filter((post) => post.category.id === category.id);

          return (
            <>
              {categoryPosts.map((post) => (
                <Post
                  key={post.id}
                  post={post}
                  handleDelete={(event: React.MouseEvent<HTMLButtonElement>) => {
                  event.stopPropagation();
                  deletePost(+post.id);
                }} />
              ))}
            </>
          );
        })}
      </SimpleGrid>
    </Container>
  );
}
