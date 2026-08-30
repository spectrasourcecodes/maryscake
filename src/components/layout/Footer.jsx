import { Link } from 'react-router-dom'
import { Heart, Mail, MapPin, Phone, Clock } from 'lucide-react'
import { siteConfig } from '../../data/site'
import { footerNav } from '../../data/navigation'
import { useSettings } from '../../context/SettingsContext'
import WhatsAppButton from '../common/WhatsAppButton'

const Footer = () => {
  const { settings, loading } = useSettings()
  if (loading || !settings) return <div className="h-80 animate-pulse bg-neutral-100" /> // skeleton

  const { contact, socialLinks } = settings

  return (
    <footer className="bg-neutral-900 text-neutral-300 pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white font-display font-bold text-lg">
                MC
              </div>
              <span className="font-display font-semibold text-lg text-white">
                {siteConfig.shortName}
              </span>
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-3">
              {/* Social Links */}
              {socialLinks.instagram?.url && (
                <a
                  href={socialLinks.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-secondary transition-colors"
                  aria-label="Instagram"
                >
                  <span className="sr-only">Instagram</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
              )}
              {socialLinks.facebook?.url && (
                <a
                  href={socialLinks.facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-secondary transition-colors"
                  aria-label="Facebook"
                >
                  <span className="sr-only">Facebook</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}
              {socialLinks.tiktok?.url && (
                <a
                  href={socialLinks.tiktok.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-secondary transition-colors"
                  aria-label="TikTok"
                >
                  <span className="sr-only">TikTok</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0115.54.01h-3.23v16.17c-.09 1.16-.82 2.4-1.94 2.74-1.71.52-3.67-.34-4.54-1.95-.86-1.61-.53-3.88 1.13-4.91.78-.49 1.72-.68 2.64-.58v-3.34c-2.86-.24-5.86 1.01-6.96 3.97-1.3 3.47.29 7.86 4.26 8.65 3.55.7 7.44-1.35 8.14-5.05.08-.44.13-.89.14-1.35V6.29c.01.04 0 0 0 0z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-white text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerNav.quickLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    to={link.path}
                    className="text-sm text-neutral-400 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-white text-lg mb-4">Our Services</h4>
            <ul className="space-y-2">
              {footerNav.services.map((link) => (
                <li key={link.id}>
                  <Link
                    to={link.path}
                    className="text-sm text-neutral-400 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-white text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                <span>{contact.phone}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                <a href={`mailto:${contact.email}`} className="hover:text-secondary transition-colors">
                  {contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                <span>{contact.address}, {contact.city}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <p>Mon-Fri: {contact.openingHours?.monday}</p>
                  <p>Sat: {contact.openingHours?.saturday}</p>
                  <p>Sun: {contact.openingHours?.sunday}</p>
                </div>
              </li>
            </ul>
            <div className="mt-4">
              <WhatsAppButton size="sm" />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-neutral-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> in {siteConfig.location}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer