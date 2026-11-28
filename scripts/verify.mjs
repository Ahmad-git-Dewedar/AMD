/**
 * End-to-end checks in headless Chrome or Edge
 *
 *   npm run build && npm run preview   (in one terminal)
 *   npm run verify                      (in another)
 *
 * Options: --base http://localhost:4173  --shots <folder>
 */
import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from 'playwright-core';
import { projects } from '../src/data/projects.js';
import { allSkills, links } from '../src/data/profile.js';

const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : fallback;
};
const BASE = arg('base', 'http://localhost:4173');
const SHOTS = arg('shots', null);
if (SHOTS) mkdirSync(SHOTS, { recursive: true });

const BROWSERS = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome'
];

let passed = 0;
const failures = [];
const check = (ok, label) => {
  if (ok) passed++;
  else failures.push(label);
  console.log(`${ok ? '  ✓' : '  ✗'} ${label}`);
};
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
/** Polls until the condition holds or about 5 seconds pass (smooth scrolling can lag under software WebGL) */
const until = async (fn) => {
  for (let i = 0; i < 25; i++) {
    if (await fn()) return true;
    await wait(200);
  }
  return false;
};
const shot = async (page, name) => SHOTS && page.screenshot({ path: join(SHOTS, `${name}.png`) });

const browser = await chromium.launch({ executablePath: BROWSERS.find((p) => existsSync(p)), args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });

async function fresh(width = 1440, height = 900, opts = {}) {
  const context = await browser.newContext({ viewport: { width, height }, ...opts });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  return { context, page, errors };
}

const headingsWithPeriod = (page) =>
  page.evaluate(() =>
    [...document.querySelectorAll('h1, h2, h3, title, .eyebrow, .btn, .showcase__type, .block-title')]
      .map((el) => el.textContent.trim())
      .filter((t) => /[.。]$/.test(t))
  );

const overflow = (page) => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);

