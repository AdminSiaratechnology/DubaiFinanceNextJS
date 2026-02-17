import React from 'react';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';

export default function TeamOverviewPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-light text-foreground mb-2">Team Overview</h1>
        <p className="text-sm text-text-muted italic">Manage your organizational workforce and track performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/owner/team/analysts">
          <Card className="p-8 hover:shadow-lg transition-all cursor-pointer group border-brand/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><circle cx="10" cy="14" r="2" /><path d="m14 18-2.5-2.5" /></svg>
              </div>
              <h3 className="text-xl font-bold group-hover:text-brand transition-colors">Analysts</h3>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              Monitor case analysis workflows, document verification status, and bank submission metrics.
            </p>
          </Card>
        </Link>

        <Link href="/owner/team/telecallers">
          <Card className="p-8 hover:shadow-lg transition-all cursor-pointer group border-brand/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              </div>
              <h3 className="text-xl font-bold group-hover:text-brand transition-colors">Telecallers</h3>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              Track lead conversion rates, call activities, and document collection progress across the team.
            </p>
          </Card>
        </Link>
      </div>
    </div>
  );
}