import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Local-only logic for phase calculation (Privacy rule #1 & #3)
export const calculatePhase = (lastPeriodDate, cycleLength = 28) => {
    if (!lastPeriodDate) return { phase: 'luteal', day: 19 }; // fallback mock

    const today = new Date();
    const last = new Date(lastPeriodDate);
    // Rough calculation of days difference
    const diffTime = Math.abs(today - last);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const dayOfCycle = (diffDays % cycleLength) + 1;

    let phase = 'luteal';
    if (dayOfCycle <= 5) phase = 'menstrual';
    else if (dayOfCycle <= 13) phase = 'follicular';
    else if (dayOfCycle <= 16) phase = 'ovulatory';

    return { phase, day: dayOfCycle };
};

export const useCycleStore = create(
    persist(
        (set, get) => ({
            cycleLength: 28,
            lastPeriodDate: null,
            currentPhase: 'luteal',
            currentDay: 19,

            updateCycleData: (length, date) => {
                const { phase, day } = calculatePhase(date, length);
                set({ 
                    cycleLength: length, 
                    lastPeriodDate: date,
                    currentPhase: phase,
                    currentDay: day
                });
            },

            // Called every time the app opens to refresh the phase silently
            refreshPhase: () => {
                const { cycleLength, lastPeriodDate } = get();
                if (lastPeriodDate) {
                    const { phase, day } = calculatePhase(lastPeriodDate, cycleLength);
                    set({ currentPhase: phase, currentDay: day });
                }
            }
        }),
        {
            name: 'luna-cycle-storage', // saves to local storage
        }
    )
);
