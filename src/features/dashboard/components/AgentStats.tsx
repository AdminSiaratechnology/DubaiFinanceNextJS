'use client';

import React, { useEffect, useState } from 'react';
import { StatCard } from './StatCard';
import { dashboardApi } from './api/agent.api';
import { useRouter, useSearchParams } from 'next/navigation';

export function AgentStats() {
    const [stats, setStats] = useState({
        total: 0,
        approved: 0,
        expected_commission: 0,
        total_commission: 0,
        total_leads: 0,
        rejected: 0
    });
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentView = searchParams.get('view') || 'cases';
    const currentStatus = searchParams.get('status') || '';

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await dashboardApi();
                setStats(res);
            } catch (err) {
                console.error('Failed to fetch agent stats:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const navigate = (view: string, status?: string) => {
        const url = `/dashboard/agent/main?tab=dashboard&view=${view}${status ? `&status=${status}` : ''}`;
        router.push(url);
    };

    if (loading) {
        return (
            <section className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-32 bg-card border border-border rounded-2xl animate-pulse" />
                ))}
            </section>
        );
    }

    return (
        <section className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-6">
            <StatCard
                title="Total Cases"
                value={stats.total}
                color="foreground"
                isActive={currentView === 'cases' && !currentStatus}
                onClick={() => navigate('cases')}
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" /></svg>}
            />
            <StatCard
                title="Approved"
                value={stats.approved}
                color="green"
                isActive={currentView === 'cases' && currentStatus === 'approved'}
                onClick={() => navigate('cases', 'approved')}
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="m9 12 2 2 4-4" /></svg>}
            />
            <StatCard
                title="Expected (AED)"
                value={stats.expected_commission}
                color="purple"
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>}
            />
            <StatCard
                title="Earned (AED)"
                value={stats.total_commission}
                color="teal"
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="12" x="2" y="6" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01M18 12h.01" /></svg>}
            />
            <StatCard
                title="Total Leads"
                value={stats.total_leads}
                color="blue"
                isActive={currentView === 'leads'}
                onClick={() => navigate('leads')}
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" /></svg>}
            />
            <StatCard
                title="Rejected"
                value={stats.rejected}
                color="red"
                isActive={currentView === 'cases' && currentStatus === 'rejected'}
                onClick={() => navigate('cases', 'rejected')}
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" /></svg>}
            />
        </section>
    );
}
