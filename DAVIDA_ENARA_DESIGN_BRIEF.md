# Davida Enara — Homepage Mockup Brief
**For:** Claude Code  
**Project directory:** `~/Documents/davida-enara`  
**Goal:** Build a single-page homepage mockup in React + Vite + TypeScript

---

## What We're Building

A visually stunning homepage for Davida Enara — a visual artist, poet, and fashion designer. This is a mockup for client approval, not a finished product. Real photos are not available yet; use styled placeholder divs. Focus on layout, typography, color, and feel.

---

## Tech Stack

- React 18 + Vite + TypeScript (already scaffolded)
- Tailwind CSS v4 (already configured)
- Framer Motion for animations — install if not already: `npm install framer-motion`
- Google Fonts via `index.html` — add these if not present:
  ```
  Playfair Display (weights 400, 500, italic variants)
  Crimson Pro (weights 300, 400, italic variants)
  DM Sans (weights 300, 400)
  ```

---

## File Structure

Create these files:
```
src/
  components/
    Navbar.tsx
    Hero.tsx
    Marquee.tsx
    ArtGrid.tsx
    PoetrySection.tsx
    FashionSection.tsx
    HandwrittenNote.tsx
    AboutStrip.tsx
    Footer.tsx
  App.tsx          ← import and stack all sections here
  index.css        ← global styles, grain texture, CSS variables
```

---

## Color Palette

Define these as CSS variables in `index.css`:

```css
--butter: #F5EFD8;        /* primary background — warm cream/yellow */
--soil: #2A2218;          /* dark sections — rich near-black brown */
--gold: #8A7A5A;          /* muted gold — secondary text, accents */
--parchment: #EDE0C0;     /* slightly darker cream — fashion section bg */
--note-bg: #FFFBEF;       /* handwritten note card */
--border: #D4C4A0;        /* all borders */
--metal: #9A9080;         /* tarnished silver/chrome accent */
```

---

## Typography

```css
--font-display: 'Playfair Display', serif;   /* headlines, hero title */
--font-body: 'Crimson Pro', serif;           /* body, poetry, handwritten feel */
--font-ui: 'DM Sans', sans-serif;            /* nav, labels, eyebrows */
```

Rules:
- All nav and label text: uppercase, letter-spacing 0.15–0.25em, 10–11px, DM Sans weight 300
- Headlines: Playfair Display, weight 400 (not bold), large and loose line-height ~1.0
- Italic moments: Playfair Display italic for hero sub-words; Crimson Pro italic for poetry and handwritten sections
- No font sizes below 11px

---

## Grain Texture

Apply a subtle grain overlay to the entire page using a fixed pseudo-element or a fixed div. Use an SVG feTurbulence filter:

```css
.grain {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 100;
  opacity: 0.045;
  background-image: url("data:image/svg+xml,..."); /* SVG noise filter */
  background-repeat: repeat;
  background-size: 128px 128px;
}
```

---

## Sections — Build In This Order

### 1. Navbar
- Fixed position, sits on top of hero
- Left: "Davida Enara" in Playfair Display, small, spaced uppercase
- Right: links — Art · Fashion · Poetry · Shop · About — DM Sans, 11px, uppercase, 0.12em spacing
- No background color — floats over hero
- Does NOT sit flush at top — add 28px padding top

### 2. Hero
- Full viewport height (`min-height: 100vh`)
- Background: `var(--butter)`
- Two-column layout: text left, collage right
- Left column:
  - Eyebrow: "Visual Art · Fashion · Poetry" — small, gold, uppercase
  - Headline: "Making things feel real." — Playfair Display, large (clamp 52px–88px), weight 400, line-height 1.0. The word "feel" should be italic and gold
  - Subtext: short italicized Crimson Pro paragraph, bordered left with a 1px gold line
- Right column: collage of 2 overlapping placeholder divs
  - Large image placeholder (72% width, 460px tall, warm taupe background)
  - Smaller overlapping card (48% width, 260px, lighter parchment, with a tarnished metal star icon centered)
  - A small "sticky note" tag floating near the top: "new work, spring 2025 ✦"
- Framer Motion: fade-in and slight upward drift on hero text on mount (`initial: opacity 0, y: 20` → `animate: opacity 1, y: 0`, staggered children)

### 3. Marquee (ticker)
- Full width, dark background (`var(--soil)`)
- Scrolling text: "Visual Art ✦ Fashion ✦ Poetry ✦ Davida Enara ✦ Made with intention ✦ New York ✦" — repeated
- DM Sans, 10px, uppercase, cream color, 0.25em spacing
- CSS animation, infinite loop, ~22s duration
- Gold ✦ separators between items

