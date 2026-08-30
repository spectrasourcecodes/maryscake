import { motion } from 'framer-motion'
import Hero from '../components/home/Hero'
import CategorySection from '../components/home/CategorySection'
import FeaturedProducts from '../components/home/FeaturedProducts'
import SurpriseSection from '../components/home/SurpriseSection'
import WhyChooseUs from '../components/home/WhyChooseUs'
import HowItWorks from '../components/home/HowItWorks'
import Testimonials from '../components/home/Testimonials'
import CTASection from '../components/home/CTASection'

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Hero />
      <CategorySection />
      <FeaturedProducts />
      <SurpriseSection />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <CTASection />
    </motion.div>
  )
}

export default Home