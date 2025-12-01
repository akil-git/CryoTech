import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Heart, GitCompare, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { categories } from '../lib/data';
import { User as UserType } from '../lib/types';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  compareCount: number;
  user: UserType | null;
}

export default function Header({ cartCount, wishlistCount, compareCount, user }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, this would navigate to search results
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <p className="text-sm">Free shipping on orders over ৳2000</p>
            <div className="flex items-center gap-4 text-sm">
              <Link to="/faq" className="hover:text-gray-300">Help</Link>
              <Link to="/contact" className="hover:text-gray-300">Contact</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white">C</span>
            </div>
            <div>
              <div className="text-xl">Cryotech</div>
              <div className="text-xs text-gray-500">Premium Accessories</div>
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-blue-600"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link to="/wishlist" className="relative p-2 hover:text-blue-600 hidden sm:block">
              <Heart className="w-6 h-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link to="/compare" className="relative p-2 hover:text-blue-600 hidden sm:block">
              <GitCompare className="w-6 h-6" />
              {compareCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {compareCount}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative p-2 hover:text-blue-600">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link to={user ? "/account" : "/login"} className="p-2 hover:text-blue-600 hidden sm:block">
              <User className="w-6 h-6" />
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:text-blue-600 md:hidden"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="mt-4 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-blue-600"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>

      {/* Navigation */}
      <nav className={`bg-gray-50 border-t ${isMenuOpen ? 'block' : 'hidden md:block'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3 gap-2">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
              {categories.map(category => (
                <Link
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className="px-3 py-2 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
            
            <div className="flex flex-col md:flex-row gap-2 md:gap-6 md:items-center pt-2 md:pt-0 border-t md:border-t-0">
              <Link to="/about" className="px-3 py-2 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
              <Link to="/contact" className="px-3 py-2 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