// ---------- Home, English, dark ----------
console.log('Home');
{
  const { context, page, errors } = await fresh(1440, 900, { colorScheme: 'dark' });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await wait(1800);
  check((await page.getAttribute('html', 'data-theme')) === 'dark', 'follows a dark device by default');
  check((await page.locator('h1').count()) === 1, 'one h1');
  check(await page.evaluate(() => {
    const img = document.querySelector('.portrait img');
    return !!img && img.complete && img.naturalWidth > 0 && img.alt.length > 0;
  }), 'hero shows the portrait, with alt text');
  check((await page.locator('.orbit__item .skill-icon svg').count()) === 5, 'five languages circle the photo');
  check((await page.locator('.brand__mark, .hero__scroll, .hero__eyebrow, .hero__tags, .hero__ribbon').count()) === 0, 'no AD badge, scroll cue, hero eyebrow, labels or ribbon');
  check(await page.evaluate(() => [...document.querySelectorAll('.hero__actions .btn')].every((b) => b.getBoundingClientRect().height >= 60)), 'hero buttons are the larger size');
  check((await page.locator('#services .service').count()) === 4 && (await page.locator('#process .step').count()) === 4, 'services and process sections');

  // Skills band keeps moving under the pointer
  check((await page.locator('.marquee__track li').count()) >= allSkills.length, 'skills band');
  await page.locator('.marquee').hover();
  check(await page.evaluate(() => getComputedStyle(document.querySelector('.marquee__track')).animationPlayState === 'running'), 'skills band keeps moving on hover');

  // Skills: a glossy icon for every skill, and no motion on the cards
  check(await page.evaluate((n) => [...document.querySelectorAll('.skill-tile')].length === n && [...document.querySelectorAll('.skill-tile')].every((t) => t.querySelector('.skill-icon svg')), allSkills.length), `all ${allSkills.length} skills have their icon`);
  check(await page.evaluate(() => [...document.querySelectorAll('.skill-card')].every((c) => getComputedStyle(c).animationName === 'none' && getComputedStyle(c, '::after').animationName === 'none')), 'skill cards have no running animation');

  check(
    await page.evaluate(() => getComputedStyle(document.getElementById('contact')).backgroundColor === 'rgb(0, 0, 0)'),
    'contact is black in dark mode'
  );

  // Every project's logo loads, in the switcher and on the stage
  const logosOk = await page.evaluate(async () => {
    const imgs = [...document.querySelectorAll('.showcase img')];
    await Promise.all(imgs.map((i) => (i.loading = 'eager', i.decode().catch(() => null))));
    return imgs.length > 0 && imgs.every((i) => i.naturalWidth > 0);
  });
  check(logosOk, 'project logos and screenshots load');
  check(
    await page.evaluate((list) => list.every((p, i) => document.querySelectorAll('.showcase__tab img')[i]?.getAttribute('src') === (p.small || p.src)), projects.map((p) => p.logo)),
    'each project shows its own logo'
  );
  check((await headingsWithPeriod(page)).length === 0, 'no heading or label ends with a full stop');
  const arabicInEnglish = await page.evaluate(() => (document.body.innerText.match(/[\u0600-\u06FF]+/g) || []).join(' '));
  check(arabicInEnglish === '', `no Arabic text in the English version (${arabicInEnglish})`);
  check((await page.locator('.gallery, .showcase__screen, .lightbox').count()) === 0, 'no project previews section');
  await shot(page, 'home-dark-en');

  // Hero CTA reaches projects
  await page.click('.hero__actions .btn--primary');
  // Smooth scroll can start late under software WebGL, so wait for it to settle
  let projTop = Infinity;
  for (let i = 0; i < 25 && Math.abs(projTop) >= 140; i++) {
    await wait(200);
    projTop = await page.evaluate(() => document.getElementById('projects').getBoundingClientRect().top);
  }
  check(Math.abs(projTop) < 140, 'hero call to action scrolls to projects');

  // Showcase: one project on stage, switched by arrows, tabs and keys
  const tabs = page.locator('.showcase__tab');
  check((await tabs.count()) === projects.length, `${projects.length} projects in the switcher`);
  const stageTitle = () => page.locator('.showcase__stage h3').textContent();
  check((await stageTitle()).includes(projects[0].name.en), 'first project on stage');
  await shot(page, 'projects-en');
  await page.locator('.showcase__nav .round-btn').nth(1).click();
  check(await until(async () => (await stageTitle()).includes(projects[1].name.en)), 'next arrow shows the next project');
  await page.locator('.showcase__nav .round-btn').nth(0).click();
  await page.locator('.showcase__nav .round-btn').nth(0).click();
  check(await until(async () => (await stageTitle()).includes(projects[projects.length - 1].name.en)), 'previous arrow wraps to the last project');
  await tabs.nth(4).click();
  check(await until(async () => (await tabs.nth(4).getAttribute('aria-selected')) === 'true'), 'clicking a tab selects it');
  await page.keyboard.press('ArrowRight');
  check(await until(async () => (await tabs.nth(5).getAttribute('aria-selected')) === 'true'), 'arrow keys move between projects');
  await shot(page, 'projects-en-mizan');

  // The floating bar: six links, and it takes you to the section
  check((await page.locator('.header .dock__link').count()) === 6, 'navigation bar has six links, in the header');
  check(await page.evaluate(() => document.querySelector('.dock__list').getBoundingClientRect().top < 100), 'navigation bar sits at the top');
  await page.locator('.dock__link[href="/#skills"]').click();
  check(await until(() => page.evaluate(() => Math.abs(document.getElementById('skills').getBoundingClientRect().top) < 140)), 'navigation bar scrolls to a section');
  check(await until(async () => (await page.locator('.dock__link[href="/#skills"]').getAttribute('aria-current')) === 'location'), 'navigation bar marks the current section');

  // Contact links
  for (const link of links) {
    const a = page.locator(`.contact__list a[href="${link.url}"]`);
    check((await a.count()) === 1 && (await a.getAttribute('target')) === '_blank', `contact link ${link.label}`);
  }
  check((await page.locator(`.footer__social a`).count()) === links.length, `footer has the ${links.length} links`);
  check((await page.locator('a[href*="fiverr"]').count()) === 0, 'no Fiverr link');

  // Theme toggle persists
  await page.click('.theme-btn');
  check((await page.getAttribute('html', 'data-theme')) === 'light', 'theme toggle switches to light');
  await page.reload({ waitUntil: 'networkidle' });
  check((await page.getAttribute('html', 'data-theme')) === 'light', 'chosen theme survives reload');
  check(
    await page.evaluate(() => getComputedStyle(document.getElementById('contact')).backgroundColor === 'rgb(255, 255, 255)'),
    'contact is white in light mode'
  );
  await page.evaluate(() => window.scrollTo(0, 0));
  await wait(1500);
  await shot(page, 'home-light-en');

  // Arabic
  await page.click('.lang-btn');
  await wait(600);
  check((await page.getAttribute('html', 'dir')) === 'rtl' && (await page.getAttribute('html', 'lang')) === 'ar', 'Arabic switches to RTL');
  check((await headingsWithPeriod(page)).length === 0, 'no Arabic heading ends with a full stop');
  const latinNames = await page.evaluate(() =>
    [...document.querySelectorAll('.showcase__tab-name, .project-title, .service__project, .skill-card__title, .section-title, .contact-link__label, .eyebrow')]
      .map((el) => el.textContent.trim())
      .filter((t) => /[A-Za-z]/.test(t))
  );
  check(latinNames.length === 0, `no English names in the Arabic version (${latinNames.join(' | ')})`);
  check((await overflow(page)) <= 0, 'no horizontal overflow in Arabic');
  await wait(800);
  await shot(page, 'home-light-ar');
  await page.locator('#projects').scrollIntoViewIfNeeded();
  await wait(900);
  const tabsAr = page.locator('.showcase__tab');
  await tabsAr.nth(0).click();
  await page.keyboard.press('ArrowLeft');
  check(await until(async () => (await tabsAr.nth(1).getAttribute('aria-selected')) === 'true'), 'in Arabic the left arrow key moves forward');
  await shot(page, 'projects-ar');
  check(errors.length === 0, `no console errors on home (${errors.join(' | ')})`);
  await context.close();
}

