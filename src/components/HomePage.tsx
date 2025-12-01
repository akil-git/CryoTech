import { Link } from 'react-router-dom';
import { ChevronRight, TrendingUp, Tag, Package } from 'lucide-react';
import ProductCard from './ProductCard';
import { categories, products } from '../lib/data';
import { CartItem, WishlistItem, CompareItem } from '../lib/types';
import * as Icons from 'lucide-react';

interface HomePageProps {
  addToCart: (item: CartItem) => void;
  toggleWishlist: (item: WishlistItem) => void;
  toggleCompare: (item: CompareItem) => void;
  isInWishlist: (productId: string) => boolean;
  isInCompare: (productId: string) => boolean;
}

export default function HomePage({
  addToCart,
  toggleWishlist,
  toggleCompare,
  isInWishlist,
  isInCompare,
}: HomePageProps) {
  const featuredProducts = products.filter(p => p.isFeatured);
  const onSaleProducts = products.filter(p => p.isOnSale);
  const newProducts = products.filter(p => p.isNew);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl mb-4">
            CryoTech
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Fulfill your tech needs One product at a time
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/category/mobile-accessories"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Shop Now
              </Link>
              <Link
                to="/about"
                className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3>Free Shipping</h3>
                <p className="text-sm text-gray-600">On orders over ৳2000</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3>Best Quality</h3>
                <p className="text-sm text-gray-600">Premium products guaranteed</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Tag className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3>Best Prices</h3>
                <p className="text-sm text-gray-600">Competitive pricing daily</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(category => {
              const IconComponent = (Icons as any)[category.icon] || Icons.Package;
              return (
                <Link
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className="bg-white p-6 rounded-lg text-center hover:shadow-lg transition-shadow group"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-600 transition-colors">
                    <IconComponent className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-sm">{category.name}</h3>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2>Featured Products</h2>
            <Link to="/category/mobile-accessories" className="text-blue-600 hover:underline flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 8).map(product => (
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
      </section>

      {/* Flash Sale / On Sale */}
      <section className="py-12 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-red-600">Flash Sale</h2>
              <p className="text-gray-600">Limited time offers - grab them now!</p>
            </div>
            <Link to="/category/audio-devices" className="text-red-600 hover:underline flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {onSaleProducts.slice(0, 4).map(product => (
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
      </section>

      {/* New Arrivals */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2>New Arrivals</h2>
              <p className="text-gray-600">Check out our latest products</p>
            </div>
            <Link to="/category/wearables" className="text-blue-600 hover:underline flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.slice(0, 4).map(product => (
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
      </section>

      {/* Newsletter */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4">Subscribe to Our Newsletter</h2>
          <p className="mb-6 text-gray-300 max-w-2xl mx-auto">
            Get the latest updates on new products, exclusive offers, and tech news delivered to your inbox
          </p>
          <form className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
