import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { nameOf, projects, techLabel } from '../data/projects';
import { usePreferences } from '../i18n/Preferences';
import { ArrowIcon, ArrowUpRight } from './Icons';
import { ProjectArt } from './ProjectArt';
import { ProjectTitle } from './ProjectTitle';
import { SectionHead } from './Sections';

const pad = (n) => String(n).padStart(2, '0');

/**
 * The projects, one at a time on a stage: the project's logo as artwork and the
 * essentials beside it. A row of
 * logo tiles below switches between them, as do the arrows, the arrow keys and a swipe
 */
export function Projects() {
  const { t, lang, isRTL } = usePreferences();
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const tabsRef = useRef([]);
  const swipe = useRef(null);
  const project = projects[active];
  const count = projects.length;

  const select = (i, focus = false) => {
    const next = (i + count) % count;
    setDirection(next > active || (active === count - 1 && next === 0) ? 1 : -1);
    setActive(next);
    if (focus) tabsRef.current[next]?.focus();
  };

  // Keep the active tile in view in the row, without moving the page
  useEffect(() => {
    const tab = tabsRef.current[active];
    const rail = tab?.parentElement;
    if (!tab || !rail) return;
    const left = tab.offsetLeft - (rail.clientWidth - tab.offsetWidth) / 2;
    rail.scrollTo({ left, behavior: 'smooth' });
  }, [active]);

  // Warm the next project's images so switching feels instant
  useEffect(() => {
    const next = projects[(active + 1) % count];
    [next.logo.src].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [active, count]);

  const onTabKey = (e) => {
    const forward = isRTL ? 'ArrowLeft' : 'ArrowRight';
    const back = isRTL ? 'ArrowRight' : 'ArrowLeft';
    if (e.key === forward) select(active + 1, true);
    else if (e.key === back) select(active - 1, true);
    else if (e.key === 'Home') select(0, true);
    else if (e.key === 'End') select(count - 1, true);
    else return;
    e.preventDefault();
  };

  // A horizontal swipe on the stage moves to the neighbouring project
  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse') return;
    swipe.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e) => {
    const start = swipe.current;
    swipe.current = null;
    if (!start) return;
    const dx = e.clientX - start.x;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(e.clientY - start.y)) return;
    const towardStart = isRTL ? dx > 0 : dx < 0;
    select(active + (towardStart ? 1 : -1));
  };

  return (
    <section className="section projects" id="projects" aria-labelledby="projects-title">
      <div className="container">
        <SectionHead id="projects" kicker={t.projects.kicker} title={t.projects.title} lead={t.projects.lead} />

        <div className="showcase" style={{ '--accent': project.accent }} data-reveal>
          <div
            key={project.slug}
            className={`showcase__stage${direction < 0 ? ' is-back' : ''}`}
            role="tabpanel"
            id="showcase-panel"
            aria-labelledby={`showcase-tab-${project.slug}`}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => (swipe.current = null)}
          >
            <Link to={`/projects/${project.slug}`} className="showcase__visual" viewTransition tabIndex={-1} aria-hidden="true">
              <ProjectArt project={project} lang={lang} className="showcase__art" style={{ viewTransitionName: `media-${project.slug}` }} eager />
            </Link>

            <div className="showcase__info">
              <p className="showcase__meta">
                <span className="showcase__count" dir="ltr">
                  {pad(active + 1)} <span>/ {pad(count)}</span>
                </span>
                <span className="showcase__type">{project.type[lang]}</span>
              </p>
              <ProjectTitle project={project} as="h3" size="showcase" />
              <p className="showcase__summary">{project.summary[lang]}</p>
              <ul className="showcase__tech" aria-label={t.project.tech}>
                {project.tech.map((tech) => (
                  <li key={tech}>{techLabel(tech, lang)}</li>
                ))}
              </ul>
              <div className="showcase__actions">
                <Link to={`/projects/${project.slug}`} className="btn btn--primary" viewTransition>
                  <span>{t.projects.view}</span>
                  <ArrowIcon />
                </Link>
                {project.live && (
                  <a className="btn btn--ghost" href={project.live} target="_blank" rel="noopener noreferrer">
                    <span>{t.project.live}</span>
                    <ArrowUpRight />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="showcase__nav">
            <button type="button" className="round-btn round-btn--prev" onClick={() => select(active - 1)} aria-label={t.projects.prev}>
              <ArrowIcon />
            </button>
            <div className="showcase__rail" role="tablist" aria-label={t.projects.title}>
              {projects.map((p, i) => (
                <button
                  key={p.slug}
                  ref={(el) => (tabsRef.current[i] = el)}
                  type="button"
                  role="tab"
                  id={`showcase-tab-${p.slug}`}
                  aria-selected={i === active}
                  aria-controls="showcase-panel"
                  tabIndex={i === active ? 0 : -1}
                  className={`showcase__tab${i === active ? ' is-active' : ''}`}
                  style={{ '--accent': p.accent }}
                  onClick={() => select(i)}
                  onKeyDown={onTabKey}
                >
                  <ProjectArt project={p} lang={lang} small className="showcase__thumb" />
                  <span className="showcase__tab-name">{nameOf(p, lang)}</span>
                </button>
              ))}
            </div>
            <button type="button" className="round-btn" onClick={() => select(active + 1)} aria-label={t.projects.next}>
              <ArrowIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
