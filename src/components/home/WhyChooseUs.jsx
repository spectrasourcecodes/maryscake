import { motion } from 'framer-motion'
import { 
  Heart, 
  Palette, 
  Award, 
  Truck, 
  Clock, 
  Sparkles 
} from 'lucide-react'
import SectionHeading from '../common/SectionHeading'

const features = [
  {
    icon: Heart,
    title: 'Personalized Service',
    description: 'We listen to your needs and create bespoke solutions for every celebration.'
  },
  {
    icon: Palette,
    title: 'Custom Designs',
    description: 'Unique and creative designs that reflect your style and the occasion.'
  },
  {
    icon: Award,
    title: 'Quality Ingredients',
    description: 'Only the finest, freshest ingredients go into our baked goods.'
  },
  {
    icon: Truck,
    title: 'Reliable Delivery',
    description: 'Timely and careful delivery to ensure your products arrive in perfect condition.'
  },
  {
    icon: Clock,
    title: 'On-Time Promise',
    description: 'We value your time and always deliver when we say we will.'
  },
  {
    icon: Sparkles,
    title: 'Memorable Experiences',
    description: 'We don\'t just make products; we create experiences that last a lifetime.'
  }
]

const WhyChooseUs = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeading 
          title="Why Choose Us"
          subtitle="What makes us different"
          centered
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-cream rounded-xl p-6 text-center group hover:shadow-card transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
                  <Icon className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="heading-card text-lg mb-2">{feature.title}</h3>
                <p className="text-small">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs