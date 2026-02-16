import React from 'react';

export function Label({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
        <label className={`text-[10px] font-black text-text-muted uppercase tracking-widest pl-1 mb-1.5 block ${className}`}>
            {children}
        </label>
    );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

export function Input({ className = '', ...props }: InputProps) {
    return (
        <input
            {...props}
            className={`w-full px-4 py-2.5 bg-muted/20 border border-border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-purple-500 outline-none transition-all placeholder:text-text-muted/50 ${className}`}
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
                className={`w-full px-4 py-2.5 bg-muted/20 border border-border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-purple-500 outline-none transition-all appearance-none cursor-pointer ${className}`}
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
