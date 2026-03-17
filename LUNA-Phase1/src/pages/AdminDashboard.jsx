import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import BottomNav from '../components/BottomNav';

// Mock Admin Data
const STATS = {
    users: 12450,
    premium: 3102,
    posts: 8430,
    rooms: 142
};

const MOCK_USERS = [
    { id: 'u1', name: 'Priya S.', lunaName: 'MoonRose_22', email: 'priya@luna.app', status: 'active', role: 'user', joined: 'Oct 12, 2023' },
    { id: 'u2', name: 'Sarah J.', lunaName: 'CycleSister', email: 'sarah@luna.app', status: 'active', role: 'user', joined: 'Nov 05, 2023' },
    { id: 'u3', name: 'Anya K.', lunaName: 'AnyaBloom', email: 'anya@luna.app', status: 'suspended', role: 'user', joined: 'Dec 18, 2023' },
    { id: 'u4', name: 'Zoya M.', lunaName: 'ZoyaZ', email: 'zoya@luna.app', status: 'active', role: 'premium', joined: 'Jan 02, 2024' },
    { id: 'u5', name: 'Admin User', lunaName: 'LunaAdmin', email: 'admin@luna.app', status: 'active', role: 'admin', joined: 'Jan 01, 2023' },
];

const MOCK_POSTS = [
    { id: 'p1', author: 'MoonRose_22', text: 'Anyone else get insane chocolate cravings right before day 1?', phase: 'luteal', reports: 0 },
    { id: 'p2', author: 'Unknown', text: 'Check out these crazy weight loss pills! Link in bio!', phase: 'all', reports: 12 }, // spam
    { id: 'p3', author: 'ZoyaZ', text: 'Feeling so confident today for my presentation. Ovulatory phase magic is real! 🌟', phase: 'ovulatory', reports: 0 },
];

const MOCK_ROOMS = [
    { id: 'r1', name: 'Luteal Sisters #402', members: 12 },
    { id: 'r2', name: 'PCOS Warriors', members: 45 },
    { id: 'r3', name: 'Buy Crypto Now', members: 2 }, // spam room
];

