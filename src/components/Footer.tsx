import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white">TG</span>
              </div>
              <div>
                <div className="text-xl text-white">TechGear</div>
                <div className="text-xs">Premium Accessories</div>
              </div>
            </div>
            <p className="text-sm mb-4">
              Your trusted source for premium tech accessories. Quality products, competitive prices, and exceptional service.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>123 Tech Street, Gulshan-2, Dhaka-1212, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+880 1712-345678</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>info@techgear.com.bd</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
              <li><Link to="/account" className="hover:text-white">My Account</Link></li>
              <li><Link to="/cart" className="hover:text-white">Shopping Cart</Link></li>
              <li><Link to="/wishlist" className="hover:text-white">Wishlist</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/terms" className="hover:text-white">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/return-policy" className="hover:text-white">Return & Refund Policy</Link></li>
              <li><Link to="/contact" className="hover:text-white">Support Center</Link></li>
              <li><Link to="/faq" className="hover:text-white">Shipping Information</Link></li>
              <li><Link to="/faq" className="hover:text-white">Payment Methods</Link></li>
            </ul>
          </div>

          {/* Business Info */}
          <div>
            <h3 className="text-white mb-4">Business Information</h3>
            <div className="space-y-2 text-sm">
              <p><strong className="text-white">Trade License:</strong> TRAD/DNCC/123456/2024</p>
              <p><strong className="text-white">TIN:</strong> 123-456-789-0123</p>
              <p><strong className="text-white">BIN:</strong> 000123456789</p>
              <p><strong className="text-white">Business Hours:</strong></p>
              <p>Sat - Thu: 10:00 AM - 8:00 PM</p>
              <p>Friday: Closed</p>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <h4 className="text-white mb-3">Follow Us</h4>
              <div className="flex gap-3">
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-center md:text-left">
              © 2024 TechGear Bangladesh. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm">
              <span>We Accept:</span>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-gray-800 rounded">bKash</span>
                <span className="px-2 py-1 bg-gray-800 rounded">Nagad</span>
                <span className="px-2 py-1 bg-gray-800 rounded">VISA</span>
                <span className="px-2 py-1 bg-gray-800 rounded">Mastercard</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
