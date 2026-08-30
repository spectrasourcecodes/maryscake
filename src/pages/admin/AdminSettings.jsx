import { useState, useEffect } from 'react'
import { useSettings } from '../../context/SettingsContext'
import Button from '../../components/common/Button'
import Loading from '../../components/common/Loading'

const AdminSettings = () => {
  const { settings, loading, updateSettings } = useSettings()
  const [formData, setFormData] = useState({})
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    if (settings) {
      setFormData({
        phone: settings.contact?.phone || '',
        whatsapp: settings.contact?.whatsapp || '',
        email: settings.contact?.email || '',
        address: settings.contact?.address || '',
        city: settings.contact?.city || '',
        openingHours: settings.contact?.openingHours || {},
        socialLinks: settings.socialLinks || {}
      })
    }
  }, [settings])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSocialChange = (platform, field, value) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: {
          ...prev.socialLinks[platform],
          [field]: value
        }
      }
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)
    try {
      await updateSettings({
        contact: {
          phone: formData.phone,
          whatsapp: formData.whatsapp,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          openingHours: formData.openingHours
        },
        socialLinks: formData.socialLinks
      })
      setMessage({ type: 'success', text: 'Settings updated successfully!' })
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update settings.' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="text-center py-12">Loading settings...</div>

  return (
    <div>
      <h1 className="heading-section text-2xl">Settings</h1>
      {message && (
        <div className={`mt-4 p-3 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {/* Contact Info */}
        <div className="bg-white p-6 rounded-xl shadow-soft space-y-4">
          <h3 className="font-display font-semibold text-lg">Contact Information</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700">Phone</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">WhatsApp</label>
              <input
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Address</label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">City</label>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white p-6 rounded-xl shadow-soft space-y-4">
          <h3 className="font-display font-semibold text-lg">Social Media</h3>
          {['instagram', 'facebook', 'tiktok', 'twitter'].map(platform => (
            <div key={platform} className="grid sm:grid-cols-2 gap-4 border-b pb-4 last:border-0">
              <div>
                <label className="block text-sm font-medium text-neutral-700 capitalize">{platform} URL</label>
                <input
                  value={formData.socialLinks?.[platform]?.url || ''}
                  onChange={(e) => handleSocialChange(platform, 'url', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:outline-none"
                  placeholder={`https://...`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 capitalize">{platform} Username</label>
                <input
                  value={formData.socialLinks?.[platform]?.username || ''}
                  onChange={(e) => handleSocialChange(platform, 'username', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:outline-none"
                  placeholder={`@${platform}`}
                />
              </div>
            </div>
          ))}
        </div>

        <Button type="submit" disabled={saving} className="w-full sm:w-auto">
          {saving ? <Loading text="Saving..." /> : 'Save Settings'}
        </Button>
      </form>
    </div>
  )
}

export default AdminSettings