# E-Commerce Portfolio Project

A full-stack e-commerce application built as a portfolio project. The app includes product browsing, user and anonymous carts, checkout/order creation, user authentication, and admin product/order workflows.

## Tech Stack

- Frontend: React, TypeScript, Vite, React Router, Zustand, Tailwind CSS, Axios
- Backend: Node.js, Express, TypeScript, MongoDB, Mongoose, JWT, Joi
- Testing: Jest, Supertest, MongoDB Memory Server, Vitest, Testing Library
- Tooling: ESLint, npm workspaces-style root scripts, concurrently

## Features

- Product listing and product detail pages
- Anonymous cart support with cart migration after signup/login
- User signup, login, logout, and persisted session state
- Checkout flow that creates orders from the cart
- User order history and order detail views
- Admin login, product management, and protected order status updates
- Backend request validation, centralized error handling, and high backend test coverage

## Project Structure

```text
.
├── backend/   # Express API, Mongoose models, services, controllers, tests
├── frontend/  # React/Vite client, pages, components, stores, tests
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm
- MongoDB running locally or a MongoDB connection string

### Installation

Install dependencies for the root scripts, backend, and frontend:

```bash
npm install
npm --prefix backend install
npm --prefix frontend install
```

Create local environment files from the examples:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Update `backend/.env` with your MongoDB URI and JWT secret.

## Environment Variables

Backend:

```text
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce
JWT_SECRET=replace-with-a-long-random-secret
NODE_ENV=development
```

Frontend:

```text
VITE_API_BASE_URL=http://localhost:5000/api
```

## Running The App

From the repository root:

```bash
npm run fulldev
```

Or run each side separately:

```bash
npm run server
npm run client
```

Default local URLs:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

## Quality Checks

Run all builds:

```bash
npm run build
```

Run all tests:

```bash
npm test
```

Run frontend linting:

```bash
npm run lint
```

Backend-only checks:

```bash
npm --prefix backend run build
npm --prefix backend test -- --runInBand
```

Frontend-only checks:

```bash
npm --prefix frontend run build
npm --prefix frontend test
npm --prefix frontend run lint
```

## API Overview

- `GET /api/products` - list products
- `GET /api/products/:id` - get a product
- `POST /api/products` - create product, admin only
- `PUT /api/products/:id` - update product, admin only
- `DELETE /api/products/:id` - delete product, admin only
- `POST /api/user/signup` - create a user account
- `POST /api/user/login` - log in a user
- `GET /api/cart` - get current user or anonymous cart
- `POST /api/cart/items` - add an item to cart
- `PUT /api/cart/items/:productId` - update cart item quantity
- `DELETE /api/cart/items/:productId` - remove item from cart
- `POST /api/orders` - place an order from the cart
- `GET /api/orders` - get current user's orders
- `GET /api/orders/:orderId` - get one order
- `PUT /api/orders/:orderId` - update order status, admin only
- `POST /api/admin/login` - log in an admin

## Notes For Reviewers

- Real `.env` files are intentionally ignored. Use the `.env.example` files for setup.
- The backend test suite uses MongoDB Memory Server, so backend tests do not require a local test database.
- The backend currently has one remaining moderate `npm audit` advisory chain from Jest/ts-jest coverage tooling. The production dependency audit was reduced without accepting npm's forced downgrade to older vulnerable Jest packages.

