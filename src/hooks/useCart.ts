import { useState, useEffect } from 'react';
import { cartAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export interface CartItem {
  _id: string;
  product: any;
  quantity: number;
  selectedVariant?: { [key: string]: string };
  price: number;
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  subtotal: number;
  total: number;
}

export const useCart = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  const fetchCart = async () => {
    if (!isAuthenticated) {
      setCart(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await cartAPI.get();
      if (response.success && response.data) {
        setCart(response.data as Cart);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch cart');
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [isAuthenticated]);

  const addItem = async (productId: string, quantity: number, selectedVariant?: { [key: string]: string }) => {
    try {
      const response = await cartAPI.addItem({ productId, quantity, selectedVariant });
      if (response.success) {
        await fetchCart();
      }
      return response;
    } catch (err) {
      console.error('Error adding to cart:', err);
      throw err;
    }
  };

  const updateItem = async (itemId: string, quantity: number) => {
    try {
      const response = await cartAPI.updateItem(itemId, quantity);
      if (response.success) {
        await fetchCart();
      }
      return response;
    } catch (err) {
      console.error('Error updating cart item:', err);
      throw err;
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const response = await cartAPI.removeItem(itemId);
      if (response.success) {
        await fetchCart();
      }
      return response;
    } catch (err) {
      console.error('Error removing cart item:', err);
      throw err;
    }
  };

  const clearCart = async () => {
    try {
      const response = await cartAPI.clear();
      if (response.success) {
        await fetchCart();
      }
      return response;
    } catch (err) {
      console.error('Error clearing cart:', err);
      throw err;
    }
  };

  const cartCount = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return {
    cart,
    loading,
    error,
    cartCount,
    addItem,
    updateItem,
    removeItem,
    clearCart,
    refreshCart: fetchCart,
  };
};
