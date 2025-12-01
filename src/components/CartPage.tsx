import { Link } from 'react-router-dom';
import { Plus, Minus, X, ShoppingBag } from 'lucide-react';
import { CartItem } from '../lib/types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CartPageProps {
  cart: CartItem[];
  removeFromCart: (productId: string, variant?: any) => void;
  updateCartQuantity: (productId: string, quantity: number, variant?: any) => void;
}

export default function CartPage({ cart, removeFromCart, updateCartQuantity }: CartPageProps) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 2000 ? 0 : 100;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h2 className="mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added any items to your cart yet
          </p>
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8">Shopping Cart ({cart.length} items)</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm">
            {cart.map((item, index) => (
              <div
                key={`${item.productId}-${JSON.stringify(item.selectedVariant)}`}
                className={`p-4 flex gap-4 ${
                  index !== cart.length - 1 ? 'border-b' : ''
                }`}
              >
                <Link
                  to={`/product/${item.productId}`}
                  className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0"
                >
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.productId}`} className="hover:text-blue-600">
                    <h3 className="mb-1 line-clamp-1">{item.name}</h3>
                  </Link>
                  
                  {item.selectedVariant && (
                    <p className="text-sm text-gray-600 mb-2">
                      {Object.entries(item.selectedVariant).map(([key, value]) => (
                        <span key={key} className="mr-3">
                          {key}: {value}
                        </span>
                      ))}
                    </p>
                  )}

                  <p className="text-blue-600 mb-3">
                    ৳{item.price.toLocaleString()}
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() =>
                          updateCartQuantity(
                            item.productId,
                            Math.max(1, item.quantity - 1),
                            item.selectedVariant
                          )
                        }
                        className="px-3 py-1 hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-1 border-x border-gray-300">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateCartQuantity(
                            item.productId,
                            Math.min(item.maxStock, item.quantity + 1),
                            item.selectedVariant
                          )
                        }
                        className="px-3 py-1 hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.productId, item.selectedVariant)}
                      className="text-red-600 hover:text-red-700 text-sm flex items-center gap-1"
                    >
                      <X className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="">
                    ৳{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/"
            className="inline-block mt-4 text-blue-600 hover:underline"
          >
            ← Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h3 className="mb-4">Order Summary</h3>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>৳{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping:</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `৳${shipping}`
                  )}
                </span>
              </div>
              {subtotal < 2000 && (
                <p className="text-sm text-orange-600">
                  Add ৳{(2000 - subtotal).toLocaleString()} more for free shipping
                </p>
              )}
              <div className="pt-3 border-t flex justify-between">
                <span>Total:</span>
                <span className="text-2xl text-blue-600">
                  ৳{total.toLocaleString()}
                </span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors mb-3"
            >
              Proceed to Checkout
            </Link>

            <button className="w-full border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition-colors">
              Apply Coupon Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
