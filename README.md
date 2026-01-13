# Node.js Express Microservices (Inventory, Order & Payment)

This project demonstrates a clean microservices architecture using Node.js, Express, MongoDB, and **gRPC** with advanced design patterns.

## Architecture & Design Patterns

The project follows **Clean Design** principles:
1.  **Factory Pattern:** 
    - `client-factory.js`: Centralized gRPC client creation.
    - `server-factory.js`: Boilerplate-free gRPC server initialization.
2.  **Error Mapping Pattern:** 
    - `error-mapper.js`: Automatically maps internal application errors to standard gRPC status codes (e.g., `NOT_FOUND`, `FAILED_PRECONDITION`).
3.  **Abstraction Layer:** Services interact with gRPC through a clean wrapper layer in `shares/grpc/clients/`.

## Services Overview

1.  **Inventory Service (Port 3001, gRPC 50053):** Manages products and stock levels.
2.  **Payment Service (gRPC 50054):** Simulates payment processing with error handling.
3.  **Order Service (Port 3002):** Orchestrates the order flow. When an order is created:
    - Calls **Inventory Service** (gRPC) to check stock.
    - Creates order as `PENDING`.
    - Calls **Inventory Service** (gRPC) to deduct stock.
    - Calls **Payment Service** (gRPC) to process payment.
    - Updates order to `COMPLETED` or `CANCELLED`.

## Requirements

- Node.js (v22+) - Uses built-in `--watch` and `--env-file`.
- MongoDB (running at localhost:27017).
- **REST Client** extension (for VS Code/Cursor) for testing.

## Installation

1. Clone the project and install dependencies:
   ```bash
   npm install
   ```

2. Environment Setup:
   Create `.env` files for each service:

   **Inventory Service (`apps/inventory-service/.env`):**
   ```env
   PORT=3001
   MONGO_URI=mongodb://localhost:27017/inventory_db
   GRPC_PORT=50053
   ```

   **Order Service (`apps/order-service/.env`):**
   ```env
   PORT=3002
   MONGO_URI=mongodb://localhost:27017/order_db
   GRPC_INVENTORY_SERVICE_ADDR=localhost:50053
   GRPC_PAYMENT_SERVICE_ADDR=localhost:50054
   ```

   **Payment Service (`apps/payment-service/.env`):**
   ```env
   GRPC_PORT=50054
   ```

## Running the Project

Start all services (Inventory, Order, Payment):
```bash
npm run start:all
```

Or start separately:
- `npm run start:inventory`
- `npm run start:order`
- `npm run start:payment`

## Running with Docker (Hot Reload)

```bash
docker compose up --build
```
- Starts MongoDB and all 3 services.
- Supports hot-reload on code changes.

## Testing with `api-test.http`

1.  **Create a Product:** Run `### 1. Create a new Product`.
2.  **Test Success Flow:** Run `### 3. Create a new Order (SUCCESS CASE)`.
    - Total amount <= 1000 will succeed.
    - Check Order status (`COMPLETED`).
3.  **Test Payment Failure:** Run `### 5. Create a new Order (PAYMENT FAILED CASE)`.
    - Total amount > 1000 triggers a mock failure in Payment Service.
    - Check Order status (`CANCELLED`).
4.  **Test Stock Error:** Run `### 8. Try to create an Order with quantity exceeding stock`.
    - Triggers `Insufficient stock` error from Inventory Service via gRPC.

## Technologies Used

- **gRPC:** High-performance RPC framework.
- **Express.js:** Web framework for REST APIs.
- **MongoDB & Mongoose:** Data persistence.
- **Node.js 22 Features:** `--watch` for development, `--env-file` for config.
