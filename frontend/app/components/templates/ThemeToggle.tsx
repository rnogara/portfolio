'use client';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/theme';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-3 left-12 md:left-20 md:top-4 z-50 w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-200/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center hover:bg-green-400/80 dark:hover:bg-green-400/80 transition-colors duration-200 cursor-pointer"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 md:w-5 md:h-5 text-yellow-300" />
      ) : (
        <Moon className="w-4 h-4 md:w-5 md:h-5 text-gray-900" />
      )}
    </button>
  );
};

export default ThemeToggle;
