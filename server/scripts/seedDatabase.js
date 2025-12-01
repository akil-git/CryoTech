import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import User from '../models/User.js';

// Load env vars
dotenv.config();

// Sample data based on your frontend
const categories = [
  {
    name: 'Mobile Accessories',
    slug: 'mobile-accessories',
    icon: 'Smartphone',
    subCategories: [
      { id: '1-1', name: 'Phone Cases', slug: 'phone-cases' },
      { id: '1-2', name: 'Screen Protectors', slug: 'screen-protectors' },
      { id: '1-3', name: 'Power Banks', slug: 'power-banks' },
      { id: '1-4', name: 'Chargers & Cables', slug: 'chargers-cables' },
      { id: '1-5', name: 'Car Mounts', slug: 'car-mounts' },
    ],
  },
  {
    name: 'Audio Devices',
    slug: 'audio-devices',
    icon: 'Headphones',
    subCategories: [
      { id: '2-1', name: 'Wireless Earbuds', slug: 'wireless-earbuds' },
      { id: '2-2', name: 'Headphones', slug: 'headphones' },
      { id: '2-3', name: 'Bluetooth Speakers', slug: 'bluetooth-speakers' },
      { id: '2-4', name: 'Gaming Headsets', slug: 'gaming-headsets' },
    ],
  },
  {
    name: 'Computer Accessories',
    slug: 'computer-accessories',
    icon: 'Monitor',
    subCategories: [
      { id: '3-1', name: 'Keyboards', slug: 'keyboards' },
      { id: '3-2', name: 'Mice', slug: 'mice' },
      { id: '3-3', name: 'Webcams', slug: 'webcams' },
      { id: '3-4', name: 'USB Hubs', slug: 'usb-hubs' },
      { id: '3-5', name: 'Laptop Stands', slug: 'laptop-stands' },
    ],
  },
  {
    name: 'Gaming Gear',
    slug: 'gaming-gear',
    icon: 'Gamepad2',
    subCategories: [
      { id: '4-1', name: 'Gaming Keyboards', slug: 'gaming-keyboards' },
      { id: '4-2', name: 'Gaming Mice', slug: 'gaming-mice' },
      { id: '4-3', name: 'Mouse Pads', slug: 'mouse-pads' },
      { id: '4-4', name: 'Controllers', slug: 'controllers' },
    ],
  },
  {
    name: 'Storage & Memory',
    slug: 'storage-memory',
    icon: 'HardDrive',
    subCategories: [
      { id: '5-1', name: 'External SSDs', slug: 'external-ssds' },
      { id: '5-2', name: 'Flash Drives', slug: 'flash-drives' },
      { id: '5-3', name: 'Memory Cards', slug: 'memory-cards' },
      { id: '5-4', name: 'External HDDs', slug: 'external-hdds' },
    ],
  },
  {
    name: 'Wearables',
    slug: 'wearables',
    icon: 'Watch',
    subCategories: [
      { id: '6-1', name: 'Smart Watches', slug: 'smart-watches' },
      { id: '6-2', name: 'Fitness Trackers', slug: 'fitness-trackers' },
      { id: '6-3', name: 'Watch Bands', slug: 'watch-bands' },
    ],
  },
];

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Category.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Create categories
    console.log('📦 Creating categories...');
    const createdCategories = await Category.insertMany(categories);
    console.log(`✅ Created ${createdCategories.length} categories`);

    // Create sample products
    console.log('📦 Creating sample products...');
    const products = [
      {
        name: 'Premium Silicone Phone Case',
        slug: 'premium-silicone-phone-case',
        description: 'Protect your phone with our premium silicone case. Features shock-absorption technology and a slim design that fits perfectly in your hand.',
        shortDescription: 'Slim, protective silicone case with shock absorption',
        categoryId: createdCategories[0]._id,
        subCategoryId: '1-1',
        price: 1299,
        discountPrice: 999,
        discountPercentage: 23,
        images: ['phone-case', 'phone-accessories', 'mobile-protection'],
        inStock: true,
        stockQuantity: 150,
        isOnSale: true,
        isFeatured: true,
        isNew: false,
        specifications: {
          'Material': 'Premium Silicone',
          'Drop Protection': 'Up to 6 feet',
          'Weight': '28g',
          'Wireless Charging': 'Compatible',
        },
        rating: 4.5,
        reviewCount: 234,
        sku: 'PSC-001',
      },
      {
        name: 'Wireless Earbuds Pro',
        slug: 'wireless-earbuds-pro',
        description: 'Experience premium sound quality with active noise cancellation. 30-hour battery life with charging case. IPX5 water resistance for workouts.',
        shortDescription: 'ANC wireless earbuds with 30hr battery',
        categoryId: createdCategories[1]._id,
        subCategoryId: '2-1',
        price: 8999,
        discountPrice: 6999,
        discountPercentage: 22,
        images: ['wireless-earbuds', 'audio-headphones', 'earphones-black'],
        inStock: true,
        stockQuantity: 87,
        isOnSale: true,
        isFeatured: true,
        isNew: true,
        specifications: {
          'Driver Size': '10mm',
          'Bluetooth': '5.3',
          'Battery Life': '30 hours (with case)',
          'Water Resistance': 'IPX5',
          'ANC': 'Yes',
        },
        rating: 4.7,
        reviewCount: 567,
        sku: 'WEP-002',
      },
      {
        name: '20000mAh Fast Charging Power Bank',
        slug: 'fast-charging-power-bank-20000mah',
        description: 'Keep your devices charged on the go with this high-capacity power bank. Features 30W fast charging and can charge up to 3 devices simultaneously.',
        shortDescription: 'High-capacity 20000mAh power bank with fast charging',
        categoryId: createdCategories[0]._id,
        subCategoryId: '1-3',
        price: 3499,
        images: ['power-bank', 'portable-charger', 'battery-pack'],
        inStock: true,
        stockQuantity: 45,
        isOnSale: false,
        isFeatured: true,
        isNew: false,
        specifications: {
          'Capacity': '20000mAh',
          'Input': 'USB-C 30W',
          'Output': '2x USB-A, 1x USB-C',
          'Fast Charging': 'PD 3.0, QC 3.0',
          'Weight': '420g',
        },
        rating: 4.6,
        reviewCount: 892,
        sku: 'PB-003',
      },
    ];

    const createdProducts = await Product.insertMany(products);
    console.log(`✅ Created ${createdProducts.length} sample products`);

    // Create admin user
    console.log('👤 Creating admin user...');
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@cryotech.com',
      password: 'admin123',
      role: 'admin',
    });
    console.log(`✅ Created admin user: ${adminUser.email}`);

    // Create test user
    console.log('👤 Creating test user...');
    const testUser = await User.create({
      name: 'Test User',
      email: 'user@test.com',
      password: 'test123',
      role: 'user',
    });
    console.log(`✅ Created test user: ${testUser.email}`);

    console.log('');
    console.log('✅ Database seeded successfully!');
    console.log('');
    console.log('📝 Login Credentials:');
    console.log('   Admin: admin@cryotech.com / admin123');
    console.log('   User:  user@test.com / test123');
    console.log('');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
