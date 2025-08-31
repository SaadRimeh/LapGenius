import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { useAuth } from './context/AuthContext.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import AskMe from './pages/AskMe.jsx'
import Store from './pages/Store.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Cart from './pages/Cart.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import AdminOverview from './pages/admin/Overview.jsx'
import AdminProducts from './pages/admin/Products.jsx'
import AdminOrders from './pages/admin/Orders.jsx'
import AdminUsers from './pages/admin/Users.jsx'
import AdminSuggestions from './pages/admin/Suggestions.jsx'
import Settings from './pages/admin/Settings.jsx'
import NotFound from './pages/NotFound.jsx'
import RequireAuth from './components/RequireAuth.jsx'
import Auth from './pages/Auth.jsx'
import Orders from './pages/Orders.jsx'

export default function App(){
  const { user } = useAuth()
  const isAuthed = !!user
  return (
    <div className="app">
      {isAuthed && <Navbar />}
      <main className="container page">
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />

          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
            <Route path="/ask" element={<AskMe />} />
            <Route path="/store" element={<Store />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardLayout />} >
                <Route index element={<AdminOverview />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="suggestions" element={<AdminSuggestions />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Route>
          </Route>

          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>
      {isAuthed && <Footer />}
    </div>
  )
}
