import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingBag, Eye, CakeSlice, Gift } from 'lucide-react'
import { useState } from 'react'
import Button from '../common/Button'
import WhatsAppButton from '../common/WhatsAppButton'

const ProductCard = ({ product, index = 0 }) => {
  const [imageError, setImageError] = useState(false)
  const isSurprise = product.type === 'surprise'
  const Icon = isSurprise ? Gift : CakeSlice

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-xl overflow-hidden shadow-card hover:shadow-xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-warm">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-300">
            <Icon className="w-20 h-20" />
          </div>
        )}
        {/* Badge */}
        {product.popular && (
          <span className="absolute top-3 right-3 bg-secondary text-white text-xs font-semibold px-3 py-1 rounded-full">
            Popular
          </span>
        )}
        {product.featured && !product.popular && (
          <span className="absolute top-3 right-3 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
            Featured
          </span>
        )}
        <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-neutral-700 text-xs font-medium px-3 py-1 rounded-full">
          {isSurprise ? '🎁 Surprise' : '🎂 Cake'}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="heading-card text-neutral-800 line-clamp-1">
            {product.name}
          </h3>
          <span className="text-sm font-semibold text-primary whitespace-nowrap">
            {product.priceLabel}
          </span>
        </div>

        <p className="text-small line-clamp-2 mb-3">
          {product.shortDescription || product.description.slice(0, 80) + '...'}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {product.tags?.slice(0, 2).map((tag) => (
            <span key={tag} className="text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons - Mobile friendly layout */}
        <div className="flex flex-wrap gap-2 md:flex-nowrap">
          {/* View Details - takes half width on mobile, flex-1 on desktop */}
          <Link to={`/products/${product.id}`} className="flex-1 min-w-[calc(50%-0.5rem)] md:flex-1">
            <Button variant="outline" size="sm" className="w-full" icon={Eye}>
              View Details
            </Button>
          </Link>

          {/* Order - takes half width on mobile, flex-1 on desktop */}
          <Link to="/order" className="flex-1 min-w-[calc(50%-0.5rem)] md:flex-1">
            <Button size="sm" className="w-full" icon={ShoppingBag}>
              Order
            </Button>
          </Link>

          {/* WhatsApp - full width on mobile, flex-1 on desktop */}
          <div className="w-full md:w-auto md:flex-1">
            <WhatsAppButton
              size="sm"
              productName={product.name}
              className="w-full md:w-auto md:min-w-[120px]"
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard