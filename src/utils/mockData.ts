import type { Patient } from '../types';

export const mockPatients: Patient[] = [
  {
    id: 'PAT-1001',
    name: 'Eleanor Vance',
    age: 45,
    gender: 'Female',
    condition: 'Hypertension',
    status: 'Stable',
    admissionDate: '2023-11-12',
    lastVisit: '2024-01-15',
    contact: '+1 555-0101',
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026024d'
  },
  {
    id: 'PAT-1002',
    name: 'Marcus Sterling',
    age: 62,
    gender: 'Male',
    condition: 'Type 2 Diabetes',
    status: 'Critical',
    admissionDate: '2024-02-05',
    lastVisit: '2024-02-18',
    contact: '+1 555-0102',
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d'
  },
  {
    id: 'PAT-1003',
    name: 'Sophia Chen',
    age: 28,
    gender: 'Female',
    condition: 'Asthma',
    status: 'Stable',
    admissionDate: '2023-09-21',
    lastVisit: '2024-02-10',
    contact: '+1 555-0103',
    avatarUrl: 'https://i.pravatar.cc/150?u=a04258114e29026702d'
  },
  {
    id: 'PAT-1004',
    name: 'Elias Thorne',
    age: 71,
    gender: 'Male',
    condition: 'Post-Op Recovery',
    status: 'Discharged',
    admissionDate: '2023-12-01',
    lastVisit: '2024-01-20',
    contact: '+1 555-0104',
    avatarUrl: 'https://i.pravatar.cc/150?u=a048581f4e29026701d'
  },
  {
    id: 'PAT-1005',
    name: 'Aisha Rahman',
    age: 35,
    gender: 'Female',
    condition: 'Migraine',
    status: 'Stable',
    admissionDate: '2024-01-10',
    lastVisit: '2024-02-01',
    contact: '+1 555-0105',
    avatarUrl: 'https://i.pravatar.cc/150?u=a04258a2462d826712d'
  },
  {
    id: 'PAT-1006',
    name: 'Liam Gallagher',
    age: 50,
    gender: 'Male',
    condition: 'Coronary Artery Disease',
    status: 'Critical',
    admissionDate: '2024-02-12',
    lastVisit: '2024-02-15',
    contact: '+1 555-0106',
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026024e'
  }
];
