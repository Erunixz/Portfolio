export const site = {
  name: "Erfan",
  firstName: "Erfan",
  headline: "ML research & software engineering",
  description:
    "Erfan Zamani, Computer Science student at McMaster. ML Research Assistant working across machine learning and software engineering, and former software engineer on an AI sleep apnea screening platform at KITE Research Institute (UHN).",
  intro:
    "Currently building machine learning systems and software as an ML Research Assistant at McMaster, where I study Computer Science. Previously a software engineer at KITE Research Institute (UHN), working on an AI platform for sleep apnea screening.",

  roles: ["ML Research Assistant", "Software Engineer"],

  url: "https://www.erfanzamani.com",

  email: "zamane1@mcmaster.ca",
  github: "https://github.com/Erunixz",
  githubHandle: "Erunixz",
  linkedin: "https://www.linkedin.com/in/erfan-zamani1/",
  school: "McMaster University",
  program: "B.Sc. Computer Science",
  gpa: "4.0/4.0",
  location: "Toronto, ON",
  availability: "Contact me for ML & software engineering co-op roles",

  portrait: "/images/erfan.webp" as string | null,
  avatar: "/images/erfan.webp",
} as const

export const tabs = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/awards", label: "Awards" },
  { href: "/contact", label: "Contact" },
] as const
