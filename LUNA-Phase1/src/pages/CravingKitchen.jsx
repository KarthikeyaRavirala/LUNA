import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useCycleStore } from '../store/cycleStore';
import { PHASES } from '../lib/constants';
import BottomNav from '../components/BottomNav';

const RECIPES = {
    menstrual: [
        { id: 1, emoji: '🍫', name: 'Dark Chocolate Bark', time: '5 min', benefit: 'Magnesium for cramps', likes: 142, author: 'MoonRose_22', tags: ['#comfort', '#magnesium'] },
        { id: 2, emoji: '🍵', name: 'Ginger Turmeric Latte', time: '8 min', benefit: 'Anti-inflammatory, soothing', likes: 98, author: 'CrimsonSkye', tags: ['#antiinflammatory', '#warming'] },
        { id: 3, emoji: '🍲', name: 'Iron-Rich Lentil Soup', time: '25 min', benefit: 'Replenishes iron from blood loss', likes: 76, author: 'EveningBloom', tags: ['#iron', '#hearty'] },
        { id: 4, emoji: '🥣', name: 'Warm Oat Bowl with Bananas', time: '10 min', benefit: 'B6 for mood, potassium', likes: 65, author: 'StarlightK', tags: ['#mood', '#breakfast'] },
        { id: 5, emoji: '🫖', name: 'Chamomile & Honey Tea', time: '4 min', benefit: 'Reduces anxiety and cramps', likes: 119, author: 'VelvetMoon', tags: ['#sleep', '#cramps'] },
    ],
    follicular: [
        { id: 6, emoji: '🥗', name: 'Probiotic Power Salad', time: '12 min', benefit: 'Gut health, estrogen balance', likes: 88, author: 'SunriseKaya', tags: ['#probiotics', '#gut'] },
        { id: 7, emoji: '🥚', name: 'Avocado Egg Toast', time: '7 min', benefit: 'Protein + healthy fats for energy', likes: 203, author: 'AuroraD', tags: ['#protein', '#energy'] },
        { id: 8, emoji: '🍓', name: 'Berry Smoothie Bowl', time: '6 min', benefit: 'Antioxidants, cellular energy', likes: 157, author: 'PinkTide', tags: ['#antioxidants', '#vegan'] },
        { id: 9, emoji: '🫐', name: 'Flaxseed Overnight Oats', time: '2 min', benefit: 'Phytoestrogens, fiber', likes: 91, author: 'MoonRose_22', tags: ['#fiber', '#prepme'] },
    ],
    ovulatory: [
        { id: 10, emoji: '🥙', name: 'Quinoa Power Bowl', time: '20 min', benefit: 'Sustained energy for peak performance', likes: 134, author: 'PeakVibes', tags: ['#energy', '#peak'] },
        { id: 11, emoji: '🐟', name: 'Salmon with Roasted Veg', time: '25 min', benefit: 'Omega-3, anti-inflammatory', likes: 76, author: 'CrimsonSkye', tags: ['#omega3', '#brain'] },
        { id: 12, emoji: '🍊', name: 'Citrus & Mint Detox Water', time: '2 min', benefit: 'Hydration during peak phase', likes: 58, author: 'StarlightK', tags: ['#hydration', '#detox'] },
    ],
    luteal: [
        { id: 13, emoji: '🍫', name: 'Magnesium Brownie Bites', time: '30 min', benefit: 'Magnesium, serotonin boost', likes: 289, author: 'MoonRose_22', tags: ['#magnesium', '#comfort', '#baking'] },
        { id: 14, emoji: '🥑', name: 'Avocado Chocolate Mousse', time: '10 min', benefit: 'B6 for PMS, healthy fats', likes: 162, author: 'VelvetMoon', tags: ['#B6', '#nomnom'] },
        { id: 15, emoji: '🌾', name: 'Oat & Banana Comfort Muffins', time: '22 min', benefit: 'Serotonin, steady blood sugar', likes: 118, author: 'EveningBloom', tags: ['#serotonin', '#baking'] },
        { id: 16, emoji: '🫘', name: 'Chickpea Curry (warm spices)', time: '28 min', benefit: 'Iron, protein, anti-bloat', likes: 97, author: 'AuroraD', tags: ['#iron', '#warmfood'] },
        { id: 17, emoji: '🍵', name: 'Ashwagandha Moon Milk', time: '5 min', benefit: 'Adaptogen for stress + sleep', likes: 201, author: 'StarlightK', tags: ['#adaptogen', '#sleep'] },
    ],
};

const CRAVINGS = [
    { craving: '🍫 Chocolate', why: 'Your body craves magnesium. Opt for 70%+ dark chocolate — it actually helps replenish what your body loses during your cycle.' },
    { craving: '🧂 Salty snacks', why: 'Sodium cravings spike due to hormonal shifts. Try salted nuts or rice cakes instead — they satisfy without causing extra bloating.' },
    { craving: '🍕 Carbs', why: 'Serotonin drops before your period. Carbs temporarily boost it. Choose complex carbs (oats, sweet potato) for sustained mood lift.' },
    { craving: '🧁 Sugar', why: 'Blood sugar becomes less stable in the luteal phase. Eat every 3–4 hours to prevent crashes that trigger sugar cravings.' },
    { craving: '☕ Caffeine', why: 'Fatigue + cortisol spikes cause caffeine cravings. Try matcha — it has L-theanine that calms while still giving focused energy.' },
];

