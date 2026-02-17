import React from 'react';
import { mockSLATemplates } from '@/lib/mock/slaTemplates';
import { SLATemplateTable } from '@/features/owner/slatemplates/components/SLATemplateTable';

export default async function SLATemplatesPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
    const params = await searchParams;
  const query = params.query?.toLowerCase() || '';

  const filteredTemplates = mockSLATemplates.filter((t) =>
    t.name.toLowerCase().includes(query)
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-light text-foreground">
          SLA Template Master
        </h1>
        <p className="text-xs text-text-muted italic">
          Define SLA timings for telecaller, coordinator and submission stages.
        </p>
      </header>

      <SLATemplateTable templates={filteredTemplates} />
    </div>
  );
}
