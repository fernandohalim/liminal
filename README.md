# LIMINAL — studio site (A24-style redesign)

Next.js 14 · TypeScript · Tailwind · Framer Motion.
Fonts: Cormorant Garamond + DM Mono (Bebas removed).

## Run it
1. Install Node.js (LTS) from https://nodejs.org
2. Open a terminal (macOS: Terminal · Windows: PowerShell)
3. Type `cd ` then drag the `liminal` folder in, press Enter
4. `npm install`   (one time)
5. `npm run dev`   then open http://localhost:3000
Keep internet on for the first run so the fonts download.

## Placeholder images (picsum) — replace these
All three are remote picsum URLs. Swap them for your own art:
put files in a `/public` folder and change the URL to e.g. "/hero.jpg".
- components/Hero.tsx      HERO_IMG   — wide, atmospheric "threshold" shot
- components/QuoteBand.tsx QUOTE_IMG  — between motion & stillness
- components/About.tsx     ABOUT_IMG  — portrait, textural studio detail
The copper duotone + grain are applied in CSS, so any photo will sit in-palette.
