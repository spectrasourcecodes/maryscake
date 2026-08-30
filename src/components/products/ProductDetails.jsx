import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ShoppingBag, 
  MessageCircle, 
  Check, 
  CakeSlice, 
  Gift,
  Package,
  Star,
  Truck,
  Heart
} from 'lucide-react'
import { siteConfig } from '../../data/site'
import { contactInfo } from '../../data/contact'
import Button from '../common/Button'
import WhatsAppButton from '../common/WhatsAppButton'
import SectionHeading from '../common/SectionHeading'

const ProductDetails = ({ product }) => {
  const [imageError, setImageError] = useState(false)
  if (!product) return null

  const isSurprise = product.type === 'surprise'
  const Icon = isSurprise ? Gift : CakeSlice

  return (
    <div className="container-custom section-padding">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="aspect-square rounded-2xl overflow-hidden bg-warm shadow-lg">
            {!imageError ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-300">
                <Icon className="w-32 h-32" />
              </div>
            )}
          </div>
          {product.popular && (
            <span className="absolute top-4 right-4 bg-secondary text-white text-sm font-semibold px-4 py-2 rounded-full">
              Popular
            </span>
          )}
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <div>
            <div className="flex items-center gap-2 text-sm text-secondary font-semibold mb-2">
              <span className="uppercase tracking-wider">{product.category}</span>
              <span className="w-1 h-1 bg-neutral-300 rounded-full" />
              <span>{isSurprise ? 'Surprise Package' : 'Cake'}</span>
            </div>
            <h1 className="heading-hero text-3xl sm:text-4xl">{product.name}</h1>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">{product.priceLabel}</span>
              {product.available && (
                <span className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full flex items-center gap-1">
                  <Check className="w-4 h-4" /> Available
                </span>
              )}
            </div>
          </div>

          <p className="text-body">{product.description}</p>

          {/* Includes for surprises */}
          {isSurprise && product.includes && (
            <div className="bg-cream rounded-xl p-5">
              <h3 className="font-display font-semibold text-lg mb-3 flex items-center gap-2">
                <Package className="w-5 h-5 text-secondary" />
                What's Included
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.includes.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-neutral-700">
                    <Check className="w-4 h-4 text-secondary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Options */}
          {product.options && (
            <div className="space-y-3">
              {product.options.sizes && (
                <div>
                  <h4 className="font-semibold text-sm text-neutral-600 mb-1">Available Sizes</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.options.sizes.map((size) => (
                      <span key={size} className="bg-white border border-neutral-200 rounded-full px-4 py-1 text-sm">
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {product.options.flavors && (
                <div>
                  <h4 className="font-semibold text-sm text-neutral-600 mb-1">Flavors</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.options.flavors.map((flavor) => (
                      <span key={flavor} className="bg-white border border-neutral-200 rounded-full px-4 py-1 text-sm">
                        {flavor}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {product.options.cakeSizes && (
                <div>
                  <h4 className="font-semibold text-sm text-neutral-600 mb-1">Cake Sizes</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.options.cakeSizes.map((size) => (
                      <span key={size} className="bg-white border border-neutral-200 rounded-full px-4 py-1 text-sm">
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {product.options.cakeFlavors && (
                <div>
                  <h4 className="font-semibold text-sm text-neutral-600 mb-1">Cake Flavors</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.options.cakeFlavors.map((flavor) => (
                      <span key={flavor} className="bg-white border border-neutral-200 rounded-full px-4 py-1 text-sm">
                        {flavor}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {product.options.cupcakeFlavors && (
                <div>
                  <h4 className="font-semibold text-sm text-neutral-600 mb-1">Cupcake Flavors</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.options.cupcakeFlavors.map((flavor) => (
                      <span key={flavor} className="bg-white border border-neutral-200 rounded-full px-4 py-1 text-sm">
                        {flavor}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-neutral-200">
            <Link to="/order">
              <Button icon={ShoppingBag} size="lg">
                Order Now
              </Button>
            </Link>
            <WhatsAppButton productName={product.name} size="lg" />
          </div>

          {/* Quick info */}
          <div className="grid grid-cols-2 gap-4 text-sm text-neutral-600 bg-neutral-50 rounded-xl p-4">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-secondary" />
              <span>Delivery available</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-secondary" />
              <span>Customizable</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-secondary" />
              <span>Premium quality</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-secondary" />
              <span>Chat with us</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ProductDetails