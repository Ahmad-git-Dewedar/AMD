import {
  siCss,
  siFfmpeg,
  siFramer,
  siGit,
  siHtml5,
  siJavascript,
  siN8n,
  siNodedotjs,
  siNpm,
  siPython,
  siReact,
  siReactrouter,
  siSvg,
  siTailwindcss,
  siTypescript,
  siVite
} from 'simple-icons';
import { Accessibility, BrainCircuit, Clapperboard, Coffee, Languages, MonitorSmartphone, Mouse, SunMoon } from 'lucide-react';

/**
 * Skill and technology icons. Brands use their official logos from Simple Icons
 * (CC0); general skills use Lucide icons (ISC). Each sits on a soft tile tinted
 * with its own colour
 */

const BRANDS = {
  HTML: siHtml5,
  CSS: siCss,
  JavaScript: siJavascript,
  Python: siPython,
  React: siReact,
  Tailwind: siTailwindcss,
  Vite: siVite,
  Git: siGit,
  npm: siNpm,
  'Node.js': siNodedotjs,
  n8n: siN8n,
  TypeScript: siTypescript,
  SVG: siSvg,
  'Framer Motion': siFramer,
  ffmpeg: siFfmpeg,
  'React Router': siReactrouter
};

/** Java's official mark is black, so a coffee cup in Java's orange stands in for it */
const GENERAL = {
  Java: [Coffee, '#F89820'],
  AI: [BrainCircuit, '#8B5CF6'],
  'Responsive Design': [MonitorSmartphone, '#3B82F6'],
  'CSS Animation': [Clapperboard, '#14B8A6'],
  'Scroll-driven Animations': [Mouse, '#6366F1'],
  'Arabic (RTL)': [Languages, '#10B981'],
  Accessibility: [Accessibility, '#2563EB'],
  'Light/Dark Mode': [SunMoon, '#F59E0B']
};

export const hasSkillIcon = (name) => name in BRANDS || name in GENERAL;

export function SkillIcon({ name, className = '' }) {
  const brand = BRANDS[name];
  if (brand) {
    const color = `#${brand.hex}`;
    return (
      <span className={`skill-icon ${className}`} style={{ '--tint': color }} aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <path d={brand.path} fill={color} />
        </svg>
      </span>
    );
  }
  const general = GENERAL[name];
  if (!general) return null;
  const [Icon, color] = general;
  return (
    <span className={`skill-icon ${className}`} style={{ '--tint': color }} aria-hidden="true">
      <Icon color={color} strokeWidth={1.9} />
    </span>
  );
}
