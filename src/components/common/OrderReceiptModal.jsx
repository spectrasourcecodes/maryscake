import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, FileText } from 'lucide-react'
import Button from './Button'
import WhatsAppButton from './WhatsAppButton'

const OrderReceiptModal = ({ isOpen, onClose, order }) => {
  if (!order) return null

  const whatsappMessage = `Hello, I have placed an order (ID: ${order._id}). Please process my order.`

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-lg w-full bg-white rounded-2xl shadow-2xl z-50 p-6 max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-neutral-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="heading-card text-neutral-800">Order Submitted! 🎉</h3>
              <p className="text-body mt-2">
                Thank you for your order. Please send a message on WhatsApp with your <strong>Order ID</strong> so we can process it.
              </p>
            </div>

            <div className="mt-6 bg-neutral-50 rounded-xl p-4 border border-neutral-200">
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <FileText className="w-4 h-4" />
                <span className="font-medium">Order ID:</span>
                <span className="font-mono font-bold text-primary">{order._id}</span>
              </div>
              <div className="mt-2 text-sm text-neutral-600">
                <p><strong>Name:</strong> {order.fullName}</p>
                <p><strong>Product:</strong> {order.product}</p>
                <p><strong>Quantity:</strong> {order.quantity}</p>
                {order.deliveryDate && <p><strong>Delivery:</strong> {order.deliveryDate}</p>}
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <WhatsAppButton
                message={whatsappMessage}
                fullWidth
                size="lg"
              >
                Send Order ID on WhatsApp
              </WhatsAppButton>
              <Button variant="outline" className="w-full" onClick={onClose}>
                Close
              </Button>
            </div>

            <p className="text-xs text-neutral-500 mt-4 text-center">
              Our team will confirm your order and reach out with payment details.
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default OrderReceiptModal