// ---------- Project pages ----------
console.log('Project pages');
for (const project of projects) {
  const { context, page, errors } = await fresh(1440, 900, { colorScheme: 'light' });
  await page.goto(`${BASE}/projects/${project.slug}`, { waitUntil: 'networkidle' });
  await wait(700);
  const title = await page.locator('h1').textContent();
  check(title.includes(project.name.ar) || (project.name.en && title.includes(project.name.en)), `${project.slug}: title`);
  check((await page.locator('.feature-list li').count()) === project.features.en.length, `${project.slug}: features`);
  check((await page.locator('.tech-list li').count()) === project.tech.length, `${project.slug}: technologies`);
  if (project.live) {
    const live = page.locator(`a[href="${project.live}"]`);
    check((await live.count()) >= 1 && (await live.first().getAttribute('target')) === '_blank', `${project.slug}: live site button`);
  }
  const broken = await page.evaluate(async () => {
    const imgs = [...document.querySelectorAll('img')];
    await Promise.all(imgs.map((i) => (i.loading = 'eager', i.decode().catch(() => null))));
    return imgs.filter((i) => !i.naturalWidth).map((i) => i.src);
  });
  check(broken.length === 0, `${project.slug}: all images load ${broken.join(' ')}`);
  check((await page.locator('.gallery, .lightbox, .project-hero__screen, .project-hero__phone').count()) === 0, `${project.slug}: no previews section`);
  check((await headingsWithPeriod(page)).length === 0, `${project.slug}: no heading ends with a full stop`);
  if (project.slug === 'fatih' || project.slug === 'yaqeen') {
    await page.evaluate(() => window.scrollTo(0, 0));
    await shot(page, `project-${project.slug}`);
  }
  check(errors.length === 0, `${project.slug}: no console errors (${errors.join(' | ')})`);
  await context.close();
}