export default function AdminDashboard() {
    const user = useAuthStore(state => state.user) || {};
    const navigate = useNavigate();
    const [tab, setTab] = useState('overview'); // overview | users | content | rooms

    const [usersList, setUsersList] = useState(MOCK_USERS);
    const [postsList, setPostsList] = useState(MOCK_POSTS);
    const [roomsList, setRoomsList] = useState(MOCK_ROOMS);

    // If user somehow accesses this without being an admin, kick them out
    if (user.role !== 'admin') {
        return (
            <div style={{ padding: 40, textAlign: 'center', color: 'var(--rose)', fontFamily: 'var(--font-sans)' }}>
                <h2>Access Denied</h2>
                <p>You do not have permission to view the Admin Dashboard.</p>
                <button onClick={() => navigate('/dashboard')} className="btn btn-primary" style={{ marginTop: 20 }}>Return Home</button>
            </div>
        );
    }

    const toggleUserStatus = (id) => {
        setUsersList(usersList.map(u => {
            if (u.id === id) {
                return { ...u, status: u.status === 'active' ? 'suspended' : 'active' };
            }
            return u;
        }));
    };

    const deletePost = (id) => setPostsList(postsList.filter(p => p.id !== id));
    const deleteRoom = (id) => setRoomsList(roomsList.filter(r => r.id !== id));

    return (
        <div className="page has-bottom-nav" style={{ fontFamily: 'var(--font-sans)' }}>
            
            {/* Header */}
            <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(13,13,20,.94)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)', padding: '16px 18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                    <span style={{ fontSize: 22 }}>🛡</span>
                    <div>
                        <div className="serif" style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)' }}>Admin Dashboard</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Manage LUNA Community</div>
                    </div>
                </div>
                
                {/* Tabs */}
                <div style={{ display: 'flex', background: 'var(--surface)', borderRadius: 'var(--r-md)', padding: 4, overflowX: 'auto', scrollbarWidth: 'none' }}>
                    {[{ id: 'overview', label: '📊 Overview' }, { id: 'users', label: '👥 Users' }, { id: 'content', label: '🚩 Content' }, { id: 'rooms', label: '🌍 Rooms' }].map(t => (
                        <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, padding: '8px 12px', minWidth: 100, borderRadius: 'var(--r-sm)', border: 'none', cursor: 'pointer', background: tab === t.id ? 'var(--card)' : 'transparent', color: tab === t.id ? 'var(--text)' : 'var(--text-muted)', fontSize: 13, fontWeight: tab === t.id ? 700 : 400, boxShadow: tab === t.id ? '0 1px 4px rgba(0,0,0,.3)' : 'none', transition: 'all .2s', whiteSpace: 'nowrap' }}>
                            {t.label}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ padding: '20px 16px', maxWidth: 600, margin: '0 auto' }}>
                
                {/* ── OVERVIEW ── */}
                {tab === 'overview' && (
                    <div className="anim-fade-up">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
                            <StatCard title="Total Users" val={STATS.users.toLocaleString()} color="#4dd0e1" />
                            <StatCard title="Premium Subs" val={STATS.premium.toLocaleString()} color="#ffd54f" />
                            <StatCard title="Active Posts" val={STATS.posts.toLocaleString()} color="#f06292" />
                            <StatCard title="Live Rooms" val={STATS.rooms.toLocaleString()} color="#ba68c8" />
                        </div>
                        
                        <div className="card" style={{ padding: 20 }}>
                            <h3 style={{ fontSize: 15, marginBottom: 16 }}>System Status</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, fontSize: 13 }}>
                                <div style={{ width: 8, height: 8, borderRadius: 4, background: '#66bb6a' }} /> Supabase Database Connection
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, fontSize: 13 }}>
                                <div style={{ width: 8, height: 8, borderRadius: 4, background: '#66bb6a' }} /> Edge Functions & Cron Jobs
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                                <div style={{ width: 8, height: 8, borderRadius: 4, background: '#66bb6a' }} /> Storage CDN
                            </div>
                        </div>
                    </div>
                )}

                {/* ── USERS ── */}
                {tab === 'users' && (
                    <div className="anim-fade-up">
                        <div style={{ background: 'var(--card)', borderRadius: 'var(--r-lg)', overflow: 'hidden', border: '1px solid var(--border)' }}>
                            {usersList.map((u, i) => (
                                <div key={u.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderBottom: i < usersList.length - 1 ? '1px solid var(--border)' : 'none' }}>
                                    <div>
                                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>
                                            {u.lunaName} <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 400 }}>({u.email})</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: 8, fontSize: 10, textTransform: 'uppercase', fontWeight: 600 }}>
                                            <span style={{ color: u.role === 'admin' ? '#ffd54f' : u.role === 'premium' ? '#ce93d8' : '#4dd0e1' }}>{u.role}</span>
                                            <span style={{ color: u.status === 'active' ? '#66bb6a' : '#ef5350' }}>• {u.status}</span>
                                        </div>
                                    </div>
                                    {u.role !== 'admin' && (
                                        <button onClick={() => toggleUserStatus(u.id)} className="btn btn-ghost" style={{ padding: '6px 12px', fontSize: 11, color: u.status === 'active' ? '#ef5350' : '#66bb6a', border: `1px solid ${u.status === 'active' ? '#ef535044' : '#66bb6a44'}` }}>
                                            {u.status === 'active' ? 'Suspend' : 'Unsuspend'}
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── CONTENT ── */}
                {tab === 'content' && (
                    <div className="anim-fade-up">
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>Posts with a high number of reports are flagged here for review.</div>
                        {postsList.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>No flagged content right now! ✨</div>
                        ) : postsList.map(p => (
                            <div key={p.id} className="card" style={{ padding: 16, marginBottom: 12, borderLeft: p.reports > 5 ? '3px solid #ef5350' : '3px solid transparent' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                    <div style={{ fontSize: 13, fontWeight: 700 }}>{p.author}</div>
                                    {p.reports > 0 && <div style={{ fontSize: 11, color: '#ef5350', fontWeight: 600, background: '#ef535022', padding: '2px 8px', borderRadius: 12 }}>{p.reports} Reports</div>}
                                </div>
                                <div style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.5, marginBottom: 12 }}>"{p.text}"</div>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <button onClick={() => deletePost(p.id)} className="btn btn-ghost" style={{ flex: 1, padding: 8, fontSize: 12, color: '#ef5350', border: '1px solid #ef535044' }}>Delete Post</button>
                                    <button onClick={() => deletePost(p.id) /* In real app, just ignores report */} className="btn btn-ghost" style={{ flex: 1, padding: 8, fontSize: 12 }}>Ignore Flag</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* ── ROOMS ── */}
                {tab === 'rooms' && (
                    <div className="anim-fade-up">
                        <div style={{ background: 'var(--card)', borderRadius: 'var(--r-lg)', overflow: 'hidden', border: '1px solid var(--border)' }}>
                            {roomsList.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>No rooms found.</div>
                            ) : roomsList.map((r, i) => (
                                <div key={r.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderBottom: i < roomsList.length - 1 ? '1px solid var(--border)' : 'none' }}>
                                    <div>
                                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>#{r.name}</div>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{r.members} Members</div>
                                    </div>
                                    <button onClick={() => deleteRoom(r.id)} className="btn btn-ghost" style={{ padding: '6px 12px', fontSize: 11, color: '#ef5350', border: '1px solid #ef535044' }}>
                                        Close Room
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
            
        </div>
    );
}

function StatCard({ title, val, color }) {
    return (
        <div className="card" style={{ padding: 16, background: `linear-gradient(145deg, var(--card), ${color}11)` }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 8 }}>{title}</div>
            <div className="serif" style={{ fontSize: 28, fontWeight: 700, color }}>{val}</div>
        </div>
    );
}
