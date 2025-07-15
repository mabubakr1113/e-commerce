# E-commerce Backend

This is the backend for an e-commerce application, built with Node.js and Express. It provides a RESTful API for managing products.

---

## Tech Stack 🚀

- **[Node.js](https://nodejs.org/)**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **[Express](https://expressjs.com/)**: A fast, unopinionated, minimalist web framework for Node.js.
- **[MongoDB](https://www.mongodb.com/)**: A NoSQL database for storing product information.
- **[Mongoose](https://mongoosejs.com/)**: An elegant MongoDB object modeling tool for Node.js.
- **[Zod](https://zod.dev/)**: A TypeScript-first schema declaration and validation library.

---

## How to Run the Project 🏃‍♀️

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Create a `.env` file** in the root of the project and add the following environment variables:

    ```
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    ```

3.  **Start the server:**

    ```bash
    npm start
    ```

    The server will be running on `http://localhost:5000`.

---

## API Endpoints API

Here are the available API endpoints and sample requests.

### Get All Products

- **Endpoint:** `GET /api/products`
- **Description:** Retrieves a list of all products. Supports pagination and filtering by category.
- **Query Parameters:**
  - `page` (optional): The page number for pagination (default: 1).
  - `limit` (optional): The number of items per page (default: 10).
  - `category` (optional): The category to filter by.
- **Sample `curl` request:**
  ```bash
  curl "http://localhost:5000/api/products?page=1&limit=5&category=Electronics"
  ```

### Get Product by ID

- **Endpoint:** `GET /api/products/:id`
- **Description:** Retrieves a single product by its ID.
- **Sample `curl` request:**
  ```bash
  curl http://localhost:5000/api/products/your_product_id
  ```

### Create a New Product

- **Endpoint:** `POST /api/products`
- **Description:** Creates a new product.
- **Sample `curl` request:**
  ```bash
  curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sample Product",
    "description": "This is a sample product.",
    "highlights": ["Highlight 1", "Highlight 2"],
    "specifications": [
      {
        "title": "Spec 1",
        "description": "Spec description 1"
      }
    ],
    "price": 100,
    "cuttedPrice": 120,
    "images": [
      {
        "public_id": "sample_id",
        "url": "http://example.com/image.jpg"
      }
    ],
    "brand": {
      "name": "Sample Brand",
      "logo": {
        "public_id": "brand_logo_id",
        "url": "http://example.com/brand_logo.jpg"
      }
    },
    "category": "Electronics",
    "stock": 50,
    "warranty": 2
  }'
  ```
