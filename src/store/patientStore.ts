import { create } from 'zustand';
import type { Patient, ViewMode } from '../types';
import { mockPatients } from '../utils/mockData';

interface PatientState {
  patients: Patient[];
  viewMode: ViewMode;
  searchQuery: string;
  setViewMode: (mode: ViewMode) => void;
  setSearchQuery: (query: string) => void;
  filteredPatients: () => Patient[];
}

export const usePatientStore = create<PatientState>((set, get) => ({
  patients: mockPatients, // using mock data directly for demo purposes
  viewMode: 'grid',
  searchQuery: '',
  setViewMode: (mode) => set({ viewMode: mode }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  filteredPatients: () => {
    const { patients, searchQuery } = get();
    const lowerQuery = searchQuery.toLowerCase();
    return patients.filter((p) => 
      p.name.toLowerCase().includes(lowerQuery) || 
      p.id.toLowerCase().includes(lowerQuery) ||
      p.condition.toLowerCase().includes(lowerQuery)
    );
  }
}));
