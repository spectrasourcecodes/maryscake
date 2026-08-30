import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, X, MessageCircle, Receipt } from 'lucide-react'
import { submitOrder } from '../../services/orderService'
import { products } from '../../data/products'
import Button from '../common/Button'
import Loading from '../common/Loading'
import WhatsAppButton from '../common/WhatsAppButton'

const OrderForm = ({ initialProduct = null }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    product: initialProduct || '',
    quantity: 1,
    deliveryDate: '',
    deliveryTime: '',
    cakeSize: '',
    cakeFlavor: '',
    customMessage: '',
    instructions: '',
    recipientName: '',
    recipientPhone: '',
    surpriseLocation: '',
    surpriseTime: '',
    specialInstructions: '',
  })

  const [productOptions, setProductOptions] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // null | 'success' | 'error'
  const [errors, setErrors] = useState({})
  const [showReceipt, setShowReceipt] = useState(false)
  const [orderData, setOrderData] = useState(null)
  const [duplicateError, setDuplicateError] = useState(null) // for duplicate order modal

  // Load product options when product changes
  useEffect(() => {
    if (formData.product) {
      const selectedProduct = products.find(p => p.id === formData.product)
      setProductOptions(selectedProduct?.options || {})
    } else {
      setProductOptions({})
    }
  }, [formData.product])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.product) newErrors.product = 'Please select a product'
    if (!formData.deliveryDate) newErrors.deliveryDate = 'Please select a delivery date'
    if (formData.address && formData.address.length < 5) {
      newErrors.address = 'Please provide a more detailed address'
    }
    const selectedProduct = products.find(p => p.id === formData.product)
    if (selectedProduct && selectedProduct.type === 'surprise') {
      if (!formData.recipientName.trim()) newErrors.recipientName = 'Recipient name is required'
      if (!formData.recipientPhone.trim()) newErrors.recipientPhone = 'Recipient phone is required'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) {
      const firstError = document.querySelector('[data-error]')
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)
    setDuplicateError(null)

    try {
      const response = await submitOrder(formData)
      setOrderData(response.order)
      setSubmitStatus({ type: 'success', message: response.message || 'Order request received!' })
      setShowReceipt(true)
    } catch (error) {
      // Check for duplicate order error (status 409)
      if (error.status === 409 || error.response?.status === 409) {
        const errorMsg = error.response?.data?.error || error.message || 'You already have a pending order for this product.'
        setDuplicateError(errorMsg)
        // Don't show inline error, show modal instead
      } else {
        setSubmitStatus({ type: 'error', message: error.message || 'Something went wrong. Please try again.' })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const closeReceipt = () => {
    setShowReceipt(false)
    setOrderData(null)
    setSubmitStatus(null)
    // Reset form
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      address: '',
      product: '',
      quantity: 1,
      deliveryDate: '',
      deliveryTime: '',
      cakeSize: '',
      cakeFlavor: '',
      customMessage: '',
      instructions: '',
      recipientName: '',
      recipientPhone: '',
      surpriseLocation: '',
      surpriseTime: '',
      specialInstructions: '',
    })
  }

  const closeDuplicateModal = () => {
    setDuplicateError(null)
  }

  const selectedProduct = products.find(p => p.id === formData.product)
  const isSurprise = selectedProduct?.type === 'surprise'

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error/Success messages (only for non-duplicate errors) */}
        {submitStatus && submitStatus.type === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg flex items-start gap-3 bg-red-50 border border-red-200 text-red-800"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Oops!</p>
              <p className="text-sm mt-0.5">{submitStatus.message}</p>
            </div>
          </motion.div>
        )}

        {/* Customer Information */}
        <div className="bg-white rounded-xl p-5 shadow-soft space-y-4">
          <h3 className="font-display font-semibold text-lg">Your Information</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-neutral-700 mb-1">
                Full Name *
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition ${
                  errors.fullName ? 'border-red-500' : 'border-neutral-300'
                }`}
                placeholder="Your full name"
                data-error={errors.fullName ? 'true' : undefined}
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                Phone Number *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition ${
                  errors.phone ? 'border-red-500' : 'border-neutral-300'
                }`}
                placeholder="080 XXX XXX XXXX"
                data-error={errors.phone ? 'true' : undefined}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition ${
                  errors.email ? 'border-red-500' : 'border-neutral-300'
                }`}
                placeholder="you@example.com"
                data-error={errors.email ? 'true' : undefined}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-1">
                Delivery Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition ${
                  errors.address ? 'border-red-500' : 'border-neutral-300'
                }`}
                placeholder="Your delivery address"
                data-error={errors.address ? 'true' : undefined}
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-xl p-5 shadow-soft space-y-4">
          <h3 className="font-display font-semibold text-lg">Order Details</h3>

          <div>
            <label htmlFor="product" className="block text-sm font-medium text-neutral-700 mb-1">
              Select Product *
            </label>
            <select
              id="product"
              name="product"
              value={formData.product}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition ${
                errors.product ? 'border-red-500' : 'border-neutral-300'
              }`}
              data-error={errors.product ? 'true' : undefined}
            >
              <option value="">-- Choose a product --</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} – {p.priceLabel}
                </option>
              ))}
            </select>
            {errors.product && <p className="text-red-500 text-sm mt-1">{errors.product}</p>}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-neutral-700 mb-1">
                Quantity
              </label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                min="1"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
              />
            </div>
            <div>
              <label htmlFor="deliveryDate" className="block text-sm font-medium text-neutral-700 mb-1">
                Preferred Delivery Date *
              </label>
              <input
                id="deliveryDate"
                name="deliveryDate"
                type="date"
                value={formData.deliveryDate}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition ${
                  errors.deliveryDate ? 'border-red-500' : 'border-neutral-300'
                }`}
                min={new Date().toISOString().split('T')[0]}
                data-error={errors.deliveryDate ? 'true' : undefined}
              />
              {errors.deliveryDate && <p className="text-red-500 text-sm mt-1">{errors.deliveryDate}</p>}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="deliveryTime" className="block text-sm font-medium text-neutral-700 mb-1">
                Preferred Delivery Time
              </label>
              <input
                id="deliveryTime"
                name="deliveryTime"
                type="time"
                value={formData.deliveryTime}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
              />
            </div>
          </div>

          {selectedProduct && selectedProduct.type === 'cake' && (
            <div className="grid sm:grid-cols-2 gap-4">
              {productOptions.sizes && (
                <div>
                  <label htmlFor="cakeSize" className="block text-sm font-medium text-neutral-700 mb-1">
                    Cake Size
                  </label>
                  <select
                    id="cakeSize"
                    name="cakeSize"
                    value={formData.cakeSize}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                  >
                    <option value="">Select size</option>
                    {productOptions.sizes.map((size) => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
              )}
              {productOptions.flavors && (
                <div>
                  <label htmlFor="cakeFlavor" className="block text-sm font-medium text-neutral-700 mb-1">
                    Cake Flavor
                  </label>
                  <select
                    id="cakeFlavor"
                    name="cakeFlavor"
                    value={formData.cakeFlavor}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                  >
                    <option value="">Select flavor</option>
                    {productOptions.flavors.map((flavor) => (
                      <option key={flavor} value={flavor}>{flavor}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}

          <div>
            <label htmlFor="customMessage" className="block text-sm font-medium text-neutral-700 mb-1">
              Custom Message
            </label>
            <input
              id="customMessage"
              name="customMessage"
              type="text"
              value={formData.customMessage}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
              placeholder="e.g., Happy Birthday, Mary!"
            />
          </div>

          <div>
            <label htmlFor="instructions" className="block text-sm font-medium text-neutral-700 mb-1">
              Additional Instructions
            </label>
            <textarea
              id="instructions"
              name="instructions"
              rows="2"
              value={formData.instructions}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition resize-none"
              placeholder="Any special requests or details..."
            />
          </div>
        </div>

        {isSurprise && (
          <div className="bg-white rounded-xl p-5 shadow-soft space-y-4 border-l-4 border-secondary">
            <h3 className="font-display font-semibold text-lg flex items-center gap-2">
              <span>🎁</span> Surprise Details
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="recipientName" className="block text-sm font-medium text-neutral-700 mb-1">
                  Recipient's Name *
                </label>
                <input
                  id="recipientName"
                  name="recipientName"
                  type="text"
                  value={formData.recipientName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition ${
                    errors.recipientName ? 'border-red-500' : 'border-neutral-300'
                  }`}
                  data-error={errors.recipientName ? 'true' : undefined}
                />
                {errors.recipientName && <p className="text-red-500 text-sm mt-1">{errors.recipientName}</p>}
              </div>
              <div>
                <label htmlFor="recipientPhone" className="block text-sm font-medium text-neutral-700 mb-1">
                  Recipient's Phone *
                </label>
                <input
                  id="recipientPhone"
                  name="recipientPhone"
                  type="tel"
                  value={formData.recipientPhone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition ${
                    errors.recipientPhone ? 'border-red-500' : 'border-neutral-300'
                  }`}
                  data-error={errors.recipientPhone ? 'true' : undefined}
                />
                {errors.recipientPhone && <p className="text-red-500 text-sm mt-1">{errors.recipientPhone}</p>}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="surpriseLocation" className="block text-sm font-medium text-neutral-700 mb-1">
                  Surprise Location
                </label>
                <input
                  id="surpriseLocation"
                  name="surpriseLocation"
                  type="text"
                  value={formData.surpriseLocation}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                  placeholder="Where should the surprise happen?"
                />
              </div>
              <div>
                <label htmlFor="surpriseTime" className="block text-sm font-medium text-neutral-700 mb-1">
                  Surprise Time
                </label>
                <input
                  id="surpriseTime"
                  name="surpriseTime"
                  type="time"
                  value={formData.surpriseTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                />
              </div>
            </div>
            <div>
              <label htmlFor="specialInstructions" className="block text-sm font-medium text-neutral-700 mb-1">
                Special Instructions for Surprise
              </label>
              <textarea
                id="specialInstructions"
                name="specialInstructions"
                rows="2"
                value={formData.specialInstructions}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition resize-none"
                placeholder="Any special requests for the surprise setup..."
              />
            </div>
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? <Loading text="Submitting..." /> : 'Submit Order Request'}
        </Button>

        <p className="text-xs text-neutral-500 text-center mt-2">
          By submitting, you agree that we may contact you regarding this order.
          We'll confirm availability and payment details via phone.
        </p>
      </form>

      {/* Receipt Modal (success) */}
      <AnimatePresence>
        {showReceipt && orderData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary">
                  <Receipt className="w-6 h-6" />
                  <h3 className="font-display font-bold text-xl">Order Receipt</h3>
                </div>
                <button
                  onClick={closeReceipt}
                  className="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="font-semibold text-green-800">Order Request Received! 🎉</p>
                  <p className="text-sm text-green-700 mt-1">Your order has been submitted successfully.</p>
                </div>

                <div className="bg-primary/5 rounded-lg p-4 text-center">
                  <p className="text-sm text-neutral-500">Order ID</p>
                  <p className="font-mono font-bold text-lg text-primary">{orderData.id}</p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Customer:</span>
                    <span className="font-medium">{orderData.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Product:</span>
                    <span className="font-medium">{orderData.product}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Delivery Date:</span>
                    <span className="font-medium">{orderData.deliveryDate || 'Not specified'}</span>
                  </div>
                  {orderData.customMessage && (
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Message:</span>
                      <span className="font-medium">{orderData.customMessage}</span>
                    </div>
                  )}
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800 font-medium flex items-start gap-2">
                    <MessageCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>
                      Please send a WhatsApp message with your <strong>Order ID</strong> to confirm and process your order.
                      Our team will reach out to you shortly.
                    </span>
                  </p>
                </div>

                <div className="space-y-2">
                  <WhatsAppButton
                    fullWidth
                    message={`Hello, I just placed an order with Order ID: ${orderData.id}. Please assist me with the processing.`}
                  >
                    Send Order ID via WhatsApp
                  </WhatsAppButton>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={closeReceipt}
                  >
                    Continue Browsing
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Duplicate Order Error Modal */}
      <AnimatePresence>
        {duplicateError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full"
            >
              <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
                <div className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="w-6 h-6" />
                  <h3 className="font-display font-bold text-xl">Duplicate Order</h3>
                </div>
                <button
                  onClick={closeDuplicateModal}
                  className="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-800 font-medium">
                    {duplicateError}
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800 flex items-start gap-2">
                    <MessageCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>
                      If you need to make changes to your existing order, please contact us directly via WhatsApp.
                      Our team will assist you.
                    </span>
                  </p>
                </div>

                <div className="space-y-2">
                  <WhatsAppButton fullWidth>
                    Contact Support
                  </WhatsAppButton>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={closeDuplicateModal}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default OrderForm