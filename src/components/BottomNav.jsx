import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const TABS = [
    { path: '/dashboard', icon: '🏠', label: 'Home' },
    { path: '/wellness', icon: '🌿', label: 'Wellness' },
    { path: '/explore', icon: '✨', label: 'Explore' },
    { path: '/journal', icon: '📓', label: 'Journal' },
    { path: '/profile', icon: '👤', label: 'Profile' },
];

export default function BottomNav() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { notifBadge, clearNotifBadge } = useApp();

    return (
        <nav style={{
            position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200,
            background: 'rgba(13,13,20,0.94)', backdropFilter: 'blur(20px)',
            borderTop: '1px solid var(--border)',
            display: 'flex', padding: '8px 0 14px',
        }}>
            {/* Notification bell — absolute top-right of nav bar */}
            <div style={{ position: 'absolute', top: 6, right: 14, zIndex: 10 }}>
                <button onClick={() => { navigate('/notifications'); clearNotifBadge(); }} style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', padding: 4 }} title="Notifications">
                    <span style={{ fontSize: 18 }}>🔔</span>
                    {notifBadge > 0 && (
                        <div style={{ position: 'absolute', top: 0, right: 0, width: 16, height: 16, background: 'var(--rose)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: 'white', fontWeight: 800, border: '2px solid rgba(13,13,20,.94)' }}>
                            {notifBadge > 9 ? '9+' : notifBadge}
                        </div>
                    )}
                </button>
            </div>

            {TABS.map(({ path, icon, label }) => {
                const active = pathname === path;
                return (
                    <button
                        key={label}
                        onClick={() => navigate(path)}
                        style={{
                            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                            padding: '6px 0', background: 'none', border: 'none', cursor: 'pointer',
                            position: 'relative',
                        }}
                    >
                        <span style={{ fontSize: 20 }}>{icon}</span>
                        <span style={{
                            fontSize: 9, fontWeight: active ? 700 : 400,
                            color: active ? 'var(--rose-lite)' : 'var(--text-muted)',
                            fontFamily: 'var(--font-sans)', letterSpacing: '0.02em'
                        }}>{label}</span>
                        {active && (
                            <div style={{
                                position: 'absolute', bottom: -2, left: '50%', transform: 'translateX(-50%)',
                                width: 16, height: 3, borderRadius: 2, background: 'var(--rose)',
                            }} />
                        )}
                    </button>
                );
            })}
        </nav>
    );
}
