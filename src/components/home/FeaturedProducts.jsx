import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { getFeaturedProducts } from '../../data/products'
import ProductGrid from '../products/ProductGrid'
import SectionHeading from '../common/SectionHeading'
import Button from '../common/Button'

const FeaturedProducts = () => {
  const featured = getFeaturedProducts().slice(0, 6)

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeading 
          title="Featured Cakes & Surprises"
          subtitle="Our most popular creations"
          centered
        />
        <ProductGrid products={featured} columns={{ default: 1, sm: 2, lg: 3 }} />
        <div className="text-center mt-10">
          <Link to="/cakes">
            <Button variant="outline" icon={ArrowRight} iconPosition="right">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts