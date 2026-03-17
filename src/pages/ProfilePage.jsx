import { useState } from 'react';
import { useApp } from '../context/AppContext';
import BottomNav from '../components/BottomNav';

const CYCLE_HISTORY = [
    { label: 'Cycle 7', start: 'Feb 19, 2026', length: '28 days', status: 'Current' },
    { label: 'Cycle 6', start: 'Jan 22, 2026', length: '27 days', status: 'Complete' },
    { label: 'Cycle 5', start: 'Dec 26, 2025', length: '29 days', status: 'Complete' },
];

function Toggle({ on, color = 'var(--rose)', onChange }) {
    return (
        <div className="toggle" onClick={onChange} style={{ background: on ? color : 'var(--card-alt)', borderColor: on ? color : 'var(--border)', flexShrink: 0 }}>
            <div className="toggle-knob" style={{ left: on ? 23 : 3 }} />
        </div>
    );
}

export default function ProfilePage() {
    const { user, PHASES, saveUser } = useApp();
    const p = PHASES[user.currentPhase] || PHASES.luteal;

    const [tab, setTab] = useState('cycle');
    const [partnerEmail, setPartnerEmail] = useState('');
    const [partnerOn, setPartnerOn] = useState(false);
    const [privacy, setPrivacy] = useState({ phase: true, posts: true, cohort: true, anon: false });
    const [googleConn, setGoogleConn] = useState({ calendar: true, fit: false, tasks: false, gmail: false });

    const TABS = [
        { id: 'cycle', label: '🌕 Cycle' },
        { id: 'partner', label: '💌 Partner' },
        { id: 'privacy', label: '🔒 Privacy' },
        { id: 'account', label: '⚙️ Account' },
    ];

    const STATS = [
        { label: 'Cycles Logged', value: '7', icon: '📅' },
        { label: 'Room Hours', value: '14h', icon: '🌙' },
        { label: 'Posts', value: '23', icon: '📝' },
        { label: 'Cohort', value: '4', icon: '👯' },
    ];

    const PHASES_LIST = Object.values(PHASES);

    return (
        <div className="page has-bottom-nav" style={{ fontFamily: 'var(--font-sans)' }}>
            {/* Header */}
            <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(13,13,20,.94)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)', padding: '13px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="serif" style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>Profile</span>
                <button className="btn btn-ghost" style={{ padding: '6px 16px', fontSize: 12 }} onClick={() => alert('Edit profile — Phase 2 feature')}>Edit</button>
            </div>

            <div style={{ maxWidth: 640, margin: '0 auto', padding: '20px 16px' }}>
                {/* Avatar + name */}
                <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
                    <div style={{ width: 76, height: 76, borderRadius: '50%', background: `linear-gradient(135deg, var(--rose), var(--rose-mid))`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, border: '3px solid var(--rose-lite)', boxShadow: '0 0 24px var(--rose-glow)', flexShrink: 0 }}>
                        🌸
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="serif" style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{user.lunaName || 'LunaSister'}</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
                            <div className="phase-pill" style={{ background: p.bg, border: `1px solid ${p.color}44`, color: p.color }}>{p.emoji} {p.label} Phase</div>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Day {user.currentDay}</div>
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Hyderabad · Joined Mar 2026</div>
                    </div>
                </div>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginBottom: 20 }}>
                    {STATS.map(s => (
                        <div key={s.label} className="card" style={{ padding: '12px 6px', textAlign: 'center' }}>
                            <div style={{ fontSize: 16, marginBottom: 4 }}>{s.icon}</div>
                            <div className="serif" style={{ fontSize: 18, fontWeight: 700, color: 'var(--rose-lite)', marginBottom: 1 }}>{s.value}</div>
                            <div style={{ fontSize: 9, color: 'var(--text-muted)', lineHeight: 1.3 }}>{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* Tab selector */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 4, background: 'var(--surface)', borderRadius: 'var(--r-lg)', padding: 4, border: '1px solid var(--border)', marginBottom: 16 }}>
                    {TABS.map(t => (
                        <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: '9px 4px', borderRadius: 'var(--r-md)', border: 'none', cursor: 'pointer', background: tab === t.id ? 'var(--card)' : 'transparent', color: tab === t.id ? 'var(--text)' : 'var(--text-muted)', fontSize: 11, fontWeight: tab === t.id ? 700 : 400, fontFamily: 'var(--font-sans)', transition: 'all .2s', boxShadow: tab === t.id ? '0 1px 4px rgba(0,0,0,.3)' : 'none' }}>
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* ── CYCLE TAB ── */}
                {tab === 'cycle' && (
                    <div className="anim-fade-up">
                        <div className="card" style={{ padding: 18, marginBottom: 12 }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 14 }}>🌙 Your {user.cycleLength || 28}-Day Cycle</div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10 }}>
                                {PHASES_LIST.map(ph => (
                                    <div key={ph.key} style={{ padding: 14, background: ph.key === user.currentPhase ? ph.bg : 'var(--surface)', border: `1px solid ${ph.key === user.currentPhase ? ph.color + '55' : 'var(--border)'}`, borderRadius: 'var(--r-md)', boxShadow: ph.key === user.currentPhase ? `0 0 16px ${ph.color}22` : 'none' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                                            <span style={{ fontSize: 18 }}>{ph.emoji}</span>
                                            {ph.key === user.currentPhase && <span style={{ fontSize: 9, color: ph.color, fontWeight: 700, background: `${ph.color}22`, padding: '1px 7px', borderRadius: 'var(--r-full)' }}>CURRENT</span>}
                                        </div>
                                        <div style={{ fontSize: 13, fontWeight: 600, color: ph.key === user.currentPhase ? ph.color : 'var(--text)' }}>{ph.label}</div>
                                        <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{ph.days}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="card" style={{ padding: 18 }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>📊 Cycle History</div>
                            {CYCLE_HISTORY.map((c, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < CYCLE_HISTORY.length - 1 ? '1px solid var(--border)' : 'none' }}>
                                    <div>
                                        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{c.label}</div>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Started {c.start}</div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: 12, color: i === 0 ? 'var(--rose-lite)' : 'var(--text-dim)', fontWeight: i === 0 ? 700 : 400 }}>{c.status}</div>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c.length}</div>
                                    </div>
                                </div>
                            ))}
                            <button className="btn btn-ghost" style={{ width: '100%', marginTop: 14, fontSize: 13, padding: 11 }}>📄 Export Monthly Health PDF</button>
                        </div>
                    </div>
                )}

                {/* ── PARTNER TAB ── */}
                {tab === 'partner' && (
                    <div className="anim-fade-up">
                        <div className="card" style={{ padding: 18, marginBottom: 12 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                                <div style={{ width: 46, height: 46, borderRadius: 12, background: 'rgba(206,147,216,.18)', border: '1px solid rgba(206,147,216,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>💌</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Partner Bridge</div>
                                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>A gentle nudge. No personal details ever shared.</div>
                                </div>
                                <Toggle on={partnerOn} color="var(--purple)" onChange={() => setPartnerOn(!partnerOn)} />
                            </div>
                            <p style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 16 }}>
                                When you enter Luteal or Menstrual phase, LUNA emails your partner: <em style={{ color: 'var(--purple)' }}>"She could use some extra care this week 💙"</em> — nothing else. No cycle data. No details.
                            </p>
                            <label style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 6, letterSpacing: '.07em', textTransform: 'uppercase' }}>Partner email</label>
                            <input className="input" value={partnerEmail} onChange={e => setPartnerEmail(e.target.value)} placeholder="partner@email.com" style={{ marginBottom: 12 }} />
                            <button className="btn btn-primary" style={{ width: '100%', fontSize: 13, padding: 12 }}>Save Partner Settings</button>
                        </div>

                        <div className="card" style={{ padding: 18 }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>🎮 Husband Hangout Mode</div>
                            <p style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 14 }}>When your Luna Room activates, your partner gets matched into a chill activity group with other partners — so everyone has a good time.</p>
                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                {['🎮 Gaming Night', '🍕 Cook Together', '🎬 Movie Night', '⚽ Watch Sports', '🎵 Music Night'].map(item => (
                                    <div key={item} style={{ padding: '6px 12px', background: 'rgba(96,165,250,.08)', border: '1px solid rgba(96,165,250,.2)', borderRadius: 'var(--r-full)', fontSize: 11, color: 'var(--blue)' }}>{item}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* ── PRIVACY TAB ── */}
                {tab === 'privacy' && (
                    <div className="anim-fade-up">
                        <div className="card" style={{ padding: 18, marginBottom: 12 }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>🔒 Privacy Controls</div>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 14 }}>You control exactly what others can see about you.</div>
                            {[
                                { key: 'phase', label: 'Show current phase in feed', desc: 'Others see which phase you are in on your posts' },
                                { key: 'posts', label: 'Public posts', desc: 'Your posts appear in the shared community feed' },
                                { key: 'cohort', label: 'Visible to cohort members', desc: 'Cohort can find and view your profile' },
                                { key: 'anon', label: 'Anonymous mode', desc: 'Only your Luna Name shown — no avatar or phase badge' },
                            ].map(opt => (
                                <div key={opt.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                                    <div style={{ flex: 1, paddingRight: 14 }}>
                                        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{opt.label}</div>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{opt.desc}</div>
                                    </div>
                                    <Toggle on={privacy[opt.key]} onChange={() => setPrivacy(prev => ({ ...prev, [opt.key]: !prev[opt.key] }))} />
                                </div>
                            ))}
                        </div>
                        <div className="card" style={{ padding: 18 }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 14 }}>🔗 Google Connected</div>
                            {[
                                { id: 'calendar', name: 'Calendar', color: '#34A853' },
                                { id: 'fit', name: 'Fit', color: '#00BCD4' },
                                { id: 'tasks', name: 'Tasks', color: '#FBBC05' },
                                { id: 'gmail', name: 'Gmail', color: '#EA4335' },
                            ].map(s => (
                                <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                                    <div>
                                        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>Google {s.name}</div>
                                        <div style={{ fontSize: 11, color: googleConn[s.id] ? s.color : 'var(--text-muted)' }}>{googleConn[s.id] ? '✓ Connected' : 'Not connected'}</div>
                                    </div>
                                    <Toggle on={googleConn[s.id]} color={s.color} onChange={() => setGoogleConn(prev => ({ ...prev, [s.id]: !prev[s.id] }))} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── ACCOUNT TAB ── */}
                {tab === 'account' && (
                    <div className="anim-fade-up">
                        <div className="card" style={{ padding: 18, marginBottom: 12 }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 14 }}>⚙️ Account Settings</div>
                            {[
                                { icon: '🌍', label: 'Language', value: 'English' },
                                { icon: '🔔', label: 'Notifications', value: 'Phase transitions + Rooms' },
                                { icon: '🌙', label: 'Theme', value: 'Dark (Default)' },
                                { icon: '📏', label: 'Cycle Length', value: `${user.cycleLength || 28} days` },
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <span style={{ fontSize: 18 }}>{item.icon}</span>
                                        <span style={{ fontSize: 13, color: 'var(--text)' }}>{item.label}</span>
                                    </div>
                                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.value} →</span>
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                            <button className="btn btn-ghost" style={{ fontSize: 12, padding: 12 }}>📥 Export My Data</button>
                            <button style={{ padding: 12, background: 'rgba(239,83,80,.1)', border: '1px solid rgba(239,83,80,.3)', borderRadius: 'var(--r-full)', color: '#ef5350', fontSize: 12, cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>🗑 Delete Account</button>
                        </div>
                        <div style={{ marginTop: 10, padding: '12px 14px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>LUNA Phase 1</div>
                                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>v1.0.0 · Built March 2026</div>
                            </div>
                            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>DPDP Compliant 🇮🇳</div>
                        </div>
                    </div>
                )}
            </div>

            <BottomNav />
        </div>
    );
}
