import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { config } from '@/lib/config';

export function Footer() {
  return (
    <footer className='border-t border-border/50 py-12 px-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-6'>
          <div className='text-center md:text-left'>
            <h3 className='text-lg font-semibold mb-2'>
              Chukwumdiebube Ojinta
            </h3>
            <p className='text-muted-foreground'>
              Full-Stack Engineer & AI Systems Architect
            </p>
          </div>

          <div className='flex gap-4'>
            <Button variant='ghost' size='icon' className='hover:text-primary' onClick={() => window.open(config.social.github, '_blank')}>
              <Github className='h-5 w-5' />
            </Button>
            <Button variant='ghost' size='icon' className='hover:text-primary' onClick={() => window.open(config.social.linkedin, '_blank')}>
              <Linkedin className='h-5 w-5' />
            </Button>
            <Button variant='ghost' size='icon' className='hover:text-primary' onClick={() => window.open(`mailto:${config.email.replyTo}`, '_blank')}>
              <Mail className='h-5 w-5' />
            </Button>
          </div>
        </div>

        <div className='mt-8 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground'>
          <p>&copy; {new Date().getFullYear()} Chukwumdiebube Ojinta. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
