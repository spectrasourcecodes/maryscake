import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import OrderForm from '../components/forms/OrderForm'
import OrderReceiptModal from '../components/common/OrderReceiptModal'
import SectionHeading from '../components/common/SectionHeading'

const Order = () => {
  const [searchParams] = useSearchParams()
  const initialProduct = searchParams.get('product') || ''

  const [showReceipt, setShowReceipt] = useState(false)
  const [lastOrder, setLastOrder] = useState(null)

  const handleOrderSuccess = (order) => {
    setLastOrder(order)
    setShowReceipt(true)
  }

  return (
    <div className="container-custom section-padding">
      <SectionHeading
        title="Place Your Order"
        subtitle="Fill in the details below"
        centered
      />
      <div className="max-w-2xl mx-auto">
        <OrderForm
          initialProduct={initialProduct}
          onSuccess={handleOrderSuccess}
        />
      </div>

      <OrderReceiptModal
        isOpen={showReceipt}
        onClose={() => setShowReceipt(false)}
        order={lastOrder}
      />
    </div>
  )
}

export default Order