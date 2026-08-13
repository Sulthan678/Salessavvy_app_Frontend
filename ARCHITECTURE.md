# SalesSavvy Architecture

This document describes the system architecture and design patterns used in the SalesSavvy application.

## 🎯 Architecture Overview

SalesSavvy follows a **layered architecture pattern** with a clear separation between frontend and backend systems.

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                             │
│         (React Web Application - Single Page App)            │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/REST API
                         │
┌────────────────────────▼────────────────────────────────────┐
│                  API GATEWAY LAYER                           │
│           (CORS, Authentication Filters)                    │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│               CONTROLLER LAYER                               │
│    (Request Handling & Response Management)                 │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                SERVICE LAYER                                 │
│     (Business Logic & Data Processing)                      │
│  ├─ UserService        ├─ ProductService                    │
│  ├─ AuthService        ├─ CartService                       │
│  ├─ OrderService       └─ WishlistService                   │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│           REPOSITORY LAYER (Data Access)                     │
│        (JPA Repositories, Database Queries)                 │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                  DATABASE LAYER                              │
│                   (MySQL)                                   │
└─────────────────────────────────────────────────────────────┘
```

## 📦 Frontend Architecture

### Structure
```
Frontend (React + Vite)
├── pages/          - Page components (Register, Login, Home, etc.)
├── components/     - Reusable UI components
├── services/       - API service layer
├── styles/         - Global CSS styles
├── assets/         - Images, icons, static files
└── lib/            - Utility functions and helpers
```

### Key Components

| Component | Purpose |
|-----------|---------|
| `pages/` | Page-level components for routing |
| `components/` | Reusable UI components |
| `services/` | Axios API calls and HTTP requests |
| `App.jsx` | Root component and routing setup |
| `main.jsx` | Application entry point |

### Data Flow

1. **User Interaction** → Component event handler
2. **Service Call** → API service makes HTTP request
3. **Backend Processing** → Server processes request
4. **Response Handling** → State update via React hooks
5. **Re-render** → Component re-renders with new data

### State Management

- **useState**: For component-level state
- **React Router**: For navigation state
- **Axios Interceptors**: For request/response handling

## 🖥️ Backend Architecture

### Layered Structure

```
Backend (Spring Boot)
├── Controllers/       - HTTP endpoint handlers
├── Services/          - Business logic implementation
├── Repositories/      - Database access layer
├── Entities/          - JPA entity models
├── Dto/               - Data transfer objects
├── Filters/           - Request/response filters
├── Config/            - Configuration classes
└── AdminControllers/  - Admin-specific endpoints
    AdminServices/     - Admin business logic
```

### Layer Responsibilities

#### 1. **Controller Layer**
- Handles HTTP requests and responses
- Input validation
- Error handling
- Route mapping

**Controllers:**
- `AuthController` - Authentication operations
- `UserController` - User operations
- `ProductController` - Product operations
- `CartController` - Shopping cart operations
- `OrderController` - Order management
- `PaymentController` - Payment processing
- `WishlistController` - Wishlist operations
- `AdminUserController` - User management (admin)
- `AdminProductController` - Product management (admin)
- `AdminBusinessController` - Business analytics (admin)

#### 2. **Service Layer**
- Core business logic
- Data processing
- Validation
- Transaction management

**Services:**
- `AuthService` - Authentication and authorization
- `UserService` - User profile management
- `ProductService` - Product catalog operations
- `CartService` - Shopping cart logic
- `OrderService` - Order processing
- `PaymentService` - Payment handling
- `WishlistService` - Wishlist management
- `AdminUserService` - User administration
- `AdminProductService` - Product administration
- `AdminBusinessService` - Analytics and reporting

#### 3. **Repository Layer**
- Direct database access
- JPA/Hibernate ORM
- Query optimization

**Repositories:**
- `UserRepository`
- `ProductRepository`
- `CategoryRepository`
- `CartRepository`
- `OrderRepository`
- `OrderItemRepository`
- `WishlistRepository`
- `ProductImageRepository`
- `JWTTokenRepository`

#### 4. **Entity Layer**
- JPA annotated model classes
- Database table mapping
- Relationships and associations

**Entities:**
- `User` - User account information
- `Product` - Product catalog
- `Category` - Product categories
- `CartItem` - Shopping cart items
- `Order` - Order records
- `OrderItem` - Individual order items
- `OrderStatus` - Order status tracking
- `Wishlist` - User wishlists
- `ProductImage` - Product images
- `JWTToken` - Authentication tokens
- `Role` - User roles

#### 5. **Filter Layer**
- Request preprocessing
- Authentication verification
- CORS handling

**Filters:**
- `AuthenticationFilter` - JWT token validation
- `FilterConfig` - Filter configuration

### Database Schema

#### Core Entities

**Users Table**
- Stores user account information
- Password hashing and storage
- Role assignment (CUSTOMER, ADMIN)

**Products Table**
- Product catalog
- Price, description, stock
- Category association

**Categories Table**
- Product categorization
- Hierarchical organization

**Orders Table**
- Order records
- User association
- Order status tracking

**Order Items Table**
- Individual items in orders
- Product references
- Quantity and pricing

**Cart Items Table**
- Shopping cart contents
- User-product associations

**Wishlists Table**
- User wishlists
- Saved products

**Product Images Table**
- Product images
- Multiple images per product

**JWT Tokens Table**
- Token storage and validation
- Expiration tracking

**Roles Table**
- User role definitions
- Permission management

### Data Flow

1. **HTTP Request** arrives at Controller
2. **Controller** validates input and delegates to Service
3. **Service** performs business logic and delegates to Repository
4. **Repository** executes database operations via JPA
5. **Database** returns data
6. **Service** processes and returns result to Controller
7. **Controller** formats response and sends to client

## 🔐 Authentication Flow

```
1. User Registration
   └─ POST /api/users/register
      └─ Hash password
      └─ Store user in database
      └─ Return success message

