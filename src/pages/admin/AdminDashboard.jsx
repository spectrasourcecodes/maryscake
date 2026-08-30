import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import api from '../../services/api'
import { Package, CheckCircle, Clock, XCircle } from 'lucide-react'

const AdminDashboard = () => {
  const [stats, setStats] = useState({ total: 0, pending: 0, confirmed: 0, completed: 0, cancelled: 0 })
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/orders')
        const orders = res.data
        setRecentOrders(orders.slice(0, 5))
        setStats({
          total: orders.length,
          pending: orders.filter(o => o.status === 'pending').length,
          confirmed: orders.filter(o => o.status === 'confirmed').length,
          completed: orders.filter(o => o.status === 'completed').length,
          cancelled: orders.filter(o => o.status === 'cancelled').length,
        })
      } catch (err) {
        console.error('Failed to fetch orders', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const statusIcons = {
    pending: Clock,
    confirmed: CheckCircle,
    completed: CheckCircle,
    cancelled: XCircle,
  }

  const statusColors = {
    pending: 'text-yellow-600 bg-yellow-50',
    confirmed: 'text-blue-600 bg-blue-50',
    completed: 'text-green-600 bg-green-50',
    cancelled: 'text-red-600 bg-red-50',
  }

  if (loading) return <div className="text-center py-12">Loading dashboard...</div>

  return (
    <div>
      <h1 className="heading-section text-2xl">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
        <div className="bg-white p-4 rounded-xl shadow-soft">
          <div className="text-sm text-neutral-500">Total Orders</div>
          <div className="text-2xl font-bold text-neutral-800">{stats.total}</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-soft">
          <div className="text-sm text-neutral-500">Pending</div>
          <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-soft">
          <div className="text-sm text-neutral-500">Confirmed</div>
          <div className="text-2xl font-bold text-blue-600">{stats.confirmed}</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-soft">
          <div className="text-sm text-neutral-500">Completed</div>
          <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-soft">
          <div className="text-sm text-neutral-500">Cancelled</div>
          <div className="text-2xl font-bold text-red-600">{stats.cancelled}</div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-soft p-6">
        <h3 className="font-display font-semibold text-lg">Recent Orders</h3>
        {recentOrders.length === 0 ? (
          <p className="text-neutral-500 mt-4">No orders yet.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {recentOrders.map(order => {
              const StatusIcon = statusIcons[order.status] || Package
              const colorClass = statusColors[order.status] || 'text-neutral-600 bg-neutral-50'
              return (
                <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{order.fullName}</p>
                    <p className="text-sm text-neutral-500">{order.product} – {order.phone}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${colorClass}`}>
                      <StatusIcon className="w-3 h-3" />
                      {order.status}
                    </span>
                    <Link to={`/admin/orders`} className="text-primary text-sm hover:underline">View</Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard