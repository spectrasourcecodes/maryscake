import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PartyPopper, ArrowRight, MessageCircle } from 'lucide-react'
import Button from '../common/Button'
import WhatsAppButton from '../common/WhatsAppButton'

const CTASection = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-primary to-primary-dark text-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <PartyPopper className="w-16 h-16 mx-auto mb-4 text-secondary" />
          <h2 className="heading-section text-white">Planning Something Special?</h2>
          <p className="text-body text-white/80 mt-4 max-w-lg mx-auto">
            Let us bring your vision to life. Whether it's a birthday, anniversary, or a surprise for someone you love.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <Link to="/order">
              <Button variant="secondary" icon={ArrowRight} iconPosition="right" size="lg">
                Order Now
              </Button>
            </Link>
            <WhatsAppButton size="lg" className="bg-white text-primary hover:bg-neutral-100">
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </WhatsAppButton>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTASection