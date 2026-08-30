import { useState } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { LogOut, LayoutDashboard, Package, Settings, User, Menu, X, MessageSquare } from 'lucide-react'

const AdminLayout = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const closeSidebar = () => setIsSidebarOpen(false)

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Mobile header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-neutral-200 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        <span className="font-display font-bold text-primary">Admin</span>
        <div className="w-10" />
      </header>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white shadow-lg border-r border-neutral-200 z-50
          transition-transform duration-300 ease-in-out
          md:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-neutral-200 md:justify-center">
          <h2 className="font-display font-bold text-xl text-primary">Admin</h2>
          <button
            onClick={closeSidebar}
            className="md:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 border-b border-neutral-200 hidden md:block">
          <p className="text-sm text-neutral-500">Welcome, {user?.email}</p>
        </div>

        <nav className="p-4 space-y-2">
          <Link
            to="/admin/dashboard"
            onClick={closeSidebar}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-neutral-100 text-neutral-700 transition-colors"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link
            to="/admin/orders"
            onClick={closeSidebar}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-neutral-100 text-neutral-700 transition-colors"
          >
            <Package className="w-5 h-5" />
            Orders
          </Link>
          <Link
            to="/admin/contacts"
            onClick={closeSidebar}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-neutral-100 text-neutral-700 transition-colors"
          >
            <MessageSquare className="w-5 h-5" />
            Messages
          </Link>
          <Link
            to="/admin/profile"
            onClick={closeSidebar}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-neutral-100 text-neutral-700 transition-colors"
          >
            <User className="w-5 h-5" />
            Profile
          </Link>
          <Link
            to="/admin/settings"
            onClick={closeSidebar}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-neutral-100 text-neutral-700 transition-colors"
          >
            <Settings className="w-5 h-5" />
            Settings
          </Link>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-200">
          <button
            onClick={() => {
              closeSidebar()
              handleLogout()
            }}
            className="flex items-center gap-3 px-4 py-2 w-full rounded-lg hover:bg-red-50 text-red-600 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="md:ml-64 pt-16 md:pt-0 p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout