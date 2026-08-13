# SalesSavvy - Project Structure

Detailed breakdown of the project directory structure and file organization.

## 📁 Overall Project Structure

```
SalesSavvy/
├── Salessavvy_app/                 # Frontend (React + Vite)
├── SalesSavvy_App/                 # Backend (Spring Boot)
├── Documentation Files
│   ├── README.md
│   ├── ARCHITECTURE.md
│   ├── SETUP.md
│   ├── API_DOCUMENTATION.md
│   ├── PROJECT_STRUCTURE.md
│   ├── CONTRIBUTING.md
│   └── TROUBLESHOOTING.md
└── .git/                           # Git repository
```

## 🎨 Frontend Structure (`Salessavvy_app/`)

### Root Level Files

```
Salessavvy_app/
├── index.html              # HTML entry point
├── package.json            # NPM dependencies and scripts
├── package-lock.json       # Locked dependency versions
├── vite.config.js          # Vite build configuration
├── eslint.config.js        # ESLint configuration
├── components.json         # Component configuration
├── jsconfig.json           # JavaScript configuration
├── .env                    # Environment variables (git-ignored)
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
└── README.md               # Frontend README
```

### `src/` Directory

```
src/
├── main.jsx               # Application entry point
├── App.jsx                # Root component
├── App.css                # Root styles
├── index.css              # Global styles
│
├── pages/                 # Page components (routed)
│   ├── Register.jsx       # User registration page
│   ├── Login.jsx          # User login page
│   ├── Home.jsx           # Home/dashboard page
│   ├── ProductDetail.jsx  # Product detail page
│   ├── Cart.jsx           # Shopping cart page
│   ├── Wishlist.jsx       # User wishlist page
│   ├── Orders.jsx         # Orders history page
│   ├── AdminDashboard.jsx # Admin dashboard
│   ├── AdminProducts.jsx  # Product management
│   ├── AdminUsers.jsx     # User management
│   └── AdminOrders.jsx    # Order management
│
├── components/            # Reusable React components
│   ├── Header.jsx         # Navigation header
│   ├── Footer.jsx         # Footer component
│   ├── Navbar.jsx         # Navigation bar
│   ├── ProductCard.jsx    # Product card component
│   ├── CartItem.jsx       # Cart item component
│   ├── OrderCard.jsx      # Order display card
│   ├── Button.jsx         # Custom button component
│   ├── Input.jsx          # Custom input component
│   ├── Modal.jsx          # Modal dialog component
│   ├── Loading.jsx        # Loading spinner
│   ├── Error.jsx          # Error display component
│   └── ProtectedRoute.jsx # Route protection component
│
├── services/              # API service layer
│   ├── api.js             # Axios instance configuration
│   ├── authService.js     # Authentication API calls
│   ├── userService.js     # User API calls
│   ├── productService.js  # Product API calls
│   ├── cartService.js     # Cart API calls
│   ├── orderService.js    # Order API calls
│   ├── paymentService.js  # Payment API calls
│   └── wishlistService.js # Wishlist API calls
│
├── styles/                # Shared stylesheets
│   ├── colors.css         # Color definitions
│   ├── typography.css     # Font and text styles
│   ├── animations.css     # Animation definitions
│   └── responsive.css     # Responsive utilities
│
├── lib/                   # Utility functions
│   ├── utils.js           # General utilities
│   ├── validators.js      # Form validators
│   ├── formatters.js      # Data formatters
│   ├── constants.js       # Constants
│   └── hooks.js           # Custom React hooks
│
├── assets/                # Static assets
│   ├── images/            # Image files
│   │   ├── logo.png
│   │   ├── hero.jpg
│   │   └── icons/
│   ├── fonts/             # Font files
│   └── data/              # Mock data
│
└── context/               # React Context (optional)
    ├── AuthContext.jsx    # Authentication context
    └── ThemeContext.jsx   # Theme context
```

### Frontend File Descriptions

| File | Purpose |
|------|---------|
| `main.jsx` | React entry point, mounts App to DOM |
| `App.jsx` | Root component, sets up routing |
| `pages/*` | Full-page components mapped to routes |
| `components/*` | Reusable UI components |
| `services/*` | API communication layer |
| `lib/utils.js` | Helper functions and utilities |
| `styles/*` | Global and shared CSS |
| `assets/*` | Images, fonts, static data |

## 🖥️ Backend Structure (`SalesSavvy_App/`)

### Root Level Files

```
SalesSavvy_App/
├── pom.xml                # Maven project configuration
├── mvnw                   # Maven wrapper (Unix/Linux)
├── mvnw.cmd              # Maven wrapper (Windows)
├── .gitignore            # Git ignore rules
├── HELP.md               # Help documentation
├── README.md             # Backend README
└── .project              # Eclipse project file
```

