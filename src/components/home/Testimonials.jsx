import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { testimonials } from '../../data/testimonials'
import SectionHeading from '../common/SectionHeading'

const Testimonials = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeading 
          title="What Our Customers Say"
          subtitle="Real stories from real celebrations"
          centered
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="bg-cream rounded-xl p-6 shadow-soft hover:shadow-card transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-display font-bold text-xl">
                    {testimonial.name.charAt(0)}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-300'}`} 
                      />
                    ))}
                  </div>
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-neutral-500">{testimonial.location} • {testimonial.occasion}</p>
                </div>
              </div>
              <div className="mt-3 relative">
                <Quote className="w-6 h-6 text-secondary/20 absolute -top-1 -left-1" />
                <p className="text-sm text-neutral-600 pl-4 italic">"{testimonial.text}"</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials