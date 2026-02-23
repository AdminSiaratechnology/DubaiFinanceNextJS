import React from 'react';
import { mockSLATemplates } from '@/lib/mock/slaTemplates';
import { PageHeader } from '@/components/PageHeader';
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
      <PageHeader
        title="SLA Template Master"
        description="Define SLA timings for telecaller, coordinator and submission stages."
      />

      <SLATemplateTable templates={filteredTemplates} />
    </div>
  );
}
