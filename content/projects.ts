export type DiagramNode = {
  id: string
  label: string
  sub?: string

  x: number
  y: number
  tone?: "default" | "accent" | "muted"
}

export type Diagram = {
  height: number
  caption: string

  nodes: DiagramNode[]
  edges: { from: string; to: string; label?: string }[]
}

/** `src` is the still image; when `video` is set, `src` doubles as the video's poster. */
export type ProjectImage = { src: string; alt: string; caption: string; width: number; height: number; video?: string }

export type Category = "product" | "research" | "oss"

export const categoryLabel: Record<Category, string> = {
  product: "Product",
  research: "Research",
  oss: "Open source",
}

export type Project = {
  slug: string
  title: string
  kind: string
  category: Category
  status?: "In progress"
  oneLiner: string
  role: string
  stack: string[]

  highlight: string
  links: { label: string; href: string }[]
  images?: ProjectImage[]
  problem: string
  built: string
  how: string[]
  decisions: { title: string; body: string }[]
  outcome: string[]
  diagram: Diagram
}

export const projects: Project[] = [
  {
    slug: "orbitour",
    title: "Orbitour",
    kind: "AI product",
    category: "product",
    oneLiner: "A trip planner where the 3D city is the interface: AI agents plan real days, and you fly through them stop by stop.",
    role: "Creator · full stack",
    stack: ["React", "TypeScript", "three.js", "Node.js", "OpenAI API", "MongoDB", "SSE"],
    highlight: "Grounded multi-agent planning over verified places, flown through on photorealistic 3D tiles.",
    links: [{ label: "GitHub", href: "https://github.com/Erunixz/Orbitour" }],

    images: [
      { src: "/projects/orbitour/trip.webp", width: 1600, height: 924, caption: "Fly from stop to stop over the real city", alt: "Orbitour trip view: a two-day Paris itinerary beside a photorealistic 3D view of the Louvre, with the route drawn over the city and a stop card for the museum" },
      { src: "/projects/orbitour/trip2.webp", width: 1600, height: 855, caption: "See the whole day's route from above", alt: "Orbitour day overview: the Eiffel Tower in 3D with the day's pins and route" },
      { src: "/projects/orbitour/home.webp", width: 1280, height: 640, caption: "Start on an interactive globe", alt: "Orbitour home page: 'Plan a trip, then fly through it in 3D' next to an interactive globe" },
      { src: "/projects/orbitour/examples.webp", width: 1120, height: 445, caption: "Or pick an example trip", alt: "Orbitour example trips to choose from" },
    ],
    problem:
      "AI trip planners invent places, ignore geography and hand you a flat list. Planning should be grounded in real, verified places, and you should be able to see the trip, not just read it.",
    built:
      "Name a city and say what you like. A crew of code tools and two AI agents builds a day-by-day plan on real streets. You then fly through it one stop at a time over Google's photorealistic 3D tiles, and change it by hand or by typing what you want.",
    how: [
      "A multi-agent pipeline: code tools discover, rank, verify and route places, while two AI agents (Scout and Critic) select and review the plan.",
      "Grounded AI: every pick must come from verified places built from OpenStreetMap, Wikipedia and Wikidata, so the agents can't invent locations.",
      "Live progress streams over Server-Sent Events, with pins appearing on the 3D map as places are verified.",
      "Cost-aware by design: responses cached in memory and MongoDB, trimmed API calls, and rendering that pauses in background tabs.",
    ],
    decisions: [
      {
        title: "Code decides, AI selects",
        body: "Routes, distances and timing are computed deterministically. Models only choose among verified options, and every output is validated with Zod.",
      },
      {
        title: "Tested like a product",
        body: "Vitest covers the pipeline, ranking, camera math, persistence and APIs, and CI runs type checks, builds and tests on every push.",
      },
    ],
    outcome: [
      "A working planner from prompt to 3D fly-through, open source on GitHub.",
      "Runs with no keys on a sample trip, and scales up to the full 3D experience with them.",
    ],
    diagram: {
      height: 470,
      caption: "Planning pipeline: code tools and two AI agents, run in sequence and streamed to the client.",
      nodes: [
        { id: "req", label: "Your request", sub: "city · interests", x: 120, y: 80, tone: "muted" },
        { id: "surveyor", label: "Surveyor", sub: "city & must-sees", x: 370, y: 80 },
        { id: "librarian", label: "Librarian", sub: "OSM · Wikipedia", x: 620, y: 80 },
        { id: "scout", label: "Scout", sub: "AI · picks places", x: 870, y: 80, tone: "accent" },
        { id: "verifier", label: "Verifier", sub: "verified only", x: 870, y: 235 },
        { id: "planner", label: "Planner", sub: "group into days", x: 620, y: 235 },
        { id: "router", label: "Router", sub: "order & legs", x: 370, y: 235 },
        { id: "food", label: "Food finder", sub: "meals & lodging", x: 120, y: 235 },
        { id: "time", label: "Timekeeper", sub: "visit times", x: 120, y: 390 },
        { id: "weather", label: "Forecaster", sub: "weather", x: 370, y: 390 },
        { id: "critic", label: "Critic", sub: "AI · review", x: 620, y: 390, tone: "accent" },
        { id: "out", label: "Trip in 3D", sub: "saved & opened", x: 870, y: 390, tone: "muted" },
      ],
      edges: [
        { from: "req", to: "surveyor" },
        { from: "surveyor", to: "librarian" },
        { from: "librarian", to: "scout" },
        { from: "scout", to: "verifier" },
        { from: "verifier", to: "planner" },
        { from: "planner", to: "router" },
        { from: "router", to: "food" },
        { from: "food", to: "time" },
        { from: "time", to: "weather" },
        { from: "weather", to: "critic" },
        { from: "critic", to: "out", label: "ok" },
      ],
    },
  },
  {
    slug: "thru-io",
    title: "thru.io",
    kind: "Hackathon · multilingual voice AI",
    category: "product",
    oneLiner: "A multilingual voice AI drive-through: a camera notices you pull up, an agent takes your order in your language, and the kitchen sees it live.",
    role: "Team of four · GDG McMaster Mac-a-Thon 2026",
    stack: ["React", "Node.js", "Express", "ElevenLabs", "Gemini", "TensorFlow.js", "Socket.IO"],
    highlight: "Built at GDG McMaster Mac-a-Thon 2026 to take language barriers out of drive-through ordering.",
    links: [
      { label: "Devpost", href: "https://devpost.com/software/thru-ai" },
      { label: "GitHub", href: "https://github.com/Erunixz/thru.io" },
    ],

    images: [
      { src: "/projects/thru-io/shot2.webp", width: 1600, height: 750, caption: "Voice ordering kiosk: the order builds live as the customer speaks", alt: "thru.io kiosk: the Burger Express menu beside a live order summary, with the voice assistant speaking" },
      { src: "/projects/thru-io/shot3.webp", width: 1600, height: 916, caption: "Kitchen display: orders move from New to Preparing, Ready and Completed", alt: "thru.io kitchen display: order cards in New, Preparing, Ready and Completed columns with timers" },
      { src: "/projects/thru-io/shot1.webp", width: 1600, height: 987, caption: "Welcome screen: the conversation starts when a customer is detected", alt: "thru.io welcome screen: 'Welcome to Burger Express, start your order with our AI assistant'" },
    ],
    problem:
      "Drive-through lines move fast, but language barriers slow everything down, and it's stressful for customers and staff alike. A misheard order costs time at the window and in the kitchen.",
    built:
      "A drive-through that speaks your language: multilingual voice ordering that knows the menu and reads your order back, a kiosk that updates as you talk, and a kitchen display that receives every order in real time.",
    how: [
      "ElevenLabs Conversational AI runs the multilingual voice pipeline, with Gemini handling the ordering logic.",
      "Strict menu grounding and structured JSON output keep orders accurate and stop the model from inventing items.",
      "TensorFlow.js person detection starts the conversation when a customer pulls up.",
      "React frontend and Node.js / Express backend, with Socket.IO pushing every order to the kitchen display in real time.",
    ],
    decisions: [
      {
        title: "Ground the model in the menu",
        body: "Keeping the voice agent and ordering logic aligned took the most iteration. Strict grounding made orders consistent and menu-accurate.",
      },
      {
        title: "Zero-touch start",
        body: "Person detection starts the conversation, so a customer never has to press anything to begin ordering.",
      },
    ],
    outcome: [
      "A working end-to-end drive-through built during the hackathon: detection, multilingual voice ordering, order confirmation and a live kitchen display.",
    ],
    diagram: {
      height: 360,
      caption: "Order path: detection → voice agent → order state → every connected display.",
      nodes: [
        { id: "cam", label: "Camera", sub: "COCO-SSD", x: 120, y: 90, tone: "muted" },
        { id: "mic", label: "Customer", sub: "speech", x: 120, y: 270, tone: "muted" },
        { id: "voice", label: "Voice agent", sub: "ElevenLabs", x: 370, y: 180, tone: "accent" },
        { id: "server", label: "Order server", sub: "Node · Express", x: 620, y: 180 },
        { id: "kiosk", label: "Kiosk", sub: "React · live totals", x: 870, y: 90 },
        { id: "kitchen", label: "Kitchen display", sub: "Kanban", x: 870, y: 270 },
      ],
      edges: [
        { from: "cam", to: "voice", label: "auto-start" },
        { from: "mic", to: "voice" },
        { from: "voice", to: "server", label: "order" },
        { from: "server", to: "kiosk", label: "Socket.IO" },
        { from: "server", to: "kitchen" },
      ],
    },
  },
  {
    slug: "agentguard",
    title: "AgentGuard",
    kind: "Open source · AI agent security",
    category: "oss",
    status: "In progress",
    oneLiner: "An open-source security gateway that checks every tool call an AI agent makes, then allows it, blocks it or holds it for a human to approve.",
    role: "AI/ML & Security · GDG McMaster",
    stack: ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL", "Docker", "pytest"],
    highlight: "I built the gateway's prompt-injection detector, with Unicode-normalized matching and evidence traced back to the original text.",
    links: [{ label: "GitHub", href: "https://github.com/DSC-McMaster-U/agent-guard" }],

    images: [
      {
        src: "/projects/agentguard/architecture.webp",
        width: 1800,
        height: 915,
        caption: "Target architecture on Google Cloud: gateway, policy and decision engines, security workers and human approval",
        alt: "AgentGuard architecture: an AI agent's tool calls pass through a gateway, policy engine, risk orchestrator and decision engine on GKE, with security workers, a human approval service, PostgreSQL audit logs and observability",
      },
    ],
    problem:
      "AI agents now send emails, query databases and call APIs on their own. A single instruction hidden in an email or web page can turn a helpful agent against its user, and most agent setups run tool calls with no checkpoint in between.",
    built:
      "AgentGuard sits between an agent and its tools. Each proposed tool call is checked against authorization policies, validated, and scanned for prompt injection and sensitive data, then allowed, blocked or held for human approval, with every decision audited. I'm on the AI/ML & Security team, where I own the prompt-injection detector.",
    how: [
      "A FastAPI gateway intercepts every tool call an agent makes and runs it through a policy engine: allow, block or send for human approval.",
      "My prompt-injection detector catches hidden instructions in untrusted content, like emails, and is hardened against disguised characters and formatting tricks.",
      "A React dashboard lets reviewers see agent activity and approve or deny held actions.",
      "An open security benchmark and 150+ backend tests run in CI on every change.",
    ],
    decisions: [
      {
        title: "Detectors inform, policy decides",
        body: "Security checks feed findings to the decision engine instead of acting alone, so no single heuristic can override a policy.",
      },
      {
        title: "Human in the loop",
        body: "High-risk actions pause for a person to approve, so agents stay useful without being given unchecked power.",
      },
    ],
    outcome: [
      "Prompt-injection detector merged into the backend and passing all regression scenarios.",
      "Policy engine, request validation and approval dashboard working, backed by 150+ backend tests in CI.",
    ],
    diagram: {
      height: 470,
      caption: "Decision path: every tool call is checked before it runs, and held actions wait for a human.",
      nodes: [
        { id: "agent", label: "AI agent", sub: "proposed tool call", x: 120, y: 80, tone: "muted" },
        { id: "gateway", label: "Gateway", sub: "FastAPI · validation", x: 370, y: 80 },
        { id: "policy", label: "Policy engine", sub: "deterministic rules", x: 620, y: 80 },
        { id: "checks", label: "Security checks", sub: "prompt injection", x: 870, y: 80, tone: "accent" },
        { id: "audit", label: "Audit log", sub: "PostgreSQL", x: 370, y: 235, tone: "muted" },
        { id: "approval", label: "Human approval", sub: "React dashboard", x: 620, y: 235 },
        { id: "decision", label: "Decision", sub: "allow · block · hold", x: 870, y: 235 },
        { id: "tool", label: "Tool runs", sub: "simulated email", x: 870, y: 390 },
      ],
      edges: [
        { from: "agent", to: "gateway", label: "tool call" },
        { from: "gateway", to: "policy" },
        { from: "policy", to: "checks" },
        { from: "checks", to: "decision", label: "findings" },
        { from: "gateway", to: "audit", label: "log" },
        { from: "decision", to: "approval", label: "hold" },
        { from: "decision", to: "tool", label: "allow" },
        { from: "approval", to: "tool", label: "approve" },
      ],
    },
  },
  {
    slug: "sweepmate",
    title: "SweepMate",
    kind: "Offline-first mobile web app",
    category: "product",
    status: "In progress",
    oneLiner: "A mobile app for overnight residence rounds: guided walkthroughs, room counts and incident notes, turned into a report ready to file.",
    role: "Creator · design & full stack",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Vitest", "PWA"],
    highlight: "Under review by McMaster as an official tool for residence Community Advisors.",
    links: [
      { label: "GitHub", href: "https://github.com/Erunixz/SweepMate" },
    ],

    images: [
      {
        src: "/projects/sweepmate/demo-poster.webp",
        width: 1600,
        height: 1000,
        caption: "From the first room to the final report, all on a phone",
        alt: "SweepMate on a phone: choosing the shift type, a room count during a sweep, and the coverage report with per-sweep copy buttons",
      },
      { src: "/projects/sweepmate/setup.webp", width: 1600, height: 1000, caption: "Set up the night: shift type, who's on coverage, and the sweep schedule", alt: "SweepMate setup screens: choosing the shift, adding CAs on coverage, and setting sweep times" },
      { src: "/projects/sweepmate/walk.webp", width: 1600, height: 1000, caption: "Walk the route one room at a time, with quick counts and observations", alt: "SweepMate walkthrough: the shift overview, a room count, and an observation being typed" },
      { src: "/projects/sweepmate/report.webp", width: 1600, height: 1000, caption: "Log notes as they happen, then copy the whole report or a single sweep", alt: "SweepMate notes and report: a maintenance note form, the report preview, and per-sweep copy buttons" },
    ],
    problem:
      "Community Advisors walk residence buildings several times a night, counting people in shared spaces and noting issues. Counts end up scribbled wherever is quickest, then retyped into the residence reporting system at the end of a long shift, when details are easiest to lose.",
    built:
      "A phone-first app built around real residence routes. It shows the next room while you walk, captures counts and notes the moment you see them, and turns the night into a consistent, ready-to-file report you can copy in one tap, for the whole shift or a single sweep. It works offline and needs no account.",
    how: [
      "Offline-first PWA that installs to the home screen, autosaves every entry on the device and works with no signal.",
      "A configurable route engine generates each building's walkthrough and keeps reports consistent when the schedule changes mid-shift.",
      "Two workflows share one data model: full-night coverage for the lead and quick single-building sweeps for support staff.",
      "68 automated tests (Vitest and React Testing Library) run in CI on every push.",
    ],
    decisions: [
      {
        title: "Built for a problem I had",
        body: "I designed it around my own overnight shifts as a Community Advisor, replacing scattered notes and end-of-night retyping with one guided workflow.",
      },
      {
        title: "Private by design",
        body: "No server, database or account. Everything stays on the device, which keeps it fast, private and reliable.",
      },
    ],
    outcome: [
      "Live and in use on overnight shifts. The public link is withheld for privacy.",
      "In the process of becoming an official McMaster tool for residence Community Advisors.",
    ],
    diagram: {
      height: 360,
      caption: "From the round to the report: entries save on the phone as they're made, then become a ready-to-file report.",
      nodes: [
        { id: "setup", label: "Shift setup", sub: "lead or quick sweep", x: 120, y: 90, tone: "muted" },
        { id: "route", label: "Route builder", sub: "building config", x: 370, y: 90 },
        { id: "walk", label: "Walkthrough", sub: "count · skip · note", x: 620, y: 90, tone: "accent" },
        { id: "store", label: "On-device save", sub: "autosave · offline", x: 870, y: 90 },
        { id: "report", label: "Report builder", sub: "standard format", x: 620, y: 270 },
        { id: "filed", label: "Filed report", sub: "copy · share · TXT", x: 870, y: 270, tone: "muted" },
      ],
      edges: [
        { from: "setup", to: "route" },
        { from: "route", to: "walk" },
        { from: "walk", to: "store", label: "autosave" },
        { from: "walk", to: "report", label: "records" },
        { from: "report", to: "filed", label: "copy" },
      ],
    },
  },
]

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)
