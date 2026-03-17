import { useNavigate } from 'react-router-dom';

const FEATURES = [
    { icon: '🌙', color: '#f06292', title: 'Luna Rooms', tag: 'Phase-Synced', desc: 'Temporary group chats that activate when you and 4 other women enter the same phase window — together.' },
    { icon: '🌿', color: '#66bb6a', title: 'Wellness Hub', tag: 'Science-Backed', desc: 'Phase-specific exercise, nutrition, habits, and affirmations. What your body needs changes every week.' },
    { icon: '📅', color: '#4285F4', title: 'Google Sync', tag: 'Smart', desc: 'Auto-block focus time on your calendar, set phase-aware reminders, and receive monthly doctor-ready health reports.' },
    { icon: '💌', color: '#ce93d8', title: 'Partner Bridge', tag: 'Relationship', desc: 'Silently notify your partner — "extra care needed this week" — no personal details ever shared.' },
];

const STATS = [
    { num: '800M+', label: 'Women globally experience cycles' },
    { num: '75–80%', label: 'Experience PMS symptoms regularly' },
    { num: '$4.2B', label: 'Women\'s health app market by 2027' },
    { num: '0', label: 'Cycle-synced community apps today' },
];

const COHORT = [
    { name: 'MoonRose_22', emoji: '🌸', phase: 'Luteal', color: '#f06292' },
    { name: 'CrimsonSkye', emoji: '🌙', phase: 'Luteal', color: '#f06292' },
    { name: 'StarlightK', emoji: '⭐', phase: 'Luteal', color: '#f06292' },
    { name: 'EveningBloom', emoji: '💜', phase: 'Luteal', color: '#f06292' },
    { name: 'You', emoji: '🌸', phase: 'Luteal', color: '#c2185b', you: true },
];

