export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  condition: string;
  status: 'Critical' | 'Stable' | 'Discharged';
  admissionDate: string;
  lastVisit: string;
  contact: string;
  avatarUrl: string;
}

export type ViewMode = 'grid' | 'list';
