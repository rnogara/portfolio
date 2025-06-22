'use client';

import { ThemeProvider } from './context/theme';
import { PortfolioProvider } from './context/PortfolioContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <PortfolioProvider>
        {children}
      </PortfolioProvider>
    </ThemeProvider>
  );
}
