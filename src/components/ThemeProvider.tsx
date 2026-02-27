'use client';

import React, { useEffect } from 'react';
import { useThemeStore } from '@/store/useThemeStore';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const { theme } = useThemeStore();

    useEffect(() => {
        const root = window.document.documentElement;
        root.setAttribute('data-theme', theme);

        // Also handle the system preference if needed, but here we prioritize user choice
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);

    return <>{children}</>;
}
