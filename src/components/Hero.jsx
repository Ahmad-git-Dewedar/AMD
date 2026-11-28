import { useEffect, useRef } from 'react';
import { usePreferences } from '../i18n/Preferences';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { ArrowIcon } from './Icons';
import { SkillIcon } from './SkillIcon';

/** The languages that circle the photo */
const LANGUAGES = ['HTML', 'CSS', 'JavaScript', 'Python', 'Java'];

export function Hero() {
  const { t, lang } = usePreferences();
  const reduced = useReducedMotion();
  const sectionRef = useRef(null);

  // Scroll progress drives the copy fade
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const h = sectionRef.current?.offsetHeight || window.innerHeight;
        const p = Math.min(1, Math.max(0, window.scrollY / h));
        sectionRef.current?.style.setProperty('--hero-progress', p.toFixed(3));
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    history.replaceState(null, '', `#${id}`);
  };

  return (
    <section className="hero" ref={sectionRef} aria-labelledby="hero-title">
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__grid container">
        <div className="hero__copy">
          <h1 className="hero__title" id="hero-title">
            <span className="hero__line"><span>{t.hero.first}</span></span>
            <span className="hero__line hero__line--outline"><span>{t.hero.last}</span></span>
          </h1>
          <p className="hero__role">
            <span className="hero__role-rule" aria-hidden="true" />
            {t.hero.role}
          </p>
          <p className="hero__intro">{t.hero.intro}</p>
          <div className="hero__actions">
            <a href="#projects" className="btn btn--primary" onClick={scrollTo('projects')}>
              <span>{t.hero.cta}</span>
              <ArrowIcon />
            </a>
            <a href="#contact" className="btn btn--ghost" onClick={scrollTo('contact')}>
              <span>{t.hero.secondary}</span>
            </a>
          </div>
        </div>

        <div className="hero__visual">
          <div className="portrait-wrap">
            <figure className="portrait">
              <img
                src="/me/ahmad-960.webp"
                srcSet="/me/ahmad-560.webp 560w, /me/ahmad-960.webp 960w"
                sizes="(max-width: 960px) 70vw, 520px"
                alt={lang === 'ar' ? 'أحمد دويدار' : 'Ahmad Dewedar'}
                width="960"
                height="960"
                fetchPriority="high"
                decoding="async"
              />
            </figure>
            <ul className="orbit" aria-label={t.hero.languages}>
              {LANGUAGES.map((name, i) => (
                <li key={name} className="orbit__item" style={{ '--i': i, '--n': LANGUAGES.length }} title={name}>
                  <SkillIcon name={name} />
                  <span className="visually-hidden">{name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
