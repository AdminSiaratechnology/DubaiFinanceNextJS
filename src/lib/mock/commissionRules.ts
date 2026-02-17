import { CommissionForm } from '@/features/owner/commission/components/CommissionForm';

export const mockCommissionRules: (CommissionForm & {
    bankName: string;
    productName: string;
})[] = [
    {
        id: 'cr_1',
        bankId: '1',
        productId: '1',
        bankName: 'HDFC Bank',
        productName: 'Credit Card',
        commissionType: 'percentage',
        commissionValue: 5,
        agentShare: 50,
        telecallerShare: 30,
        coordinatorShare: 20,
        effectiveFrom: '2026-02-01',
        status: 'active',
    },
    {
        id: 'cr_2',
        bankId: '2',
        productId: '2',
        bankName: 'ICICI Bank',
        productName: 'Personal Loan',
        commissionType: 'flat',
        commissionValue: 2000,
        agentShare: 60,
        telecallerShare: 25,
        coordinatorShare: 15,
        effectiveFrom: '2026-01-15',
        status: 'inactive',
    },
];
