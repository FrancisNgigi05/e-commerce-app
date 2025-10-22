import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './HomePageComponent/App.jsx'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'
import CategoryPage from './CategoryPageComponent/CategoryPage.jsx'
import Layout from './LayoutComponent/Layout.jsx'
import ProductDetail from './ProductDetailComponent/ProductDetail.jsx'
import { CartProvider } from './CartContextComponent/CartContext.jsx'
import CartPage from './CartPageComponent/CartPage.jsx'
import Payment from './PaymentPageComponent/Payment.jsx'
import SignUp from './AuthenticationComponents/SignUp.jsx'
import LoginPage from './AuthenticationComponents/LoginPage.jsx'
import ProtectedRoutes from './ProtectedRoutes/ProtectedRoutes.jsx'
import UnauthorizedPage from './UnauthorizedComponent/UnauthorizedPage.jsx'
import AdminDashboard from './AdminComponents/AdminDashboard/AdminDashboard.jsx'
import AdminLayout from './AdminLayoutComponent/AdminLayout.jsx'
import AdminOrders from './AdminOrdersComponent/AdminOrders.jsx'
import AdminProduct from './AdminProductsDisplayComponent/AdminProduct.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route element={<ProtectedRoutes allowedRoles={['customer']}/>}>
      <Route element={<Layout />}>
        <Route path="/" element={<App />} />
        <Route path="/product/:category" element={<CategoryPage />} />
        <Route path='product/:category/:id' element={<ProductDetail />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/payment/:id' element={<Payment />} />
      </Route>
    </Route>
    <Route element={<ProtectedRoutes allowedRoles={['admin']}/>}>
      <Route element={<AdminLayout />}>
        <Route path='/admin' element={<AdminDashboard />}/>
        <Route path='/admin/orders' element={<AdminOrders />} />
        <Route path='/admin/products' element={<AdminProduct/>}/>
      </Route>
    </Route>
    <Route path='/unauthorized' element={<UnauthorizedPage />}/>
    <Route path='/login' element={<LoginPage />} />
    <Route path='/signup' element={<SignUp />} />
    </>
  )
);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>,
)

