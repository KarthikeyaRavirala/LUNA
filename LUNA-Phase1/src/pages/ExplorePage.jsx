import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const SPACES = [
    { icon: '🌍', name: 'Community Rooms', desc: 'Create and join custom group gatherings', color: '#ba68c8', route: '/rooms', members: 'New' },
    { icon: '🍫', name: 'Craving Kitchen', desc: 'Phase-perfect comfort food, shared by your cohort', color: '#f06292', route: '/craving-kitchen', members: '2.4k' },
    { icon: '🧘', name: 'Calm Corner', desc: 'Guided meditations & curated calming playlists', color: '#4dd0e1', route: '/wellness', members: '1.1k' },
    { icon: '📓', name: 'Luna Journal', desc: 'Private cycle-aware diary with AI pattern insights', color: '#ce93d8', route: '/journal', members: '3.7k' },
    { icon: '😤', name: 'Vent Space', desc: 'Anonymous safe space to let it all out', color: '#ef5350', route: '/dashboard', members: '892' },
    { icon: '📚', name: 'Study Buddy', desc: 'Follicular phase learners — focus + productivity', color: '#66bb6a', route: '/dashboard', members: '648' },
    { icon: '🏃', name: 'Workout Crew', desc: 'Move together, celebrate small wins daily', color: '#ffa726', route: '/wellness', members: '1.9k' },
    { icon: '🩺', name: 'Symptom Validator', desc: 'Community vote: what symptoms are shared vs. unique', color: '#4285F4', route: '/dashboard', members: '543' },
    { icon: '🎮', name: 'Husband Hangout', desc: 'For the partners — activities while she rests', color: '#90caf9', route: '/hangout', members: '312' },
];

const STORIES = [
    { luna: 'MoonRose_22', emoji: '🌸', phase: 'Luteal', color: '#f06292', viewed: false },
    { luna: 'StarlightK', emoji: '⭐', phase: 'Follicular', color: '#66bb6a', viewed: true },
    { luna: 'AuroraD', emoji: '🌅', phase: 'Ovulatory', color: '#ffa726', viewed: false },
    { luna: 'EveningBloom', emoji: '💜', phase: 'Luteal', color: '#f06292', viewed: false },
    { luna: 'PinkTide', emoji: '🌊', phase: 'Menstrual', color: '#ef5350', viewed: true },
    { luna: 'VelvetMoon', emoji: '🌙', phase: 'Luteal', color: '#f06292', viewed: false },
];

const TRENDING = [
    { tag: '#LuteaTips', posts: '2.4k', color: '#f06292' },
    { tag: '#FollicularEnergy', posts: '1.8k', color: '#66bb6a' },
    { tag: '#PeakPerformance', posts: '3.1k', color: '#ffa726' },
    { tag: '#CycleScience', posts: '987', color: '#4dd0e1' },
    { tag: '#MagnesiumVibes', posts: '654', color: '#f06292' },
    { tag: '#GlowPhase', posts: '1.2k', color: '#ffa726' },
    { tag: '#SelfCareArchive', posts: '2.8k', color: '#ce93d8' },
    { tag: '#CravingKitchen', posts: '4.1k', color: '#f06292' },
];

const FEATURED_POSTS = [
    { luna: 'CrimsonSkye', emoji: '🌙', phase: 'Luteal', color: '#f06292', content: 'Day 8 of journaling daily and I can finally see the pattern. My anxiety ALWAYS peaks on Luteal Day 20. Just knowing it\'s coming changes everything. 📓', likes: 284, comments: 47, time: '22m' },
    { luna: 'SunriseKaya', emoji: '🌅', phase: 'Follicular', color: '#66bb6a', content: 'Follicular week and I pitched my startup idea today. Got immediate interest. This phase is literally my superpower. USE IT LADIES. 🚀', likes: 512, comments: 91, time: '1h' },
];

