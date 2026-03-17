// All mock data used across the Phase 1 app

export const MOCK_COHORT = [
    { name: 'MoonRose_22', emoji: '🌸', phase: 'Luteal', day: 19, online: true },
    { name: 'CrimsonSkye', emoji: '🌙', phase: 'Luteal', day: 18, online: true },
    { name: 'StarlightK', emoji: '⭐', phase: 'Luteal', day: 20, online: false },
    { name: 'EveningBloom', emoji: '💜', phase: 'Luteal', day: 17, online: true },
];

export const MOCK_MESSAGES = [
    { id: 1, luna: 'MoonRose_22', emoji: '🌸', msg: 'Dark chocolate + chamomile is literally saving me rn 🍫🍵', time: '2m', mine: false },
    { id: 2, luna: 'EveningBloom', emoji: '💜', msg: 'Same!! Also journalling before bed reduced my anxiety so much', time: '1m', mine: false },
    { id: 3, luna: 'CrimsonSkye', emoji: '🌙', msg: 'Anyone tried magnesium supplements? Changed the game for me', time: '45s', mine: false },
    { id: 4, luna: 'You', emoji: '🌸', msg: 'Just ordered magnesium yesterday haha', time: 'now', mine: true },
];

export const MOCK_POSTS = [
    {
        id: 1, luna: 'MoonRose_22', emoji: '🌸', phase: 'luteal', phaseColor: 'var(--luteal)',
        time: '2m', content: 'Dark chocolate + chamomile tea combo has been SAVING me this week 🍫🍵 Anyone else?',
        tags: ['#cravings', '#selfcare'], likes: 24, comments: 8,
    },
    {
        id: 2, luna: 'StarlightK', emoji: '⭐', phase: 'follicular', phaseColor: 'var(--follicular)',
        time: '15m', content: 'Just finished a 35-min HIIT session and I feel UNSTOPPABLE. Follicular phase energy is insane 🏃‍♀️⚡',
        tags: ['#exercise', '#follicular', '#peak'], likes: 47, comments: 12,
    },
    {
        id: 3, luna: 'CrimsonSkye', emoji: '🎭', phase: 'luteal', phaseColor: 'var(--luteal)',
        time: '1h', content: 'PSA: Journalling during luteal has reduced my PMS anxiety by SO much. 15 minutes before bed. Try it 📓',
        tags: ['#journal', '#lunatip', '#mentalhealth'], likes: 83, comments: 31,
    },
    {
        id: 4, luna: 'EveningBloom', emoji: '💜', phase: 'ovulatory', phaseColor: 'var(--ovulatory)',
        time: '3h', content: 'Ovulation week and I literally glowed through that presentation 😂 My manager noticed something was different. Peak performance is REAL.',
        tags: ['#ovulatory', '#work', '#confidence'], likes: 112, comments: 19,
    },
    {
        id: 5, luna: 'RoseWater_7', emoji: '🌹', phase: 'menstrual', phaseColor: 'var(--menstrual)',
        time: '5h', content: 'Day 2 of period. I said no to a meeting and yes to yin yoga. Listening to my body for once and it feels revolutionary 🧘‍♀️',
        tags: ['#rest', '#menstrual', '#boundaries'], likes: 156, comments: 42,
    },
];