### 4. Art Grid
- Background: `var(--butter)`
- Section header: "Visual Art" (with "Art" italic/gold) left-aligned, "View all works" link right-aligned
- Grid: asymmetric — one tall cell on the left spanning 2 rows, 4 smaller cells right
  - `grid-template-columns: 1.4fr 1fr 1fr`
  - `grid-template-rows: 300px 200px`
- Each cell: placeholder div with warm taupe/tan fill, small "your image here" label bottom-left in cream
- Bottom-left small cell: lighter background, italic caption text ("untitled study, 2024")
- Framer Motion: cells fade in with stagger as they scroll into view (use `whileInView`)

### 5. Poetry Section
- Background: `var(--soil)` (dark)
- Centered layout, max-width 640px, centered text
- Large ghost text "verse" behind content — Playfair Display, ~180px, 3% opacity cream
- Label: "Poetry" — gold, uppercase, small
- Verse: multi-line poem in Crimson Pro italic, 26px, weight 300, cream, line-height 1.8
  ```
  I keep finding myself
  at the edge of things —
  the hem of the dress,
  the margin of the page,
  the moment before the light
  decides what it is.
  ```
- Attribution line below: italic, gold, smaller — "— from Threshold Studies, 2024"
- Framer Motion: verse lines stagger in one by one on scroll into view

### 6. Fashion Section
- Background: `var(--parchment)`
- Two-column: text left, staggered image grid right
- Left: headline "Fashion & Wearable Art" (italic), Crimson Pro body paragraph, "Browse the collection" link
- Right: 2×2 grid of fashion placeholder cards (aspect-ratio 3/4), offset vertically — alternate cards pushed down/up by 32px to feel collage-like. Warm brown/tan fills.
- Each card has a small "No. 001" label bottom-left in cream

### 7. Handwritten Note
- Background: `var(--butter)`
- Single card centered on screen
- Card styles:
  - Background `var(--note-bg)`
  - 1px border `var(--border)`
  - Slight drop shadow (2px 3px 0 `var(--border)`)
  - Rotated slightly: `transform: rotate(-0.8deg)`
  - Faint horizontal ruled lines behind the text (CSS repeating gradient)
- Content: short personal statement in Crimson Pro italic, each line separated by a ruled line
  ```
  I make things because I have to.
  Not always because I know what they mean —
  but because not making them
  would mean something worse.
  ```
- Signature bottom right: "— D.E." in Playfair Display italic, gold
- Framer Motion: card fades in and drifts slightly up on scroll

### 8. About Strip
- Background: `var(--soil)`
- Two-column: photo placeholder left, text right
- Photo placeholder: dark rectangle, 400px tall, faint border
- Text: "About Davida" headline (Playfair Display), body paragraph (Crimson Pro, cream-ish), "Read more" link
- Body text:
  ```
  Davida Enara is a visual artist, poet, and fashion designer whose 
  practice moves between image, language, and cloth. Her work asks what 
  it means to make something by hand in an age of speed — and what 
  tenderness looks like as a material.
  ```

### 9. Footer
- Background: `var(--butter)`
- Top border: 1px `var(--border)`
- Centered column layout
- SVG star icon (outlined, not filled, gold stroke)
- "Davida Enara" in Playfair Display small uppercase gold
- Nav links row: Art · Fashion · Poetry · Shop · About · Instagram
- Copyright line: tiny, muted

---

## Animation Summary (Framer Motion)

| Element | Animation |
|---|---|
| Hero text | Fade in + drift up on mount, staggered |
| Art grid cells | Fade in + drift up on scroll into view, staggered |
| Poetry verse lines | Stagger in on scroll |
| Handwritten note card | Fade in + slight upward drift on scroll |

Use `viewport={{ once: true }}` on all scroll animations so they only trigger once.

---

## Things to Avoid

- No drop shadows except the note card's flat offset shadow
- No gradients (backgrounds are flat solid colors)
- No rounded corners — use `border-radius: 2px` at most, or none
- No bold font weights — max weight is 500, prefer 400 and 300
- No all-caps headings — only labels and nav are uppercase
- Placeholder divs should have a label so the client knows what goes there

---

## Starting Prompt for Claude Code

Once you've read this brief, start with:

```
Read DAVIDA_ENARA_DESIGN_BRIEF.md in full. Then:
1. Install framer-motion
2. Add the Google Fonts to index.html
3. Set up CSS variables and grain overlay in index.css
4. Build each component listed in the brief one at a time
5. Wire them all together in App.tsx
6. Run the dev server and confirm it compiles without errors
```
