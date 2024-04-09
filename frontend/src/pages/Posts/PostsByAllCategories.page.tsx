import { useEffect, useState } from 'react';
import { Container, SimpleGrid } from '@mantine/core';
import { Post } from '@/components/Post/Post';
import { CategoryWithPostsType } from '@/types/CategoryType';
import { fetcher } from '@/api';

export function PostsByAllCategoriesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [categoriesWithPosts, setCategoriesWithPosts] = useState<CategoryWithPostsType[]>([]);

  const getCategoriesWithPosts = async () => {
    try {
      const response = await fetcher('categories/all', 'GET');
      setCategoriesWithPosts(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async (id: number) => {
    try {
      await fetcher(`/posts/${id}`, 'DELETE');
      getCategoriesWithPosts();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategoriesWithPosts();
    }, []);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <Container py="xl">
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        {categoriesWithPosts.map((categoryWithPostsType: CategoryWithPostsType) => {
          const { posts } = categoryWithPostsType;

          return (
            <>
              {posts.map((post) => (
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
