import React from 'react';

interface FinancialCardProps {
    title: string;
    amount: string;
    color: 'green' | 'orange' | 'blue' | 'purple' | 'red';
}

export function FinancialCard({ title, amount, color }: FinancialCardProps) {
    const styles = {
        green: 'soft-green text-green-700 dark:text-green-400',
        orange: 'soft-orange text-orange-700 dark:text-orange-400',
        blue: 'soft-blue text-blue-700 dark:text-blue-400',
        purple: 'soft-purple text-purple-700 dark:text-purple-400',
        red: 'soft-red text-red-700 dark:text-red-400',
    }[color];

    return (
        <div className={`rounded-2xl p-6 border border-transparent transition-all hover:scale-[1.01] ${styles}`}>
            <h3 className="text-sm font-medium mb-6 opacity-90 uppercase tracking-wide">{title}</h3>
            <div className="text-xl font-semibold tracking-tight whitespace-nowrap">{amount}</div>
        </div>
    );
}
