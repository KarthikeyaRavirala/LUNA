import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useCycleStore } from '../store/cycleStore';
import { PHASES } from '../lib/constants';

// Mock DB of rooms and posts
const ROOMS_DB = {
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11': { name: 'Luteal Sisters #402', desc: 'A safe space for managing luteal phase energy and symptoms.', phase: 'luteal', members: 12 },
    '1': { name: 'PCOS Warriors', desc: 'Sharing tips, cycle tracking wins, and support for PCOS.', phase: 'all', members: 45 },
    '2': { name: 'Morning Runners', desc: 'Accountability group for early morning workouts.', phase: 'follicular', members: 28 },
    '3': { name: 'TTC Journey', desc: 'Trying to conceive — sharing ovulation tracking and hope.', phase: 'ovulatory', members: 89 },
};

const INITIAL_MESSAGES = [
    { id: 1, user: 'MoonRose_22', text: 'Anyone else feeling super exhausted today?', time: '10:42 AM', isSelf: false, phase: 'luteal' },
    { id: 2, user: 'CycleSister', text: 'Yes! Im on day 24 and literally hit a wall at 3pm.', time: '11:05 AM', isSelf: false, phase: 'luteal' },
];

export default function RoomView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const user = useAuthStore(state => state.user);
    const currentPhase = useCycleStore(state => state.currentPhase);
    
    // Find room info (in real app, fetch by ID)
    const room = ROOMS_DB[id] || { name: 'Community Room', desc: 'A private gathering space.', phase: 'all', members: 1 };
    const p = room.phase !== 'all' ? PHASES[room.phase] : null;
    
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [input, setInput] = useState('');
    const bottomRef = useRef(null);

    // Auto scroll to bottom
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        
        const newMsg = {
            id: Date.now(),
            user: user.lunaName || 'User',
            text: input,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isSelf: true,
            phase: currentPhase
        };
        
        setMessages([...messages, newMsg]);
        setInput('');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--bg)', fontFamily: 'var(--font-sans)' }}>
            
            {/* Header */}
            <div style={{ padding: '16px 18px', background: 'rgba(13,13,20,.94)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12, position: 'sticky', top: 0, zIndex: 10 }}>
                <button onClick={() => navigate(-1)} style={{ background: 'var(--surface)', border: 'none', width: 36, height: 36, borderRadius: 18, color: 'var(--text)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    ←
                </button>
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div className="serif" style={{ fontSize: 18, fontWeight: 700 }}>#{room.name}</div>
                        {p && <div style={{ fontSize: 14 }}>{p.emoji}</div>}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{room.members} members</div>
                </div>
                <button style={{ background: 'transparent', border: '1px solid var(--border)', padding: '6px 12px', borderRadius: 'var(--r-full)', fontSize: 12, color: 'var(--text-muted)' }}>
                    ⋮
                </button>
            </div>

            {/* Messages Area */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ textAlign: 'center', margin: '20px 0', padding: '20px', background: 'var(--surface)', borderRadius: 'var(--r-lg)', border: '1px dashed var(--border)' }}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>{p ? p.emoji : '💬'}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>Welcome to {room.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{room.desc}</div>
                </div>
                
                {messages.map(msg => {
                    const msgPhaseColor = PHASES[msg.phase]?.color || 'var(--surface)';
                    return (
                        <div key={msg.id} className="anim-fade-up" style={{ 
                            alignSelf: msg.isSelf ? 'flex-end' : 'flex-start',
                            maxWidth: '85%',
                            display: 'flex', flexDirection: 'column', gap: 4,
                            alignItems: msg.isSelf ? 'flex-end' : 'flex-start' 
                        }}>
                            {!msg.isSelf && (
                                <div style={{ fontSize: 11, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4, marginLeft: 12 }}>
                                    <div style={{ width: 6, height: 6, borderRadius: 3, background: msgPhaseColor }}></div>
                                    {msg.user}
                                </div>
                            )}
                            <div style={{ 
                                padding: '10px 14px', 
                                background: msg.isSelf ? 'var(--rose)' : 'var(--card)',
                                color: msg.isSelf ? '#fff' : 'var(--text)',
                                borderRadius: msg.isSelf ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                                fontSize: 14, lineHeight: 1.4,
                                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                            }}>
                                {msg.text}
                            </div>
                            <div style={{ fontSize: 10, color: 'var(--text-dim)', margin: msg.isSelf ? '0 12px 0 0' : '0 0 0 12px' }}>{msg.time}</div>
                        </div>
                    );
                })}
                <div ref={bottomRef} />
            </div>

            {/* Input Area */}
            <div style={{ padding: '12px 16px', background: 'var(--bg)', borderTop: '1px solid var(--border)', paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}>
                <form onSubmit={handleSend} style={{ display: 'flex', gap: 10 }}>
                    <input 
                        value={input} onChange={e => setInput(e.target.value)}
                        placeholder="Message the room..."
                        style={{ flex: 1, padding: '12px 16px', borderRadius: 'var(--r-full)', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)', fontSize: 14, outline: 'none' }}
                    />
                    <button 
                        type="submit"
                        disabled={!input.trim()}
                        style={{ width: 44, height: 44, borderRadius: 22, background: input.trim() ? 'var(--rose)' : 'var(--surface)', border: 'none', color: input.trim() ? '#fff' : 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s', cursor: input.trim() ? 'pointer' : 'default' }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    </button>
                </form>
            </div>
        </div>
    );
}
