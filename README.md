# Ahmad Dewedar · Portfolio

A personal portfolio for Ahmad Dewedar, frontend developer. English and Arabic (full RTL), light and dark, built with React and Vite

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build to dist/
npm run preview    # serve dist/ on http://localhost:4173
npm run verify     # end-to-end checks against the preview server (run preview first)
```

## Structure

```
index.html                 Fonts, and the script that applies theme and language before first paint
public/logos/              Each project's logo, full size and small (for the switcher)
public/me/                 The photos for the hero and About
src/
  data/projects.js         The projects: copy in both languages, features, tech, gallery, live link
  data/profile.js          Skills, services and the four contact links
  i18n/strings.js          Interface copy in English and Arabic
  i18n/Preferences.jsx     Language and theme state
  components/              Header, navigation bar, Hero, skills band, About, Skills, Services, Process, Contact, Projects showcase, titles, logos, icons, footer
  pages/                   Project page, Services page and 404
  styles/                  tokens, base, layout, hero, sections, projects, showcase, project page, extras, responsive
scripts/
  verify.mjs               Headless Chrome checks
```

## Adding a live link

Each project in `src/data/projects.js` has a `live` field holding its published URL, which shows as a "Visit live site" button on that project's page. Set it to `null` and the button gives way to a "not published yet" note

## Design

- **Colours:** black, white and one blue (`#1f5eff` light, `#4d7cff` dark), defined in `src/styles/tokens.css`. The theme follows the device until the visitor uses the toggle; the choice is remembered
- **Type:** Raleway for English, Readex Pro for Arabic
- **Project names** use the site's normal type, in the current language only
- **Yaqeen, Mizan and Veltrix** use the site's normal type
- **Project logos** come from Ahmad: artworks for the five history and learning projects, and the Mizan and Veltrix logo files
- **Favicon** is a glossy `</>`
- **Contact** is white in light mode and black in dark mode

## Hero and About

The hero shows Ahmad's photo on its own, as a clean circle, beside his name, role, a short intro and two large buttons. The About section has a second, portrait-shaped photo and is written about him in his own voice, mentioning his age once

## Navigation

A bar of icons in the header (`src/components/Dock.jsx`): home, projects, skills, about, services and contact. On the home page it highlights the section in view and scrolls there smoothly; the services icon opens the Services page. On phones the bar sits on its own row under the name

## Services page

`/services` is laid out as a code editor (`src/pages/ServicesPage.jsx`): a file per service in tabs and a side list, and each service written as a small object with what it delivers, the tools behind it and links to the projects that show it. The editor stays dark in both themes, like a real one

## Skills

Every skill is a tile with a proper icon: official brand logos from Simple Icons (CC0) and Lucide icons (ISC) for general skills such as accessibility, each on a soft tile in its own colour (`src/components/SkillIcon.jsx`). The tiles hold still so the text stays the focus

## Motion

- Scroll reveals through one IntersectionObserver, short and quick
- Motion that runs without scrolling: the portrait ring turning, the icon badges floating, a two-row skills band that never pauses, a slow light behind the page, a light travelling along the process line and a sheen across the main button. Skill cards hold still
- Card hover: a small lift on project tiles and a gentle tilt on the logos
- Project transitions use the View Transitions API: the card image morphs into the project page's hero
- Everything respects `prefers-reduced-motion`

## Projects showcase

One project at a time: its logo as large artwork, and beside it the name, type, summary, technologies, and links to the project page and the live site. A row of logo tiles switches between projects, as do the arrows, the arrow keys (the left arrow moves forward in Arabic) and a swipe. Each project page opens with the same artwork, then the overview, features, technologies with icons, and the neighbouring projects

## Screens

Fluid throughout. Past 1680px the whole design grows with the type so large screens never look empty; landscape phones get a side by side hero; small phones get tighter tiles

## One language at a time

The English version shows no Arabic and the Arabic version shows no English names: every project has a name in both languages, and skills, technology labels and contact names are translated. Brand and tool names such as React or Vite stay as they are written, as does the code in the Services page

## Rules this site keeps

- No `!important`
- No full stop at the end of any heading, label or title
- Project details come only from each project's own README and source
- Contact links: LinkedIn, GitHub and YouTube, exactly as given

## Deploying

`dist/` is a static single-page app. `vercel.json` and `public/_redirects` (Netlify) route every path to `index.html` so `/projects/<slug>` works on refresh
