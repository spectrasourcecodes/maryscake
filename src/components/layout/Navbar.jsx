import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X, ShoppingBag } from 'lucide-react'
import { siteConfig } from '../../data/site'
import { navigation } from '../../data/navigation'
import MobileMenu from './MobileMenu'
import WhatsAppButton from '../common/WhatsAppButton'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-cream/95 backdrop-blur-md shadow-soft' 
            : 'bg-transparent'
        }`}
      >
        <nav className="container-custom h-16 sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-display font-bold text-lg">
              MC
            </div>
            <span className="font-display font-semibold text-lg sm:text-xl text-primary">
              {siteConfig.shortName}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`font-body text-sm font-medium transition-colors hover:text-primary relative ${
                  location.pathname === item.path 
                    ? 'text-primary' 
                    : 'text-neutral-600'
                }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    layoutId="navbar-underline"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <WhatsAppButton size="sm" />
            <Link to="/order" className="btn-primary text-sm px-4 py-2">
              <ShoppingBag className="w-4 h-4" />
              Order Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </header>

      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

export default Navbar