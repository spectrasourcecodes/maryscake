import { useState } from 'react'
import { motion } from 'framer-motion'

const ProductFilters = ({ categories, activeCategory, onCategoryChange, className = '' }) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeCategory === category.id
              ? 'bg-primary text-white shadow-md'
              : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  )
}

export default ProductFilters