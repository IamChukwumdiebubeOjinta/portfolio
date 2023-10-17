import { Github, Twitter, Mail, Linkedin } from "lucide-react";

import LogoJavascript from "/public/images/logos/icon-javascript.svg";
import LogoTypescript from "/public/images/logos/icon-typescript.svg";
import LogoReact from "/public/images/logos/icon-react.svg";
import LogoNextjs from "/public/images/logos/icon-nextjs.svg";
import LogoNodejs from "/public/images/logos/icon-nodejs.svg";
import LogoExpress from "/public/images/logos/icon-express.svg";
import LogoExpressLight from "/public/images/logos/icon-express-light.svg";
import LogoDocker from "/public/images/logos/icons-docker.svg";
import LogoMongoDB from "/public/images/logos/icon-mongodb.svg";
import LogoSass from "/public/images/logos/icon-sass.svg";
import LogoTailwindcss from "/public/images/logos/icon-tailwindcss.svg";
import LogoFigma from "/public/images/logos/icon-figma.svg";
import LogoGit from "/public/images/logos/icon-git.svg";

import LogoAfricaPlan from "@/public/images/africa-plan.jpeg";
import LogoChiefSoft from "@/public/images/chiefsoft-lg.png";
import LogoGenesys from "@/public/images/genesys.jpg";

import MyFit from "/public/images/myfit.png";
import WrenchBoard from "/public/images/wrenchboard.png";
import MetaSite from "/public/images/metasite.png";

import AvatarKrisztian from "/public/images/avatar-krisztian.png";
import AvatarEugen from "/public/images/avatar-eugen.png";
import AvatarDummy from "/public/images/avatar-dummy.svg";

import {
  ExperienceDetails,
  ProjectDetails,
  TechDetails,
  TestimonialDetails,
} from "@/lib/types";

export const EXTERNAL_LINKS = {
  GITHUB: "https://github.com/IamChukwumdiebubeOjinta",
  GITHUB_REPO: "https://github.com/IamChukwumdiebubeOjinta?tab=repositories",
  TWITTER: "https://twitter.com/shahsagarm",
  FIGMA: "https://www.figma.com/@I_amEbube",
  FIGMA_FILE:
    "https://www.figma.com/community/file/1262992249991763120/Personal-Portfolio-Website-Template-%7C-Mobile-%26-Desktop",
  LINKEDIN: "https://www.linkedin.com/in/chukwumdiebube-ojinta-3142b1228/",
};

export const NAV_LINKS = [
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Work",
    href: "#work",
  },
  {
    label: "Testimonials",
    href: "#testimonials",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];

export const SOCIAL_LINKS = [
  {
    icon: Github,
    url: "https://github.com/IamChukwumdiebubeOjinta",
  },
  {
    icon: Linkedin,
    url: "https://www.linkedin.com/in/chukwumdiebube-ojinta-3142b1228/",
  },
  {
    icon: Twitter,
    url: "https://twitter.com/shahsagarm",
  },
];

export const TECHNOLOGIES: TechDetails[] = [
  {
    label: "Javascript",
    logo: LogoJavascript,
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    label: "Typescript",
    logo: LogoTypescript,
    url: "https://www.typescriptlang.org/",
  },
  {
    label: "React",
    logo: LogoReact,
    url: "https://react.dev/",
  },
  {
    label: "Next.js",
    logo: LogoNextjs,
    url: "https://nextjs.org/",
  },
  {
    label: "Node.js",
    logo: LogoNodejs,
    url: "https://nodejs.org/en",
  },
  {
    label: "Docker",
    logo: LogoDocker,
    url: "https://www.docker.com/",
  },
  {
    label: "Express.js",
    logo: LogoExpress,
    darkModeLogo: LogoExpressLight,
    url: "https://expressjs.com/",
  },
  {
    label: "MongoDB",
    logo: LogoMongoDB,
    url: "https://www.mongodb.com/",
  },
  {
    label: "Sass/Scss",
    logo: LogoSass,
    url: "https://sass-lang.com/",
  },
  {
    label: "Tailwindcss",
    logo: LogoTailwindcss,
    url: "https://tailwindcss.com/",
  },
  {
    label: "Figma",
    logo: LogoFigma,
    url: "https://www.figma.com/",
  },
  {
    label: "Git",
    logo: LogoGit,
    url: "https://git-scm.com/",
  },
];

