import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { ChevronRight, ShoppingCart, Heart, GitCompare, Star, Plus, Minus, Truck, RotateCcw, Shield } from 'lucide-react';
import { products } from '../lib/data';
import { CartItem, WishlistItem, CompareItem } from '../lib/types';
import { getProductImage } from '../lib/images';
import { ImageWithFallback } from './figma/ImageWithFallback';
import ProductCard from './ProductCard';

interface ProductDetailPageProps {
  addToCart: (item: CartItem) => void;
  toggleWishlist: (item: WishlistItem) => void;
  toggleCompare: (item: CompareItem) => void;
  isInWishlist: (productId: string) => boolean;
  isInCompare: (productId: string) => boolean;
}

export default function ProductDetailPage({
  addToCart,
  toggleWishlist,
  toggleCompare,
  isInWishlist,
  isInCompare,
}: ProductDetailPageProps) {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: string }>({});
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1>Product not found</h1>
        <Link to="/" className="text-blue-600 hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }

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
  };

  const handleVariantChange = (variantType: string, option: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [variantType]: option,
    }));
  };

  const relatedProducts = products
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link to={`/category/${product.slug}`} className="text-gray-600 hover:text-blue-600">
              Category
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="line-clamp-1">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
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
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
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
            <div className="flex items-start gap-2 mb-3">
              {product.isNew && (
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">New</span>
              )}
              {product.isOnSale && product.discountPercentage && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                  -{product.discountPercentage}% OFF
                </span>
              )}
              {!product.inStock && (
                <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">Out of Stock</span>
              )}
            </div>

            <h1 className="mb-3">{product.name}</h1>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl text-blue-600">
                ৳{displayPrice.toLocaleString()}
              </span>
              {product.discountPrice && (
                <span className="text-2xl text-gray-400 line-through">
                  ৳{product.price.toLocaleString()}
                </span>
              )}
              {product.discountPrice && (
                <span className="text-green-600">
                  Save ৳{(product.price - product.discountPrice).toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-gray-600 mb-6">{product.shortDescription}</p>

            {/* Variants */}
            {product.variants?.map((variant) => (
              <div key={variant.type} className="mb-6">
                <label className="block mb-3">
                  {variant.type}:
                  {selectedVariants[variant.type] && (
                    <span className="ml-2">{selectedVariants[variant.type]}</span>
                  )}
                </label>
                <div className="flex flex-wrap gap-2">
                  {variant.options.map((option) => (
                    <button
                      key={option.name}
                      onClick={() => handleVariantChange(variant.type, option.name)}
                      disabled={!option.inStock}
                      className={`px-4 py-2 border-2 rounded-lg transition-colors ${
                        selectedVariants[variant.type] === option.name
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : option.inStock
                          ? 'border-gray-300 hover:border-blue-600'
                          : 'border-gray-200 text-gray-400 cursor-not-allowed line-through'
                      }`}
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Quantity */}
            {product.inStock && (
              <div className="mb-6">
                <label className="block mb-3">Quantity:</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-6 py-2 border-x border-gray-300">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                      className="px-4 py-2 hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.stockQuantity} available
                  </span>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                className={`px-4 py-4 border-2 rounded-lg transition-colors ${
                  inWishlist
                    ? 'border-red-500 bg-red-50 text-red-500'
                    : 'border-gray-300 hover:border-red-500 hover:text-red-500'
                }`}
                title="Add to Wishlist"
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
                className={`px-4 py-4 border-2 rounded-lg transition-colors ${
                  inCompare
                    ? 'border-blue-500 bg-blue-50 text-blue-500'
                    : 'border-gray-300 hover:border-blue-500 hover:text-blue-500'
                }`}
                title="Compare"
              >
                <GitCompare className="w-5 h-5" />
              </button>
            </div>

            {/* Additional Info */}
            <div className="space-y-3 pt-6 border-t">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="w-5 h-5 text-blue-600" />
                <span>Free shipping on orders over ৳2000</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RotateCcw className="w-5 h-5 text-blue-600" />
                <span>7-day return policy</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="w-5 h-5 text-blue-600" />
                <span>1 year warranty</span>
              </div>
              <div className="text-sm text-gray-600 pt-2">
                <strong>SKU:</strong> {product.sku}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-12">
          <div className="border-b mb-6">
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab('description')}
                className={`pb-4 transition-colors ${
                  activeTab === 'description'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('specifications')}
                className={`pb-4 transition-colors ${
                  activeTab === 'specifications'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-4 transition-colors ${
                  activeTab === 'reviews'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Reviews ({product.reviewCount})
              </button>
            </div>
          </div>

          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p>{product.description}</p>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex py-3 border-b">
                  <span className="w-1/2 text-gray-600">{key}</span>
                  <span className="w-1/2">{value}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="text-center py-8 text-gray-500">
              Reviews coming soon
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                  toggleWishlist={toggleWishlist}
                  toggleCompare={toggleCompare}
                  isInWishlist={isInWishlist}
                  isInCompare={isInCompare}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
