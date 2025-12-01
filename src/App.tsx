import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import CategoryPage from './components/CategoryPage';
import ProductDetailPage from './components/ProductDetailPage';
import CartPage from './components/CartPage';
import WishlistPage from './components/WishlistPage';
import ComparePage from './components/ComparePage';
import CheckoutPage from './components/CheckoutPage';
import LoginPage from './components/LoginPage';
import AccountPage from './components/AccountPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import ReturnPolicyPage from './pages/ReturnPolicyPage';
import FAQPage from './pages/FAQPage';
import { CartItem, WishlistItem, CompareItem, User } from './lib/types';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [compareList, setCompareList] = useState<CompareItem[]>([]);
  const [user, setUser] = useState<User | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedWishlist = localStorage.getItem('wishlist');
    const savedCompare = localStorage.getItem('compare');
    const savedUser = localStorage.getItem('user');

    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    if (savedCompare) setCompareList(JSON.parse(savedCompare));
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('compare', JSON.stringify(compareList));
  }, [compareList]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => 
        i.productId === item.productId && 
        JSON.stringify(i.selectedVariant) === JSON.stringify(item.selectedVariant)
      );
      
      if (existing) {
        return prev.map(i => 
          i.productId === item.productId && 
          JSON.stringify(i.selectedVariant) === JSON.stringify(item.selectedVariant)
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      
      return [...prev, item];
    });
  };

  const removeFromCart = (productId: string, variant?: any) => {
    setCart(prev => prev.filter(item => 
      !(item.productId === productId && 
        JSON.stringify(item.selectedVariant) === JSON.stringify(variant))
    ));
  };

  const updateCartQuantity = (productId: string, quantity: number, variant?: any) => {
    setCart(prev => prev.map(item => 
      item.productId === productId && 
      JSON.stringify(item.selectedVariant) === JSON.stringify(variant)
        ? { ...item, quantity }
        : item
    ));
  };

  const toggleWishlist = (item: WishlistItem) => {
    setWishlist(prev => {
      const exists = prev.find(i => i.productId === item.productId);
      if (exists) {
        return prev.filter(i => i.productId !== item.productId);
      }
      return [...prev, item];
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.productId === productId);
  };

  const toggleCompare = (item: CompareItem) => {
    setCompareList(prev => {
      const exists = prev.find(i => i.productId === item.productId);
      if (exists) {
        return prev.filter(i => i.productId !== item.productId);
      }
      if (prev.length >= 4) {
        alert('You can compare up to 4 products at a time');
        return prev;
      }
      return [...prev, item];
    });
  };

  const isInCompare = (productId: string) => {
    return compareList.some(item => item.productId === productId);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
  <Router>
      <div className="container mx-auto px-4">
        <Header 
          cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
          wishlistCount={wishlist.length}
          compareCount={compareList.length}
          user={user}
        />

        <main className="flex-1">
        <div  className="max-w-[1400px] mx-auto px-4">
  <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  addToCart={addToCart}
                  toggleWishlist={toggleWishlist}
                  toggleCompare={toggleCompare}
                  isInWishlist={isInWishlist}
                  isInCompare={isInCompare}
                />
              }
            />

            <Route
              path="/category/:slug"
              element={
                <CategoryPage
                  addToCart={addToCart}
                  toggleWishlist={toggleWishlist}
                  toggleCompare={toggleCompare}
                  isInWishlist={isInWishlist}
                  isInCompare={isInCompare}
                />
              }
            />

            <Route
              path="/product/:id"
              element={
                <ProductDetailPage
                  addToCart={addToCart}
                  toggleWishlist={toggleWishlist}
                  toggleCompare={toggleCompare}
                  isInWishlist={isInWishlist}
                  isInCompare={isInCompare}
                />
              }
            />

            <Route
              path="/cart"
              element={
                <CartPage
                  cart={cart}
                  removeFromCart={removeFromCart}
                  updateCartQuantity={updateCartQuantity}
                />
              }
            />

            <Route
              path="/wishlist"
              element={
                <WishlistPage
                  wishlist={wishlist}
                  toggleWishlist={toggleWishlist}
                  addToCart={addToCart}
                />
              }
            />

            <Route
              path="/compare"
              element={
                <ComparePage
                  compareList={compareList}
                  toggleCompare={toggleCompare}
                  addToCart={addToCart}
                />
              }
            />

            <Route
              path="/checkout"
              element={
                <CheckoutPage
                  cart={cart}
                  user={user}
                  clearCart={clearCart}
                />
              }
            />

            <Route path="/login" element={<LoginPage setUser={setUser} />} />

            <Route path="/account" element={<AccountPage user={user} setUser={setUser} />} />

            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/return-policy" element={<ReturnPolicyPage />} />
            <Route path="/faq" element={<FAQPage />} />
          </Routes>
        </div>
        </main>

        <Footer />
      </div>
  </Router>
);

}
