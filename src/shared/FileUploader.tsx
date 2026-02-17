'use client';

import React from 'react';
import { Label } from '@/components/ui/Form';

interface FileUploaderProps {
    id: string;
    label: string;
    file: File | null;
    onChange: (id: string, file: File | null) => void;
    placeholder?: string;
    description?: string;
    className?: string;
    color?: 'brand' | 'purple' | 'blue';
}

export function FileUploader({
    id,
    label,
    file,
    onChange,
    placeholder = 'Choose File',
    description,
    className = '',
    color = 'brand'
}: FileUploaderProps) {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onChange(id, e.target.files[0]);
        }
    };

    const handleClear = (e: React.MouseEvent) => {
        e.preventDefault();
        onChange(id, null);
    };

    const colorClasses = {
        brand: {
            border: 'border-brand/30 bg-brand/5 dark:bg-brand/10',
            hover: 'hover:border-brand/20',
            bg: 'bg-brand',
            text: 'text-brand'
        },
        purple: {
            border: 'border-purple/30 bg-purple-soft/30',
            hover: 'hover:border-purple/20',
            bg: 'bg-purple',
            text: 'text-purple'
        },
        blue: {
            border: 'border-blue/30 bg-blue-soft/30',
            hover: 'hover:border-blue/20',
            bg: 'bg-blue',
            text: 'text-blue'
        }
    };

    const activeColor = colorClasses[color];

    return (
        <div className={`group transition-all ${className}`}>
            <div className="flex justify-between items-end mb-1.5">
                <Label className="mb-0">{label}</Label>
                {description && <span className="text-[10px] text-text-muted italic">{description}</span>}
            </div>
            <div className={`relative border-2 border-dashed rounded-xl p-4 transition-all duration-200 ${file ? activeColor.border : `border-border ${activeColor.hover}`}`}>
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${file ? `${activeColor.bg} text-white shadow-md scale-105` : 'bg-muted text-text-muted'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                {file ? (
                                    <path d="M20 6 9 17l-5-5" className="animate-in fade-in zoom-in duration-300" />
                                ) : (
                                    <>
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                        <polyline points="17 8 12 3 7 8" />
                                        <line x1="12" x2="12" y1="3" y2="15" />
                                    </>
                                )}
                            </svg>
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className={`text-xs font-bold truncate ${file ? activeColor.text : 'text-foreground'}`}>
                                {file ? file.name : placeholder}
                            </p>
                            <p className="text-[10px] text-text-muted font-medium">
                                {file ? `${(file.size / 1024).toFixed(1)} KB` : 'No file chosen'}
                            </p>
                        </div>
                    </div>

                    <input
                        type="file"
                        id={id}
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        onChange={handleFileChange}
                    />

                    {file && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="p-2 hover:bg-red-50 hover:text-red-500 rounded-lg text-text-muted z-20 transition-colors"
                            title="Remove file"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
