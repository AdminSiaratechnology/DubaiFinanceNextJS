import React from 'react';
import Link from 'next/link';
import { SLATemplate } from '@/lib/mock/slaTemplates';
import { SLATemplateSearch } from './SLATemplateSearch';
import { SLATemplateActions } from './SLATemplateActions';
interface Props {
  templates: SLATemplate[];
}

export function SLATemplateTable({ templates }: Props) {
  return (
    <div className="space-y-6">
      {/* Top Bar (Search + Add) */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <SLATemplateSearch />

        <Link
          href="/owner/sla/new"
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-brand text-white rounded-xl font-bold text-sm hover:bg-brand/90 transition-all shadow-md"
        >
          + Add SLA Template
        </Link>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[900px]">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="p-4 text-[10px] font-bold uppercase">Template</th>
                <th className="p-4 text-[10px] font-bold uppercase">Telecaller (hrs)</th>
                <th className="p-4 text-[10px] font-bold uppercase">Coordinator (hrs)</th>
                <th className="p-4 text-[10px] font-bold uppercase">Submission Limit</th>
                <th className="p-4 text-[10px] font-bold uppercase">Escalation</th>
                <th className="p-4 text-[10px] font-bold uppercase">Auto Revert</th>
                <th className="p-4 text-[10px] font-bold uppercase">Status</th>
                <th className="p-4 text-right text-[10px] font-bold uppercase">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {templates.length > 0 ? (
                templates.map((t) => (
                  <tr key={t.id} className="hover:bg-muted/30 transition">
                    <td className="p-4 text-sm font-bold">{t.name}</td>
                    <td className="p-4 text-sm">{t.telecallerTime}h</td>
                    <td className="p-4 text-sm">{t.coordinatorTime}h</td>
                    <td className="p-4 text-sm">{t.submissionLimit}h</td>
                    <td className="p-4 text-sm">{t.escalationAfter}h</td>
                    <td className="p-4 text-sm">
                      {t.autoRevert ? 'Enabled' : 'Disabled'}
                    </td>
                    <td className="p-4">
                      <span
                        className={`text-xs font-bold ${
                          t.status === 'active' ? 'text-green' : 'text-red'
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <SLATemplateActions id={t.id} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-text-muted italic">
                    No SLA templates found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
