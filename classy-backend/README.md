# CLASSY Admin Backend

نظام إدارة متجر CLASSY — باك اند كامل بـ Node.js + Express + MongoDB

## 🚀 التشغيل السريع

```bash
# 1. تثبيت الحزم
npm install

# 2. إنشاء ملف .env
cp .env.example .env
# عدل MONGODB_URI و JWT_SECRET

# 3. تشغيل السيد (اختياري — يملي البيانات الأولية)
npm run seed

# 4. تشغيل السيرفر
npm run dev
```

## 🔑 بيانات الدخول الافتراضية

- **Email:** `admin@classy.com`
- **Password:** `admin123`

## 📁 هيكل المشروع

```
├── server.js              # نقطة الدخول
├── config/
│   └── db.js              # اتصال MongoDB
├── models/
│   ├── User.js            # مستخدمين الأدمن
│   ├── Product.js         # المنتجات
│   ├── Order.js           # الطلبات
│   ├── Category.js        # التصنيفات
│   └── Gallery.js         # معرض الأعمال
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   ├── orderController.js
│   ├── categoryController.js
│   ├── galleryController.js
│   └── dashboardController.js
├── routes/
│   ├── auth.js
│   ├── products.js
│   ├── orders.js
│   ├── categories.js
│   ├── gallery.js
│   └── dashboard.js
├── middleware/
│   └── auth.js            # JWT + Admin check
├── uploads/               # صور مرفوعة
├── seed.js                # بيانات أولية
└── .env.example
```

## 🔌 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | تسجيل أدمن جديد | ❌ |
| POST | `/api/auth/login` | تسجيل الدخول | ❌ |
| GET | `/api/auth/me` | بياناتي | ✅ |
| GET | `/api/products` | كل المنتجات | ❌ |
| POST | `/api/products` | إضافة منتج | ✅👑 |
| PUT | `/api/products/:id` | تعديل منتج | ✅👑 |
| DELETE | `/api/products/:id` | حذف منتج | ✅👑 |
| GET | `/api/orders` | كل الطلبات | ✅👑 |
| POST | `/api/orders` | إنشاء طلب (عميل) | ❌ |
| PUT | `/api/orders/:id` | تعديل طلب | ✅👑 |
| PATCH | `/api/orders/:id/status` | تعديل حالة الطلب | ✅👑 |
| DELETE | `/api/orders/:id` | حذف طلب | ✅👑 |
| GET | `/api/categories` | التصنيفات | ❌ |
| GET | `/api/gallery` | معرض الأعمال | ❌ |
| GET | `/api/dashboard/stats` | إحصائيات اللوحة | ✅👑 |

✅ = يحتاج توكن  |  👑 = يحتاج صلاحية admin

## 🛡️ حالات الطلب (Order Status)

- `pending` — قيد المراجعة
- `processing` — قيد المعالجة
- `delivered` — تم التسليم
- `cancelled` — إلغاء
