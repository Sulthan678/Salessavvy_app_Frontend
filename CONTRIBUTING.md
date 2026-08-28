# SalesSavvy - Contributing Guidelines

Thank you for your interest in contributing to SalesSavvy! This document provides guidelines and instructions for contributing to the project.

## 📋 Table of Contents

1. [Code of Conduct](#-code-of-conduct)
2. [Getting Started](#-getting-started)
3. [Development Workflow](#-development-workflow)
4. [Coding Standards](#-coding-standards)
5. [Git Workflow](#-git-workflow)
6. [Commit Messages](#-commit-messages)
7. [Pull Requests](#-pull-requests)
8. [Testing](#-testing)
9. [Documentation](#-documentation)
10. [Reporting Issues](#-reporting-issues)

## 🤝 Code of Conduct

### Our Commitment

We are committed to providing a welcoming and inspiring community for all. We expect all contributors to:

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive criticism
- Report unacceptable behavior to the maintainers

### Unacceptable Behavior

- Harassment or discrimination
- Unwelcome sexual advances
- Deliberate intimidation or stalking
- Sustained disruption of discussions
- Publishing private information

## 🚀 Getting Started

### 1. Fork the Repository

```bash
# Click "Fork" button on GitHub to create your copy
```

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/SalesSavvy_App.git
cd SalesSavvy_App
```

### 3. Add Upstream Remote

```bash
git remote add upstream https://github.com/ORIGINAL_OWNER/SalesSavvy_App.git
```

### 4. Set Up Development Environment

Follow the [SETUP.md](./SETUP.md) guide to set up your development environment.

### 5. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b bugfix/issue-description
```

## 🔄 Development Workflow

### Before Starting

1. Check existing issues and pull requests to avoid duplicates
2. Create an issue first for major changes (discuss before coding)
3. Reference the issue number in your PR

### Development Steps

1. **Create Feature Branch**
```bash
git checkout -b feature/add-payment-gateway
```

2. **Make Changes**
```bash
# Frontend changes
cd Salessavvy_app
# Make your changes

# Backend changes
cd ../SalesSavvy_App
# Make your changes
```

3. **Test Your Changes**
```bash
# Frontend
npm run lint
npm run build

# Backend
mvn clean verify
mvn test
```

4. **Commit Changes**
```bash
git add .
git commit -m "feat: add payment gateway integration"
```

5. **Push to Your Fork**
```bash
git push origin feature/add-payment-gateway
```

6. **Create Pull Request**
   - Go to GitHub and create a PR
   - Reference related issues
   - Provide clear description

## 📝 Coding Standards

### JavaScript/React

#### Naming Conventions
```javascript
// Components: PascalCase
function UserProfile() {}

// Functions/Variables: camelCase
const getUserData = () => {}
let userData = {}

// Constants: UPPER_SNAKE_CASE
const API_BASE_URL = 'http://localhost:9090/api'

// File names: PascalCase for components, camelCase for utilities
// UserProfile.jsx, userService.js
```

#### Code Style
```javascript
// ✅ Good
const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!formData.email) {
    setError('Email is required');
    return;
  }
  
  try {
    const response = await userService.register(formData);
    navigate('/login');
  } catch (error) {
    setError(error.message);
  }
};

// ❌ Avoid
const h = async e => {
  e.preventDefault();
  if (!formData.email) { setError('Email is required'); return; }
  try { const r = await userService.register(formData); navigate('/login'); } 
  catch (e) { setError(e.message); }
};
```

#### React Best Practices
```javascript
// ✅ Use functional components with hooks
function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    fetchProducts();
  }, []);
  
  return <div>{/* JSX */}</div>;
}

// ✅ Custom hooks for reusable logic
function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch(url)
      .then(r => r.json())
      .then(setData)
      .catch(setError);
  }, [url]);
  
  return { data, error };
}

// ❌ Avoid class components
class ProductList extends React.Component { }
```

### Java/Spring Boot

#### Naming Conventions
```java
// Classes: PascalCase
public class UserController { }

// Methods/Variables: camelCase
public User getUserById(Long id) { }
private String userName;

// Constants: UPPER_SNAKE_CASE
private static final String API_VERSION = "1.0";

// Package names: lowercase
package com.kodnest.salesdavvy.service;
```

#### Code Style
```java
// ✅ Good
@PostMapping("/register")
public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
    if (request.getUsername() == null || request.getUsername().isEmpty()) {
        return ResponseEntity.badRequest()
            .body(new ApiResponse("Username is required"));
    }
    
    try {
        User user = userService.register(request);
        return ResponseEntity.ok(new ApiResponse("User registered successfully", user));
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(new ApiResponse("Registration failed: " + e.getMessage()));
    }
}

// ❌ Avoid
@PostMapping("/register")
public User register(RegisterRequest request){
    User u = userService.register(request);
    return u;
}
```

#### Spring Best Practices
```java
// ✅ Use dependency injection
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    
    public User getUserById(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}

// ✅ Use exceptions for error handling
@ExceptionHandler(ResourceNotFoundException.class)
public ResponseEntity<?> handleNotFound(ResourceNotFoundException e) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND)
        .body(new ApiResponse("error", e.getMessage()));
}

// ❌ Avoid manual database connections
Connection conn = DriverManager.getConnection(url, user, pass);
```

### CSS/Styling

```css
/* ✅ Use BEM naming convention */
.button { }
.button--primary { }
.button--primary:hover { }
.button__icon { }

/* ✅ Organize properties */
.card {
  /* Display & Layout */
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  /* Sizing */
  width: 100%;
  height: auto;
  
  /* Spacing */
  margin: 0;
  padding: 1rem;
  
  /* Colors & Background */
  background-color: #fff;
  color: #333;
  
  /* Border & Shadow */
  border: 1px solid #eee;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
  /* Typography */
  font-size: 1rem;
  line-height: 1.5;
}

/* ✅ Use Tailwind utilities when possible */
<div className="flex flex-col gap-4 w-full p-4 bg-white rounded-lg shadow">
  {/* Content */}
</div>
```

## 🌿 Git Workflow

### Branch Naming

```bash
# Feature
git checkout -b feature/add-search-functionality

# Bug fix
git checkout -b bugfix/fix-cart-calculation

# Hotfix
git checkout -b hotfix/fix-critical-security-issue

# Documentation
git checkout -b docs/update-api-documentation

# Refactoring
git checkout -b refactor/reorganize-components
```

### Keep Your Branch Updated

```bash
# Fetch latest from upstream
git fetch upstream

# Rebase your branch on latest main
git rebase upstream/main

# Force push (only on your own branch)
git push --force origin feature/your-feature
```

## 💬 Commit Messages

Follow the Conventional Commits format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, semicolons, etc.)
- **refactor**: Code refactoring without feature changes
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Build process, dependencies, etc.

### Examples

```bash
# Good commits
git commit -m "feat(auth): implement JWT token refresh mechanism"
git commit -m "fix(cart): resolve quantity calculation bug"
git commit -m "docs: update API documentation with new endpoints"
git commit -m "refactor(product): simplify product filtering logic"
git commit -m "test(user): add tests for user registration"

# Avoid
git commit -m "fix stuff"
git commit -m "Updated files"
git commit -m "WIP"
```

## 🔀 Pull Requests

### PR Title Format

```
<type>: <description>

# Examples
feat: Add two-factor authentication
fix: Resolve checkout page performance issue
docs: Update deployment guide
```

### PR Description Template

```markdown
## Description
Brief description of the changes

## Fixes Issue
Closes #123

## Changes
- Change 1
- Change 2
- Change 3

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Mobile responsive

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed self-review
- [ ] I have commented complex areas
- [ ] I have updated documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests
- [ ] Tests pass locally
```

### PR Review Process

1. Maintainer reviews the code
2. Request changes if needed
3. Author makes requested changes
4. Re-review and approve
5. Merge when approved

## 🧪 Testing

### Frontend Testing

```bash
# Run linter
npm run lint

# Build for testing
npm run build

# Write tests (example with React Testing Library)
import { render, screen, fireEvent } from '@testing-library/react';
import UserProfile from './UserProfile';

describe('UserProfile', () => {
  test('renders user name', () => {
    render(<UserProfile user={{ name: 'John' }} />);
    expect(screen.getByText('John')).toBeInTheDocument();
  });
});
```

### Backend Testing

```bash
# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=UserServiceTest

# Example JUnit test
@Test
public void testUserRegistration() {
    RegisterRequest request = new RegisterRequest();
    request.setUsername("testuser");
    request.setEmail("test@example.com");
    
    User user = userService.register(request);
    
    assertNotNull(user.getId());
    assertEquals("testuser", user.getUsername());
}
```

### Test Coverage

- Target: Minimum 70% code coverage
- Check coverage: `mvn clean test jacoco:report`

## 📚 Documentation

### Code Comments

```javascript
// ✅ Good: Explain why, not what
// Debounce search to reduce API calls
const handleSearch = debounce((query) => {
  fetchProducts(query);
}, 500);

// ❌ Bad: Obvious comments
// Set isLoading to true
setLoading(true);
```

### JSDoc/JavaDoc

```javascript
/**
 * Fetches products from the API with optional filters
 * @param {Object} filters - Filter criteria
 * @param {string} filters.category - Product category
 * @param {number} filters.maxPrice - Maximum price
 * @param {number} page - Page number (default: 1)
 * @returns {Promise<Array>} Array of products
 * @throws {Error} When API call fails
 */
async function getProducts(filters = {}, page = 1) { }
```

```java
/**
 * Authenticates a user and generates a JWT token
 *
 * @param email User's email address
 * @param password User's password
 * @return JWT token for authenticated user
 * @throws UnauthorizedException if credentials are invalid
 */
public String authenticate(String email, String password) { }
```

### Update Documentation

When making changes that affect:
- API endpoints → Update [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- Architecture → Update [ARCHITECTURE.md](./ARCHITECTURE.md)
- Setup process → Update [SETUP.md](./SETUP.md)
- Project structure → Update [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)

## 🐛 Reporting Issues

### Issue Template

```markdown
## Description
Describe the issue clearly

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Screenshots
Add screenshots if applicable

## Environment
- OS: Windows 10
- Node: v18.0.0
- npm: v9.0.0
- Java: v17

## Additional Context
Any additional information
```

### Bug Report Example

```markdown
## Description
Cart quantity not updating when changing product count

## Steps to Reproduce
1. Navigate to product page
2. Add product to cart
3. Click on cart
4. Change quantity from 2 to 5
5. Quantity still shows 2

## Expected Behavior
Quantity should update to 5

## Actual Behavior
Quantity remains at 2

## Screenshots
[Add screenshot]

## Environment
- OS: Windows 11
- Browser: Chrome 120
- React: 19.2.0
```

## 🏆 Recognition

Contributors will be recognized in:
- Project README
- Release notes
- Contributors list

## 📞 Questions?

- Open an issue for questions
- Join our community chat
- Check existing discussions
- Review [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

## 📜 License

By contributing to SalesSavvy, you agree that your contributions will be licensed under the MIT License.

---

**Contributing Guidelines Version**: 1.0  
**Last Updated**: December 2024

Thank you for contributing to make SalesSavvy better! 🎉
