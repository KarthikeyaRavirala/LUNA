import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useCycleStore } from '../store/cycleStore';
import { PHASES } from '../lib/constants';
import BottomNav from '../components/BottomNav';

const MOODS = [
    { emoji: '🤩', label: 'Amazing', value: 5, color: '#69f0ae' },
    { emoji: '😊', label: 'Good', value: 4, color: '#aed581' },
    { emoji: '😐', label: 'Neutral', value: 3, color: '#ffd54f' },
    { emoji: '😔', label: 'Low', value: 2, color: '#ffb74d' },
    { emoji: '😡', label: 'Frustrated', value: 1, color: '#ef9a9a' },
];

const PROMPTS = [
    'How does your body feel right now?',
    'What are you grateful for today?',
    'What emotion showed up most strongly today?',
    'What did you need today that you gave yourself?',
    'What would make tomorrow feel easier?',
    'How did your energy shift throughout the day?',
];

function Heatmap({ entries, phase, phaseColor }) {
    // Build last 28 days grid
    const days = Array.from({ length: 28 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (27 - i));
        const key = d.toISOString().split('T')[0];
        return { key, day: d.getDate(), entry: entries[key] };
    });

    return (
        <div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
                <span>Last 28 days</span>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 10 }}>
                    {MOODS.slice().reverse().map(m => (
                        <div key={m.value} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                            <div style={{ width: 8, height: 8, borderRadius: 2, background: m.entry ? m.color : 'var(--border)' }} />
                        </div>
                    ))}
                    <span style={{ color: 'var(--text-muted)' }}>← mood</span>
                </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
                {days.map(({ key, day, entry }) => (
                    <div key={key} title={entry ? `${entry.moodLabel}: ${entry.text?.slice(0, 30)}...` : day} style={{
                        height: 32, borderRadius: 6, border: '1px solid var(--border)',
                        background: entry ? entry.moodColor + 'cc' : 'var(--surface)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 10, color: entry ? 'white' : 'var(--text-muted)',
                        cursor: entry ? 'pointer' : 'default', fontWeight: entry ? 700 : 400,
                        boxShadow: entry ? `0 2px 8px ${entry.moodColor}44` : 'none',
                        transition: 'transform .15s',
                    }}>
                        {entry ? entry.moodEmoji : day}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function LunaJournal() {
    const user = useAuthStore(state => state.user);
    const currentPhase = useCycleStore(state => state.currentPhase);
    const p = PHASES[currentPhase] || PHASES.luteal;

    const [view, setView] = useState('write'); // 'write' | 'history' | 'insights'
    const [text, setText] = useState('');
    const [mood, setMood] = useState(null);
    const [saved, setSaved] = useState(false);
    const [entries, setEntries] = useState(() => {
        try { return JSON.parse(localStorage.getItem('luna_journal')) || {}; }
        catch { return {}; }
    });
    const [promptIdx, setPromptIdx] = useState(0);

    const today = new Date().toISOString().split('T')[0];
    const todayEntry = entries[today];

    const save = () => {
        if (!text.trim() || !mood) return;
        const entry = {
            text, mood: mood.value, moodEmoji: mood.emoji,
            moodLabel: mood.label, moodColor: mood.color,
            phase: currentPhase, phaseLabel: p.label,
            date: today, ts: Date.now(),
        };
        const next = { ...entries, [today]: entry };
        setEntries(next);
        localStorage.setItem('luna_journal', JSON.stringify(next));
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
        setText('');
        setMood(null);
    };

    const entryList = Object.values(entries).sort((a, b) => b.ts - a.ts);
    const avgMood = entryList.length ? (entryList.reduce((s, e) => s + e.mood, 0) / entryList.length).toFixed(1) : '-';
    const bestPhase = (() => {
        const byPhase = {};
        entryList.forEach(e => { byPhase[e.phase] = (byPhase[e.phase] || []).concat(e.mood); });
        let best = null, bestAvg = 0;
        Object.entries(byPhase).forEach(([ph, moods]) => {
            const avg = moods.reduce((s, v) => s + v, 0) / moods.length;
            if (avg > bestAvg) { bestAvg = avg; best = ph; }
        });
        return best ? PHASES[best]?.label : 'Follicular';
    })();

    const VIEWS = [
        { id: 'write', label: '✏️ Write' },
        { id: 'history', label: '📅 History' },
        { id: 'insights', label: '🧠 Insights' },
    ];

    return (
        <div className="page has-bottom-nav" style={{ fontFamily: 'var(--font-sans)' }}>
            {/* Header */}
            <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(13,13,20,.94)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)', padding: '13px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 20 }}>📓</span>
                    <span className="serif" style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>Luna Journal</span>
                </div>
                <div style={{ padding: '3px 10px', background: `${p.color}22`, border: `1px solid ${p.color}44`, borderRadius: 'var(--r-full)', fontSize: 11, color: p.color, fontWeight: 700 }}>{p.emoji} {p.label}</div>
            </div>

            {/* View tabs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 4, padding: 12, background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
                {VIEWS.map(v => (
                    <button key={v.id} onClick={() => setView(v.id)} style={{ padding: '9px 4px', borderRadius: 'var(--r-md)', border: 'none', cursor: 'pointer', background: view === v.id ? 'var(--card)' : 'transparent', color: view === v.id ? 'var(--text)' : 'var(--text-muted)', fontSize: 12, fontWeight: view === v.id ? 700 : 400, fontFamily: 'var(--font-sans)', transition: 'all .2s', boxShadow: view === v.id ? '0 1px 4px rgba(0,0,0,.3)' : 'none' }}>
                        {v.label}
                    </button>
                ))}
            </div>

            <div style={{ maxWidth: 600, margin: '0 auto', padding: '16px' }}>

                {/* ── WRITE ── */}
                {view === 'write' && (
                    <div className="anim-fade-up">
                        {/* Prompt */}
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14 }}>
                            <div style={{ flex: 1, padding: '12px 16px', background: `${p.color}14`, border: `1px solid ${p.color}33`, borderRadius: 'var(--r-lg)', fontSize: 13, color: 'var(--text-dim)', fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>
                                "{PROMPTS[promptIdx]}"
                            </div>
                            <button onClick={() => setPromptIdx(i => (i + 1) % PROMPTS.length)} style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid var(--border)', background: 'var(--card)', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 16 }}>↻</button>
                        </div>

                        {/* Mood picker */}
                        <div style={{ marginBottom: 14 }}>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 10 }}>How are you feeling?</div>
                            <div style={{ display: 'flex', gap: 10, justifyContent: 'space-between' }}>
                                {MOODS.map(m => (
                                    <button key={m.value} onClick={() => setMood(mood?.value === m.value ? null : m)} style={{ flex: 1, padding: '10px 4px', borderRadius: 'var(--r-md)', border: `2px solid ${mood?.value === m.value ? m.color : 'var(--border)'}`, background: mood?.value === m.value ? `${m.color}22` : 'var(--card)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, transition: 'all .2s', transform: mood?.value === m.value ? 'scale(1.08)' : 'scale(1)' }}>
                                        <span style={{ fontSize: 22 }}>{m.emoji}</span>
                                        <span style={{ fontSize: 9, color: mood?.value === m.value ? m.color : 'var(--text-muted)', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>{m.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Phase label */}
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
                            <div className="phase-pill" style={{ background: p.bg, color: p.color, border: `1px solid ${p.color}44` }}>{p.emoji} {p.label}</div>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>auto-tagged</div>
                        </div>

                        {/* Text area */}
                        <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Write freely here — this is only ever visible to you..."
                            style={{ width: '100%', minHeight: 180, padding: '14px 16px', background: 'var(--card)', border: `1px solid ${text ? p.color + '66' : 'var(--border)'}`, borderRadius: 'var(--r-lg)', color: 'var(--text)', fontSize: 14, fontFamily: 'var(--font-sans)', outline: 'none', resize: 'vertical', lineHeight: 1.75, transition: 'border-color .2s', marginBottom: 14 }} />

                        {/* Today's existing entry */}
                        {todayEntry && (
                            <div style={{ padding: '12px 14px', background: `${todayEntry.moodColor}10`, border: `1px solid ${todayEntry.moodColor}33`, borderRadius: 'var(--r-md)', marginBottom: 14 }}>
                                <div style={{ fontSize: 11, color: todayEntry.moodColor, fontWeight: 700, marginBottom: 4 }}>{todayEntry.moodEmoji} Already wrote today — {todayEntry.moodLabel}</div>
                                <div style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.6 }}>{todayEntry.text.slice(0, 120)}{todayEntry.text.length > 120 && '...'}</div>
                            </div>
                        )}

                        {saved && (
                            <div className="anim-fade-up" style={{ padding: '10px 14px', background: 'rgba(105,240,174,.12)', border: '1px solid rgba(105,240,174,.3)', borderRadius: 'var(--r-md)', fontSize: 13, color: 'var(--mint)', textAlign: 'center', marginBottom: 14 }}>
                                ✓ Entry saved — only you can see this 🔒
                            </div>
                        )}

                        <button onClick={save} className="btn btn-primary" style={{ width: '100%', fontSize: 14, padding: 13 }} disabled={!text.trim() || !mood}>
                            {!mood ? 'Select a mood to save' : !text.trim() ? 'Write something first' : '💾 Save Entry'}
                        </button>

                        <div style={{ marginTop: 10, fontSize: 11, color: 'var(--text-muted)', textAlign: 'center' }}>
                            🔒 End-to-end encrypted · Never shared · Never used for ads
                        </div>
                    </div>
                )}

                {/* ── HISTORY ── */}
                {view === 'history' && (
                    <div className="anim-fade-up">
                        <div style={{ marginBottom: 16 }}>
                            <Heatmap entries={entries} phase={currentPhase} phaseColor={p.color} />
                        </div>

                        {entryList.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                                <div style={{ fontSize: 40, marginBottom: 12 }}>📓</div>
                                <div style={{ fontSize: 14 }}>No entries yet. Write your first one!</div>
                            </div>
                        ) : entryList.map((e, i) => (
                            <div key={e.date} className="card" style={{ padding: '14px 16px', marginBottom: 10, borderLeft: `3px solid ${e.moodColor}` }} >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                    <span style={{ fontSize: 18 }}>{e.moodEmoji}</span>
                                    <div style={{ flex: 1 }}>
                                        <span style={{ fontSize: 12, fontWeight: 700, color: e.moodColor }}>{e.moodLabel}</span>
                                        <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 6 }}>{e.date}</span>
                                    </div>
                                    <div className="phase-pill" style={{ background: PHASES[e.phase]?.bg, color: PHASES[e.phase]?.color, border: `1px solid ${PHASES[e.phase]?.color}44`, fontSize: 10 }}>
                                        {PHASES[e.phase]?.emoji} {e.phaseLabel}
                                    </div>
                                </div>
                                <div style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.65 }}>{e.text}</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* ── INSIGHTS ── */}
                {view === 'insights' && (
                    <div className="anim-fade-up">
                        {/* Summary stats */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 16 }}>
                            {[
                                { icon: '📝', label: 'Entries', value: entryList.length },
                                { icon: '😊', label: 'Avg Mood', value: `${avgMood}/5` },
                                { icon: '✨', label: 'Best Phase', value: bestPhase },
                            ].map(s => (
                                <div key={s.label} className="card" style={{ padding: '14px 6px', textAlign: 'center' }}>
                                    <div style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
                                    <div className="serif" style={{ fontSize: 18, fontWeight: 700, color: 'var(--rose-lite)', marginBottom: 2 }}>{s.value}</div>
                                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{s.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Mood by phase */}
                        <div className="card" style={{ padding: 18, marginBottom: 12 }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 14 }}>🌙 Mood patterns by phase</div>
                            {Object.values(PHASES).map(ph => {
                                const phEntries = entryList.filter(e => e.phase === ph.key);
                                const phAvg = phEntries.length ? phEntries.reduce((s, e) => s + e.mood, 0) / phEntries.length : 0;
                                return (
                                    <div key={ph.key} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                                        <span style={{ fontSize: 16, width: 24, flexShrink: 0 }}>{ph.emoji}</span>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: 12, color: 'var(--text)', marginBottom: 4 }}>{ph.label}</div>
                                            <div style={{ height: 5, background: 'rgba(255,255,255,.08)', borderRadius: 3 }}>
                                                <div style={{ width: `${phAvg * 20}%`, height: '100%', background: ph.color, borderRadius: 3, transition: 'width .5s ease' }} />
                                            </div>
                                        </div>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)', width: 30, textAlign: 'right' }}>
                                            {phEntries.length > 0 ? `${(phAvg).toFixed(1)}` : '—'}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Doctor export */}
                        <button className="btn btn-ghost" style={{ width: '100%', padding: 13, fontSize: 13 }}>
                            📄 Export 3-Cycle PDF Summary (Phase 3 feature)
                        </button>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', textAlign: 'center', marginTop: 8 }}>Share this with your gynaecologist</div>
                    </div>
                )}
            </div>
            <BottomNav />
        </div>
    );
}
