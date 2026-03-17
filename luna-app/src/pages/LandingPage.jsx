import { useNavigate } from 'react-router-dom';

const S = {
    root: {
        minHeight: '100vh',
        background: 'var(--bg)',
        fontFamily: "'DM Sans', sans-serif",
        overflowX: 'hidden',
    },
    hero: {
        background: 'linear-gradient(135deg, #07090f 0%, #0d0719 40%, #0a100d 100%)',
        padding: 'clamp(60px,8vw,100px) 24px 0',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border)',
    },
    heroBg: {
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `
      radial-gradient(ellipse at 20% 60%, #be185d22 0%, transparent 55%),
      radial-gradient(ellipse at 80% 30%, #4285F418 0%, transparent 55%),
      radial-gradient(ellipse at 50% 90%, #a78bfa12 0%, transparent 50%)
    `,
    },
    heroInner: { maxWidth: 900, margin: '0 auto', position: 'relative' },
    eyebrow: {
        display: 'inline-flex', alignItems: 'center', gap: 8,
        fontSize: 12, letterSpacing: '0.18em', color: 'var(--rose)', textTransform: 'uppercase',
        fontWeight: 600, marginBottom: 20, padding: '5px 14px',
        background: 'rgba(244,114,182,0.08)', border: '1px solid rgba(244,114,182,0.2)',
        borderRadius: 'var(--radius-full)',
    },
    h1: {
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(36px,6vw,72px)', fontWeight: 700,
        lineHeight: 1.1, marginBottom: 24, color: 'var(--text)',
    },
    h1Accent: { color: 'var(--rose)', display: 'block' },
    sub: {
        fontSize: 'clamp(15px,2vw,18px)', color: 'var(--text-dim)', lineHeight: 1.8,
        maxWidth: 580, marginBottom: 36, fontWeight: 300,
    },
    ctas: { display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 56 },
    mockApp: {
        borderRadius: '20px 20px 0 0',
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderBottom: 'none', padding: '16px', maxWidth: 380,
        boxShadow: '0 -16px 64px rgba(244,114,182,0.12)',
    },
    mockBar: {
        display: 'flex', gap: 6, marginBottom: 14, alignItems: 'center',
    },
    mockDot: (c) => ({ width: 10, height: 10, borderRadius: '50%', background: c }),
    mockTitle: { fontSize: 13, fontWeight: 600, color: 'var(--text)', marginLeft: 4 },
};

function MockPhaseCard() {
    return (
        <div style={{ background: 'linear-gradient(135deg, #f4729220, #f4729208)', border: '1px solid #f4729233', borderRadius: 14, padding: 16, marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: '#f0629222', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🌸</div>
                <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>Luteal Phase</div>
                    <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>Day 19 · Sensitive & Reflective</div>
                </div>
                <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, color: '#f06292', background: '#f0629218', padding: '3px 10px', borderRadius: 20 }}>Day 19</div>
            </div>
            <div style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>Energy Level</span>
                    <span style={{ fontSize: 10, color: '#f06292', fontWeight: 700 }}>45%</span>
                </div>
                <div style={{ height: 5, background: 'var(--border)', borderRadius: 3 }}>
                    <div style={{ width: '45%', height: '100%', background: 'linear-gradient(90deg, #f0629288, #f06292)', borderRadius: 3 }} />
                </div>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-dim)', fontStyle: 'italic', lineHeight: 1.6 }}>
                ✨ "Your sensitivity is not weakness — it is depth."
            </div>
        </div>
    );
}

