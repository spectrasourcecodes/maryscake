import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageCircle, Trash2, CheckCircle, Clock, XCircle, Package } from 'lucide-react'
import api from '../../services/api'

const statusOptions = ['pending', 'confirmed', 'completed', 'cancelled']
const statusIcons = {
  pending: Clock,
  confirmed: CheckCircle,
  completed: CheckCircle,
  cancelled: XCircle,
}
const statusColors = {
  pending: 'text-yellow-600 bg-yellow-50 border-yellow-200',
  confirmed: 'text-blue-600 bg-blue-50 border-blue-200',
  completed: 'text-green-600 bg-green-50 border-green-200',
  cancelled: 'text-red-600 bg-red-50 border-red-200',
}

const OrderDetailModal = ({ order, isOpen, onClose, onOrderUpdated, onOrderDeleted }) => {
  const [updating, setUpdating] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [status, setStatus] = useState(order?.status || 'pending')

  if (!order) return null

  const StatusIcon = statusIcons[status] || Package
  const colorClass = statusColors[status] || 'text-neutral-600 bg-neutral-50 border-neutral-200'

  const getWhatsAppLink = (phone) => {
    if (!phone) return '#'
    const cleaned = phone.replace(/\s/g, '').replace('+', '')
    return `https://wa.me/${cleaned}`
  }

  const handleUpdateStatus = async () => {
    if (status === order.status) return
    setUpdating(true)
    try {
      await api.put(`/orders/${order.id}/status`, { status })
      if (onOrderUpdated) onOrderUpdated()
    } catch (err) {
      console.error('Failed to update status', err)
    } finally {
      setUpdating(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this order? This action cannot be undone.')) return
    setDeleting(true)
    try {
      await api.delete(`/orders/${order.id}`)
      if (onOrderDeleted) onOrderDeleted()
      onClose() // close modal after deletion
    } catch (err) {
      console.error('Failed to delete order', err)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-white z-10 p-6 border-b border-neutral-200 flex items-center justify-between rounded-t-2xl">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 border ${colorClass}`}>
                    <StatusIcon className="w-3 h-3" />
                    {status}
                  </span>
                  <span className="text-sm text-neutral-500">
                    Order #{order.id ? order.id.slice(0, 8) : 'N/A'}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6">
                {/* Customer Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-neutral-500">Customer:</span>
                    <span className="font-medium ml-2">{order.fullName || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500">Phone:</span>
                    <span className="font-medium ml-2">{order.phone || 'N/A'}</span>
                  </div>
                  {order.email && (
                    <div>
                      <span className="text-neutral-500">Email:</span>
                      <span className="font-medium ml-2">{order.email}</span>
                    </div>
                  )}
                  {order.address && (
                    <div>
                      <span className="text-neutral-500">Address:</span>
                      <span className="font-medium ml-2">{order.address}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-neutral-500">Product:</span>
                    <span className="font-medium ml-2">{order.product || 'N/A'}</span>
                  </div>
                  {order.quantity && (
                    <div>
                      <span className="text-neutral-500">Quantity:</span>
                      <span className="font-medium ml-2">{order.quantity}</span>
                    </div>
                  )}
                  {order.deliveryDate && (
                    <div>
                      <span className="text-neutral-500">Delivery Date:</span>
                      <span className="font-medium ml-2">{order.deliveryDate}</span>
                    </div>
                  )}
                  {order.deliveryTime && (
                    <div>
                      <span className="text-neutral-500">Delivery Time:</span>
                      <span className="font-medium ml-2">{order.deliveryTime}</span>
                    </div>
                  )}
                  {order.cakeSize && (
                    <div>
                      <span className="text-neutral-500">Cake Size:</span>
                      <span className="font-medium ml-2">{order.cakeSize}</span>
                    </div>
                  )}
                  {order.cakeFlavor && (
                    <div>
                      <span className="text-neutral-500">Cake Flavor:</span>
                      <span className="font-medium ml-2">{order.cakeFlavor}</span>
                    </div>
                  )}
                  {order.customMessage && (
                    <div className="sm:col-span-2">
                      <span className="text-neutral-500">Custom Message:</span>
                      <span className="font-medium ml-2">{order.customMessage}</span>
                    </div>
                  )}
                  {order.recipientName && (
                    <div>
                      <span className="text-neutral-500">Recipient:</span>
                      <span className="font-medium ml-2">{order.recipientName}</span>
                    </div>
                  )}
                  {order.recipientPhone && (
                    <div>
                      <span className="text-neutral-500">Recipient Phone:</span>
                      <span className="font-medium ml-2">{order.recipientPhone}</span>
                    </div>
                  )}
                  {order.surpriseLocation && (
                    <div>
                      <span className="text-neutral-500">Surprise Location:</span>
                      <span className="font-medium ml-2">{order.surpriseLocation}</span>
                    </div>
                  )}
                  {order.surpriseTime && (
                    <div>
                      <span className="text-neutral-500">Surprise Time:</span>
                      <span className="font-medium ml-2">{order.surpriseTime}</span>
                    </div>
                  )}
                  {order.instructions && (
                    <div className="sm:col-span-2">
                      <span className="text-neutral-500">Instructions:</span>
                      <span className="font-medium ml-2">{order.instructions}</span>
                    </div>
                  )}
                  {order.specialInstructions && (
                    <div className="sm:col-span-2">
                      <span className="text-neutral-500">Special Instructions:</span>
                      <span className="font-medium ml-2">{order.specialInstructions}</span>
                    </div>
                  )}
                </div>

                {/* Status Update */}
                <div className="border-t border-neutral-100 pt-4 flex flex-wrap items-center gap-4">
                  <label htmlFor="modal-status" className="text-sm font-medium text-neutral-700">
                    Status:
                  </label>
                  <select
                    id="modal-status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    disabled={updating}
                    className="px-3 py-1.5 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary/50 focus:outline-none disabled:opacity-50"
                  >
                    {statusOptions.map(opt => (
                      <option key={opt} value={opt}>
                        {opt.charAt(0).toUpperCase() + opt.slice(1)}
                      </option>
                    ))}
                  </select>
                  {status !== order.status && (
                    <button
                      onClick={handleUpdateStatus}
                      disabled={updating}
                      className="px-4 py-1.5 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition-colors disabled:opacity-50"
                    >
                      {updating ? 'Updating...' : 'Update'}
                    </button>
                  )}
                </div>

                {/* Actions */}
                <div className="border-t border-neutral-100 pt-4 flex flex-wrap gap-3">
                  <a
                    href={getWhatsAppLink(order.phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 px-4 py-2 rounded-lg transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Contact on WhatsApp
                  </a>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="inline-flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                    {deleting ? 'Deleting...' : 'Delete Order'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default OrderDetailModal