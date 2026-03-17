import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LUNA_NAMES = ['MoonRose', 'CrimsonSkye', 'StarlightK', 'EveningBloom', 'VelvetMoon', 'RoseWater', 'LunaHeart', 'SilverTide'];
const GOOGLE_SERVICES = [
    { id: 'calendar', icon: '📅', name: 'Google Calendar', desc: 'Auto-block your phase windows', color: '#4285F4' },
    { id: 'fit', icon: '🏃', name: 'Google Fit', desc: 'Sync activity for smarter tips', color: '#34A853' },
    { id: 'tasks', icon: '✅', name: 'Google Tasks', desc: 'Phase-aware daily reminders', color: '#34A853' },
    { id: 'gmail', icon: '📧', name: 'Gmail', desc: 'Monthly health report to inbox', color: '#EA4335' },
];
const COHORT = [
    { name: 'MoonRose_22', emoji: '🌸', day: 'Day 18', active: true },
    { name: 'CrimsonSkye', emoji: '🌙', day: 'Day 17', active: true },
    { name: 'StarlightK', emoji: '⭐', day: 'Day 19', active: false },
    { name: 'EveningBloom', emoji: '💜', day: 'Day 18', active: true },
];

export default function OnboardingFlow() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [lunaName, setLunaName] = useState('');
    const [dates, setDates] = useState(['', '', '']);
    const [cycleLength, setCycleLength] = useState(28);
    const [connected, setConnected] = useState({});

    const total = 5;
    const progress = ((step - 1) / (total - 1)) * 100;

    const next = () => { if (step < total) setStep(s => s + 1); else navigate('/dashboard'); };
    const back = () => { if (step > 1) setStep(s => s - 1); else navigate('/'); };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: "'DM Sans', sans-serif", display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <div style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)' }}>
                <button onClick={back} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 22, lineHeight: 1 }}>←</button>
                <span style={{ fontSize: 18, color: 'var(--rose)' }}>🌸 LUNA</span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{step} of {total}</span>
            </div>

            {/* Progress bar */}
            <div style={{ height: 3, background: 'var(--border)' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, var(--rose-dark), var(--rose))', transition: 'width 0.4s ease', borderRadius: 2 }} />
            </div>

            {/* Content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 'clamp(32px,5vw,56px) 24px', maxWidth: 560, margin: '0 auto', width: '100%' }}>

                {/* Step 1 — Luna Name */}
                {step === 1 && (
                    <div className="fade-up">
                        <div style={{ fontSize: 36, marginBottom: 16 }}>✨</div>
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px,4vw,36px)', color: 'var(--text)', marginBottom: 8 }}>Choose your Luna Name</h2>
                        <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 28 }}>Your identity inside LUNA. Anonymous by design — your real name never appears in rooms or the feed.</p>
                        <input
                            value={lunaName}
                            onChange={e => setLunaName(e.target.value)}
                            placeholder="e.g. MoonRose_22"
                            style={{ width: '100%', padding: '14px 18px', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', color: 'var(--text)', fontSize: 16, fontFamily: 'DM Sans, sans-serif', outline: 'none', marginBottom: 16 }}
                        />
                        <div style={{ marginBottom: 28 }}>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 10, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Suggestions</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                {LUNA_NAMES.map(n => (
                                    <button key={n} onClick={() => setLunaName(n)} style={{ padding: '7px 16px', background: lunaName === n ? 'var(--rose-dark)' : 'var(--card)', border: `1px solid ${lunaName === n ? 'var(--rose)' : 'var(--border)'}`, borderRadius: 'var(--radius-full)', color: lunaName === n ? 'white' : 'var(--text-dim)', fontSize: 13, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', transition: 'all 0.2s' }}>{n}</button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2 — Cycle Dates */}
                {step === 2 && (
                    <div className="fade-up">
                        <div style={{ fontSize: 36, marginBottom: 16 }}>📅</div>
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px,4vw,36px)', color: 'var(--text)', marginBottom: 8 }}>Your last 3 cycle start dates</h2>
                        <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 28 }}>This is how LUNA calculates your phases and matches you with your cohort. The more accurate, the better your matches.</p>
                        {dates.map((d, i) => (
                            <div key={i} style={{ marginBottom: 14 }}>
                                <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 6, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Cycle {i + 1} start date</label>
                                <input
                                    type="date"
                                    value={d}
                                    onChange={e => { const nd = [...dates]; nd[i] = e.target.value; setDates(nd); }}
                                    style={{ width: '100%', padding: '12px 16px', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', color: 'var(--text)', fontSize: 14, fontFamily: 'DM Sans, sans-serif', outline: 'none' }}
                                />
                            </div>
                        ))}
                        <div style={{ padding: '12px 16px', background: 'rgba(96,165,250,0.08)', border: '1px solid rgba(96,165,250,0.2)', borderRadius: 'var(--radius-md)', fontSize: 12, color: '#90caf9', lineHeight: 1.6, marginTop: 8 }}>
                            🔒 Your cycle data is encrypted and never sold. Only you see this information.
                        </div>
                    </div>
                )}

                {/* Step 3 — Cycle Length */}
                {step === 3 && (
                    <div className="fade-up">
                        <div style={{ fontSize: 36, marginBottom: 16 }}>📏</div>
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px,4vw,36px)', color: 'var(--text)', marginBottom: 8 }}>Your average cycle length</h2>
                        <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 36 }}>The default is 28 days, but every woman is different. Adjust to your typical cycle — LUNA will learn and refine this over time.</p>
                        <div style={{ textAlign: 'center', marginBottom: 24 }}>
                            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 64, color: 'var(--rose)', fontWeight: 700 }}>{cycleLength}</div>
                            <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>days</div>
                        </div>
                        <input
                            type="range" min={21} max={35} value={cycleLength}
                            onChange={e => setCycleLength(Number(e.target.value))}
                            style={{ width: '100%', accentColor: 'var(--rose)', height: 6, cursor: 'pointer', marginBottom: 12 }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)' }}>
                            <span>21 days</span><span>28 days</span><span>35 days</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginTop: 28 }}>
                            {[
                                { phase: '🌑', label: 'Menstrual', days: `Day 1–5`, color: 'var(--menstrual)' },
                                { phase: '🌱', label: 'Follicular', days: `Day 6–13`, color: 'var(--follicular)' },
                                { phase: '🌕', label: 'Ovulatory', days: `Day 14–16`, color: 'var(--ovulatory)' },
                                { phase: '🌸', label: 'Luteal', days: `Day 17–${cycleLength}`, color: 'var(--luteal)' },
                            ].map(p => (
                                <div key={p.label} style={{ textAlign: 'center', padding: '12px 8px', background: 'var(--card)', border: `1px solid ${p.color}44`, borderRadius: 'var(--radius-md)' }}>
                                    <div style={{ fontSize: 20, marginBottom: 6 }}>{p.phase}</div>
                                    <div style={{ fontSize: 11, color: p.color, fontWeight: 600, marginBottom: 2 }}>{p.label}</div>
                                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{p.days}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 4 — Google Connect */}
                {step === 4 && (
                    <div className="fade-up">
                        <div style={{ fontSize: 36, marginBottom: 16 }}>🔗</div>
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px,4vw,36px)', color: 'var(--text)', marginBottom: 8 }}>Connect Google services</h2>
                        <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 8 }}>Supercharge LUNA with your Google apps. All optional — skip any you don't want.</p>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 24, padding: '8px 0', borderBottom: '1px solid var(--border)' }}>Each connection is requested once, separately, with clear permissions.</div>
                        {GOOGLE_SERVICES.map(s => (
                            <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: '1px solid var(--border)' }}>
                                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${s.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0, border: `1px solid ${s.color}33` }}>{s.icon}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{s.name}</div>
                                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.desc}</div>
                                </div>
                                <div
                                    onClick={() => setConnected(p => ({ ...p, [s.id]: !p[s.id] }))}
                                    style={{ width: 44, height: 24, borderRadius: 12, background: connected[s.id] ? s.color : 'var(--card)', border: `1px solid ${connected[s.id] ? s.color : 'var(--border)'}`, cursor: 'pointer', position: 'relative', transition: 'all 0.25s', flexShrink: 0 }}
                                >
                                    <div style={{ position: 'absolute', top: 3, left: connected[s.id] ? 23 : 3, width: 16, height: 16, borderRadius: '50%', background: 'white', transition: 'left 0.25s' }} />
                                </div>
                            </div>
                        ))}
                        <button style={{ marginTop: 20, background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 13, fontFamily: 'DM Sans, sans-serif' }}>Skip for now →</button>
                    </div>
                )}

                {/* Step 5 — Cohort Reveal */}
                {step === 5 && (
                    <div className="fade-up" style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 48, marginBottom: 16, animation: 'pulse 2s infinite' }}>🌙</div>
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px,4vw,36px)', color: 'var(--text)', marginBottom: 8 }}>Meet your cohort</h2>
                        <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 32, maxWidth: 400, margin: '0 auto 32px' }}>
                            4 women whose cycles align with yours within ±3 days. Your Luna Room opens when you all enter the same phase — together.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 28, flexWrap: 'wrap' }}>
                            {COHORT.map((w, i) => (
                                <div key={w.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, animation: `fadeUp 0.4s ${i * 0.1}s both` }}>
                                    <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#f0629222', border: `2px solid ${w.active ? '#f06292' : '#4a5568'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>{w.emoji}</div>
                                    <div style={{ fontSize: 11, color: 'var(--text-dim)', textAlign: 'center' }}>
                                        <div style={{ fontWeight: 600 }}>{w.name}</div>
                                        <div style={{ color: 'var(--text-muted)', fontSize: 10 }}>{w.day}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ padding: 20, background: 'linear-gradient(135deg, #f0629218, #f0629208)', border: '1px solid #f0629233', borderRadius: 'var(--radius-lg)', marginBottom: 24 }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#f06292', marginBottom: 8 }}>🌙 Your Luna Room opens in ~3 days</div>
                            <div style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.7 }}>When {lunaName || 'you'} and your cohort enter the Luteal phase window together, your private room activates automatically.</div>
                        </div>
                        <div style={{ padding: '10px 16px', background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)', borderRadius: 'var(--radius-full)', display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#34d399' }}>
                            ✓ Welcome to LUNA, {lunaName || 'Luna Sister'} 🌸
                        </div>
                    </div>
                )}

                {/* Next button */}
                <div style={{ marginTop: 'auto', paddingTop: 32 }}>
                    <button
                        className="btn btn-primary"
                        style={{ width: '100%', fontSize: 15, padding: 14 }}
                        onClick={next}
                    >
                        {step === total ? '🌸 Enter LUNA' : 'Continue →'}
                    </button>
                </div>
            </div>
        </div>
    );
}
