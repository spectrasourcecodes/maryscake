import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CakeSlice } from 'lucide-react'
import { useState } from 'react'
import { siteConfig } from '../../data/site'
import Button from '../common/Button'
import WhatsAppButton from '../common/WhatsAppButton'

const Hero = () => {
  const [imageError, setImageError] = useState(false)

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-cream via-warm to-rose/20 pt-16 sm:pt-20">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container-custom relative z-10 grid lg:grid-cols-2 gap-12 items-center py-8 sm:py-12">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-4"
          >
            <CakeSlice className="w-4 h-4" />
            <span>Est. {siteConfig.foundedYear}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="heading-hero text-neutral-800"
          >
            Make Every Celebration{' '}
            <span className="text-primary">Unforgettable</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-body max-w-lg mx-auto lg:mx-0 mt-4"
          >
            Beautiful cakes, thoughtful surprises, and memorable moments crafted specially for you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-6"
          >
            <Link to="/order">
              <Button icon={ArrowRight} iconPosition="right">
                Order Now
              </Button>
            </Link>
            <Link to="/cakes">
              <Button variant="outline">
                Explore Our Collection
              </Button>
            </Link>
            <WhatsAppButton size="sm" />
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-8 text-sm text-neutral-500"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Premium Quality
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Custom Designs
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Reliable Delivery
            </span>
          </motion.div>
        </motion.div>

        {/* Right image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-md aspect-square">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-primary/10 rounded-3xl" />
            <div className="absolute -inset-4 bg-secondary/5 rounded-3xl blur-2xl" />
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-warm">
              {!imageError ? (
                <img
                  src="/images/hero-cake.jfif"
                  alt="Celebration cake and surprises"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                  <CakeSlice className="w-32 h-32 text-primary/30 mx-auto" />
                  <p className="text-neutral-400 font-body mt-4">🎂 Beautiful Cakes</p>
                  <p className="text-neutral-400 font-body">✨ Surprise Experiences</p>
                </div>
              )}
            </div>
            {/* Floating badges */}
            <motion.div
              className="absolute -top-4 -right-4 bg-white shadow-card rounded-xl px-4 py-2 flex items-center gap-2"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="text-2xl">⭐</span>
              <span className="font-body text-sm font-semibold">4.9/5</span>
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -left-4 bg-white shadow-card rounded-xl px-4 py-2 flex items-center gap-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              <span className="text-2xl">🎉</span>
              <span className="font-body text-sm font-semibold">500+ Happy Clients</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#FDF8F3"/>
        </svg>
      </div>
    </section>
  )
}

export default Hero