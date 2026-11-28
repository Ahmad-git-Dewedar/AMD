import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePreferences } from '../i18n/Preferences';
import { MoonIcon, SunIcon } from './Icons';
import { Dock } from './Dock';

/** The top bar: name, the icon navigation in the middle, then language and theme */
export function Header() {
  const { t, theme, toggleTheme, toggleLang, lang } = usePreferences();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`header${scrolled ? ' is-scrolled' : ''}`}>
      <a className="skip-link" href="#main">{t.skip}</a>
      <div className="header__inner container">
        <Link to="/" className="brand" aria-label={lang === 'ar' ? 'أحمد دويدار، الرئيسية' : 'Ahmad Dewedar, home'}>
          <span className="brand__name">{lang === 'ar' ? 'أحمد دويدار' : 'Ahmad Dewedar'}</span>
        </Link>

        <Dock />

        <div className="header__tools">
          <button type="button" className="chip-btn lang-btn" onClick={toggleLang} aria-label={t.lang.aria}>
            {t.lang.label}
          </button>
          <button
            type="button"
            className="icon-btn theme-btn"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t.theme.toLight : t.theme.toDark}
            title={theme === 'dark' ? t.theme.toLight : t.theme.toDark}
          >
            <span className="theme-btn__icon" key={theme}>{theme === 'dark' ? <SunIcon /> : <MoonIcon />}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
