import { useEffect, useState } from 'react';
import { fetcher } from '@/api';
import PostType from '@/types/PostType';

export const usePosts = (isMyPosts = false) => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);

  const getPosts = async () => {
    try {
      const url = isMyPosts ? `/posts/own?page=${page}&limit=20` : `/posts?page=${page}&limit=20`;
      const response:any = await fetcher(url, 'GET');
      setPosts(response.data.data);
      setTotalPages(response.data.totalPage);
      setTotalPosts(response.data.total);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setPosts([]);
    }
  };

  const deletePost = async (id: number) => {
    try {
      await fetcher(`/posts/${id}`, 'DELETE');
      getPosts();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, [page]);

  return {
    isLoading,
    getPosts,
    deletePost,
    posts,
    page,
    setPage,
    totalPages,
    totalPosts,
  };
};
