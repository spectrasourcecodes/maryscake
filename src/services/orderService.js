import api from './api'

export const submitOrder = async (orderData) => {
  try {
    const response = await api.post('/orders', orderData)
    return response.data
  } catch (error) {
    console.error('Order submission error:', error)
    
    // If there is a response from the server, create a meaningful error
    if (error.response) {
      const err = new Error(error.response.data?.error || 'Failed to submit order')
      err.status = error.response.status
      err.data = error.response.data
      throw err
    }
    
    // Network or other errors
    throw new Error('Network error. Please check your connection.')
  }
}