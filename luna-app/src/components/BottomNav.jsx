import { useNavigate, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
    { path: '/dashboard', icon: '🏠', label: 'Home' },
    { path: '/wellness', icon: '🌿', label: 'Wellness' },
    { path: '/dashboard#rooms', icon: '🌙', label: 'Rooms' },
    { path: '/profile', icon: '👤', label: 'Profile' },
];

const S = {
    nav: {
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(7,9,15,0.92)', backdropFilter: 'blur(20px)',
        borderTop: '1px solid #1e2738',
        display: 'flex', padding: '8px 0 12px', justifyContent: 'space-around', alignItems: 'center',
    },
    item: (active) => ({
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
        padding: '6px 20px', borderRadius: 12, cursor: 'pointer', border: 'none',
        background: active ? 'rgba(244,114,182,0.12)' : 'transparent',
        transition: 'all 0.2s',
        textDecoration: 'none',
    }),
    icon: { fontSize: 20 },
    label: (active) => ({
        fontSize: 10, fontWeight: active ? 700 : 400, fontFamily: 'DM Sans, sans-serif',
        color: active ? '#f472b6' : '#4a5568', letterSpacing: '0.02em',
    }),
    dot: {
        width: 4, height: 4, borderRadius: '50%', background: '#f472b6',
        margin: '0 auto', marginTop: 2,
    },
};

export default function BottomNav() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    return (
        <nav style={S.nav}>
            {NAV_ITEMS.map(({ path, icon, label }) => {
                const basePath = path.split('#')[0];
                const active = pathname === basePath;
                return (
                    <button key={path} style={S.item(active)} onClick={() => navigate(basePath)}>
                        <span style={S.icon}>{icon}</span>
                        <span style={S.label(active)}>{label}</span>
                        {active && <div style={S.dot} />}
                    </button>
                );
            })}
        </nav>
    );
}
