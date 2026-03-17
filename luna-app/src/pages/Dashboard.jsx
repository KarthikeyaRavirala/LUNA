import { useState } from 'react';
import BottomNav from '../components/BottomNav';

const CURRENT_PHASE = {
    name: 'Luteal', emoji: '🌸', color: '#f06292', glow: '#f0629233',
    day: 19, energy: 45, mood: 'Sensitive & Reflective',
    affirmation: 'Your sensitivity is not weakness — it is depth. The world needs women who feel things this fully.',
    confidence: 'Your empathy is at its highest this week. You understand people in ways others simply cannot.',
};

const MOCK_POSTS = [
    {
        id: 1, luna: 'MoonRose_22', emoji: '🌸', phase: 'Luteal', phaseColor: '#f06292',
        time: '2m ago', content: 'Dark chocolate + chamomile tea combo has been SAVING me this week 🍫🍵 Anyone else?',
        tags: ['#cravings', '#selfcare'], likes: 24, comments: 8, saved: false, liked: false,
    },
    {
        id: 2, luna: 'StarlightK', emoji: '⭐', phase: 'Follicular', phaseColor: '#66bb6a',
        time: '15m ago', content: 'Just finished a 35-min HIIT session and I feel UNSTOPPABLE. Follicular phase energy is insane fr 🏃‍♀️⚡',
        tags: ['#exercise', '#follicular', '#peak'], likes: 47, comments: 12, saved: true, liked: true,
    },
    {
        id: 3, luna: 'CrimsonSkye', emoji: '🎭', phase: 'Luteal', phaseColor: '#f06292',
        time: '1h ago', content: 'PSA: Journalling during luteal has reduced my PMS anxiety by SO much. 15 minutes before bed. Try it. 📓',
        tags: ['#journal', '#lunajtip', '#mentalhealth'], likes: 83, comments: 31, saved: false, liked: false,
    },
    {
        id: 4, luna: 'EveningBloom', emoji: '💜', phase: 'Ovulatory', phaseColor: '#ffa726',
        time: '3h ago', content: 'Ovulation week and I literally glowed through that presentation 😂 My manager noticed something was different. Peak performance is REAL.',
        tags: ['#ovulatory', '#work', '#confidence'], likes: 112, comments: 19, saved: false, liked: false,
    },
    {
        id: 5, luna: 'RoseWater_7', emoji: '🌹', phase: 'Menstrual', phaseColor: '#ef5350',
        time: '5h ago', content: 'Day 2 of period. I said no to a meeting and yes to yin yoga. Listening to my body for once and it feels revolutionary 🧘‍♀️',
        tags: ['#rest', '#menstrual', '#boundaries'], likes: 156, comments: 42, saved: true, liked: false,
    },
];

