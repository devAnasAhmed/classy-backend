// Seed initial data
require('dotenv').config();
const connectDB = require('./config/db');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Category = require('./models/Category');
const Product = require('./models/Product');

const seed = async () => {
  try {
    await connectDB();

    // Clear existing
    await User.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();

    // Create admin user
    const admin = await User.create({
      name: 'أنس',
      email: process.env.ADMIN_EMAIL || 'admin@classy.com',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      role: 'admin'
    });
    console.log('✅ Admin created:', admin.email);

    // Create categories
    const categories = await Category.insertMany([
      { name: 'كتب تلوين', slug: 'coloring-books', description: 'كتب تلوين للكبار والأطفال', icon: '🎨', sortOrder: 1 },
      { name: 'بوكسات ورد', slug: 'flower-boxes', description: 'بوكسات خشبية بورد طبيعي مجفف', icon: '🌹', sortOrder: 2 },
      { name: 'نوتات مخصصة', slug: 'notebooks', description: 'نوتات A5 بتصاميم فنية', icon: '📓', sortOrder: 3 },
      { name: 'تغريسات تخرج', slug: 'graduation-toppers', description: 'تغريسات خشبية لحفلات التخرج', icon: '🎓', sortOrder: 4 },
      { name: 'براويز مواليد', slug: 'baby-frames', description: 'براويز خشبية بتفاصيل الميلاد', icon: '👶', sortOrder: 5 },
    ]);
    console.log('✅ Categories created:', categories.length);

    // Create sample products
    const products = await Product.insertMany([
      {
        name: 'كتاب تلوين Mandala للكبار',
        description: 'كتاب تلوين فاخر بتصاميم Mandala معقدة. 100 ورقة سميكة.',
        price: 120, stock: 25, category: 'كتب تلوين',
        image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=400&h=400&fit=crop',
        rating: 4.9, reviews: 45, tags: ['تلوين', 'Mandala', 'استرخاء']
      },
      {
        name: 'بوكس ورد طبيعي مجفف',
        description: 'بوكس خشبي أنيق بورد طبيعي مجفف بألوان وردية.',
        price: 350, stock: 10, category: 'بوكسات ورد',
        image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&h=400&fit=crop',
        rating: 4.8, reviews: 32, tags: ['ورد مجفف', 'هدية زفاف']
      },
      {
        name: 'نوتة Van Gogh',
        description: 'نوتة A5 بتصميم فني مستوحى من The Starry Night.',
        price: 85, stock: 30, category: 'نوتات مخصصة',
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=400&fit=crop',
        rating: 4.7, reviews: 28, tags: ['نوتة', 'فن', 'Van Gogh']
      },
      {
        name: 'تغريسة تخرج Senior',
        description: 'تغريسة خشبية مخصصة بصورة الطالب وعبارة Senior.',
        price: 60, stock: 50, category: 'تغريسات تخرج',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=400&fit=crop',
        rating: 4.9, reviews: 65, tags: ['تخرج', 'Senior']
      },
      {
        name: 'برواز مولود',
        description: 'برواز خشبي بتفاصيل ميلاد الطفل بالألوان الباستيل.',
        price: 200, stock: 15, category: 'براويز مواليد',
        image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop',
        rating: 5.0, reviews: 40, tags: ['مولود', 'برواز']
      },
    ]);
    console.log('✅ Products created:', products.length);

    console.log('\n🎉 Seed completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
};

seed();
