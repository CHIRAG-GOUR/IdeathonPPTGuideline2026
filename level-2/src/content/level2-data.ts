// SkilliZee Ideathon – Level 2 : all slide text lives here.
// Images live in /public/media/level2/ — see IMAGE_SLOTS at the bottom.

export const IMG = "/media/level2";

export const level2Data = {
  global: {
    eventName: "SkilliZee Ideathon – Level 2",
  },

  cover: {
    eyebrow: "SkilliZee Ideathon",
    level: "Level 2",
    tagline: ["Think.", "Build.", "Brand.", "Pitch."],
    subline: "From an innovative idea to a real-world solution.",
    image: `${IMG}/s01_cover.png`,
  },

  about: {
    title: "What Exactly Is an Ideathon?",
    description:
      "An Ideathon is a platform where young minds identify real-world problems and transform their ideas into innovative solutions.",
    steps: ["Identify a problem.", "Brainstorm solutions.", "Build and innovate.", "Present your idea to the world."],
    journeyTitle: "Your Ideathon Journey",
    journey: [
      { level: "Level 1", name: "Class Competition", status: "cleared" },
      { level: "Level 2", name: "Build. Brand. Pitch.", status: "current" },
      { level: "Level 3", name: "Interschool Grand Finale", status: "next" },
    ],
    poweredBy: "Powered by SkilliZee",
    founder: "Dr. Aarna Singh Rawat",
    founderImage: `${IMG}/s02_founder.jpg`,
    skillizee:
      "SkilliZee is an experiential learning platform that empowers children with essential 21st-century skills.",
    visionTitle: "Our Vision",
    vision:
      "To develop young innovators, confident thinkers and future entrepreneurs who can solve real-world problems.",
  },

  congrats: {
    badge: "Level 1 Winners",
    title: "Congratulations, Young Innovators!",
    text: "You have successfully cleared Level 1 and earned your place in Ideathon Level 2!",
    highlight: "Your journey from having an idea to creating an impactful solution starts now.",
    stamp: "Level 1 Cleared",
    stat: "1 team per class",
    statNote: "made it to Level 2. That's you!",
  },

  rules: {
    title: "Rules & Regulations",
    subtitle: "Important Rules & Guidelines",
    rules: [
      "Every team must submit all deliverables before the deadline.",
      "All team members must actively participate.",
      "Projects must be original and properly demonstrated.",
      "Be prepared for the final presentation and Q&A.",
      "Maintain discipline and follow mentor instructions.",
    ],
    latePolicyTitle: "Late Submission Policy",
    latePolicy: "5 marks deducted for every day of delay.",
    image: `${IMG}/s04_rules.png`,
  },

  problem: {
    chip: "Problem Statement | Grades 4–9",
    title: "From Project to Startup!",
    subtitle: "Build It. Brand It. Sell It!",
    intro:
      "Take your existing project and transform it into a more advanced, functional and market-ready solution.",
    mustInclude: "Your project must include:",
    deliverables: [
      { title: "Working Model", desc: "Improve and demonstrate your prototype." },
      { title: "Business Plan", desc: "Costing, pricing, sales and marketing strategy." },
      { title: "Branding", desc: "Brand name, logo, tagline and USP." },
      { title: "Professional Pitch", desc: "Present your project like a Shark Tank founder." },
      { title: "Advertisement Reel", desc: "Create a marketing reel for your product." },
    ],
    image: `${IMG}/s05_startup.png`,
  },

  reel: {
    chip: "The Advertisement Reel Challenge",
    title: "Lights. Camera. Brand Your Idea!",
    intro: "Create an advertisement reel for your own project.",
    mustInclude: "Your reel must include:",
    items: [
      "A creative introduction and product demonstration.",
      "Real feedback from people outside your team.",
      "People interacting with or trying your product.",
      "Professional editing, captions and branding.",
      "A creative SkilliZee connection highlighting your learning journey.",
    ],
    inspiration: "Take inspiration from H&M-style branding and marketing reels!",
    // Two example reels, played in the Instagram-style player on the slide.
    videos: [
      {
        id: "editing",
        heading: "Editing Reference",
        subheading: "Stylish, H&M-style brand editing",
        src: `${IMG}/videos/reel_editing.mp4`,
        poster: `${IMG}/videos/reel_editing_poster.jpg`,
        handle: "editing_reference",
        caption: "Look at the cuts, music sync, captions and branding. This is the vibe for your reel ✨",
        audio: "Original audio · Editing Reference",
        likes: 2148,
        comments: 96,
      },
      {
        id: "feedback",
        heading: "Feedback Reference",
        subheading: "Real people, real reactions",
        src: `${IMG}/videos/reel_feedback.mp4`,
        poster: `${IMG}/videos/reel_feedback_poster.jpg`,
        handle: "feedback_reference",
        caption: "Go out, let people try it and record their honest feedback. Real voices sell your idea 🎤",
        audio: "Original audio · Feedback Reference",
        likes: 3572,
        comments: 184,
      },
    ],
  },

  pitch: {
    chip: "Your Shark Tank Moment",
    title: "Pitch Like a Real Entrepreneur!",
    prepared: "Be prepared to explain:",
    questions: [
      "What problem are you solving?",
      "How does your solution work?",
      "Who are your target customers?",
      "What is the cost and selling price?",
      "How will you market and sell your product?",
      "What makes your idea unique?",
    ],
    formula: ["Confidence", "Clarity", "Creativity"],
    formulaResult: "A Powerful Pitch!",
    image: `${IMG}/s07_sharktank.png`,
  },

  dates: {
    chip: "Important Dates & Timings",
    title: "Mark Your Calendar!",
    rows: [
      { activity: "Masterclasses", date: "Coming Soon", pending: true },
      { activity: "Project Submission", date: "28 November 2026", pending: false },
      { activity: "Final Presentation", date: "15 December 2026", pending: false },
      { activity: "Results", date: "To Be Announced Later", pending: true },
    ],
    image: `${IMG}/s08_calendar.png`,
  },

  judging: {
    chip: "Judging Criteria",
    title: "How Will the Jury Score You?",
    total: "Total: 100 Marks",
    criteria: [
      { no: "01", name: "Problem & Insight", desc: "A real need, clear users and evidence from those affected.", marks: 10 },
      { no: "02", name: "Idea & Creativity", desc: "An original approach or clear improvements over existing options.", marks: 10 },
      { no: "03", name: "Feasibility & Prototype", desc: "A model, demo or user test, plus a practical plan.", marks: 20 },
      { no: "04", name: "Impact & Potential", desc: "A clear benefit and a believable path to grow.", marks: 20 },
      { no: "05", name: "Pitch & Teamwork", desc: "A clear story, honest answers and shared team understanding.", marks: 20 },
      { no: "06", name: "Branding Reel", desc: "A branded product advertisement reel with live demos, genuine feedback and SkilliZee integration.", marks: 20 },
    ],
  },

  perks: {
    chip: "Perks & Benefits",
    title: "What's In It For You?",
    perks: [
      { title: "Recognition", desc: "Recognition for your innovation." },
      { title: "Rewards", desc: "Certificates, medals and exciting rewards." },
      { title: "Showcase", desc: "Opportunity to showcase your project." },
      { title: "Expert Feedback", desc: "Expert feedback and learning." },
      { title: "Entrepreneurial Exposure", desc: "Masterclasses with real entrepreneurs." },
      { title: "Make It Real", desc: "A chance to turn your ideas into reality — with funding from SkilliZee." },
    ],
    finale: {
      eyebrow: "Road to Level 3",
      title: "Grand Finale",
      text: "Exciting digital and cash prizes for Level 3!",
      rewards: ["Cash Prize", "Rolling Trophy", "Certificates", "Electronic Device"],
      hostedAt: "Hosted at Cambridge Court World School",
    },
  },

  thanks: {
    lines: ["Your Idea.", "Your Innovation.", "Your Future."],
    text: "You have the idea. Now it's time to build it, brand it and pitch it!",
    cta: "Let's Create Something Extraordinary!",
    footer: "SkilliZee Ideathon – Level 2",
    image: `${IMG}/s11_thankyou.png`,
  },
};
