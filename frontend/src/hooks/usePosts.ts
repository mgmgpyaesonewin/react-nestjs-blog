import { useEffect, useState } from 'react';
import { fetcher } from '@/api';
import PostType from '@/types/PostType';

export const usePosts = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);

  const getPosts = async () => {
    try {
      const response:any = await fetcher(`/posts?page=${page}&limit=20`, 'GET');
      setPosts(response.data.data);
      setTotalPages(response.data.totalPage);
      setTotalPosts(response.data.total);
    } catch (error) {
      console.error(error);
      setPosts([]);
    }
  };

  useEffect(() => {
    getPosts();
  }, [page]);

  return {
    getPosts,
    posts,
    page,
    setPage,
    totalPages,
    totalPosts,
  };
};
