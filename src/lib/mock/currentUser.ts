
import { TeamMember } from './team';

export const currentUser: TeamMember = {
    id: 'ADMIN-001',
    fullName: 'Johnathan Doe',
    email: 'john.doe@dubaifinance.ae',
    mobile: '+971 50 123 4567',
    emiratesId: '784-1980-1234567-1',
    nationality: 'American',
    companyName: 'Dubai Finance',
    experience: '15 Years',
    accountHolder: 'Johnathan Doe',
    bankName: 'HSBC',
    accountNumber: '10123456789',
    iban: 'AE123456789012345678901',
    role: 'analyst', // Using 'analyst' for now as it fits the TeamMember type, even if he is CFO
    status: 'active',
    joinedDate: '2020-01-01'
};
