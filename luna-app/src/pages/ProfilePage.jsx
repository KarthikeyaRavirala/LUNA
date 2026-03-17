import { useState } from 'react';
import BottomNav from '../components/BottomNav';

const STATS = [
    { label: 'Cycles Logged', value: '7', icon: '📅' },
    { label: 'Room Hours', value: '14h', icon: '🌙' },
    { label: 'Posts', value: '23', icon: '📝' },
    { label: 'Cohort Friends', value: '4', icon: '👯' },
];

const PHASES = [
    { label: 'Menstrual', emoji: '🌑', color: '#ef5350', days: 'Day 1–5' },
    { label: 'Follicular', emoji: '🌱', color: '#66bb6a', days: 'Day 6–13' },
    { label: 'Ovulatory', emoji: '🌕', color: '#ffa726', days: 'Day 14–16' },
    { label: 'Luteal', emoji: '🌸', color: '#f06292', days: 'Day 17–28', current: true },
];

const GOOGLE_SERVICES = [
    {
        id: 'calendar', icon: '📅', name: 'Google Calendar', desc: 'Phase blocks synced', color: '#4285F4', connected: true
    },
    { id: 'fit', icon: '🏃', name: 'Google Fit', desc: 'Activity data syncing', color: '#34A853', connected: true },
    { id: 'tasks', icon: '✅', name: 'Google Tasks', desc: 'Daily reminders active', color: '#34A853', connected: false },
    { id: 'gmail', icon: '📧', name: 'Gmail', desc: 'Monthly health reports', color: '#EA4335', connected: false },
];

