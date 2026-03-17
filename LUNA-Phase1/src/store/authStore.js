import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
    persist(
        (set) => ({
            user: null, // { id, name, email, lunaName, role, tier, cohortId, moonDust, currentStreak, lastLoginDate }
            isLoggedIn: false,
            onboarded: false,
            notifBadge: 3,

            clearNotifBadge: () => set({ notifBadge: 0 }),

            loginMock: (mockUser) => set({
                user: mockUser,
                isLoggedIn: true,
                onboarded: mockUser.onboarded || false
            }),

            logout: () => set({ user: null, isLoggedIn: false, onboarded: false }),

            completeOnboarding: () => set((state) => ({
                onboarded: true,
                user: state.user ? { ...state.user, onboarded: true } : null
            })),

            updateUserStats: (updates) => set((state) => ({
                user: state.user ? { ...state.user, ...updates } : null
            })),

            claimDailyLogin: () => set((state) => {
                if (!state.user) return state;
                const today = new Date().toDateString();
                if (state.user.lastLoginDate === today) return state; // Already claimed

                return {
                    user: {
                        ...state.user,
                        moonDust: (state.user.moonDust || 0) + 10,
                        currentStreak: (state.user.currentStreak || 0) + 1,
                        lastLoginDate: today
                    }
                };
            })
        }),
        {
            name: 'luna-auth-storage',
        }
    )
);
