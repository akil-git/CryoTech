import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      category: 'Orders & Payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept Cash on Delivery (COD), bKash, Nagad, and Credit/Debit Cards via SSLCommerz. All payment methods are secure and reliable.',
    },
    {
      category: 'Orders & Payment',
      question: 'How do I track my order?',
      answer: 'Once your order is shipped, you will receive a tracking number via email and SMS. You can use this number to track your order on our website or the courier\'s website.',
    },
    {
      category: 'Orders & Payment',
      question: 'Can I cancel or modify my order?',
      answer: 'You can cancel your order before it is shipped by contacting our customer service. Once shipped, you can refuse delivery or return the item according to our return policy.',
    },
    {
      category: 'Shipping & Delivery',
      question: 'How long does delivery take?',
      answer: 'For orders within Dhaka, delivery typically takes 2-3 business days. For orders outside Dhaka, it takes 5-7 business days. Express delivery options are available for an additional charge.',
    },
    {
      category: 'Shipping & Delivery',
      question: 'Do you offer free shipping?',
      answer: 'Yes! We offer free shipping on all orders over ৳2000. For orders below ৳2000, a flat shipping fee of ৳100 applies.',
    },
    {
      category: 'Shipping & Delivery',
      question: 'Do you ship internationally?',
      answer: 'Currently, we only ship within Bangladesh. We are working on expanding our shipping coverage to international destinations in the future.',
    },
    {
      category: 'Returns & Refunds',
      question: 'What is your return policy?',
      answer: 'We accept returns within 7 days of delivery for most items in their original, unopened condition. Please see our Return & Refund Policy page for complete details.',
    },
    {
      category: 'Returns & Refunds',
      question: 'How long does it take to receive a refund?',
      answer: 'Refund processing time varies by payment method: Cash on Delivery (7-10 business days), bKash/Nagad (3-5 business days), and Credit/Debit Card (7-14 business days).',
    },
    {
      category: 'Returns & Refunds',
      question: 'What if I receive a defective product?',
      answer: 'If you receive a defective or damaged product, please contact us within 48 hours of delivery. We will arrange for a replacement or full refund, including shipping costs.',
    },
    {
      category: 'Products & Stock',
      question: 'Are all products genuine?',
      answer: 'Yes, all our products are 100% genuine and sourced from authorized distributors. Each product comes with manufacturer warranty as specified.',
    },
    {
      category: 'Products & Stock',
      question: 'What if an item is out of stock?',
      answer: 'If an item is out of stock, you can sign up for email notifications when it becomes available again. Alternatively, contact our customer service for information on restock dates.',
    },
    {
      category: 'Products & Stock',
      question: 'Do your products come with warranty?',
      answer: 'Yes, most products come with manufacturer warranty. The warranty period and terms are mentioned in each product description. We assist with warranty claims.',
    },
    {
      category: 'Account & Security',
      question: 'Do I need to create an account to make a purchase?',
      answer: 'No, you can checkout as a guest. However, creating an account allows you to track orders, save addresses, and manage your wishlist more easily.',
    },
    {
      category: 'Account & Security',
      question: 'Is my personal information secure?',
      answer: 'Yes, we take data security seriously. All personal information is encrypted and stored securely. We never share your information with third parties without your consent.',
    },
    {
      category: 'Account & Security',
      question: 'How do I reset my password?',
      answer: 'Click on "Forgot Password" on the login page and enter your email address. You will receive a password reset link via email within minutes.',
    },
    {
      category: 'General',
      question: 'How can I contact customer support?',
      answer: 'You can reach us via email at support@techgear.com.bd, call us at +880 1712-345678, or use the contact form on our Contact page. Our support hours are Saturday-Thursday, 10 AM - 8 PM.',
    },
    {
      category: 'General',
      question: 'Do you have a physical store?',
      answer: 'Currently, we operate as an online-only store. However, you can visit our office at 123 Tech Street, Gulshan-2, Dhaka during business hours for product inquiries.',
    },
    {
      category: 'General',
      question: 'Can I request a specific product not listed on your website?',
      answer: 'Yes! Contact our customer service with the product details, and we\'ll do our best to source it for you. We\'re always looking to expand our product range based on customer needs.',
    },
  ];

  const categories = Array.from(new Set(faqs.map(faq => faq.category)));

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-blue-100">
            Find answers to common questions about our products and services
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {categories.map(category => (
              <div key={category} className="mb-8">
                <h2 className="mb-4 pb-2 border-b">{category}</h2>
                <div className="space-y-3">
                  {faqs
                    .filter(faq => faq.category === category)
                    .map((faq, index) => {
                      const globalIndex = faqs.indexOf(faq);
                      const isOpen = openIndex === globalIndex;
                      
                      return (
                        <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                          <button
                            onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                          >
                            <span className="text-left pr-4">{faq.question}</span>
                            <ChevronDown
                              className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                                isOpen ? 'transform rotate-180' : ''
                              }`}
                            />
                          </button>
                          
                          {isOpen && (
                            <div className="px-6 pb-4 text-gray-600">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-6">
            Can't find the answer you're looking for? Our customer support team is here to help.
          </p>
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </section>
    </div>
  );
}
