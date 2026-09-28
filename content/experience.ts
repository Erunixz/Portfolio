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
    id: "kite",
    kind: "Work",
    phase: "Before",
    title: "Software Engineer",
    org: "KITE Research Institute · University Health Network",
    location: "Toronto, ON",
    summary: "Worked on an obstructive sleep apnea (OSA) prediction project based on voice feature analysis, integrating machine learning models into a self-made full-stack web application.",
    points: [
      "Built a feature extraction engine that computes 25,000+ voice features across 8 extractors, alongside a complete voice cleaning pipeline.",
      "Developed backend APIs for data handling and integrated machine learning models into a full-stack web application built from scratch.",
      "Collaborated with senior researchers, scientists and University of Toronto professors to optimize performance, improve usability and deliver a reliable, user-friendly platform for clinical use.",
    ],
    tags: ["Python", "Machine learning", "Signal processing", "REST APIs", "Full-stack"],
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
