'use client';

import React, { useState, useRef, useEffect } from 'react';

export interface MultiSelectOption {
    id: string;
    label: string;
}

interface MultiSelectDropdownProps {
    options: MultiSelectOption[];
    selectedValues: string[];
    onChange: (selectedValues: string[]) => void;
    placeholder?: string;
    label?: string;
    className?: string;
}

export function MultiSelectDropdown({
    options,
    selectedValues,
    onChange,
    placeholder = 'Select options...',
    label,
    className = '',
}: MultiSelectDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleToggle = (optionId: string) => {
        const newValues = selectedValues.includes(optionId)
            ? selectedValues.filter(id => id !== optionId)
            : [...selectedValues, optionId];
        onChange(newValues);
    };

    const handleRemove = (optionId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        onChange(selectedValues.filter(id => id !== optionId));
    };

    const getSelectedLabels = () => {
        return options
            .filter(opt => selectedValues.includes(opt.id))
            .map(opt => opt.label);
    };

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            {label && (
                <label className="text-[10px] font-black text-text-muted uppercase tracking-widest pl-1 mb-1.5 block">
                    {label}
                </label>
            )}

            {/* Dropdown Trigger */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="w-full min-h-[42px] px-4 py-2 bg-muted/20 border border-border rounded-xl cursor-pointer focus-within:ring-2 focus-within:ring-brand outline-none transition-all"
            >
                <div className="flex flex-wrap gap-2 items-center">
                    {selectedValues.length > 0 ? (
                        getSelectedLabels().map((label, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand/10 text-brand rounded-lg text-xs font-bold border border-brand/20"
                            >
                                {label}
                                <button
                                    type="button"
                                    onClick={(e) => handleRemove(selectedValues[index], e)}
                                    className="hover:bg-brand/20 rounded-full p-0.5 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                                    </svg>
                                </button>
                            </span>
                        ))
                    ) : (
                        <span className="text-sm text-text-muted/50 font-semibold">{placeholder}</span>
                    )}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`ml-auto text-text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    >
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </div>
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute z-50 w-full mt-2 bg-card border border-border rounded-xl shadow-lg max-h-64 overflow-y-auto">
                    {options.map((option) => (
                        <label
                            key={option.id}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-muted/30 cursor-pointer transition-colors border-b border-border last:border-0"
                        >
                            <input
                                type="checkbox"
                                checked={selectedValues.includes(option.id)}
                                onChange={() => handleToggle(option.id)}
                                className="w-4 h-4 rounded border-border text-brand focus:ring-2 focus:ring-brand cursor-pointer"
                            />
                            <span className="text-sm font-bold text-foreground flex-1">{option.label}</span>
                            {selectedValues.includes(option.id) && (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-brand">
                                    <path d="M20 6 9 17l-5-5" />
                                </svg>
                            )}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}