export default function ProfilePage() {
    const [partnerEmail, setPartnerEmail] = useState('');
    const [partnerEnabled, setPartnerEnabled] = useState(false);
    const [google, setGoogle] = useState(GOOGLE_SERVICES.reduce((a, s) => ({ ...a, [s.id]: s.connected }), {}));
    const [privacySettings, setPrivacySettings] = useState({ phase: true, posts: true, cohort: true, anonymous: false });
    const [activeSection, setActiveSection] = useState('overview');

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: "'DM Sans', sans-serif" }} className="has-bottom-nav">
            {/* Header */}
            <div style={{ background: 'rgba(7,9,15,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>Profile</span>
                <button className="btn btn-ghost" style={{ padding: '6px 14px', fontSize: 12 }}>Edit</button>
            </div>

            <div style={{ maxWidth: 680, margin: '0 auto', padding: '20px 16px' }}>
                {/* Profile Header */}
                <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
                    <div style={{ width: 76, height: 76, borderRadius: '50%', background: 'linear-gradient(135deg, #be185d, #f472b6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, border: '3px solid #f472b6', boxShadow: '0 0 20px rgba(244,114,182,0.4)', flexShrink: 0 }}>🌸</div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}>MoonRose_22</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                            <div style={{ padding: '2px 10px', background: '#f0629222', border: '1px solid #f0629244', borderRadius: 'var(--radius-full)', fontSize: 11, color: '#f06292', fontWeight: 700 }}>🌸 Luteal Phase</div>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Day 19</div>
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Hyderabad, India · Joined Feb 2026</div>
                    </div>
                </div>

                {/* Stats Row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginBottom: 20 }}>
                    {STATS.map(s => (
                        <div key={s.label} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '12px 8px', textAlign: 'center' }}>
                            <div style={{ fontSize: 16, marginBottom: 4 }}>{s.icon}</div>
                            <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--rose)', fontFamily: "'Playfair Display', serif" }}>{s.value}</div>
                            <div style={{ fontSize: 10, color: 'var(--text-muted)', lineHeight: 1.3 }}>{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* Tab Navigation */}
                <div style={{ display: 'flex', gap: 4, marginBottom: 16, background: 'var(--surface)', borderRadius: 'var(--radius-lg)', padding: 4, border: '1px solid var(--border)' }}>
                    {[
                        { id: 'overview', label: '🌕 Cycle' },
                        { id: 'partner', label: '💌 Partner' },
                        { id: 'google', label: '🔗 Google' },
                        { id: 'privacy', label: '🔒 Privacy' },
                    ].map(tab => (
                        <button key={tab.id} onClick={() => setActiveSection(tab.id)} style={{ flex: 1, padding: '8px', borderRadius: 'var(--radius-md)', border: 'none', cursor: 'pointer', background: activeSection === tab.id ? 'var(--card)' : 'transparent', color: activeSection === tab.id ? 'var(--text)' : 'var(--text-muted)', fontSize: 11, fontWeight: activeSection === tab.id ? 700 : 400, fontFamily: 'DM Sans, sans-serif', transition: 'all 0.2s', boxShadow: activeSection === tab.id ? '0 1px 4px rgba(0,0,0,0.2)' : 'none' }}>{tab.label}</button>
                    ))}
                </div>

                {/* CYCLE OVERVIEW */}
                {activeSection === 'overview' && (
                    <div style={{ animation: 'fadeUp 0.3s ease' }}>
                        <div className="card" style={{ padding: 20, marginBottom: 12 }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>🌙 Your 28-Day Cycle</div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10 }}>
                                {PHASES.map(p => (
                                    <div key={p.label} style={{ padding: '14px', background: p.current ? `${p.color}18` : 'var(--surface)', border: `1px solid ${p.current ? p.color + '55' : 'var(--border)'}`, borderRadius: 'var(--radius-md)', boxShadow: p.current ? `0 0 16px ${p.color}22` : 'none' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                                            <span style={{ fontSize: 20 }}>{p.emoji}</span>
                                            {p.current && <span style={{ fontSize: 10, color: p.color, fontWeight: 700, background: `${p.color}22`, padding: '1px 6px', borderRadius: 'var(--radius-full)' }}>CURRENT</span>}
                                        </div>
                                        <div style={{ fontSize: 13, fontWeight: 600, color: p.current ? p.color : 'var(--text)' }}>{p.label}</div>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.days}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="card" style={{ padding: 20 }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>📊 Recent Cycle History</div>
                            {[
                                { cycle: 'Cycle 7', start: 'Feb 19, 2026', length: '28 days', status: 'Current' },
                                { cycle: 'Cycle 6', start: 'Jan 22, 2026', length: '27 days', status: 'Complete' },
                                { cycle: 'Cycle 5', start: 'Dec 26, 2025', length: '29 days', status: 'Complete' },
                            ].map((c, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < 2 ? '1px solid var(--border)' : 'none' }}>
                                    <div>
                                        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{c.cycle}</div>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Started {c.start}</div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: 12, color: i === 0 ? 'var(--rose)' : 'var(--text-dim)', fontWeight: i === 0 ? 700 : 400 }}>{c.status}</div>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c.length}</div>
                                    </div>
                                </div>
                            ))}
                            <button className="btn btn-ghost" style={{ width: '100%', marginTop: 12, fontSize: 13, padding: 10 }}>📄 Export Doctor PDF</button>
                        </div>
                    </div>
                )}

                {/* PARTNER BRIDGE */}
                {activeSection === 'partner' && (
                    <div style={{ animation: 'fadeUp 0.3s ease' }}>
                        <div className="card" style={{ padding: 20, marginBottom: 12 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                                <span style={{ fontSize: 24 }}>💌</span>
                                <div>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Partner Bridge</div>
                                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>A gentle nudge. No details ever shared.</div>
                                </div>
                                <div onClick={() => setPartnerEnabled(!partnerEnabled)} style={{ marginLeft: 'auto', width: 44, height: 24, borderRadius: 12, background: partnerEnabled ? '#a78bfa' : 'var(--surface)', border: `1px solid ${partnerEnabled ? '#a78bfa' : 'var(--border)'}`, cursor: 'pointer', position: 'relative', transition: 'all 0.25s', flexShrink: 0 }}>
                                    <div style={{ position: 'absolute', top: 3, left: partnerEnabled ? 23 : 3, width: 16, height: 16, borderRadius: '50%', background: 'white', transition: 'left 0.25s' }} />
                                </div>
                            </div>
                            <p style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 16 }}>When you enter the Luteal or Menstrual phase, LUNA sends your partner a gentle email: <em>"She could use some extra care this week 💙"</em> — nothing else. No cycle details.</p>
                            <input
                                value={partnerEmail}
                                onChange={e => setPartnerEmail(e.target.value)}
                                placeholder="Partner's email address"
                                style={{ width: '100%', padding: '12px 14px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', color: 'var(--text)', fontSize: 13, fontFamily: 'DM Sans, sans-serif', outline: 'none', marginBottom: 10 }}
                            />
                            <button className="btn btn-primary" style={{ width: '100%', fontSize: 13, padding: 11 }}>Save Partner Settings</button>
                        </div>
                        <div className="card" style={{ padding: 20 }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>🎮 Husband Hangout Mode</div>
                            <p style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 16 }}>When your cohort room goes live, your partner gets matched into a relaxed activity group with other partners — sports, movies, games, cooking — keeping everyone happy.</p>
                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                {['🎮 Gaming Night', '🍕 Cook Together', '🎬 Movie Night', '⚽ Watch Sports'].map(item => (
                                    <div key={item} style={{ padding: '6px 12px', background: 'rgba(96,165,250,0.08)', border: '1px solid rgba(96,165,250,0.2)', borderRadius: 'var(--radius-full)', fontSize: 12, color: '#60a5fa' }}>{item}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* GOOGLE INTEGRATIONS */}
                {activeSection === 'google' && (
                    <div style={{ animation: 'fadeUp 0.3s ease' }}>
                        <div className="card" style={{ padding: 20 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                                <svg viewBox="0 0 24 24" width="24" height="24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                                <div>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Google Integrations</div>
                                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>luna.user@gmail.com</div>
                                </div>
                            </div>
                            {GOOGLE_SERVICES.map(s => (
                                <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                                    <div style={{ width: 38, height: 38, borderRadius: 10, background: `${s.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0, border: `1px solid ${s.color}33` }}>{s.icon}</div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{s.name}</div>
                                        <div style={{ fontSize: 11, color: google[s.id] ? s.color : 'var(--text-muted)' }}>{google[s.id] ? '✓ ' + s.desc : 'Not connected'}</div>
                                    </div>
                                    <div onClick={() => setGoogle(p => ({ ...p, [s.id]: !p[s.id] }))} style={{ width: 44, height: 24, borderRadius: 12, background: google[s.id] ? s.color : 'var(--surface)', border: `1px solid ${google[s.id] ? s.color : 'var(--border)'}`, cursor: 'pointer', position: 'relative', transition: 'all 0.25s', flexShrink: 0 }}>
                                        <div style={{ position: 'absolute', top: 3, left: google[s.id] ? 23 : 3, width: 16, height: 16, borderRadius: '50%', background: 'white', transition: 'left 0.25s' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* PRIVACY */}
                {activeSection === 'privacy' && (
                    <div style={{ animation: 'fadeUp 0.3s ease' }}>
                        <div className="card" style={{ padding: 20, marginBottom: 12 }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>🔒 Privacy Controls</div>
                            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>You control exactly what others see about you.</div>
                            {[
                                { key: 'phase', label: 'Show current phase in feed', desc: 'Others can see which phase you are in' },
                                { key: 'posts', label: 'Public posts visible', desc: 'Your posts appear in shared spaces' },
                                { key: 'cohort', label: 'Visible to cohort members', desc: 'Cohort can find your profile' },
                                { key: 'anonymous', label: 'Anonymous mode', desc: 'Only your Luna Name shown, no avatar' },
                            ].map(opt => (
                                <div key={opt.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                                    <div style={{ flex: 1, paddingRight: 12 }}>
                                        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{opt.label}</div>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{opt.desc}</div>
                                    </div>
                                    <div onClick={() => setPrivacySettings(p => ({ ...p, [opt.key]: !p[opt.key] }))} style={{ width: 44, height: 24, borderRadius: 12, background: privacySettings[opt.key] ? 'var(--rose-dark)' : 'var(--surface)', border: `1px solid ${privacySettings[opt.key] ? 'var(--rose)' : 'var(--border)'}`, cursor: 'pointer', position: 'relative', transition: 'all 0.25s', flexShrink: 0 }}>
                                        <div style={{ position: 'absolute', top: 3, left: privacySettings[opt.key] ? 23 : 3, width: 16, height: 16, borderRadius: '50%', background: 'white', transition: 'left 0.25s' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                            <button className="btn btn-ghost" style={{ fontSize: 12, padding: 11 }}>📥 Export Data</button>
                            <button style={{ padding: 11, background: 'rgba(239,83,80,0.1)', border: '1px solid rgba(239,83,80,0.3)', borderRadius: 'var(--radius-full)', color: '#ef5350', fontSize: 12, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontWeight: 600 }}>🗑 Delete Account</button>
                        </div>
                    </div>
                )}
            </div>
            <BottomNav />
        </div>
    );
}
