import React from 'react';

interface LabelProps {
  children: React.ReactNode;
  className?: string;
  required?: boolean;
}

export function Label({ children, className = '', required = false }: LabelProps) {
  return (
    <label className={`block pl-1 mb-1.5 text-[10px] font-black text-secondary uppercase tracking-widest transition-colors ${className}`}>
      {children}
      {required && (
        <span className="text-red-500 ml-1 font-bold">*</span>
      )}
    </label>
  );
}
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

export function Input({ className = '', ...props }: InputProps) {
    return (
            <input
                {...props}
                className={`w-full px-4 py-2.5 pr-8 bg-muted/20 border border-border rounded-xl text-sm font-semibold focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all placeholder:text-text-muted/50 ${className}`}
            />
    );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: { value: string; label: string }[];
}

export function Select({ options, className = '', ...props }: SelectProps) {
    return (
        <div className="relative">
            <select
                {...props}
                className={`w-full px-4 py-2.5 bg-muted/20 border border-border rounded-xl text-sm font-semibold focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all appearance-none cursor-pointer ${className}`}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
            </div>
        </div>
    );
}
