export interface BankProduct {
    id: string;
    bankId: string;
    bankName: string;
    productName: string;
    loanTypeId: string;
    loanTypeName: string;
    customerSegment: 'salaried' | 'self-employed' | 'sme';
    minLoanAmount: number;
    maxLoanAmount: number;
    minTenure: number;
    maxTenure: number;
    processingFeePercent: number;
    status: 'active' | 'inactive';
    priorityScore: number;
    defaultSLATemplate: string;
    internalNotes: string;
    createdDate: string;
}

export const mockBankProducts: BankProduct[] = [
    {
        id: '1',
        bankId: '1',
        bankName: 'Emirates NBD',
        productName: 'Personal Loan - Gold',
        loanTypeId: 'personal',
        loanTypeName: 'Personal Loan',
        customerSegment: 'salaried',
        minLoanAmount: 10000,
        maxLoanAmount: 500000,
        minTenure: 12,
        maxTenure: 60,
        processingFeePercent: 1.5,
        status: 'active',
        priorityScore: 95,
        defaultSLATemplate: 'Standard - 5 Days',
        internalNotes: 'Premium product with competitive rates for salaried professionals',
        createdDate: '2024-01-15'
    },
    {
        id: '2',
        bankId: '1',
        bankName: 'Emirates NBD',
        productName: 'Auto Loan - Standard',
        loanTypeId: 'auto',
        loanTypeName: 'Auto Loan',
        customerSegment: 'salaried',
        minLoanAmount: 50000,
        maxLoanAmount: 1000000,
        minTenure: 12,
        maxTenure: 84,
        processingFeePercent: 1.0,
        status: 'active',
        priorityScore: 88,
        defaultSLATemplate: 'Standard - 5 Days',
        internalNotes: 'Auto financing for new and used vehicles',
        createdDate: '2024-01-18'
    },
    {
        id: '3',
        bankId: '2',
        bankName: 'Dubai Islamic Bank',
        productName: 'Islamic Personal Finance',
        loanTypeId: 'personal',
        loanTypeName: 'Personal Loan',
        customerSegment: 'self-employed',
        minLoanAmount: 20000,
        maxLoanAmount: 750000,
        minTenure: 12,
        maxTenure: 48,
        processingFeePercent: 2.0,
        status: 'active',
        priorityScore: 85,
        defaultSLATemplate: 'Extended - 7 Days',
        internalNotes: 'Shariah-compliant personal financing for self-employed customers',
        createdDate: '2024-01-22'
    },
    {
        id: '4',
        bankId: '3',
        bankName: 'RAKBANK',
        productName: 'SME Business Loan',
        loanTypeId: 'business',
        loanTypeName: 'Business Loan',
        customerSegment: 'sme',
        minLoanAmount: 100000,
        maxLoanAmount: 5000000,
        minTenure: 24,
        maxTenure: 120,
        processingFeePercent: 2.5,
        status: 'active',
        priorityScore: 80,
        defaultSLATemplate: 'Extended - 10 Days',
        internalNotes: 'Specialized SME financing with flexible terms',
        createdDate: '2024-02-01'
    },
    {
        id: '5',
        bankId: '1',
        bankName: 'Emirates NBD',
        productName: 'Mortgage - First Home',
        loanTypeId: 'mortgage',
        loanTypeName: 'Mortgage',
        customerSegment: 'salaried',
        minLoanAmount: 500000,
        maxLoanAmount: 10000000,
        minTenure: 120,
        maxTenure: 300,
        processingFeePercent: 0.5,
        status: 'active',
        priorityScore: 92,
        defaultSLATemplate: 'Extended - 10 Days',
        internalNotes: 'First-time homebuyers program with reduced fees',
        createdDate: '2024-02-05'
    },
];
