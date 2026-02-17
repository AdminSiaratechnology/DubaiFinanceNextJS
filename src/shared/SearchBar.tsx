'use client';

import React, { forwardRef, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface SearchBarProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  iconSize?: number;

  // 🔥 Reusability features
  syncWithUrl?: boolean; // optional URL sync
  paramKey?: string; // default: "q"
  debounce?: number; // ms (optional)
  preserveParams?: string[]; // keep params like tab, page etc.
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      containerClassName = '',
      placeholder = 'Search...',
      className = '',
      iconSize = 16,
      syncWithUrl = false,
      paramKey = 'q',
      debounce = 0,
      preserveParams = [],
      onChange,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const initial =
      (syncWithUrl && searchParams.get(paramKey)) ||
      (defaultValue as string) ||
      '';

    const [value, setValue] = useState(initial);

    // Debounce handler
    useEffect(() => {
      if (!syncWithUrl) return;
      if (debounce === 0) {
        updateUrl(value);
        return;
      }

      const timer = setTimeout(() => {
        updateUrl(value);
      }, debounce);

      return () => clearTimeout(timer);
    }, [value]);

    const updateUrl = (val: string) => {
      const params = new URLSearchParams(searchParams.toString());

      // preserve custom params (like tab)
      preserveParams.forEach((key) => {
        const existing = searchParams.get(key);
        if (existing) params.set(key, existing);
      });

      if (val) {
        params.set(paramKey, val);
      } else {
        params.delete(paramKey);
      }

      router.push(`?${params.toString()}`);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      onChange?.(e); // still allow custom logic
    };

    return (
      <div className={`relative w-full ${containerClassName}`}>
        {/* Icon */}
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>

        {/* Input */}
        <input
          ref={ref}
          type="search"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          autoComplete="off"
          className={`w-full bg-muted border border-border rounded-xl text-sm 
          pl-10 pr-4 py-2 font-medium outline-none transition-all
          focus:ring-2 focus:ring-brand focus:border-brand
          ${className}`}
          {...props}
        />
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';
