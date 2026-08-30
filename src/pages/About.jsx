import { motion } from 'framer-motion'
import { Heart, Award, Users, CakeSlice } from 'lucide-react'
import { siteConfig } from '../data/site'
import SectionHeading from '../components/common/SectionHeading'

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Passion',
      description: 'We pour our hearts into every creation, ensuring each one is made with love and care.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for perfection in every detail, from ingredients to presentation.'
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We listen and deliver beyond expectations.'
    },
    {
      icon: CakeSlice,
      title: 'Creativity',
      description: 'We bring your vision to life with unique designs and innovative concepts.'
    }
  ]

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
          title="About Us"
          subtitle={`Our story and what drives us`}
          centered
        />
        
        <div className="grid lg:grid-cols-2 gap-12 mt-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-warm rounded-2xl aspect-square overflow-hidden flex items-center justify-center">
              <CakeSlice className="w-32 h-32 text-secondary/30" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="heading-card text-2xl">Our Story</h2>
            <p className="text-body">
              Founded in {siteConfig.foundedYear}, {siteConfig.name} was born from a simple belief: every celebration deserves to be special. What started as a small kitchen operation has grown into a trusted brand known for premium cakes and unforgettable surprises.
            </p>
            <p className="text-body">
              We combine the art of baking with the science of celebration. Our team of passionate bakers, designers, and event planners work together to create experiences that leave lasting impressions.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-cream rounded-xl p-4 text-center">
                <span className="block text-3xl font-display font-bold text-primary">500+</span>
                <span className="text-sm text-neutral-500">Happy Clients</span>
              </div>
              <div className="bg-cream rounded-xl p-4 text-center">
                <span className="block text-3xl font-display font-bold text-primary">4.9</span>
                <span className="text-sm text-neutral-500">Average Rating</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-16">
          <SectionHeading 
            title="Our Values"
            subtitle="What we stand for"
            centered
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-center p-6 bg-white rounded-xl shadow-soft"
                >
                  <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-7 h-7 text-secondary" />
                  </div>
                  <h4 className="font-display font-semibold text-lg">{value.title}</h4>
                  <p className="text-small mt-1">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default About