// ── Mini mock of the Dashboard to show in the hero ──
function HeroPreview() {
    return (
        <div style={{
            background: 'var(--card)', border: '1px solid var(--border)',
            borderRadius: '20px 20px 0 0', padding: 16,
            boxShadow: '0 -20px 60px rgba(194,24,91,0.15)',
            fontFamily: 'var(--font-sans)',
        }}>
            {/* App bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <div style={{ display: 'flex', gap: 5 }}>
                    {['#ef5350', '#fbbf24', '#34d399'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
                </div>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700, color: 'var(--text)', marginLeft: 6 }}>
                    <img src="/luna-logo.png" alt="Luna Logo" style={{ width: 16, height: 16, borderRadius: '20%' }} /> LUNA
                </span>
            </div>
            {/* Phase card mini */}
            <div style={{ background: 'var(--luteal-g)', border: '1px solid rgba(240,98,146,.35)', borderRadius: 14, padding: 14, marginBottom: 10 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
                    <img src="/luna-logo.png" alt="Luna Logo" style={{ width: 32, height: 32, borderRadius: '20%' }} />
                    <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Luteal Phase · Day 19</div>
                        <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>Sensitive &amp; Reflective · 45% energy</div>
                    </div>
                </div>
                <div style={{ height: 5, background: 'rgba(255,255,255,.1)', borderRadius: 3 }}>
                    <div style={{ width: '45%', height: '100%', background: 'linear-gradient(90deg, #f0629288, #f06292)', borderRadius: 3 }} />
                </div>
            </div>
            {/* Live room mini */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>🌙 Luteal Cohort Room</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#69f0ae', animation: 'pulse 2s infinite' }} />
                        <span style={{ fontSize: 10, color: '#69f0ae', fontWeight: 700 }}>LIVE</span>
                    </div>
                </div>
                {[
                    { n: 'MoonRose_22', m: 'Dark chocolate is literally medicinal rn 🍫' },
                    { n: 'EveningBloom', m: 'Same!! Journalling helped so much today 📓' },
                ].map((r, i) => (
                    <div key={i} style={{ display: 'flex', gap: 7, padding: '5px 0', borderTop: '1px solid var(--border)' }}>
                        <img src="/luna-logo.png" alt="Luna Logo" style={{ width: 16, height: 16, borderRadius: '20%' }} />
                        <div><span style={{ fontSize: 10, color: 'var(--luteal)', fontWeight: 700 }}>{r.n}: </span><span style={{ fontSize: 11, color: 'var(--text-dim)' }}>{r.m}</span></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function LandingPage() {
    const nav = useNavigate();

    return (
        <div className="page" style={{ fontFamily: 'var(--font-sans)', overflowX: 'hidden' }}>
            {/* ── HERO ── */}
            <section style={{
                background: 'linear-gradient(150deg, #0d0d14 0%, #130920 45%, #0d0d14 100%)',
                padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,60px) 0',
                borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden',
            }}>
                <div style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    background: 'radial-gradient(ellipse at 20% 60%, rgba(194,24,91,.18), transparent 55%), radial-gradient(ellipse at 80% 30%, rgba(66,133,244,.12), transparent 55%)',
                }} />
                <div className="max-w" style={{ position: 'relative' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'flex-end' }}>
                        {/* Text */}
                        <div style={{ flex: '1 1 340px', paddingBottom: 48 }}>
                            <div className="section-eyebrow" style={{ marginBottom: 18, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', background: 'rgba(194,24,91,.1)', border: '1px solid rgba(194,24,91,.25)', borderRadius: 'var(--r-full)' }}>
                                <img src="/luna-logo.png" alt="Luna Logo" style={{ width: 16, height: 16, borderRadius: '20%' }} /> Introducing LUNA
                            </div>
                            <h1 className="serif" style={{ fontSize: 'clamp(36px,5.5vw,68px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 20, color: 'var(--text)' }}>
                                Connect through<br />
                                <em style={{ color: 'var(--rose-lite)', fontStyle: 'italic' }}>your cycle.</em>
                            </h1>
                            <p style={{ fontSize: 'clamp(14px,1.8vw,17px)', color: 'var(--text-dim)', lineHeight: 1.8, maxWidth: 520, marginBottom: 32, fontWeight: 300 }}>
                                The world's first cycle-synchronized social support platform. Grouped with women who share your exact cycle timing — so support arrives exactly when you need it most.
                            </p>
                            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
                                <button className="btn btn-primary" style={{ fontSize: 15, padding: '14px 32px' }} onClick={() => nav('/onboarding')}>
                                    🌸 Join LUNA — Free
                                </button>
                                <button className="btn btn-ghost" onClick={() => nav('/dashboard')}>
                                    Preview the App →
                                </button>
                            </div>
                            {/* Trust signals */}
                            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                                {['No real name required', 'Data never sold', 'Free to join'].map(t => (
                                    <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)' }}>
                                        <span style={{ color: 'var(--mint)' }}>✓</span> {t}
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Preview */}
                        <div style={{ flex: '1 1 300px', maxWidth: 380, alignSelf: 'flex-end' }}>
                            <HeroPreview />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── STATS ── */}
            <section style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '32px 24px' }}>
                <div className="max-w" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 24, textAlign: 'center' }}>
                    {STATS.map(s => (
                        <div key={s.num}>
                            <div className="serif" style={{ fontSize: 'clamp(24px,3.5vw,36px)', fontWeight: 700, color: 'var(--rose-lite)', marginBottom: 4 }}>{s.num}</div>
                            <div style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.4 }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── FEATURES ── */}
            <section style={{ padding: 'clamp(48px,6vw,80px) clamp(20px,5vw,60px)' }}>
                <div className="max-w">
                    <div style={{ textAlign: 'center', marginBottom: 48 }}>
                        <div className="section-eyebrow" style={{ marginBottom: 12 }}>Everything you need</div>
                        <h2 className="serif" style={{ fontSize: 'clamp(26px,4vw,42px)', color: 'var(--text)', marginBottom: 12 }}>Built different. Built for women.</h2>
                        <p style={{ fontSize: 15, color: 'var(--text-dim)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>Four features no other cycle app has — because no one else thought to build them.</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 }}>
                        {FEATURES.map(f => (
                            <div key={f.title} className="card" style={{ padding: 24 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                    <div style={{ width: 48, height: 48, borderRadius: 14, background: `${f.color}20`, border: `1px solid ${f.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{f.icon}</div>
                                    <div>
                                        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{f.title}</div>
                                        <div style={{ fontSize: 10, color: f.color, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase' }}>{f.tag}</div>
                                    </div>
                                </div>
                                <p style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.75 }}>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── COHORT DEMO ── */}
            <section style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: 'clamp(48px,6vw,80px) 24px' }}>
                <div className="max-w-sm" style={{ textAlign: 'center' }}>
                    <div className="section-eyebrow" style={{ color: 'var(--teal)', marginBottom: 12 }}>The Luna Algorithm</div>
                    <h2 className="serif" style={{ fontSize: 'clamp(24px,4vw,38px)', color: 'var(--text)', marginBottom: 16 }}>Your cohort is waiting.</h2>
                    <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 36 }}>
                        LUNA groups the women in your network whose cycle overlaps yours within ±3 days. Your Luna Room opens exactly when you all need it most.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 28 }}>
                        {COHORT.map((w, i) => (
                            <div key={w.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, animation: `fadeUp .4s ${i * .08}s both` }}>
                                <div style={{
                                    width: 60, height: 60, borderRadius: '50%',
                                    background: `${w.color}22`, border: `2px solid ${w.color}`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
                                    animation: w.you ? 'glow 2.5s infinite' : 'none',
                                    boxShadow: w.you ? '0 0 20px rgba(194,24,91,.4)' : 'none',
                                }}>{w.emoji}</div>
                                <div style={{ fontSize: 10, color: w.you ? w.color : 'var(--text-muted)', fontWeight: w.you ? 700 : 400 }}>{w.name}</div>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 18px', background: 'rgba(240,98,146,.12)', border: '1px solid rgba(240,98,146,.35)', borderRadius: 'var(--r-full)', fontSize: 12, color: 'var(--luteal)', fontWeight: 700 }}>
                        🌙&nbsp; Luteal Cohort Room — LIVE NOW
                    </div>
                </div>
            </section>

            {/* ── PRIVACY ── */}
            <section style={{ padding: 'clamp(48px,6vw,72px) 24px' }}>
                <div className="max-w" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14 }}>
                    {[
                        { icon: '🔒', title: 'No Real Names', desc: 'You choose an anonymous Luna Name. Identity is optional.' },
                        { icon: '📵', title: 'Zero Data Selling', desc: 'Cycle data is encrypted. Never sold. Never used for ads.' },
                        { icon: '💨', title: 'Ephemeral Rooms', desc: 'Room chats are deleted after each phase. What happens there, stays there.' },
                        { icon: '🎛️', title: 'Consent Layers', desc: 'You control who sees your phase, posts, and whether partners are notified.' },
                    ].map(p => (
                        <div key={p.title} style={{ display: 'flex', gap: 14, padding: '18px 20px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)' }}>
                            <span style={{ fontSize: 24, flexShrink: 0 }}>{p.icon}</span>
                            <div>
                                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{p.title}</div>
                                <div style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.6 }}>{p.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── FINAL CTA ── */}
            <section style={{ padding: 'clamp(64px,8vw,100px) 24px', textAlign: 'center', background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                    <img src="/luna-logo.png" alt="Luna Logo" style={{ width: 56, height: 56, borderRadius: '20%' }} />
                </div>
                <h2 className="serif" style={{ fontSize: 'clamp(26px,4vw,40px)', color: 'var(--text)', marginBottom: 16 }}>You deserve to feel understood.</h2>
                <p style={{ fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.8, marginBottom: 36, maxWidth: 480, margin: '0 auto 36px' }}>
                    Join the first 100 women in Hyderabad who are going through their cycle together — for the very first time.
                </p>
                <button className="btn btn-primary" style={{ fontSize: 16, padding: '15px 40px' }} onClick={() => nav('/onboarding')}>
                    🌸 Start Your Journey — Free
                </button>
                <div style={{ marginTop: 14, fontSize: 12, color: 'var(--text-muted)' }}>No credit card · No real name required · Your data is yours</div>
            </section>
        </div>
    );
}
