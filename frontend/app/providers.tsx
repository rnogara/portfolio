'use client';

import { ThemeProvider } from './context/theme';
import { PortfolioProvider } from './context/PortfolioContext';
import { AuthProvider } from './context/AuthContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <PortfolioProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </PortfolioProvider>
    </ThemeProvider>
  );
}
