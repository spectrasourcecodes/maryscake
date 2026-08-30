import { motion } from 'framer-motion'

const SectionHeading = ({ 
  title, 
  subtitle, 
  centered = false,
  className = '',
  titleClassName = '',
  subtitleClassName = '',
  animation = true
}) => {
  const Wrapper = animation ? motion.div : 'div'
  const wrapperProps = animation ? {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  } : {}

  return (
    <Wrapper 
      className={`mb-8 sm:mb-12 ${centered ? 'text-center' : ''} ${className}`}
      {...wrapperProps}
    >
      {subtitle && (
        <span className={`text-secondary font-semibold text-sm uppercase tracking-wider ${subtitleClassName}`}>
          {subtitle}
        </span>
      )}
      <h2 className={`heading-section text-neutral-800 mt-2 ${titleClassName}`}>
        {title}
      </h2>
      {centered && (
        <div className="w-16 h-0.5 bg-secondary mx-auto mt-4 rounded-full" />
      )}
    </Wrapper>
  )
}

export default SectionHeading