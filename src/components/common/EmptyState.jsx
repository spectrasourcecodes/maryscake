import { Package, ShoppingBag } from 'lucide-react'

const EmptyState = ({ 
  title = 'No items found',
  description = 'We couldn\'t find any products matching your criteria.',
  icon: Icon = Package,
  action = null
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center">
      <div className="w-20 h-20 rounded-full bg-warm flex items-center justify-center mb-4">
        <Icon className="w-10 h-10 text-secondary" />
      </div>
      <h3 className="heading-card text-neutral-700 mb-2">{title}</h3>
      <p className="text-body max-w-md">{description}</p>
      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  )
}

export default EmptyState