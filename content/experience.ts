export type ExperienceKind = "Work" | "Community" | "Other"

export type Experience = {
  id: string
  kind: ExperienceKind
  phase: string
  period?: string
  title: string
  org: string
  location?: string
  summary: string
  points: string[]
  tags: string[]
  href?: string
}

export const experience: Experience[] = [
  {
    id: "mcmaster-ra",
    kind: "Work",
    phase: "Now",
    title: "Machine Learning Research Assistant",
    org: "McMaster University",
    location: "Hamilton, ON",
    summary: "Building and evaluating machine learning models and the software around them.",
    points: [
      "Research on compact, multi-prior Retinex architectures for low-light image enhancement.",
      "Built a modular training and evaluation pipeline for controlled ablations.",
      "Exploring structure-guided priors that keep detail without heavy branches.",
    ],
    tags: ["PyTorch", "Computer vision", "Python"],
  },
  {
    id: "kite",
    kind: "Work",
    phase: "Before",
    title: "Software Engineer",
    org: "KITE Research Institute · University Health Network",
    location: "Toronto, ON",
    summary: "Contributed to an AI platform for obstructive sleep apnea (OSA) screening alongside senior researchers and University of Toronto faculty.",
    points: [
      "Built an audio and video recording system that supported hundreds of patient sessions.",
      "Captured audio with PyAudio and video with OpenCV on a shared session clock.",
      "Organized session data and handed it off to the research team through AWS.",
    ],
    tags: ["Python", "PyAudio", "OpenCV", "AWS"],
  },
  {
    id: "kite-student",
    kind: "Work",
    phase: "Before",
    title: "Research Student",
    org: "KITE Research Institute · University Health Network",
    location: "Toronto, ON",
    summary: "Developed a graphical user interface and a responsive web application for clinical research.",
    points: [
      "Built a graphical user interface and a responsive web application at the KITE Research Institute.",
      "Worked with senior researchers and scientists to integrate their feedback into the product.",
      "Improved usability for patients, enhancing patient-researcher interactions.",
    ],
    tags: ["Python", "Flask", "OpenCV", "PyAudio"],
  },
  {
    id: "gdg",
    kind: "Community",
    phase: "Ongoing",
    title: "Open Source Team Member",
    org: "Google Developer Groups (GDG)",
    summary: "Contributing to GDG open-source work, including AgentGuard, a guard layer for autonomous AI agents.",
    points: ["Collaborating through issues, pull requests and code review.", "Working on evaluating and guarding agent tool calls."],
    tags: ["Open source", "LLM agents", "Python"],
  },
  {
    id: "advising",
    kind: "Other",
    phase: "Fun fact",
    title: "Tutor & Community Advisor",
    org: "Outside of code",
    summary: "When I'm not coding, I tutor math and computer science and advise in my community.",
    points: ["Helping students build intuition rather than memorize steps."],
    tags: ["Teaching", "Math", "Mentoring"],
  },
]
