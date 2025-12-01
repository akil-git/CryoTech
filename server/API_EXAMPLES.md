# API Examples Collection

Complete examples for testing all CryoTech API endpoints.

## Setup

Base URL: `http://localhost:5000/api`

## 📝 Authentication Examples

### 1. Register New User
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "+1234567890"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@test.com",
    "password": "test123"
  }'
```

**Response**:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "name": "Test User",
    "email": "user@test.com",
    "role": "user"
  }
}
```

**Save the token for authenticated requests!**

### 3. Get Current User Profile
```bash
curl http://localhost:5000/api/users/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 4. Update Profile
```bash
curl -X PUT http://localhost:5000/api/users/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "John Updated",
    "phone": "+1234567890"
  }'
```

### 5. Logout
```bash
curl -X POST http://localhost:5000/api/users/logout \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📦 Product Examples

### 1. Get All Products
```bash
curl http://localhost:5000/api/products
```

### 2. Get Products with Filters
```bash
# With pagination
curl "http://localhost:5000/api/products?page=1&limit=10"

# Filter by category
curl "http://localhost:5000/api/products?category=CATEGORY_ID"

# Filter by price range
curl "http://localhost:5000/api/products?minPrice=1000&maxPrice=5000"

# Only in-stock products
curl "http://localhost:5000/api/products?inStock=true"

# Only sale items
curl "http://localhost:5000/api/products?isOnSale=true"

# Search products
curl "http://localhost:5000/api/products?search=wireless"

# Sort by price (ascending)
curl "http://localhost:5000/api/products?sort=price"

# Sort by price (descending)
curl "http://localhost:5000/api/products?sort=-price"

# Sort by rating
curl "http://localhost:5000/api/products?sort=-rating"

# Combine filters
curl "http://localhost:5000/api/products?category=CATEGORY_ID&isOnSale=true&minPrice=1000&sort=-rating&page=1&limit=12"
```

### 3. Get Single Product
```bash
# By ID
curl http://localhost:5000/api/products/PRODUCT_ID

# By Slug
curl http://localhost:5000/api/products/wireless-earbuds-pro
```

### 4. Get Featured Products
```bash
curl http://localhost:5000/api/products/featured
```

### 5. Get New Arrivals
```bash
curl http://localhost:5000/api/products/new-arrivals
```

### 6. Get Products on Sale
```bash
curl http://localhost:5000/api/products/on-sale
```

### 7. Get Related Products
```bash
curl http://localhost:5000/api/products/PRODUCT_ID/related
```

### 8. Create Product (Admin Only)
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE" \
  -d '{
    "name": "New Gaming Mouse",
    "slug": "new-gaming-mouse",
    "description": "High-performance gaming mouse with RGB lighting",
    "shortDescription": "RGB gaming mouse with 16000 DPI",
    "categoryId": "CATEGORY_ID",
    "price": 3999,
    "discountPrice": 2999,
    "discountPercentage": 25,
    "images": ["gaming-mouse-1", "gaming-mouse-2"],
    "stockQuantity": 50,
    "inStock": true,
    "isOnSale": true,
    "isFeatured": true,
    "specifications": {
      "DPI": "16000",
      "Buttons": "8",
      "Connectivity": "Wireless"
    },
    "sku": "GM-NEW-001"
  }'
```

---

## 🏷️ Category Examples

### 1. Get All Categories
```bash
curl http://localhost:5000/api/categories
```

### 2. Get Single Category
```bash
# By ID
curl http://localhost:5000/api/categories/CATEGORY_ID

# By Slug
curl http://localhost:5000/api/categories/mobile-accessories
```

### 3. Get Products by Category
```bash
curl "http://localhost:5000/api/categories/CATEGORY_ID/products?page=1&limit=12"
```

---

## 🛒 Cart Examples

### 1. Get Cart
```bash
curl http://localhost:5000/api/cart \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 2. Add Item to Cart
```bash
curl -X POST http://localhost:5000/api/cart/items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "productId": "PRODUCT_ID",
    "quantity": 2,
    "selectedVariant": {
      "Color": "Black",
      "Size": "Large"
    }
  }'
```

### 3. Update Cart Item Quantity
```bash
curl -X PUT http://localhost:5000/api/cart/items/CART_ITEM_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "quantity": 3
  }'
```

### 4. Remove Item from Cart
```bash
curl -X DELETE http://localhost:5000/api/cart/items/CART_ITEM_ID \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 5. Clear Cart
```bash
curl -X DELETE http://localhost:5000/api/cart \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## ❤️ Wishlist Examples

### 1. Get Wishlist
```bash
curl http://localhost:5000/api/wishlist \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 2. Add to Wishlist
```bash
curl -X POST http://localhost:5000/api/wishlist/items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "productId": "PRODUCT_ID"
  }'
```

### 3. Check if Product in Wishlist
```bash
curl http://localhost:5000/api/wishlist/check/PRODUCT_ID \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 4. Remove from Wishlist
```bash
curl -X DELETE http://localhost:5000/api/wishlist/items/PRODUCT_ID \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 5. Clear Wishlist
```bash
curl -X DELETE http://localhost:5000/api/wishlist \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📦 Order Examples

