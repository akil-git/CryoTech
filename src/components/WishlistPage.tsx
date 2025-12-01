import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, X } from 'lucide-react';
import { WishlistItem, CartItem } from '../lib/types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface WishlistPageProps {
  wishlist: WishlistItem[];
  toggleWishlist: (item: WishlistItem) => void;
  addToCart: (item: CartItem) => void;
}

export default function WishlistPage({ wishlist, toggleWishlist, addToCart }: WishlistPageProps) {
  const handleAddToCart = (item: WishlistItem) => {
    if (!item.inStock) {
      alert('This product is currently out of stock');
      return;
    }

    addToCart({
      productId: item.productId,
      name: item.name,
      price: item.discountPrice || item.price,
      image: item.image,
      quantity: 1,
      maxStock: 100, // Default stock for wishlist items
    });
  };

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          <Heart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h2 className="mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6">
            Save items you love for later by clicking the heart icon
          </p>
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8">My Wishlist ({wishlist.length} items)</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map((item) => {
          const displayPrice = item.discountPrice || item.price;
          
          return (
            <div key={item.productId} className="bg-white rounded-lg shadow-sm overflow-hidden group">
              <div className="relative aspect-square bg-gray-100">
                <Link to={`/product/${item.productId}`}>
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                
                <button
                  onClick={() => toggleWishlist(item)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md text-red-500 hover:bg-red-50 transition-colors"
                  title="Remove from Wishlist"
                >
                  <X className="w-4 h-4" />
                </button>

                {!item.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-gray-800 text-white px-4 py-2 rounded">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              <div className="p-4">
                <Link to={`/product/${item.productId}`} className="hover:text-blue-600">
                  <h3 className="mb-2 line-clamp-2 min-h-[3rem]">
                    {item.name}
                  </h3>
                </Link>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-blue-600">
                    ৳{displayPrice.toLocaleString()}
                  </span>
                  {item.discountPrice && (
                    <span className="text-gray-400 line-through text-sm">
                      ৳{item.price.toLocaleString()}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleAddToCart(item)}
                  disabled={!item.inStock}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
