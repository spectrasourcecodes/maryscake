import { useSettings } from '../context/SettingsContext'
import { Mail, MapPin, Phone, Clock, MessageCircle } from 'lucide-react'
import SectionHeading from '../components/common/SectionHeading'
import ContactForm from '../components/forms/ContactForm'

const Contact = () => {
  const { settings, loading } = useSettings()
  if (loading) return <div className="container-custom section-padding text-center">Loading...</div>

  const { contact, socialLinks } = settings || {}

  return (
    <div className="section-padding">
      <div className="container-custom">
        <SectionHeading title="Get in Touch" subtitle="Contact Us" centered />

        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-soft">
              <h3 className="font-display font-semibold text-lg mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-secondary mt-0.5" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-neutral-600">{contact?.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-secondary mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-neutral-600">{contact?.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-secondary mt-0.5" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-neutral-600">{contact?.address}, {contact?.city}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-secondary mt-0.5" />
                  <div>
                    <p className="font-medium">Opening Hours</p>
                    <p className="text-neutral-600">Mon-Fri: {contact?.openingHours?.monday}</p>
                    <p className="text-neutral-600">Sat: {contact?.openingHours?.saturday}</p>
                    <p className="text-neutral-600">Sun: {contact?.openingHours?.sunday}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-soft">
              <h3 className="font-display font-semibold text-lg mb-4">Follow Us</h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks?.instagram?.url && (
                  <a
                    href={socialLinks.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-neutral-100 rounded-lg hover:bg-secondary/10 transition-colors"
                  >
                    <span className="sr-only">Instagram</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </a>
                )}
                {socialLinks?.facebook?.url && (
                  <a
                    href={socialLinks.facebook.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-neutral-100 rounded-lg hover:bg-secondary/10 transition-colors"
                  >
                    <span className="sr-only">Facebook</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                )}
                {socialLinks?.tiktok?.url && (
                  <a
                    href={socialLinks.tiktok.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-neutral-100 rounded-lg hover:bg-secondary/10 transition-colors"
                  >
                    <span className="sr-only">TikTok</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0115.54.01h-3.23v16.17c-.09 1.16-.82 2.4-1.94 2.74-1.71.52-3.67-.34-4.54-1.95-.86-1.61-.53-3.88 1.13-4.91.78-.49 1.72-.68 2.64-.58v-3.34c-2.86-.24-5.86 1.01-6.96 3.97-1.3 3.47.29 7.86 4.26 8.65 3.55.7 7.44-1.35 8.14-5.05.08-.44.13-.89.14-1.35V6.29c.01.04 0 0 0 0z"/>
                    </svg>
                  </a>
                )}
                {socialLinks?.twitter?.url && (
                  <a
                    href={socialLinks.twitter.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-neutral-100 rounded-lg hover:bg-secondary/10 transition-colors"
                  >
                    <span className="sr-only">Twitter</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                )}
                {socialLinks?.whatsapp?.url && (
                  <a
                    href={socialLinks.whatsapp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-neutral-100 rounded-lg hover:bg-secondary/10 transition-colors"
                  >
                    <span className="sr-only">WhatsApp</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-xl shadow-soft">
              <h3 className="font-display font-semibold text-lg mb-4">Send Us a Message</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact