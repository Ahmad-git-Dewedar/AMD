import { usePreferences } from '../i18n/Preferences';
import { nameOf } from '../data/projects';

/** A project's name in the site's normal type, in the current language only */
export function ProjectTitle({ project, as: Tag = 'h3', size = 'showcase', id }) {
  const { lang } = usePreferences();
  return (
    <Tag className={`project-title project-title--${size}`} id={id}>
      {nameOf(project, lang)}
    </Tag>
  );
}
