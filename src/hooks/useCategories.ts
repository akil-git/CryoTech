import { useState, useEffect } from 'react';
import { categoryAPI } from '../services/api';

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  subCategories: string[];
  isActive: boolean;
}

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await categoryAPI.getAll();
        if (response.success && response.data) {
          setCategories(response.data as Category[]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch categories');
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};
