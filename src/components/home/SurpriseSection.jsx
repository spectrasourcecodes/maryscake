import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Gift, Sparkles, Heart, ArrowRight } from 'lucide-react'
import { getSurprises } from '../../data/products'
import ProductGrid from '../products/ProductGrid'
import SectionHeading from '../common/SectionHeading'
import Button from '../common/Button'

const SurpriseSection = () => {
  const surprises = getSurprises().slice(0, 4)

  return (
    <section className="section-padding bg-gradient-to-br from-cream via-warm to-rose/20">
      <div className="container-custom">
        <SectionHeading 
          title="Surprise Experiences"
          subtitle="Create unforgettable moments"
          centered
        />
        <div className="text-center mb-8">
          <p className="text-body max-w-2xl mx-auto">
            From romantic gestures to grand celebrations, our surprise packages are designed to leave a lasting impression.
          </p>
        </div>
        <ProductGrid products={surprises} columns={{ default: 1, sm: 2, lg: 4 }} />
        <div className="text-center mt-10">
          <Link to="/surprises">
            <Button variant="secondary" icon={ArrowRight} iconPosition="right">
              Explore All Surprises
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default SurpriseSection