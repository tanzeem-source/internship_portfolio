import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

export const useStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: true,
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false }),
    }),
    {
      name: 'auth-storage', // unique name for AsyncStorage key
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
