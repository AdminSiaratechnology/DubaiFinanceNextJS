import React from 'react';
import Link from 'next/link';
import { LoanType } from '@/features/owner/loantypes/api/loanTypes.api';
import { LoanTypeActions } from './LoanTypeActions';
import { LoanTypeSearch } from './LoanTypeSearch';
import { Pagination } from '@/components/ui/Pagination';

interface LoanTypeTableProps {
  loanTypes: LoanType[];
  page: number;
  total: number;
  limit: number;
}

export function LoanTypeTable({
  loanTypes,
  page,
  total,
  limit,
}: LoanTypeTableProps) {
  return (
    <>
      <div className="space-y-6 bg-card p-4 sm:p-6 rounded-2xl">
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
          <div className="w-full sm:w-auto">
            <LoanTypeSearch showFilter />
          </div>
          <Link
            href="/owner/loanTypes/new"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background rounded-xl font-bold text-sm hover:bg-foreground/90 transition-all shadow-md active:scale-95 w-full sm:w-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            Add New Loan Type
          </Link>
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse min-w-[700px] lg:min-w-0">
              <thead>
                <tr className="bg-foreground/10 border-b border-border">
                  <th className="p-3 sm:p-4 text-[14px] font-bold text-adaptive uppercase tracking-widest">S.No</th>
                  <th className="p-3 sm:p-4 text-[14px] font-bold text-adaptive uppercase tracking-widest">
                    Loan Type Name
                  </th>
                  <th className="p-3 sm:p-4 text-[14px] font-bold text-adaptive uppercase tracking-widest">
                    Description
                  </th>
                  <th className="p-3 sm:p-4 text-right text-[14px] font-bold text-adaptive uppercase tracking-widest">
                    Status
                  </th>
                  <th className="p-3 sm:p-4 text-[14px] font-bold text-adaptive uppercase tracking-widest text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {loanTypes.length > 0 ? (
                  loanTypes.map((loanType, index) => (
                    <tr key={loanType.id} className="hover:bg-muted/30 transition-colors group">
                      <td className="p-3 sm:p-4">
                        <p className="text-[14px] font-bold text-adaptive">
                          {((page || 1) - 1) * (limit || 10) + index + 1}
                        </p>
                      </td>
                      <td className="p-3 sm:p-4">
                        <div>
                          <p className="text-sm sm:text-sm font-medium text-adaptive leading-tight">
                            {loanType.name}
                          </p>
                        </div>
                      </td>

                      <td className="p-3 sm:p-4">
                        <p className="text-sm sm:text-sm text-adaptive line-clamp-2 max-w-md">
                          {loanType.description}
                        </p>
                      </td>

                      <td className="p-3 sm:p-4">
                        <div className="flex items-center justify-end gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${loanType.status === 'active' ? 'bg-green' : 'bg-red'
                              }`}
                          />
                          <span
                            className={`text-sm font-bold ${loanType.status === 'active'
                              ? 'text-green'
                              : 'text-red'
                              }`}
                          >
                            {loanType.status === 'active' ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </td>

                      <td className="p-3 sm:p-4 text-right">
                        <LoanTypeActions id={loanType.id} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="p-12 text-center text-text-muted italic">
                      No loan types found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
      <Pagination page={page} total={total} limit={limit} />
    </>
  );
}