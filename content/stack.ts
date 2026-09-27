export type Tech = { name: string; icon?: string; color?: string }

export const stack: { title: string; description: string; items: Tech[] }[] = [
  {
    title: "Languages",
    description: "What I write every day, and what I reach for when it matters.",
    items: [
      { name: "Python", icon: "python", color: "#3776AB" },
      { name: "TypeScript", icon: "typescript", color: "#3178C6" },
      { name: "C++", icon: "cplusplus", color: "#00599C" },
      { name: "C", icon: "c", color: "#A8B9CC" },
      { name: "Java", icon: "openjdk" },
      { name: "SQL" },
    ],
  },
  {
    title: "ML, AI & audio",
    description: "Research models, speech and vision.",
    items: [
      { name: "PyTorch", icon: "pytorch", color: "#EE4C2C" },
      { name: "scikit-learn", icon: "scikitlearn", color: "#F7931E" },
      { name: "SpeechBrain" },
      { name: "librosa" },
      { name: "OpenCV", icon: "opencv", color: "#5C3EE8" },
      { name: "TensorFlow.js", icon: "tensorflow", color: "#FF6F00" },
    ],
  },
  {
    title: "Web & backend",
    description: "APIs, real-time apps and 3D interfaces.",
    items: [
      { name: "React", icon: "react", color: "#149ECA" },
      { name: "Node.js", icon: "nodedotjs", color: "#5FA04E" },
      { name: "Express", icon: "express" },
      { name: "Flask", icon: "flask" },
      { name: "MongoDB", icon: "mongodb", color: "#47A248" },
      { name: "three.js", icon: "threedotjs" },
    ],
  },
  {
    title: "Data & tools",
    description: "Analysis, cloud and shipping.",
    items: [
      { name: "NumPy", icon: "numpy", color: "#4D77CF" },
      { name: "Pandas", icon: "pandas", color: "#150458" },
      { name: "AWS", icon: "amazonwebservices", color: "#FF9900" },
      { name: "Git", icon: "git", color: "#F05032" },
      { name: "Linux", icon: "linux" },
      { name: "pytest", icon: "pytest", color: "#0A9EDC" },
    ],
  },
]