### 1. Create Order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "items": [
      {
        "product": "PRODUCT_ID",
        "name": "Wireless Earbuds Pro",
        "price": 6999,
        "image": "wireless-earbuds",
        "quantity": 1,
        "selectedVariant": {
          "Color": "Black"
        }
      }
    ],
    "shippingAddress": {
      "name": "John Doe",
      "phone": "+1234567890",
      "address": "123 Main St, Apt 4B",
      "city": "New York",
      "postalCode": "10001"
    },
    "paymentMethod": "credit_card",
    "subtotal": 6999,
    "taxAmount": 699,
    "shippingCharge": 99,
    "totalAmount": 7797
  }'
```

### 2. Get My Orders
```bash
curl http://localhost:5000/api/orders/my-orders \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 3. Get Single Order
```bash
curl http://localhost:5000/api/orders/ORDER_ID \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 4. Cancel Order
```bash
curl -X PUT http://localhost:5000/api/orders/ORDER_ID/cancel \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 5. Get All Orders (Admin)
```bash
# All orders
curl http://localhost:5000/api/orders \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"

# Filter by status
curl "http://localhost:5000/api/orders?status=pending" \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"

# With pagination
curl "http://localhost:5000/api/orders?page=1&limit=20" \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"
```

### 6. Update Order Status (Admin)
```bash
curl -X PUT http://localhost:5000/api/orders/ORDER_ID/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE" \
  -d '{
    "status": "shipped"
  }'
```

---

## ⭐ Review Examples

### 1. Get Product Reviews
```bash
curl http://localhost:5000/api/reviews/product/PRODUCT_ID
```

### 2. Create Review
```bash
curl -X POST http://localhost:5000/api/reviews \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "product": "PRODUCT_ID",
    "rating": 5,
    "title": "Excellent Product!",
    "comment": "This product exceeded my expectations. Great quality and fast shipping.",
    "images": ["review-image-1.jpg", "review-image-2.jpg"]
  }'
```

### 3. Get My Reviews
```bash
curl http://localhost:5000/api/reviews/my-reviews \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 4. Update Review
```bash
curl -X PUT http://localhost:5000/api/reviews/REVIEW_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "rating": 4,
    "title": "Good Product",
    "comment": "Updated review after using for a month."
  }'
```

### 5. Delete Review
```bash
curl -X DELETE http://localhost:5000/api/reviews/REVIEW_ID \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🏠 Address Management

### 1. Add Address
```bash
curl -X POST http://localhost:5000/api/users/addresses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "John Doe",
    "phone": "+1234567890",
    "address": "123 Main Street, Apt 4B",
    "city": "New York",
    "postalCode": "10001",
    "isDefault": true
  }'
```

### 2. Update Address
```bash
curl -X PUT http://localhost:5000/api/users/addresses/ADDRESS_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "John Doe",
    "phone": "+1234567891",
    "address": "456 Oak Avenue",
    "city": "Los Angeles",
    "postalCode": "90001",
    "isDefault": false
  }'
```

### 3. Delete Address
```bash
curl -X DELETE http://localhost:5000/api/users/addresses/ADDRESS_ID \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🔍 Advanced Query Examples

### Complex Product Search
```bash
# Search for wireless earbuds, on sale, price 5000-10000, sorted by rating
curl "http://localhost:5000/api/products?search=wireless&isOnSale=true&minPrice=5000&maxPrice=10000&sort=-rating&page=1&limit=12"
```

### Category Products with Filters
```bash
# Gaming gear, in stock, sorted by price (low to high)
curl "http://localhost:5000/api/categories/gaming-gear/products?inStock=true&sort=price&page=1&limit=12"
```

---

## 🧪 Testing Workflow

### Complete User Journey:

1. **Register**
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

2. **Login** (Save the token!)
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

3. **Browse Products**
```bash
curl http://localhost:5000/api/products
```

4. **Add to Cart**
```bash
curl -X POST http://localhost:5000/api/cart/items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"productId":"PRODUCT_ID","quantity":1}'
```

5. **View Cart**
```bash
curl http://localhost:5000/api/cart \
  -H "Authorization: Bearer YOUR_TOKEN"
```

6. **Create Order**
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{...order data...}'
```

7. **View Orders**
```bash
curl http://localhost:5000/api/orders/my-orders \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 💡 Tips

1. **Use a tool like jq for pretty JSON output**:
   ```bash
   curl http://localhost:5000/api/products | jq
   ```

2. **Save your token in a variable**:
   ```bash
   TOKEN="your_jwt_token_here"
   curl http://localhost:5000/api/cart -H "Authorization: Bearer $TOKEN"
   ```

3. **Use Postman or Thunder Client** for easier testing with GUI

4. **Check response status codes**:
   - 200: Success
   - 201: Created
   - 400: Bad Request
   - 401: Unauthorized
   - 403: Forbidden
   - 404: Not Found
   - 500: Server Error

---

## 📚 Postman Collection

You can import these as a Postman collection. Create a new collection with:
- Environment variable: `BASE_URL` = `http://localhost:5000/api`
- Environment variable: `TOKEN` = `your_jwt_token`

Then use `{{BASE_URL}}` and `{{TOKEN}}` in your requests.