function RecipeCard({ r, phaseColor, liked, onLike }) {
    const [expanded, setExpanded] = useState(false);
    return (
        <div className="card" style={{ padding: '14px 16px', marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: `${phaseColor}18`, border: `1px solid ${phaseColor}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>{r.emoji}</div>
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 4, marginBottom: 4 }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{r.name}</span>
                        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>⏱ {r.time}</span>
                    </div>
                    <div style={{ fontSize: 12, color: phaseColor, marginBottom: 6 }}>✓ {r.benefit}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 8 }}>
                        {r.tags.map(t => <span key={t} style={{ fontSize: 10, color: 'var(--rose-lite)', cursor: 'pointer' }}>{t}</span>)}
                    </div>
                    <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                        <button onClick={onLike} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: liked ? '#f472b6' : 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>
                            {liked ? '💗' : '🤍'} {r.likes + (liked ? 1 : 0)}
                        </button>
                        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>by {r.author}</span>
                        <button onClick={() => setExpanded(!expanded)} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>
                            {expanded ? 'Less ↑' : 'Recipe →'}
                        </button>
                    </div>
                </div>
            </div>
            {expanded && (
                <div className="anim-fade-up" style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                    <div style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.7 }}>
                        <div style={{ fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>Quick preparation:</div>
                        <div style={{ paddingLeft: 12 }}>1. Gather ingredients listed in {r.name}</div>
                        <div style={{ paddingLeft: 12 }}>2. Prep time approx {r.time}</div>
                        <div style={{ paddingLeft: 12 }}>3. {r.benefit} — best eaten during {r.tags[0]} phase</div>
                        <div style={{ marginTop: 8, padding: '8px 10px', background: `${phaseColor}12`, borderRadius: 'var(--r-md)', fontStyle: 'italic', color: phaseColor }}>
                            💡 Phase tip: This recipe is especially beneficial for your body right now.
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function CravingKitchen() {
    const user = useAuthStore(state => state.user);
    const currentPhase = useCycleStore(state => state.currentPhase);
    const p = PHASES[currentPhase] || PHASES.luteal;

    const [activePhase, setActivePhase] = useState(currentPhase || 'luteal');
    const [likes, setLikes] = useState({});
    const [view, setView] = useState('recipes'); // 'recipes' | 'decoder' | 'share'
    const [activeCraving, setActiveCraving] = useState(null);
    const [shareText, setShareText] = useState('');
    const [shareEmoji, setShareEmoji] = useState('🍫');
    const [shared, setShared] = useState(false);

    const ph = PHASES[activePhase];
    const recipes = RECIPES[activePhase] || [];

    const toggleLike = (id) => setLikes(prev => ({ ...prev, [id]: !prev[id] }));

    return (
        <div className="page has-bottom-nav" style={{ fontFamily: 'var(--font-sans)' }}>
            {/* Header */}
            <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(13,13,20,.94)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)', padding: '13px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 20 }}>🍫</span>
                    <span className="serif" style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>Craving Kitchen</span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>by your cohort</div>
            </div>

            {/* View tabs */}
            <div style={{ display: 'flex', background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
                {[{ id: 'recipes', label: '🍽 Recipes' }, { id: 'decoder', label: '🧪 Craving Decoder' }, { id: 'share', label: '➕ Share a Recipe' }].map(v => (
                    <button key={v.id} onClick={() => setView(v.id)} style={{ flex: 1, padding: '11px 4px', background: 'none', border: 'none', borderBottom: `2px solid ${view === v.id ? ph.color : 'transparent'}`, cursor: 'pointer', fontSize: 11, fontWeight: view === v.id ? 700 : 400, color: view === v.id ? ph.color : 'var(--text-muted)', fontFamily: 'var(--font-sans)', transition: 'all .2s' }}>{v.label}</button>
                ))}
            </div>

            <div style={{ maxWidth: 600, margin: '0 auto', padding: '16px' }}>
                {/* ── RECIPES ── */}
                {view === 'recipes' && (
                    <div className="anim-fade-up">
                        {/* Phase picker */}
                        <div style={{ display: 'flex', background: 'var(--card)', borderRadius: 'var(--r-lg)', padding: 4, border: '1px solid var(--border)', gap: 4, marginBottom: 16 }}>
                            {Object.values(PHASES).map(phase => (
                                <button key={phase.key} onClick={() => setActivePhase(phase.key)} style={{ flex: 1, padding: '8px 4px', borderRadius: 'var(--r-md)', border: 'none', cursor: 'pointer', background: activePhase === phase.key ? phase.color : 'transparent', color: activePhase === phase.key ? 'white' : 'var(--text-muted)', fontSize: 11, fontFamily: 'var(--font-sans)', fontWeight: activePhase === phase.key ? 700 : 400, transition: 'all .2s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                    <span style={{ fontSize: 16 }}>{phase.emoji}</span>
                                    <span style={{ fontSize: 9 }}>{phase.label}</span>
                                </button>
                            ))}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                            <div style={{ fontSize: 13, color: 'var(--text-dim)' }}>{recipes.length} recipes for {ph.label} phase</div>
                            {activePhase === currentPhase && <div style={{ fontSize: 11, color: ph.color, fontWeight: 700 }}>← Your current phase</div>}
                        </div>

                        {recipes.map(r => <RecipeCard key={r.id} r={r} phaseColor={ph.color} liked={likes[r.id]} onLike={() => toggleLike(r.id)} />)}
                    </div>
                )}

                {/* ── CRAVING DECODER ── */}
                {view === 'decoder' && (
                    <div className="anim-fade-up">
                        <div style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 14, lineHeight: 1.6 }}>
                            Tap any craving to understand what your body is really asking for — and healthier ways to satisfy it.
                        </div>
                        {CRAVINGS.map((c, i) => (
                            <div key={i}>
                                <button onClick={() => setActiveCraving(activeCraving === i ? null : i)} style={{ width: '100%', padding: '14px 16px', background: activeCraving === i ? `${p.color}14` : 'var(--card)', border: `1px solid ${activeCraving === i ? p.color + '55' : 'var(--border)'}`, borderRadius: 'var(--r-md)', fontFamily: 'var(--font-sans)', cursor: 'pointer', textAlign: 'left', marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all .2s' }}>
                                    <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{c.craving}</span>
                                    <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>{activeCraving === i ? '↑' : '↓'}</span>
                                </button>
                                {activeCraving === i && (
                                    <div className="anim-fade-up" style={{ padding: '12px 16px', background: `${p.color}0e`, border: `1px solid ${p.color}33`, borderRadius: 'var(--r-md)', marginBottom: 10, fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.7 }}>
                                        {c.why}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* ── SHARE ── */}
                {view === 'share' && (
                    <div className="anim-fade-up">
                        <div className="card" style={{ padding: 20 }}>
                            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>Share a comfort recipe with your cohort 🍽</div>

                            <div style={{ marginBottom: 14 }}>
                                <label style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 6, letterSpacing: '.08em', textTransform: 'uppercase' }}>Recipe emoji</label>
                                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                    {['🍫', '🍵', '🥑', '🍲', '🥣', '🍓', '🧁', '🥗', '🍳', '🫖'].map(e => (
                                        <button key={e} onClick={() => setShareEmoji(e)} style={{ width: 40, height: 40, borderRadius: 10, border: `2px solid ${shareEmoji === e ? p.color : 'var(--border)'}`, background: shareEmoji === e ? `${p.color}22` : 'var(--card)', fontSize: 20, cursor: 'pointer' }}>{e}</button>
                                    ))}
                                </div>
                            </div>

                            <div style={{ marginBottom: 14 }}>
                                <label style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 6, letterSpacing: '.08em', textTransform: 'uppercase' }}>Recipe name & instructions</label>
                                <textarea value={shareText} onChange={e => setShareText(e.target.value)} placeholder="e.g. Dark Chocolate Mug Cake — 3 mins, 2 tbsp cocoa, 1 tbsp coconut oil..." style={{ width: '100%', minHeight: 120, padding: '12px 14px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', color: 'var(--text)', fontSize: 13, fontFamily: 'var(--font-sans)', outline: 'none', resize: 'vertical', lineHeight: 1.7 }} />
                            </div>

                            <div style={{ marginBottom: 16 }}>
                                <label style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 8, letterSpacing: '.08em', textTransform: 'uppercase' }}>Best for phase</label>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    {Object.values(PHASES).map(phase => (
                                        <button key={phase.key} style={{ flex: 1, padding: '8px 4px', border: `1px solid ${phase.color}55`, borderRadius: 'var(--r-md)', background: `${phase.color}14`, cursor: 'pointer', fontSize: 11, color: phase.color, fontWeight: 600, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                                            <span style={{ fontSize: 16 }}>{phase.emoji}</span><span style={{ fontSize: 9 }}>{phase.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {shared && <div className="anim-fade-up" style={{ padding: '10px 14px', background: 'rgba(105,240,174,.12)', border: '1px solid rgba(105,240,174,.3)', borderRadius: 'var(--r-md)', fontSize: 13, color: 'var(--mint)', textAlign: 'center', marginBottom: 14 }}>✓ Recipe shared with your cohort! 🎉</div>}
                            <button onClick={() => { if (!shareText.trim()) return; setShared(true); setShareText(''); setTimeout(() => setShared(false), 3000); }} className="btn btn-primary" style={{ width: '100%', padding: 13 }}>
                                🍽 Share with Cohort
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <BottomNav />
        </div>
    );
}
