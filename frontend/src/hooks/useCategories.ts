import { useEffect, useState } from 'react';
import { fetcher } from '@/api';

export const useCategories = (url = '/categories') => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const response = await fetcher(url, 'GET');
      setCategories(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    isLoading,
  };
};
