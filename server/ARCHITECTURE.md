# 🏗️ CryoTech Backend Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React)                         │
│                    http://localhost:5173                        │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTP Requests (JSON)
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                   BACKEND SERVER (Express)                      │
│                    http://localhost:5000                        │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │                    MIDDLEWARE LAYER                      │  │
│  │  • Helmet (Security Headers)                            │  │
│  │  • CORS (Cross-Origin)                                  │  │
│  │  • Body Parser (JSON)                                   │  │
│  │  • Morgan (Logging)                                     │  │
│  │  • Rate Limiter (DDoS Protection)                       │  │
│  │  • Compression                                          │  │
│  └─────────────────────────────────────────────────────────┘  │
│                             │                                   │
│  ┌─────────────────────────▼───────────────────────────────┐  │
│  │                      API ROUTES                          │  │
│  │  /api/products     → productRoutes                      │  │
│  │  /api/categories   → categoryRoutes                     │  │
│  │  /api/users        → userRoutes                         │  │
│  │  /api/cart         → cartRoutes                         │  │
│  │  /api/wishlist     → wishlistRoutes                     │  │
│  │  /api/orders       → orderRoutes                        │  │
│  │  /api/reviews      → reviewRoutes                       │  │
│  └─────────────────────────┬───────────────────────────────┘  │
│                             │                                   │
│  ┌─────────────────────────▼───────────────────────────────┐  │
│  │                  AUTH MIDDLEWARE                         │  │
│  │  • Verify JWT Token                                     │  │
│  │  • Check User Role (User/Admin)                         │  │
│  │  • Attach User to Request                               │  │
│  └─────────────────────────┬───────────────────────────────┘  │
│                             │                                   │
│  ┌─────────────────────────▼───────────────────────────────┐  │
│  │               VALIDATION MIDDLEWARE                      │  │
│  │  • Express Validator                                    │  │
│  │  • Input Sanitization                                   │  │
│  └─────────────────────────┬───────────────────────────────┘  │
│                             │                                   │
│  ┌─────────────────────────▼───────────────────────────────┐  │
│  │                    CONTROLLERS                           │  │
│  │  • Business Logic                                       │  │
│  │  • Request Processing                                   │  │
│  │  • Response Formatting                                  │  │
│  └─────────────────────────┬───────────────────────────────┘  │
│                             │                                   │
│  ┌─────────────────────────▼───────────────────────────────┐  │
│  │                  MONGOOSE MODELS                         │  │
│  │  • Schema Definitions                                   │  │
│  │  • Data Validation                                      │  │
│  │  • Business Methods                                     │  │
│  └─────────────────────────┬───────────────────────────────┘  │
│                             │                                   │
│  ┌─────────────────────────▼───────────────────────────────┐  │
│  │                ERROR HANDLING                            │  │
│  │  • Custom Error Classes                                 │  │
│  │  • Error Middleware                                     │  │
│  │  • 404 Handler                                          │  │
│  └─────────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ Mongoose ODM
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                   DATABASE (MongoDB)                            │
│                 mongodb://localhost:27017                       │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │   Products   │  │  Categories  │  │    Users     │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │    Carts     │  │  Wishlists   │  │   Orders     │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
│                                                                 │
│  ┌──────────────┐                                              │
│  │   Reviews    │                                              │
│  └──────────────┘                                              │
└─────────────────────────────────────────────────────────────────┘
```

---

## Request Flow Example

### 1. User Login Flow

```
User (Frontend) 
    │
    │ POST /api/users/login
    │ { email, password }
    │
    ▼
Express Server
    │
    │ 1. Body Parser → Parse JSON
    │ 2. Morgan → Log request
    │ 3. Rate Limiter → Check rate limit
    │ 4. Validation → Validate input
    │
    ▼
userController.loginUser()
    │
    │ 1. Find user by email
    │ 2. Compare password (bcrypt)
    │ 3. Generate JWT token
    │ 4. Set HTTP-only cookie
    │
    ▼
Response to User
    {
      success: true,
      token: "jwt_token...",
      user: { id, name, email, role }
    }
```

### 2. Get Products Flow (Public)

```
User (Frontend)
    │
    │ GET /api/products?category=1&page=1&limit=12
    │
    ▼
Express Server
    │
    │ 1. Parse query parameters
    │ 2. Rate limiting
    │
    ▼
productController.getProducts()
    │
    │ 1. Build MongoDB query
    │ 2. Apply filters (category, price, etc.)
    │ 3. Add pagination
    │ 4. Execute query
    │ 5. Count total documents
    │
    ▼
MongoDB → Fetch Products
    │
    ▼
Response to User
    {
      success: true,
      count: 12,
      total: 145,
      totalPages: 13,
      currentPage: 1,
      data: [products...]
    }
