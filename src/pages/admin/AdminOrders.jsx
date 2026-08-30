import { useEffect, useState } from 'react'
import api from '../../services/api'
import { Eye, Search } from 'lucide-react'
import OrderDetailModal from './OrderDetailModal'

const AdminOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders')
      const ordersWithId = res.data.map(order => ({
        ...order,
        id: order._id || order.id || `temp-${Date.now()}-${Math.random()}`
      }))
      setOrders(ordersWithId)
    } catch (err) {
      console.error('Failed to fetch orders', err)
    } finally {
      setLoading(false)
    }
  }

  const handleOrderUpdated = () => {
    fetchOrders()
    setModalOpen(false)
  }

  const handleOrderDeleted = () => {
    fetchOrders()
    setModalOpen(false)
  }

  const openModal = (order) => {
    setSelectedOrder(order)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setSelectedOrder(null)
  }

  // Filter orders
  const statusFiltered = filter === 'all' ? orders : orders.filter(o => o.status === filter)
  const searchedOrders = statusFiltered.filter(order => {
    const searchLower = searchTerm.toLowerCase().trim()
    if (!searchLower) return true
    const searchable = [
      order.fullName,
      order.phone,
      order.product,
      order.id,
      order.email,
      order.address
    ].filter(Boolean).map(field => field.toLowerCase())
    return searchable.some(field => field.includes(searchLower))
  })

  const statusOptions = ['pending', 'confirmed', 'completed', 'cancelled']
  const statusColors = {
    pending: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    confirmed: 'text-blue-600 bg-blue-50 border-blue-200',
    completed: 'text-green-600 bg-green-50 border-green-200',
    cancelled: 'text-red-600 bg-red-50 border-red-200',
  }

  if (loading) return <div className="text-center py-12">Loading orders...</div>

  return (
    <div>
      <h1 className="heading-section text-2xl">Orders</h1>

      {/* Search and filters */}
      <div className="mt-4 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by name, phone, product, ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {['all', ...statusOptions].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === status ? 'bg-primary text-white' : 'bg-white text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {searchedOrders.length === 0 ? (
        <p className="text-neutral-500 mt-6">No orders found.</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4">
          {searchedOrders.map(order => {
            const colorClass = statusColors[order.status] || 'text-neutral-600 bg-neutral-50 border-neutral-200'
            return (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-soft overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => openModal(order)}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b border-neutral-100 bg-neutral-50/50">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 border ${colorClass}`}>
                      {order.status}
                    </span>
                    <span className="text-sm text-neutral-500">
                      Order #{order.id ? order.id.slice(0, 8) : 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-neutral-500 font-medium">
                      {order.fullName || 'Unknown'}
                    </span>
                    <Eye className="w-4 h-4 text-primary" />
                  </div>
                </div>
                <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                  <div>
                    <span className="text-neutral-500">Product:</span>
                    <span className="font-medium ml-2">{order.product || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500">Phone:</span>
                    <span className="font-medium ml-2">{order.phone || 'N/A'}</span>
                  </div>
                  {order.deliveryDate && (
                    <div>
                      <span className="text-neutral-500">Delivery:</span>
                      <span className="font-medium ml-2">{order.deliveryDate}</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Modal */}
      <OrderDetailModal
        order={selectedOrder}
        isOpen={modalOpen}
        onClose={closeModal}
        onOrderUpdated={handleOrderUpdated}
        onOrderDeleted={handleOrderDeleted}
      />
    </div>
  )
}

export default AdminOrders