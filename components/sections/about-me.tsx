import Image from "next/image";

import EbubeFullPose from "/public/images/ebube.jpg";
import Tag from "@/components/data-display/tag";
import Container from "@/components/layout/container";
import Typography from "@/components/general/typography";
import Link from "@/components/navigation/link";
import { EXTERNAL_LINKS } from "@/lib/data";

const AboutMeSection = () => {
  return (
    <Container className="bg-gray-50" id="about">
      <div className="self-center">
        <Tag label="About me" />
      </div>

      <div className="flex w-full flex-col justify-between gap-12 md:flex-row">
        {/* Image */}
        <div className="flex justify-center md:order-first md:justify-end">
          <div className="relative h-[380px] w-[320px] md:h-[460px] md:w-[380px] lg:h-[520px] lg:w-[440px]">
            <Image
              src={EbubeFullPose}
              alt="Fullpose of Ebube"
              className="absolute z-10 h-[360px] max-w-[280px] w-full border-8 border-gray-50 max-md:left-5 md:right-0 md:top-0 md:h-[420px] md:max-w-[340px] lg:h-[480px] lg:max-w-[400px]"
              style={{ objectFit: "fill" }}
            />
            <div className="absolute h-[360px] w-[320px] border-8 border-transparent bg-gray-200 max-md:top-5 md:bottom-0 md:left-0 md:h-[420px] md:w-[340px] lg:h-[480px] lg:w-[400px]"></div>
          </div>
        </div>

        {/* Content */}
        <div className="flex max-w-xl flex-col gap-6">
          <Typography variant="h3">Curiosity piqued?</Typography>
          <Typography className="text-justify">
            My name is Chukwumdiebube Uchechukwu Ojinta, a passionate and design-oriented
            frontend developer with 2+ years of experience and a year of work
            experience, currently located in Enugu, Nigeria. My expertise lies
            in full-stack development, focusing on React.js and Node.js. I find
            immense joy in bringing both the technical and visual aspects of
            digital products to life, emphasizing user experience, pixel-perfect
            design, and writing clean, high-performant code.
          </Typography>
          <Typography className="text-justify">
            Throughout my journey as a web developer, I&apos;ve been driven by a
            relentless passion for creating exceptional digital products. From
            my early days at Digital Links in Nigeria, where I started in IT, to
            honing my skills at this level, I have always been drawn to the
            world of web development and design.
          </Typography>
          <Typography className="text-justify">
            One of my proudest moments was leading the frontend team in a
            hackathon by the AfricaPlan Foundation, where our MERN stack project
            earned us the Award for Innovation. This experience taught me the
            value of effective communication and teamwork.
          </Typography>

          <Typography className="text-justify">
            Following my internship with a company in the US, I gained hands-on
            experience with dockerized apps and built real-world web
            applications while refining my optimization techniques..
          </Typography>
          <Typography className="text-justify">
            When I&apos;m not in full-on developer mode, I spend lots of time
            with my family and watch football. You can follow me on{" "}
            <Link
              noCustomization
              externalLink
              withUnderline
              href={EXTERNAL_LINKS.GITHUB}
            >
              Github
            </Link>{" "}
            where I share tech-related bites and build in public, or you can
            follow me on{" "}
            <Link
              noCustomization
              externalLink
              withUnderline
              href={EXTERNAL_LINKS.LINKEDIN}
            >
              LinkedIn
            </Link>
            .
          </Typography>
          <Typography>Finally, some quick bits about me.</Typography>
          <div className="flex flex-col gap-2 md:flex-row md:gap-6">
            <ul className="flex list-inside list-disc flex-col gap-2">
              <Typography component="li">
                B.Sc. in Computer Science
              </Typography>
            </ul>
            <ul className="flex list-inside list-disc flex-col gap-2">
              <Typography component="li">Avid learner</Typography>
            </ul>
          </div>
          <Typography className="text-justify">
            One last thing, I&apos;m available for freelance work, so feel free
            to reach out and say hello!
          </Typography>
        </div>
      </div>
    </Container>
  );
};

export default AboutMeSection;
