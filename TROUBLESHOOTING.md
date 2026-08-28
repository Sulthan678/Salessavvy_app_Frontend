# SalesSavvy - Troubleshooting Guide

Common issues and solutions for the SalesSavvy application.

## 📋 Table of Contents

1. [Setup Issues](#-setup-issues)
2. [Frontend Issues](#-frontend-issues)
3. [Backend Issues](#-backend-issues)
4. [Database Issues](#-database-issues)
5. [Authentication Issues](#-authentication-issues)
6. [API Communication Issues](#-api-communication-issues)
7. [Performance Issues](#-performance-issues)
8. [Deployment Issues](#-deployment-issues)

---

## 🔧 Setup Issues

### Node.js Not Found

**Error**: `node: command not found` or `npm: command not found`

**Solutions**:
1. **Install Node.js**
   - Download from [nodejs.org](https://nodejs.org/)
   - Choose LTS version
   - Run installer
   - Restart terminal/command prompt

2. **Verify Installation**
```bash
node --version
npm --version
```

3. **Add to PATH (if needed)**
   - **Windows**: Reinstall Node.js and ensure "Add to PATH" is checked
   - **macOS**: Use Homebrew: `brew install node`
   - **Linux**: `sudo apt-get install nodejs npm`

---

### Java Not Found

**Error**: `java: command not found` or `Java version not recognized`

**Solutions**:
1. **Install Java 17**
   - Download from [oracle.com](https://www.oracle.com/java/technologies/downloads/)
   - Or use package manager:
   ```bash
   # macOS
   brew install java17
   
   # Linux
   sudo apt-get install openjdk-17-jdk
   ```

2. **Set JAVA_HOME**
   ```bash
   # Windows (Command Prompt)
   set JAVA_HOME=C:\Program Files\Java\jdk-17
   
   # macOS/Linux (Terminal)
   export JAVA_HOME=/usr/libexec/java_home -v 17
   ```

3. **Verify Installation**
```bash
java -version
javac -version
```

---

### Maven Not Found

**Error**: `mvn: command not found`

**Solutions**:
1. **Install Maven**
   - Download from [maven.apache.org](https://maven.apache.org/download.cgi)
   - Extract to a directory
   - Add to PATH

2. **Use Maven Wrapper (Alternative)**
```bash
# Windows
mvnw clean install

# macOS/Linux
./mvnw clean install
```

---

### MySQL Connection Failed

**Error**: `Can't connect to MySQL server on 'localhost'`

**Solutions**:
1. **Start MySQL Service**
   ```bash
   # Windows (Command Prompt as Admin)
   net start MySQL80
   
   # macOS
   brew services start mysql
   
   # Linux
   sudo systemctl start mysql
   ```

2. **Check MySQL Installation**
```bash
mysql --version
mysql -u root -p
```

3. **Verify Credentials in application.properties**
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/salesdavvy_db
spring.datasource.username=root
spring.datasource.password=your_password
```

---

## 🎨 Frontend Issues

### Port 5173 Already in Use

**Error**: `Port 5173 already in use` or `EADDRINUSE: address already in use`

**Solutions**:

1. **Use Different Port**
```bash
npm run dev -- --port 3000
```

2. **Kill Process Using Port**
   ```bash
   # Windows (Command Prompt as Admin)
   netstat -ano | findstr :5173
   taskkill /PID <PID> /F
   
   # macOS/Linux
   lsof -i :5173
   kill -9 <PID>
   ```

3. **Restart Development Server**
```bash
# Stop with Ctrl+C
npm run dev
```

---

### Dependencies Not Installing

**Error**: `npm ERR!` or `npm WARN`

**Solutions**:

1. **Clear npm Cache**
```bash
npm cache clean --force
```

2. **Remove node_modules and reinstall**
```bash
rm -rf node_modules package-lock.json
npm install
```

3. **Use npm ci (for exact versions)**
```bash
npm ci
```

4. **Check npm Version**
```bash
npm --version
# Should be v8.0.0 or higher
npm install -g npm@latest
```

---

### CORS Error in Console

**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Symptoms**: Requests work in Postman but fail in browser

**Solutions**:

1. **Update Backend CORS Settings**
   
   File: `application.properties`
```properties
spring.web.cors.allowed-origins=http://localhost:5173,http://localhost:3000
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
spring.web.cors.allow-credentials=true
```

2. **Verify API URL**
   
   File: `.env`
```env
VITE_API_BASE_URL=http://localhost:9090/api
```

3. **Restart Backend Server**
```bash
mvn spring-boot:run
```

4. **Clear Browser Cache**
   - Press `Ctrl+Shift+Delete`
   - Clear cookies and cache
   - Reload page

---

### Blank Page After npm run build

**Error**: Built project shows blank page

**Solutions**:

1. **Check Build Output**
```bash
npm run build
# Check dist/ folder is created with files
```

2. **Verify Vite Configuration**
   
   File: `vite.config.js`
```javascript
export default {
  server: {
    port: 5173,
  }
}
```

3. **Check for JS Errors**
   - Open DevTools: `F12`
   - Check Console tab for errors
   - Check Network tab for failed requests

---

### Styling Not Applied

**Error**: Page loads but styles are missing

**Solutions**:

1. **Check Tailwind CSS Import**
   
   File: `src/index.css`
```css
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
```

2. **Rebuild Tailwind**
```bash
npm run build
```

3. **Check CSS File Imports**
```jsx
import '../styles/App.css';
```

4. **Clear Browser Cache**
   - `Ctrl+Shift+Delete` → Clear all
   - `Ctrl+F5` (hard refresh)

---

## 🖥️ Backend Issues

### Port 9090 Already in Use

**Error**: `Port 9090 already in use`

**Solutions**:

1. **Use Different Port**
   
   File: `application.properties`
```properties
server.port=8080
```

2. **Kill Process Using Port**
   ```bash
   # Windows (Admin)
   netstat -ano | findstr :9090
   taskkill /PID <PID> /F
   
   # macOS/Linux
   lsof -i :9090
   kill -9 <PID>
   ```

---

### Spring Boot Won't Start

**Error**: `Application failed to start` or `No main method found`

**Solutions**:

1. **Check Dependencies**
```bash
mvn clean install
mvn dependency:tree
```

2. **Verify Main Application Class**
   
   File: `SalesSavvyAppApplication.java`
```java
@SpringBootApplication
public class SalesSavvyAppApplication {
    public static void main(String[] args) {
        SpringApplication.run(SalesSavvyAppApplication.class, args);
    }
}
```

3. **Check Java Version**
```bash
java -version
# Must be Java 17 or higher
```

4. **Rebuild Project**
```bash
mvn clean
mvn clean install
mvn spring-boot:run
```

---

### Maven Build Failure

**Error**: `Build Failure` or `Compilation Error`

**Solutions**:

1. **Check Java Version Compatibility**
```bash
java -version
# Ensure Java 17+
```

2. **Clear Maven Cache**
```bash
mvn clean
rm -rf ~/.m2/repository
mvn install
```

3. **Check for Compilation Errors**
```bash
mvn clean compile
# Look at error messages
```

4. **Verify POM.xml**
   - Check for syntax errors
   - Verify all dependencies
   - Check parent version

---

## 💾 Database Issues

### Database Not Created

**Error**: `Unknown database 'salesdavvy_db'`

**Solutions**:

1. **Create Database Manually**
```sql
CREATE DATABASE salesdavvy_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'salesdavvy_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON salesdavvy_db.* TO 'salesdavvy_user'@'localhost';
FLUSH PRIVILEGES;
```

2. **Verify Connection**
```bash
mysql -u salesdavvy_user -p salesdavvy_db
SHOW TABLES;
```

---

### Tables Not Created (JPA)

**Error**: `Table doesn't exist` or `Unknown table`

**Solutions**:

1. **Enable Auto Schema Update**
   
   File: `application.properties`
```properties
spring.jpa.hibernate.ddl-auto=update
```

2. **Validate Schema**
```bash
# Restart application - tables will be auto-created
mvn spring-boot:run
```

3. **Manual Migration**
```sql
-- If auto-creation fails, create tables manually
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    role VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add other tables...
```

---

### Slow Database Queries

**Error**: Application runs slowly

**Solutions**:

1. **Add Database Indexes**
```sql
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_product_category ON products(category_id);
CREATE INDEX idx_order_user ON orders(user_id);
```

2. **Enable Query Logging**
   
   File: `application.properties`
```properties
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
logging.level.org.hibernate.SQL=DEBUG
```

3. **Use Pagination**
```java
Page<Product> products = productRepository.findAll(PageRequest.of(0, 10));
```

---

## 🔐 Authentication Issues

### JWT Token Expired

**Error**: `401 Unauthorized` or `Token has expired`

**Solutions**:

1. **Login Again**
   - Get new token
   - Update Authorization header

2. **Increase Token Expiration**
   
   File: `application.properties`
```properties
jwt.expiration=604800000  # 7 days instead of 24 hours
```

---

### Invalid Token

**Error**: `Invalid token` or `JWT parsing failed`

**Solutions**:

1. **Verify Token Format**
```
Authorization: Bearer <token>
```
- Ensure "Bearer " prefix
- No extra spaces

2. **Check JWT Secret**
   
   File: `application.properties`
```properties
jwt.secret=your_super_secret_key_change_this_in_production
```
- Must be same in both login and validation

3. **Validate Token**
```bash
# Use online JWT decoder: jwt.io
# Paste your token to inspect
```

---

### Login Always Fails

**Error**: `Invalid credentials` even with correct password

**Solutions**:

1. **Verify Database User Exists**
```sql
SELECT * FROM users WHERE email = 'test@example.com';
```

2. **Check Password Hashing**
```java
// Ensure password is hashed in database, not plain text
if (passwordEncoder.matches(inputPassword, storedHashedPassword)) {
    // Password is correct
}
```

3. **Test with User Registration**
   - Register new user
   - Try logging in with new account
   - If works, password hashing is the issue

---

## 🔌 API Communication Issues

### 404 Not Found

**Error**: `404 Not Found` for valid endpoints

**Solutions**:

1. **Verify Endpoint URL**
   ```bash
   # Check exact endpoint path
   # http://localhost:9090/api/products (correct)
   # http://localhost:9090/products (incorrect)
   ```

2. **Check Application Context Path**
   
   File: `application.properties`
```properties
server.servlet.context-path=/api
```

3. **Restart Backend**
```bash
mvn spring-boot:run
```

---

### 400 Bad Request

**Error**: `400 Bad Request`

**Solutions**:

1. **Verify Request Format**
```javascript
// Check Content-Type header
const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};
```

2. **Validate Request Body**
```javascript
// Check all required fields are present
const data = {
  username: "valid_username",
  email: "valid@email.com",
  password: "ValidPass123!"
};
```

3. **Check Data Types**
   - Strings: "value"
   - Numbers: 123
   - Booleans: true/false
   - Arrays: []
   - Objects: {}

---

### 500 Internal Server Error

**Error**: `500 Internal Server Error`

**Solutions**:

1. **Check Backend Logs**
```bash
# Look at console output when running backend
mvn spring-boot:run
# Find error stack trace
```

2. **Enable Detailed Error Messages**
   
   File: `application.properties`
```properties
server.error.include-message=always
server.error.include-stacktrace=always
```

3. **Common Causes**
   - Database connection failed
   - Null pointer exception
   - Missing dependency injection
   - Unhandled exception

4. **Add Logging**
```java
@PostMapping("/register")
public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
    try {
        logger.info("Registration attempt for: " + request.getEmail());
        User user = userService.register(request);
        return ResponseEntity.ok(user);
    } catch (Exception e) {
        logger.error("Registration error: ", e);
        return ResponseEntity.status(500).body(e.getMessage());
    }
}
```

---

## ⚡ Performance Issues

### Slow Application Load

**Causes & Solutions**:

1. **Large Bundle Size**
```bash
# Frontend: Check bundle size
npm run build
# Look at dist/assets/ files

# Solutions:
# - Code splitting: import() instead of import
# - Lazy load routes: React.lazy()
# - Remove unused dependencies
```

2. **Slow API Responses**
```java
// Backend: Add pagination
@GetMapping("/products")
public Page<Product> getProducts(
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "10") int size
) {
    return productService.findAll(PageRequest.of(page, size));
}
```

3. **Database Queries**
```java
// Use eager loading instead of lazy
@OneToMany(fetch = FetchType.EAGER)
// Or use DTO to fetch specific fields
```

---

### Memory Issues

**Error**: `OutOfMemoryError` or application crashes

**Solutions**:

1. **Increase Heap Memory**
```bash
# Backend
mvn spring-boot:run -Dspring-boot.run.jvmArguments="-Xmx1024m -Xms512m"

# Frontend (if using Node)
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

2. **Check for Memory Leaks**
   - Ensure event listeners are removed
   - Clear intervals/timeouts
   - Cleanup useEffect hooks

---

## 🚀 Deployment Issues

### Environment Variables Not Loading

**Error**: `.env` file not being read

**Solutions**:

1. **Verify .env File Exists**
```bash
# Frontend
ls -la .env
cat .env
```

2. **Use Correct Variable Names**
   - Frontend: `VITE_` prefix required
   - Backend: Use `application-prod.properties`

3. **Rebuild Application**
```bash
npm run build
# .env variables are baked into build
```

---

### Application Works Locally But Not Online

**Causes & Solutions**:

1. **API URL Hardcoded**
```javascript
// ❌ Bad: Hardcoded localhost
const API_URL = 'http://localhost:9090/api';

// ✅ Good: Use environment variable
const API_URL = import.meta.env.VITE_API_BASE_URL;
```

2. **Database Connection Issues**
   - Verify database is accessible from server
   - Check firewall rules
   - Update connection string for production

3. **CORS Settings**
```properties
spring.web.cors.allowed-origins=https://yourdomain.com
```

---

## 🆘 Getting More Help

### Debug Logging

**Frontend**:
```javascript
// Add console logs
console.log('Current state:', state);
console.log('API Response:', response);

// Use React DevTools
# Install: https://react-devtools-tutorial.vercel.app/
```

**Backend**:
```java
// Add logging
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

private static final Logger logger = LoggerFactory.getLogger(MyClass.class);
logger.info("Processing request: " + request);
logger.error("Error occurred: ", exception);
```

### Tools for Debugging

1. **Frontend**
   - Chrome DevTools (F12)
   - React DevTools extension
   - Postman (test API calls)
   - VS Code Debugger

2. **Backend**
   - IDE Debugger (IntelliJ, Eclipse)
   - Postman
   - Log files
   - Database client (MySQL Workbench)

### Resource Links

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Stack Overflow](https://stackoverflow.com/)

---

**Troubleshooting Guide Version**: 1.0  
**Last Updated**: December 2024

If you can't find the solution here, please:
1. Check existing GitHub issues
2. Create a new issue with detailed information
3. Join community discussions
4. Review the [CONTRIBUTING.md](./CONTRIBUTING.md) guide
