# LIMINAL — studio site (hero + philosophy)

Built with Next.js 14, TypeScript, Tailwind CSS and Framer Motion.

## Run it (you don't need to know how to code)

1. Install Node.js (the engine that runs this). Get the "LTS" version
   from https://nodejs.org and click through the installer.

2. Open a terminal:
   - macOS: open the "Terminal" app
   - Windows: open "PowerShell"

3. Go into this folder. Type `cd ` (with a space), then drag the
   `liminal` folder onto the terminal window and press Enter.

4. Install the building blocks (one time only):

       npm install

5. Start the live preview:

       npm run dev

6. Open http://localhost:3000 in your browser. Edits save live.

To stop the preview: click the terminal and press Ctrl + C.

## Where things live
- `components/Hero.tsx` — the hero (name-cycle, giant wordmark, parallax)
- `components/About.tsx` — manifesto + philosophy
- `components/Cursor.tsx` / `Grain.tsx` — custom cursor + film grain
- `tailwind.config.ts` — the Liminal colors and fonts
- `app/layout.tsx` — loads the three brand fonts

Note: the fonts download automatically the first time you run it,
so keep the internet on for that first `npm run dev`.
