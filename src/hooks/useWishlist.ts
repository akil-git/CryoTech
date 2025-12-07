import { useState, useEffect } from 'react';
import { wishlistAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export interface WishlistItem {
  _id: string;
  product: any;
}

export interface Wishlist {
  _id: string;
  user: string;
  items: WishlistItem[];
}

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<Wishlist | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  const fetchWishlist = async () => {
    if (!isAuthenticated) {
      setWishlist(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await wishlistAPI.get();
      if (response.success && response.data) {
        setWishlist(response.data as Wishlist);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch wishlist');
      console.error('Error fetching wishlist:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [isAuthenticated]);

  const addItem = async (productId: string) => {
    try {
      const response = await wishlistAPI.addItem(productId);
      if (response.success) {
        await fetchWishlist();
      }
      return response;
    } catch (err) {
      console.error('Error adding to wishlist:', err);
      throw err;
    }
  };

  const removeItem = async (productId: string) => {
    try {
      const response = await wishlistAPI.removeItem(productId);
      if (response.success) {
        await fetchWishlist();
      }
      return response;
    } catch (err) {
      console.error('Error removing from wishlist:', err);
      throw err;
    }
  };

  const clearWishlist = async () => {
    try {
      const response = await wishlistAPI.clear();
      if (response.success) {
        await fetchWishlist();
      }
      return response;
    } catch (err) {
      console.error('Error clearing wishlist:', err);
      throw err;
    }
  };

  const isInWishlist = (productId: string): boolean => {
    return wishlist?.items.some(item => item.product._id === productId) || false;
  };

  const wishlistCount = wishlist?.items.length || 0;

  return {
    wishlist,
    loading,
    error,
    wishlistCount,
    addItem,
    removeItem,
    clearWishlist,
    isInWishlist,
    refreshWishlist: fetchWishlist,
  };
};
