// ThemeContext.js
import React, { createContext, useContext, useMemo, useRef } from 'react';
import { getTheme } from '../utility/theme';

const ThemeContext = createContext();

// Theme equality check function
const areThemesEqual = (prevTheme, nextTheme) => {
  return (
    prevTheme.meta.language === nextTheme.meta.language &&
    prevTheme.meta.mode === nextTheme.meta.mode
  );
};


export const ThemeProvider = ({ children, language = 'en', isDarkMode = false }) => {
  const previousThemeRef = useRef();
  
  const theme = useMemo(() => {
    console.log("step_1")
    const newTheme = getTheme({ language, isDarkMode });
    
    // Compare with previous theme
    if (previousThemeRef.current && areThemesEqual(previousThemeRef.current, newTheme)) {
      console.log("step_2")
      return previousThemeRef.current;
    }
    console.log("step_3")
    previousThemeRef.current = newTheme;
    return newTheme;
  }, [language, isDarkMode]);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

// Memoized useTheme hook
export const useTheme = () => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return theme;
};

// Optimized theme selector hook
export const useThemeSelector = (selector) => {
  const theme = useTheme();
  return useMemo(() => selector(theme), [theme, selector]);
};