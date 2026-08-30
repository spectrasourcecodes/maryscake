import ProductCard from './ProductCard'
import EmptyState from '../common/EmptyState'

const ProductGrid = ({ products, columns = { default: 1, sm: 2, lg: 4 } }) => {
  if (!products || products.length === 0) {
    return <EmptyState title="No products found" description="We couldn't find any products matching your criteria." />
  }

  const getCols = () => {
    let cols = `grid-cols-${columns.default || 1}`
    if (columns.sm) cols += ` sm:grid-cols-${columns.sm}`
    if (columns.lg) cols += ` lg:grid-cols-${columns.lg}`
    return cols
  }

  return (
    <div className={`grid ${getCols()} gap-4 sm:gap-6`}>
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  )
}

export default ProductGrid