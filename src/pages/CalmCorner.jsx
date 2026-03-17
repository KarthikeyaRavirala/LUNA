import { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import BottomNav from '../components/BottomNav';

const MEDITATIONS = {
    menstrual: [
        { title: 'Surrender & Rest', duration: '10 min', desc: 'Let go of doing and simply be. A guided body scan to release tension and pain.', icon: '🌑' },
        { title: 'Warmth Within', duration: '7 min', desc: 'Visualise healing warmth flowing to your lower abdomen. Pain relief through breath.', icon: '🔥' },
        { title: 'Compassion for Self', duration: '12 min', desc: 'A loving-kindness practice for the days when everything feels heavy.', icon: '💗' },
    ],
    follicular: [
        { title: 'Fresh Start Energy', duration: '8 min', desc: 'Rising energy meets morning light. Set intentions for your next cycle chapter.', icon: '🌱' },
        { title: 'Creative Spark', duration: '6 min', desc: 'Activate your follicular creativity. Visualise what you want to build this cycle.', icon: '✨' },
        { title: 'Body Awakening', duration: '9 min', desc: 'A gentle movement meditation to welcome your renewed energy.', icon: '🌅' },
    ],
    ovulatory: [
        { title: 'Peak Confidence', duration: '7 min', desc: 'Stand in your power. Breathe into your full presence before an important moment.', icon: '🌕' },
        { title: 'Connection Breath', duration: '5 min', desc: 'Your social battery is full. Channel it with a heart-opening breathwork.', icon: '🫀' },
        { title: 'Radiance Meditation', duration: '10 min', desc: 'You are magnetic right now. Let this guided practice amplify your natural glow.', icon: '☀️' },
    ],
    luteal: [
        { title: 'Holding Space', duration: '11 min', desc: 'For the nights when you feel everything at once. Gentle witness meditation.', icon: '🌸' },
        { title: 'Anxiety Release', duration: '8 min', desc: '4-7-8 breathing + body scan for the luteal anxiety that creeps in uninvited.', icon: '🌊' },
        { title: 'Nest & Rest', duration: '15 min', desc: 'Your body is preparing. A deep rest practice that honours your need to slow down.', icon: '🍂' },
    ],
};

const AFFIRMATIONS = {
    menstrual: ['My body knows what it needs.', 'Rest is productive.', 'I honour my need to slow down.', 'This too shall pass — and it always does.', 'I am allowed to be still.'],
    follicular: ['I am full of possibility.', 'New ideas flow through me easily.', 'I step into my potential today.', 'Energy and clarity are on my side.', 'I build what I envision.'],
    ovulatory: ['I am magnetic and confident.', 'My voice matters and people want to hear it.', 'I show up fully and powerfully.', 'I attract what is meant for me.', 'I am at my peak — I own it.'],
    luteal: ['My feelings are valid.', 'I am allowed to feel all of it.', 'Sensitivity is a superpower.', 'I nurture myself the way I nurture others.', 'I trust my cycle\'s wisdom.'],
};

const PLAYLISTS = {
    menstrual: [{ name: 'Healing Low-Fi', vibe: 'Slow, gentle, warm', link: '#', icon: '🎹' }, { name: 'Womb of Calm', vibe: 'Ambient, no lyrics', link: '#', icon: '🎸' }],
    follicular: [{ name: 'Rising Energy Mix', vibe: 'Upbeat, lite pop', link: '#', icon: '🎵' }, { name: 'Coffee & Focus', vibe: 'Jazz, instrumental', link: '#', icon: '🎺' }],
    ovulatory: [{ name: 'Peak Vibes Playlist', vibe: 'Pop, confident, beats', link: '#', icon: '🎤' }, { name: 'Glow Up Hits', vibe: 'R&B, danceable', link: '#', icon: '🕺' }],
    luteal: [{ name: 'Feelings Night', vibe: 'Soft indie, emotional', link: '#', icon: '🎸' }, { name: 'Cosy Evening Mix', vibe: 'Acoustic, strings', link: '#', icon: '🎻' }],
};

// Breathing exercise component
function BreathingTimer({ phaseColor }) {
    const [running, setRunning] = useState(false);
    const [phase, setPhase] = useState('inhale'); // inhale | hold | exhale | holdOut
    const [count, setCount] = useState(4);
    const [cycles, setCycles] = useState(0);
    const timerRef = useRef(null);

    const PHASES = [
        { id: 'inhale', label: 'Breathe In', duration: 4, color: '#66bb6a' },
        { id: 'hold', label: 'Hold', duration: 7, color: '#ffa726' },
        { id: 'exhale', label: 'Breathe Out', duration: 8, color: '#4dd0e1' },
    ];

    const currentPhase = PHASES.find(p => p.id === phase) || PHASES[0];

    useEffect(() => {
        if (!running) { clearInterval(timerRef.current); return; }
        timerRef.current = setInterval(() => {
            setCount(prev => {
                if (prev <= 1) {
                    setPhase(cur => {
                        const idx = PHASES.findIndex(p => p.id === cur);
                        const next = PHASES[(idx + 1) % PHASES.length];
                        if (idx === PHASES.length - 1) setCycles(c => c + 1);
                        setCount(next.duration);
                        return next.id;
                    });
                    return currentPhase.duration;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timerRef.current);
    }, [running, phase]);

    const progress = 1 - (count / currentPhase.duration);
    const size = 140; const r = 58; const circ = 2 * Math.PI * r;

    return (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16, letterSpacing: '.08em', textTransform: 'uppercase' }}>4-7-8 Breathing Technique</div>
            <div style={{ position: 'relative', width: size, height: size, margin: '0 auto 20px' }}>
                <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth={6} />
                    <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={currentPhase.color} strokeWidth={6}
                        strokeDasharray={circ} strokeDashoffset={circ - progress * circ} strokeLinecap="round"
                        style={{ transition: 'stroke-dashoffset 1s linear, stroke .4s' }} />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: 36, fontWeight: 700, color: currentPhase.color, fontFamily: 'var(--font-serif)', lineHeight: 1 }}>{count}</div>
                    <div style={{ fontSize: 11, color: currentPhase.color, marginTop: 4, fontWeight: 600 }}>{currentPhase.label}</div>
                </div>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>Cycles completed: <strong style={{ color: phaseColor }}>{cycles}</strong></div>
            <button onClick={() => { setRunning(r => !r); if (!running) { setPhase('inhale'); setCount(4); } }} style={{ padding: '10px 32px', background: running ? 'var(--surface)' : phaseColor, border: `1px solid ${running ? 'var(--border)' : phaseColor}`, borderRadius: 'var(--r-full)', color: running ? 'var(--text)' : 'white', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)', transition: 'all .2s' }}>
                {running ? '⏸ Pause' : '▶ Start'}
            </button>
        </div>
    );
}

export default function CalmCorner() {
    const { user, PHASES } = useApp();
    const p = PHASES[user.currentPhase] || PHASES.luteal;

    const [view, setView] = useState('meditate'); // 'meditate' | 'breathe' | 'affirm' | 'playlists'
    const [affirmIdx, setAffirmIdx] = useState(0);
    const [revealed, setRevealed] = useState(false);
    const [playing, setPlaying] = useState(null);
    const [timer, setTimer] = useState(null);
    const [elapsed, setElapsed] = useState(0);

    const affirmations = AFFIRMATIONS[user.currentPhase] || AFFIRMATIONS.luteal;
    const meditations = MEDITATIONS[user.currentPhase] || MEDITATIONS.luteal;
    const playlists = PLAYLISTS[user.currentPhase] || PLAYLISTS.luteal;

    const VIEWS = [
        { id: 'meditate', label: '🧘 Meditate' },
        { id: 'breathe', label: '💨 Breathe' },
        { id: 'affirm', label: '✨ Affirm' },
        { id: 'playlists', label: '🎵 Playlists' },
    ];

    const startSession = (med) => {
        if (playing === med.title) {
            clearInterval(timer);
            setPlaying(null); setElapsed(0); setTimer(null);
        } else {
            clearInterval(timer);
            setPlaying(med.title); setElapsed(0);
            const int = setInterval(() => setElapsed(e => e + 1), 1000);
            setTimer(int);
            const secs = parseInt(med.duration) * 60;
            setTimeout(() => { clearInterval(int); setPlaying(null); setElapsed(0); }, secs * 1000);
        }
    };

    const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

    return (
        <div className="page has-bottom-nav" style={{ fontFamily: 'var(--font-sans)' }}>
            {/* Header */}
            <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(13,13,20,.94)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)', padding: '13px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 20 }}>🧘</span>
                    <span className="serif" style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>Calm Corner</span>
                </div>
                <div style={{ padding: '3px 10px', background: `${p.color}22`, border: `1px solid ${p.color}44`, borderRadius: 'var(--r-full)', fontSize: 11, color: p.color, fontWeight: 700 }}>{p.emoji} {p.label}</div>
            </div>

            {/* View Tabs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 4, padding: 10, background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
                {VIEWS.map(v => (
                    <button key={v.id} onClick={() => setView(v.id)} style={{ padding: '8px 2px', borderRadius: 'var(--r-md)', border: 'none', cursor: 'pointer', background: view === v.id ? 'var(--card)' : 'transparent', color: view === v.id ? p.color : 'var(--text-muted)', fontSize: 11, fontFamily: 'var(--font-sans)', fontWeight: view === v.id ? 700 : 400, boxShadow: view === v.id ? '0 1px 4px rgba(0,0,0,.3)' : 'none' }}>{v.label}</button>
                ))}
            </div>

            <div style={{ maxWidth: 620, margin: '0 auto', padding: '16px' }}>

                {/* ── MEDITATE ── */}
                {view === 'meditate' && (
                    <div className="anim-fade-up">
                        <div style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 14, lineHeight: 1.6 }}>
                            Phase-tuned meditations for your <strong style={{ color: p.color }}>{p.label}</strong> energy. Tap ▶ to begin a session.
                        </div>
                        {meditations.map((m, i) => {
                            const isPlaying = playing === m.title;
                            const totalSecs = parseInt(m.duration) * 60;
                            return (
                                <div key={i} className="card" style={{ padding: '16px 18px', marginBottom: 12, borderLeft: `3px solid ${isPlaying ? p.color : 'transparent'}`, transition: 'border-color .3s' }}>
                                    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                                        <div style={{ width: 48, height: 48, borderRadius: 14, background: `${p.color}18`, border: `1px solid ${p.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{m.icon}</div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{m.title}</span>
                                                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>⏱ {m.duration}</span>
                                            </div>
                                            <div style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: 10 }}>{m.desc}</div>

                                            {/* Progress bar when playing */}
                                            {isPlaying && (
                                                <div style={{ marginBottom: 8 }}>
                                                    <div style={{ height: 4, background: 'rgba(255,255,255,.06)', borderRadius: 2, marginBottom: 4 }}>
                                                        <div style={{ width: `${(elapsed / totalSecs) * 100}%`, height: '100%', background: p.color, borderRadius: 2, transition: 'width 1s linear' }} />
                                                    </div>
                                                    <div style={{ fontSize: 10, color: p.color }}>{fmt(elapsed)} / {m.duration}</div>
                                                </div>
                                            )}

                                            <button onClick={() => startSession(m)} style={{ padding: '7px 18px', background: isPlaying ? 'rgba(255,255,255,.06)' : p.color, border: `1px solid ${isPlaying ? 'var(--border)' : p.color}`, borderRadius: 'var(--r-full)', color: isPlaying ? 'var(--text-muted)' : 'white', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)', transition: 'all .2s' }}>
                                                {isPlaying ? '⏹ Stop' : '▶ Begin'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* ── BREATHE ── */}
                {view === 'breathe' && (
                    <div className="anim-fade-up">
                        <div className="card" style={{ padding: 24 }}>
                            <BreathingTimer phaseColor={p.color} />
                            <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border)', fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.7, textAlign: 'center' }}>
                                The 4-7-8 technique: breathe in for 4 seconds, hold for 7, exhale for 8. Shown to reduce anxiety within 3 cycles.
                            </div>
                        </div>
                    </div>
                )}

                {/* ── AFFIRM ── */}
                {view === 'affirm' && (
                    <div className="anim-fade-up">
                        <div style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 16, lineHeight: 1.6 }}>
                            Daily affirmations curated for your <strong style={{ color: p.color }}>{p.label}</strong> phase. Tap to reveal and swipe for the next one.
                        </div>

                        {/* Main affirmation card */}
                        <div onClick={() => setRevealed(true)} className="card" style={{ padding: '40px 28px', textAlign: 'center', cursor: 'pointer', marginBottom: 14, background: `linear-gradient(135deg, ${p.color}08, ${p.color}18)`, border: `1px solid ${p.color}33`, minHeight: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 14 }}>
                            <div style={{ fontSize: 32 }}>{p.emoji}</div>
                            {revealed ? (
                                <div className="anim-fade-up serif" style={{ fontSize: 22, color: 'var(--text)', lineHeight: 1.5, fontWeight: 400 }}>
                                    "{affirmations[affirmIdx]}"
                                </div>
                            ) : (
                                <div style={{ fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic' }}>Tap to reveal today's affirmation</div>
                            )}
                        </div>

                        {revealed && (
                            <div className="anim-fade-up" style={{ display: 'flex', gap: 10 }}>
                                <button onClick={() => { setAffirmIdx(i => (i - 1 + affirmations.length) % affirmations.length); setRevealed(false); setTimeout(() => setRevealed(true), 50); }} className="btn btn-ghost" style={{ flex: 1, padding: 11, fontSize: 13 }}>← Previous</button>
                                <button onClick={() => { setAffirmIdx(i => (i + 1) % affirmations.length); setRevealed(false); setTimeout(() => setRevealed(true), 50); }} className="btn btn-primary" style={{ flex: 1, padding: 11, fontSize: 13 }}>Next ✨</button>
                            </div>
                        )}

                        <div style={{ marginTop: 14, display: 'flex', justifyContent: 'center', gap: 6 }}>
                            {affirmations.map((_, i) => (
                                <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: i === affirmIdx ? p.color : 'var(--border)', transition: 'background .3s' }} />
                            ))}
                        </div>
                    </div>
                )}

                {/* ── PLAYLISTS ── */}
                {view === 'playlists' && (
                    <div className="anim-fade-up">
                        <div style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 16, lineHeight: 1.6 }}>Music curated for your {p.label} mood. These are Spotify suggestions — open in your app.</div>
                        {playlists.map((pl, i) => (
                            <div key={i} className="card" style={{ padding: '18px 20px', marginBottom: 10, display: 'flex', gap: 14, alignItems: 'center' }}>
                                <div style={{ width: 52, height: 52, borderRadius: 14, background: `${p.color}18`, border: `1px solid ${p.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>{pl.icon}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 3 }}>{pl.name}</div>
                                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{pl.vibe}</div>
                                </div>
                                <button style={{ padding: '7px 16px', background: 'transparent', border: `1px solid ${p.color}55`, borderRadius: 'var(--r-full)', color: p.color, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>▶ Play</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <BottomNav />
        </div>
    );
}