### `src/main/` Directory

```
src/main/
├── java/                 # Java source code
│   └── com/kodnest/SalesSavvy_App/
│       ├── SalesSavvyAppApplication.java  # Spring Boot entry point
│       │
│       ├── Controllers/               # REST endpoint handlers
│       │   ├── AuthController.java
│       │   ├── UserController.java
│       │   ├── ProductController.java
│       │   ├── CartController.java
│       │   ├── OrderController.java
│       │   ├── PaymentController.java
│       │   ├── WishlistController.java
│       │   └── HomeController.java
│       │
│       ├── Services/                 # Business logic
│       │   ├── AuthService.java
│       │   ├── UserService.java
│       │   ├── ProductService.java
│       │   ├── CartService.java
│       │   ├── OrderService.java
│       │   ├── PaymentService.java
│       │   ├── WishlistService.java
│       │   └── EmailService.java (optional)
│       │
│       ├── Repositories/             # Data access objects
│       │   ├── UserRepository.java
│       │   ├── ProductRepository.java
│       │   ├── CategoryRepository.java
│       │   ├── CartRepository.java
│       │   ├── OrderRepository.java
│       │   ├── OrderItemRepository.java
│       │   ├── WishlistRepository.java
│       │   ├── ProductImageRepository.java
│       │   └── JWTTokenRepository.java
│       │
│       ├── Entities/                 # JPA Entity classes
│       │   ├── User.java
│       │   ├── Product.java
│       │   ├── Category.java
│       │   ├── CartItem.java
│       │   ├── Order.java
│       │   ├── OrderItem.java
│       │   ├── OrderStatus.java
│       │   ├── Wishlist.java
│       │   ├── ProductImage.java
│       │   ├── JWTToken.java
│       │   └── Role.java
│       │
│       ├── Dto/                      # Data Transfer Objects
│       │   ├── LoginRequest.java
│       │   ├── RegisterRequest.java
│       │   ├── UserDto.java
│       │   ├── ProductDto.java
│       │   ├── OrderDto.java
│       │   ├── CartItemDto.java
│       │   └── ApiResponse.java
│       │
│       ├── Config/                   # Configuration classes
│       │   ├── SecurityConfig.java
│       │   ├── FilterConfig.java
│       │   ├── CorsConfig.java
│       │   ├── JwtConfig.java
│       │   └── DatabaseConfig.java
│       │
│       ├── Filters/                  # Request/Response filters
│       │   └── AuthenticationFilter.java
│       │
│       ├── AdminControllers/         # Admin-specific endpoints
│       │   ├── AdminUserController.java
│       │   ├── AdminProductController.java
│       │   └── AdminBusinessController.java
│       │
│       ├── AdminServices/            # Admin business logic
│       │   ├── AdminUserService.java
│       │   ├── AdminProductService.java
│       │   └── AdminBusinessService.java
│       │
│       ├── Exceptions/               # Custom exceptions
│       │   ├── ResourceNotFoundException.java
│       │   ├── UnauthorizedException.java
│       │   ├── BadRequestException.java
│       │   └── GlobalExceptionHandler.java
│       │
│       └── Util/                     # Utility classes
│           ├── JwtUtil.java
│           ├── ValidationUtil.java
│           └── StringUtil.java
│
└── resources/            # Configuration and static files
    ├── application.properties        # Main configuration
    ├── application-dev.properties    # Dev profile
    ├── application-prod.properties   # Production profile
    │
    ├── META-INF/
    │   └── additional-spring-configuration-metadata.json
    │
    ├── static/                       # Static assets
    │   ├── css/
    │   ├── js/
    │   └── images/
    │
    └── templates/                    # Thymeleaf templates (if needed)
```

### `src/test/` Directory

```
src/test/
└── java/
    └── com/kodnest/SalesSavvy_App/
        ├── SalesSavvyAppApplicationTests.java
        ├── Controllers/
        │   └── AuthControllerTest.java
        │
        ├── Services/
        │   ├── UserServiceTest.java
        │   ├── ProductServiceTest.java
        │   └── CartServiceTest.java
        │
        ├── Repositories/
        │   └── UserRepositoryTest.java
        │
        └── Util/
            └── JwtUtilTest.java
```

### Backend File Descriptions

#### Controllers
| File | Purpose |
|------|---------|
| `AuthController.java` | Handle login, registration, logout |
| `UserController.java` | User profile and account operations |
| `ProductController.java` | Product browsing and search |
| `CartController.java` | Shopping cart operations |
| `OrderController.java` | Order placement and tracking |
| `PaymentController.java` | Payment processing |
| `WishlistController.java` | Wishlist management |

