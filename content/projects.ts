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

export type ProjectImage = { src: string; alt: string; caption: string; width: number; height: number }

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
      "A multi-stage pipeline: deterministic tools discover, rank, verify, route and time the trip; two AI agents (Scout and Critic) select and review.",
      "Agents can't invent places: every pick must come from a verified candidate set built from OpenStreetMap, Wikipedia and Wikidata.",
      "Preferences like budget, accessibility and diet are enforced in code, and the Critic rejects and replaces invalid stops.",
      "Progress streams to the client over Server-Sent Events, with pins appearing as places are verified.",
      "Cinematic stop-to-stop camera flights with isolated, deterministic, unit-tested camera math.",
      "Cost-aware: responses cached in memory and MongoDB, field masks on routing calls, and rendering pauses in background tabs.",
    ],
    decisions: [
      {
        title: "Code decides, AI selects",
        body: "Routes, distances and timing are computed deterministically. Models only choose among verified options, and every output is validated with Zod.",
      },
      {
        title: "Degrade, don't fail",
        body: "Routing falls back to clearly labelled estimates and place discovery can switch sources, so the pipeline keeps going when an upstream service doesn't.",
      },
      {
        title: "Tested like a product",
        body: "Vitest covers the pipeline, ranking rules, camera math, editing, persistence and APIs, and CI runs type checks, builds and tests on every push.",
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
      "ElevenLabs Conversational AI Agent runs the voice pipeline, with Gemini handling the ordering logic.",
      "Strict menu grounding and structured JSON output keep orders accurate and stop the model from inventing items.",
      "TensorFlow.js person detection starts the conversation when a customer pulls up, with a manual fallback.",
      "React + Vite + Tailwind frontend and a Node.js / Express backend, with Socket.IO broadcasting orders to every kitchen display.",
    ],
    decisions: [
      {
        title: "Ground the model in the menu",
        body: "Keeping the voice agent and the ordering logic aligned took the most iteration; strict grounding made the JSON orders consistent and menu-accurate.",
      },
      {
        title: "Zero-touch start",
        body: "Person detection starts the conversation, so a customer never has to press anything to begin ordering.",
      },
      {
        title: "Pivot when it's right",
        body: "The team started in Python and Flutter and moved to Node.js and React mid-hackathon to wire vision, voice and real-time updates together.",
      },
    ],
    outcome: [
      "A working end-to-end workflow: detection, multilingual voice ordering, order confirmation and a live kitchen display.",
      "Next steps the team scoped: a Raspberry Pi kiosk, payments and pilot testing at real locations.",
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
]

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)
