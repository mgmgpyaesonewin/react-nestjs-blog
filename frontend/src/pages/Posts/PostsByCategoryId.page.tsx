import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, SimpleGrid } from '@mantine/core';
import { Post } from '@/components/Post/Post';
import { CategoryWithPostsType } from '@/types/CategoryType';
import { fetcher } from '@/api';
import PostType from '@/types/PostType';

export function PostByCategoryIdPage() {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [categoryWithPosts, setCategoryWithPosts] = useState<CategoryWithPostsType>({});

  const getCategoryWithPosts = async () => {
    try {
      const response = await fetcher(`/categories/${id}`, 'GET');
      setCategoryWithPosts(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async (postID: number) => {
    try {
      await fetcher(`/posts/${postID}`, 'DELETE');
      getCategoryWithPosts();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategoryWithPosts();
  }, [id]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <Container py="xl">
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        {categoryWithPosts.posts.map((post: PostType) => {
          post.category = categoryWithPosts;
          return (
            <React.Fragment key={post.id}>
              <Post key={post.id} post={post} handleDelete={() => deletePost(+post.id)} />
            </React.Fragment>
          );
        })}
      </SimpleGrid>
    </Container>
  );
}
