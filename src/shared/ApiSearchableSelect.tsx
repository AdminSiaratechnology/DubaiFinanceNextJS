'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Generic type helpers
// ─────────────────────────────────────────────────────────────────────────────

/** Shape that every item returned from the API must satisfy (at minimum). */
export interface ApiSelectItem {
    [key: string]: unknown;
}

/**
 * The shape your API function must accept.
 * Most project APIs follow the pattern `{ page?, limit?, search?, status? }`.
 */
export interface ApiSelectParams {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    [key: string]: unknown;
}

/**
 * The shape your API function must return.
 * The component only cares about `items`; everything else is ignored.
 */
export interface ApiSelectResponse<T extends ApiSelectItem = ApiSelectItem> {
    items: T[];
    total?: number;
    page?: number;
    limit?: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Component props
// ─────────────────────────────────────────────────────────────────────────────

export interface ApiSearchableSelectProps<T extends ApiSelectItem = ApiSelectItem> {
    /** The async API function to call (e.g. `getBankCategories`, `getLoanTypes`). */
    fetchFn: (params: ApiSelectParams) => Promise<ApiSelectResponse<T>>;

    /** Key on the item used as the unique identifier – default `"id"`. */
    valueKey?: keyof T;

    /** Key on the item used as the human-readable label – default `"name"`. */
    labelKey?: keyof T;

    /** Extra fixed params merged into every API call (e.g. `{ status: 'active' }`). */
    extraParams?: Partial<ApiSelectParams>;

    /** How many items to fetch per page – default `20`. */
    limit?: number;

    // ── Selection ─────────────────────────────────────────────────────────────

    /** Currently selected value(s). Pass a single value or an array for multi. */
    value?: string | number | (string | number)[] | null;

    /** Options that are already known (e.g., for initially selected values that haven't been fetched yet). */
    initialOptions?: T[];

    /** Called when selection changes. Receives the new value(s). */
    onChange?: (value: string | number | (string | number)[]) => void;

    /** Allow selecting multiple items – default `false`. */
    multiple?: boolean;

    // ── Appearance ────────────────────────────────────────────────────────────

    /** Optional label rendered above the control. */
    label?: string;

    /** Placeholder shown when nothing is selected. */
    placeholder?: string;

    /** Shows a red asterisk next to the label. */
    required?: boolean;

    /** Disables the control. */
    disabled?: boolean;

