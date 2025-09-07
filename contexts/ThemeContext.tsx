import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';

interface Colors {
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
}

interface Theme {
  colors: Colors;
}

interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  toggleTheme: () => void;
}

const lightTheme: Theme = {
  colors: {
    primary: '#4F46E5',
    secondary: '#6B7280',
    accent: '#06B6D4',
    success: '#16A34A',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
    background: '#F9FAFB',
    surface: '#FFFFFF',
    text: '#0B0F14',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
  },
};

const darkTheme: Theme = {
  colors: {
    primary: '#6366F1',
    secondary: '#9CA3AF',
    accent: '#22D3EE',
    success: '#22C55E',
    warning: '#FBBF24',
    error: '#F87171',
    info: '#60A5FA',
    background: '#0B0F14',
    surface: '#111827',
    text: '#E5E7EB',
    textSecondary: '#9CA3AF',
    border: '#374151',
  },
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

  const toggleTheme = () => {
    setThemeMode((prev) => {
      switch (prev) {
        case 'light':
          return 'dark';
        case 'dark':
          return 'system';
        case 'system':
          return 'light';
        default:
          return 'light';
      }
    });
  };

  const theme = themeMode === 'dark' ? darkTheme : lightTheme;

  const value: ThemeContextType = {
    theme,
    themeMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}