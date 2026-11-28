import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { findProject, nameOf, projects, techLabel } from '../data/projects';
import { usePreferences } from '../i18n/Preferences';
import { ArrowIcon, ArrowUpRight } from '../components/Icons';
import { ProjectTitle } from '../components/ProjectTitle';
import { ProjectArt } from '../components/ProjectArt';
import { SkillIcon, hasSkillIcon } from '../components/SkillIcon';
import { NotFound } from './NotFound';

export function ProjectPage() {
  const { slug } = useParams();
  const { t, lang } = usePreferences();
  const project = findProject(slug);

  useEffect(() => {
    if (!project) return undefined;
    const previous = document.title;
    document.title = `${nameOf(project, lang)} · ${lang === 'ar' ? 'أحمد دويدار' : 'Ahmad Dewedar'}`;
    return () => {
      document.title = previous;
    };
  }, [project, lang]);

  if (!project) return <NotFound />;

  const index = projects.indexOf(project);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <article className={`project-page project-page--${project.kind}`} style={{ '--accent': project.accent }}>
      <header className="project-hero">
        <div className="container project-hero__grid">
          <div className="project-hero__copy">
            <Link to={{ pathname: '/', hash: '#projects' }} className="back-link" viewTransition>
              <ArrowIcon className="icon--back" />
              {t.project.back}
            </Link>
            <p className="showcase__meta">
              <span className="showcase__count" dir="ltr">
                {String(index + 1).padStart(2, '0')} <span>/ {String(projects.length).padStart(2, '0')}</span>
              </span>
              <span className="showcase__type">{project.type[lang]}</span>
            </p>
            <ProjectTitle project={project} as="h1" size="page" id="project-title" />
            <p className="project-hero__summary">{project.summary[lang]}</p>
            <div className="project-hero__actions">
              {project.live ? (
                <a className="btn btn--primary" href={project.live} target="_blank" rel="noopener noreferrer">
                  <span>{t.project.live}</span>
                  <ArrowUpRight />
                </a>
              ) : (
                <p className="status-pill">
                  <span className="status-pill__dot" aria-hidden="true" />
                  {t.project.noLive}
                </p>
              )}
            </div>
          </div>

          <div className="project-hero__visual">
            <ProjectArt project={project} lang={lang} className="project-hero__art" style={{ viewTransitionName: `media-${project.slug}` }} eager />
          </div>
        </div>
      </header>

      <div className="container project-body">
        <section className="project-block project-block--overview" aria-labelledby="overview-title">
          <h2 className="block-title" id="overview-title" data-reveal>{t.project.overview}</h2>
          <p className="project-overview" data-reveal style={{ '--d': 1 }}>{project.overview[lang]}</p>
        </section>

        <section className="project-block" aria-labelledby="features-title">
          <h2 className="block-title" id="features-title" data-reveal>{t.project.features}</h2>
          <ol className="feature-list">
            {project.features[lang].map((f, i) => (
              <li key={f} data-reveal style={{ '--d': i % 4 }}>
                <span className="feature-list__num" dir="ltr">{String(i + 1).padStart(2, '0')}</span>
                <span>{f}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="project-block" aria-labelledby="tech-title">
          <h2 className="block-title" id="tech-title" data-reveal>{t.project.tech}</h2>
          <ul className="tech-list">
            {project.tech.map((tech, i) => (
              <li key={tech} data-reveal style={{ '--d': i % 4 }}>
                {hasSkillIcon(tech) && <SkillIcon name={tech} />}
                {techLabel(tech, lang)}
              </li>
            ))}
          </ul>
        </section>


        <nav className="project-pager" aria-label={lang === 'ar' ? 'مشاريع أخرى' : 'More projects'}>
          <Link to={`/projects/${prev.slug}`} className="pager-link pager-link--prev" viewTransition style={{ '--accent': prev.accent }}>
            <ProjectArt project={prev} lang={lang} small className="pager-link__art" />
            <span className="pager-link__text">
              <span className="pager-link__label">
                <ArrowIcon className="icon--back" />
                {t.project.prev}
              </span>
              <ProjectTitle project={prev} as="span" size="pager" />
            </span>
          </Link>
          <Link to={`/projects/${next.slug}`} className="pager-link pager-link--next" viewTransition style={{ '--accent': next.accent }}>
            <span className="pager-link__text">
              <span className="pager-link__label">
                {t.project.next}
                <ArrowIcon />
              </span>
              <ProjectTitle project={next} as="span" size="pager" />
            </span>
            <ProjectArt project={next} lang={lang} small className="pager-link__art" />
          </Link>
        </nav>
      </div>

    </article>
  );
}
