import { create } from 'zustand';

type Role = 'admin' | 'agent' | 'analyst' | 'telecaller' | 'coordinator';

interface User {
    id: number;
    email: string;
    role: Role;
    name?: string;
    telecaller_profile?: {
        name: string;
    };
    coordinator_profile?: {
        name: string;
    };
}

interface AuthState {
    user: User | null;
    isInitializing: boolean;
    setUser: (user: User) => void;
    clearUser: () => void;
    setIsInitializing: (val: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isInitializing: true,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
    setIsInitializing: (val: boolean) => set({ isInitializing: val }),
}));