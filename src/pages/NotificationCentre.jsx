import { useState } from 'react';
import { useApp } from '../context/AppContext';
import BottomNav from '../components/BottomNav';

const MOCK_NOTIFICATIONS = [
    { id: 1, type: 'phase', icon: '🌸', title: 'Entering Luteal Phase tomorrow', body: 'Your cycle predicts you\'ll shift into Luteal on March 11. Prepare with magnesium and sleep.', time: '2h ago', read: false, tab: 'phase' },
    { id: 2, type: 'cohort', icon: '💗', title: 'MoonRose_22 liked your post', body: '"Follicular energy is real and I\'m obsessed 🚀" got 12 new likes from your cohort.', time: '3h ago', read: false, tab: 'cohort' },
    { id: 3, type: 'alert', icon: '📅', title: 'Period due in 3 days', body: 'Based on your last 3 cycles, your period is expected around March 12. Prep your kit.', time: '5h ago', read: false, tab: 'phase' },
    { id: 4, type: 'partner', icon: '💙', title: 'Care message from your partner', body: '"I see you. I\'m here. 💙" — Received quietly at 9:14 PM. Reply from your Partner Bridge.', time: '8h ago', read: true, tab: 'partner' },
    { id: 5, type: 'cohort', icon: '🌙', title: 'Luna Room opens tonight at 9 PM', body: '3 cohort members are in Luteal phase — your room opens tonight. You\'ll be notified.', time: '10h ago', read: true, tab: 'cohort' },
    { id: 6, type: 'phase', icon: '✨', title: 'You were in Follicular last week', body: 'Your average energy peaked at 94% during follicular days 7-10. Your peak window is returning!', time: '2d ago', read: true, tab: 'phase' },
    { id: 7, type: 'cohort', icon: '🍫', title: 'New recipe in Craving Kitchen', body: 'VelvetMoon added "Ashwagandha Moon Milk" — 201 likes already. Luteal phase-specific.', time: '2d ago', read: true, tab: 'cohort' },
    { id: 8, type: 'alert', icon: '🔔', title: 'Weekly wellness check-in', body: 'You logged 5 days this week 🎉 That\'s your best streak this cycle! Keep it going tomorrow.', time: '3d ago', read: true, tab: 'phase' },
];

const TYPE_COLOR = {
    phase: '#f06292',
    cohort: '#ce93d8',
    partner: '#90caf9',
    alert: '#ffa726',
};

export default function NotificationCentre() {
    const { user, PHASES } = useApp();
    const p = PHASES[user.currentPhase] || PHASES.luteal;

    const [activeTab, setActiveTab] = useState('all');
    const [readState, setReadState] = useState(
        Object.fromEntries(MOCK_NOTIFICATIONS.map(n => [n.id, n.read]))
    );

    const markRead = (id) => setReadState(s => ({ ...s, [id]: true }));
    const markAll = () => setReadState(Object.fromEntries(MOCK_NOTIFICATIONS.map(n => [n.id, true])));

    const filtered = MOCK_NOTIFICATIONS.filter(n => activeTab === 'all' || n.tab === activeTab);
    const unread = MOCK_NOTIFICATIONS.filter(n => !readState[n.id]).length;

    const TABS = [
        { id: 'all', label: 'All', emoji: '🔔' },
        { id: 'phase', label: 'Cycle', emoji: '🌸' },
        { id: 'cohort', label: 'Cohort', emoji: '💜' },
        { id: 'partner', label: 'Partner', emoji: '💙' },
    ];

    return (
        <div className="page has-bottom-nav" style={{ fontFamily: 'var(--font-sans)' }}>
            {/* Header */}
            <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(13,13,20,.94)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)', padding: '13px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ position: 'relative' }}>
                        <span style={{ fontSize: 20 }}>🔔</span>
                        {unread > 0 && <div style={{ position: 'absolute', top: -4, right: -4, width: 16, height: 16, background: 'var(--rose)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: 'white', fontWeight: 800, border: '2px solid var(--bg)' }}>{unread}</div>}
                    </div>
                    <span className="serif" style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>Notifications</span>
                </div>
                {unread > 0 && (
                    <button onClick={markAll} style={{ background: 'none', border: 'none', color: 'var(--rose-lite)', fontSize: 12, cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Mark all read</button>
                )}
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
                {TABS.map(t => {
                    const tabUnread = MOCK_NOTIFICATIONS.filter(n => !readState[n.id] && (t.id === 'all' || n.tab === t.id)).length;
                    return (
                        <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ flex: 1, padding: '11px 4px', background: 'none', border: 'none', borderBottom: `2px solid ${activeTab === t.id ? p.color : 'transparent'}`, cursor: 'pointer', fontSize: 11, fontWeight: activeTab === t.id ? 700 : 400, color: activeTab === t.id ? p.color : 'var(--text-muted)', fontFamily: 'var(--font-sans)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, transition: 'all .2s' }}>
                            {t.emoji} {t.label}
                            {tabUnread > 0 && <div style={{ width: 16, height: 16, background: 'var(--rose)', borderRadius: '50%', fontSize: 9, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>{tabUnread}</div>}
                        </button>
                    );
                })}
            </div>

            <div style={{ maxWidth: 640, margin: '0 auto', padding: 16 }}>
                {filtered.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                        <div style={{ fontSize: 40, marginBottom: 12 }}>🌸</div>
                        <div style={{ fontSize: 14 }}>All quiet here — enjoy the peace 💜</div>
                    </div>
                ) : filtered.map(n => {
                    const isRead = readState[n.id];
                    const color = TYPE_COLOR[n.type] || 'var(--rose)';
                    return (
                        <div key={n.id} onClick={() => markRead(n.id)} style={{ display: 'flex', gap: 14, padding: '14px 16px', marginBottom: 8, background: isRead ? 'var(--card)' : `${color}0d`, border: `1px solid ${isRead ? 'var(--border)' : color + '44'}`, borderLeft: `3px solid ${isRead ? 'var(--border)' : color}`, borderRadius: 'var(--r-md)', cursor: 'pointer', transition: 'all .2s' }}>
                            {/* Icon */}
                            <div style={{ width: 40, height: 40, borderRadius: '50%', background: `${color}18`, border: `1px solid ${color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{n.icon}</div>

                            {/* Content */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 4 }}>
                                    <div style={{ fontSize: 13, fontWeight: isRead ? 500 : 700, color: isRead ? 'var(--text-dim)' : 'var(--text)', lineHeight: 1.4 }}>{n.title}</div>
                                    <div style={{ flexShrink: 0, display: 'flex', gap: 6, alignItems: 'center' }}>
                                        {!isRead && <div style={{ width: 7, height: 7, borderRadius: '50%', background: color, flexShrink: 0 }} />}
                                        <span style={{ fontSize: 10, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{n.time}</span>
                                    </div>
                                </div>
                                <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.55 }}>{n.body}</div>
                            </div>
                        </div>
                    );
                })}

                <div style={{ marginTop: 8, fontSize: 11, color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.8 }}>
                    Push notifications · <span style={{ color: 'var(--rose-lite)' }}>Configure in Settings</span>
                </div>
            </div>
            <BottomNav />
        </div>
    );
}
