import { motion } from 'framer-motion'
import { ShoppingBag, MessageCircle, PartyPopper } from 'lucide-react'
import SectionHeading from '../common/SectionHeading'

const steps = [
  {
    icon: ShoppingBag,
    title: 'Choose Your Cake or Surprise',
    description: 'Browse our collection and select the perfect product for your celebration.'
  },
  {
    icon: MessageCircle,
    title: 'Tell Us What You Need',
    description: 'Fill out our order form with your preferences, customizations, and delivery details.'
  },
  {
    icon: PartyPopper,
    title: 'We Make Your Celebration Special',
    description: 'We\'ll craft your order with care and deliver it to make your moment truly unforgettable.'
  }
]

const HowItWorks = () => {
  return (
    <section className="section-padding bg-cream">
      <div className="container-custom">
        <SectionHeading 
          title="How It Works"
          subtitle="Simple steps to your perfect celebration"
          centered
        />
        <div className="relative max-w-4xl mx-auto mt-8">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-secondary/30 -translate-y-1/2" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="flex flex-col items-center text-center relative"
                >
                  <div className="w-20 h-20 rounded-full bg-white shadow-card flex items-center justify-center mb-4 border-4 border-secondary/20 relative z-10">
                    <span className="absolute -top-2 -right-2 bg-secondary text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <Icon className="w-9 h-9 text-secondary" />
                  </div>
                  <h3 className="heading-card text-lg mb-2">{step.title}</h3>
                  <p className="text-small max-w-xs">{step.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks