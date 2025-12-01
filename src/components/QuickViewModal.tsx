import { X, ShoppingCart, Heart, GitCompare, Star, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { Product, CartItem, WishlistItem, CompareItem } from '../lib/types';
import { getProductImage } from '../lib/images';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Link } from 'react-router-dom';

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
  addToCart: (item: CartItem) => void;
  toggleWishlist: (item: WishlistItem) => void;
  toggleCompare: (item: CompareItem) => void;
  isInWishlist: (productId: string) => boolean;
  isInCompare: (productId: string) => boolean;
}

export default function QuickViewModal({
  product,
  onClose,
  addToCart,
  toggleWishlist,
  toggleCompare,
  isInWishlist,
  isInCompare,
}: QuickViewModalProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: string }>({});

  const displayPrice = product.discountPrice || product.price;
  const inWishlist = isInWishlist(product.id);
  const inCompare = isInCompare(product.id);

  const handleAddToCart = () => {
    if (!product.inStock) {
      alert('This product is currently out of stock');
      return;
    }

    addToCart({
      productId: product.id,
      name: product.name,
      price: displayPrice,
      image: getProductImage(product.images[0]),
      quantity,
      selectedVariant: product.variants ? selectedVariants : undefined,
      maxStock: product.stockQuantity,
    });

    onClose();
  };

  const handleVariantChange = (variantType: string, option: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [variantType]: option,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
          <h2>Quick View</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Images */}
            <div>
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                <ImageWithFallback
                  src={getProductImage(product.images[selectedImage])}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === idx ? 'border-blue-600' : 'border-gray-200'
                      }`}
                    >
                      <ImageWithFallback
                        src={getProductImage(img)}
                        alt={`${product.name} ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              <div className="flex items-start gap-2 mb-2">
                {product.isNew && (
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">New</span>
                )}
                {product.isOnSale && product.discountPercentage && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                    -{product.discountPercentage}%
                  </span>
                )}
                {!product.inStock && (
                  <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">Out of Stock</span>
                )}
              </div>

              <h2 className="mb-2">{product.name}</h2>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">({product.reviewCount} reviews)</span>
              </div>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl text-blue-600">
                  ৳{displayPrice.toLocaleString()}
                </span>
                {product.discountPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    ৳{product.price.toLocaleString()}
                  </span>
                )}
              </div>

              <p className="text-gray-600 mb-6">{product.shortDescription}</p>

              {/* Variants */}
              {product.variants?.map((variant) => (
                <div key={variant.type} className="mb-4">
                  <label className="block mb-2">{variant.type}:</label>
                  <div className="flex flex-wrap gap-2">
                    {variant.options.map((option) => (
                      <button
                        key={option.name}
                        onClick={() => handleVariantChange(variant.type, option.name)}
                        disabled={!option.inStock}
                        className={`px-4 py-2 border rounded-lg transition-colors ${
                          selectedVariants[variant.type] === option.name
                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                            : option.inStock
                            ? 'border-gray-300 hover:border-blue-600'
                            : 'border-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {option.name}
                        {!option.inStock && ' (Out of Stock)'}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Quantity */}
              {product.inStock && (
                <div className="mb-6">
                  <label className="block mb-2">Quantity:</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <span className="text-sm text-gray-500">
                      ({product.stockQuantity} available)
                    </span>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
                
                <button
                  onClick={() => {
                    toggleWishlist({
                      productId: product.id,
                      name: product.name,
                      price: product.price,
                      discountPrice: product.discountPrice,
                      image: getProductImage(product.images[0]),
                      inStock: product.inStock,
                    });
                  }}
                  className={`p-3 border rounded-lg transition-colors ${
                    inWishlist
                      ? 'border-red-500 bg-red-50 text-red-500'
                      : 'border-gray-300 hover:border-red-500 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
                </button>
                
                <button
                  onClick={() => {
                    toggleCompare({
                      productId: product.id,
                      name: product.name,
                      price: product.price,
                      discountPrice: product.discountPrice,
                      image: getProductImage(product.images[0]),
                      specifications: product.specifications,
                      rating: product.rating,
                    });
                  }}
                  className={`p-3 border rounded-lg transition-colors ${
                    inCompare
                      ? 'border-blue-500 bg-blue-50 text-blue-500'
                      : 'border-gray-300 hover:border-blue-500 hover:text-blue-500'
                  }`}
                >
                  <GitCompare className="w-5 h-5" />
                </button>
              </div>

              <Link
                to={`/product/${product.id}`}
                className="block text-center text-blue-600 hover:underline mb-4"
                onClick={onClose}
              >
                View Full Details →
              </Link>

              {/* SKU */}
              <p className="text-sm text-gray-500">SKU: {product.sku}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
