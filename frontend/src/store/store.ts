import { create } from 'zustand';
import { Customer, Simulation } from '../lib/types';

interface RealityStore {
  activeCustomer: Customer | null;
  activeSimulation: Simulation | null;
  setActiveCustomer: (customer: Customer) => void;
  setActiveSimulation: (sim: Simulation) => void;
  clearState: () => void;
}

export const useRealityStore = create<RealityStore>((set) => ({
  activeCustomer: null,
  activeSimulation: null,
  setActiveCustomer: (customer) => set({ activeCustomer: customer }),
  setActiveSimulation: (sim) => set({ activeSimulation: sim }),
  clearState: () => set({ activeCustomer: null, activeSimulation: null }),
}));
