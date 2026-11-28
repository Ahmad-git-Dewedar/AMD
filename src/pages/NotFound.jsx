import { Link } from 'react-router-dom';
import { usePreferences } from '../i18n/Preferences';
import { ArrowIcon } from '../components/Icons';

export function NotFound() {
  const { t } = usePreferences();
  return (
    <section className="not-found container">
      <p className="not-found__code" dir="ltr">404</p>
      <h1 className="section-title">{t.project.notFound}</h1>
      <Link to="/" className="btn btn--primary">
        <span>{t.project.home}</span>
        <ArrowIcon />
      </Link>
    </section>
  );
}
