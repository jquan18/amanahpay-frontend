
// Mock data for the donor dashboard

export type DonationType = 'Waqf' | 'Zakat' | 'Sadaqah';

export interface Donation {
  id: string;
  amount: number;
  currency: string;
  type: DonationType;
  date: string;
  recipient: string;
  status: 'Pending' | 'Verified' | 'Distributed';
  transactionHash: string;
  impact: string;
  projectId?: string;
  certificate?: {
    id: string;
    image: string;
  };
}

export interface ImpactMetric {
  label: string;
  value: number;
  unit: string;
  category: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  location: {
    country: string;
    city: string;
    coordinates: [number, number];
  };
  targetAmount: number;
  currentAmount: number;
  startDate: string;
  endDate: string;
  category: 'Education' | 'Healthcare' | 'Food' | 'Water' | 'Shelter' | 'Emergency';
  impactMetrics: ImpactMetric[];
  images: string[];
}

// Mock donation data
export const donationHistory: Donation[] = [
  {
    id: 'don-001',
    amount: 500,
    currency: 'USD',
    type: 'Zakat',
    date: '2025-03-15',
    recipient: 'Yemen Emergency Relief',
    status: 'Verified',
    transactionHash: '0x7cb42c6a8e2d0277a4b6b29670b35b3f29c8f8b6d2f7c29c0349e8e6',
    impact: 'Provided food and essentials for 10 families',
    projectId: 'proj-001',
    certificate: {
      id: 'cert-001',
      image: '/placeholder.svg',
    },
  },
  {
    id: 'don-002',
    amount: 1000,
    currency: 'USD',
    type: 'Waqf',
    date: '2025-02-20',
    recipient: 'Global Education Fund',
    status: 'Distributed',
    transactionHash: '0x8db42c6a8e2d0277a4b6b29670b35b3f29c8f8b6d2f7c29c0349a5d7',
    impact: 'Contributed to building a classroom for 30 students',
    projectId: 'proj-002',
    certificate: {
      id: 'cert-002',
      image: '/placeholder.svg',
    },
  },
  {
    id: 'don-003',
    amount: 250,
    currency: 'USD',
    type: 'Sadaqah',
    date: '2025-01-10',
    recipient: 'Clean Water Initiative',
    status: 'Verified',
    transactionHash: '0x5ab42c6a8e2d0277a4b6b29670b35b3f29c8f8b6d2f7c29c0349c2e8',
    impact: 'Provided clean water access for 5 families',
    projectId: 'proj-003',
  },
  {
    id: 'don-004',
    amount: 150,
    currency: 'USD',
    type: 'Zakat',
    date: '2024-12-05',
    recipient: 'Orphanage Support Program',
    status: 'Pending',
    transactionHash: '0x4cb42c6a8e2d0277a4b6b29670b35b3f29c8f8b6d2f7c29c0349b1c7',
    impact: 'Pending verification',
    projectId: 'proj-004',
  },
];

// Mock impact metrics
export const userImpactMetrics: ImpactMetric[] = [
  { label: 'Lives Impacted', value: 47, unit: 'people', category: 'Overall' },
  { label: 'Education Access', value: 30, unit: 'students', category: 'Education' },
  { label: 'Clean Water', value: 15, unit: 'families', category: 'Water' },
  { label: 'Emergency Relief', value: 10, unit: 'families', category: 'Emergency' },
  { label: 'Healthcare Provided', value: 8, unit: 'patients', category: 'Healthcare' },
];

// Mock project data for the impact map
export const activeProjects: Project[] = [
  {
    id: 'proj-001',
    name: 'Yemen Emergency Relief',
    description: 'Providing essential supplies to families affected by the ongoing crisis in Yemen.',
    location: {
      country: 'Yemen',
      city: 'Sana\'a',
      coordinates: [15.3694, 44.1910],
    },
    targetAmount: 50000,
    currentAmount: 32500,
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    category: 'Emergency',
    impactMetrics: [
      { label: 'Families Supported', value: 150, unit: 'families', category: 'Emergency' },
      { label: 'Children Reached', value: 350, unit: 'children', category: 'Emergency' },
    ],
    images: ['/placeholder.svg', '/placeholder.svg'],
  },
  {
    id: 'proj-002',
    name: 'Global Education Fund',
    description: 'Building schools and providing educational resources in underserved communities.',
    location: {
      country: 'Kenya',
      city: 'Nairobi',
      coordinates: [-1.2921, 36.8219],
    },
    targetAmount: 75000,
    currentAmount: 45000,
    startDate: '2025-01-15',
    endDate: '2026-01-15',
    category: 'Education',
    impactMetrics: [
      { label: 'Schools Built', value: 2, unit: 'schools', category: 'Education' },
      { label: 'Students Enrolled', value: 120, unit: 'students', category: 'Education' },
    ],
    images: ['/placeholder.svg', '/placeholder.svg'],
  },
  {
    id: 'proj-003',
    name: 'Clean Water Initiative',
    description: 'Installing water purification systems and wells in areas lacking clean water access.',
    location: {
      country: 'Somalia',
      city: 'Mogadishu',
      coordinates: [2.0469, 45.3182],
    },
    targetAmount: 40000,
    currentAmount: 28000,
    startDate: '2024-11-01',
    endDate: '2025-10-31',
    category: 'Water',
    impactMetrics: [
      { label: 'Wells Constructed', value: 5, unit: 'wells', category: 'Water' },
      { label: 'People with Water Access', value: 1200, unit: 'people', category: 'Water' },
    ],
    images: ['/placeholder.svg', '/placeholder.svg'],
  },
  {
    id: 'proj-004',
    name: 'Orphanage Support Program',
    description: 'Providing care, education, and support for orphaned children.',
    location: {
      country: 'Bangladesh',
      city: 'Dhaka',
      coordinates: [23.8103, 90.4125],
    },
    targetAmount: 30000,
    currentAmount: 15000,
    startDate: '2025-01-10',
    endDate: '2025-12-10',
    category: 'Shelter',
    impactMetrics: [
      { label: 'Children Supported', value: 45, unit: 'children', category: 'Shelter' },
      { label: 'Meals Provided', value: 9000, unit: 'meals', category: 'Food' },
    ],
    images: ['/placeholder.svg', '/placeholder.svg'],
  },
];

// User donation summary
export const donationSummary = {
  totalDonated: 1900,
  currency: 'USD',
  donationsByType: {
    Zakat: 650,
    Waqf: 1000,
    Sadaqah: 250,
  },
  impactScore: 78,
  verifiedDonations: 3,
  pendingDonations: 1,
};
