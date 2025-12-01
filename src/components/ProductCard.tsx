import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, GitCompare, Eye, Star } from 'lucide-react';
import { Product, CartItem, WishlistItem, CompareItem } from '../lib/types';
import { getProductImage } from '../lib/images';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
import QuickViewModal from './QuickViewModal';

interface ProductCardProps {
  product: Product;
  addToCart: (item: CartItem) => void;
  toggleWishlist: (item: WishlistItem) => void;
  toggleCompare: (item: CompareItem) => void;
  isInWishlist: (productId: string) => boolean;
  isInCompare: (productId: string) => boolean;
}

export default function ProductCard({
  product,
  addToCart,
  toggleWishlist,
  toggleCompare,
  isInWishlist,
  isInCompare,
}: ProductCardProps) {
  const [showQuickView, setShowQuickView] = useState(false);
  const displayPrice = product.discountPrice || product.price;
  const inWishlist = isInWishlist(product.id);
  const inCompare = isInCompare(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!product.inStock) {
      alert('This product is currently out of stock');
      return;
    }

    addToCart({
      productId: product.id,
      name: product.name,
      price: displayPrice,
      image: getProductImage(product.images[0]),
      quantity: 1,
      maxStock: product.stockQuantity,
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist({
      productId: product.id,
      name: product.name,
      price: product.price,
      discountPrice: product.discountPrice,
      image: getProductImage(product.images[0]),
      inStock: product.inStock,
    });
  };

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleCompare({
      productId: product.id,
      name: product.name,
      price: product.price,
      discountPrice: product.discountPrice,
      image: getProductImage(product.images[0]),
      specifications: product.specifications,
      rating: product.rating,
    });
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowQuickView(true);
  };

  return (
    <>
      <Link
        to={`/product/${product.id}`}
        className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden block"
      >
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <ImageWithFallback
            src={getProductImage(product.images[0])}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                New
              </span>
            )}
            {product.isOnSale && product.discountPercentage && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                -{product.discountPercentage}%
              </span>
            )}
            {!product.inStock && (
              <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">
                Out of Stock
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleToggleWishlist}
              className={`p-2 rounded-full shadow-md transition-colors ${
                inWishlist ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:bg-red-500 hover:text-white'
              }`}
              title="Add to Wishlist"
            >
              <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
            </button>
            
            <button
              onClick={handleToggleCompare}
              className={`p-2 rounded-full shadow-md transition-colors ${
                inCompare ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-blue-500 hover:text-white'
              }`}
              title="Compare"
            >
              <GitCompare className="w-4 h-4" />
            </button>
            
            <button
              onClick={handleQuickView}
              className="p-2 bg-white rounded-full shadow-md text-gray-700 hover:bg-gray-800 hover:text-white transition-colors"
              title="Quick View"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart Button - appears on hover */}
          {product.inStock && (
            <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="line-clamp-2 mb-2 min-h-[3rem]">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">({product.reviewCount})</span>
          </div>

          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-blue-600">
              ৳{displayPrice.toLocaleString()}
            </span>
            {product.discountPrice && (
              <span className="text-gray-400 line-through text-sm">
                ৳{product.price.toLocaleString()}
              </span>
            )}
          </div>

          {product.stockQuantity <= 10 && product.inStock && (
            <p className="text-xs text-orange-600">
              Only {product.stockQuantity} left in stock
            </p>
          )}
        </div>
      </Link>

      {showQuickView && (
        <QuickViewModal
          product={product}
          onClose={() => setShowQuickView(false)}
          addToCart={addToCart}
          toggleWishlist={toggleWishlist}
          toggleCompare={toggleCompare}
          isInWishlist={isInWishlist}
          isInCompare={isInCompare}
        />
      )}
    </>
  );
}