```

### 3. Add to Cart Flow (Protected)

```
User (Frontend)
    │
    │ POST /api/cart/items
    │ Authorization: Bearer jwt_token
    │ { productId, quantity }
    │
    ▼
Express Server
    │
    │ 1. Auth Middleware → Verify JWT
    │ 2. Attach user to request
    │ 3. Validate input
    │
    ▼
cartController.addToCart()
    │
    │ 1. Find/Create user cart
    │ 2. Check product exists
    │ 3. Check stock availability
    │ 4. Add/Update cart item
    │ 5. Calculate totals
    │ 6. Save cart
    │
    ▼
MongoDB → Update Cart
    │
    ▼
Response to User
    {
      success: true,
      data: {
        items: [...],
        totalItems: 3,
        totalPrice: 15999
      }
    }
```

### 4. Create Order Flow (Protected)

```
User (Frontend)
    │
    │ POST /api/orders
    │ Authorization: Bearer jwt_token
    │ { items, shippingAddress, paymentMethod, totalAmount }
    │
    ▼
Express Server
    │
    │ 1. Auth Middleware → Verify JWT
    │ 2. Validate order data
    │
    ▼
orderController.createOrder()
    │
    │ 1. Verify stock for all items
    │ 2. Create order in DB
    │ 3. Update product stock
    │ 4. Update sold count
    │ 5. Clear user's cart
    │ 6. Generate order number
    │
    ▼
MongoDB → Multiple Operations
    │
    ▼
Response to User
    {
      success: true,
      data: {
        orderNumber: "ORD-1234567890-00001",
        status: "pending",
        totalAmount: 15999,
        ...
      }
    }
```

---

## Database Schema Relationships

```
┌──────────────┐
│    User      │
│─────────────│
│ _id          │───────┐
│ name         │       │
│ email        │       │
│ password     │       │
│ role         │       │
│ addresses[]  │       │
└──────────────┘       │
                       │
                       │ user (ref)
                       │
       ┌───────────────┴───────────────┬───────────────┬
       │                               │               │
       ▼                               ▼               ▼
┌──────────────┐              ┌──────────────┐  ┌──────────────┐
│    Cart      │              │  Wishlist    │  │    Order     │
│─────────────│              │─────────────│  │─────────────│
│ _id          │              │ _id          │  │ _id          │
│ user ────────┤              │ user ────────┤  │ user ────────┤
│ items[]      │              │ items[]      │  │ orderNumber  │
│  └─ product ─┼──┐           │  └─ product ─┼─┐│ items[]      │
│ totalItems   │  │           │              │ ││  └─ product ─┼─┐
│ totalPrice   │  │           │              │ ││ status       │ │
└──────────────┘  │           └──────────────┘ │└──────────────┘ │
                  │                            │                  │
                  │ product (ref)              │ product (ref)    │
                  │                            │                  │
       ┌──────────┴────────────────────────────┴──────────────────┘
       │
       ▼
┌──────────────┐
│   Product    │
│─────────────│
│ _id          │
│ name         │
│ slug         │
│ description  │
│ categoryId ──┼────┐
│ price        │    │
│ images[]     │    │
│ variants[]   │    │
│ rating       │◄───┼─── Calculated from Reviews
│ reviewCount  │    │
└──────────────┘    │ categoryId (ref)
       ▲            │
       │            ▼
       │     ┌──────────────┐
       │     │   Category   │
       │     │─────────────│
       │     │ _id          │
       │     │ name         │
       │     │ slug         │
       │     │ icon         │
       │     │ subCategories│
       │     └──────────────┘
       │
       │ product (ref)
       │
┌──────┴───────┐
│    Review    │
│─────────────│
│ _id          │
│ product ─────┤
│ user ────────┼───► User
│ rating       │
│ title        │
│ comment      │
│ isVerified   │
└──────────────┘
```

---

## Authentication Flow

```
┌────────────────────────────────────────────────────────────┐
│                     AUTHENTICATION                          │
└────────────────────────────────────────────────────────────┘

1. REGISTER
   User → Backend: { name, email, password }
   Backend:
     • Validate input
     • Check if email exists
     • Hash password (bcryptjs)
     • Save user to DB
     • Generate JWT token
     • Send cookie
   Backend → User: { token, user }

2. LOGIN
   User → Backend: { email, password }
   Backend:
     • Find user by email
     • Compare password hash
     • Generate JWT token
     • Send HTTP-only cookie
   Backend → User: { token, user }

3. PROTECTED REQUEST
   User → Backend: GET /api/cart
   Headers: Authorization: Bearer <token>
   
   Middleware (authMiddleware.js):
     • Extract token from header/cookie
     • Verify JWT signature
     • Decode token → get user ID
     • Find user in DB
     • Attach user to req.user
     • Next() → Continue to controller
   
   Controller:
     • Access req.user
     • Execute business logic
   
   Backend → User: { success: true, data: {...} }

