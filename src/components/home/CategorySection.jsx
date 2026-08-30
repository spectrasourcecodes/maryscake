import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CakeSlice, Gift, Heart, Package, Palette } from 'lucide-react'
import { homeCategories } from '../../data/categories'
import SectionHeading from '../common/SectionHeading'

const iconMap = {
  CakeSlice: CakeSlice,
  Gift: Gift,
  Heart: Heart,
  Package: Package,
  Palette: Palette,
}

const CategorySection = () => {
  return (
    <section className="section-padding bg-cream">
      <div className="container-custom">
        <SectionHeading
          title="Browse Our Collections"
          subtitle="What are you celebrating?"
          centered
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 mt-8">
          {homeCategories.map((category, index) => {
            const IconComponent = iconMap[category.icon] || CakeSlice
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="group"
              >
                <Link
                  to={
                    category.slug === 'birthday'
                      ? '/cakes'
                      : category.slug === 'custom'
                      ? '/cakes?category=custom'
                      : category.slug === 'cupcakes'
                      ? '/cakes?category=cupcakes'
                      : category.slug === 'valentine'
                      ? '/surprises?category=valentine'
                      : category.slug === 'gift'
                      ? '/surprises?category=gift'
                      : '/surprises'
                  }
                  className="block bg-white rounded-xl p-4 sm:p-6 text-center shadow-soft hover:shadow-card transition-all duration-300 group-hover:-translate-y-1"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-warm mx-auto flex items-center justify-center text-secondary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <IconComponent className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <p className="mt-3 text-sm sm:text-base font-medium text-neutral-700 group-hover:text-primary transition-colors">
                    {category.label}
                  </p>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CategorySection