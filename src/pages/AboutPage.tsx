import { CheckCircle, Award, Truck, Headphones } from 'lucide-react';

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4">About TechGear</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Your trusted partner for premium tech accessories since 2020
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-6 text-center">Our Story</h2>
            <div className="prose max-w-none text-gray-600 space-y-4">
              <p>
                Founded in 2020, TechGear Bangladesh has grown to become one of the leading providers of 
                premium tech accessories in Bangladesh. What started as a small online store has evolved 
                into a trusted brand serving thousands of satisfied customers across the country.
              </p>
              <p>
                We believe that quality tech accessories shouldn't break the bank. That's why we carefully 
                curate our product selection to offer the best combination of quality, functionality, and 
                value. Every product we sell is thoroughly tested and verified to meet our high standards.
              </p>
              <p>
                Our mission is simple: to make premium tech accessories accessible to everyone in Bangladesh. 
                We work directly with manufacturers and authorized distributors to ensure authenticity and 
                competitive pricing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center">Why Choose TechGear?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="mb-2">Authentic Products</h3>
              <p className="text-gray-600">
                100% genuine products from authorized distributors with warranty
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="mb-2">Best Quality</h3>
              <p className="text-gray-600">
                Premium quality products tested for durability and performance
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Quick and reliable delivery across Bangladesh
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="mb-2">Customer Support</h3>
              <p className="text-gray-600">
                Dedicated support team ready to help you anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div>
              <h3 className="mb-3">Quality First</h3>
              <p className="text-gray-600">
                We never compromise on quality. Every product goes through rigorous quality checks 
                before reaching you.
              </p>
            </div>

            <div>
              <h3 className="mb-3">Customer Satisfaction</h3>
              <p className="text-gray-600">
                Your satisfaction is our priority. We're not happy until you're completely satisfied 
                with your purchase.
              </p>
            </div>

            <div>
              <h3 className="mb-3">Integrity & Trust</h3>
              <p className="text-gray-600">
                We build lasting relationships with our customers through honesty, transparency, 
                and reliable service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6">Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Behind TechGear is a passionate team of tech enthusiasts dedicated to bringing you 
            the best products and service. We're always here to help you find the perfect accessory 
            for your devices.
          </p>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-6">
            Have questions? We'd love to hear from you.
          </p>
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
