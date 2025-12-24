import { Hero } from './hero';
import { Stats } from './stats';
import { About } from './about';
import { ProjectDemos } from './project-demos';
import { Contact } from './contact';
import { TechStack } from '@/components/views/landing-page/tech-stack';
import { Services } from '@/components/views/landing-page/services';
import { FeaturedCaseStudy } from '@/components/views/landing-page/featured-case-study';
import { Notes } from '@/components/views/landing-page/notes';
import { Testimonials } from '@/components/views/landing-page/testimonials';

export default function LandingPage() {
  return (
    <div>
      <Hero />
      <Services />
      <Stats />
      <About />
      <TechStack />
      <FeaturedCaseStudy />
      <ProjectDemos />
      <Notes />
      <Testimonials />
      <Contact />
    </div>
  );
}