export default function ExplorePage() {
    const nav = useNavigate();
    const [search, setSearch] = useState('');
    const [viewedStories, setViewedStories] = useState({});
    const [postLikes, setPostLikes] = useState({});

    return (
        <div className="page has-bottom-nav" style={{ fontFamily: 'var(--font-sans)' }}>
            {/* Header */}
            <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(13,13,20,.94)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)', padding: '13px 18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <span style={{ fontSize: 20 }}>🔍</span>
                    <span className="serif" style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>Explore</span>
                </div>
                <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: 'var(--text-muted)' }}>🔍</span>
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users, posts, tags, spaces..." style={{ width: '100%', padding: '10px 12px 10px 36px', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--r-full)', color: 'var(--text)', fontSize: 13, fontFamily: 'var(--font-sans)', outline: 'none', boxSizing: 'border-box' }} />
                </div>
            </div>

            <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 16px' }}>
                {/* ── Stories Bar ── */}
                <div style={{ padding: '14px 0', borderBottom: '1px solid var(--border)', marginBottom: 16 }}>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 10, letterSpacing: '.08em', textTransform: 'uppercase' }}>Stories · 24hr updates</div>
                    <div style={{ display: 'flex', gap: 14, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 4 }}>
                        {STORIES.map((s, i) => {
                            const viewed = viewedStories[i] || s.viewed;
                            return (
                                <div key={i} onClick={() => setViewedStories(p => ({ ...p, [i]: true }))} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, cursor: 'pointer', flexShrink: 0 }}>
                                    <div style={{ width: 56, height: 56, borderRadius: '50%', padding: 2, background: viewed ? 'var(--border)' : `linear-gradient(135deg, ${s.color}, var(--rose-mid))` }}>
                                        <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'var(--card)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, border: '2px solid var(--bg)' }}>{s.emoji}</div>
                                    </div>
                                    <div style={{ fontSize: 9, color: viewed ? 'var(--text-muted)' : 'var(--text)', fontWeight: viewed ? 400 : 700, maxWidth: 56, textAlign: 'center', lineHeight: 1.2 }}>{s.luna}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ── Luna Spaces ── */}
                <div style={{ marginBottom: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>✨ Luna Spaces</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Communities built by your cycle</div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: 10 }}>
                        {SPACES.filter(s => !search || s.name.toLowerCase().includes(search.toLowerCase())).map((space, i) => (
                            <div key={i} onClick={() => nav(space.route)} className="card" style={{ padding: '16px 14px', cursor: 'pointer', transition: 'transform .15s, border-color .15s' }}
                                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${space.color}18`, border: `1px solid ${space.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 10 }}>{space.icon}</div>
                                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{space.name}</div>
                                <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 8 }}>{space.desc}</div>
                                <div style={{ fontSize: 10, color: space.color, fontWeight: 700 }}>{space.members} members</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Trending Tags ── */}
                <div style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>🔥 Trending Now</div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {TRENDING.filter(t => !search || t.tag.toLowerCase().includes(search.toLowerCase())).map((t, i) => (
                            <div key={i} style={{ padding: '7px 14px', background: `${t.color}12`, border: `1px solid ${t.color}33`, borderRadius: 'var(--r-full)', cursor: 'pointer', transition: 'all .2s' }}
                                onMouseEnter={e => { e.currentTarget.style.background = `${t.color}25`; }}
                                onMouseLeave={e => { e.currentTarget.style.background = `${t.color}12`; }}>
                                <span style={{ fontSize: 12, color: t.color, fontWeight: 700 }}>{t.tag}</span>
                                <span style={{ fontSize: 10, color: 'var(--text-muted)', marginLeft: 6 }}>{t.posts} posts</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Featured Posts ── */}
                <div style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>⭐ Community Highlights</div>
                    {FEATURED_POSTS.map((post, i) => (
                        <div key={i} className="card" style={{ padding: '16px 18px', marginBottom: 10, borderLeft: `3px solid ${post.color}` }}>
                            <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                                <div style={{ width: 38, height: 38, borderRadius: '50%', background: `${post.color}22`, border: `2px solid ${post.color}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{post.emoji}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{post.luna}</span>
                                        <span style={{ fontSize: 10, color: post.color, background: `${post.color}18`, padding: '2px 7px', borderRadius: 'var(--r-full)', fontWeight: 700 }}>{post.phase}</span>
                                        <span style={{ fontSize: 10, color: 'var(--text-muted)', marginLeft: 'auto' }}>{post.time}</span>
                                    </div>
                                </div>
                            </div>
                            <p style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 10 }}>{post.content}</p>
                            <div style={{ display: 'flex', gap: 14, paddingTop: 8, borderTop: '1px solid var(--border)' }}>
                                <button onClick={() => setPostLikes(l => ({ ...l, [i]: !l[i] }))} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: postLikes[i] ? '#f472b6' : 'var(--text-muted)', fontFamily: 'var(--font-sans)', display: 'flex', alignItems: 'center', gap: 4, transition: 'color .2s' }}>
                                    {postLikes[i] ? '💗' : '🤍'} {post.likes + (postLikes[i] ? 1 : 0)}
                                </button>
                                <span style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>💬 {post.comments}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <BottomNav />
        </div>
    );
}
