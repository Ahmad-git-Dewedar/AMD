import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { usePreferences } from '../i18n/Preferences';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { CodeIcon, GridIcon, HomeIcon, LinesIcon, MailIcon, PersonIcon } from './Icons';

/** The order of the reference bar: home first, contact last */
const ITEMS = [
  { id: 'top', Icon: HomeIcon },
  { id: 'projects', Icon: GridIcon },
  { id: 'skills', Icon: CodeIcon },
  { id: 'about', Icon: PersonIcon },
  { id: 'services', Icon: LinesIcon },
  { id: 'contact', Icon: MailIcon }
];
/** Sections tracked on the home page; services has its own page */
const SECTIONS = ['projects', 'skills', 'about', 'contact'];

/**
 * The icon navigation in the header. On the home page it follows the section in view
 * and scrolls smoothly; elsewhere its links lead back to the matching section. The
 * services icon opens the services page
 */
export function Dock() {
  const { t } = usePreferences();
  const reduced = useReducedMotion();
  const { pathname } = useLocation();
  const onHome = pathname === '/';
  const [active, setActive] = useState('top');

  useEffect(() => {
    if (!onHome) return undefined;
    const update = () => {
      // Of the sections whose top has passed a third of the way down the screen, the
      // one nearest that line
      const line = window.innerHeight / 3;
      let current = 'top';
      let nearest = -Infinity;
      for (const id of SECTIONS) {
        const top = document.getElementById(id)?.getBoundingClientRect().top ?? Infinity;
        if (top <= line && top > nearest) {
          nearest = top;
          current = id;
        }
      }
      setActive(current);
    };
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [onHome]);

  const go = (id) => (e) => {
    if (!onHome || id === 'services') return;
    e.preventDefault();
    const behavior = reduced ? 'auto' : 'smooth';
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior });
      history.replaceState(null, '', '/');
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior, block: 'start' });
      history.replaceState(null, '', `#${id}`);
    }
  };

  return (
    <nav className="dock" aria-label={t.nav.label}>
      <ul className="dock__list">
        {ITEMS.map(({ id, Icon }) => {
          const label = t.nav[id];
          const current = id === 'services' ? pathname === '/services' : onHome && active === id;
          const to = id === 'top' ? '/' : id === 'services' ? '/services' : { pathname: '/', hash: `#${id}` };
          return (
            <li key={id}>
              <Link
                to={to}
                viewTransition={id === 'services' || undefined}
                className={`dock__link${current ? ' is-active' : ''}`}
                aria-label={label}
                aria-current={current ? (id === 'services' ? 'page' : 'location') : undefined}
                onClick={go(id)}
              >
                <Icon />
                <span className="dock__tip" aria-hidden="true">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
