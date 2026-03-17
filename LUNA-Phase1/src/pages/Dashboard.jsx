import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useCycleStore } from '../store/cycleStore';
import { PHASES } from '../lib/constants';
import BottomNav from '../components/BottomNav';
import { MOCK_POSTS, MOCK_MESSAGES, MOCK_COHORT } from '../data/mockData';

function EnergyBar({ value, color }) {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>Today&#39;s Energy</span>
                <span style={{ fontSize: 10, color, fontWeight: 700 }}>{value}%</span>
            </div>
            <div style={{ height: 6, background: 'rgba(255,255,255,.08)', borderRadius: 3 }}>
                <div style={{ width: `${value}%`, height: '100%', background: `linear-gradient(90deg, ${color}88, ${color})`, borderRadius: 3, transition: 'width .6s ease' }} />
            </div>
        </div>
    );
}

function PostCard({ post }) {
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const [likes, setLikes] = useState(post.likes);

    return (
        <div className="card" style={{ padding: '16px 18px', marginBottom: 10 }}>
            <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: `${post.phaseColor}22`, border: `2px solid ${post.phaseColor}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{post.emoji}</div>
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 2 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{post.luna}</span>
                        <span style={{ fontSize: 10, fontWeight: 700, color: post.phaseColor, background: `${post.phaseColor}18`, padding: '2px 8px', borderRadius: 'var(--r-full)', textTransform: 'capitalize' }}>{post.phase}</span>
                        <span style={{ fontSize: 10, color: 'var(--text-muted)', marginLeft: 'auto' }}>{post.time} ago</span>
                    </div>
                </div>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 8 }}>{post.content}</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
                {post.tags.map(t => <span key={t} style={{ fontSize: 11, color: 'var(--rose-lite)', cursor: 'pointer' }}>{t}</span>)}
            </div>
            <div style={{ display: 'flex', gap: 16, paddingTop: 10, borderTop: '1px solid var(--border)', alignItems: 'center' }}>
                <button onClick={() => { setLiked(!liked); setLikes(l => liked ? l - 1 : l + 1); }} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: liked ? '#f472b6' : 'var(--text-muted)', fontFamily: 'var(--font-sans)', transition: 'color .2s' }}>
                    {liked ? '💗' : '🤍'} {likes}
                </button>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>💬 {post.comments}</button>
                <button onClick={() => setSaved(!saved)} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: saved ? '#ffd54f' : 'var(--text-muted)', fontFamily: 'var(--font-sans)', transition: 'color .2s' }}>
                    {saved ? '🔖 Saved' : '🏷️ Save'}
                </button>
            </div>
        </div>
    );
}

export default function Dashboard() {
    const user = useAuthStore(state => state.user);
    const claimDailyLogin = useAuthStore(state => state.claimDailyLogin);
    const currentPhase = useCycleStore(state => state.currentPhase);
    const currentDay = useCycleStore(state => state.currentDay);

    const navigate = useNavigate();
    const p = PHASES[currentPhase] || PHASES.luteal;
    const [showAffirm, setShowAffirm] = useState(false);
    const [filter, setFilter] = useState('all');
    const [msgInput, setMsgInput] = useState('');
    const [msgs, setMsgs] = useState(MOCK_MESSAGES);

    const isClaimed = user.lastLoginDate === new Date().toDateString();

    const sendMsg = () => {
        if (!msgInput.trim()) return;
        setMsgs(m => [...m, { id: Date.now(), luna: user.lunaName || 'You', emoji: '🌸', msg: msgInput, time: 'now', mine: true }]);
        setMsgInput('');
    };

    const WELLNESS_SNIPPETS = {
        menstrual: { affirmation: 'Rest is not laziness. Your body is doing profound work right now.', confidence: 'This phase is your most intuitive. Trust your gut feelings now.' },
        follicular: { affirmation: 'You are entering your power season. Every idea has the energy to become real.', confidence: 'Your communication is at its clearest and most charming.' },
        ovulatory: { affirmation: 'You are at your most magnetic. Walk into every room knowing you belong.', confidence: 'Others naturally listen to you and trust your judgment right now.' },
        luteal: { affirmation: 'Your sensitivity is not weakness — it is depth. The world needs women who feel this fully.', confidence: 'Your empathy is at its highest. You understand people in ways others cannot.' },
    };
    const w = WELLNESS_SNIPPETS[currentPhase] || WELLNESS_SNIPPETS.luteal;

    return (
        <div className="page has-bottom-nav" style={{ fontFamily: 'var(--font-sans)' }}>
            {/* Top bar */}
            <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(13,13,20,.94)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)', padding: '13px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <img src="/luna-logo.png" alt="Luna Logo" style={{ width: 24, height: 24, borderRadius: '20%' }} />
                    <span className="serif" style={{ fontSize: 19, fontWeight: 700, color: 'var(--text)' }}>LUNA</span>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <div style={{ padding: '3px 10px', background: `${p.color}22`, border: `1px solid ${p.color}44`, borderRadius: 'var(--r-full)', fontSize: 11, color: p.color, fontWeight: 700 }}>{p.emoji} {p.label}</div>
                    <div style={{ position: 'relative', cursor: 'pointer' }}>
                        <span style={{ fontSize: 18 }}>🔔</span>
                        <div style={{ position: 'absolute', top: 1, right: 1, width: 7, height: 7, borderRadius: '50%', background: 'var(--rose)' }} />
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: 720, margin: '0 auto', padding: '18px 16px' }}>
                {/* Gamification Widget */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-full)', padding: '6px 14px', marginBottom: 14 }} className="anim-fade-up">
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>
                            <span style={{ fontSize: 16 }}>🔥</span> {user.currentStreak || 0} Day{user.currentStreak !== 1 ? 's' : ''}
                        </div>
                        <div style={{ width: 1, height: 16, background: 'var(--border)' }} />
                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>
                            <span style={{ fontSize: 14 }}>✨</span> {user.moonDust || 0} Dust
                        </div>
                    </div>
                    {!isClaimed ? (
                        <button onClick={claimDailyLogin} className="btn btn-primary" style={{ padding: '6px 12px', fontSize: 11, borderRadius: 'var(--r-full)', animation: 'pulse 2s infinite', whiteSpace: 'nowrap' }}>Claim +10</button>
                    ) : (
                        <div style={{ padding: '6px 12px', fontSize: 11, color: 'var(--mint)', fontWeight: 700, background: 'rgba(105,240,174,.1)', borderRadius: 'var(--r-full)' }}>✓ Claimed</div>
                    )}
                </div>

                {/* AI Insights Banner */}
                <div onClick={() => navigate('/insights')} className="anim-fade-up" style={{ background: `linear-gradient(135deg, ${p.color}22, ${p.color}11)`, border: `1px solid ${p.color}44`, borderRadius: 'var(--r-lg)', padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, cursor: 'pointer' }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <div style={{ fontSize: 24 }}>✨</div>
                        <div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>Luna AI Insights</div>
                            <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>View your personalized {p.label} predictions</div>
                        </div>
                    </div>
                    <div style={{ color: p.color, fontSize: 12, fontWeight: 700 }}>View →</div>
                </div>

                {/* Phase card */}
                <div style={{ background: p.bg, border: `1px solid ${p.color}44`, borderRadius: 'var(--r-xl)', padding: 20, marginBottom: 14 }} className="anim-fade-up">
                    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 14 }}>
                        <div style={{ width: 56, height: 56, borderRadius: 16, background: `${p.color}22`, border: `1px solid ${p.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>{p.emoji}</div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>{p.label} Phase</div>
                            <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>Day {currentDay} · {WELLNESS_SNIPPETS[currentPhase]?.confidence?.split('.')[0] || 'Keep going'}</div>
                        </div>
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                            <div className="serif" style={{ fontSize: 28, color: p.color, fontWeight: 700, lineHeight: 1 }}>Day {currentDay}</div>
                            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>of cycle</div>
                        </div>
                    </div>
                    <EnergyBar value={p.energy} color={p.color} />
                    {/* Affirmation */}
                    <div onClick={() => setShowAffirm(!showAffirm)} style={{ marginTop: 12, background: `${p.color}14`, borderRadius: 'var(--r-md)', padding: '10px 14px', cursor: 'pointer' }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: p.color }}>💪 {w.confidence}</div>
                        {showAffirm && (
                            <div className="serif" style={{ fontSize: 12, color: 'var(--text-dim)', fontStyle: 'italic', lineHeight: 1.65, marginTop: 8, borderTop: `1px solid ${p.color}33`, paddingTop: 8 }}>
                                ✨ &#34;{w.affirmation}&#34;
                            </div>
                        )}
                        <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>{showAffirm ? 'Tap to collapse' : "Tap for today's affirmation"}</div>
                    </div>
                </div>

                {/* Luna Room */}
                <div className="card" style={{ padding: '16px 18px', marginBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>
                            🌙 Luna Rooms
                            <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--mint)', animation: 'pulse 2s infinite' }} />
                        </div>
                        <span style={{ fontSize: 11, color: 'var(--mint)', fontWeight: 700 }}>1 LIVE</span>
                    </div>

                    {/* Chat */}
                    <div style={{ background: `${p.color}0e`, border: `1px solid ${p.color}33`, borderRadius: 'var(--r-md)', padding: 12, marginBottom: 8 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>🌸 {p.label} Cohort · {MOCK_COHORT.length} women</div>
                            <div style={{ fontSize: 10, color: 'var(--mint)', fontWeight: 700 }}>LIVE NOW</div>
                        </div>
                        {/* Messages */}
                        <div style={{ maxHeight: 160, overflowY: 'auto', marginBottom: 10 }}>
                            {msgs.map(m => (
                                <div key={m.id} style={{ display: 'flex', gap: 8, padding: '5px 0', borderTop: '1px solid var(--border)', justifyContent: m.mine ? 'flex-end' : 'flex-start' }}>
                                    {!m.mine && <span style={{ fontSize: 14, flexShrink: 0 }}>{m.emoji}</span>}
                                    <div style={{ maxWidth: '75%' }}>
                                        {!m.mine && <span style={{ fontSize: 10, color: p.color, fontWeight: 700 }}>{m.luna}: </span>}
                                        <div style={{ fontSize: 12, color: m.mine ? 'white' : 'var(--text-dim)', background: m.mine ? p.color : 'transparent', padding: m.mine ? '5px 10px' : 0, borderRadius: m.mine ? 10 : 0, display: 'inline-block', lineHeight: 1.5 }}>{m.msg}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Input */}
                        <div style={{ display: 'flex', gap: 8 }}>
                            <input value={msgInput} onChange={e => setMsgInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMsg()} placeholder="Say something..." style={{ flex: 1, padding: '8px 12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-full)', color: 'var(--text)', fontSize: 12, fontFamily: 'var(--font-sans)', outline: 'none' }} />
                            <button onClick={sendMsg} style={{ padding: '8px 14px', background: p.color, border: 'none', borderRadius: 'var(--r-full)', color: 'white', fontSize: 12, cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 700 }}>Send</button>
                        </div>
                    </div>
                </div>

                {/* Feed filters */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 12, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 2 }}>
                    {['All', 'My Cohort', 'Following', 'Trending'].map(f => (
                        <button key={f} onClick={() => setFilter(f.toLowerCase())} style={{ padding: '7px 16px', borderRadius: 'var(--r-full)', border: 'none', cursor: 'pointer', background: filter === f.toLowerCase() ? 'var(--rose)' : 'var(--card)', color: filter === f.toLowerCase() ? 'white' : 'var(--text-muted)', fontSize: 12, fontWeight: filter === f.toLowerCase() ? 700 : 400, fontFamily: 'var(--font-sans)', transition: 'all .2s', flexShrink: 0 }}>{f}</button>
                    ))}
                </div>

                {/* Feed */}
                {MOCK_POSTS.map(post => <PostCard key={post.id} post={post} />)}
            </div>

            <BottomNav />
        </div>
    );
}
