import { useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getProductById } from '../data/products'
import ProductDetailsComponent from '../components/products/ProductDetails'
import Loading from '../components/common/Loading'

const ProductDetails = () => {
  const { id } = useParams()
  const product = getProductById(id)

  if (!product) {
    return <Navigate to="/404" replace />
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="pt-20 sm:pt-24"
    >
      <ProductDetailsComponent product={product} />
    </motion.div>
  )
}

export default ProductDetails