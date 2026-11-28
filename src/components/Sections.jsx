import { Link } from 'react-router-dom';
import { usePreferences } from '../i18n/Preferences';
import { allSkills, links, services, skillGroups, skillName } from '../data/profile';
import { findProject, nameOf } from '../data/projects';
import { ArrowIcon, ArrowUpRight, socialIcons } from './Icons';
import { SkillIcon } from './SkillIcon';

export function SectionHead({ id, kicker, title, lead, children }) {
  return (
    <div className="section-head">
      <div className="section-head__text">
        <p className="eyebrow" data-reveal>
          <span className="eyebrow__dot" aria-hidden="true" />
          {kicker}
        </p>
        <h2 className="section-title" id={`${id}-title`} data-reveal style={{ '--d': 1 }}>
          {title}
        </h2>
        {lead && (
          <p className="section-lead" data-reveal style={{ '--d': 2 }}>
            {lead}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

/** About Ahmad himself: a photo beside a few lines in his own voice */
export function About() {
  const { t, lang } = usePreferences();
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="container about__grid">
        <figure className="about__photo" data-reveal>
          <img
            src="/me/ahmad-about-720.webp"
            srcSet="/me/ahmad-about-480.webp 480w, /me/ahmad-about-720.webp 720w"
            sizes="(max-width: 900px) 80vw, 420px"
            alt={lang === 'ar' ? 'أحمد دويدار' : 'Ahmad Dewedar'}
            width="720"
            height="860"
            loading="lazy"
            decoding="async"
          />
        </figure>
        <div className="about__text">
          <SectionHead id="about" kicker={t.about.kicker} title={t.about.title} />
          <div className="about__body">
            {t.about.body.map((p, i) => (
              <p key={i} data-reveal style={{ '--d': i + 1 }}>
                {p}
              </p>
            ))}
            <dl className="about__facts">
              {t.about.facts.map((f, i) => (
                <div key={f.label} className="fact" data-reveal style={{ '--d': i + 2 }}>
                  <dt className="fact__label">{f.label}</dt>
                  <dd className="fact__value">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  const { t, lang } = usePreferences();

  return (
    <section className="section skills" id="skills" aria-labelledby="skills-title">
      <div className="container">
        <SectionHead id="skills" kicker={t.skills.kicker} title={t.skills.title} lead={t.skills.lead} />
        <div className="skills__grid">
          {skillGroups.map((group, i) => (
            <article key={group.id} className="skill-card" data-reveal style={{ '--d': i }}>
              <div className="skill-card__head">
                <span className="skill-card__index" dir="ltr">0{i + 1}</span>
                <h3 className="skill-card__title">{group.title[lang]}</h3>
                <p className="skill-card__note">{group.note[lang]}</p>
              </div>
              <ul className="skill-card__list">
                {group.items.map((item) => (
                  <li key={item.id} className="skill-tile">
                    <SkillIcon name={item.id} />
                    <span className="skill-tile__name">{skillName(item, lang)}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** A band of skills that keeps moving, two rows in opposite directions */
export function Marquee() {
  const { t, lang } = usePreferences();
  const row = (reverse) => (
    <div className={`marquee__row${reverse ? ' marquee__row--reverse' : ''}`} dir="ltr">
      {[0, 1].map((copy) => (
        <ul key={copy} className="marquee__track" aria-hidden={copy === 1 || reverse ? 'true' : undefined}>
          {(reverse ? [...allSkills].reverse() : allSkills).map((skill) => (
            <li key={skill.id} lang={lang}>{skillName(skill, lang)}</li>
          ))}
        </ul>
      ))}
    </div>
  );
  return (
    <section className="marquee" aria-label={t.marquee}>
      {row(false)}
      {row(true)}
    </section>
  );
}

export function Services() {
  const { t, lang } = usePreferences();
  return (
    <section className="section services" id="services" aria-labelledby="services-title">
      <div className="container">
        <SectionHead id="services" kicker={t.services.kicker} title={t.services.title} lead={t.services.lead}>
          <Link to="/services" className="btn btn--ghost services__more" data-reveal style={{ '--d': 2 }} viewTransition>
            <span>{t.services.more}</span>
            <ArrowIcon />
          </Link>
        </SectionHead>
        <ol className="services__list">
          {services.map((service, i) => (
            <li key={service.id} className="service" data-reveal style={{ '--d': i }}>
              <span className="service__index" dir="ltr">0{i + 1}</span>
              <h3 className="service__title">{service.title[lang]}</h3>
              <p className="service__body">{service.body[lang]}</p>
              <p className="service__seen">
                <span>{t.services.seen}</span>
                {service.projects.map((slug) => {
                  const project = findProject(slug);
                  return (
                    <Link key={slug} to={`/projects/${slug}`} className="service__project" viewTransition>
                      {nameOf(project, lang)}
                    </Link>
                  );
                })}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Process() {
  const { t } = usePreferences();
  return (
    <section className="section process" id="process" aria-labelledby="process-title">
      <div className="container">
        <SectionHead id="process" kicker={t.process.kicker} title={t.process.title} lead={t.process.lead} />
        <div className="process__track">
          <span className="process__line" aria-hidden="true" />
          <ol className="process__steps">
            {t.process.steps.map((step, i) => (
              <li key={step.title} className="step" data-reveal style={{ '--d': i }}>
                <span className="step__dot" dir="ltr">0{i + 1}</span>
                <h3 className="step__title">{step.title}</h3>
                <p className="step__body">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const { t, lang } = usePreferences();
  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact__panel">
          <SectionHead id="contact" kicker={t.contact.kicker} title={t.contact.title} lead={t.contact.lead} />
          <ul className="contact__list">
            {links.map((link, i) => {
              const Icon = socialIcons[link.id];
              return (
                <li key={link.id} data-reveal style={{ '--d': i }}>
                  <a className={`contact-link contact-link--${link.id}`} href={link.url} target="_blank" rel="noopener noreferrer">
                    <span className="contact-link__icon">
                      <Icon />
                    </span>
                    <span className="contact-link__text">
                      <span className="contact-link__label">{lang === 'ar' ? link.labelAr : link.label}</span>
                      <span className="contact-link__note">{link.note[lang]}</span>
                    </span>
                    {/* Handles are Latin, so they show only in the English version */}
                    {lang === 'en' && <span className="contact-link__handle">{link.handle}</span>}
                    <ArrowUpRight className="contact-link__arrow" />
                    <span className="visually-hidden">({t.contact.open})</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