// Card click opens the detail page and back link returns
{
  const { context, page } = await fresh(1440, 900);
  await page.goto(`${BASE}/#projects`, { waitUntil: 'networkidle' });
  await wait(800);
  await page.locator('.showcase__tab').nth(1).click();
  await wait(400);
  await page.locator('.showcase__actions .btn--primary').click();
  await page.waitForURL(/projects\/malik/);
  check(true, 'view project opens its page');
  await page.click('.back-link');
  await page.waitForURL((u) => u.pathname === '/');
  // The view transition swaps the page in after the URL changes
  const landed = await until(() =>
    page.evaluate(() => {
      const el = document.getElementById('projects');
      return !!el && Math.abs(el.getBoundingClientRect().top) < 140;
    })
  );
  check(landed, 'back link returns to the projects section');
  await page.goto(`${BASE}/#services`, { waitUntil: 'networkidle' });
  await wait(600);
  await page.locator('.service__project[href="/projects/yaqeen"]').click();
  await page.waitForURL(/projects\/yaqeen/);
  check(true, 'service links open their project');
  await page.locator('.dock__link[href="/services"]').click();
  await page.waitForURL(/\/services$/);
  check((await page.locator('.editor__tab').count()) === 4, 'services page shows four files');
  await page.locator('.editor__tab').nth(2).click();
  check(await until(async () => (await page.locator('.editor__path').textContent()).includes('stores.jsx')), 'picking a file opens it');
  check((await page.locator('.code .tok-link').count()) >= 1, 'services link to their projects');
  check((await page.locator('.dock__link[href="/services"]').getAttribute('aria-current')) === 'page', 'navigation bar marks the services page');
  await page.goto(`${BASE}/projects/nothing`, { waitUntil: 'networkidle' });
  check((await page.locator('.not-found').count()) === 1, 'unknown project shows 404');
  await context.close();
}

// ---------- Responsive ----------
console.log('Responsive');
const SIZES = [
  [360, 740],
  [390, 844],
  [667, 375],
  [844, 390],
  [768, 1024],
  [1024, 768],
  [1280, 800],
  [1920, 1080],
  [2560, 1440]
];
for (const [w, h] of SIZES) {
  for (const lang of ['en', 'ar']) {
    const phone = w < 768 || h < 500;
    const { context, page } = await fresh(w, h, { colorScheme: 'dark', isMobile: phone, hasTouch: phone, deviceScaleFactor: phone ? 2 : 1 });
    await context.addInitScript((l) => localStorage.setItem('ad-lang', l), lang);
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await wait(600);
    check((await overflow(page)) <= 0, `${w}×${h} ${lang}: home has no horizontal overflow`);
    check(await page.evaluate(() => {
      const r = document.querySelector('.dock__list').getBoundingClientRect();
      return r.left >= 0 && r.right <= innerWidth && r.top < 140;
    }), `${w}×${h} ${lang}: navigation bar fits the screen`);
    check(await page.evaluate(() => {
      const r = document.querySelector('.portrait-wrap').getBoundingClientRect();
      return r.width > 120 && r.left >= -40 && r.right <= innerWidth + 40;
    }), `${w}×${h} ${lang}: portrait fits`);
    if (w === 390) {
      await wait(1200);
      await shot(page, `phone-${lang}`);
      await page.locator('#projects').scrollIntoViewIfNeeded();
      await wait(800);
      await shot(page, `phone-projects-${lang}`);
    }
    await page.goto(`${BASE}/services`, { waitUntil: 'networkidle' });
    await wait(300);
    check((await overflow(page)) <= 0, `${w}×${h} ${lang}: services page has no horizontal overflow`);
    await page.goto(`${BASE}/projects/osman`, { waitUntil: 'networkidle' });
    await wait(400);
    check((await overflow(page)) <= 0, `${w}×${h} ${lang}: project page has no horizontal overflow`);
    // The longest name, صلاح الدين الأيوبي, must stay inside the screen
    await page.goto(`${BASE}/projects/saladin`, { waitUntil: 'networkidle' });
    const fits = await page.evaluate(() => {
      const r = document.querySelector('h1').getBoundingClientRect();
      return r.left >= 0 && r.right <= innerWidth;
    });
    check(fits, `${w}×${h} ${lang}: longest project name fits`);
    if (w === 390) await shot(page, `phone-project-${lang}`);
    await context.close();
  }
}

// ---------- Reduced motion ----------
{
  const { context, page, errors } = await fresh(1280, 800, { reducedMotion: 'reduce' });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await wait(800);
  const hidden = await page.evaluate(() => [...document.querySelectorAll('[data-reveal]')].filter((el) => getComputedStyle(el).opacity === '0').length);
  check(hidden === 0, 'reduced motion shows everything without reveals');
  check(
    await page.locator('.portrait img').isVisible(),
    'reduced motion shows the portrait'
  );
  check(errors.length === 0, `reduced motion has no errors (${errors.join(' | ')})`);
  await context.close();
}

await browser.close();
console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  failures.forEach((f) => console.log(`  ✗ ${f}`));
  process.exitCode = 1;
}
