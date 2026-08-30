import { createContext, useState, useContext, useEffect } from 'react'
import api from '../services/api'
import { contactInfo as fallbackContact } from '../data/contact'
import { socialLinks as fallbackSocial } from '../data/socialLinks'

const SettingsContext = createContext()

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchSettings = async () => {
    try {
      const res = await api.get('/settings')
      setSettings(res.data)
    } catch (error) {
      console.error('Failed to fetch settings, using fallback data', error)
      // Fallback to static data
      setSettings({
        contact: fallbackContact,
        socialLinks: fallbackSocial
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  const updateSettings = async (data) => {
    try {
      const res = await api.put('/settings', data)
      setSettings(res.data.settings)
      return res.data.settings
    } catch (error) {
      console.error('Failed to update settings', error)
      throw error
    }
  }

  return (
    <SettingsContext.Provider value={{ settings, loading, fetchSettings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => useContext(SettingsContext)