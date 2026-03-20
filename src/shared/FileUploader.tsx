'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import { Label } from '@/components/ui/Form';

type UploadValue = File | File[] | null;

interface FileUploaderProps {
    id: string;
    label: string;
    value?: UploadValue;
    file?: File | null;
    onChange: (id: string, value: any) => void;

    // Core scalability props
    multiple?: boolean;
    accept?: string;
    maxFiles?: number;
    maxSize?: number;
    allowedTypes?: string[];

    // Preview support (for edit mode / API images)
    previewUrls?: string | string[]; // existing files from server
    previewUrl?: string | null | undefined;

    placeholder?: string;
    description?: string;
    className?: string;
    color?: 'brand' | 'purple' | 'blue' | 'foreground';
    disabled?: boolean;
}

export function FileUploader({
    id,
    label,
    value,
    file,
    onChange,
    multiple = false,
    accept = 'image/*',
    maxFiles = 5,
    maxSize,
    allowedTypes,
    previewUrls,
    previewUrl,
    placeholder = 'Choose File',
    description,
    className = '',
    color = 'brand',
}: FileUploaderProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const actualValue = value !== undefined ? value : file;
    const actualPreviewUrls = previewUrls !== undefined ? previewUrls : previewUrl;

    // Normalize files into array for scalability
    const files = useMemo<File[]>(() => {
        if (!actualValue) return [];
        return Array.isArray(actualValue) ? actualValue : [actualValue];
    }, [actualValue]);

    // Normalize preview URLs
    const existingUrls = useMemo<string[]>(() => {
        if (!actualPreviewUrls) return [];
        return Array.isArray(actualPreviewUrls) ? actualPreviewUrls : [actualPreviewUrls];
    }, [actualPreviewUrls]);

    // Generate preview URLs (memory safe)
    const objectUrls = useMemo(() => {
        return files.map((f) => URL.createObjectURL(f));
    }, [files]);

    // Cleanup memory (CRITICAL for production)
    useEffect(() => {
        return () => {
            objectUrls.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [objectUrls]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files;
        if (!selected) return;

        let newFiles = Array.from(selected);

        if (allowedTypes && allowedTypes.length > 0) {
            newFiles = newFiles.filter((f) => allowedTypes.includes(f.type));
        }

        if (maxSize) {
            newFiles = newFiles.filter((f) => f.size <= maxSize);
        }

        if (multiple) {
            const combined = [...files, ...newFiles].slice(0, maxFiles);
            onChange(id, combined);
        } else {
            onChange(id, newFiles[0] || null);
        }

        // Reset input so same file can be re-uploaded
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    const removeFile = (index: number, e?: React.MouseEvent) => {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        if (multiple) {
            const updated = files.filter((_, i) => i !== index);
            onChange(id, updated.length ? updated : null);
        } else {
            onChange(id, null);
        }
    };

    const handleClearExisting = (index: number, e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        // For existing URLs, we might not be able to actually remove them via onChange 
        // without a separate callback, but we can set value to what it is and perhaps the parent handles it.
        // Usually, replacing the file overwrites it. We'll simply trigger onChange with the current files just in case.
    };

    const handleContainerClear = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onChange(id, multiple ? [] : null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
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
        },
        foreground: {
            border: 'border-foreground/30 bg-foreground/5',
            hover: 'hover:border-foreground/20',
            bg: 'bg-foreground',
            text: 'text-foreground'
        }
    };

    const activeColor = colorClasses[color];
    const hasFiles = files.length > 0;
    const hasExisting = existingUrls.length > 0;
    const showEmptyState = !hasFiles && !hasExisting;

    return (
        <div className={`group transition-all ${className}`}>
            <div className="flex justify-between items-end mb-1.5">
                <Label className="mb-0">{label}</Label>
                {description && (
                    <span className="text-[10px] text-text-muted italic">
                        {description}
                    </span>
                )}
            </div>

            <div className="space-y-3">
                {/* Render New Files */}
                {files.map((file, index) => {
                    const isImage = file.type.startsWith('image/');
                    return (
                        <FileRow
                            key={`new-${index}`}
                            name={file.name}
                            size={`${(file.size / 1024).toFixed(1)} KB`}
                            previewUrl={isImage ? objectUrls[index] : undefined}
                            activeColor={activeColor}
                            onRemove={(e) => removeFile(index, e)}
                        />
                    );
                })}

                {/* Render Existing Preview URLs (only if no new files replacing them, or if multiple is allowed) */}
                {(!hasFiles || multiple) && existingUrls.map((url, index) => {
                    // resolve absolute URL cleanly if already full URL, else append process env
                    const fullUrl = url.startsWith('http') ? url : url.startsWith('media/') ? `${process.env.NEXT_PUBLIC_APP_URL || 'http://13.127.153.218'}/${url}` : url;
                    return (
                        <FileRow
                            key={`existing-${index}`}
                            name="Current Image"
                            size="Existing"
                            previewUrl={fullUrl}
                            activeColor={activeColor}
                        >
                            {/* Invisible input over existing row so clicking it replaces it */}
                            {!multiple && (
                                <input
                                    type="file"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    onChange={handleFileChange}
                                    accept={accept || (allowedTypes ? allowedTypes.join(',') : undefined)}
                                />
                            )}
                        </FileRow>
                    )
                })}

                {/* Empty State / Upload Trigger */}
                {(showEmptyState || multiple) && (
                    <div className={`relative border-2 border-dashed rounded-xl p-4 transition-all duration-200 border-border ${activeColor.hover}`}>
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 bg-muted text-text-muted`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                        <polyline points="17 8 12 3 7 8" />
                                        <line x1="12" x2="12" y1="3" y2="15" />
                                    </svg>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className={`text-xs font-bold truncate text-foreground`}>
                                        {placeholder}
                                    </p>
                                    <p className="text-[10px] text-text-muted font-medium">
                                        {multiple ? `Upload up to ${maxFiles} files` : 'No file chosen'}
                                    </p>
                                </div>
                            </div>

                            <input
                                ref={inputRef}
                                type="file"
                                id={id}
                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                onChange={handleFileChange}
                                accept={accept || (allowedTypes ? allowedTypes.join(',') : undefined)}
                                multiple={multiple}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function FileRow({ name, size, previewUrl, activeColor, onRemove, children }: { name: string, size: string, previewUrl?: string, activeColor: any, onRemove?: (e: React.MouseEvent) => void, children?: React.ReactNode }) {
    return (
        <div className={`relative border rounded-xl p-4 transition-all duration-200 ${activeColor.border}`}>
            {children}
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 overflow-hidden relative group z-20 ${previewUrl ? 'bg-white shadow-sm border border-border scale-105' : `${activeColor.bg} text-white shadow-md scale-105`}`}>
                        {previewUrl ? (
                            <a href={previewUrl} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative" onClick={(e) => e.stopPropagation()}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="w-full h-full object-contain p-1 animate-in fade-in group-hover:opacity-40 transition-opacity"
                                />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white drop-shadow-md"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                                </div>
                            </a>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 6 9 17l-5-5" className="animate-in fade-in zoom-in duration-300" />
                            </svg>
                        )}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className={`text-xs font-bold truncate ${activeColor.text}`}>
                            {name}
                        </p>
                        <p className="text-[10px] text-text-muted font-medium">
                            {size}
                        </p>
                    </div>
                </div>

                {onRemove && (
                    <button
                        type="button"
                        onClick={onRemove}
                        className="p-2 hover:bg-red-50 hover:text-red-500 rounded-lg text-text-muted z-20 transition-colors relative"
                        title="Remove file"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </button>
                )}
            </div>
        </div>
    );
}