import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { getSurprises, getProductsByCategory } from '../data/products'
import { surpriseCategories } from '../data/categories'
import ProductGrid from '../components/products/ProductGrid'
import ProductFilters from '../components/products/ProductFilters'
import SectionHeading from '../components/common/SectionHeading'

const Surprises = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  
  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') {
      return getSurprises()
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
          title="Surprise Packages"
          subtitle="Curated experiences for unforgettable moments"
          centered
        />
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <ProductFilters 
            categories={surpriseCategories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          <span className="text-sm text-neutral-500">
            {filteredProducts.length} packages
          </span>
        </div>
        <div className="mt-6">
          <ProductGrid products={filteredProducts} columns={{ default: 1, sm: 2, lg: 4 }} />
        </div>
      </div>
    </motion.div>
  )
}

export default Surprises