You are working in a Next.js project: a web-based slide deck called "SkilliZee Ideathon – Level 2".
Your job: GENERATE IMAGES ONLY and save each one at the exact path listed below. Do not edit any code.

## How images are wired (already done — just drop files in)
- Every image is loaded from `public/media/level2/<file name>`.
- The paths are defined in `src/content/level2-data.ts`. Each slide component in `src/components/level2/` shows the image through `<ImageSlot>`.
- If a file is missing, the slide shows a dashed placeholder with the file name. Once you save the file with the exact name, it appears automatically.
- Images are shown with `object-cover`, so keep the main subject CENTERED with some breathing room on all sides (edges may be cropped).
- Save as PNG. File names are lowercase, exactly as written.

## Visual style (match the existing deck)
- Photo-realistic, natural warm daylight, slightly cinematic, soft depth of field.
- Indian school students aged 9–15, in light-blue checked school uniforms with navy ties and ID lanyards (same look as `public/media/scene2_level1.png` — open that file and match its style).
- Colour mood: clean, bright, with SkilliZee blue (#1E63D0) accents where natural (posters, props, banners).
- NO readable text, words, logos or brand names inside the images (text is rendered by the slide). Blank or blurred signage only.
- NO real or famous people. No celebrity likenesses. No TV show logos.
- Diverse mix of boys and girls in every group scene.

## Images to generate (9 images)

| # | Save to | Aspect | Size (px) | Slide |
|---|---------|--------|-----------|-------|
| 1 | public/media/level2/s01_cover.png | 4:3 | 1600×1200 | Slide 1 – Cover |
| 2 | public/media/level2/s02_ideathon.png | ~3:1 wide | 1680×600 | Slide 2 – What is an Ideathon |
| 3 | public/media/level2/s03_winners.png | 5:4 | 1500×1200 | Slide 3 – Congratulations |
| 4 | public/media/level2/s04_rules.png | 7:8 portrait | 1050×1200 | Slide 4 – Rules |
| 5 | public/media/level2/s05_startup.png | 3:2 | 1500×1000 | Slide 5 – From Project to Startup |
| 6 | public/media/level2/s07_sharktank.png | 1:1 | 1200×1200 | Slide 7 – Shark Tank pitch |
| 7 | public/media/level2/s08_calendar.png | 1:1 | 1200×1200 | Slide 8 – Important Dates |
| 8 | public/media/level2/s10_perks.png | 5:7 portrait | 1000×1400 | Slide 10 – Perks |
| 9 | public/media/level2/s11_thankyou.png | 12:13 portrait | 1100×1200 | Slide 11 – Thank You |

(Slide 9 – Judging Criteria has no image on purpose. Slide 6 uses two real videos and the founder photo is a real photo — both are already in the project, see the end.)

### 1. s01_cover.png — Cover
A team of 4 Indian school students standing proudly behind a table with their working prototype (a small smart gadget with LEDs, sensors and a laptop showing a dashboard). Behind them, soft spotlights and a blurred stage backdrop with blue lighting. Mood: excited, confident, "startup launch day". Eye-level, medium shot.

### 2. s02_ideathon.png — What is an Ideathon (wide banner)
Wide panoramic shot of a bright school innovation lab: several student teams around tables, sticky notes on a glass wall, sketches, a 3D-printed part, a laptop. Show the journey left→right: brainstorming with sticky notes → building a model → one student presenting. Subjects spread across the width, nothing important at the far top/bottom edges.

### 3. s03_winners.png — Congratulations, Level 1 Winners
A joyful team of students on a school stage celebrating — arms raised, one holding a small golden trophy, colourful confetti falling, warm stage lights, blurred clapping audience in the foreground. Pure celebration energy.

### 4. s04_rules.png — Rules & Regulations
A focused team of 4 students at a desk with a mentor (adult teacher, back partially to camera) pointing at a checklist on a clipboard. A wall clock is visible in the background (hinting at deadlines). Calm, disciplined, organised mood. Portrait framing.

### 5. s05_startup.png — From Project to Startup
A split-feel scene on one table: on the left a rough student prototype (wires, cardboard, breadboard); on the right the same idea as a polished product with neat packaging, a blank brand-style box, a price tag shape, and a phone showing a blurred ad. Two students in uniform looking at it proudly. Conveys "project → market-ready product".

### 6. s07_sharktank.png — Your Shark Tank Moment
A confident student (aged ~13) pitching on a modern stage, gesturing toward a large blank screen, holding their product. In the foreground, the backs/shoulders of a 3-person adult jury panel seated at a long desk with name-card shapes (no text) and water glasses. Emerald/teal accent lighting. NO show logos or famous faces.

### 7. s08_calendar.png — Mark Your Calendar
A neat flat-lay on a wooden desk: a paper wall/desk calendar with a few dates circled in blue marker (no readable numbers needed), sticky notes, a pen, an alarm clock, and a small prototype. Top-down view, bright, organised.

### 8. s10_perks.png — Perks & Benefits
Portrait still-life: gold medals with blue ribbons, a rolled certificate with blue ribbon, a small golden trophy, a gift box, and a laptop/tablet, arranged on a stage-like surface with a soft spotlight and bokeh. Premium, celebratory.

### 9. s11_thankyou.png — Your Idea. Your Innovation. Your Future.
Inspiring shot of 3–4 students looking up and forward together at sunrise on a school rooftop or open ground, one holding a glowing lightbulb-shaped prototype, another holding a tablet. Hopeful, cinematic, golden-hour light with blue sky.

## Do NOT generate or touch (already in the project)
- **public/media/level2/s02_founder.jpg**: the real photo of Dr. Aarna Singh Rawat (Founder, SkilliZee). Never replace it with an AI image.
- **public/media/level2/videos/**: the two reel videos and their poster frames used by the Instagram-style player on Slide 6.

## When done
1. Confirm all 9 files exist in `public/media/level2/` with the exact names above.
2. Run `npm run dev` and open http://localhost:3000. Click through all 11 slides and check that no dashed placeholder is left on any slide.
3. Do not change any `.tsx` or `.ts` file.
