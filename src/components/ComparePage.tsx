import { Link } from 'react-router-dom';
import { GitCompare, ShoppingCart, X, Star } from 'lucide-react';
import { CompareItem, CartItem } from '../lib/types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ComparePageProps {
  compareList: CompareItem[];
  toggleCompare: (item: CompareItem) => void;
  addToCart: (item: CartItem) => void;
}

export default function ComparePage({ compareList, toggleCompare, addToCart }: ComparePageProps) {
  const handleAddToCart = (item: CompareItem) => {
    addToCart({
      productId: item.productId,
      name: item.name,
      price: item.discountPrice || item.price,
      image: item.image,
      quantity: 1,
      maxStock: 100,
    });
  };

  if (compareList.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          <GitCompare className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h2 className="mb-2">No products to compare</h2>
          <p className="text-gray-600 mb-6">
            Add products to compare their features and specifications
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

  // Get all unique specification keys
  const allSpecKeys = Array.from(
    new Set(
      compareList.flatMap(item => Object.keys(item.specifications))
    )
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2">Compare Products</h1>
        <p className="text-gray-600">
          Comparing {compareList.length} product{compareList.length !== 1 ? 's' : ''} (maximum 4)
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-sm">
          <tbody>
            {/* Product Images & Names */}
            <tr>
              <td className="p-4 w-48 align-top bg-gray-50"></td>
              {compareList.map(item => (
                <td key={item.productId} className="p-4 align-top border-l">
                  <div className="relative">
                    <button
                      onClick={() => toggleCompare(item)}
                      className="absolute top-0 right-0 p-2 bg-white rounded-full shadow-md text-gray-600 hover:text-red-600 transition-colors z-10"
                      title="Remove from comparison"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    
                    <Link to={`/product/${item.productId}`}>
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                    </Link>
                    
                    <Link to={`/product/${item.productId}`} className="hover:text-blue-600">
                      <h3 className="mb-2 line-clamp-2">
                        {item.name}
                      </h3>
                    </Link>
                  </div>
                </td>
              ))}
            </tr>

            {/* Price */}
            <tr className="border-t">
              <td className="p-4 bg-gray-50">
                <span>Price</span>
              </td>
              {compareList.map(item => {
                const displayPrice = item.discountPrice || item.price;
                return (
                  <td key={item.productId} className="p-4 border-l">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl text-blue-600">
                        ৳{displayPrice.toLocaleString()}
                      </span>
                      {item.discountPrice && (
                        <span className="text-gray-400 line-through">
                          ৳{item.price.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>

            {/* Rating */}
            <tr className="border-t">
              <td className="p-4 bg-gray-50">
                <span>Rating</span>
              </td>
              {compareList.map(item => (
                <td key={item.productId} className="p-4 border-l">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(item.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm">{item.rating}</span>
                  </div>
                </td>
              ))}
            </tr>

            {/* Specifications */}
            {allSpecKeys.map(key => (
              <tr key={key} className="border-t">
                <td className="p-4 bg-gray-50">
                  <span>{key}</span>
                </td>
                {compareList.map(item => (
                  <td key={item.productId} className="p-4 border-l">
                    <span className="text-gray-700">
                      {item.specifications[key] || '-'}
                    </span>
                  </td>
                ))}
              </tr>
            ))}

            {/* Add to Cart Buttons */}
            <tr className="border-t">
              <td className="p-4 bg-gray-50"></td>
              {compareList.map(item => (
                <td key={item.productId} className="p-4 border-l">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {compareList.length < 4 && (
        <div className="mt-6 text-center">
          <p className="text-gray-600 mb-4">
            You can add up to {4 - compareList.length} more product{4 - compareList.length !== 1 ? 's' : ''} to compare
          </p>
          <Link
            to="/"
            className="inline-block text-blue-600 hover:underline"
          >
            Continue Shopping →
          </Link>
        </div>
      )}
    </div>
  );
}
