'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, MessageSquare, Send, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { config } from '@/lib/config';

// Validation schema
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required').max(200, 'Subject is too long'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000, 'Message is too long'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: 'Message sent successfully!',
          description: 'Check your email for confirmation.',
          variant: 'default',
        });
        reset(); // Clear the form
      } else {
        toast({
          title: 'Failed to send message',
          description: result.error || 'Please try again later.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Network error',
        description: 'Please check your connection and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const recipient = config.contact.email;
  const subject = config.contact.subject;
  const body = config.contact.body;
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);

  return (
    <section id='contact' className='py-20 px-4 bg-muted/30'>
      <div className='max-w-4xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>Get in Touch</h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            Ready to build something amazing together? Let's discuss your next
            project.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <MessageSquare className='h-5 w-5 text-primary' />
                  Send a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form and I'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='name'>Name</Label>
                      <Input
                        id='name'
                        placeholder='Your name'
                        {...register('name')}
                        className={errors.name ? 'border-red-500' : ''}
                      />
                      {errors.name && (
                        <p className='text-sm text-red-500'>{errors.name.message}</p>
                      )}
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='email'>Email</Label>
                      <Input
                        id='email'
                        type='email'
                        placeholder='your@email.com'
                        {...register('email')}
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      {errors.email && (
                        <p className='text-sm text-red-500'>{errors.email.message}</p>
                      )}
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='subject'>Subject</Label>
                    <Input
                      id='subject'
                      placeholder='Project discussion'
                      {...register('subject')}
                      className={errors.subject ? 'border-red-500' : ''}
                    />
                    {errors.subject && (
                      <p className='text-sm text-red-500'>{errors.subject.message}</p>
                    )}
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='message'>Message</Label>
                    <Textarea
                      id='message'
                      placeholder='Tell me about your project...'
                      className={`min-h-[120px] resize-none ${errors.message ? 'border-red-500' : ''}`}
                      {...register('message')}
                    />
                    {errors.message && (
                      <p className='text-sm text-red-500'>{errors.message.message}</p>
                    )}
                  </div>

                  <Button 
                    type='submit' 
                    className='w-full group' 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2' />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className='space-y-6'
          >
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Mail className='h-5 w-5 text-primary' />
                  Direct Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground mb-4'>
                  Prefer to reach out directly? Send me an email and I'll
                  respond as soon as possible.
                </p>
                <Button variant='outline' className='w-full bg-transparent' onClick={() => {
                  window.location.href = `mailto:${recipient}?subject=${encodedSubject}&body=${encodedBody}`;
                }}>
                  {config.personal.email}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What I Can Help With</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className='space-y-3 text-sm text-muted-foreground'>
                  <li className='flex items-start gap-2'>
                    <div className='w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0' />
                    Full-stack web application development
                  </li>
                  <li className='flex items-start gap-2'>
                    <div className='w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0' />
                    AI-powered application architecture
                  </li>
                  <li className='flex items-start gap-2'>
                    <div className='w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0' />
                    Technical leadership and team mentoring
                  </li>
                  <li className='flex items-start gap-2'>
                    <div className='w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0' />
                    System design and scalability consulting
                  </li>
                  <li className='flex items-start gap-2'>
                    <div className='w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0' />
                    Code reviews and architecture audits
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className='text-center mt-16 pt-16 border-t border-border/50'
      >
        <h3 className='text-xl font-semibold mb-6'>
          What do you think? Feel free to reach out, let me know if you're
          looking for a developer, have a question, or simply want to connect.
        </h3>

        <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
          <Button variant='outline' size='lg' className='gap-2 bg-transparent'>
            <Mail className='h-5 w-5' />
            {config.personal.email}
          </Button>
          <Button variant='outline' size='lg' className='gap-2 bg-transparent'>
            <Phone className='h-5 w-5' />
            {config.personal.phone}
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
