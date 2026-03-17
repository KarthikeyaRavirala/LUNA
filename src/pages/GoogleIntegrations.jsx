import { useState } from 'react';
import BottomNav from '../components/BottomNav';

// Directly from luna-google-integrations.jsx design

const INTEGRATIONS = [
    {
        id: 'signin',
        icon: null, // Google logo SVG
        name: 'Google Sign-In',
        badge: 'Authentication',
        badgeColor: '#4285F4',
        desc: 'One-tap sign-in. No username/password. Your Luna profile is tied to your Google account for seamless access across devices.',
        features: [
            'One-tap sign-in experience',
            'Secure OAuth 2.0 token flow',
            'Profile auto-populated from Google',
            'Works offline after first sign-in',
        ],
        setup: ['Enable Google Identity API in Cloud Console', 'Add OAuth Client ID to app .env', 'Add your domain to allowed origins'],
        status: 'connected',
        color: '#4285F4',
    },
    {
        id: 'calendar',
        icon: '📅',
        name: 'Google Calendar',
        badge: 'Smart Sync',
        badgeColor: '#34A853',
        desc: 'LUNA automatically blocks focus-time windows during high-sensitivity phases, adds period reminders, and schedules self-care events synced to your cycle.',
        features: [
            'Auto-block Menstrual + Luteal windows',
            'Add "Ovulation Day" as recurring event',
            'Phase transition reminders 2 days ahead',
            'Optional shared calendar for partner',
        ],
        setup: ['Enable Google Calendar API', 'Request calendar.events scope', 'Use Supabase Edge Function for writes'],
        status: 'connected',
        color: '#34A853',
    },
    {
        id: 'tasks',
        icon: '✅',
        name: 'Google Tasks',
        badge: 'Reminders',
        badgeColor: '#FBBC05',
        desc: 'Phase-aware daily habit reminders pushed directly into your Google Tasks. Different checklists for each cycle phase — so you always know what your body needs today.',
        features: [
            'Menstrual: rest, hydration, heat therapy checklist',
            'Follicular: learning, social, creative tasks',
            'Ovulatory: big decisions, presentations, workouts',
            'Luteal: journaling, supplements, wind-down routine',
        ],
        setup: ['Enable Google Tasks API', 'Request tasks scope', 'Schedule via Supabase cron jobs'],
        status: 'disconnected',
        color: '#FBBC05',
    },
    {
        id: 'gmail',
        icon: '📧',
        name: 'Gmail',
        badge: 'Health Reports',
        badgeColor: '#EA4335',
        desc: 'Every month, LUNA emails you a doctor-ready PDF health summary — cycle length trends, phase durations, mood patterns, and exercise data — straight to your inbox.',
        features: [
            'Monthly cycle summary PDF',
            'Abnormal pattern alerts',
            'Doctor-shareable format',
            'Private — only sent to your address',
        ],
        setup: ['Enable Gmail API (send scope only)', 'Use Resend.com for reliable delivery', 'DPDP-compliant opt-in email'],
        status: 'disconnected',
        color: '#EA4335',
    },
    {
        id: 'fit',
        icon: '🏃',
        name: 'Google Fit',
        badge: 'Activity Sync',
        badgeColor: '#00BCD4',
        desc: 'Read your daily step count, active minutes, and heart rate data from Google Fit to give smarter exercise recommendations tuned to your actual fitness level and cycle phase.',
        features: [
            'Step count + active minutes sync',
            'Heart rate variability trends',
            'Phase-adjusted workout intensity tips',
            'Recovery score in Wellness Hub',
        ],
        setup: ['Enable Fitness API (read-only)', 'Use Health Connect on Android (Fit deprecated)', 'Handle iOS via HealthKit bridge'],
        status: 'disconnected',
        color: '#00BCD4',
        note: '⚠️ Google Fit is being deprecated. Android will use Health Connect, iOS uses HealthKit.',
    },
];

// Google "G" logo SVG
function GoogleLogo({ size = 24 }) {
    return (
        <svg viewBox="0 0 24 24" width={size} height={size}>
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
    );
}

