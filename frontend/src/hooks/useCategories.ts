import { useEffect, useState } from 'react';
import { fetcher } from '@/api';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await fetcher('/categories', 'GET');
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
