import { Hero } from './hero';
import { Stats } from './stats';
import { About } from './about';
import { ProjectDemos } from './project-demos';
import { Contact } from './contact';
import { TechStack } from '@/components/views/landing-page/tech-stack';

export default function LandingPage() {
  return (
    <div>
      <Hero />
      <Stats />
      <About />
      <TechStack />
      <ProjectDemos />
      <Contact />
    </div>
  );
}
