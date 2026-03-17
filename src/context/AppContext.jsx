import { createContext, useContext, useState } from 'react';

// Shared app state (replaces Zustand/Redux for Phase 1–3)
const AppContext = createContext(null);

export const PHASES = {
    menstrual: { key: 'menstrual', label: 'Menstrual', emoji: '🌑', color: 'var(--menstrual)', bg: 'var(--menstrual-g)', days: 'Day 1–5', energy: 25 },
    follicular: { key: 'follicular', label: 'Follicular', emoji: '🌱', color: 'var(--follicular)', bg: 'var(--follicular-g)', days: 'Day 6–13', energy: 80 },
    ovulatory: { key: 'ovulatory', label: 'Ovulatory', emoji: '🌕', color: 'var(--ovulatory)', bg: 'var(--ovulatory-g)', days: 'Day 14–16', energy: 100 },
    luteal: { key: 'luteal', label: 'Luteal', emoji: '🌸', color: 'var(--luteal)', bg: 'var(--luteal-g)', days: 'Day 17–28', energy: 45 },
};

const DEFAULT_USER = {
    lunaName: '',
    name: '',
    email: '',
    cycleLength: 28,
    cycleDates: ['', '', ''],
    currentPhase: 'luteal',
    currentDay: 19,
    onboarded: false,
};

export function AppProvider({ children }) {
    // ── User cycle data ──────────────────────────────────────
    const [user, setUser] = useState(() => {
        try { return JSON.parse(localStorage.getItem('luna_user')) || DEFAULT_USER; }
        catch { return DEFAULT_USER; }
    });

    const saveUser = (updates) => {
        const next = { ...user, ...updates };
        setUser(next);
        localStorage.setItem('luna_user', JSON.stringify(next));
    };

    // ── Auth state ───────────────────────────────────────────
    // Phase 3: mock auth persisted to localStorage.
    // To wire to real Supabase, replace this with supabase.auth.onAuthStateChange()
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem('luna_auth') === 'true';
    });

    const login = (profile = {}) => {
        saveUser({ ...profile, onboarded: user.onboarded });
        setIsLoggedIn(true);
        localStorage.setItem('luna_auth', 'true');
        // ── Real Supabase session would be set here automatically ──
    };

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('luna_auth');
        // supabase.auth.signOut();
    };

    // ── Notification badge count (unread) ────────────────────
    const [notifBadge, setNotifBadge] = useState(3);
    const clearNotifBadge = () => setNotifBadge(0);

    // Phase 3: mock Google OAuth login
    const signUpWithGoogle = (googleProfile) => {
        saveUser({
            name: googleProfile.name,
            email: googleProfile.email,
            lunaName: googleProfile.given_name ? `${googleProfile.given_name}Luna` : 'LunaUser',
            onboarded: user.onboarded
        });
        setIsLoggedIn(true);
        localStorage.setItem('luna_auth', 'true');
    };

    return (
        <AppContext.Provider value={{
            user, saveUser, PHASES,
            isLoggedIn, login, logout, signUpWithGoogle,
            notifBadge, clearNotifBadge,
        }}>
            {children}
        </AppContext.Provider>
    );
}

export const useApp = () => useContext(AppContext);

