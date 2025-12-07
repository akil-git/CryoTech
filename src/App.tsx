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
import { CompareItem } from './lib/types';
import { useAuth } from './contexts/AuthContext';
import { useCart } from './hooks/useCart';
import { useWishlist } from './hooks/useWishlist';

export default function App() {
  const { user } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [compareList, setCompareList] = useState<CompareItem[]>([]);

  // Load compare list from localStorage on mount
  useEffect(() => {
    const savedCompare = localStorage.getItem('compare');
    if (savedCompare) setCompareList(JSON.parse(savedCompare));
  }, []);

  // Save compare list to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('compare', JSON.stringify(compareList));
  }, [compareList]);

  const toggleCompare = (item: CompareItem) => {
    setCompareList((prev) => {
      const exists = prev.find((i) => i.productId === item.productId);
      if (exists) {
        return prev.filter((i) => i.productId !== item.productId);
      }
      if (prev.length >= 4) {
        alert('You can compare up to 4 products at a time');
        return prev;
      }
      return [...prev, item];
    });
  };

  const isInCompare = (productId: string) => {
    return compareList.some((item) => item.productId === productId);
  };

  return (
    <Router>
      <div className="container mx-auto px-4">
        <Header
          cartCount={cartCount}
          wishlistCount={wishlistCount}
          compareCount={compareList.length}
          user={user}
        />

        <main className="flex-1">
          <div className="max-w-[1400px] mx-auto px-4">
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    toggleCompare={toggleCompare}
                    isInCompare={isInCompare}
                  />
                }
              />

              <Route
                path="/category/:slug"
                element={
                  <CategoryPage
                    toggleCompare={toggleCompare}
                    isInCompare={isInCompare}
                  />
                }
              />

              <Route
                path="/product/:id"
                element={
                  <ProductDetailPage
                    toggleCompare={toggleCompare}
                    isInCompare={isInCompare}
                  />
                }
              />

              <Route path="/cart" element={<CartPage />} />

              <Route path="/wishlist" element={<WishlistPage />} />

              <Route
                path="/compare"
                element={
                  <ComparePage
                    compareList={compareList}
                    toggleCompare={toggleCompare}
                  />
                }
              />

              <Route path="/checkout" element={<CheckoutPage />} />

              <Route path="/login" element={<LoginPage />} />

              <Route path="/account" element={<AccountPage />} />

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
