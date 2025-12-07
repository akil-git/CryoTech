// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// API Response Types
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  count?: number;
  total?: number;
  totalPages?: number;
  currentPage?: number;
}

// Helper function to get auth token
const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};

// Helper function to handle API requests
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = getAuthToken();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Merge existing headers
  if (options.headers) {
    Object.entries(options.headers).forEach(([key, value]) => {
      headers[key] = value as string;
    });
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
      credentials: 'include', // Important for cookies
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// ============================================
// PRODUCT API
// ============================================

export interface ProductFilters {
  page?: number;
  limit?: number;
  category?: string;
  subCategory?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  isOnSale?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  search?: string;
  sort?: string;
}

export const productAPI = {
  // Get all products with filters
  getAll: async (filters?: ProductFilters) => {
    const queryParams = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });
    }

    const queryString = queryParams.toString();
    const endpoint = `/products${queryString ? `?${queryString}` : ''}`;
    
    return apiRequest(endpoint);
  },

  // Get single product by ID or slug
  getById: async (id: string) => {
    return apiRequest(`/products/${id}`);
  },

  // Get featured products
  getFeatured: async (limit = 8) => {
    return apiRequest(`/products/featured?limit=${limit}`);
  },

  // Get new arrivals
  getNewArrivals: async (limit = 8) => {
    return apiRequest(`/products/new-arrivals?limit=${limit}`);
  },

  // Get products on sale
  getOnSale: async (limit = 8) => {
    return apiRequest(`/products/on-sale?limit=${limit}`);
  },

  // Get related products
  getRelated: async (productId: string, limit = 4) => {
    return apiRequest(`/products/${productId}/related?limit=${limit}`);
  },
};

// ============================================
// CATEGORY API
// ============================================

export const categoryAPI = {
  // Get all categories
  getAll: async () => {
    return apiRequest('/categories');
  },

  // Get single category
  getById: async (id: string) => {
    return apiRequest(`/categories/${id}`);
  },

  // Get products by category
  getProducts: async (categoryId: string, page = 1, limit = 12) => {
    return apiRequest(`/categories/${categoryId}/products?page=${page}&limit=${limit}`);
  },
};

// ============================================
// AUTH API
// ============================================

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export const authAPI = {
  // Register new user
  register: async (data: RegisterData) => {
    const response = await apiRequest('/users/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    if (response.data && (response.data as any).token) {
      localStorage.setItem('token', (response.data as any).token);
    }
    
    return response;
  },

  // Login user
  login: async (credentials: LoginCredentials) => {
    const response = await apiRequest('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.data && (response.data as any).token) {
      localStorage.setItem('token', (response.data as any).token);
    }
    
    return response;
  },

  // Logout user
  logout: async () => {
    localStorage.removeItem('token');
    return apiRequest('/users/logout', {
      method: 'POST',
    });
  },

  // Get current user
  getCurrentUser: async () => {
    return apiRequest('/users/me');
  },

  // Update profile
  updateProfile: async (data: Partial<RegisterData>) => {
    return apiRequest('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};

// ============================================
// CART API
// ============================================

export interface AddToCartData {
  productId: string;
  quantity: number;
  selectedVariant?: { [key: string]: string };
}

export const cartAPI = {
  // Get cart
  get: async () => {
    return apiRequest('/cart');
  },

  // Add item to cart
  addItem: async (data: AddToCartData) => {
    return apiRequest('/cart/items', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Update cart item
  updateItem: async (itemId: string, quantity: number) => {
    return apiRequest(`/cart/items/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
  },

  // Remove item from cart
  removeItem: async (itemId: string) => {
    return apiRequest(`/cart/items/${itemId}`, {
      method: 'DELETE',
    });
  },

  // Clear cart
  clear: async () => {
    return apiRequest('/cart', {
      method: 'DELETE',
    });
  },
};

// ============================================
// WISHLIST API
// ============================================

export const wishlistAPI = {
  // Get wishlist
  get: async () => {
    return apiRequest('/wishlist');
  },

  // Add to wishlist
  addItem: async (productId: string) => {
    return apiRequest('/wishlist/items', {
      method: 'POST',
      body: JSON.stringify({ productId }),
    });
  },

  // Remove from wishlist
  removeItem: async (productId: string) => {
    return apiRequest(`/wishlist/items/${productId}`, {
      method: 'DELETE',
    });
  },

  // Check if product in wishlist
  check: async (productId: string) => {
    return apiRequest(`/wishlist/check/${productId}`);
  },

  // Clear wishlist
  clear: async () => {
    return apiRequest('/wishlist', {
      method: 'DELETE',
    });
  },
};

// ============================================
// ORDER API
// ============================================

export interface CreateOrderData {
  items: any[];
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  paymentMethod: string;
  subtotal: number;
  taxAmount: number;
  shippingCharge: number;
  totalAmount: number;
}

export const orderAPI = {
  // Create order
  create: async (data: CreateOrderData) => {
    return apiRequest('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Get user orders
  getMyOrders: async () => {
    return apiRequest('/orders/my-orders');
  },

  // Get single order
  getById: async (orderId: string) => {
    return apiRequest(`/orders/${orderId}`);
  },

  // Cancel order
  cancel: async (orderId: string) => {
    return apiRequest(`/orders/${orderId}/cancel`, {
      method: 'PUT',
    });
  },
};

// ============================================
// REVIEW API
// ============================================

export interface CreateReviewData {
  product: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
}

export const reviewAPI = {
  // Get product reviews
  getProductReviews: async (productId: string, page = 1, limit = 10) => {
    return apiRequest(`/reviews/product/${productId}?page=${page}&limit=${limit}`);
  },

  // Create review
  create: async (data: CreateReviewData) => {
    return apiRequest('/reviews', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Get user reviews
  getMyReviews: async () => {
    return apiRequest('/reviews/my-reviews');
  },

  // Update review
  update: async (reviewId: string, data: Partial<CreateReviewData>) => {
    return apiRequest(`/reviews/${reviewId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Delete review
  delete: async (reviewId: string) => {
    return apiRequest(`/reviews/${reviewId}`, {
      method: 'DELETE',
    });
  },
};

// Export API base URL for direct use
export { API_BASE_URL };
