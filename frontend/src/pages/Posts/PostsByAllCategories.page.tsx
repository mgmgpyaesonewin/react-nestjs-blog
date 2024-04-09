import React, { useEffect, useState } from 'react';
import { Container, SimpleGrid } from '@mantine/core';
import { Post } from '@/components/Post/Post';
import { CategoryWithPostsType } from '@/types/CategoryType';
import { fetcher } from '@/api';

export function PostsByAllCategoriesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [categoriesWithPosts, setCategoriesWithPosts] = useState([]);

  const getCategoriesWithPosts = async () => {
    try {
      const response = await fetcher('/categories/all', 'GET');
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

  if (isLoading && categoriesWithPosts.length <= 0) {
    return <div>Loading ...</div>;
  }

  return (
    <Container py="xl">
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        {categoriesWithPosts.map((category: CategoryWithPostsType) => (
          <React.Fragment key={category.id}>
            {category.posts.map((post) => {
              post.category = category;
              return (
                <React.Fragment key={post.id}>
                  <Post key={post.id} post={post} handleDelete={() => deletePost(+post.id)} />
                </React.Fragment>
              );
            })}
          </React.Fragment>
        ))}
      </SimpleGrid>
    </Container>
  );
}
