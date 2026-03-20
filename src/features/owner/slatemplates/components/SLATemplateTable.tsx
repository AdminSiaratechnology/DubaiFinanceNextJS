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
    <>
      <div className="space-y-6 bg-white p-4 sm:p-6 rounded-2xl">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <SLATemplateSearch showFilter={true} />

          <Link
            href="/owner/sla/new"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background rounded-xl font-bold text-sm hover:bg-foreground/90 transition-all shadow-md active:scale-95 w-full sm:w-auto text-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            Add New SLA Template
          </Link>
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse min-w-[900px] lg:min-w-0">
              <thead>
                <tr className="bg-foreground/10 border-b border-border">
                  <th className="p-4 text-[14px] font-bold text-black uppercase tracking-widest">S.No</th>
                  <th className="p-4 text-[14px] font-bold text-black uppercase tracking-widest">Template</th>
                  <th className="p-4 text-[14px] font-bold text-black uppercase tracking-widest text-center">Telecaller (hrs)</th>
                  <th className="p-4 text-[14px] font-bold text-black uppercase tracking-widest text-center">Coordinator (hrs)</th>
                  <th className="p-4 text-[14px] font-bold text-black uppercase tracking-widest text-center">Submission Limit</th>
                  <th className="p-4 text-[14px] font-bold text-black uppercase tracking-widest text-center">Escalation</th>
                  <th className="p-4 text-[14px] font-bold text-black uppercase tracking-widest">Auto Revert</th>
                  <th className="p-4 text-right text-[14px] font-bold text-black uppercase tracking-widest">Status</th>
                  <th className="p-4 text-right text-[14px] font-bold text-black uppercase">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {templates.length > 0 ? (
                  templates.map((t, index) => (
                    <tr key={t.id} className="hover:bg-muted/30 transition-colors group">
                      <td className="p-4 text-[14px] font-bold text-black">
                        {((page || 1) - 1) * (limit || 10) + index + 1}
                      </td>
                      <td className="p-4 text-sm sm:text-sm font-medium text-black">{t.template_name}</td>
                      <td className="p-4 text-sm sm:text-sm font-medium text-black text-center">{t.telecaller_action_time}h</td>
                      <td className="p-4 text-sm sm:text-sm font-medium text-black text-center">{t.coordinator_verification_time}h</td>
                      <td className="p-4 text-sm sm:text-sm font-medium text-black text-center">{t.submission_time_limit}h</td>
                      <td className="p-4 text-sm sm:text-sm font-medium text-black text-center">{t.escalation_after}h</td>
                      <td className="p-4 text-sm sm:text-sm font-medium text-black">
                        {t.auto_revert_enabled ? 'Enabled' : 'Disabled'}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${t.status === 'active' ? 'bg-green' : 'bg-red'}`}
                          />
                          <span
                            className={`text-sm font-bold uppercase tracking-widest ${t.status === 'active' ? 'text-green' : 'text-red'}`}
                          >
                            {t.status}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <SLATemplateActions id={t.id} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="p-12 text-center text-text-muted italic">
                      No SLA templates found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
