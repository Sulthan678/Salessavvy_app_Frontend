# SalesSavvy - Setup Guide

Complete step-by-step guide for setting up the SalesSavvy development environment.

## 📋 Prerequisites

Before starting, ensure you have the following installed:

### Required Software
- **Node.js** v16.0.0 or higher
- **npm** v8.0.0 or higher (comes with Node.js)
- **Java** v17 or higher
- **Maven** v3.6.0 or higher
- **MySQL** v8.0 or higher
- **Git** v2.0 or higher

### System Requirements
- **OS**: Windows 10/11, macOS 10.15+, or Linux (Ubuntu 20.04+)
- **RAM**: Minimum 4GB (8GB recommended)
- **Disk Space**: At least 2GB free space
- **Internet**: Required for downloading dependencies

## 🔧 Installation Steps

### Step 1: Verify Prerequisites

```bash
# Check Node.js
node --version
npm --version

# Check Java
java -version

# Check Maven
mvn --version

# Check MySQL
mysql --version

# Check Git
git --version
```

### Step 2: Clone the Repository

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd SalesSavvy_App
```

### Step 3: Database Setup

#### On Windows:

1. **Open MySQL Command Line Client**
```bash
mysql -u root -p
```

2. **Create Database and User**
```sql
-- Create database
CREATE DATABASE salesdavvy_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create user
CREATE USER 'salesdavvy_user'@'localhost' IDENTIFIED BY 'secure_password_123';

-- Grant privileges
GRANT ALL PRIVILEGES ON salesdavvy_db.* TO 'salesdavvy_user'@'localhost';

-- Flush privileges
FLUSH PRIVILEGES;

-- Verify
SHOW DATABASES;
```

#### On macOS/Linux:

```bash
# Start MySQL service
# macOS
brew services start mysql

# Linux
sudo systemctl start mysql

# Connect to MySQL
mysql -u root -p

# Then run the SQL commands above
```

### Step 4: Backend Setup

#### Configuration

1. **Navigate to backend folder**
```bash
cd SalesSavvy_App
```

2. **Update application.properties**

File: `src/main/resources/application.properties`

```properties
# Server Configuration
server.port=9090
server.servlet.context-path=/api

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/salesdavvy_db
spring.datasource.username=salesdavvy_user
spring.datasource.password=secure_password_123
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
spring.jpa.properties.hibernate.format_sql=true

# JWT Configuration
jwt.secret=your_super_secret_key_change_this_in_production_12345
jwt.expiration=86400000

# Logging Configuration
logging.level.root=INFO
logging.level.com.kodnest=DEBUG

# CORS Configuration
spring.web.cors.allowed-origins=http://localhost:5173,http://localhost:3000
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
spring.web.cors.allow-credentials=true

# Application Name
spring.application.name=SalesSavvy
```

#### Build Backend

```bash
# Clean and install dependencies
mvn clean install

# This will download all dependencies and build the project
```

#### Run Backend

**Option 1: Using Maven**
```bash
mvn spring-boot:run
```

**Option 2: Using Java directly**
```bash
# After building with mvn clean install
java -jar target/SalesSavvy_App-0.0.1-SNAPSHOT.jar
```

**Expected Output:**
```
Started SalesSavvyAppApplication in X seconds
Server is running on http://localhost:9090
```

### Step 5: Frontend Setup

#### Navigation

```bash
# From project root, navigate to frontend
cd Salessavvy_app
```

#### Install Dependencies

```bash
npm install
```

This will install all packages listed in `package.json`:
- React, React Router DOM
- Axios, Tailwind CSS
- Shadcn UI components
- Development tools (Vite, ESLint, etc.)

#### Environment Configuration

Create `.env` file in the frontend root:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:9090/api

# App Configuration
VITE_APP_NAME=SalesSavvy
VITE_APP_VERSION=0.0.1

# Development Settings
VITE_DEBUG_MODE=false
```

#### Run Frontend Development Server

```bash
npm run dev
```

**Expected Output:**
```
  VITE v4.x.x  ready in X ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### Step 6: Verify Installation

#### Backend Verification

```bash
# Test backend connection
curl http://localhost:9090/api/

# Or use your browser to navigate to:
# http://localhost:9090/api/
```

#### Frontend Verification

Open your browser and navigate to:
```
http://localhost:5173
```

#### Database Verification

```bash
# Connect to MySQL
mysql -u salesdavvy_user -p salesdavvy_db

