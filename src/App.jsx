import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { About, Contact, Marquee, Process, Services, Skills } from './components/Sections';
import { Projects } from './components/Projects';
import { ProjectPage } from './pages/ProjectPage';
import { NotFound } from './pages/NotFound';
import { ServicesPage } from './pages/ServicesPage';
import { usePreferences } from './i18n/Preferences';
import { useReveal } from './hooks/useReveal';

function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Skills />
      <Projects />
      <Services />
      <Process />
      <Contact />
    </>
  );
}

/** Scroll to the hash target after navigation, or to the top for a new page */
function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    if (hash) {
      // Wait a frame so the target section exists after a route change
      const id = decodeURIComponent(hash.slice(1));
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'instant' }));
      return;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash, key]);
  return null;
}

export function App() {
  const location = useLocation();
  const { lang } = usePreferences();
  useReveal(`${location.pathname}-${lang}`);

  return (
    <>
      <ScrollManager />
      <Header />
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