#### Services
| File | Purpose |
|------|---------|
| `AuthService.java` | Authentication logic, JWT generation |
| `UserService.java` | User profile management |
| `ProductService.java` | Product catalog operations |
| `CartService.java` | Shopping cart business logic |
| `OrderService.java` | Order processing |
| `PaymentService.java` | Payment handling |
| `WishlistService.java` | Wishlist operations |

#### Entities
| File | Purpose |
|------|---------|
| `User.java` | User account model |
| `Product.java` | Product catalog model |
| `Category.java` | Product category model |
| `CartItem.java` | Shopping cart item |
| `Order.java` | Order record |
| `OrderItem.java` | Individual order line item |
| `Wishlist.java` | User wishlist item |
| `ProductImage.java` | Product image storage |
| `JWTToken.java` | Token storage |
| `Role.java` | User role definition |

#### Repositories
| File | Purpose |
|------|---------|
| `UserRepository.java` | JPA repository for User entity |
| `ProductRepository.java` | JPA repository for Product entity |
| `CategoryRepository.java` | JPA repository for Category entity |
| `CartRepository.java` | JPA repository for Cart operations |
| `OrderRepository.java` | JPA repository for Order entity |
| `WishlistRepository.java` | JPA repository for Wishlist entity |

## 📊 Key Directories Summary

### Frontend (`Salessavvy_app/`)

| Directory | Contents | Purpose |
|-----------|----------|---------|
| `pages/` | Page components | Full-page components for routing |
| `components/` | Reusable components | UI components used across pages |
| `services/` | API services | HTTP client and API calls |
| `styles/` | CSS files | Global and shared styles |
| `assets/` | Images, fonts | Static resources |
| `lib/` | Utilities | Helper functions and constants |

### Backend (`SalesSavvy_App/`)

| Directory | Contents | Purpose |
|-----------|----------|---------|
| `Controllers/` | REST handlers | API endpoint definitions |
| `Services/` | Business logic | Core application logic |
| `Repositories/` | Data access | Database queries |
| `Entities/` | JPA models | Database entity mappings |
| `Dto/` | Data objects | Request/response DTOs |
| `Config/` | Configuration | Spring configuration classes |
| `Filters/` | HTTP filters | Request/response interceptors |
| `AdminControllers/` | Admin endpoints | Admin-specific operations |
| `resources/` | Config files | Properties and templates |

## 🔄 Data Flow Through Directories

### Frontend Request Flow

```
pages/RegisterPage.jsx
    ↓ (uses)
components/FormInput.jsx
    ↓ (calls)
services/authService.js
    ↓ (HTTP request to)
[Backend API]
    ↓ (response)
lib/validators.js (validates)
    ↓
State update → Re-render
```

### Backend Request Flow

```
Controllers/AuthController.java (receives)
    ↓
Services/AuthService.java (processes)
    ↓
Repositories/UserRepository.java (queries)
    ↓
Entities/User.java (database)
    ↓
Dto/Response (serialized response)
    ↓
[Back to Frontend]
```

## 📝 Important Configuration Files

### Frontend
- `package.json` - Dependencies and scripts
- `vite.config.js` - Build tool configuration
- `eslint.config.js` - Code quality rules
- `.env` - Environment variables

### Backend
- `pom.xml` - Maven dependencies
- `application.properties` - Spring Boot configuration
- `application-dev.properties` - Development overrides
- `application-prod.properties` - Production overrides

## 🎯 Adding New Features

### Adding a New Page

1. Create component in `pages/YourPage.jsx`
2. Add route in `App.jsx`
3. Create service in `services/yourService.js`
4. Add components in `components/` as needed

### Adding a New API Endpoint

1. Create Controller in `Controllers/YourController.java`
2. Create Service in `Services/YourService.java`
3. Create Repository in `Repositories/YourRepository.java`
4. Create Entity in `Entities/YourEntity.java`
5. Create DTO in `Dto/YourDto.java`

### Adding New Utilities

- General utilities → `lib/utils.js` (frontend)
- Validators → `lib/validators.js` (frontend)
- Constants → `lib/constants.js` (frontend)
- Java utilities → `Util/` (backend)

## 📚 File Naming Conventions

### Frontend
- **Components**: `ComponentName.jsx` (PascalCase)
- **Pages**: `PageName.jsx` (PascalCase)
- **Services**: `serviceName.js` (camelCase)
- **Styles**: `style-name.css` (kebab-case)
- **Utilities**: `utilityName.js` (camelCase)

### Backend
- **Classes**: `ClassName.java` (PascalCase)
- **Packages**: `packagename` (lowercase)
- **Methods**: `methodName()` (camelCase)
- **Constants**: `CONSTANT_NAME` (UPPER_SNAKE_CASE)
- **Variables**: `variableName` (camelCase)

---

**Project Structure Version**: 1.0  
**Last Updated**: December 2024
