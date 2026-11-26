# AI Masterclass page: image prompts for Antigravity

This is for the `/ai-masterclass` page of the Level 2 site. Each image has a placeholder already on the page. Save each file with the **exact name** below into:

```
level-2/public/media/masterclass/
```

Once a file exists, the placeholder is replaced automatically: the image zooms gently into place as you scroll to it. **Do not edit any code.**

---

## Paste this into Antigravity

> In this repo, open `level-2/AI_MASTERCLASS_IMAGE_PROMPTS.md`. Generate all 8 images listed under "Images", each at the size given, and save each one as a PNG in `level-2/public/media/masterclass/` with the exact file name. Follow the "Style for every image" rules. Do not edit any .ts, .tsx or .css file. When done, run `cd level-2 && npm run build` to confirm it still builds, then commit with the message "feat(masterclass): add generated images" and push.

---

## Style for every image

- **Light and airy only.** Pastel sky colours: periwinkle `#9aa4ff`, lavender `#d5d0ff`, peach `#ffe4d6`, mint `#c4ecdf` and a touch of coral `#f0547a`. Soft daylight, gentle glow. **No dark or black backgrounds.**
- The look is a soft, painterly semi-realistic illustration, like a premium illustrated landing page.
- People are Indian school students aged 12–16 in light-blue school uniforms, with a mix of boys and girls.
- **No readable text, letters, logos, brand names or real or famous people.** Screens and paper are blank or blurred.
- Keep the main subject centred with space around it, because the frames crop the edges.

---

## Images

### 1. `think_interview.png`, 1200×1400 (portrait)
**Where:** page 03, "Think: problem before product", right-hand column.
**Prompt:** Two Indian school students in light-blue uniforms, one holding a notebook, kindly interviewing a school canteen worker in a bright, sunlit school corridor. They are listening closely and nodding. Soft pastel morning light, periwinkle and peach tones, painterly semi-realistic illustration, calm and curious mood, no text.

### 2. `build3d_front.png`, 1024×1024 (square)
**Where:** page 05, "Build: AI 3D in 20 minutes", first of the 3 angle tiles (Front).
**Prompt:** A clean 3D concept render of a student-designed smart water bottle with a small glowing reminder ring near the cap, **front view**, centred on a plain soft lavender-to-white gradient background, soft studio lighting, gentle shadow, matte pastel plastic, no text or logos.

### 3. `build3d_side.png`, 1024×1024 (square)
**Where:** page 05, second angle tile (Side).
**Prompt:** The same smart water bottle concept render as `build3d_front.png`: same design, colours, lighting and background, shown from the **side view**, centred, no text.

### 4. `build3d_top.png`, 1024×1024 (square)
**Where:** page 05, third angle tile (Top).
**Prompt:** The same smart water bottle concept render, **top-down view** looking at the cap and the glowing reminder ring, same lighting and lavender-white background, centred, no text.

### 5. `circuit_sim.png`, 1600×900 (16:9)
**Where:** page 06, "Build: prove it works with a circuit", bottom-right, next to the video slot.
**Prompt:** A bright, clean flat illustration of an Arduino-style microcontroller on a white breadboard, wired neatly to a small sensor, an LED and a buzzer with colourful jumper wires (coral, mint and lavender), laid out like a tidy circuit-simulator screen on a very light background. Top-down view, crisp vector-like style, no readable text or labels.

### 6. `brand_kit.png`, 1200×1400 (portrait)
**Where:** page 07, "Brand: be remembered", right-hand tile.
**Prompt:** A flat-lay brand-kit board on a soft peach desk: a simple abstract logo mark (a coral circle with a white crescent), two colour swatch cards (coral and lavender), a font sample shown as abstract shapes, sticky notes, a pencil and a small product prototype. Top-down, soft daylight, pastel, tidy and premium, no readable text.

### 7. `pitch_stage.png`, 1400×1000 (landscape)
**Where:** page 09, "Pitch: 3 minutes, 6 slides", right-hand tile.
**Prompt:** A team of three Indian school students confidently pitching their product on a small, bright school stage, one gesturing at a large blank pastel screen. In the foreground, the backs of three judges sit at a table. Warm golden-hour light through the windows, peach and lavender tones, painterly semi-realistic illustration, no text.

### 8. `wrap_team.png`, 1200×1400 (portrait)
**Where:** page 11, "Wrap-up: Team Product Pack", right-hand tile.
**Prompt:** A happy team of four Indian school students holding up their finished product pack (a folder, a small prototype and a tablet with a blank screen) on a school rooftop under a soft pink-lavender dusk sky with a glowing sun, a few clouds and sparkles. Proud, joyful mood, painterly semi-realistic illustration, no text.

---

## Optional: YouTube videos with a start time

There are two video slots: page 05 (Image-to-3D) and page 06 (Wokwi simulator). To fill one, edit `level-2/src/content/masterclass.ts`:

```ts
video: { title: "Image-to-3D walkthrough", youtubeId: "VIDEO_ID", start: 45, end: 180 },
```

`start` and `end` are in seconds. Only use a real video ID that you have checked.
