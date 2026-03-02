import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { SLATemplateTable } from '@/features/owner/slatemplates/components/SLATemplateTable';
import { getSLAs } from "../../../features/owner/slatemplates/api/sla.api"
export default async function SLATemplatesPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string; status?: string }>;
}) {
  const params = await searchParams;
  const query = params.query || '';
  const page = Number(params.page || 1);
  const status = params.status || '';
  const filteredTemplates = await getSLAs({ page, limit: 5, search: query, status: status || undefined });
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <PageHeader
        title="SLA Template Master"
        description="Define SLA timings for telecaller, coordinator and submission stages."
      />

      <SLATemplateTable templates={filteredTemplates.items} page={filteredTemplates.page} total={filteredTemplates.total} limit={filteredTemplates.limit} />
    </div>
  );
}
