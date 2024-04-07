import { useEffect, useState } from 'react';
import { fetcher } from '@/api';
import PostType from '@/types/PostType';

export const usePosts = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  const getPosts = async () => {
    try {
      const response = await fetcher('/posts', 'GET');
      setPosts(response.data);
    } catch (error) {
      console.error(error);
      setPosts([]);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return {
    posts,
  };
};
