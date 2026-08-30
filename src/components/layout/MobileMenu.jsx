import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Phone } from 'lucide-react'
import { navigation } from '../../data/navigation'
import { contactInfo } from '../../data/contact'
import WhatsAppButton from '../common/WhatsAppButton'

const MobileMenu = ({ isOpen, onClose }) => {
  const location = useLocation()

  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: { type: 'tween', duration: 0.3 }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: { type: 'tween', duration: 0.3 }
    }
  }

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.08 }
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Menu */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-cream z-50 md:hidden shadow-2xl flex flex-col"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-200">
              <span className="font-display font-semibold text-lg text-primary">Menu</span>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.id}
                  custom={index}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                >
                  <Link
                    to={item.path}
                    className={`block px-4 py-3 rounded-lg font-body text-base font-medium transition-colors ${
                      location.pathname === item.path
                        ? 'bg-primary text-white'
                        : 'text-neutral-700 hover:bg-neutral-100'
                    }`}
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Footer Actions */}
            <div className="p-4 border-t border-neutral-200 space-y-3">
              <Link
                to="/order"
                className="btn-primary w-full"
                onClick={onClose}
              >
                <ShoppingBag className="w-5 h-5" />
                Order Now
              </Link>
              <WhatsAppButton fullWidth />
              <a
                href={`tel:${contactInfo.phone}`}
                className="flex items-center justify-center gap-2 text-neutral-600 font-body text-sm hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                {contactInfo.phone}
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu