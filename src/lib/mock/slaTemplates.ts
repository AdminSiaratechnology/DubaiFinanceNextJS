// /lib/mock/slaTemplates.ts
export interface SLATemplate {
  id: string;
  name: string;
  telecallerTime: number;
  coordinatorTime: number;
  submissionLimit: number;
  escalationAfter: number;
  autoRevert: boolean;
  status: 'active' | 'inactive';
  createdDate: string;
}

export const mockSLATemplates: SLATemplate[] = [
  {
    id: '1',
    name: 'Default Credit Card SLA',
    telecallerTime: 4,
    coordinatorTime: 8,
    submissionLimit: 24,
    escalationAfter: 48,
    autoRevert: true,
    status: 'active',
    createdDate: '2026-01-10',
  },
];