function MockRoom() {
    return (
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <div style={{ fontSize: 16 }}>🌙</div>
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>Luteal Cohort Room</div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>4 women · LIVE</div>
                </div>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#34d399', animation: 'pulse 2s infinite' }} />
            </div>
            {[
                { name: 'MoonRose_22', msg: 'Anyone else craving dark chocolate rn? 🍫', time: '2m' },
                { name: 'StarlightK', msg: 'Same!! Also journalling helped me so much today', time: '1m' },
            ].map((m, i) => (
                <div key={i} style={{ padding: '6px 0', borderTop: '1px solid var(--border)', display: 'flex', gap: 8 }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#f0629222', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0 }}>🌸</div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 10, color: '#f06292', fontWeight: 600 }}>{m.name} · {m.time} ago</div>
                        <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 1 }}>{m.msg}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

const FEATURES = [
    {
        icon: '🌙', color: '#f472b6', glow: '#f472b622',
        title: 'Luna Rooms', tag: 'Unique Feature',
        desc: 'Phase-synced temporary group chats. Connect with up to 5 women who are literally going through the same phase as you — right now.',
    },
    {
        icon: '🌿', color: '#34d399', glow: '#34d39922',
        title: 'Wellness Hub', tag: 'Health',
        desc: 'Phase-specific exercise, nutrition, habits, and affirmations. Because what your body needs changes every week.',
    },
    {
        icon: '📅', color: '#60a5fa', glow: '#60a5fa22',
        title: 'Google Sync', tag: 'Smart',
        desc: 'Automatically blocks focus time on your calendar, sets phase-aware reminders, and emails you a monthly doctor-ready health report.',
    },
    {
        icon: '💌', color: '#a78bfa', glow: '#a78bfa22',
        title: 'Partner Bridge', tag: 'Relationship',
        desc: "Silently notify your partner with a gentle ping — 'extra care needed this week' — no personal details ever shared.",
    },
];

const STATS = [
    { num: '800M+', label: 'Women globally' },
    { num: '75–80%', label: 'Experience PMS' },
    { num: '$4.2B', label: 'Market by 2027' },
    { num: '0', label: 'Cycle-sync apps exist' },
];

const COHORT_WOMEN = [
    { name: 'MoonRose_22', emoji: '🌸', phase: 'Luteal', color: '#f06292' },
    { name: 'StarlightK', emoji: '⭐', phase: 'Luteal', color: '#f06292' },
    { name: 'CrimsonSky', emoji: '🌙', phase: 'Luteal', color: '#f06292' },
    { name: 'EveningBloom', emoji: '💜', phase: 'Luteal', color: '#f06292' },
    { name: 'You', emoji: '🌸', phase: 'Luteal', color: '#f472b6', isYou: true },
];

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div style={S.root}>
            {/* Hero */}
            <section style={S.hero}>
                <div style={S.heroBg} />
                <div style={S.heroInner}>
                    <div style={S.eyebrow}>🌸 Introducing LUNA</div>
                    <h1 style={S.h1}>
                        Connect through<br />
                        <em style={S.h1Accent}>your cycle.</em>
                    </h1>
                    <p style={S.sub}>
                        The world's first cycle-synchronized social support platform. Grouped with women who share your exact cycle timing — so you're never alone during the hard days.
                    </p>
                    <div style={S.ctas}>
                        <button className="btn btn-primary" style={{ fontSize: 15, padding: '13px 32px' }} onClick={() => navigate('/onboarding')}>
                            🌸 Join LUNA — It's Free
                        </button>
                        <button className="btn btn-ghost" onClick={() => navigate('/dashboard')}>
                            👀 Preview the App
                        </button>
                    </div>

                    {/* Mock App Preview */}
                    <div style={S.mockApp}>
                        <div style={S.mockBar}>
                            <div style={S.mockDot('#ef5350')} />
                            <div style={S.mockDot('#fbbf24')} />
                            <div style={S.mockDot('#34d399')} />
                            <span style={S.mockTitle}>🌸 LUNA</span>
                        </div>
                        <MockPhaseCard />
                        <MockRoom />
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '32px 24px' }}>
                <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px,1fr))', gap: 24 }}>
                    {STATS.map((s) => (
                        <div key={s.num} style={{ textAlign: 'center' }}>
                            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px,4vw,36px)', fontWeight: 700, color: 'var(--rose)', marginBottom: 4 }}>{s.num}</div>
                            <div style={{ fontSize: 13, color: 'var(--text-dim)' }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features */}
            <section style={{ padding: 'clamp(48px,6vw,80px) 24px' }}>
                <div style={{ maxWidth: 900, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: 48 }}>
                        <div style={{ fontSize: 11, letterSpacing: '0.18em', color: 'var(--rose)', textTransform: 'uppercase', fontWeight: 600, marginBottom: 12 }}>Everything you need</div>
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px,4vw,42px)', color: 'var(--text)', marginBottom: 16 }}>Built different. Built for women.</h2>
                        <p style={{ fontSize: 15, color: 'var(--text-dim)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>Four features that no other cycle app has — because they finally listened.</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: 16 }}>
                        {FEATURES.map((f) => (
                            <div key={f.title} className="card" style={{ padding: 24 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                    <div style={{ width: 48, height: 48, borderRadius: 14, background: f.glow, border: `1px solid ${f.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{f.icon}</div>
                                    <div>
                                        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>{f.title}</div>
                                        <div style={{ fontSize: 10, color: f.color, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{f.tag}</div>
                                    </div>
                                </div>
                                <p style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.75 }}>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cohort Demo */}
            <section style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: 'clamp(48px,6vw,80px) 24px' }}>
                <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
                    <div style={{ fontSize: 11, letterSpacing: '0.18em', color: 'var(--teal)', textTransform: 'uppercase', fontWeight: 600, marginBottom: 12 }}>The Luna Algorithm</div>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px,4vw,38px)', color: 'var(--text)', marginBottom: 12 }}>Your cohort is waiting.</h2>
                    <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 36, maxWidth: 480, margin: '0 auto 36px' }}>
                        Among your network, LUNA groups the women whose cycle overlaps yours within ±3 days — so your Luna Room goes live exactly when you all need it most.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
                        {COHORT_WOMEN.map((w) => (
                            <div key={w.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                                <div style={{
                                    width: 64, height: 64, borderRadius: '50%',
                                    background: `${w.color}22`, border: `2px solid ${w.color}`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
                                    boxShadow: w.isYou ? `0 0 20px ${w.color}66` : 'none',
                                    animation: w.isYou ? 'glowPulse 2s infinite' : 'none',
                                }}>{w.emoji}</div>
                                <div style={{ fontSize: 10, color: w.isYou ? w.color : 'var(--text-muted)', fontWeight: w.isYou ? 700 : 400 }}>{w.name}</div>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: '#f0629218', border: '1px solid #f0629244', borderRadius: 'var(--radius-full)', fontSize: 12, color: '#f06292', fontWeight: 600 }}>
                        🌙 Luteal Cohort Room — LIVE NOW
                    </div>
                </div>
            </section>

            {/* CTA Footer */}
            <section style={{ padding: 'clamp(64px,8vw,100px) 24px', textAlign: 'center' }}>
                <div style={{ maxWidth: 540, margin: '0 auto' }}>
                    <div style={{ fontSize: 48, marginBottom: 20 }}>🌸</div>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px,4vw,40px)', color: 'var(--text)', marginBottom: 16 }}>
                        You deserve to feel understood.
                    </h2>
                    <p style={{ fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.8, marginBottom: 36 }}>
                        Join 100 women in Hyderabad who are experiencing their cycle — together — for the first time.
                    </p>
                    <button className="btn btn-primary" style={{ fontSize: 16, padding: '15px 40px' }} onClick={() => navigate('/onboarding')}>
                        🌸 Start Your Journey — Free
                    </button>
                    <div style={{ marginTop: 16, fontSize: 12, color: 'var(--text-muted)' }}>No credit card · No real name required · Your data is yours</div>
                </div>
            </section>
        </div>
    );
}
