
export interface Metric {
    title: string;
    value: string;
    subtitle?: string;
    color: 'blue' | 'purple' | 'green' | 'red' | 'orange';
}

export interface FinancialMetric {
    title: string;
    amount: string;
    color: 'green' | 'orange' | 'blue';
}

export interface FunnelStep {
    step: number;
    label: string;
    value: number;
}

export const getDashboardData = async () => {
    // Simulate network delay for suspense/loading testing
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
        metrics: [
            {
                title: 'Active Pipeline',
                value: '83',
                subtitle: 'Live Cases',
                color: 'blue' as const,
            },
            {
                title: 'New Leads',
                value: '0',
                subtitle: '0 this week • 0 MTD',
                color: 'blue' as const, // The image shows light blue, but "stat-orange" or similar might be better
            },
            {
                title: 'Submitted (MTD)',
                value: '0',
                subtitle: 'To Banks',
                color: 'purple' as const,
            },
            {
                title: 'Approvals (MTD)',
                value: '0',
                subtitle: '0% Approval Ratio',
                color: 'green' as const,
            },
            {
                title: 'Rejections (MTD)',
                value: '0',
                subtitle: '0% Rate',
                color: 'red' as const,
            },
            {
                title: 'Revenue (MTD)',
                value: 'AED 14,475',
                subtitle: '+ AED 4,400 pending',
                color: 'orange' as const,
            },
        ],
        financials: [
            {
                title: 'Gross Commission',
                amount: 'AED 14,475',
                color: 'green' as const,
            },
            {
                title: 'Agent Payable',
                amount: 'AED 19,300',
                color: 'orange' as const,
            },
            {
                title: 'Net Revenue',
                amount: 'AED 14,475',
                color: 'blue' as const,
            },
            {
                title: 'Unpaid Liability',
                amount: 'AED 14,475',
                color: 'purple' as const,
            },
            {
                title: 'Cash Flow Status',
                amount: 'Critical',
                color: 'red' as const,
            },
        ],
        funnel: [
            { step: 1, label: 'Leads Generated', status: 'completed' as const },
            { step: 2, label: 'Consent Verified', status: 'active' as const },
            { step: 3, label: 'Docs Uploaded', status: 'pending' as const },
            { step: 4, label: 'Submitted to Bank', status: 'pending' as const },
            { step: 5, label: 'Bank Approval', status: 'pending' as const },
            { step: 6, label: 'Disbursal', status: 'pending' as const },
        ]
    };
};
