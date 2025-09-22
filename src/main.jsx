import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './HomePageComponent/App.jsx'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'
import CategoryPage from './CategoryPageComponent/CategoryPage.jsx'
import Layout from './LayoutComponent/Layout.jsx'
import ProductDetail from './ProductDetailComponent/ProductDetail.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<App />} />
      <Route path="/product/:category" element={<CategoryPage />} />
      <Route path='product/:category/:id' element={<ProductDetail />} />
    </Route>
  )
);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

