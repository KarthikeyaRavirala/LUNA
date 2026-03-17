import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useCycleStore } from '../store/cycleStore';
import { PHASES } from '../lib/constants';
import BottomNav from '../components/BottomNav';

// Mock data (In a real app, this would be fetched from Supabase)
const INITIAL_ROOMS = [
    { id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', name: 'Luteal Sisters #402', desc: 'A safe space for managing luteal phase energy and symptoms.', phase: 'luteal', members: 12 },
    { id: '1', name: 'PCOS Warriors', desc: 'Sharing tips, cycle tracking wins, and support for PCOS.', phase: 'all', members: 45 },
    { id: '2', name: 'Morning Runners', desc: 'Accountability group for early morning workouts.', phase: 'follicular', members: 28 },
    { id: '3', name: 'TTC Journey', desc: 'Trying to conceive — sharing ovulation tracking and hope.', phase: 'ovulatory', members: 89 },
];

export default function CommunityRooms() {
    const user = useAuthStore(state => state.user);
    const currentPhase = useCycleStore(state => state.currentPhase);
    const navigate = useNavigate();
    const p = PHASES[currentPhase] || PHASES.luteal;

    const [rooms, setRooms] = useState(INITIAL_ROOMS);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    
    // New Room Form State
    const [newName, setNewName] = useState('');
    const [newDesc, setNewDesc] = useState('');
    const [newPhase, setNewPhase] = useState('all');

    const filteredRooms = rooms.filter(r => 
        r.name.toLowerCase().includes(search.toLowerCase()) || 
        r.desc.toLowerCase().includes(search.toLowerCase())
    );

    const handleCreateRoom = (e) => {
        e.preventDefault();
        if (!newName.trim()) return;
        
        const newRoom = {
            id: Date.now().toString(),
            name: newName,
            desc: newDesc || 'A new space for connection.',
            phase: newPhase,
            members: 1, // You are the first member
        };
        
        setRooms([newRoom, ...rooms]);
        setShowModal(false);
        setNewName(''); setNewDesc(''); setNewPhase('all');
        
        // Optionally redirect immediately into the room:
        // navigate(`/room/${newRoom.id}`);
    };

    return (
        <div className="page has-bottom-nav">
            {/* Header */}
            <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(13,13,20,.94)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)', padding: '16px 18px', display: 'flex', alignItems: 'center', justifyItems: 'space-between' }}>
                <div style={{ flex: 1 }}>
                    <div className="serif" style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>Community Rooms</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Find your niche, share your journey.</div>
                </div>
                {user.role === 'admin' && (
                    <div style={{ padding: '4px 8px', background: 'rgba(255,213,79,.1)', border: '1px solid rgba(255,213,79,.3)', borderRadius: 'var(--r-md)', fontSize: 10, color: '#ffd54f', fontWeight: 700, textTransform: 'uppercase' }}>Admin</div>
                )}
            </div>

            <div style={{ padding: 16 }}>
                {/* Search & Action Bar */}
                <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
                    <div style={{ flex: 1, position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 14, top: 12, fontSize: 14, opacity: 0.5 }}>🔍</span>
                        <input 
                            value={search} onChange={e => setSearch(e.target.value)}
                            placeholder="Find a room..." 
                            style={{ width: '100%', padding: '12px 14px 12px 38px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-full)', color: 'var(--text)', fontSize: 14, outline: 'none' }} 
                        />
                    </div>
                    <button 
                        onClick={() => setShowModal(true)}
                        className="btn btn-primary" 
                        style={{ padding: '0 20px', borderRadius: 'var(--r-full)', whiteSpace: 'nowrap' }}
                    >
                        + Create
                    </button>
                </div>

                {/* Rooms Grid */}
                {filteredRooms.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                        <div style={{ fontSize: 32, marginBottom: 12 }}>🌱</div>
                        <div>No rooms found. Be the first to create one!</div>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: 12 }}>
                        {filteredRooms.map(room => (
                            <div 
                                key={room.id} 
                                onClick={() => navigate(`/room/${room.id}`)}
                                className="card anim-fade-up" 
                                style={{ padding: '18px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 8, transition: 'transform 0.2s, box-shadow 0.2s' }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>#{room.name}</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'var(--surface)', padding: '4px 8px', borderRadius: 'var(--r-full)', fontSize: 11, color: 'var(--text-muted)' }}>
                                        👥 {room.members}
                                    </div>
                                </div>
                                <div style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.5 }}>
                                    {room.desc}
                                </div>
                                {room.phase !== 'all' && PHASES[room.phase] && (
                                    <div style={{ display: 'inline-flex', padding: '4px 10px', background: `${PHASES[room.phase].color}15`, borderRadius: 'var(--r-md)', fontSize: 11, color: PHASES[room.phase].color, fontWeight: 600, marginTop: 4, width: 'fit-content' }}>
                                        {PHASES[room.phase].emoji} {room.phase.charAt(0).toUpperCase() + room.phase.slice(1)} Focus
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Create Room Modal */}
            {showModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.6)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                    <div className="anim-fade-up" style={{ width: '100%', maxWidth: 500, background: 'var(--bg)', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, borderTop: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                            <div className="serif" style={{ fontSize: 20, fontWeight: 700 }}>Create a Room</div>
                            <button onClick={() => setShowModal(false)} style={{ background: 'var(--surface)', border: 'none', width: 32, height: 32, borderRadius: 16, color: 'var(--text)', cursor: 'pointer' }}>✕</button>
                        </div>
                        
                        <form onSubmit={handleCreateRoom} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <div>
                                <label style={{ display: 'block', fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 6 }}>Room Name</label>
                                <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g. Yoga Flow Seekers" style={inputStyle} required />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 6 }}>Description (Optional)</label>
                                <textarea value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="What is this space about?" rows={3} style={{ ...inputStyle, resize: 'none' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 6 }}>Phase Focus</label>
                                <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4 }}>
                                    <PhaseBtn id="all" label="Any" emoji="🌎" current={newPhase} set={setNewPhase} />
                                    <PhaseBtn id="menstrual" label="Menstrual" emoji="🌑" current={newPhase} set={setNewPhase} color="var(--menstrual)" />
                                    <PhaseBtn id="follicular" label="Follicular" emoji="🌱" current={newPhase} set={setNewPhase} color="var(--follicular)" />
                                    <PhaseBtn id="ovulatory" label="Ovulatory" emoji="🌕" current={newPhase} set={setNewPhase} color="var(--ovulatory)" />
                                    <PhaseBtn id="luteal" label="Luteal" emoji="🌸" current={newPhase} set={setNewPhase} color="var(--luteal)" />
                                </div>
                            </div>
                            
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: 14, marginTop: 8 }}>
                                Create Room ✨
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <BottomNav />
        </div>
    );
}

function PhaseBtn({ id, label, emoji, current, set, color = 'var(--text)' }) {
    const isSel = current === id;
    return (
        <button 
            type="button"
            onClick={() => set(id)}
            style={{ 
                padding: '8px 14px', 
                background: isSel ? `${color}22` : 'var(--surface)', 
                border: `1px solid ${isSel ? color : 'var(--border)'}`, 
                borderRadius: 'var(--r-full)', 
                color: isSel ? color : 'var(--text-muted)', 
                fontSize: 12, 
                fontWeight: isSel ? 700 : 400,
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                transition: 'all 0.2s'
            }}
        >
            {emoji} {label}
        </button>
    );
}

const inputStyle = {
    width: '100%', padding: '12px 14px', background: 'var(--surface)',
    border: '1px solid var(--border)', borderRadius: 'var(--r-md)',
    color: 'var(--text)', fontSize: 14, fontFamily: 'var(--font-sans)',
    outline: 'none', boxSizing: 'border-box'
};
