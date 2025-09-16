const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://ecommerce-api-7of3.onrender.com"
    : "http://localhost:5000";

export { API_URL };