import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { getCakes, getProductsByCategory } from '../data/products'
import { cakeCategories } from '../data/categories'
import ProductGrid from '../components/products/ProductGrid'
import ProductFilters from '../components/products/ProductFilters'
import SectionHeading from '../components/common/SectionHeading'

const Cakes = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  
  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') {
      return getCakes()
    }
    return getProductsByCategory(activeCategory)
  }, [activeCategory])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="pt-20 sm:pt-24"
    >
      <div className="container-custom section-padding">
        <SectionHeading 
          title="Our Cakes"
          subtitle="Delicious creations for every occasion"
          centered
        />
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <ProductFilters 
            categories={cakeCategories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          <span className="text-sm text-neutral-500">
            {filteredProducts.length} products
          </span>
        </div>
        <div className="mt-6">
          <ProductGrid products={filteredProducts} columns={{ default: 1, sm: 2, lg: 4 }} />
        </div>
      </div>
    </motion.div>
  )
}

export default Cakes