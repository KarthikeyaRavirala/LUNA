import { useState } from 'react';
import BottomNav from '../components/BottomNav';

const ACTIVITIES = [
    { id: 'gaming', icon: '🎮', name: 'Gaming Night', desc: 'Matched with 3 guys for an online gaming session', members: ['Dev_K', 'Arjun_9', 'RandomCoder'] },
    { id: 'movies', icon: '🎬', name: 'Movie Night', desc: 'Chill Netflix recommendation group — share what you\'re watching', members: ['Rohan_V', 'Karthik_M', 'Sam_B'] },
    { id: 'sports', icon: '⚽', name: 'Sports Watch', desc: 'Live match discussion group — IPL, Football, F1', members: ['AJ_Cricket', 'Suresh_IPL', 'Mahi_Fan'] },
    { id: 'cooking', icon: '🍳', name: 'Guys Who Cook', desc: 'Swap easy recipes and cook something special for her', members: ['Chef_Ram', 'KitchenK', 'TadkaTime'] },
    { id: 'music', icon: '🎵', name: 'Music Night', desc: 'Share playlists, discover new artists together', members: ['BeatsByV', 'Melody_M', 'LoFiLover'] },
];

const CARE_MESSAGES = [
    { emoji: '💙', msg: 'I see you. I\'m here. 💙' },
    { emoji: '🌸', msg: 'No agenda — just letting you know I love you.' },
    { emoji: '🍫', msg: 'Chocolate and cuddles on standby. Just say the word.' },
    { emoji: '🤗', msg: 'You\'re doing amazing. I\'m proud of you every day.' },
    { emoji: '☕', msg: 'Making you something warm. Be right there. ☕' },
];

const TIPS = [
    { icon: '👂', title: 'Listen, Don\'t Fix', tip: 'She doesn\'t always need solutions. Sometimes just saying "that sounds hard" is exactly right.' },
    { icon: '🧹', title: 'The Invisible Load', tip: 'Taking over one chore without being asked (dishes, laundry) communicates more love than words can.' },
    { icon: '🍕', title: 'Order Her Favourite Food', tip: 'Surprise delivery of her comfort food > expensive dinner reservation. Trust this.' },
    { icon: '📵', title: 'Don\'t Take It Personally', tip: 'Irritability during this phase is hormonal, not personal. Her brain chemistry is literally different right now.' },
    { icon: '🌡️', title: 'Heat is Magic', tip: 'A heating pad or hot water bottle on her lower back or abdomen can genuinely reduce pain significantly.' },
];

