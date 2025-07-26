'use client';

import { motion } from 'framer-motion';

export function PersonalStory() {
  return (
    <section id='personal-story' className='py-20 px-4 bg-muted/30'>
      <div className='max-w-6xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className='relative'>
              <div className='w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl'>
                <img
                  src='/placeholder.svg?height=400&width=320'
                  alt='Ebube Ojinta - Personal'
                  className='w-full h-full object-cover'
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className='text-3xl md:text-4xl font-bold mb-6'>
              Curiosity <span className='text-primary'>piqued?</span>
            </h2>

            <div className='space-y-6 text-muted-foreground leading-relaxed'>
              <p>
                My journey in engineering started with a simple fascination: how
                do we make technology feel human? This question has driven every
                project I've worked on, from building AI-powered family
                storytelling tools to creating seamless user experiences that
                just <em>work</em>.
              </p>

              <p>
                I believe the best software is invisible—it solves problems so
                elegantly that users forget they're using technology at all.
                Whether I'm architecting a complex AI system or crafting a
                delightful frontend interaction, this philosophy guides every
                decision.
              </p>

              <p>
                When I'm not coding, you'll find me experimenting with new
                recipes in the kitchen, analyzing football tactics, or building
                small tools that make my daily life a bit more efficient. I'm
                always curious about how things work and how they can work
                better.
              </p>

              <div className='pt-4'>
                <h3 className='font-semibold text-foreground mb-2'>
                  Fun facts about me:
                </h3>
                <ul className='space-y-2 text-sm'>
                  <li>
                    🍳 I can code and cook simultaneously (multitasking at its
                    finest)
                  </li>
                  <li>
                    ⚽ Arsenal fan since 2010 (yes, I know how to handle
                    disappointment)
                  </li>
                  <li>🤖 I built my first chatbot before ChatGPT was cool</li>
                  <li>📚 I read technical documentation for fun (seriously)</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
