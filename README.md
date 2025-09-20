# Phase 1: Customer Features (Week 1–2)

Goal: Customers can browse products, view details, and add items to a cart.

Day 1 → Create a React app (vite or create-react-app). Add React Router. Set up routes:

/ (homepage → product list)

/products/:id (product details page)

/cart (shopping cart page)

Day 2 → Create ProductList component. Fetch products from API (GET /products) and display them in a grid. => Done

**** Day 3 → Create ProductDetail page. Fetch product by id (GET /products/:id) and display details. => Skipping this

Day 4 → Add search + filter (category). Use query like /products?category=Electronics or /products?name_like=Shoes.

Day 5 → Add sorting (e.g., /products?_sort=price&_order=asc). Add a dropdown in UI to switch sort.

Day 6 → Build a Cart page. Show all items (GET /cart?_expand=product).

Day 7 → Add “Add to Cart” button on product detail. Call POST /cart to add.

Day 8 → Enable update quantity (PATCH /cart/:id) and remove (DELETE /cart/:id).

Day 9 → Create a Checkout page. Place order (POST /orders).

# Phase 2: Admin Dashboard (Week 2–3)

Goal: Admins can log in and manage products/orders.

Day 10 → Create a Login page. Fake login with GET /users?username=x&password=y. Save user in localStorage.

Day 11 → Protect /admin route. Only logged-in admin can access. Redirect others to /login.

Day 12 → Create Admin Product List page. Show all products.

Day 13 → Add “Add Product” form (POST /products).

Day 14 → Add “Edit Product” form (PATCH /products/:id).

Day 15 → Add “Delete Product” button (DELETE /products/:id).

Day 16 → Create Admin Orders page. Fetch GET /orders.

Day 17 → Add ability to change order status (PATCH /orders/:id).

# Phase 3: Polish & Deploy (Week 3+)

Goal: Make it look nice + put it online.

Day 18 → Style homepage & product grid (basic responsive CSS/Tailwind).

Day 19 → Style cart page.

Day 20 → Add Order History for logged-in users (GET /orders?userId=...).

Day 21 → Deploy backend JSON server to Render (already done ✅).

Day 22 → Deploy frontend to Vercel/Netlify.


# Nice 😃 Let’s go step by step. With that db.json, JSON Server gives you a lot of REST endpoints for free:

📦 Products

GET /products → get all products

GET /products/1 → get product with id=1

GET /products?category=Electronics → filter by category

GET /products?name_like=Watch → search by name (case-insensitive)

GET /products?_sort=price&_order=asc → sort by price ascending

GET /products?_page=1&_limit=2 → paginate (first 2 products)

POST /products → add new product (admin only in your app)

PATCH /products/1 → update fields of product 1

DELETE /products/1 → delete product 1

🛒 Cart

GET /cart → view all items in cart

GET /cart?_expand=product → expand cart with product details

POST /cart → add to cart (e.g., { "productId": 2, "quantity": 1 })

PATCH /cart/1 → update quantity of cart item 1

DELETE /cart/1 → remove item from cart

👤 Users

GET /users → list all users

GET /users?username=john_doe&password=1234 → fake login check

POST /users → register new user

📦 Orders

GET /orders → get all orders

GET /orders?userId=2 → get all orders for user with id=2

POST /orders → place new order

PATCH /orders/1 → update order status (e.g., "status": "shipped")