'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

type Theme = 'midnight' | 'light' | 'ocean';

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

  useEffect(() => {
    const saved = localStorage.getItem('vbizme-theme');
    if (saved === 'midnight' || saved === 'light' || saved === 'ocean') {
      setThemeState(saved);
    }
  }, []);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    localStorage.setItem('vbizme-theme', next);
  };

  useEffect(() => {
    const body = document.body;
    body.classList.remove('theme-midnight', 'theme-ocean', 'theme-light');
    body.classList.add(
      theme === 'ocean' ? 'theme-ocean' : theme === 'light' ? 'theme-light' : 'theme-midnight',
    );
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
