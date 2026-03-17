import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useCycleStore } from '../store/cycleStore';
import { PHASES } from '../lib/constants';
import BottomNav from '../components/BottomNav';

const SYMPTOMS = [
    { id: 1, emoji: '😮‍💨', name: 'Bloating', menstrual: 71, follicular: 18, ovulatory: 22, luteal: 68 },
    { id: 2, emoji: '🧠', name: 'Brain Fog', menstrual: 54, follicular: 12, ovulatory: 8, luteal: 62 },
    { id: 3, emoji: '😤', name: 'Mood Swings', menstrual: 65, follicular: 14, ovulatory: 11, luteal: 78 },
    { id: 4, emoji: '😴', name: 'Fatigue', menstrual: 80, follicular: 22, ovulatory: 15, luteal: 70 },
    { id: 5, emoji: '🤕', name: 'Cramps', menstrual: 88, follicular: 6, ovulatory: 4, luteal: 42 },
    { id: 6, emoji: '🫦', name: 'Food Cravings', menstrual: 58, follicular: 24, ovulatory: 18, luteal: 85 },
    { id: 7, emoji: '😣', name: 'Lower Back Pain', menstrual: 72, follicular: 10, ovulatory: 12, luteal: 45 },
    { id: 8, emoji: '💧', name: 'Water Retention', menstrual: 60, follicular: 14, ovulatory: 20, luteal: 74 },
    { id: 9, emoji: '😤', name: 'Irritability', menstrual: 55, follicular: 10, ovulatory: 5, luteal: 82 },
    { id: 10, emoji: '🤯', name: 'Headaches', menstrual: 48, follicular: 15, ovulatory: 12, luteal: 52 },
    { id: 11, emoji: '😪', name: 'Insomnia', menstrual: 44, follicular: 9, ovulatory: 8, luteal: 60 },
    { id: 12, emoji: '🌡️', name: 'Tender Breasts', menstrual: 35, follicular: 12, ovulatory: 30, luteal: 70 },
    { id: 13, emoji: '🤢', name: 'Nausea', menstrual: 42, follicular: 8, ovulatory: 5, luteal: 30 },
    { id: 14, emoji: '✨', name: 'High Energy', menstrual: 8, follicular: 78, ovulatory: 85, luteal: 12 },
    { id: 15, emoji: '🧖', name: 'Skin Breakouts', menstrual: 55, follicular: 30, ovulatory: 15, luteal: 68 },
    { id: 16, emoji: '💪', name: 'Increased Strength', menstrual: 10, follicular: 65, ovulatory: 74, luteal: 8 },
];

const PHASE_KEYS = ['menstrual', 'follicular', 'ovulatory', 'luteal'];

