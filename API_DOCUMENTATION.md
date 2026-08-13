# SalesSavvy - API Documentation

Complete REST API documentation for the SalesSavvy backend.

## 📌 Base URL

```
http://localhost:9090/api
```

## 🔐 Authentication

### JWT Token Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Getting a Token

**Endpoint**: `POST /api/auth/login`

**Request**:
```json
{
  "email": "user@example.com",
  "password": "YourPassword123!"
}
```

**Response**:
```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "username",
      "email": "user@example.com",
      "role": "CUSTOMER"
    }
  }
}
```

## 📋 Response Format

All API responses follow this standard format:

```json
{
  "status": "success|error|warning",
  "message": "Description of the response",
  "data": {},
  "timestamp": "2024-12-13T10:30:00Z",
  "errors": []
}
```

## ❌ Error Codes

| Code | Description |
|------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing or invalid token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource already exists |
| 500 | Internal Server Error - Server error |

---

## 🔑 Authentication Endpoints

### 1. Register User

**Endpoint**: `POST /api/users/register`  
**Authentication**: None required  
**Rate Limit**: 5 requests per hour

**Request Body**:
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "role": "CUSTOMER"
}
```

**Response** (201 Created):
```json
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "role": "CUSTOMER"
  }
}
```

**Validation Rules**:
- Username: 4-16 characters, alphanumeric + underscore
- Email: Valid email format
- Password: 8+ chars, uppercase, lowercase, number, special char
- Role: CUSTOMER or ADMIN

---

### 2. Login

**Endpoint**: `POST /api/auth/login`  
**Authentication**: None required

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response** (200 OK):
```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 86400,
    "user": {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com",
      "role": "CUSTOMER"
    }
  }
}
```

---

### 3. Logout

**Endpoint**: `POST /api/auth/logout`  
**Authentication**: Required (JWT)

**Response** (200 OK):
```json
{
  "status": "success",
  "message": "Logout successful"
}
```

---

## 👥 User Endpoints

### 1. Get Current User Profile

**Endpoint**: `GET /api/users/profile`  
**Authentication**: Required  
**Method**: GET

**Response** (200 OK):
```json
{
  "status": "success",
  "message": "User profile retrieved",
  "data": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "role": "CUSTOMER",
    "createdAt": "2024-12-01T10:00:00Z",
    "updatedAt": "2024-12-13T10:00:00Z"
  }
}
```

---

### 2. Update User Profile

**Endpoint**: `PUT /api/users/profile`  
**Authentication**: Required

**Request Body**:
```json
{
  "username": "john_doe_updated",
  "email": "newemail@example.com"
}
```

**Response** (200 OK):
```json
{
  "status": "success",
  "message": "Profile updated successfully",
  "data": {
    "id": 1,
    "username": "john_doe_updated",
    "email": "newemail@example.com"
  }
}
```

---

### 3. Change Password

**Endpoint**: `POST /api/users/change-password`  
**Authentication**: Required

**Request Body**:
```json
{
  "oldPassword": "OldPass123!",
  "newPassword": "NewPass456!"
}
```

**Response** (200 OK):
```json
{
  "status": "success",
  "message": "Password changed successfully"
}
```

---

## 🛒 Product Endpoints

### 1. Get All Products

**Endpoint**: `GET /api/products`  
**Authentication**: Not required  
**Query Parameters**:
- `page`: Page number (default: 0)
- `size`: Items per page (default: 10)
- `category`: Filter by category ID
- `search`: Search products by name
- `sort`: Sort by field (price, name, date)

**Example**:
```
GET /api/products?page=0&size=10&category=1&sort=price
```

**Response** (200 OK):
```json
{
  "status": "success",
  "message": "Products retrieved",
  "data": [
    {
      "id": 1,
      "name": "Product Name",
      "description": "Product description",
      "price": 99.99,
      "stock": 50,
      "category": {
        "id": 1,
        "name": "Electronics"
      },
      "images": [
        {
          "id": 1,
          "url": "/images/product1.jpg",
          "alt": "Product image"
        }
      ],
      "createdAt": "2024-12-01T10:00:00Z"
    }
  ],
  "pagination": {
    "totalElements": 100,
    "totalPages": 10,
    "currentPage": 0,
    "pageSize": 10
  }
}
```

---

### 2. Get Product by ID

**Endpoint**: `GET /api/products/{id}`  
**Authentication**: Not required

**Response** (200 OK):
```json
{
  "status": "success",
  "message": "Product retrieved",
  "data": {
    "id": 1,
    "name": "Product Name",
    "description": "Detailed description",
    "price": 99.99,
    "stock": 50,
    "category": {
      "id": 1,
      "name": "Electronics"
    },
    "images": [
      {
        "id": 1,
        "url": "/images/product1.jpg"
      }
    ],
    "rating": 4.5,
    "reviews": 125,
    "createdAt": "2024-12-01T10:00:00Z"
  }
}
```

---

### 3. Create Product (Admin Only)

**Endpoint**: `POST /api/products`  
**Authentication**: Required (ADMIN)

**Request Body**:
```json
{
  "name": "New Product",
  "description": "Product description",
  "price": 99.99,
  "stock": 50,
  "categoryId": 1,
  "images": [
    {
      "url": "/images/product.jpg",
      "alt": "Product image"
    }
  ]
}
```

**Response** (201 Created):
```json
{
  "status": "success",
  "message": "Product created successfully",
  "data": {
    "id": 101,
    "name": "New Product",
    "price": 99.99
  }
}
```

---

### 4. Update Product (Admin Only)

**Endpoint**: `PUT /api/products/{id}`  
**Authentication**: Required (ADMIN)

**Request Body**:
```json
{
  "name": "Updated Product Name",
  "price": 89.99,
  "stock": 60
}
```

**Response** (200 OK):
```json
{
  "status": "success",
  "message": "Product updated successfully"
}
```

---

### 5. Delete Product (Admin Only)

**Endpoint**: `DELETE /api/products/{id}`  
**Authentication**: Required (ADMIN)

**Response** (200 OK):
```json
{
  "status": "success",
  "message": "Product deleted successfully"
}
```

---

## 🛍️ Cart Endpoints

### 1. Get Cart

**Endpoint**: `GET /api/cart`  
**Authentication**: Required

**Response** (200 OK):
```json
{
  "status": "success",
  "message": "Cart retrieved",
  "data": {
    "id": 1,
    "userId": 1,
    "items": [
      {
        "id": 1,
        "productId": 1,
        "productName": "Product Name",
        "quantity": 2,
        "price": 99.99,
        "subtotal": 199.98
      }
    ],
    "total": 199.98,
    "itemCount": 2
  }
}
```

---

### 2. Add to Cart

**Endpoint**: `POST /api/cart/add`  
**Authentication**: Required

**Request Body**:
```json
{
  "productId": 1,
  "quantity": 2
}
```

**Response** (200 OK):
```json
{
  "status": "success",
  "message": "Product added to cart",
  "data": {
    "cartId": 1,
    "itemCount": 3,
    "total": 299.97
  }
}
```

---

### 3. Update Cart Item

**Endpoint**: `PUT /api/cart/items/{itemId}`  
**Authentication**: Required

**Request Body**:
```json
{
  "quantity": 5
}
```

**Response** (200 OK):
```json
{
  "status": "success",
  "message": "Cart item updated"
}
```

---

### 4. Remove from Cart

**Endpoint**: `DELETE /api/cart/items/{itemId}`  
**Authentication**: Required

**Response** (200 OK):
```json
{
  "status": "success",
  "message": "Item removed from cart"
}
```

---

### 5. Clear Cart

**Endpoint**: `DELETE /api/cart/clear`  
**Authentication**: Required

**Response** (200 OK):
```json
{
  "status": "success",
  "message": "Cart cleared"
}
```

---

## 📦 Order Endpoints

### 1. Create Order

**Endpoint**: `POST /api/orders`  
**Authentication**: Required

**Request Body**:
```json
{
  "shippingAddress": "123 Main St, City, State 12345",
  "paymentMethod": "CARD"
}
```

**Response** (201 Created):
```json
{
  "status": "success",
  "message": "Order created successfully",
  "data": {
    "id": 1001,
    "userId": 1,
    "orderDate": "2024-12-13T10:00:00Z",
    "status": "PENDING",
    "total": 299.97,
    "items": [
      {
        "productId": 1,
        "productName": "Product",
        "quantity": 2,
        "price": 99.99
      }
    ],
    "shippingAddress": "123 Main St, City, State 12345"
  }
}
```

---

### 2. Get User Orders

**Endpoint**: `GET /api/orders`  
**Authentication**: Required

**Response** (200 OK):
```json
{
  "status": "success",
  "message": "Orders retrieved",
  "data": [
    {
      "id": 1001,
      "orderDate": "2024-12-13T10:00:00Z",
      "status": "PROCESSING",
      "total": 299.97,
      "itemCount": 2,
      "shippingAddress": "123 Main St"
    }
  ]
}
```

---

### 3. Get Order Details

**Endpoint**: `GET /api/orders/{orderId}`  
**Authentication**: Required

**Response** (200 OK):
```json
{
  "status": "success",
  "message": "Order retrieved",
  "data": {
    "id": 1001,
    "userId": 1,
    "orderDate": "2024-12-13T10:00:00Z",
    "status": "PROCESSING",
    "total": 299.97,
    "items": [
      {
        "id": 1,
        "productId": 1,
        "productName": "Product",
        "quantity": 2,
        "price": 99.99,
        "subtotal": 199.98
      }
    ],
    "paymentStatus": "COMPLETED",
    "shippingAddress": "123 Main St",
    "estimatedDelivery": "2024-12-20T00:00:00Z"
  }
}
```

---

### 4. Cancel Order

**Endpoint**: `PUT /api/orders/{orderId}/cancel`  
**Authentication**: Required

**Response** (200 OK):
```json
{
  "status": "success",
  "message": "Order cancelled successfully"
}
```

---

## ❤️ Wishlist Endpoints

### 1. Get Wishlist

**Endpoint**: `GET /api/wishlist`  
**Authentication**: Required

**Response** (200 OK):
```json
{
  "status": "success",
  "message": "Wishlist retrieved",
  "data": [
    {
      "id": 1,
      "productId": 1,
      "productName": "Product Name",
      "price": 99.99,
      "image": "/images/product.jpg",
      "addedDate": "2024-12-01T10:00:00Z"
    }
  ]
}
```

---

### 2. Add to Wishlist

**Endpoint**: `POST /api/wishlist/add`  
**Authentication**: Required

**Request Body**:
```json
{
  "productId": 1
}
```

**Response** (200 OK):
```json
{
  "status": "success",
  "message": "Product added to wishlist"
}
```

---

### 3. Remove from Wishlist

**Endpoint**: `DELETE /api/wishlist/{wishlistItemId}`  
**Authentication**: Required

**Response** (200 OK):
```json
{
  "status": "success",
  "message": "Product removed from wishlist"
}
```

---

## 💳 Payment Endpoints

### 1. Process Payment

**Endpoint**: `POST /api/payments/process`  
**Authentication**: Required

**Request Body**:
```json
{
  "orderId": 1001,
  "amount": 299.97,
  "paymentMethod": "CARD",
  "cardDetails": {
    "cardNumber": "4111111111111111",
    "expiryMonth": 12,
    "expiryYear": 2025,
    "cvv": "123"
  }
}
```

**Response** (200 OK):
```json
{
  "status": "success",
  "message": "Payment processed successfully",
  "data": {
    "transactionId": "TXN123456",
    "orderId": 1001,
    "amount": 299.97,
    "status": "COMPLETED",
    "timestamp": "2024-12-13T10:00:00Z"
  }
}
```

---

### 2. Get Payment Status

**Endpoint**: `GET /api/payments/{transactionId}`  
**Authentication**: Required

**Response** (200 OK):
```json
{
  "status": "success",
  "message": "Payment status retrieved",
  "data": {
    "transactionId": "TXN123456",
    "orderId": 1001,
    "status": "COMPLETED",
    "amount": 299.97,
    "timestamp": "2024-12-13T10:00:00Z"
  }
}
```

---

## 👨‍💼 Admin Endpoints

### 1. Get All Users (Admin Only)

**Endpoint**: `GET /api/admin/users`  
**Authentication**: Required (ADMIN)

**Response** (200 OK):
```json
{
  "status": "success",
  "message": "Users retrieved",
  "data": [
    {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com",
      "role": "CUSTOMER",
      "createdAt": "2024-12-01T10:00:00Z",
      "status": "ACTIVE"
    }
  ]
}
```

---

### 2. Get All Orders (Admin Only)

**Endpoint**: `GET /api/admin/orders`  
**Authentication**: Required (ADMIN)

**Response** (200 OK):
```json
{
  "status": "success",
  "message": "Orders retrieved",
  "data": [
    {
      "id": 1001,
      "userId": 1,
      "userName": "john_doe",
      "orderDate": "2024-12-13T10:00:00Z",
      "status": "PROCESSING",
      "total": 299.97
    }
  ]
}
```

---

### 3. Update Order Status (Admin Only)

**Endpoint**: `PUT /api/admin/orders/{orderId}/status`  
**Authentication**: Required (ADMIN)

**Request Body**:
```json
{
  "status": "SHIPPED"
}
```

**Response** (200 OK):
```json
{
  "status": "success",
  "message": "Order status updated"
}
```

---

## 📊 Categories Endpoints

### 1. Get All Categories

**Endpoint**: `GET /api/categories`  
**Authentication**: Not required

**Response** (200 OK):
```json
{
  "status": "success",
  "message": "Categories retrieved",
  "data": [
    {
      "id": 1,
      "name": "Electronics",
      "description": "Electronic devices",
      "productCount": 25
    }
  ]
}
```

---

## 🧪 Testing the API

### Using cURL

```bash
# Register user
curl -X POST http://localhost:9090/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "TestPass123!",
    "role": "CUSTOMER"
  }'

# Login
curl -X POST http://localhost:9090/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123!"
  }'

# Get products
curl -X GET "http://localhost:9090/api/products?page=0&size=10"

# Add to cart (requires token)
curl -X POST http://localhost:9090/api/cart/add \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": 1,
    "quantity": 2
  }'
```

### Using Postman

1. Import the API endpoints into Postman
2. Set the base URL to `http://localhost:9090/api`
3. For protected endpoints, add the JWT token to the Authorization header
4. Set request body content type to `application/json`

---

**API Documentation Version**: 1.0  
**Last Updated**: December 2024
