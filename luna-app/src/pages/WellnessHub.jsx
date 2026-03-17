import { useState } from 'react';
import BottomNav from '../components/BottomNav';

const PHASE_DATA = {
    menstrual: {
        label: 'Menstrual', emoji: '🌑', color: '#ef5350', days: 'Day 1–5',
        energy: 25, mood: 'Low & Introspective',
        exercise: [
            { name: 'Yin Yoga', duration: '20 min', intensity: 'Rest', icon: '🧘', benefit: 'Eases cramps, calms nervous system' },
            { name: 'Slow Walk', duration: '15 min', intensity: 'Light', icon: '🚶', benefit: 'Boosts circulation without stress' },
            { name: 'Gentle Stretching', duration: '10 min', intensity: 'Rest', icon: '🤸', benefit: 'Relieves lower back tension' },
        ],
        foods: [
            { name: 'Dark Chocolate (70%+)', icon: '🍫', why: 'Magnesium replenishment, mood lift' },
            { name: 'Iron-rich Lentils', icon: '🫘', why: 'Replenishes iron lost during flow' },
            { name: 'Ginger Tea', icon: '🍵', why: 'Natural anti-inflammatory, reduces cramps' },
            { name: 'Beetroot', icon: '🫑', why: 'Iron + folate, rebuilds blood' },
            { name: 'Avoid: Salty & Fried', icon: '🚫', why: 'Worsens bloating and inflammation' },
        ],
        habits: [
            { icon: '💤', label: 'Sleep', tip: 'Sleep 8–9 hrs. Your body is repairing.' },
            { icon: '💧', label: 'Water', tip: '3L/day minimum. Warm water helps cramps.' },
            { icon: '📵', label: 'Screen Time', tip: 'Cut screen time after 9pm. Reduces cortisol.' },
            { icon: '🛁', label: 'Self Care', tip: 'Heat therapy on abdomen 2x/day.' },
        ],
        affirmation: 'Rest is not laziness. Your body is doing profound work right now.',
        phaseTip: 'Movement reduces cramps naturally. Even 10 minutes of gentle yoga is better than none.',
    },
    follicular: {
        label: 'Follicular', emoji: '🌱', color: '#66bb6a', days: 'Day 6–13',
        energy: 80, mood: 'Rising & Optimistic',
        exercise: [
            { name: 'HIIT Training', duration: '30 min', intensity: 'High', icon: '🏃', benefit: 'Peak strength gains in this phase' },
            { name: 'Dance Cardio', duration: '45 min', intensity: 'High', icon: '💃', benefit: 'Estrogen boost amplifies endurance' },
            { name: 'Strength Training', duration: '40 min', intensity: 'High', icon: '🏋️', benefit: 'Muscle building is easiest now' },
        ],
        foods: [
            { name: 'Eggs & Lean Protein', icon: '🥚', why: 'Supports follicle development' },
            { name: 'Fermented Foods', icon: '🥗', why: 'Probiotic gut health, estrogen balance' },
            { name: 'Flaxseeds', icon: '🌾', why: 'Phytoestrogens support rising estrogen' },
            { name: 'Fresh Berries', icon: '🍓', why: 'Antioxidants for cellular energy' },
            { name: 'Green Vegetables', icon: '🥦', why: 'Folate supports new cell growth' },
        ],
        habits: [
            { icon: '🌅', label: 'Morning', tip: 'Start new projects — creativity is high.' },
            { icon: '💧', label: 'Water', tip: '2.5L/day. Add lemon for detox.' },
            { icon: '📚', label: 'Learning', tip: 'Best time to learn new skills or study.' },
            { icon: '🤝', label: 'Social', tip: 'Schedule important meetings this week.' },
        ],
        affirmation: 'You are entering your power season. Every idea you have right now has the energy to become real.',
        phaseTip: 'Your muscle recovery is fastest now. Push harder — your body can handle it.',
    },
    ovulatory: {
        label: 'Ovulatory', emoji: '🌕', color: '#ffa726', days: 'Day 14–16',
        energy: 100, mood: 'Confident & Radiant',
        exercise: [
            { name: 'Group Sports', duration: '60 min', intensity: 'Peak', icon: '⚽', benefit: 'Social energy is at its peak' },
            { name: 'Running / Cycling', duration: '45 min', intensity: 'Peak', icon: '🚴', benefit: 'Maximum endurance window' },
            { name: 'Vinyasa Yoga', duration: '50 min', intensity: 'High', icon: '🧘', benefit: 'Channels peak energy gracefully' },
        ],
        foods: [
            { name: 'Quinoa & Brown Rice', icon: '🍚', why: 'Sustained energy for peak performance' },
            { name: 'Berries & Citrus', icon: '🍊', why: 'Antioxidants support peak hormones' },
            { name: 'Cruciferous Veggies', icon: '🥬', why: 'Supports estrogen metabolism' },
            { name: 'Pumpkin Seeds (Zinc)', icon: '🎃', why: 'Supports progesterone production' },
            { name: 'Light & Fresh Meals', icon: '🥙', why: 'Appetite is naturally lower now' },
        ],
        habits: [
            { icon: '🎤', label: 'Voice', tip: 'Speak up — your voice is most persuasive now.' },
            { icon: '💧', label: 'Water', tip: '2.5L/day. Stay cool and hydrated.' },
            { icon: '🎯', label: 'Goals', tip: 'Make decisions — judgment is at its best.' },
            { icon: '✨', label: 'Confidence', tip: 'You literally glow today. Own it.' },
        ],
        affirmation: 'You are at your most magnetic. Walk into every room knowing you belong there.',
        phaseTip: 'This is your peak athletic window. Set personal records and try challenging workouts now.',
    },
    luteal: {
        label: 'Luteal', emoji: '🌸', color: '#f06292', days: 'Day 17–28',
        energy: 45, mood: 'Sensitive & Reflective',
        exercise: [
            { name: 'Pilates', duration: '30 min', intensity: 'Moderate', icon: '🤸', benefit: 'Stabilizes mood through movement' },
            { name: 'Swimming', duration: '30 min', intensity: 'Moderate', icon: '🏊', benefit: 'Full body, low impact, calming' },
            { name: 'Nature Walk', duration: '25 min', intensity: 'Light', icon: '🌿', benefit: 'Reduces cortisol and anxiety naturally' },
        ],
        foods: [
            { name: 'Magnesium-rich Spinach', icon: '🥬', why: 'Directly reduces PMS cramps and mood swings' },
            { name: 'Complex Carbs (Oats)', icon: '🌾', why: 'Stabilizes serotonin, reduces cravings' },
            { name: 'Chamomile Tea', icon: '🍵', why: 'Reduces anxiety, improves sleep quality' },
            { name: 'Avocado', icon: '🥑', why: 'B6 supports progesterone, reduces bloating' },
            { name: 'Avoid: Caffeine & Alcohol', icon: '🚫', why: 'Amplifies anxiety and disrupts sleep' },
        ],
        habits: [
            { icon: '💤', label: 'Sleep', tip: 'Prioritise 8hrs. Melatonin drops this phase.' },
            { icon: '💧', label: 'Water', tip: '3L+ with electrolytes. Reduces bloating.' },
            { icon: '📓', label: 'Journal', tip: 'Write feelings out — reduces overthinking.' },
            { icon: '🌡️', label: 'Heat', tip: 'Heating pad on lower abdomen before sleep.' },
        ],
        affirmation: 'Your sensitivity is not weakness — it is depth. The world needs women who feel things this fully.',
        phaseTip: 'Reduce workout intensity by 20–30% in the last 3 days. Listen to your body.',
    },
};