export default function SymptomValidator() {
    const currentPhase = useCycleStore(state => state.currentPhase);
    const p = PHASES[currentPhase] || PHASES.luteal;

    const [filterPhase, setFilterPhase] = useState(currentPhase || 'luteal');
    const [votes, setVotes] = useState({}); // { [id]: 'yes' | 'no' }
    const [search, setSearch] = useState('');
    const [customQ, setCustomQ] = useState('');
    const [customSent, setCustomSent] = useState(false);
    const [sort, setSort] = useState('popular'); // 'popular' | 'name'

    const fp = PHASES[filterPhase] || PHASES.luteal;

    const filtered = SYMPTOMS
        .filter(s => !search || s.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => sort === 'popular'
            ? b[filterPhase] - a[filterPhase]
            : a.name.localeCompare(b.name));

    const voted = Object.keys(votes).length;
    const meToo = Object.values(votes).filter(v => v === 'yes').length;

    return (
        <div className="page has-bottom-nav" style={{ fontFamily: 'var(--font-sans)' }}>
            {/* Header */}
            <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(13,13,20,.94)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)', padding: '13px 18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                    <span style={{ fontSize: 20 }}>🩺</span>
                    <span className="serif" style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>Symptom Validator</span>
                    <div style={{ marginLeft: 'auto', padding: '3px 10px', background: `${p.color}22`, border: `1px solid ${p.color}44`, borderRadius: 'var(--r-full)', fontSize: 10, color: p.color, fontWeight: 700 }}>{p.emoji} {p.label}</div>
                </div>
                <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: 13 }}>🔍</span>
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search symptoms..." style={{ width: '100%', padding: '9px 12px 9px 34px', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--r-full)', color: 'var(--text)', fontSize: 13, fontFamily: 'var(--font-sans)', outline: 'none', boxSizing: 'border-box' }} />
                </div>
            </div>

            <div style={{ maxWidth: 680, margin: '0 auto', padding: '14px 16px' }}>

                {/* Phase Filter */}
                <div style={{ display: 'flex', background: 'var(--card)', borderRadius: 'var(--r-lg)', padding: 4, border: '1px solid var(--border)', gap: 4, marginBottom: 14 }}>
                    {PHASE_KEYS.map(ph => {
                        const phase = PHASES[ph];
                        return (
                            <button key={ph} onClick={() => setFilterPhase(ph)} style={{ flex: 1, padding: '7px 4px', borderRadius: 'var(--r-md)', border: 'none', cursor: 'pointer', background: filterPhase === ph ? phase.color : 'transparent', color: filterPhase === ph ? 'white' : 'var(--text-muted)', fontSize: 11, fontFamily: 'var(--font-sans)', fontWeight: filterPhase === ph ? 700 : 400, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, transition: 'all .2s' }}>
                                <span style={{ fontSize: 14 }}>{phase.emoji}</span>
                                <span style={{ fontSize: 9 }}>{phase.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Sort + Stats row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                        You voted on <span style={{ color: fp.color, fontWeight: 700 }}>{voted}</span> symptoms — <span style={{ color: 'var(--mint)', fontWeight: 700 }}>{meToo} "Me too"</span>
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                        {['popular', 'name'].map(s => (
                            <button key={s} onClick={() => setSort(s)} style={{ padding: '4px 10px', background: sort === s ? `${fp.color}22` : 'transparent', border: `1px solid ${sort === s ? fp.color : 'var(--border)'}`, borderRadius: 'var(--r-full)', fontSize: 10, color: sort === s ? fp.color : 'var(--text-muted)', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: sort === s ? 700 : 400 }}>
                                {s === 'popular' ? '🔥 %' : 'A–Z'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Symptom cards */}
                {filtered.map(s => {
                    const pct = s[filterPhase];
                    const vote = votes[s.id];
                    return (
                        <div key={s.id} className="card" style={{ padding: '14px 16px', marginBottom: 10 }}>
                            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 10 }}>
                                <span style={{ fontSize: 24, flexShrink: 0 }}>{s.emoji}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                                        <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{s.name}</span>
                                        <span style={{ fontSize: 13, fontWeight: 700, color: fp.color }}>{pct}%</span>
                                    </div>
                                    <div style={{ height: 6, background: 'rgba(255,255,255,.06)', borderRadius: 3 }}>
                                        <div style={{ width: `${pct}%`, height: '100%', background: fp.color, borderRadius: 3, transition: 'width .5s ease' }} />
                                    </div>
                                    <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>of women in {fp.label} phase report this</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 8 }}>
                                <button onClick={() => setVotes(v => ({ ...v, [s.id]: vote === 'yes' ? undefined : 'yes' }))} style={{ flex: 1, padding: '8px 4px', background: vote === 'yes' ? 'rgba(105,240,174,.15)' : 'var(--surface)', border: `1.5px solid ${vote === 'yes' ? 'var(--mint)' : 'var(--border)'}`, borderRadius: 'var(--r-md)', color: vote === 'yes' ? 'var(--mint)' : 'var(--text-muted)', fontSize: 12, fontWeight: vote === 'yes' ? 700 : 400, cursor: 'pointer', fontFamily: 'var(--font-sans)', display: 'flex', justifyContent: 'center', gap: 6, transition: 'all .2s' }}>
                                    {vote === 'yes' ? '✅' : '☑️'} Me too
                                </button>
                                <button onClick={() => setVotes(v => ({ ...v, [s.id]: vote === 'no' ? undefined : 'no' }))} style={{ flex: 1, padding: '8px 4px', background: vote === 'no' ? 'rgba(239,83,80,.1)' : 'var(--surface)', border: `1.5px solid ${vote === 'no' ? '#ef5350' : 'var(--border)'}`, borderRadius: 'var(--r-md)', color: vote === 'no' ? '#ef9a9a' : 'var(--text-muted)', fontSize: 12, fontWeight: vote === 'no' ? 700 : 400, cursor: 'pointer', fontFamily: 'var(--font-sans)', display: 'flex', justifyContent: 'center', gap: 6, transition: 'all .2s' }}>
                                    {vote === 'no' ? '❌' : '✖️'} Not me
                                </button>
                            </div>
                        </div>
                    );
                })}

                {/* Ask the cohort */}
                <div className="card" style={{ padding: 18, marginBottom: 16 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>🙋 Ask the cohort about a symptom</div>
                    <div style={{ display: 'flex', gap: 8 }}>
                        <input value={customQ} onChange={e => setCustomQ(e.target.value)} placeholder="e.g. Does anyone get jaw pain during Luteal?" style={{ flex: 1, padding: '9px 13px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-full)', color: 'var(--text)', fontSize: 13, fontFamily: 'var(--font-sans)', outline: 'none' }} />
                        <button onClick={() => { if (!customQ.trim()) return; setCustomSent(true); setCustomQ(''); setTimeout(() => setCustomSent(false), 3000); }} style={{ padding: '9px 18px', background: p.color, border: 'none', borderRadius: 'var(--r-full)', color: 'white', fontSize: 12, cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 700, whiteSpace: 'nowrap' }}>Ask →</button>
                    </div>
                    {customSent && <div className="anim-fade-up" style={{ marginTop: 10, fontSize: 12, color: 'var(--mint)', textAlign: 'center' }}>✓ Posted to your cohort! You'll see responses soon.</div>}
                </div>
            </div>
            <BottomNav />
        </div>
    );
}
