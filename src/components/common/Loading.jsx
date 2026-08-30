import { motion } from 'framer-motion'

const Loading = ({ text = 'Loading...', fullScreen = false }) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <motion.div
        className="w-12 h-12 border-4 border-secondary border-t-primary rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      {text && <p className="text-neutral-500 font-body">{text}</p>}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        {content}
      </div>
    )
  }

  return content
}

export default Loading