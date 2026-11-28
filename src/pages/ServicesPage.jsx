import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { services } from '../data/profile';
import { findProject, nameOf } from '../data/projects';
import { usePreferences } from '../i18n/Preferences';
import { ArrowIcon } from '../components/Icons';
import { hasSkillIcon } from '../components/SkillIcon';

/** Brand tools used by the projects behind a service, at most five */
function stackOf(service) {
  const seen = new Set();
  for (const slug of service.projects) {
    for (const tech of findProject(slug).tech) {
      if (hasSkillIcon(tech)) seen.add(tech);
    }
  }
  return [...seen].slice(0, 5);
}

/** One line of code, built from coloured tokens */
const Line = ({ n, children }) => (
  <div className="code__line">
    <span className="code__num" aria-hidden="true">{n}</span>
    <span className="code__text">{children}</span>
  </div>
);
const K = ({ children }) => <span className="tok-key">{children}</span>;
const P = ({ children }) => <span className="tok-prop">{children}</span>;
const S = ({ children, lang }) => (
  <span className="tok-str" lang={lang} dir="auto">
    &quot;{children}&quot;
  </span>
);
const C = ({ children, lang }) => (
  <span className="tok-comment" lang={lang} dir="auto">
    {'// '}
    {children}
  </span>
);

/**
 * The services, shown as files in a code editor: tabs along the top, the list of
 * services at the side, and each service written out as a small object
 */
export function ServicesPage() {
  const { t, lang } = usePreferences();
  const [active, setActive] = useState(0);
  const tabsRef = useRef([]);
  const service = services[active];
  const ident = service.id === 'products' ? 'stores' : service.id;

  useEffect(() => {
    const previous = document.title;
    document.title = `${t.servicesPage.title} · ${lang === 'ar' ? 'أحمد دويدار' : 'Ahmad Dewedar'}`;
    return () => {
      document.title = previous;
    };
  }, [t, lang]);

  const select = (i, focus) => {
    const next = (i + services.length) % services.length;
    setActive(next);
    if (focus) tabsRef.current[next]?.focus();
  };

  // Tabs read left to right, like code, so the arrow keys do too
  const onKey = (e) => {
    if (e.key === 'ArrowRight') select(active + 1, true);
    else if (e.key === 'ArrowLeft') select(active - 1, true);
    else return;
    e.preventDefault();
  };

  const stack = stackOf(service);
  const delivers = service.delivers[lang];
  const projects = service.projects.map((slug) => findProject(slug));
  let n = 0;
  const line = () => ++n;

  return (
    <article className="services-page">
      <div className="container">
        <header className="services-page__head">
          <p className="eyebrow">
            <span className="eyebrow__dot" aria-hidden="true" />
            {t.servicesPage.kicker}
          </p>
          <h1 className="section-title">{t.servicesPage.title}</h1>
          <p className="section-lead">{t.servicesPage.lead}</p>
        </header>

        <div className="editor">
          <div className="editor__bar">
            <span className="editor__dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="editor__path" dir="ltr">~/ahmad/services/{service.file}</span>
          </div>

          <div className="editor__body">
            <nav className="editor__side" aria-label={t.servicesPage.files}>
              <ol>
                {services.map((s, i) => (
                  <li key={s.id}>
                    <button type="button" className={`editor__file${i === active ? ' is-active' : ''}`} onClick={() => select(i)} aria-current={i === active ? 'true' : undefined}>
                      <span className="editor__file-num" dir="ltr">0{i + 1}</span>
                      <span className="editor__file-text">
                        <span className="editor__file-title">{s.title[lang]}</span>
                        <span className="editor__file-name" dir="ltr">{s.file}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="editor__main">
              <div className="editor__tabs" role="tablist" aria-label={t.servicesPage.files} dir="ltr">
                {services.map((s, i) => (
                  <button
                    key={s.id}
                    ref={(el) => (tabsRef.current[i] = el)}
                    type="button"
                    role="tab"
                    id={`file-tab-${s.id}`}
                    aria-selected={i === active}
                    aria-controls="editor-code"
                    tabIndex={i === active ? 0 : -1}
                    className={`editor__tab${i === active ? ' is-active' : ''}`}
                    onClick={() => select(i)}
                    onKeyDown={onKey}
                  >
                    {s.file}
                  </button>
                ))}
              </div>

              <div className="code" id="editor-code" role="tabpanel" aria-labelledby={`file-tab-${service.id}`} key={service.id} dir="ltr">
                <Line n={line()}>
                  <C lang={lang}>{service.body[lang]}</C>
                </Line>
                <Line n={line()}>
                  <K>export const</K> <span className="tok-name">{ident}</span> = {'{'}
                </Line>
                <Line n={line()}>
                  {'  '}<P>name</P>: <S lang={lang}>{service.title[lang]}</S>,
                </Line>
                <Line n={line()}>
                  {'  '}<P>stack</P>: [
                  {stack.map((tool, i) => (
                    <span key={tool}>
                      <S>{tool}</S>
                      {i < stack.length - 1 && ', '}
                    </span>
                  ))}
                  ],
                </Line>
                <Line n={line()}>
                  {'  '}<P>delivers</P>: [
                </Line>
                {delivers.map((d) => (
                  <Line key={d} n={line()}>
                    {'    '}<S lang={lang}>{d}</S>,
                  </Line>
                ))}
                <Line n={line()}>{'  '}],</Line>
                <Line n={line()}>
                  {'  '}<P>projects</P>: [
                  {projects.map((p, i) => (
                    <span key={p.slug}>
                      <Link to={`/projects/${p.slug}`} className="tok-str tok-link" lang={lang} dir="auto" viewTransition>
                        &quot;{nameOf(p, lang)}&quot;
                      </Link>
                      {i < projects.length - 1 && ', '}
                    </span>
                  ))}
                  ],
                </Line>
                <Line n={line()}>{'};'}</Line>
              </div>
            </div>
          </div>
        </div>

        <div className="services-page__cta">
          <Link to={{ pathname: '/', hash: '#contact' }} className="btn btn--primary">
            <span>{t.servicesPage.cta}</span>
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </article>
  );
}