4. ADMIN CHECK
   Middleware (authMiddleware.js):
     • After authentication
     • Check if req.user.role === 'admin'
     • If yes → next()
     • If no → 403 Forbidden
```

---

## API Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "count": 10,          // For lists
  "total": 145,         // For pagination
  "totalPages": 15,     // For pagination
  "currentPage": 1      // For pagination
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "stack": "..." // Only in development
}
```

---

## Security Layers

```
┌─────────────────────────────────────────────────────────┐
│                    SECURITY LAYERS                       │
└─────────────────────────────────────────────────────────┘

1. HELMET.JS
   • Sets security headers
   • Prevents common attacks
   • XSS, clickjacking protection

2. CORS
   • Restrict origins
   • Only allow frontend URL
   • Credentials: true

3. RATE LIMITING
   • 100 requests per 15 minutes
   • Per IP address
   • Prevents DDoS

4. INPUT VALIDATION
   • Express-validator
   • Sanitize inputs
   • Validate data types

5. AUTHENTICATION
   • JWT tokens
   • HTTP-only cookies
   • Token expiration

6. PASSWORD HASHING
   • bcryptjs
   • Salt rounds: 10
   • Never store plain text

7. AUTHORIZATION
   • Role-based access
   • User vs Admin
   • Route protection

8. ENVIRONMENT VARIABLES
   • Secrets in .env
   • Not committed to git
   • Production vs development
```

---

## File Organization Pattern

```
server/
│
├── config/              # Configuration files
│   └── database.js      # DB connection & settings
│
├── controllers/         # Request handlers (Business Logic)
│   ├── productController.js
│   ├── userController.js
│   └── ...
│
├── middleware/          # Express middleware
│   ├── authMiddleware.js      # JWT verification
│   ├── errorMiddleware.js     # Error handling
│   └── ...
│
├── models/              # Mongoose schemas (Data Layer)
│   ├── Product.js
│   ├── User.js
│   └── ...
│
├── routes/              # API route definitions
│   ├── productRoutes.js
│   ├── userRoutes.js
│   └── ...
│
├── scripts/             # Utility scripts
│   └── seedDatabase.js  # Populate DB with data
│
├── .env                 # Environment variables (SECRET!)
├── .gitignore          # Ignore node_modules, .env
├── package.json        # Dependencies & scripts
└── server.js           # Application entry point
```

---

## MVC Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   MVC PATTERN                            │
└─────────────────────────────────────────────────────────┘

CLIENT REQUEST
      │
      ▼
┌─────────────┐
│   ROUTES    │  ← Define API endpoints
│ (Router)    │    Map URLs to controllers
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ CONTROLLERS │  ← Handle requests
│ (Business   │    Process data
│  Logic)     │    Call models
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   MODELS    │  ← Define schemas
│ (Data Layer)│    Database operations
└──────┬──────┘    Validation
       │
       ▼
   DATABASE
       │
       ▼
   RESPONSE
```

---

## Environment Setup

```
DEVELOPMENT                    PRODUCTION
───────────                    ──────────

NODE_ENV=development          NODE_ENV=production

MongoDB: Local                MongoDB: Atlas (Cloud)
Port: 5000                    Port: Process.env.PORT
Logging: Detailed             Logging: Minimal
Error Stack: Shown            Error Stack: Hidden
CORS: Localhost               CORS: Production domain
JWT Cookies: Not Secure       JWT Cookies: Secure
```

---

## Deployment Checklist

Before deploying to production:

```
□ Change JWT_SECRET to strong random string
□ Set NODE_ENV=production
□ Use MongoDB Atlas (cloud) instead of local
□ Update CLIENT_URL to production frontend URL
□ Enable HTTPS
□ Set secure: true for cookies
□ Add monitoring (PM2, New Relic)
□ Set up error tracking (Sentry)
□ Configure backup strategy
□ Set up CI/CD pipeline
□ Add API documentation (Swagger)
□ Load testing
□ Security audit
```

---

## Quick Command Reference

```bash
# Start development server
cd server && npm run dev

# Seed database
cd server && npm run seed

# Test health endpoint
curl http://localhost:5000/api/health

# Test products endpoint
curl http://localhost:5000/api/products

# Login
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.com","password":"test123"}'

# Check MongoDB status (if local)
brew services list | grep mongodb

# Start MongoDB (if stopped)
brew services start mongodb-community
```

---

This architecture provides a solid foundation for your e-commerce platform with:
- ✅ Scalability
- ✅ Security
- ✅ Maintainability
- ✅ Performance
- ✅ Best practices

**Ready to build something amazing! 🚀**
