// AI Masterclass Day – Level 2 : all text for the scrolling deck lives here.
// Source: AI_Masterclass_Day_Level2.pptx (11 slides + speaker notes).
//
// Images: drop files into /public/media/masterclass with the names used below; until then a
// labelled placeholder shows. See IMAGE_PROMPTS.md.
// Videos: set `youtubeId` (+ optional `start`/`end` in seconds) on any `video` block.

export type Video = {
  title: string;
  youtubeId: string | null; // e.g. "dQw4w9WgXcQ" — null shows a placeholder
  start?: number; // seconds
  end?: number; // seconds
};

export const M = "/media/masterclass";

export const deck = {
  meta: {
    brand: "SkilliZee",
    product: "AI Masterclass",
    footer: "SkilliZee Ideathon Level 2",
  },

  // Sections in scroll order. `id` is the URL hash and nav target.
  nav: [
    { id: "start", label: "Start" },
    { id: "agenda", label: "Agenda" },
    { id: "think", label: "Think" },
    { id: "problem-card", label: "Problem Card" },
    { id: "build-3d", label: "Build · 3D" },
    { id: "build-circuit", label: "Build · Circuit" },
    { id: "brand", label: "Brand" },
    { id: "money", label: "Money Maths" },
    { id: "pitch", label: "Pitch" },
    { id: "responsible-ai", label: "Responsible AI" },
    { id: "exit", label: "Exit Ticket" },
  ],

  topLinks: [
    { id: "think", label: "Think" },
    { id: "build-3d", label: "Build" },
    { id: "brand", label: "Brand" },
    { id: "money", label: "Pitch" },
  ],

  hero: {
    eyebrow: "SkilliZee Ideathon  ·  Level 2  ·  2-hour masterclass",
    title: ["AI", "Masterclass"],
    words: ["Think.", "Build.", "Brand.", "Pitch."],
    tagline: "Use AI as a team member, not as the team",
    cta: "Start the day",
    notes:
      "Welcome teams. Say: today you leave with a real product pack, not just notes. Form teams and have each choose one problem to work on all day.",
  },

  agenda: {
    eyebrow: "Agenda",
    title: "Your day in five blocks",
    lead: "Every block ends in something you can show.",
    // Minutes come from each block's own slide (Think 20 + 10, Build 20 + 25, Brand 20).
    // Hook, Pitch and Wrap are set so the day adds up to 120 minutes — edit freely.
    blocks: [
      { key: "hook", label: "Hook", minutes: 5, output: "Teams formed, one problem picked", target: "start" },
      { key: "think", label: "Think", minutes: 30, output: "Problem Card", target: "think" },
      { key: "build", label: "Build", minutes: 45, output: "3D model, circuit, parts list", target: "build-3d" },
      { key: "brand", label: "Brand", minutes: 20, output: "Brand Kit", target: "brand" },
      { key: "pitch", label: "Pitch", minutes: 15, output: "6-slide outline + 60-sec pitch", target: "money" },
      { key: "wrap", label: "Wrap", minutes: 5, output: "Exit ticket", target: "exit" },
    ],
    notes: "Point to the outputs: every block ends in something students can show. Keep time strictly.",
  },

  think: {
    eyebrow: "Block 1  ·  20 minutes",
    title: "Think: problem before product",
    concepts: [
      { title: "5 Whys", desc: "Dig to the root cause." },
      { title: "Persona", desc: "One real user, one place." },
      { title: "Validate", desc: "Talk to 3 real people." },
      { title: "Size it", desc: "All people → reachable → year-one buyers." },
    ],
    promptLabel: "Prompt to try",
    prompt:
      "Ask me 5 Whys questions one at a time about: [problem]. Wait for each answer, then summarise the root cause in one sentence.",
    toolsLabel: "Tools (free tiers)",
    tools: ["Claude", "ChatGPT", "Gemini", "NotebookLM", "Perplexity"],
    image: { src: `${M}/think_interview.webp`, label: "Students interviewing a real user" },
    notes:
      "Teach the 5 Whys live with the demo problem. Reject any Who box that says everyone or society.",
  },

  problemCard: {
    eyebrow: "Block 1  ·  10 minutes",
    title: "Activity: fill the Problem Card",
    lead: "Be specific. A measurable success number is a must.",
    fields: [
      { q: "Who has the problem?", hint: "Name, age, place", placeholder: "Riya, 13, Class 8, Jaipur" },
      { q: "What is the problem?", hint: "One sentence", placeholder: "She forgets to drink water at school" },
      { q: "Why does it happen?", hint: "Root cause from 5 Whys", placeholder: "No reminder during back-to-back classes" },
      { q: "How do we know?", hint: "3 real people we will ask", placeholder: "Riya, her class teacher, the school nurse" },
      { q: "Success looks like", hint: "A number, e.g. cut waste by 30%", placeholder: "Daily water intake up by 25%" },
    ],
    notes: "Circulate and push teams to be specific. A measurable success number is mandatory.",
  },

  build3d: {
    eyebrow: "Block 2A  ·  20 minutes  ·  Make it visible",
    title: "Build: AI 3D in 20 minutes",
    tools: [
      { name: "Meshy", desc: "Text or image to 3D (100 free credits a month)", url: "meshy.ai" },
      { name: "Tripo", desc: "Free credits; check commercial terms", url: "tripo3d.ai" },
      { name: "Hunyuan3D & TRELLIS", desc: "Open-source 3D models", url: "github.com" },
      { name: "Tinkercad", desc: "Resize and tidy the model", url: "tinkercad.com" },
    ],
    workflow: [
      "Describe the product: shape, size, colour",
      "Make a plain-background reference image",
      "Upload and generate",
      "Check for holes and thin parts",
      "Screenshot 3 angles",
    ],
    credit: "3D model generated with Meshy (CC BY 4.0)",
    tip: "Image-to-3D is more reliable than text-only. Always call it a concept render.",
    angles: [
      { src: `${M}/build3d_front.webp`, label: "Front" },
      { src: `${M}/build3d_side.webp`, label: "Side" },
      { src: `${M}/build3d_top.webp`, label: "Top" },
    ],
    video: { title: "Image-to-3D walkthrough", youtubeId: null } as Video,
    notes:
      "Image-to-3D is more reliable than text-only. Remind teams free-plan Meshy outputs need the CC BY credit line. Always say concept render.",
  },

  circuit: {
    eyebrow: "Block 2B  ·  25 minutes",
    title: "Build: prove it works with a circuit",
    tools: [
      { name: "Wokwi", desc: "Arduino / ESP32 simulator in the browser", url: "wokwi.com" },
      { name: "Tinkercad Circuits", desc: "Drag-and-drop; best for Grades 6–7", url: "tinkercad.com" },
      { name: "Falstad", desc: "See current and voltage", url: "falstad.com" },
      { name: "Flux (AI PCB Copilot)", desc: "14-day trial, then public projects only", url: "flux.ai" },
      { name: "EasyEDA / KiCad", desc: "Real board layout", url: "easyeda.com" },
    ],
    diagram: [
      { key: "sensor", label: "Sensor", eg: "senses the world" },
      { key: "brain", label: "Brain", eg: "Arduino / ESP32" },
      { key: "output", label: "Output", eg: "LED, buzzer, screen" },
    ],
    power: "Power",
    workflow: [
      "Block diagram: sensor, brain, output, power",
      "Ask AI for parts, wiring table and INR prices",
      "Ask AI for commented starter code",
      "Simulate; paste errors back and ask why",
      "Verify voltage and pins in the datasheet",
      "Total the parts list",
    ],
    safety: [
      "Teacher checks every circuit before real power",
      "No mains voltage",
      "AI forgets resistors and mixes 3.3 V with 5 V: check the datasheet",
    ],
    image: { src: `${M}/circuit_sim.webp`, label: "Wokwi / Tinkercad simulation screenshot" },
    video: { title: "Wokwi simulator walkthrough", youtubeId: null } as Video,
    notes:
      "Teacher checks every circuit before real power. No mains voltage. AI forgets resistors and mixes 3.3 V with 5 V, so verify against a datasheet.",
  },

  brand: {
    eyebrow: "Block 3  ·  20 minutes",
    title: "Brand: be remembered",
    sayLabel: "Say it clearly",
    // Text in [brackets] renders as a fill-in blank.
    positioning:
      "For [user] who [problem], [name] is a [category] that [benefit]. Unlike [alternative], we [difference].",
    rules: [
      "Short, easy-to-spell name",
      "Check its meaning in Hindi and English",
      "One logo, two colours, one font",
    ],
    aida: [
      { k: "A", w: "Attention" },
      { k: "I", w: "Interest" },
      { k: "D", w: "Desire" },
      { k: "A", w: "Action" },
    ],
    kit: [
      { item: "Name + tagline", tool: "" },
      { item: "Logo", tool: "Canva or Adobe Express" },
      { item: "Palette", tool: "Coolors" },
      { item: "Positioning statement", tool: "on one slide" },
    ],
    image: { src: `${M}/brand_kit.webp`, label: "Example Brand Kit board" },
    notes:
      "Teams swap Brand Kits and give one compliment and one improvement. Rebuild any AI-made logo text in Canva, since AI misspells it.",
  },

  money: {
    eyebrow: "Block 4  ·  Business principles",
    title: "Pitch: the money maths",
    margin: { formula: "Margin = (price − cost) ÷ price", cost: 450, price: 750 },
    breakEven: { formula: "Break-even = fixed cost ÷ profit per unit", fixed: 30000, profit: 300 },
    readyLabel: "Also be ready to answer",
    questions: [
      "Who pays? (The user is not always the customer.)",
      "Who are your first 20 customers?",
      "What is one measurable impact number (link it to an SDG)?",
      "What are your top 2 risks, and your answer to each?",
    ],
    notes:
      "Work the two examples on the board, then let teams do their own numbers. Distinguish user from customer.",
  },

  pitch: {
    eyebrow: "Block 4  ·  Structure",
    title: "Pitch: 3 minutes, 6 slides",
    slides: [
      { n: 1, title: "Hook + problem", sec: 30 },
      { n: 2, title: "Solution + demo", sec: 45 },
      { n: 3, title: "How it works + cost", sec: 30 },
      { n: 4, title: "Brand + market", sec: 30 },
      { n: 5, title: "Business + impact", sec: 30 },
      { n: 6, title: "Ask + next 30 days", sec: 15 },
    ],
    sixtyLabel: "The 60-second pitch",
    sixty: ["Problem", "Who", "Solution", "Proof", "Impact", "Ask"],
    image: { src: `${M}/pitch_stage.webp`, label: "Team pitching to judges" },
    notes: "Use the AI mock-judge prompt for rehearsal.",
  },

  responsible: {
    eyebrow: "Responsible AI",
    title: "Five rules every team follows",
    rules: [
      { k: "Verify", d: "Check every fact, number and circuit with a second source or a test." },
      { k: "Disclose", d: "Name the tools you used and what you changed. Credit Meshy." },
      { k: "Own it", d: "Explain every slide without the screen." },
      { k: "Protect privacy", d: "No names, phone numbers or classmate photos in AI tools." },
      { k: "Respect copyright", d: "No copied brands, logos or characters." },
    ],
    notes: "Ask each team to say rule 3 out loud. Judges will ask what the team did without AI.",
  },

  exit: {
    eyebrow: "Exit ticket",
    title: "Wrap-up: Team Product Pack",
    handInLabel: "Hand in",
    handIn: [
      "Problem Card",
      "3D model screenshots",
      "Wokwi / Tinkercad link + parts list",
      "Brand Kit",
      "6-slide outline + 60-sec pitch",
    ],
    ticketLabel: "Exit ticket (one line each)",
    ticket: ["What did AI get wrong today?", "What did we fix ourselves?", "What is our next 30-day step?"],
    closing: "Use AI as a team member, not as the team.",
    image: { src: `${M}/wrap_team.webp`, label: "Team with their finished product pack" },
    notes:
      "Collect the pack links and the exit ticket answers. Re-check free-tier limits before the next session.",
  },
};
