/** Inline icons. They inherit currentColor and are hidden from screen readers */
const base = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': true, focusable: false };
const stroke = { stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };

export const ArrowIcon = ({ className = '' }) => (
  <svg {...base} className={`icon icon--arrow ${className}`}>
    <path d="M5 12h14M13 6l6 6-6 6" {...stroke} />
  </svg>
);

export const ArrowUpRight = ({ className = '' }) => (
  <svg {...base} className={`icon ${className}`}>
    <path d="M7 17 17 7M9 7h8v8" {...stroke} />
  </svg>
);

export const ArrowUp = () => (
  <svg {...base} className="icon">
    <path d="M12 19V5M6 11l6-6 6 6" {...stroke} />
  </svg>
);

export const SunIcon = () => (
  <svg {...base} className="icon">
    <circle cx="12" cy="12" r="4" {...stroke} />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" {...stroke} />
  </svg>
);

export const MoonIcon = () => (
  <svg {...base} className="icon">
    <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" {...stroke} />
  </svg>
);

export const MenuIcon = () => (
  <svg {...base} className="icon">
    <path d="M4 8h16M4 16h16" {...stroke} />
  </svg>
);

export const CloseIcon = () => (
  <svg {...base} className="icon">
    <path d="M6 6l12 12M18 6 6 18" {...stroke} />
  </svg>
);

export const LinkedInIcon = () => (
  <svg {...base} className="icon">
    <path fill="currentColor" d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V21h-4v-4.98c0-1.19-.02-2.72-1.66-2.72-1.66 0-1.92 1.3-1.92 2.63V21h-4V9.75Z" />
  </svg>
);

export const GitHubIcon = () => (
  <svg {...base} className="icon">
    <path fill="currentColor" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
  </svg>
);


export const YouTubeIcon = () => (
  <svg {...base} className="icon">
    <path fill="currentColor" d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.27 5 12 5 12 5s-6.27 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.73 19 12 19 12 19s6.27 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z" />
  </svg>
);

export const socialIcons = {
  linkedin: LinkedInIcon,
  github: GitHubIcon,
  youtube: YouTubeIcon
};

/** Filled icons for the floating navigation bar, in the style of the reference */
const solid = { width: 22, height: 22, viewBox: '0 0 24 24', 'aria-hidden': true, focusable: false, fill: 'currentColor' };

export const HomeIcon = () => (
  <svg {...solid} className="icon">
    <path d="M11.3 3.3a1 1 0 0 1 1.4 0l8 7.6c.6.6.2 1.6-.7 1.6H19v7a1.5 1.5 0 0 1-1.5 1.5H15v-5.5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1V21H6.5A1.5 1.5 0 0 1 5 19.5v-7H4c-.9 0-1.3-1-.7-1.6z" />
  </svg>
);

export const GridIcon = () => (
  <svg {...solid} className="icon">
    <rect x="3.5" y="3.5" width="7.5" height="7.5" rx="2" />
    <rect x="13" y="3.5" width="7.5" height="7.5" rx="2" />
    <rect x="3.5" y="13" width="7.5" height="7.5" rx="2" />
    <rect x="13" y="13" width="7.5" height="7.5" rx="2" />
  </svg>
);

export const CodeIcon = () => (
  <svg {...solid} className="icon" fill="none">
    <path d="M8.5 7 3.5 12l5 5M15.5 7l5 5-5 5M13.4 4.5l-2.8 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const PersonIcon = () => (
  <svg {...solid} className="icon">
    <circle cx="12" cy="7.5" r="4" />
    <path d="M4 19.5c0-3.6 3.6-6 8-6s8 2.4 8 6V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
  </svg>
);

export const LinesIcon = () => (
  <svg {...solid} className="icon" fill="none">
    <path d="M4 6.5h16M4 12h11M4 17.5h7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

export const MailIcon = () => (
  <svg {...solid} className="icon">
    <path d="M4.5 5h15A2.5 2.5 0 0 1 22 7.5v.3l-10 6.1L2 7.8v-.3A2.5 2.5 0 0 1 4.5 5z" />
    <path d="M2 10.1v6.4A2.5 2.5 0 0 0 4.5 19h15a2.5 2.5 0 0 0 2.5-2.5v-6.4l-9.5 5.8a1 1 0 0 1-1 0z" />
  </svg>
);
