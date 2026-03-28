'use client';

import React, { useEffect, useState } from 'react';
import { StatTabs } from '@/features/dashboard/components/StatTabs';
import { dashboardApi } from '@/features/dashboard/components/api/agent.api';
import { useSearchParams } from 'next/navigation';
import { useTelecallerStore } from '@/store/useTelecallerStore';

export function TelecallerStats() {
  // const [stats, setStats] = useState({
  //   new_leads: 0,
  //   working_leads: 0,
  //   submitted_leads: 0,
  //   docs_required_leads: 0,
  //   sent_back_to_telecaller_leads: 0,
  // });

  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchStats = async () => {
  //     try {
  //       const res = await dashboardApi();
  //       setStats(res);
  //     } catch (e) {
  //       console.error("Stats error", e);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchStats();
  // }, []);
  const { stats, loading, fetchStats } = useTelecallerStore();

  useEffect(() => {
    fetchStats(); // initial load
  }, []);


  const tabs = [
    {
      id: 'new-leads',
      title: 'New Leads',
      value: stats.new_leads,
      color: 'foreground' as const,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="13" x="4" y="4" rx="2" /><path d="m22 7-7.1 3.78c-.54.29-1.26.29-1.8 0L6 7" /></svg>
    },
    {
      id: 'working',
      title: 'Working On',
      value: stats.working_leads,
      color: 'orange' as const,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" /></svg>
    },
    {
      id: 'submitted',
      title: 'Submitted',
      value: stats.submitted_leads,
      color: 'green' as const,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="m9 12 2 2 4-4" /></svg>
    },
    {
      id: 'docs-required',
      title: 'Documents Required',
      value: stats.docs_required_leads,
      color: 'red' as const,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>
    },
    {
      id: 'sent_back_to_agent',
      title: 'Sent Back To Agent',
      value: stats.sent_back_to_agent_leads,
      color: 'dark' as const,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 8v4" /><path d="M12 16h.01" /></svg>
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-28 bg-card border border-border rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  return <TelecallerStatsContent tabs={tabs} />;
}

function TelecallerStatsContent({ tabs }: { tabs: any }) {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'new-leads';
  return <StatTabs tabs={tabs} activeTab={activeTab} baseUrl="/dashboard/telecaller/main" />;
}