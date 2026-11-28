import { links } from '../data/profile';
import { usePreferences } from '../i18n/Preferences';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { ArrowUp, socialIcons } from './Icons';

export function Footer() {
  const { t } = usePreferences();
  const reduced = useReducedMotion();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__line">
          <span>{t.footer.line}</span>
          <span className="footer__year" dir="ltr">© {new Date().getFullYear()}</span>
        </p>
        <ul className="footer__social">
          {links.map((link) => {
            const Icon = socialIcons[link.id];
            return (
              <li key={link.id}>
                <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={`${link.label} (${t.contact.open})`} title={link.label}>
                  <Icon />
                </a>
              </li>
            );
          })}
        </ul>
        <button type="button" className="footer__top" onClick={() => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })}>
          {t.footer.top}
          <ArrowUp />
        </button>
      </div>
    </footer>
  );
}
