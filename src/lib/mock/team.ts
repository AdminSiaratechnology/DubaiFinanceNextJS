export interface TeamMember {
    id: string;
    fullName: string;
    email: string;
    mobile: string;
    emiratesId: string;
    nationality: string;
    companyName: string;
    experience: string;
    accountHolder: string;
    bankName: string;
    accountNumber: string;
    iban: string;
    role: 'analyst' | 'telecaller';
    status: 'active' | 'inactive';
    joinedDate: string;
}

export const mockAnalysts: TeamMember[] = [
    {
        id: 'AN-001',
        fullName: 'Zaid Al-Farsi',
        email: 'zaid.farsi@dubaifinance.ae',
        mobile: '+971 50 111 2222',
        emiratesId: '784-1988-1234567-1',
        nationality: 'UAE',
        companyName: 'Dubai Finance',
        experience: '8 Years',
        accountHolder: 'Zaid Al-Farsi',
        bankName: 'Emirates NBD',
        accountNumber: '10123456789',
        iban: 'AE123456789012345678901',
        role: 'analyst',
        status: 'active',
        joinedDate: '2023-01-15'
    },
    {
        id: 'AN-002',
        fullName: 'Meera Kapoor',
        email: 'meera.k@dubaifinance.ae',
        mobile: '+971 55 333 4444',
        emiratesId: '784-1992-7654321-2',
        nationality: 'Indian',
        companyName: 'Dubai Finance',
        experience: '5 Years',
        accountHolder: 'Meera Kapoor',
        bankName: 'Abu Dhabi Commercial Bank',
        accountNumber: '20123456789',
        iban: 'AE223456789012345678902',
        role: 'analyst',
        status: 'active',
        joinedDate: '2023-03-20'
    }
];

export const mockTelecallers: TeamMember[] = [
    {
        id: 'TC-001',
        fullName: 'Fatima Ahmed',
        email: 'fatima.a@dubaifinance.ae',
        mobile: '+971 52 555 6666',
        emiratesId: '784-1995-8888888-3',
        nationality: 'Egyptian',
        companyName: 'Dubai Finance',
        experience: '3 Years',
        accountHolder: 'Fatima Ahmed',
        bankName: 'Dubai Islamic Bank',
        accountNumber: '30123456789',
        iban: 'AE323456789012345678903',
        role: 'telecaller',
        status: 'active',
        joinedDate: '2023-05-10'
    },
    {
        id: 'TC-002',
        fullName: 'Rahul Sharma',
        email: 'rahul.s@dubaifinance.ae',
        mobile: '+971 58 777 8888',
        emiratesId: '784-1990-9999999-4',
        nationality: 'Indian',
        companyName: 'Dubai Finance',
        experience: '4 Years',
        accountHolder: 'Rahul Sharma',
        bankName: 'First Abu Dhabi Bank',
        accountNumber: '40123456789',
        iban: 'AE423456789012345678904',
        role: 'telecaller',
        status: 'active',
        joinedDate: '2023-06-01'
    }
];
