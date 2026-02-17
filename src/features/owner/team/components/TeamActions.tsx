'use client';

import React from 'react';
import Link from 'next/link';

interface TeamActionsProps {
    id: string;
    role: 'analyst' | 'telecaller';
    onDelete?: (id: string) => void;
}

export function TeamActions({ id, role, onDelete }: TeamActionsProps) {
    return (
        <div className="flex justify-end gap-2">
            <Link
                href={`/owner/team/${role}s/${id}`}
                className="p-2.5 hover:bg-brand/10 text-text-muted hover:text-brand rounded-lg transition-colors border border-transparent hover:border-brand/20"
                title="Edit Member"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
            </Link>
            <button
                onClick={() => onDelete?.(id)}
                className="p-2.5 hover:bg-red-soft text-text-muted hover:text-red-500 rounded-lg transition-colors border border-transparent hover:border-red-100"
                title="Delete Member"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
            </button>
        </div>
    );
}