# Check tables created
SHOW TABLES;

# Check data
SELECT COUNT(*) as table_count FROM information_schema.TABLES 
WHERE TABLE_SCHEMA = 'salesdavvy_db';
```

## 🚀 First Run Checklist

- [ ] Node.js and npm installed and accessible
- [ ] Java 17+ installed and JAVA_HOME set
- [ ] MySQL server running
- [ ] Database created with correct credentials
- [ ] Backend properties file configured
- [ ] Backend dependencies installed (`mvn clean install`)
- [ ] Backend running on `http://localhost:9090`
- [ ] Frontend dependencies installed (`npm install`)
- [ ] `.env` file created in frontend
- [ ] Frontend running on `http://localhost:5173`
- [ ] Can access application in browser

## 📁 Project Structure After Setup

```
SalesSavvy/
├── SalesSavvy_App/                 # Backend
│   ├── src/
│   │   ├── main/java/              # Java source code
│   │   └── main/resources/         # Configuration files
│   ├── pom.xml                     # Maven configuration
│   ├── mvnw                        # Maven wrapper
│   └── target/                     # Build output
│
├── Salessavvy_app/                 # Frontend
│   ├── src/
│   │   ├── pages/                  # Page components
│   │   ├── components/             # React components
│   │   ├── services/               # API services
│   │   └── assets/                 # Static files
│   ├── package.json                # NPM configuration
│   ├── .env                        # Environment variables
│   ├── vite.config.js              # Vite configuration
│   └── node_modules/               # Dependencies
│
└── Documentation files             # README, ARCHITECTURE, etc.
```

## 🔑 Environment Variables Reference

### Backend (application.properties)

| Variable | Description | Default |
|----------|-------------|---------|
| `server.port` | Server port | 9090 |
| `spring.datasource.url` | Database URL | jdbc:mysql://localhost:3306/salesdavvy_db |
| `spring.datasource.username` | Database user | salesdavvy_user |
| `spring.datasource.password` | Database password | secure_password_123 |
| `jwt.secret` | JWT secret key | your_super_secret_key |
| `jwt.expiration` | Token expiration (ms) | 86400000 (24 hours) |

### Frontend (.env)

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API URL | http://localhost:9090/api |
| `VITE_APP_NAME` | Application name | SalesSavvy |
| `VITE_DEBUG_MODE` | Debug logging | false |

## 🛠️ Useful Development Commands

### Backend Commands

```bash
# Clean build
mvn clean

# Install dependencies
mvn install

# Run tests
mvn test

# Run application
mvn spring-boot:run

# Build JAR file
mvn clean package

# Check dependency tree
mvn dependency:tree
```

### Frontend Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview

# Clean node_modules and reinstall
rm -rf node_modules package-lock.json && npm install
```

## 🐛 Troubleshooting Setup Issues

### Port Already in Use

**Backend (Port 9090):**
```bash
# Find process using port 9090
netstat -ano | findstr :9090

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

**Frontend (Port 5173):**
```bash
# Specify different port
npm run dev -- --port 3000
```

### MySQL Connection Error

```bash
# Verify MySQL is running
mysql -u root -p

# If error: "Can't connect to MySQL server"
# Start MySQL service:
# Windows: services.msc → MySQL → Start
# macOS: brew services start mysql
# Linux: sudo systemctl start mysql
```

### Dependencies Not Installing

```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# For backend, clear Maven cache
mvn clean
```

### CORS Issues

**Symptoms**: Requests from frontend blocked

**Solution**: Verify `application.properties` has:
```properties
spring.web.cors.allowed-origins=http://localhost:5173
spring.web.cors.allow-credentials=true
```

### Java Version Mismatch

```bash
# Check installed Java version
java -version

# If not Java 17, install correct version
# Windows: Download from oracle.com
# macOS: brew install java17
# Linux: sudo apt-get install openjdk-17-jdk
```

## 📚 Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Maven Documentation](https://maven.apache.org/guides/)
- [Vite Documentation](https://vitejs.dev/)

## 🎯 Next Steps

1. Review [ARCHITECTURE.md](./ARCHITECTURE.md) to understand system design
2. Check [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for API endpoints
3. Read [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed folder structure
4. Follow [CONTRIBUTING.md](./CONTRIBUTING.md) to start developing

---

**Setup Guide Version**: 1.0  
**Last Updated**: December 2024  
**Tested On**: Windows 10/11, macOS Monterey+, Ubuntu 20.04+