function PhaseWheel({ phase }) {
    const phases = [
        { label: 'M', color: '#ef5350', name: 'Menstrual', active: false },
        { label: 'F', color: '#66bb6a', name: 'Follicular', active: false },
        { label: 'O', color: '#ffa726', name: 'Ovulatory', active: false },
        { label: 'L', color: '#f06292', name: 'Luteal', active: true },
    ];
    return (
        <div style={{ display: 'flex', gap: 6 }}>
            {phases.map(p => (
                <div key={p.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: p.active ? p.color : `${p.color}33`, border: `2px solid ${p.active ? p.color : 'transparent'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: p.active ? 'white' : p.color }}>{p.label}</div>
                    {p.active && <div style={{ width: 4, height: 4, borderRadius: '50%', background: p.color }} />}
                </div>
            ))}
        </div>
    );
}

function PostCard({ post }) {
    const [liked, setLiked] = useState(post.liked);
    const [saved, setSaved] = useState(post.saved);
    const [likes, setLikes] = useState(post.likes);

    return (
        <div className="card" style={{ padding: '18px 20px', marginBottom: 12 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: `${post.phaseColor}22`, border: `2px solid ${post.phaseColor}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{post.emoji}</div>
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{post.luna}</span>
                        <span style={{ fontSize: 10, fontWeight: 700, color: post.phaseColor, background: `${post.phaseColor}18`, padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>{post.phase}</span>
                        <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 'auto' }}>{post.time}</span>
                    </div>
                </div>
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 10 }}>{post.content}</p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                {post.tags.map(t => <span key={t} style={{ fontSize: 11, color: 'var(--rose)', cursor: 'pointer' }}>{t}</span>)}
            </div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', paddingTop: 10, borderTop: '1px solid var(--border)' }}>
                <button onClick={() => { setLiked(!liked); setLikes(l => liked ? l - 1 : l + 1); }} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: liked ? '#f472b6' : 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif', transition: 'color 0.2s' }}>
                    {liked ? '💗' : '🤍'} {likes}
                </button>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>💬 {post.comments}</button>
                <button onClick={() => setSaved(!saved)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: saved ? '#fbbf24' : 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif', marginLeft: 'auto', transition: 'color 0.2s' }}>
                    {saved ? '🔖' : '🏷️'} {saved ? 'Saved' : 'Save'}
                </button>
            </div>
        </div>
    );
}

export default function Dashboard() {
    const p = CURRENT_PHASE;
    const [showAffirm, setShowAffirm] = useState(false);
    const [filter, setFilter] = useState('all');

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: "'DM Sans', sans-serif" }} className="has-bottom-nav">
            {/* Top bar */}
            <div style={{ background: 'rgba(7,9,15,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 20 }}>🌸</span>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: 'var(--text)' }}>LUNA</span>
                </div>
                <PhaseWheel />
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div style={{ position: 'relative' }}>
                        <span style={{ fontSize: 20, cursor: 'pointer' }}>🔔</span>
                        <div style={{ position: 'absolute', top: 0, right: 0, width: 8, height: 8, borderRadius: '50%', background: 'var(--rose)' }} />
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: 680, margin: '0 auto', padding: '20px 16px' }}>
                {/* Phase Card */}
                <div style={{ background: `linear-gradient(135deg, ${p.color}22, ${p.color}08)`, border: `1px solid ${p.color}44`, borderRadius: 'var(--radius-xl)', padding: '20px', marginBottom: 16, animation: 'fadeUp 0.35s ease' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                        <div style={{ width: 56, height: 56, borderRadius: 16, background: `${p.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, border: `1px solid ${p.color}44` }}>{p.emoji}</div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>{p.name} Phase</div>
                            <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>Day {p.day} · {p.mood}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: 24, fontWeight: 700, color: p.color, fontFamily: "'Playfair Display', serif" }}>Day {p.day}</div>
                            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>of cycle</div>
                        </div>
                    </div>
                    {/* Energy bar */}
                    <div style={{ marginBottom: 14 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Today's Energy</span>
                            <span style={{ fontSize: 11, color: p.color, fontWeight: 700 }}>{p.energy}%</span>
                        </div>
                        <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3 }}>
                            <div style={{ width: `${p.energy}%`, height: '100%', background: `linear-gradient(90deg, ${p.color}88, ${p.color})`, borderRadius: 3 }} />
                        </div>
                    </div>
                    {/* Affirmation */}
                    <div onClick={() => setShowAffirm(!showAffirm)} style={{ background: `${p.color}12`, borderRadius: 'var(--radius-md)', padding: '10px 14px', cursor: 'pointer', transition: 'background 0.2s' }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: p.color, marginBottom: showAffirm ? 8 : 0 }}>💪 {p.confidence}</div>
                        {showAffirm && (
                            <div style={{ fontSize: 12, color: 'var(--text-dim)', fontStyle: 'italic', lineHeight: 1.7, fontFamily: "'Playfair Display', serif", borderTop: `1px solid ${p.color}33`, paddingTop: 8 }}>
                                ✨ "{p.affirmation}"
                            </div>
                        )}
                        <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>{showAffirm ? 'Tap to collapse' : "Tap for today's affirmation"}</div>
                    </div>
                </div>

                {/* Luna Rooms */}
                <div className="card" style={{ padding: '16px 20px', marginBottom: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 8 }}>
                            🌙 Luna Rooms
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#34d399', animation: 'pulse 2s infinite' }} />
                        </div>
                        <span style={{ fontSize: 11, color: '#34d399', fontWeight: 600 }}>1 LIVE</span>
                    </div>
                    <div style={{ background: `${p.color}10`, border: `1px solid ${p.color}33`, borderRadius: 'var(--radius-md)', padding: '14px', marginBottom: 8 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>🌸 Luteal Cohort Room</div>
                            <div style={{ fontSize: 10, color: '#34d399', fontWeight: 700 }}>LIVE · 4 women</div>
                        </div>
                        {[
                            { name: 'MoonRose_22', msg: 'Dark chocolate is literally medicinal rn 🍫' },
                            { name: 'EveningBloom', msg: 'Journalling helped so much, try it!' },
                        ].map((m, i) => (
                            <div key={i} style={{ display: 'flex', gap: 8, padding: '6px 0', borderTop: '1px solid var(--border)' }}>
                                <div style={{ width: 22, height: 22, borderRadius: '50%', background: `${p.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0 }}>🌸</div>
                                <div>
                                    <span style={{ fontSize: 10, color: p.color, fontWeight: 600 }}>{m.name}: </span>
                                    <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>{m.msg}</span>
                                </div>
                            </div>
                        ))}
                        <button className="btn btn-primary" style={{ width: '100%', marginTop: 12, padding: '9px', fontSize: 13 }}>Join Room →</button>
                    </div>
                </div>

                {/* Feed Filter */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 14, overflowX: 'auto', scrollbarWidth: 'none' }}>
                    {['All', 'My Cohort', 'Following', 'Trending'].map(f => (
                        <button key={f} onClick={() => setFilter(f.toLowerCase())} style={{ padding: '7px 16px', borderRadius: 'var(--radius-full)', border: 'none', cursor: 'pointer', background: filter === f.toLowerCase() ? 'var(--rose-dark)' : 'var(--card)', color: filter === f.toLowerCase() ? 'white' : 'var(--text-muted)', fontSize: 12, fontWeight: filter === f.toLowerCase() ? 700 : 400, fontFamily: 'DM Sans, sans-serif', transition: 'all 0.2s', flexShrink: 0 }}>{f}</button>
                    ))}
                </div>

                {/* Feed */}
                {MOCK_POSTS.map(post => <PostCard key={post.id} post={post} />)}
            </div>

            <BottomNav />
        </div>
    );
}
