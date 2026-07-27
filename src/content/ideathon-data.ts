export const ideathonData = {
  global: {
    eventName: "SkilliZee Ideathon 2026",
    primaryColor: "#1E63D0", // SkilliZee Blue
    secondaryColor: "#e2e8f0", // Light gray/blue
    accentBronze: "#3b82f6", // Lighter blue accent
    lightBackground: "#f8fafc"
  },
  scene1: {
    title: "SkilliZee Ideathon 2026",
    heading: "Think. Create. Innovate. Impact.",
    mentorScript: "Every innovation you see around you started with one simple idea.\nThis year, SkilliZee Ideathon is not just a classroom competition...\nIt is your chance to solve real problems, build real solutions, pitch like entrepreneurs, and compete all the way to an Interschool Grand Finale.\nOver the next few weeks, you'll experience what real innovators and startup founders do every day."
  },
  scene2: {
    title: "Your Journey Begins Here",
    levels: [
      { level: "Level 1", name: "In-Class Competition" },
      { level: "Level 2", name: "Inter-Class Competition" },
      { level: "Level 3", name: "Interschool Grand Finale @ CCWS" }
    ],
    mentorScript: "Every successful startup begins with one small step.\nToday you begin in your classroom.\nTomorrow you could be pitching in front of founders, industry experts, and students from other schools."
  },
  scene3: {
    title: "The Challenge",
    subtitle: "ONE REAL-WORLD PROBLEM",
    mission: [
      "Understand it",
      "Research it",
      "Find the root cause",
      "Build the best possible solution"
    ],
    remember: "The problem is common...\nBut the solution should be uniquely yours.",
    mentorScript: "Hundreds of teams will solve the same problem.\nThe winners won't be those who copy ideas.\nThe winners will be those who think differently."
  },
  scene4: {
    title: "Build Like Innovators",
    teamInfo: "Work in Teams: 4-5 Students",
    steps: [
      { step: "Step 1", name: "Understand the Problem" },
      { step: "Step 2", name: "Brainstorm Ideas" },
      { step: "Step 3", name: "Choose the Best Solution" },
      { step: "Step 4", name: "Create Your Prototype", desc: "Prototype OR Working Model" },
      { step: "Step 5", name: "Prepare Your Pitch", desc: "2–3 Minutes\nExplain: Problem, Solution, Impact" }
    ],
    mentorScript: "Don't wait for the perfect idea.\nBuild.\nTest.\nImprove."
  },
  sceneGuidelines: {
    title: "Ideathon 2026 — Student Guidelines",
    subtitle: "Build an AI Prototype That Solves a Real Problem",
    intro: "You can build anything that works — not just a website or app: Physical models, Robots, Wearables, IoT devices, Dashboards, AI Assistants. A working physical model is compulsory to qualify for the second round. Pick ONE genre below and build a working prototype for it.",
    genres: [
      {
        id: 1,
        title: "Mental Health",
        problem: "Millions struggle silently with stress due to a lack of private, low-pressure ways to check in on their mental health.",
        challenge: "Design a private, AI-powered device or wearable that serves as a judgment-free first step for mental well-being.",
        tip: "Keep it private. If it feels like it's 'watching', it will fail."
      },
      {
        id: 2,
        title: "Healthcare",
        problem: "Small clinics and schools lack basic diagnostic tools. Serious conditions go undetected.",
        challenge: "Build a low-cost, portable AI health-screening device (e.g., fingertip scan or vision kit).",
        business: "Sell as a subscription to schools, rural clinics, corporate CSR."
      },
      {
        id: 3,
        title: "Public Sector",
        problem: "Cities struggle with undetected road damage until accidents happen due to lack of early detection.",
        challenge: "Build a low-cost AI device for vehicles to automatically map road damage.",
        business: "Sell live map dashboard to Municipal corporations, PWD, and Cab companies."
      },
      {
        id: 4,
        title: "Family Business Innovation",
        problem: "Small family businesses lose money daily due to untracked issues like stockouts or spoiled goods.",
        challenge: "Visit a family business, identify one real costly problem, and design an AI tool to fix it.",
        tip: "You MUST talk to the actual business owner or staff first."
      },
      {
        id: 5,
        title: "Problem-Solving Startup (Pitch)",
        problem: "Millions face everyday problems where existing solutions are too expensive or inaccessible.",
        challenge: "Identify a widespread problem and design a working, affordable startup product to solve it.",
        tip: "You need a working model AND a simple business plan (who pays, why choose you)."
      },
      {
        id: 6,
        title: "Women Safety & Empowerment",
        problem: "Current safety apps require too many steps to trigger an alert during emergencies.",
        challenge: "Build a discreet AI wearable (pendant/ring) with a hidden trigger that sends live location to contacts.",
        business: "Sell subscriptions to schools, corporates, and government CSR.",
        tip: "Must look like normal jewelry to avoid drawing attention. Filter out accidental taps."
      }
    ],
    demo: [
      "Show your model working live — don't just show slides",
      "Let the judge try it themselves (press it, walk past it, show an object)",
      "Show the website or app made",
      "Explain the real problem it solves, in one sentence"
    ],
    checklist: [
      "I picked one genre",
      "My prototype is a working model, not just a slide",
      "It uses AI to sense → think → act",
      "I can explain the real problem it solves in one line",
      "(Family Business only) I talked to the actual business owner/staff"
    ]
  },
  scene5: {
    title: "Your Secret Superpowers",
    subtitle: "Smart Innovators Use Smart Tools (AI Tools)",
    tools: {
      ppt: [
        { name: "Gamma.app", url: "gamma.app", yt: "https://www.youtube.com/embed/h5QZ9Sh2S0M" },
        { name: "Chronicle", url: "chroniclehq.com", yt: "https://www.youtube.com/embed/tEzCvRBWYeU" },
        { name: "Slidesgo", url: "slidesgo.com", yt: "https://www.youtube.com/embed/jdeXn8i_Pko" }
      ],
      website: [
        { name: "Lovable.dev", url: "lovable.dev", yt: "https://www.youtube.com/embed/sF824D48RkE" },
        { name: "Emergent", url: "app.emergent.sh", yt: "https://www.youtube.com/embed/v53X_cSXGxM" }
      ],
      app: [
        { name: "Claude AI", url: "claude.ai", yt: "https://www.youtube.com/embed/iXOV0qtCsWM" },
        { name: "Codex AI", url: "openai.com", yt: "https://www.youtube.com/embed/X_TbI4fueBI" }
      ]
    },
    mentorScript: "AI doesn't replace your creativity.\nIt multiplies it."
  },
  scene6: {
    title: "Level 1 (Class Competition)",
    weeks: [
      { week: "Week 1", date: "July 29", name: "Ideation", tasks: ["Team Formation", "Understand Problem", "Brainstorm"] },
      { week: "Week 2", date: "July 31", name: "Mentor Support", tasks: ["Watch Doubt Solving Video", "Q&A", "Finalize Solution", "Start Prototype"] },
      { week: "Week 3", date: "From 1 Aug to 29 Aug", name: "Submission Time & Presentation Day", tasks: ["Present: Problem, Solution, Prototype, Pitch"] }
    ],
    winnersInfo: "Winners Selected: 1 Team per Class"
  },
  scene7: {
    title: "Welcome to Level 2",
    subtitle: "Inter-Class Competition",
    flow: ["Winning Teams", "One Team from each Grade"],
    presentationIncludes: ["Problem Statement", "Unique Solution", "Working Prototype (Mandatory)", "Final Pitch"],
    mentorScript: "Level 2 isn't about reaching the finals.\nIt's about proving your solution actually works."
  },
  scene8: {
    title: "The Grand Finale",
    subtitle: "Level 3: Interschool Grand Finale",
    hostedAt: "Hosted at Cambridge Court World School",
    desc: "Students from different schools compete together.",
    experience: [
      "Innovation Masterclass",
      "Prototype Refinement",
      "Networking",
      "Professional Jury Pitch",
      "Prize Ceremony"
    ],
    rewards: [
      { icon: "🥇", text: "Cash Prize" },
      { icon: "🏆", text: "Rolling Trophy" },
      { icon: "📜", text: "Certificates" },
      { icon: "💻", text: "Electronic Device" }
    ],
    mentorScript: "Imagine presenting your idea in front of startup founders.\nThat's where your journey could lead."
  },
  scene9: {
    title: "Important Dates",
    dates: [
      { week: "July 29", event: "Ideathon Round 1 – Class Level Begins" },
      { week: "July 31", event: "Team & Genre Submission along with Masterclass" },
      { week: "Aug 29", event: "LEVEL-1 : Finalize Idea + Prototype + Class Presentations" },
      { week: "TBA", event: "GRAND FINALE – But only if u win Level 1 & 2" }
    ],
    disclaimer: "(These dates are final for the 2026 Ideathon.)"
  },
  scene10: {
    title: "Are You Ready?",
    callToAction: ["Think Bigger.", "Create Smarter.", "Build Better.", "Pitch Fearlessly."],
    remember: "Innovation isn't about having the best resources.\nIt's about solving the right problem.",
    farewell: "See You at the Grand Finale!"
  }
};
