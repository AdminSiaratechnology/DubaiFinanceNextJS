export interface Bank {
    id: string;
    bankName: string;
    shortCode: string;
    logoUrl?: string;
    category: 'retail' | 'sme' | 'mortgage';
    supportedLoanTypes: string[];
    defaultTAT: number;
    status: 'active' | 'inactive';
    internalNotes: string;
    createdDate: string;
}

export const mockBanks: Bank[] = [
    {
        id: '1',
        bankName: 'Emirates NBD',
        shortCode: 'ENBD',
        logoUrl: undefined,
        category: 'retail',
        supportedLoanTypes: ['personal', 'auto', 'credit-card'],
        defaultTAT: 5,
        status: 'active',
        internalNotes: 'Premium partner bank with fast processing',
        createdDate: '2024-01-15'
    },
    {
        id: '2',
        bankName: 'Dubai Islamic Bank',
        shortCode: 'DIB',
        logoUrl: undefined,
        category: 'retail',
        supportedLoanTypes: ['personal', 'mortgage', 'auto'],
        defaultTAT: 7,
        status: 'active',
        internalNotes: 'Shariah-compliant products',
        createdDate: '2024-01-20'
    },
    {
        id: '3',
        bankName: 'RAKBANK',
        shortCode: 'RAK',
        logoUrl: undefined,
        category: 'sme',
        supportedLoanTypes: ['business', 'sme', 'credit-card'],
        defaultTAT: 10,
        status: 'active',
        internalNotes: 'Great for SME financing',
        createdDate: '2024-02-01'
    },
    {
        id: '4',
        bankName: 'Mashreq Bank',
        shortCode: 'MASH',
        logoUrl: undefined,
        category: 'retail',
        supportedLoanTypes: ['personal', 'auto', 'mortgage'],
        defaultTAT: 6,
        status: 'inactive',
        internalNotes: 'Currently on hold - relationship under review',
        createdDate: '2024-02-10'
    },
];