export default function GoogleIntegrations() {
    const [statuses, setStatuses] = useState(() => Object.fromEntries(INTEGRATIONS.map(it => [it.id, it.status])));
    const [expanded, setExpanded] = useState('calendar');
    const [showSetup, setShowSetup] = useState({});

    const toggle = (id) => {
        setStatuses(prev => ({ ...prev, [id]: prev[id] === 'connected' ? 'disconnected' : 'connected' }));
    };

    const connectedCount = Object.values(statuses).filter(v => v === 'connected').length;

    return (
        <div className="page has-bottom-nav" style={{ fontFamily: 'var(--font-sans)' }}>
            {/* Header */}
            <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(13,13,20,.94)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)', padding: '13px 18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 2 }}>
                    <GoogleLogo size={22} />
                    <span className="serif" style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>Google Integrations</span>
                    <div style={{ marginLeft: 'auto', padding: '3px 10px', background: 'rgba(66,133,244,.15)', border: '1px solid rgba(66,133,244,.3)', borderRadius: 'var(--r-full)', fontSize: 11, color: '#90caf9', fontWeight: 700 }}>{connectedCount}/{INTEGRATIONS.length} connected</div>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>All integrations are optional — LUNA works without any of them.</div>
            </div>

            <div style={{ maxWidth: 640, margin: '0 auto', padding: '16px' }}>
                {/* Status summary bar */}
                <div style={{ display: 'flex', gap: 4, marginBottom: 18, height: 6, borderRadius: 4, overflow: 'hidden', background: 'var(--card)' }}>
                    {INTEGRATIONS.map(it => (
                        <div key={it.id} style={{ flex: 1, background: statuses[it.id] === 'connected' ? it.color : 'var(--border)', transition: 'background .3s', borderRadius: 2 }} />
                    ))}
                </div>

                {/* Integration cards */}
                {INTEGRATIONS.map((it) => {
                    const isOn = statuses[it.id] === 'connected';
                    const isExpanded = expanded === it.id;

                    return (
                        <div key={it.id} className="card" style={{ marginBottom: 10, overflow: 'hidden' }}>
                            {/* Card header */}
                            <div style={{ padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'center', cursor: 'pointer' }} onClick={() => setExpanded(isExpanded ? null : it.id)}>
                                {/* Icon */}
                                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${it.color}18`, border: `1px solid ${it.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    {it.id === 'signin' ? <GoogleLogo size={22} /> : <span style={{ fontSize: 22 }}>{it.icon}</span>}
                                </div>
                                {/* Title */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 3 }}>
                                        <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{it.name}</span>
                                        <span style={{ fontSize: 10, color: it.badgeColor, background: `${it.badgeColor}18`, padding: '2px 8px', borderRadius: 'var(--r-full)', fontWeight: 700, letterSpacing: '.05em' }}>{it.badge}</span>
                                    </div>
                                    <div style={{ fontSize: 11, color: isOn ? it.color : 'var(--text-muted)', fontWeight: isOn ? 600 : 400 }}>{isOn ? '✓ Connected' : 'Not connected'}</div>
                                </div>
                                {/* Toggle */}
                                <div className="toggle" onClick={e => { e.stopPropagation(); toggle(it.id); }} style={{ background: isOn ? it.color : 'var(--card-alt)', borderColor: isOn ? it.color : 'var(--border)' }}>
                                    <div className="toggle-knob" style={{ left: isOn ? 23 : 3 }} />
                                </div>
                                {/* Chevron */}
                                <span style={{ fontSize: 14, color: 'var(--text-muted)', marginLeft: 4, transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform .2s', userSelect: 'none' }}>⌄</span>
                            </div>

                            {/* Expanded detail */}
                            {isExpanded && (
                                <div className="anim-fade-up" style={{ padding: '0 16px 16px', borderTop: '1px solid var(--border)' }}>
                                    {it.note && (
                                        <div style={{ margin: '12px 0', padding: '8px 12px', background: 'rgba(251,188,5,.1)', border: '1px solid rgba(251,188,5,.25)', borderRadius: 'var(--r-md)', fontSize: 11, color: '#ffd54f' }}>
                                            {it.note}
                                        </div>
                                    )}
                                    <p style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.7, margin: '12px 0' }}>{it.desc}</p>

                                    {/* Features */}
                                    <div style={{ marginBottom: 12 }}>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 8 }}>What it does</div>
                                        {it.features.map((f, i) => (
                                            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '5px 0', borderBottom: i < it.features.length - 1 ? '1px solid var(--border)' : 'none' }}>
                                                <span style={{ color: it.color, fontSize: 12, marginTop: 1, flexShrink: 0 }}>✓</span>
                                                <span style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.5 }}>{f}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Setup steps collapsible */}
                                    <button onClick={() => setShowSetup(p => ({ ...p, [it.id]: !p[it.id] }))} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 12, cursor: 'pointer', fontFamily: 'var(--font-sans)', marginBottom: showSetup[it.id] ? 10 : 0, display: 'flex', alignItems: 'center', gap: 4 }}>
                                        🛠 {showSetup[it.id] ? 'Hide' : 'Show'} developer setup steps
                                    </button>
                                    {showSetup[it.id] && (
                                        <div className="anim-fade-up" style={{ background: 'var(--surface)', borderRadius: 'var(--r-md)', padding: '10px 14px' }}>
                                            {it.setup.map((s, i) => (
                                                <div key={i} style={{ display: 'flex', gap: 10, padding: '5px 0', borderTop: i > 0 ? '1px solid var(--border)' : 'none' }}>
                                                    <span style={{ fontSize: 11, color: it.color, fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                                                    <span style={{ fontSize: 11, color: 'var(--text-dim)', lineHeight: 1.5 }}>{s}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Connect button */}
                                    {!isOn && (
                                        <button onClick={() => toggle(it.id)} className="btn" style={{ marginTop: 14, width: '100%', padding: '11px', fontSize: 13, background: it.color, color: 'white', border: 'none', borderRadius: 'var(--r-full)', boxShadow: `0 4px 16px ${it.color}33` }}>
                                            {it.id === 'signin' ? <><GoogleLogo size={16} /> Connect with Google</> : `Connect ${it.name}`}
                                        </button>
                                    )}
                                    {isOn && (
                                        <button onClick={() => toggle(it.id)} className="btn btn-ghost" style={{ marginTop: 14, width: '100%', padding: '10px', fontSize: 13 }}>
                                            Disconnect {it.name}
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* Info footer */}
                <div style={{ padding: '14px 16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', marginTop: 8 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>🔒 Your privacy, always</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                        LUNA only requests the minimum permissions needed for each feature. We never store your raw Google data — only derived insights. You can revoke access anytime from your Google Account settings.
                    </div>
                </div>
            </div>

            <BottomNav />
        </div>
    );
}
