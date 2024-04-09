import { useEffect, useState } from 'react';
import { fetcher } from '@/api';

export const useCategories = (url = '/categories') => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await fetcher(url, 'GET');
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
  };
};