    /** Extra class on the outer wrapper. */
    className?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function useDebounce<T>(value: T, delay = 350): T {
    const [debounced, setDebounced] = useState<T>(value);
    useEffect(() => {
        const t = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(t);
    }, [value, delay]);
    return debounced;
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export function ApiSearchableSelect<T extends ApiSelectItem = ApiSelectItem>({
    fetchFn,
    valueKey = 'id' as keyof T,
    labelKey = 'name' as keyof T,
    extraParams,
    limit = 20,
    value,
    initialOptions = [],
    onChange,
    multiple = false,
    label,
    placeholder = 'Search and select…',
    required = false,
    disabled = false,
    className = '',
}: ApiSearchableSelectProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [items, setItems] = useState<T[]>([]);
    // `loading`    → first-open / search change: no items yet, show full spinner
    // `isFetching` → background refresh (e.g. parent re-render): items already
    //                visible, show a small overlay instead of wiping the list
    const [loading, setLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const debouncedSearch = useDebounce(searchTerm, 350);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const abortRef = useRef<AbortController | null>(null);

    // Keep extraParams in a ref so that inline object literals created by the
    // parent on every render don't invalidate the fetch effect (which would
    // cause a loading flash on every selection in multi mode).
    const extraParamsRef = useRef(extraParams);
    useEffect(() => { extraParamsRef.current = extraParams; });

    // ── Normalize value to an array of ids ─────────────────────────────────
    const selectedIds: (string | number)[] = value == null
        ? []
        : Array.isArray(value)
            ? value
            : [value];

    // ── Fetch items whenever the dropdown opens or search changes ──────────
    // NOTE: `extraParams` is intentionally read from the ref here, not from
    // the closure, so that stale object references don't retrigger this effect.
    const fetchItems = useCallback(async (search: string, hasExistingItems: boolean) => {
        abortRef.current?.abort();
        const ctrl = new AbortController();
        abortRef.current = ctrl;

        // Only show full "loading" state when there are no items yet.
        // When items are already shown, use the silent `isFetching` flag so
        // the list stays visible and there's no blink.
        if (hasExistingItems) {
            setIsFetching(true);
        } else {
            setLoading(true);
        }
        setError(null);

        try {
            const data = await fetchFn({
                page: 1,
                limit,
                search,
                ...extraParamsRef.current,
            });
            if (!ctrl.signal.aborted) {
                setItems(data.items ?? []);
            }
        } catch (err: unknown) {
            if (!ctrl.signal.aborted) {
                setError(err instanceof Error ? (err.message || 'Failed to load options.') : 'Failed to load options.');
            }
        } finally {
            if (!ctrl.signal.aborted) {
                setLoading(false);
                setIsFetching(false);
            }
        }
    }, [fetchFn, limit]); // extraParams intentionally excluded — read via ref

    // Serialize search + fetchFn identity to detect real changes (not inline
    // extraParams reference churn from parent re-renders).
    useEffect(() => {
        if (isOpen) {
            fetchItems(debouncedSearch, items.length > 0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, debouncedSearch, fetchItems]);
    // `items.length` deliberately NOT in deps — we only need its value at call
    // time (captured via the argument), not as a reactive trigger.

    // ── Click-outside to close ─────────────────────────────────────────────
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    // Focus the search input when dropdown opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 50);
        } else {
            setSearchTerm('');
        }
    }, [isOpen]);

    // ── Selection logic ────────────────────────────────────────────────────
    const getId = (item: T) => item[valueKey] as string | number;
    const getLabel = (item: T) => String(item[labelKey] ?? '');

    const isSelected = (item: T) => selectedIds.includes(getId(item));

    const getSelectedItems = () => items.filter(isSelected);

    const handleSelect = (item: T) => {
        const id = getId(item);
        if (multiple) {
            const next = selectedIds.includes(id)
                ? selectedIds.filter((v) => v !== id)
                : [...selectedIds, id];
            onChange?.(next);
        } else {
            onChange?.(id);
            setIsOpen(false);
        }
    };

    const handleRemove = (id: string | number, e: React.MouseEvent) => {
        e.stopPropagation();
        if (multiple) {
            onChange?.(selectedIds.filter((v) => v !== id));
        } else {
            onChange?.([]);
        }
    };

    // ── Trigger label display ──────────────────────────────────────────────
    // Keep track of all known items (fetched + initial options) so we can always resolve labels
    const allKnownItems = [...initialOptions, ...items];

    // For multi we show chips; for single we show one label
    const singleLabel: string | null = (() => {
        if (multiple || selectedIds.length === 0) return null;
        const found = allKnownItems.find((i) => getId(i) === selectedIds[0]);
        return found ? getLabel(found) : `ID: ${selectedIds[0]}`;
    })();

    const triggerIsEmpty = selectedIds.length === 0;

    // ── Render ────────────────────────────────────────────────────────────

    return (
        <div className={`relative ${className}`} ref={wrapperRef}>
            {/* Label */}
            {label && (
                <label className="block pl-1 mb-1.5 text-[10px] font-black text-secondary uppercase tracking-widest transition-colors">
                    {label}
                    {required && <span className="text-red-500 ml-1 font-bold">*</span>}
                </label>
            )}

            {/* Trigger */}
            <div
                onClick={() => !disabled && setIsOpen((o) => !o)}
                className={[
                    'relative w-full min-h-[42px] px-4 py-2 rounded-xl border transition-all cursor-pointer select-none',
                    'bg-muted/20 border-border',
                    isOpen
                        ? 'border-brand ring-2 ring-brand/20'
                        : 'hover:border-brand/50',
                    disabled ? 'opacity-50 pointer-events-none' : '',
                ].join(' ')}
            >
                <div className="flex flex-wrap gap-1.5 items-center pr-6">
                    {triggerIsEmpty ? (
                        <span className="text-sm text-text-muted/50 font-semibold">{placeholder}</span>
                    ) : multiple ? (
                        // Multi chips — we only show them once items are loaded;
                        // fall back to showing ids while items haven't loaded yet.
                        selectedIds.map((id) => {
                            const found = allKnownItems.find((i) => getId(i) === id);
                            const chipLabel = found ? getLabel(found) : `#${id}`;
                            return (
                                <span
                                    key={id}
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand/10 text-brand rounded-lg text-xs font-bold border border-brand/20"
                                >
                                    {chipLabel}
                                    <button
                                        type="button"
                                        onClick={(e) => handleRemove(id, e)}
                                        className="hover:bg-brand/20 rounded-full p-0.5 transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                                        </svg>
                                    </button>
                                </span>
                            );
                        })
                    ) : (
                        <span className="text-sm font-semibold text-foreground">{singleLabel}</span>
                    )}
                </div>

                {/* Chevron */}
                <div className={`absolute right-3 top-1/2 -translate-y-1/2 text-text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </div>
            </div>

            {/* Dropdown Panel */}
            {isOpen && (
                <div className="absolute z-50 w-full mt-2 bg-card border border-border rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                    {/* Search input */}
                    <div className="p-2 border-b border-border">
                        <div className="relative">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted/60"
                                width="13" height="13" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                            >
                                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                            </svg>
                            <input
                                ref={inputRef}
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Type to search…"
                                className="w-full pl-8 pr-3 py-2 bg-muted/30 border border-border rounded-lg text-sm font-semibold focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all placeholder:text-text-muted/50"
                            />
                            {searchTerm && (
                                <button
                                    type="button"
                                    onClick={() => setSearchTerm('')}
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted/60 hover:text-foreground transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* List */}
                    <div className="relative max-h-60 overflow-y-auto">
                        {/* isFetching overlay: keeps items visible, just dims slightly */}
                        {isFetching && (
                            <div className="absolute inset-0 z-10 flex items-center justify-center bg-card/60 backdrop-blur-[1px]">
                                <svg className="animate-spin text-brand" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                </svg>
                            </div>
                        )}

                        {loading ? (
                            <div className="flex items-center justify-center gap-2.5 py-8 text-text-muted">
                                {/* Spinner — only shown on first open / search */}
                                <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                </svg>
                                <span className="text-xs font-semibold">Loading…</span>
                            </div>
                        ) : error ? (
                            <div className="flex flex-col items-center justify-center gap-1.5 py-8 px-4 text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
                                    <circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" />
                                </svg>
                                <p className="text-xs font-semibold text-red-400">{error}</p>
                                <button
                                    type="button"
                                    onClick={() => fetchItems(debouncedSearch, false)}
                                    className="text-xs font-bold text-brand hover:underline mt-1"
                                >
                                    Retry
                                </button>
                            </div>
                        ) : items.length === 0 ? (
                            <div className="flex flex-col items-center justify-center gap-1.5 py-8 text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted/40">
                                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /><path d="M8 11h6" />
                                </svg>
                                <p className="text-xs font-semibold text-text-muted/60">No results found</p>
                            </div>
                        ) : (
                            items.map((item) => {
                                const id = getId(item);
                                const lbl = getLabel(item);
                                const selected = isSelected(item);
                                return (
                                    <button
                                        key={id}
                                        type="button"
                                        onClick={() => handleSelect(item)}
                                        className={[
                                            'w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors border-b border-border last:border-0',
                                            selected
                                                ? 'bg-brand/10 text-brand'
                                                : 'hover:bg-muted/30 text-foreground',
                                        ].join(' ')}
                                    >
                                        {/* Checkbox/radio indicator */}
                                        <span className={[
                                            'shrink-0 w-4 h-4 rounded flex items-center justify-center border transition-colors',
                                            multiple ? 'rounded' : 'rounded-full',
                                            selected
                                                ? 'bg-brand border-brand'
                                                : 'border-border bg-transparent',
                                        ].join(' ')}>
                                            {selected && (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M20 6 9 17l-5-5" />
                                                </svg>
                                            )}
                                        </span>
                                        <span className={`text-sm flex-1 ${selected ? 'font-bold' : 'font-semibold'}`}>
                                            {lbl}
                                        </span>
                                        {selected && !multiple && (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-brand">
                                                <path d="M20 6 9 17l-5-5" />
                                            </svg>
                                        )}
                                    </button>
                                );
                            })
                        )}
                    </div>

                    {/* Footer hint for multi */}
                    {multiple && selectedIds.length > 0 && (
                        <div className="px-4 py-2 border-t border-border bg-muted/10 flex items-center justify-between">
                            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
                                {selectedIds.length} selected
                            </span>
                            <button
                                type="button"
                                onClick={() => onChange?.([])}
                                className="text-[10px] font-bold text-red-400 hover:text-red-500 uppercase tracking-widest transition-colors"
                            >
                                Clear all
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
