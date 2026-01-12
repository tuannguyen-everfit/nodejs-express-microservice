# Node.js Express Microservices (Inventory & Order)

This is a simple project to show how Microservices work using Node.js, Express, MongoDB, and **gRPC**.

## How it Works

The project has 2 services:
1.  **Inventory Service (Port 3001, gRPC 50053):** Manages products and stock levels.
2.  **Order Service (Port 3002):** Manages customer orders. When you create an order, this service calls the Inventory Service via gRPC to check and reduce stock.

Each service uses a **Modular Structure**:
- `modules/[module-name]/`: Contains Router, Controller, Service, Repository, and Validation.
- `models/`: Contains Mongoose database models.
- `grpc-handlers/`: Handles gRPC requests (Inventory Service only).

## Requirements

- Node.js (v20.6.0+) - Recommended v22 for stable `--watch` and `--env-file` features.
- MongoDB (running at localhost:27017). Each service can use a different database URI by setting `MONGO_URI` in its respective `.env` file.
- **REST Client** extension (for VS Code/Cursor) to test the APIs.

## Installation

1. Clone the project and install dependencies:
   ```bash
   npm install
   ```

2. Environment Setup:
   You **must** create `.env` files for each service, otherwise the start scripts will fail because they use the `--env-file` flag.

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
   ```

## Running the Project

You can start both services at once:
```bash
npm run start:all
```

Or start them separately:
- Inventory Service: `npm run start:inventory`
- Order Service: `npm run start:order`

## Running with Docker (Hot Reload)

The project includes Docker support with hot-reloading using Node.js 22's built-in watcher and Docker volumes.

### 1. Start everything (Services + MongoDB)
```bash
docker compose up
```
- This will start MongoDB, Inventory Service, and Order Service.
- The services will automatically restart when you change code on your host machine (thanks to volume mounting and `node --watch`).

### 2. Rebuild after changing dependencies
If you add new packages to `package.json`, you need to rebuild the images:
```bash
docker compose up --build
```

### 3. Run in background
```bash
docker compose up -d
```

### 4. Stop everything
```bash
docker compose down
```

## How to Test with `api-test.http`

We provide an `api-test.http` file so you can test the project easily without Postman.

### Steps to Test:

1.  **Open `api-test.http`** in VS Code or Cursor.
2.  Make sure you have the **REST Client** extension installed.
3.  **Step 1: Create a Product**
    - Find `### 1. Create a new Product`.
    - Click **"Send Request"** above the POST command.
    - This creates a "Laptop Pro" with 10 items in stock.
4.  **Step 2: Create an Order (Testing gRPC)**
    - Find `### 3. Create a new Order`.
    - Click **"Send Request"**. 
    - The Order Service will call the Inventory Service to take 2 items from stock.
5.  **Step 3: Check Stock Again**
    - Run `### 5. Check Stock after Order`. 
    - You will see the stock changed from 10 to 8.
6.  **Step 4: Test "Out of Stock" Error**
    - Run `### 6. Try to Order more than available stock`.
    - You will get an `Insufficient stock` error. This shows that gRPC is working correctly.

## Technologies Used

- **Communication:** gRPC (@grpc/grpc-js, @grpc/proto-loader)
- **Framework:** Express.js
- **Database:** MongoDB & Mongoose
- **Tools:** Node.js Built-in Watcher (`--watch`), Built-in Env Loader (`--env-file`), Concurrently, REST Client
