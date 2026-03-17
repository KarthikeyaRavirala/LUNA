import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const SUGGESTIONS = ['MoonRose', 'CrimsonSkye', 'StarlightK', 'EveningBloom', 'VelvetMoon', 'RoseWater', 'LunaHeart', 'SilverTide'];

const GOOGLE_SERVICES = [
    { id: 'calendar', icon: '📅', name: 'Google Calendar', desc: 'Auto-block phase windows in your work calendar', color: '#4285F4' },
    { id: 'fit', icon: '🏃', name: 'Google Fit', desc: 'Read activity data for smarter fitness tips', color: '#34A853' },
    { id: 'tasks', icon: '✅', name: 'Google Tasks', desc: 'Phase-aware daily reminders & grocery lists', color: '#34A853' },
    { id: 'gmail', icon: '📧', name: 'Gmail', desc: 'Monthly health summary sent to your inbox', color: '#EA4335' },
];

const COHORT_PREVIEW = [
    { name: 'MoonRose_22', emoji: '🌸', day: 'Day 18', active: true },
    { name: 'CrimsonSkye', emoji: '🌙', day: 'Day 17', active: true },
    { name: 'StarlightK', emoji: '⭐', day: 'Day 20', active: false },
    { name: 'EveningBloom', emoji: '💜', day: 'Day 18', active: true },
];

