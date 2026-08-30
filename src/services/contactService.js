import api from './api'

export const submitContact = async (contactData) => {
  try {
    const response = await api.post('/contact', contactData)
    return response.data
  } catch (error) {
    console.error('Contact submission error:', error)
    throw error.response?.data || { error: 'Failed to send message' }
  }
}