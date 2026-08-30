import { MessageCircle } from 'lucide-react'
import { useSettings } from '../../context/SettingsContext'
import Button from './Button'

const WhatsAppButton = ({ 
  message = 'Hello, I would like to make an order.',
  productName = null,
  className = '',
  size = 'md',
  fullWidth = false,
  children 
}) => {
  const { settings } = useSettings()
  if (!settings) return null

  const formattedMessage = productName 
    ? `Hello, I am interested in ordering ${productName}.`
    : message

  const phone = settings.contact?.whatsapp?.replace(/\s/g, '').replace('+', '') || ''
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(formattedMessage)}`

  return (
    <Button
      variant="whatsapp"
      size={size}
      icon={MessageCircle}
      className={`${fullWidth ? 'w-full' : ''} ${className}`}
      onClick={() => window.open(url, '_blank')}
    >
      {children || 'Chat On WhatsApp'}
    </Button>
  )
}

export default WhatsAppButton