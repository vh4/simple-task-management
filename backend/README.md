# Task Management Backend

A robust backend service for the Task Management application, built with Node.js, Express, and Prisma.

## 🚀 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database ORM:** Prisma
- **Database:** PostgreSQL
- **Validation:** Zod & Joi
- **Security:** JWT, Bcrypt, Cookie Parser, CORS
- **Documentation:** Swagger UI

## 🛠️ Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- PostgreSQL database

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   - Copy .env.example to .env
   - Update DATABASE_URL with your PostgreSQL credentials
   - Set FRONTEND_URL (default: http://localhost:3001)
   - Set PORT (default: 3000)

3. Run database migrations:
   ```bash
   npm run db:migrate
   ```

### Running the Server

- **Development mode** (with hot reload):
  ```bash
   npm run dev
  ```
- **Production mode**:
  ```bash
   npm run prod
  ```

## 📚 API Documentation

Once the server is running, you can access the interactive Swagger documentation at:
http://localhost:3000/v1/api-docs

## 📂 Project Structure

- src/index.ts: Entry point of the application
- src/routers/: API route definitions
- src/controllers/: Request handlers and business logic
- prisma/: Database schema and migration files
EOF