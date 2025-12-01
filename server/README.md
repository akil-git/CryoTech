# CryoTech Backend Server

Production-level MERN backend for CryoTech E-commerce platform.

## 🚀 Features

- **RESTful API** with Express.js
- **MongoDB** database with Mongoose ODM
- **JWT Authentication** with secure cookie handling
- **Role-based Authorization** (User/Admin)
- **Comprehensive Middleware**:
  - Error handling
  - Rate limiting
  - Request validation
  - CORS configuration
  - Security headers (Helmet)
  - Compression
  - Logging (Morgan)
- **Complete E-commerce Features**:
  - Product management
  - Category management
  - Shopping cart
  - Wishlist
  - Order management
  - User reviews & ratings
  - User authentication & profiles

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## 🛠️ Installation

1. **Navigate to the server directory**:
   ```bash
   cd server
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Update the values in `.env`:
     ```env
     NODE_ENV=development
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/cryotech
     JWT_SECRET=your_jwt_secret_key_change_this_in_production
     JWT_EXPIRE=30d
     JWT_COOKIE_EXPIRE=30
     CLIENT_URL=http://localhost:5173
     ```

4. **Set up MongoDB**:
   - **Local MongoDB**: Make sure MongoDB is running locally
   - **MongoDB Atlas**: Update `MONGODB_URI` with your Atlas connection string

## 🌱 Database Seeding

Seed the database with sample data (categories, products, users):

```bash
npm run seed
```

**Default Login Credentials**:
- **Admin**: `admin@cryotech.com` / `admin123`
- **User**: `user@test.com` / `test123`

## 🚀 Running the Server

### Development Mode (with auto-restart):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## 📚 API Endpoints

### Health Check
- `GET /api/health` - Server health check

### Products
- `GET /api/products` - Get all products (with filtering, pagination, search)
- `GET /api/products/featured` - Get featured products
- `GET /api/products/new-arrivals` - Get new arrival products
- `GET /api/products/on-sale` - Get products on sale
- `GET /api/products/:id` - Get single product
- `GET /api/products/:id/related` - Get related products
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `GET /api/categories/:id/products` - Get products by category
- `POST /api/categories` - Create category (Admin)
- `PUT /api/categories/:id` - Update category (Admin)
- `DELETE /api/categories/:id` - Delete category (Admin)

### Users & Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/me` - Get current user profile (Private)
- `PUT /api/users/profile` - Update user profile (Private)
- `PUT /api/users/password` - Update password (Private)
- `POST /api/users/logout` - Logout user (Private)
- `POST /api/users/addresses` - Add address (Private)
- `PUT /api/users/addresses/:addressId` - Update address (Private)
- `DELETE /api/users/addresses/:addressId` - Delete address (Private)
- `GET /api/users` - Get all users (Admin)
- `GET /api/users/:id` - Get single user (Admin)

### Cart
- `GET /api/cart` - Get user cart (Private)
- `POST /api/cart/items` - Add item to cart (Private)
- `PUT /api/cart/items/:itemId` - Update cart item quantity (Private)
- `DELETE /api/cart/items/:itemId` - Remove item from cart (Private)
- `DELETE /api/cart` - Clear cart (Private)

### Wishlist
- `GET /api/wishlist` - Get user wishlist (Private)
- `GET /api/wishlist/check/:productId` - Check if product in wishlist (Private)
- `POST /api/wishlist/items` - Add item to wishlist (Private)
- `DELETE /api/wishlist/items/:productId` - Remove item from wishlist (Private)
- `DELETE /api/wishlist` - Clear wishlist (Private)

### Orders
- `POST /api/orders` - Create new order (Private)
- `GET /api/orders/my-orders` - Get user orders (Private)
- `GET /api/orders/:id` - Get single order (Private)
- `PUT /api/orders/:id/cancel` - Cancel order (Private)
- `GET /api/orders` - Get all orders (Admin)
- `PUT /api/orders/:id/status` - Update order status (Admin)
- `PUT /api/orders/:id/pay` - Update order to paid (Admin)

### Reviews
- `GET /api/reviews/product/:productId` - Get product reviews
- `POST /api/reviews` - Create review (Private)
- `GET /api/reviews/my-reviews` - Get user's reviews (Private)
- `PUT /api/reviews/:id` - Update review (Private)
- `DELETE /api/reviews/:id` - Delete review (Private)

## 🔒 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in requests using either:

1. **Authorization Header**:
   ```
   Authorization: Bearer <your_jwt_token>
   ```

2. **Cookie**: The token is automatically sent in a secure HTTP-only cookie after login

## 📦 Project Structure

```
server/
├── config/
│   └── database.js          # MongoDB connection config
├── controllers/
│   ├── productController.js
│   ├── categoryController.js
│   ├── userController.js
│   ├── cartController.js
│   ├── wishlistController.js
│   ├── orderController.js
│   └── reviewController.js
├── middleware/
│   ├── authMiddleware.js    # JWT authentication & authorization
│   ├── errorMiddleware.js   # Error handling
│   ├── rateLimiter.js       # Rate limiting
│   └── validationMiddleware.js
├── models/
│   ├── Product.js
│   ├── Category.js
│   ├── User.js
│   ├── Cart.js
│   ├── Wishlist.js
│   ├── Order.js
│   └── Review.js
├── routes/
│   ├── productRoutes.js
│   ├── categoryRoutes.js
│   ├── userRoutes.js
│   ├── cartRoutes.js
│   ├── wishlistRoutes.js
│   ├── orderRoutes.js
│   └── reviewRoutes.js
├── scripts/
│   └── seedDatabase.js      # Database seeding script
├── .env                     # Environment variables
├── .env.example             # Environment variables template
├── .gitignore
├── package.json
└── server.js                # Entry point
```

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/cryotech` |
| `JWT_SECRET` | JWT secret key | (required) |
| `JWT_EXPIRE` | JWT expiration time | `30d` |
| `JWT_COOKIE_EXPIRE` | Cookie expiration (days) | `30` |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:5173` |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window (ms) | `900000` |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | `100` |

## 🛡️ Security Features

- **Helmet.js**: Security headers
- **Rate Limiting**: Prevent DDoS attacks
- **Input Validation**: Express-validator
- **Password Hashing**: bcryptjs
- **JWT Authentication**: Secure token-based auth
- **CORS**: Configured for specific origins
- **HTTP-only Cookies**: Prevent XSS attacks

## 📝 Development Tips

1. **Use Nodemon**: Automatically installed with dev dependencies for auto-restart
2. **Testing with Postman/Thunder Client**: Import endpoints for easy testing
3. **MongoDB Compass**: Use for database visualization
4. **Check Logs**: Morgan provides detailed request logging in development mode

## 🚧 TODO (Future Enhancements)

- [ ] Connect MongoDB Atlas
- [ ] Implement OAuth authentication (Google, Facebook)
- [ ] Add payment gateway integration (Stripe, PayPal)
- [ ] Email notifications (order confirmation, shipping updates)
- [ ] Image upload functionality (Cloudinary, AWS S3)
- [ ] Advanced search with Elasticsearch
- [ ] Caching with Redis
- [ ] API documentation with Swagger
- [ ] Unit and integration tests

## 📄 License

ISC

## 👤 Author

CryoTech Team
