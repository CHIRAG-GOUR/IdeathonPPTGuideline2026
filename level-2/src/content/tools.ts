// Tools shown in the one-window video player on each page.
// Every youtubeId was checked to exist and allow embedding (YouTube oEmbed, Nov 2026).
// `start` (seconds) comes from the video's own chapter list where it has one,
// so the clip opens where the actual walkthrough begins. Edit freely.

export type Tool = {
  name: string;
  desc: string;
  url: string; // opens the tool
  domain: string; // for the favicon
  youtubeId: string;
  start?: number;
  video: string; // video title · channel (shown as credit)
};

export const thinkTools: Tool[] = [
  { name: "Claude", desc: "Chat, upload files, and build documents with artifacts.", url: "https://claude.ai", domain: "claude.ai", youtubeId: "r2vYObllqJU", start: 33, video: "Claude AI Tutorial for Beginners · Kevin Stratvert" },
  { name: "ChatGPT", desc: "Ask, summarise, research and plan with the most popular AI chat.", url: "https://chatgpt.com", domain: "chatgpt.com", youtubeId: "poM2n8fBcag", start: 70, video: "ChatGPT Tutorial for Beginners · Kevin Stratvert" },
  { name: "Gemini", desc: "Google's AI: Canvas, file analysis and images.", url: "https://gemini.google.com", domain: "gemini.google.com", youtubeId: "PDMcpthR88U", start: 23, video: "How to Use Google Gemini AI · Kevin Stratvert" },
  { name: "NotebookLM", desc: "Upload your research and ask questions only about your sources.", url: "https://notebooklm.google.com", domain: "notebooklm.google.com", youtubeId: "_bXcjHQNKR4", video: "The Only NotebookLM Guide You'll Ever Need · James Blue" },
  { name: "Perplexity", desc: "AI search engine that shows its sources.", url: "https://www.perplexity.ai", domain: "perplexity.ai", youtubeId: "YoWdogtZRw8", video: "Learn 80% of Perplexity in under 10 minutes · Jeff Su" },
];

export const build3dTools: Tool[] = [
  { name: "Meshy", desc: "Text or image to 3D. 100 free credits a month; credit it as CC BY 4.0.", url: "https://www.meshy.ai", domain: "meshy.ai", youtubeId: "VC9VvhQgI7U", start: 10, video: "How to Create 3D Models with Meshy · MeshyAI (official)" },
  { name: "Tripo", desc: "Image to 3D with free credits. Check the commercial terms.", url: "https://www.tripo3d.ai", domain: "tripo3d.ai", youtubeId: "kiR8nGwTQCM", start: 131, video: "Tripo AI Tutorial: 3D Models from Images · 3D Print Dood" },
  { name: "Hunyuan3D", desc: "Open-source image-to-3D model from Tencent.", url: "https://3d.hunyuan.tencent.com", domain: "tencent.com", youtubeId: "TvvXnpqdXXg", video: "Convert 2D images to 3D models with AI · Let's Design" },
  { name: "TRELLIS", desc: "Microsoft's open-source image-to-3D model (free online demo).", url: "https://huggingface.co/spaces/trellis-community/TRELLIS", domain: "huggingface.co", youtubeId: "yML1Czi7h94", video: "I Tested Trellis 2 · 3D Polygon" },
  { name: "Tinkercad", desc: "Resize and tidy the model; add holes and text.", url: "https://www.tinkercad.com", domain: "tinkercad.com", youtubeId: "gOs6Mdj7y_4", start: 72, video: "TinkerCAD Tutorial for Beginners · Skills Factory" },
];

export const circuitTools: Tool[] = [
  { name: "Wokwi", desc: "Arduino and ESP32 simulator in the browser.", url: "https://wokwi.com", domain: "wokwi.com", youtubeId: "JyMMrtaJWOg", video: "WOKWI Simulator Tutorial for Beginners · Tech at Home" },
  { name: "Tinkercad Circuits", desc: "Drag-and-drop circuits; best for Grades 6–7.", url: "https://www.tinkercad.com/circuits", domain: "tinkercad.com", youtubeId: "9RF_BZ1Cg4k", start: 21, video: "Introduction to Tinkercad Circuits · Science Buddies" },
  { name: "Falstad", desc: "Watch current and voltage move through a circuit.", url: "https://www.falstad.com/circuit/", domain: "falstad.com", youtubeId: "6M1pqnqkYuo", video: "How to use the Falstad Circuit Simulator · Mr. Thesing" },
  { name: "Flux", desc: "AI PCB copilot. 14-day trial, then public projects only.", url: "https://www.flux.ai", domain: "flux.ai", youtubeId: "8Xpg9pOaW2Q", start: 15, video: "How To Create Your First Schematic with AI · Flux (official)" },
  { name: "EasyEDA", desc: "Free online schematic and real board layout.", url: "https://easyeda.com", domain: "easyeda.com", youtubeId: "iB-n8Nbt18A", video: "How to easily design PCB in EasyEDA · Mr Innovative" },
  { name: "KiCad", desc: "Free, professional PCB design software.", url: "https://www.kicad.org", domain: "kicad.org", youtubeId: "xJu5fUn4m2k", video: "KiCAD in 3 Minutes · i2c_jason" },
];

export const brandTools: Tool[] = [
  { name: "Canva", desc: "Logo templates; rebuild any AI-made logo text here.", url: "https://www.canva.com", domain: "canva.com", youtubeId: "H3S0dEbR8rU", start: 18, video: "How to Make Logo in Canva · Kevin Stratvert" },
  { name: "Adobe Express", desc: "Quick logos and brand graphics.", url: "https://www.adobe.com/express/", domain: "adobe.com", youtubeId: "4jN_dnLHoiU", video: "Create a Logo with Adobe Express · Adobe Express (official)" },
  { name: "Coolors", desc: "Generate a 2-colour palette and lock the ones you like.", url: "https://coolors.co", domain: "coolors.co", youtubeId: "hCeNdFXBv4U", video: "How to use Coolors.co · Veronika Mervart" },
];
