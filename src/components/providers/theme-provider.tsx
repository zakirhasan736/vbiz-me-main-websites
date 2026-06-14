'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

type Theme = 'midnight' | 'ocean';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'midnight',
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('midnight');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('vbizme-theme');
    if (saved === 'ocean' || saved === 'midnight') {
      setThemeState(saved);
    }
    setMounted(true);
  }, []);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    localStorage.setItem('vbizme-theme', next);
  };

  useEffect(() => {
    if (!mounted) return;
    const body = document.body;
    body.classList.remove('theme-midnight', 'theme-ocean');
    body.classList.add(theme === 'ocean' ? 'theme-ocean' : 'theme-midnight');
  }, [theme, mounted]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
