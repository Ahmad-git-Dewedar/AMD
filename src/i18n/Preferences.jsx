import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { strings } from './strings';

const PreferencesContext = createContext(null);

const read = (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};
const write = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage can be blocked; the choice still applies for this visit */
  }
};

const darkQuery = () => window.matchMedia('(prefers-color-scheme: dark)');

/**
 * Language and theme. Theme follows the device until the visitor picks one,
 * then that choice is remembered. The inline script in index.html applies
 * both before first paint
 */
export function PreferencesProvider({ children }) {
  const [lang, setLang] = useState(() => (read('ad-lang') === 'ar' ? 'ar' : 'en'));
  const [chosenTheme, setChosenTheme] = useState(() => {
    const saved = read('ad-theme');
    return saved === 'light' || saved === 'dark' ? saved : null;
  });
  const [deviceDark, setDeviceDark] = useState(() => darkQuery().matches);

  useEffect(() => {
    const query = darkQuery();
    const onChange = (e) => setDeviceDark(e.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const theme = chosenTheme ?? (deviceDark ? 'dark' : 'light');

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
      meta.content = theme === 'dark' ? '#07080a' : '#ffffff';
    });
  }, [theme]);

  const toggleLang = useCallback(() => {
    setLang((current) => {
      const next = current === 'ar' ? 'en' : 'ar';
      write('ad-lang', next);
      return next;
    });
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    write('ad-theme', next);
    setChosenTheme(next);
  }, [theme]);

  const value = useMemo(
    () => ({ lang, t: strings[lang], isRTL: lang === 'ar', theme, toggleLang, toggleTheme }),
    [lang, theme, toggleLang, toggleTheme]
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export const usePreferences = () => useContext(PreferencesContext);