export const WELLNESS_DATA = {
    menstrual: {
        mood: 'Low & Introspective',
        affirmation: 'Rest is not laziness. Your body is doing profound work right now. You are powerful even in stillness.',
        confidence: 'This phase is your most intuitive. Trust your gut feelings — they are sharpest now.',
        exercise: [
            { name: 'Yin Yoga', duration: '20 min', intensity: 'Rest', icon: '🧘', benefit: 'Eases cramps, calms nervous system' },
            { name: 'Slow Walk', duration: '15 min', intensity: 'Light', icon: '🚶', benefit: 'Boosts circulation without stress' },
            { name: 'Gentle Stretching', duration: '10 min', intensity: 'Rest', icon: '🤸', benefit: 'Relieves lower back tension' },
        ],
        foods: [
            { name: 'Dark Chocolate (70%+)', icon: '🍫', why: 'Magnesium replenishment, mood lift', avoid: false },
            { name: 'Iron-rich Lentils', icon: '🫘', why: 'Replenishes iron lost during flow', avoid: false },
            { name: 'Ginger Tea', icon: '🍵', why: 'Natural anti-inflammatory, reduces cramps', avoid: false },
            { name: 'Beetroot', icon: '🟣', why: 'Iron + folate, rebuilds blood', avoid: false },
            { name: 'Avoid: Salty & Fried', icon: '🚫', why: 'Worsens bloating and inflammation', avoid: true },
        ],
        habits: [
            { icon: '💤', label: 'Sleep', tip: 'Sleep 8–9 hrs. Your body is repairing.' },
            { icon: '💧', label: 'Water', tip: '3L/day minimum. Warm water helps cramps.' },
            { icon: '📵', label: 'Screen Time', tip: 'Cut screen time after 9pm. Reduces cortisol.' },
            { icon: '🛁', label: 'Self Care', tip: 'Heat therapy on abdomen 2x/day.' },
        ],
        tip: 'Movement reduces cramps naturally. Even 10 minutes of gentle yoga is better than none.',
    },
    follicular: {
        mood: 'Rising & Optimistic',
        affirmation: 'You are entering your power season. Every idea you have right now has the energy to become real.',
        confidence: 'This is your social superpower phase. Your communication is at its clearest and most charming.',
        exercise: [
            { name: 'HIIT Training', duration: '30 min', intensity: 'High', icon: '🏃', benefit: 'Peak strength gains in this phase' },
            { name: 'Dance Cardio', duration: '45 min', intensity: 'High', icon: '💃', benefit: 'Estrogen boost amplifies endurance' },
            { name: 'Strength Training', duration: '40 min', intensity: 'High', icon: '🏋️', benefit: 'Muscle building is easiest now' },
        ],
        foods: [
            { name: 'Eggs & Lean Protein', icon: '🥚', why: 'Supports follicle development', avoid: false },
            { name: 'Fermented Foods', icon: '🥗', why: 'Probiotic gut health, estrogen balance', avoid: false },
            { name: 'Flaxseeds', icon: '🌾', why: 'Phytoestrogens support rising estrogen', avoid: false },
            { name: 'Fresh Berries', icon: '🍓', why: 'Antioxidants for cellular energy', avoid: false },
            { name: 'Green Vegetables', icon: '🥦', why: 'Folate supports new cell growth', avoid: false },
        ],
        habits: [
            { icon: '🌅', label: 'Morning', tip: 'Start new projects — creativity is high.' },
            { icon: '💧', label: 'Water', tip: '2.5L/day. Add lemon for detox.' },
            { icon: '📚', label: 'Learning', tip: 'Best time to learn new skills or study.' },
            { icon: '🤝', label: 'Social', tip: 'Schedule important meetings this week.' },
        ],
        tip: 'Your muscle recovery is fastest now. Push harder — your body can handle it.',
    },
    ovulatory: {
        mood: 'Confident & Radiant',
        affirmation: 'You are at your most magnetic. Walk into every room knowing you belong there — because you do.',
        confidence: 'This is your leadership phase. Others naturally listen to you and trust your judgment right now.',
        exercise: [
            { name: 'Group Sports', duration: '60 min', intensity: 'Peak', icon: '⚽', benefit: 'Social energy is at its peak' },
            { name: 'Running / Cycling', duration: '45 min', intensity: 'Peak', icon: '🚴', benefit: 'Maximum endurance window' },
            { name: 'Vinyasa Yoga', duration: '50 min', intensity: 'High', icon: '🧘', benefit: 'Channels peak energy gracefully' },
        ],
        foods: [
            { name: 'Quinoa & Brown Rice', icon: '🍚', why: 'Sustained energy for peak performance', avoid: false },
            { name: 'Berries & Citrus', icon: '🍊', why: 'Antioxidants support peak hormones', avoid: false },
            { name: 'Cruciferous Veggies', icon: '🥬', why: 'Supports estrogen metabolism', avoid: false },
            { name: 'Pumpkin Seeds (Zinc)', icon: '🎃', why: 'Supports progesterone production', avoid: false },
            { name: 'Light & Fresh Meals', icon: '🥙', why: 'Appetite is naturally lower now', avoid: false },
        ],
        habits: [
            { icon: '🎤', label: 'Voice', tip: 'Speak up — your voice is most persuasive now.' },
            { icon: '💧', label: 'Water', tip: '2.5L/day. Stay cool and hydrated.' },
            { icon: '🎯', label: 'Goals', tip: 'Make big decisions — judgment is at its best.' },
            { icon: '✨', label: 'Confidence', tip: 'You literally glow today. Own it.' },
        ],
        tip: 'This is your peak athletic window. Set personal records and try challenging workouts now.',
    },
    luteal: {
        mood: 'Sensitive & Reflective',
        affirmation: 'Your sensitivity is not weakness — it is depth. The world needs women who feel things this fully.',
        confidence: 'Your empathy is at its highest this week. You understand people in ways others simply cannot.',
        exercise: [
            { name: 'Pilates', duration: '30 min', intensity: 'Moderate', icon: '🤸', benefit: 'Stabilizes mood through movement' },
            { name: 'Swimming', duration: '30 min', intensity: 'Moderate', icon: '🏊', benefit: 'Full body, low impact, calming' },
            { name: 'Nature Walk', duration: '25 min', intensity: 'Light', icon: '🌿', benefit: 'Reduces cortisol and anxiety naturally' },
        ],
        foods: [
            { name: 'Magnesium-rich Spinach', icon: '🥬', why: 'Directly reduces PMS cramps and mood swings', avoid: false },
            { name: 'Complex Carbs (Oats)', icon: '🌾', why: 'Stabilizes serotonin, reduces cravings', avoid: false },
            { name: 'Chamomile Tea', icon: '🍵', why: 'Reduces anxiety, improves sleep quality', avoid: false },
            { name: 'Avocado', icon: '🥑', why: 'B6 supports progesterone, reduces bloating', avoid: false },
            { name: 'Avoid: Caffeine & Alcohol', icon: '🚫', why: 'Amplifies anxiety and disrupts sleep', avoid: true },
        ],
        habits: [
            { icon: '💤', label: 'Sleep', tip: 'Prioritise 8hrs. Melatonin drops this phase.' },
            { icon: '💧', label: 'Water', tip: '3L+ with electrolytes. Reduces bloating.' },
            { icon: '📓', label: 'Journal', tip: 'Write feelings out — reduces overthinking.' },
            { icon: '🌡️', label: 'Heat', tip: 'Heating pad on lower abdomen before sleep.' },
        ],
        tip: 'Reduce workout intensity by 20–30% in the last 3 days. Listen to your body — rest is progress too.',
    },
};

export const MISSED_ALERTS = [
    { label: 'Day 0', icon: '📅', color: '#4dd0e1', title: 'Cycle Due Soon', msg: 'Your period is expected in 2 days. Prepare your care kit 🌸', actions: false },
    { label: 'Day +5', icon: '🌸', color: '#ffd54f', title: 'A Little Late', msg: 'Your cycle is 5 days late. Stress, travel, or diet changes can cause this — completely normal.', actions: false },
    { label: 'Day +7', icon: '💛', color: '#ffab76', title: 'Check-in Time', msg: '7 days late. Your cohort is here if you need to talk. Consider a home test or GP visit.', actions: true },
    { label: 'Day +10', icon: '❤️', color: '#f06292', title: "We're With You", msg: "10+ days. Whatever you are feeling is valid. LUNA support and a doctor referral are one tap away.", actions: true },
];