2. User Login
   └─ POST /api/auth/login
      └─ Verify credentials
      └─ Generate JWT token
      └─ Return token to client

3. Authenticated Request
   └─ Client includes JWT in Authorization header
   └─ AuthenticationFilter validates token
   └─ Proceed to protected endpoint
   └─ If invalid, return 401 Unauthorized
```

## 🔄 API Communication

### Request Flow

```
React Component
    ↓
Axios Service
    ↓
HTTP Request
    ↓
Spring Controller
    ↓
Service Layer
    ↓
Repository Layer
    ↓
Database
    ↓
Response JSON
    ↓
React Component State
    ↓
UI Re-render
```

### Error Handling

- **Frontend**: Axios interceptors catch errors, display notifications
- **Backend**: Exception handling in controllers, standardized error responses
- **Database**: Transaction rollback on errors

## 🎨 Design Patterns

### 1. MVC Pattern
- **Model**: JPA Entities
- **View**: React Components
- **Controller**: Spring Controllers

### 2. Service Pattern
- Business logic separated from controllers
- Reusable service methods
- Easy testing and maintenance

### 3. Repository Pattern
- Data access abstraction
- Query optimization
- Database independence

### 4. DTO Pattern
- Secure data transfer
- Request/response contracts
- Data validation

### 5. Singleton Pattern
- Spring Beans (Services, Repositories)
- Configuration classes

### 6. Observer Pattern
- React State Management
- Component re-rendering on state changes

## 📊 Database Relationships

### User → Orders (One-to-Many)
- One user can have multiple orders

### User → Cart (One-to-One)
- One user has one shopping cart

### User → Wishlist (One-to-Many)
- One user can have multiple wishlist items

### Product → OrderItems (One-to-Many)
- One product can be in multiple orders

### Category → Products (One-to-Many)
- One category can have multiple products

### Product → ProductImages (One-to-Many)
- One product can have multiple images

### Order → OrderItems (One-to-Many)
- One order contains multiple items

## 🔄 Request/Response Format

### Standard Request
```json
{
  "Authorization": "Bearer <JWT_TOKEN>",
  "Content-Type": "application/json"
}
```

### Standard Response
```json
{
  "status": "success|error",
  "message": "Operation result message",
  "data": {},
  "timestamp": "2024-12-13T10:30:00Z"
}
```

## 🛡️ Security Architecture

1. **Authentication**
   - JWT token-based authentication
   - Stateless server
   - Token expiration

2. **Authorization**
   - Role-based access control (RBAC)
   - Endpoint-level permission checking
   - User-specific data isolation

3. **Data Protection**
   - Password hashing with Bcrypt
   - SQL injection prevention
   - CORS policy enforcement

4. **Validation**
   - Frontend validation
   - Server-side validation
   - Input sanitization

## 🚀 Scalability Considerations

1. **Horizontal Scaling**
   - Stateless API design
   - Session stored in JWT
   - Database connection pooling

2. **Caching**
   - Product catalog caching
   - User session caching
   - API response caching

3. **Database Optimization**
   - Indexed queries
   - Pagination for large datasets
   - Lazy loading relationships

4. **Frontend Optimization**
   - Code splitting
   - Lazy loading components
   - Image optimization

## 🔧 Configuration Management

### Spring Boot Configuration
- `application.properties` for profiles (dev, prod)
- Environment-specific database settings
- Security configurations

### Frontend Configuration
- `.env` files for different environments
- API base URL configuration
- Feature flags

## 📈 Performance Optimization

1. **Backend**
   - Database query optimization
   - Caching strategies
   - Connection pooling

2. **Frontend**
   - Code splitting with Vite
   - Image lazy loading
   - Component memoization

3. **Network**
   - API response compression
   - Request debouncing
   - Pagination

---

**Document Version**: 1.0  
**Last Updated**: December 2024