export default function OnboardingFlow() {
    const nav = useNavigate();
    const { saveUser } = useApp();

    const [step, setStep] = useState(1);
    const TOTAL = 5;

    // Step state
    const [lunaName, setLunaName] = useState('');
    const [dates, setDates] = useState(['', '', '']);
    const [cycleLength, setCycleLength] = useState(28);
    const [connected, setConnected] = useState({});

    const pct = ((step - 1) / (TOTAL - 1)) * 100;

    const next = () => {
        if (step < TOTAL) { setStep(s => s + 1); return; }
        saveUser({ lunaName: lunaName || 'LunaSister', cycleDates: dates, cycleLength, onboarded: true });
        nav('/dashboard');
    };
    const back = () => { if (step > 1) setStep(s => s - 1); else nav('/'); };

    const PHASES_PREVIEW = [
        { ph: '🌑', label: 'Menstrual', days: 'Day 1–5', color: 'var(--menstrual)' },
        { ph: '🌱', label: 'Follicular', days: 'Day 6–13', color: 'var(--follicular)' },
        { ph: '🌕', label: 'Ovulatory', days: 'Day 14–16', color: 'var(--ovulatory)' },
        { ph: '🌸', label: 'Luteal', days: `Day 17–${cycleLength}`, color: 'var(--luteal)' },
    ];

    return (
        <div className="page" style={{ fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <div style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)' }}>
                <button onClick={back} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 22, cursor: 'pointer', lineHeight: 1 }}>←</button>
                <span className="serif" style={{ fontSize: 18, color: 'var(--rose-lite)' }}>🌸 LUNA</span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{step} / {TOTAL}</span>
            </div>

            {/* Progress bar */}
            <div style={{ height: 3, background: 'var(--border)' }}>
                <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, var(--rose), var(--rose-mid))', transition: 'width .4s ease', borderRadius: 2 }} />
            </div>

            {/* Step content */}
            <div style={{ flex: 1, padding: 'clamp(28px,5vw,52px) clamp(20px,5vw,40px)', maxWidth: 580, margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column' }}>

                {/* ── STEP 1: Luna Name ── */}
                {step === 1 && (
                    <div className="anim-fade-up">
                        <div style={{ fontSize: 40, marginBottom: 16 }}>✨</div>
                        <h2 className="serif" style={{ fontSize: 'clamp(22px,4vw,34px)', color: 'var(--text)', marginBottom: 8 }}>Choose your Luna Name</h2>
                        <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 28, fontWeight: 300 }}>
                            Your anonymous identity inside LUNA. Your real name never appears in rooms or the feed.
                        </p>
                        <input
                            className="input" value={lunaName} onChange={e => setLunaName(e.target.value)}
                            placeholder="e.g. MoonRose_22" style={{ fontSize: 16, marginBottom: 16 }}
                        />
                        <div style={{ marginBottom: 28 }}>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 10, letterSpacing: '.1em', textTransform: 'uppercase' }}>Quick picks</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                {SUGGESTIONS.map(n => (
                                    <button key={n} onClick={() => setLunaName(n)} style={{ padding: '7px 16px', background: lunaName === n ? 'var(--rose)' : 'var(--card)', border: `1px solid ${lunaName === n ? 'var(--rose)' : 'var(--border)'}`, borderRadius: 'var(--r-full)', color: lunaName === n ? 'white' : 'var(--text-dim)', fontSize: 13, cursor: 'pointer', transition: 'all .2s' }}>
                                        {n}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* ── STEP 2: Cycle Dates ── */}
                {step === 2 && (
                    <div className="anim-fade-up">
                        <div style={{ fontSize: 40, marginBottom: 16 }}>📅</div>
                        <h2 className="serif" style={{ fontSize: 'clamp(22px,4vw,34px)', color: 'var(--text)', marginBottom: 8 }}>Your last 3 cycle start dates</h2>
                        <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 28, fontWeight: 300 }}>
                            This is how LUNA calculates your phases and matches you to your cohort. The more accurate, the better your matches.
                        </p>
                        {dates.map((d, i) => (
                            <div key={i} style={{ marginBottom: 14 }}>
                                <label style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 6, letterSpacing: '.08em', textTransform: 'uppercase' }}>Cycle {i + 1} start date</label>
                                <input type="date" className="input" value={d} onChange={e => { const nd = [...dates]; nd[i] = e.target.value; setDates(nd); }} />
                            </div>
                        ))}
                        <div style={{ marginTop: 8, padding: '12px 14px', background: 'rgba(66,133,244,.08)', border: '1px solid rgba(66,133,244,.2)', borderRadius: 'var(--r-md)', fontSize: 12, color: '#90caf9', lineHeight: 1.6 }}>
                            🔒 Your cycle data is end-to-end encrypted. Only you see this.
                        </div>
                    </div>
                )}

                {/* ── STEP 3: Cycle Length ── */}
                {step === 3 && (
                    <div className="anim-fade-up">
                        <div style={{ fontSize: 40, marginBottom: 16 }}>📏</div>
                        <h2 className="serif" style={{ fontSize: 'clamp(22px,4vw,34px)', color: 'var(--text)', marginBottom: 8 }}>Your average cycle length</h2>
                        <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 36, fontWeight: 300 }}>
                            Default is 28 days — but every woman is different. LUNA will refine this as you log more cycles.
                        </p>
                        <div style={{ textAlign: 'center', marginBottom: 24 }}>
                            <div className="serif" style={{ fontSize: 72, fontWeight: 700, color: 'var(--rose-lite)', lineHeight: 1 }}>{cycleLength}</div>
                            <div style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 4 }}>days</div>
                        </div>
                        <input type="range" min={21} max={35} value={cycleLength} onChange={e => setCycleLength(Number(e.target.value))}
                            style={{ width: '100%', accentColor: 'var(--rose)', cursor: 'pointer', marginBottom: 10, height: 6 }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)', marginBottom: 28 }}>
                            <span>21 days</span><span>28 days</span><span>35 days</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
                            {PHASES_PREVIEW.map(p => (
                                <div key={p.label} style={{ textAlign: 'center', padding: '12px 6px', background: 'var(--card)', border: `1px solid ${p.color}44`, borderRadius: 'var(--r-md)' }}>
                                    <div style={{ fontSize: 20, marginBottom: 4 }}>{p.ph}</div>
                                    <div style={{ fontSize: 10, color: p.color, fontWeight: 700, marginBottom: 2 }}>{p.label}</div>
                                    <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>{p.days}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── STEP 4: Google Connect ── */}
                {step === 4 && (
                    <div className="anim-fade-up">
                        <div style={{ fontSize: 40, marginBottom: 16 }}>🔗</div>
                        <h2 className="serif" style={{ fontSize: 'clamp(22px,4vw,34px)', color: 'var(--text)', marginBottom: 8 }}>Connect Google services</h2>
                        <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 8, fontWeight: 300 }}>
                            Supercharge LUNA with your Google apps. All optional — skip any you prefer not to connect.
                        </p>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20, paddingBottom: 14, borderBottom: '1px solid var(--border)' }}>
                            Each connection is requested separately with clear permission descriptions.
                        </div>
                        {GOOGLE_SERVICES.map(s => (
                            <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 0', borderBottom: '1px solid var(--border)' }}>
                                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${s.color}18`, border: `1px solid ${s.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{s.icon}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{s.name}</div>
                                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.desc}</div>
                                </div>
                                <div className="toggle" onClick={() => setConnected(p => ({ ...p, [s.id]: !p[s.id] }))}
                                    style={{ background: connected[s.id] ? s.color : 'var(--card)', borderColor: connected[s.id] ? s.color : 'var(--border)' }}>
                                    <div className="toggle-knob" style={{ left: connected[s.id] ? 24 : 4 }} />
                                </div>
                            </div>
                        ))}
                        <button onClick={() => setStep(5)} style={{ marginTop: 16, background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 12, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>
                            Skip for now →
                        </button>
                    </div>
                )}

                {/* ── STEP 5: Cohort Reveal ── */}
                {step === 5 && (
                    <div className="anim-scale-in" style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 52, marginBottom: 16, animation: 'pulse 2.5s infinite' }}>🌙</div>
                        <h2 className="serif" style={{ fontSize: 'clamp(22px,4vw,34px)', color: 'var(--text)', marginBottom: 12 }}>Meet your cohort</h2>
                        <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 32, fontWeight: 300 }}>
                            4 women whose cycles align with yours within ±3 days. Your Luna Room activates when you all enter the same phase — together.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 18, flexWrap: 'wrap', marginBottom: 28 }}>
                            {COHORT_PREVIEW.map((w, i) => (
                                <div key={w.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, animation: `fadeUp .4s ${i * .1}s both` }}>
                                    <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(240,98,146,.18)', border: `2px solid ${w.active ? '#f06292' : 'var(--border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>{w.emoji}</div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-dim)' }}>{w.name}</div>
                                        <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{w.day} · Luteal</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ padding: 18, background: 'rgba(240,98,146,.1)', border: '1px solid rgba(240,98,146,.3)', borderRadius: 'var(--r-lg)', marginBottom: 20 }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--luteal)', marginBottom: 8 }}>🌙 Your Luna Room opens in ~3 days</div>
                            <div style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.6 }}>
                                When {lunaName || 'you'} and your cohort enter the Luteal phase window together, your private room activates automatically — no action needed.
                            </div>
                        </div>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 18px', background: 'rgba(105,240,174,.08)', border: '1px solid rgba(105,240,174,.25)', borderRadius: 'var(--r-full)', fontSize: 12, color: 'var(--mint)', fontWeight: 600 }}>
                            ✓ Welcome to LUNA, {lunaName || 'Luna Sister'} 🌸
                        </div>
                    </div>
                )}

                {/* CTA */}
                <div style={{ marginTop: 'auto', paddingTop: 28 }}>
                    <button className="btn btn-primary" style={{ width: '100%', fontSize: 15, padding: 14 }} onClick={next}>
                        {step === TOTAL ? '🌸 Enter LUNA' : 'Continue →'}
                    </button>
                </div>
            </div>
        </div>
    );
}
