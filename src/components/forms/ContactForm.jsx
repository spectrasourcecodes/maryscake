import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, AlertCircle } from 'lucide-react'
import { submitContact } from '../../services/contactService'
import Button from '../common/Button'
import Loading from '../common/Loading'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await submitContact(formData)
      setSubmitStatus({ type: 'success', message: response.message })
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      })
    } catch (error) {
      setSubmitStatus({ type: 'error', message: error.message || 'Something went wrong. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {submitStatus && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg flex items-start gap-3 ${
            submitStatus.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          {submitStatus.type === 'success' ? (
            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          )}
          <div>
            <p className="font-medium">
              {submitStatus.type === 'success' ? 'Message Sent! ✓' : 'Error'}
            </p>
            <p className="text-sm mt-0.5">{submitStatus.message}</p>
          </div>
        </motion.div>
      )}

      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-neutral-700 mb-1">
          Full Name *
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition ${
            errors.name ? 'border-red-500' : 'border-neutral-300'
          }`}
          placeholder="Your name"
          data-error={errors.name ? 'true' : undefined}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-neutral-700 mb-1">
            Email Address *
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition ${
              errors.email ? 'border-red-500' : 'border-neutral-300'
            }`}
            placeholder="you@example.com"
            data-error={errors.email ? 'true' : undefined}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="contact-phone" className="block text-sm font-medium text-neutral-700 mb-1">
            Phone Number
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
            placeholder="080 XXX XXX XXXX"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className="block text-sm font-medium text-neutral-700 mb-1">
          Subject
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
          placeholder="How can we help?"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-neutral-700 mb-1">
          Message *
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition resize-none ${
            errors.message ? 'border-red-500' : 'border-neutral-300'
          }`}
          placeholder="Tell us about your celebration or question..."
          data-error={errors.message ? 'true' : undefined}
        />
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? <Loading text="Sending..." /> : 'Send Message'}
      </Button>
    </form>
  )
}

export default ContactForm