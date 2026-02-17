export interface LoanType {
    id: string;
    name: string;
    description: string;
    status: 'active' | 'inactive';
    createdDate: string;
}

export const mockLoanTypes: LoanType[] = [
    {
        id: '1',
        name: 'Personal Loan',
        description: 'Unsecured loan for personal expenses, medical bills, or debt consolidation',
        status: 'active',
        createdDate: '2024-01-10'
    },
    {
        id: '2',
        name: 'Business Loan',
        description: 'Funding for business operations, expansion, or equipment purchase',
        status: 'active',
        createdDate: '2024-01-12'
    },
    {
        id: '3',
        name: 'Auto Loan',
        description: 'Vehicle financing for new or used cars, motorcycles, and commercial vehicles',
        status: 'active',
        createdDate: '2024-01-15'
    },
    {
        id: '4',
        name: 'Mortgage',
        description: 'Home financing for property purchase or construction',
        status: 'active',
        createdDate: '2024-01-18'
    },
    {
        id: '5',
        name: 'Credit Card',
        description: 'Revolving credit facility for purchases and cash advances',
        status: 'active',
        createdDate: '2024-01-20'
    },
    {
        id: '6',
        name: 'SME Loan',
        description: 'Specialized financing for small and medium enterprises',
        status: 'active',
        createdDate: '2024-01-25'
    },
    {
        id: '7',
        name: 'Education Loan',
        description: 'Financing for higher education and professional courses',
        status: 'inactive',
        createdDate: '2024-02-01'
    },
];
