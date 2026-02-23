import React from 'react';

interface PageHeaderProps {
    title: string;
    description: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
    return (
        <header className="flex flex-col gap-1">
            <h1 className="text-2xl font-medium text-foreground">{title}</h1>
            <p className="text-sm italic">{description}</p>
        </header>
    );
}
