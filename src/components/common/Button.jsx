import { motion } from 'framer-motion'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  icon: Icon, 
  iconPosition = 'left',
  ...props 
}) => {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    whatsapp: 'btn-whatsapp',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const baseClasses = `font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center gap-2`
  
  const variantClasses = variants[variant] || variants.primary
  const sizeClasses = sizes[size] || sizes.md

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-5 h-5" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-5 h-5" />}
    </motion.button>
  )
}

export default Button