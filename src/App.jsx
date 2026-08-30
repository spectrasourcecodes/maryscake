import { useEffect } from 'react'
import { Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Layout & common
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import InstallPrompt from './components/common/InstallPrompt'

// Public pages
import Home from './pages/Home'
import Cakes from './pages/Cakes'
import Surprises from './pages/Surprises'
import ProductDetails from './pages/ProductDetails'
import Order from './pages/Order'
import About from './pages/About'
import Contact from './pages/Contact'

// Admin pages
import AdminLayout from './pages/admin/AdminLayout'
import AdminLogin from './pages/admin/AdminLogin'
import AdminSignup from './pages/admin/AdminSignup'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminOrders from './pages/admin/AdminOrders'
import AdminSettings from './pages/admin/AdminSettings'
import AdminProfile from './pages/admin/AdminProfile'
import AdminContacts from './pages/admin/AdminContacts'       // 🆕

// Auth
import { useAuth } from './context/AuthContext'

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

// Protected route wrapper
const PrivateRoute = () => {
  const { user, loading } = useAuth()
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  return user ? <Outlet /> : <Navigate to="/admin/login" replace />
}

function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      {!isAdminRoute && <Navbar />}
      <ScrollToTop />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/cakes" element={<Cakes />} />
            <Route path="/surprises" element={<Surprises />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/order" element={<Order />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Admin auth routes (public) */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/signup" element={<AdminSignup />} />

            {/* Protected admin routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="contacts" element={<AdminContacts />} />   {/* 🆕 */}
                <Route path="profile" element={<AdminProfile />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
            </Route>

            {/* 404 */}
            <Route path="*" element={
              <div className="container-custom section-padding text-center">
                <h1 className="heading-section">404 - Page Not Found</h1>
                <p className="text-body mt-4">The page you're looking for doesn't exist.</p>
              </div>
            } />
          </Routes>
        </AnimatePresence>
      </main>
      {!isAdminRoute && <Footer />}
      <InstallPrompt />
    </div>
  )
}

export default App