import React from 'react';
import Link from 'next/link';
import { SLATemplateSearch } from './SLATemplateSearch';
import { SLATemplateActions } from './SLATemplateActions';
import { SLA } from '../api/sla.api';
interface Props {
  templates: SLA[];
  page: number;
  total: number;
  limit: number;
}

export function SLATemplateTable({ templates, page, total, limit }: Props) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <SLATemplateSearch showFilter={true} />

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
                    <td className="p-4 text-sm font-bold">{t.template_name}</td>
                    <td className="p-4 text-sm">{t.telecaller_action_time}h</td>
                    <td className="p-4 text-sm">{t.coordinator_verification_time}h</td>
                    <td className="p-4 text-sm">{t.submission_time_limit}h</td>
                    <td className="p-4 text-sm">{t.escalation_after}h</td>
                    <td className="p-4 text-sm">
                      {t.auto_revert_enabled ? 'Enabled' : 'Disabled'}
                    </td>
                    <td className="p-4">
                      <span
                        className={`text-xs font-bold ${t.status === 'active' ? 'text-green' : 'text-red'
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