const MISSED_ALERTS = [
    { label: 'Day 0', icon: '📅', color: '#4dd0e1', title: 'Cycle Due Soon', msg: 'Your period is expected in 2 days. Prepare your care kit 🌸' },
    { label: 'Day +5', icon: '🌸', color: '#ffd54f', title: 'A Little Late', msg: 'Your cycle is 5 days late. Stress, travel, or diet changes can cause this — completely normal.' },
    { label: 'Day +7', icon: '💛', color: '#ffab76', title: 'Check-in Time', msg: '7 days late. Your cohort is here if you need to talk. Consider a home test or GP visit.' },
    { label: 'Day +10', icon: '❤️', color: '#f06292', title: "We're With You", msg: "10+ days. Whatever you're feeling is valid. Support and a doctor referral are one tap away.", actions: true },
];

export default function WellnessHub() {
    const [activePhase, setActivePhase] = useState('luteal');
    const [activeTab, setActiveTab] = useState('exercise');
    const [alertIdx, setAlertIdx] = useState(0);
    const [showAffirm, setShowAffirm] = useState(false);
    const [checkedHabits, setCheckedHabits] = useState({});

    const d = PHASE_DATA[activePhase];

    const tabs = [
        { id: 'exercise', icon: '🏃', label: 'Move' },
        { id: 'food', icon: '🍽', label: 'Eat' },
        { id: 'habits', icon: '🌿', label: 'Habits' },
        { id: 'alerts', icon: '📅', label: 'Alerts' },
    ];

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: "'DM Sans', sans-serif" }} className="has-bottom-nav">
            {/* Header */}
            <div style={{ background: 'rgba(7,9,15,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 10, position: 'sticky', top: 0, zIndex: 50 }}>
                <span style={{ fontSize: 20 }}>🌿</span>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>Wellness Hub</span>
                <div style={{ marginLeft: 'auto', padding: '3px 10px', background: `${d.color}22`, borderRadius: 'var(--radius-full)', fontSize: 11, color: d.color, fontWeight: 700 }}>{d.emoji} {d.label}</div>
            </div>

            {/* Phase tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
                {Object.entries(PHASE_DATA).map(([key, pd]) => (
                    <button key={key} onClick={() => { setActivePhase(key); setShowAffirm(false); }} style={{
                        flex: 1, padding: '12px 4px', background: 'transparent', border: 'none',
                        borderBottom: activePhase === key ? `2px solid ${pd.color}` : '2px solid transparent',
                        cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, transition: 'all 0.2s',
                    }}>
                        <span style={{ fontSize: 18 }}>{pd.emoji}</span>
                        <span style={{ fontSize: 9, color: activePhase === key ? pd.color : 'var(--text-muted)', fontWeight: activePhase === key ? 700 : 400, fontFamily: 'DM Sans, sans-serif' }}>{pd.label}</span>
                    </button>
                ))}
            </div>

            <div style={{ maxWidth: 560, margin: '0 auto', padding: '16px' }}>
                {/* Phase hero card */}
                <div style={{ background: `linear-gradient(135deg, ${d.color}20, ${d.color}08)`, border: `1px solid ${d.color}44`, borderRadius: 'var(--radius-xl)', padding: 18, marginBottom: 16, animation: 'fadeUp 0.3s ease' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                        <div style={{ fontSize: 36 }}>{d.emoji}</div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>{d.label} Phase</div>
                            <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{d.days} · {d.mood}</div>
                        </div>
                    </div>
                    {/* Energy */}
                    <div style={{ marginBottom: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                            <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>Energy Level</span>
                            <span style={{ fontSize: 10, color: d.color, fontWeight: 700 }}>{d.energy}%</span>
                        </div>
                        <div style={{ height: 5, background: 'rgba(255,255,255,0.08)', borderRadius: 3 }}>
                            <div style={{ width: `${d.energy}%`, height: '100%', background: `linear-gradient(90deg, ${d.color}88, ${d.color})`, borderRadius: 3, transition: 'width 0.6s ease' }} />
                        </div>
                    </div>
                    {/* Affirmation */}
                    <div onClick={() => setShowAffirm(!showAffirm)} style={{ background: `${d.color}15`, borderRadius: 'var(--radius-md)', padding: '10px 12px', cursor: 'pointer' }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: d.color }}>💪 Tap for your daily affirmation</div>
                        {showAffirm && <div style={{ fontSize: 12, color: 'var(--text-dim)', fontStyle: 'italic', lineHeight: 1.6, marginTop: 8, fontFamily: "'Playfair Display', serif" }}>✨ "{d.affirmation}"</div>}
                    </div>
                </div>

                {/* Sub-tabs */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto', scrollbarWidth: 'none' }}>
                    {tabs.map(t => (
                        <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ padding: '8px 18px', borderRadius: 'var(--radius-full)', border: 'none', cursor: 'pointer', flexShrink: 0, background: activeTab === t.id ? d.color : 'var(--card)', color: activeTab === t.id ? 'white' : 'var(--text-muted)', fontSize: 12, fontWeight: activeTab === t.id ? 700 : 400, fontFamily: 'DM Sans, sans-serif', transition: 'all 0.2s' }}>
                            {t.icon} {t.label}
                        </button>
                    ))}
                </div>

                {/* EXERCISE TAB */}
                {activeTab === 'exercise' && (
                    <div style={{ animation: 'fadeUp 0.3s ease' }}>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>Best exercises for your {d.label} phase</div>
                        {d.exercise.map((e, i) => (
                            <div key={i} className="card" style={{ padding: '14px 16px', marginBottom: 10, display: 'flex', gap: 12, alignItems: 'center' }}>
                                <div style={{ width: 48, height: 48, borderRadius: 12, background: `${d.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0, border: `1px solid ${d.color}33` }}>{e.icon}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                                        <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{e.name}</span>
                                        <span style={{ fontSize: 10, color: d.color, background: `${d.color}18`, padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>{e.intensity}</span>
                                    </div>
                                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 3 }}>⏱ {e.duration}</div>
                                    <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>{e.benefit}</div>
                                </div>
                            </div>
                        ))}
                        <div style={{ background: `${d.color}10`, border: `1px solid ${d.color}30`, borderRadius: 'var(--radius-md)', padding: '12px 14px' }}>
                            <div style={{ fontSize: 11, color: d.color, fontWeight: 700, marginBottom: 4 }}>💡 Phase Tip</div>
                            <div style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.6 }}>{d.phaseTip}</div>
                        </div>
                    </div>
                )}

                {/* FOOD TAB */}
                {activeTab === 'food' && (
                    <div style={{ animation: 'fadeUp 0.3s ease' }}>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>Phase-specific nutrition for {d.label}</div>
                        {d.foods.map((f, i) => (
                            <div key={i} style={{ background: f.icon === '🚫' ? 'rgba(239,83,80,0.08)' : 'var(--card)', border: `1px solid ${f.icon === '🚫' ? 'rgba(239,83,80,0.3)' : 'var(--border)'}`, borderRadius: 'var(--radius-md)', padding: '12px 14px', marginBottom: 8, display: 'flex', gap: 12, alignItems: 'center' }}>
                                <span style={{ fontSize: 24, flexShrink: 0 }}>{f.icon}</span>
                                <div>
                                    <div style={{ fontSize: 13, fontWeight: 600, color: f.icon === '🚫' ? '#ef9a9a' : 'var(--text)', marginBottom: 3 }}>{f.name}</div>
                                    <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.5 }}>{f.why}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* HABITS TAB */}
                {activeTab === 'habits' && (
                    <div style={{ animation: 'fadeUp 0.3s ease' }}>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>Daily adjustments for {d.label} phase</div>
                        {d.habits.map((h, i) => (
                            <div key={i} className="card" style={{ padding: '14px 16px', marginBottom: 10, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                <span style={{ fontSize: 24, flexShrink: 0 }}>{h.icon}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{h.label}</div>
                                    <div style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.6 }}>{h.tip}</div>
                                </div>
                                <div onClick={() => setCheckedHabits(p => ({ ...p, [`${activePhase}-${i}`]: !p[`${activePhase}-${i}`] }))} style={{ width: 24, height: 24, borderRadius: 6, border: `2px solid ${checkedHabits[`${activePhase}-${i}`] ? d.color : 'var(--border)'}`, background: checkedHabits[`${activePhase}-${i}`] ? d.color : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, transition: 'all 0.2s' }}>
                                    {checkedHabits[`${activePhase}-${i}`] && <span style={{ color: 'white', fontSize: 12 }}>✓</span>}
                                </div>
                            </div>
                        ))}
                        {/* Check-in widget */}
                        <div style={{ background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.3)', borderRadius: 'var(--radius-lg)', padding: 16, marginTop: 8 }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#a78bfa', marginBottom: 10 }}>📓 Today's Quick Check-in</div>
                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                {['😴 Rested', '💧 Hydrated', '🧘 Moved', '🥗 Ate Well', '📓 Journalled'].map(item => (
                                    <div key={item} style={{ padding: '6px 12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-full)', fontSize: 11, color: 'var(--text-dim)', cursor: 'pointer' }}>{item}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* ALERTS TAB */}
                {activeTab === 'alerts' && (
                    <div style={{ animation: 'fadeUp 0.3s ease' }}>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>Smart cycle monitoring & compassionate alerts</div>
                        <div style={{ display: 'flex', gap: 6, marginBottom: 14, overflowX: 'auto', scrollbarWidth: 'none' }}>
                            {MISSED_ALERTS.map((a, i) => (
                                <button key={i} onClick={() => setAlertIdx(i)} style={{ padding: '6px 12px', borderRadius: 'var(--radius-full)', border: `1px solid ${alertIdx === i ? a.color + '66' : 'var(--border)'}`, cursor: 'pointer', flexShrink: 0, background: alertIdx === i ? `${a.color}22` : 'var(--card)', color: alertIdx === i ? a.color : 'var(--text-muted)', fontSize: 11, fontWeight: alertIdx === i ? 700 : 400, fontFamily: 'DM Sans, sans-serif' }}>{a.label}</button>
                            ))}
                        </div>
                        <div style={{ background: `${MISSED_ALERTS[alertIdx].color}15`, border: `1px solid ${MISSED_ALERTS[alertIdx].color}44`, borderRadius: 'var(--radius-lg)', padding: 18, marginBottom: 14, animation: 'fadeUp 0.3s ease' }}>
                            <div style={{ fontSize: 28, marginBottom: 10 }}>{MISSED_ALERTS[alertIdx].icon}</div>
                            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{MISSED_ALERTS[alertIdx].title}</div>
                            <div style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.7 }}>{MISSED_ALERTS[alertIdx].msg}</div>
                            {MISSED_ALERTS[alertIdx].actions && (
                                <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                                    <button style={{ flex: 1, padding: 9, background: MISSED_ALERTS[alertIdx].color, border: 'none', borderRadius: 10, color: 'white', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>Talk to Cohort</button>
                                    <button style={{ flex: 1, padding: 9, background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text-dim)', fontSize: 12, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>Find a Doctor</button>
                                </div>
                            )}
                        </div>
                        <div className="card" style={{ padding: 16 }}>
                            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>Common Reasons for Cycle Changes</div>
                            {[
                                { icon: '😰', reason: 'Stress & Anxiety', desc: 'Most common cause of a delayed cycle' },
                                { icon: '✈️', reason: 'Travel / Timezone Change', desc: 'Disrupts circadian rhythm' },
                                { icon: '🍽', reason: 'Significant Diet Changes', desc: 'Drastic changes affect hormone levels' },
                                { icon: '🏋️', reason: 'Over-exercising', desc: 'Excess training can pause cycles' },
                                { icon: '💊', reason: 'Medication Changes', desc: 'Some medications delay or skip cycles' },
                            ].map((r, i) => (
                                <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderTop: '1px solid var(--border)' }}>
                                    <span style={{ fontSize: 16 }}>{r.icon}</span>
                                    <div>
                                        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>{r.reason}</div>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{r.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <BottomNav />
        </div>
    );
}
