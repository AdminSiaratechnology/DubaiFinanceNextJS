'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
            <div className="p-4 rounded-full bg-red-50 text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" x2="12" y1="8" y2="12" />
                    <line x1="12" x2="12.01" y1="16" y2="16" />
                </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Something went wrong!</h2>
            <p className="text-gray-500 max-w-md text-center">
                We couldn't load the dashboard data. Please try again later or contact support if the problem persists.
            </p>
            <button
                onClick={() => reset()}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
                Try again
            </button>
        </div>
    );
}