export const EXPERIENCES: ExperienceDetails[] = [
  {
    logo: LogoChiefSoft,
    logoAlt: "ChiefSoft logo",
    position: "Front-End Developer",
    startDate: new Date(2022, 10),
    currentlyWorkHere: true,
    summary: [
      "I am actively involved in various project development",
      "I am applying logic to code and optimizing web applications for better performance.",
      "I honed my docker skills with Dockerized apps.",
      "Worked with a variety of technologies, including React, Next.js, Typescript, TailwindCss, Docker and others.",
    ],
  },
  {
    logo: LogoAfricaPlan,
    logoAlt: "Africa-Plan logo",
    position: "Full-Stack Developer Intern",
    startDate: new Date(2022, 7),
    endDate: new Date(2022, 11),
    summary: [
      "Worked as a full stack developer (React / Node & Express).",
      "I improved my soft skills for effective teamwork and collaboration.",
      "Acted as team lead in different projects.",
      "Brainstormed new ideas & gathered requirements for internal projects.",
      "Designed architecture of different projects (frontend + backend).",
      "Handled sprint planning & task distribution.",
    ],
  },
  {
    logo: LogoGenesys,
    logoAlt: "Genesys logo",
    position: "Front-End Developer",
    startDate: new Date(2022, 4),
    endDate: new Date(2022, 6),
    summary: [
      "I honed my soft skills for effective teamwork and collaboration.",
      "I was actively involved in project development, allowing me to gain practical experience and further refine my skills.",
    ],
  },
];

export const PROJECTS: ProjectDetails[] = [
  {
    name: "Wrenchboard",
    description:
      "This is a platform for setting and tracking family goals and rewarding achievements. Users can discover tasks to complete and earn rewards or create a portfolio of tasks for others to fulfill.",
    url: "https://www.wrenchboard.com",
    previewImage: WrenchBoard,
    technologies: [
      "React",
      "Docker",
      "Tailwind Css",
      "Redux Toolkit",
    ],
  },
  {
    name: "MYFIT",
    description:
      "It serves as a personal healthcare concierge, designed to facilitate the management of daily and long-term health activities. With this application, users maintain complete ownership of their health records, granting them the flexibility to control provider access as needed.",
    url: "https://www.myfit.ai",
    previewImage: MyFit,
    technologies: [
      "React",
      "Styled Components",
      "Tailwindcss",
      "Redux Toolkit",
      "Auth.Js",
    ],
  },
  {
    name: "Pepehousing",
    description:
      "",
    url: "https://metasite-clone.netlify.app",
    previewImage: MetaSite,
    technologies: [
      "React",
      "Next.js",
      "Typescript",
      "Tailwindcss",
      "Redux Toolkit",
      "Framer Motion",
    ],
  },
];

export const TESTIMONIALS: TestimonialDetails[] = [
  {
    personName: "Krisztian Gyuris",
    personAvatar: AvatarKrisztian,
    title: "Founder - inboxgenie.io",
    testimonial:
      "Job well done! I am really impressed. He is very very good at what he does:) I would recommend Sagar and will rehire in the future for Frontend development.",
  },
  {
    personName: "Eugen Esanu",
    personAvatar: AvatarEugen,
    title: "Founder - shosho.design",
    testimonial:
      "Great guy, highly recommended for any COMPLEX front-end development job! His skills are top-notch and he will be an amazing addition to any team.",
  },
  {
    personName: "Joe Matkin",
    personAvatar: AvatarDummy,
    title: "Freelancer",
    testimonial:
      "Sagar was extremely easy and pleasant to work with and he truly cares about the project being a success. Sagar has a high level of knowledge and was able to work on my MERN stack application without any issues.",
  },
];