export default function HusbandHangout() {
    const [joined, setJoined] = useState(null);
    const [sentMsg, setSentMsg] = useState(null);
    const [showTips, setShowTips] = useState(false);
    const [careInput, setCareInput] = useState('');
    const [customSent, setCustomSent] = useState(false);

    return (
        <div className="page has-bottom-nav" style={{ fontFamily: 'var(--font-sans)' }}>
            {/* Header */}
            <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(13,13,20,.94)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)', padding: '13px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 20 }}>🎮</span>
                    <span className="serif" style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>Husband Hangout</span>
                </div>
                <div style={{ padding: '3px 10px', background: 'rgba(66,133,244,.15)', border: '1px solid rgba(66,133,244,.3)', borderRadius: 'var(--r-full)', fontSize: 11, color: '#90caf9', fontWeight: 700 }}>Partners</div>
            </div>

            <div style={{ maxWidth: 600, margin: '0 auto', padding: '16px' }}>
                {/* Status Alert */}
                <div style={{ background: 'rgba(240,98,146,.12)', border: '1px solid rgba(240,98,146,.35)', borderRadius: 'var(--r-xl)', padding: 18, marginBottom: 16 }} className="anim-fade-up">
                    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12 }}>
                        <span style={{ fontSize: 32 }}>🌸</span>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>She is in her Luna Room tonight</div>
                            <div style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.6 }}>
                                Your partner is in her <span style={{ color: 'var(--luteal)', fontWeight: 700 }}>Luteal phase</span> — a sensitive, introspective time. She and her cohort have their room open. You have been matched with a group.
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, padding: '10px 14px', background: 'rgba(255,255,255,.04)', borderRadius: 'var(--r-md)', fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                            💡 <strong style={{ color: 'var(--text)' }}>Tonight:</strong> Great time to give her space and handle dinner or the dishes.
                        </div>
                    </div>
                </div>

                {/* Send Care Message */}
                <div className="card" style={{ padding: 18, marginBottom: 14 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>💌 Send her a care message</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
                        {CARE_MESSAGES.map((c, i) => (
                            <button key={i} onClick={() => { setSentMsg(c.msg); setTimeout(() => setSentMsg(null), 3000); }} style={{ padding: '10px 12px', background: sentMsg === c.msg ? 'rgba(240,98,146,.18)' : 'var(--surface)', border: `1px solid ${sentMsg === c.msg ? 'var(--rose)' : 'var(--border)'}`, borderRadius: 'var(--r-md)', cursor: 'pointer', display: 'flex', gap: 8, alignItems: 'center', textAlign: 'left', fontFamily: 'var(--font-sans)', transition: 'all .2s' }}>
                                <span style={{ fontSize: 16 }}>{c.emoji}</span>
                                <span style={{ fontSize: 11, color: 'var(--text-dim)', lineHeight: 1.4 }}>{c.msg}</span>
                            </button>
                        ))}
                    </div>
                    {sentMsg && <div className="anim-fade-up" style={{ padding: '10px 14px', background: 'rgba(105,240,174,.1)', border: '1px solid rgba(105,240,174,.28)', borderRadius: 'var(--r-md)', fontSize: 13, color: 'var(--mint)', textAlign: 'center', marginBottom: 12 }}>✓ Sent quietly to her LUNA — she will see it when she is ready 🌸</div>}
                    <div style={{ display: 'flex', gap: 8 }}>
                        <input value={careInput} onChange={e => setCareInput(e.target.value)} placeholder="Write your own..." style={{ flex: 1, padding: '9px 13px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-full)', color: 'var(--text)', fontSize: 13, fontFamily: 'var(--font-sans)', outline: 'none' }} />
                        <button onClick={() => { if (!careInput.trim()) return; setCustomSent(true); setCareInput(''); setTimeout(() => setCustomSent(false), 3000); }} style={{ padding: '9px 18px', background: 'var(--rose)', border: 'none', borderRadius: 'var(--r-full)', color: 'white', fontSize: 12, cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 700 }}>Send 💌</button>
                    </div>
                    {customSent && <div style={{ marginTop: 8, fontSize: 12, color: 'var(--mint)', textAlign: 'center' }}>✓ Your message is on its way 💙</div>}
                </div>

                {/* Partner Tips */}
                <div className="card" style={{ padding: 18, marginBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>🧠 How to support her tonight</div>
                        <button onClick={() => setShowTips(!showTips)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 12, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>{showTips ? 'Hide ↑' : 'Show ↓'}</button>
                    </div>
                    {showTips && (
                        <div className="anim-fade-up" style={{ marginTop: 14 }}>
                            {TIPS.map((t, i) => (
                                <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: i < TIPS.length - 1 ? '1px solid var(--border)' : 'none' }}>
                                    <span style={{ fontSize: 20, flexShrink: 0 }}>{t.icon}</span>
                                    <div>
                                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 3 }}>{t.title}</div>
                                        <div style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.6 }}>{t.tip}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Activity Groups */}
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>🎮 Your hangout groups tonight</div>
                {ACTIVITIES.map(act => (
                    <div key={act.id} className="card" style={{ padding: '14px 16px', marginBottom: 10 }}>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                            <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(66,133,244,.15)', border: '1px solid rgba(66,133,244,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{act.icon}</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 3 }}>{act.name}</div>
                                <div style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 8 }}>{act.desc}</div>
                                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
                                    {act.members.map(m => (
                                        <div key={m} style={{ fontSize: 10, color: 'var(--blue)', background: 'rgba(144,202,249,.1)', padding: '2px 8px', borderRadius: 'var(--r-full)', border: '1px solid rgba(144,202,249,.2)' }}>{m}</div>
                                    ))}
                                </div>
                                <button onClick={() => setJoined(joined === act.id ? null : act.id)} className="btn" style={{ padding: '6px 16px', fontSize: 12, background: joined === act.id ? '#4285F4' : 'transparent', border: `1px solid ${joined === act.id ? '#4285F4' : 'var(--border)'}`, color: joined === act.id ? 'white' : 'var(--text-muted)', borderRadius: 'var(--r-full)' }}>
                                    {joined === act.id ? '✓ Joined!' : 'Join Group'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <BottomNav />
        </div>
    );
}
