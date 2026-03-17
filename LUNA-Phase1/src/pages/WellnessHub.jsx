import { useState } from 'react';
import { useCycleStore } from '../store/cycleStore';
import { PHASES } from '../lib/constants';
import BottomNav from '../components/BottomNav';
import { WELLNESS_DATA, MISSED_ALERTS } from '../data/mockData';

const PHASE_KEYS = ['menstrual', 'follicular', 'ovulatory', 'luteal'];
const SUB_TABS = [
    { id: 'exercise', icon: '🏃', label: 'Move' },
    { id: 'food', icon: '🍽', label: 'Eat' },
    { id: 'habits', icon: '🌿', label: 'Habits' },
    { id: 'alerts', icon: '📅', label: 'Alerts' },
];

export default function WellnessHub() {
    const currentPhase = useCycleStore(state => state.currentPhase);
    const [activePhase, setActivePhase] = useState(currentPhase || 'luteal');
    const [activeTab, setActiveTab] = useState('exercise');
    const [alertIdx, setAlertIdx] = useState(0);
    const [showAffirm, setShowAffirm] = useState(false);
    const [checked, setChecked] = useState({});

    const p = PHASES[activePhase];
    const wd = WELLNESS_DATA[activePhase];

    if (!p || !wd) return null;

    return (
        <div className="page has-bottom-nav" style={{ fontFamily: 'var(--font-sans)' }}>
            {/* Header */}
            <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(13,13,20,.94)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)', padding: '13px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 20 }}>🌿</span>
                    <span className="serif" style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>Wellness Hub</span>
                </div>
                <div style={{ padding: '3px 10px', background: `${p.color}22`, border: `1px solid ${p.color}44`, borderRadius: 'var(--r-full)', fontSize: 11, color: p.color, fontWeight: 700 }}>{p.emoji} {p.label}</div>
            </div>

            {/* Phase tabs */}
            <div style={{ display: 'flex', background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
                {PHASE_KEYS.map(key => {
                    const ph = PHASES[key];
                    const active = activePhase === key;
                    return (
                        <button key={key} onClick={() => { setActivePhase(key); setShowAffirm(false); }} style={{ flex: 1, padding: '11px 4px', background: 'none', border: 'none', borderBottom: `2px solid ${active ? ph.color : 'transparent'}`, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, transition: 'all .2s' }}>
                            <span style={{ fontSize: 18 }}>{ph.emoji}</span>
                            <span style={{ fontSize: 9, color: active ? ph.color : 'var(--text-muted)', fontWeight: active ? 700 : 400, fontFamily: 'var(--font-sans)' }}>{ph.label}</span>
                        </button>
                    );
                })}
            </div>

            <div style={{ maxWidth: 600, margin: '0 auto', padding: '16px' }}>
                {/* Phase hero */}
                <div style={{ background: p.bg, border: `1px solid ${p.color}44`, borderRadius: 'var(--r-xl)', padding: 18, marginBottom: 14 }} className="anim-fade-up">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                        <span style={{ fontSize: 36 }}>{p.emoji}</span>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>{p.label} Phase</div>
                            <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{p.days} · {wd.mood}</div>
                        </div>
                    </div>
                    {/* Energy */}
                    <div style={{ marginBottom: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                            <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>Phase Energy</span>
                            <span style={{ fontSize: 10, color: p.color, fontWeight: 700 }}>{p.energy}%</span>
                        </div>
                        <div style={{ height: 5, background: 'rgba(255,255,255,.08)', borderRadius: 3 }}>
                            <div style={{ width: `${p.energy}%`, height: '100%', background: `linear-gradient(90deg, ${p.color}88, ${p.color})`, borderRadius: 3, transition: 'width .6s ease' }} />
                        </div>
                    </div>
                    {/* Affirmation */}
                    <div onClick={() => setShowAffirm(!showAffirm)} style={{ background: `${p.color}16`, borderRadius: 'var(--r-md)', padding: '10px 12px', cursor: 'pointer' }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: p.color }}>💪 Tap for your daily affirmation</div>
                        {showAffirm && <div className="serif" style={{ fontSize: 12, color: 'var(--text-dim)', fontStyle: 'italic', lineHeight: 1.65, marginTop: 8 }}>&#34;{wd.affirmation}&#34;</div>}
                    </div>
                </div>

                {/* Sub-tabs */}
                <div style={{ display: 'flex', gap: 6, marginBottom: 14, overflowX: 'auto', scrollbarWidth: 'none' }}>
                    {SUB_TABS.map(t => (
                        <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ padding: '8px 18px', borderRadius: 'var(--r-full)', border: 'none', cursor: 'pointer', flexShrink: 0, background: activeTab === t.id ? p.color : 'var(--card)', color: activeTab === t.id ? 'white' : 'var(--text-muted)', fontSize: 12, fontWeight: activeTab === t.id ? 700 : 400, fontFamily: 'var(--font-sans)', transition: 'all .2s' }}>
                            {t.icon} {t.label}
                        </button>
                    ))}
                </div>

                {/* ── MOVE ── */}
                {activeTab === 'exercise' && (
                    <div className="anim-fade-up">
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10 }}>Best workouts for your {p.label} phase</div>
                        {wd.exercise.map((e, i) => (
                            <div key={i} className="card" style={{ padding: '13px 15px', marginBottom: 10, display: 'flex', gap: 12, alignItems: 'center' }}>
                                <div style={{ width: 46, height: 46, borderRadius: 12, background: `${p.color}18`, border: `1px solid ${p.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{e.icon}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                                        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{e.name}</span>
                                        <span style={{ fontSize: 10, color: p.color, background: `${p.color}18`, padding: '2px 8px', borderRadius: 'var(--r-full)', fontWeight: 700 }}>{e.intensity}</span>
                                    </div>
                                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>⏱ {e.duration}</div>
                                    <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>{e.benefit}</div>
                                </div>
                            </div>
                        ))}
                        <div style={{ background: `${p.color}10`, border: `1px solid ${p.color}30`, borderRadius: 'var(--r-md)', padding: '12px 14px', marginTop: 6 }}>
                            <div style={{ fontSize: 11, color: p.color, fontWeight: 700, marginBottom: 4 }}>💡 Phase Tip</div>
                            <div style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.6 }}>{wd.tip}</div>
                        </div>
                    </div>
                )}

                {/* ── EAT ── */}
                {activeTab === 'food' && (
                    <div className="anim-fade-up">
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10 }}>Phase-optimised nutrition for {p.label}</div>
                        {wd.foods.map((f, i) => (
                            <div key={i} style={{ background: f.avoid ? 'rgba(239,83,80,.07)' : 'var(--card)', border: `1px solid ${f.avoid ? 'rgba(239,83,80,.28)' : 'var(--border)'}`, borderRadius: 'var(--r-md)', padding: '12px 14px', marginBottom: 8, display: 'flex', gap: 12, alignItems: 'center' }}>
                                <span style={{ fontSize: 26, flexShrink: 0 }}>{f.icon}</span>
                                <div>
                                    <div style={{ fontSize: 13, fontWeight: 600, color: f.avoid ? '#ef9a9a' : 'var(--text)', marginBottom: 3 }}>{f.name}</div>
                                    <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.5 }}>{f.why}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* ── HABITS ── */}
                {activeTab === 'habits' && (
                    <div className="anim-fade-up">
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10 }}>Daily adjustments for {p.label} phase</div>
                        {wd.habits.map((h, i) => {
                            const key = `${activePhase}-${i}`;
                            const done = checked[key];
                            return (
                                <div key={i} className="card" style={{ padding: '13px 15px', marginBottom: 10, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                    <span style={{ fontSize: 24, flexShrink: 0 }}>{h.icon}</span>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 3 }}>{h.label}</div>
                                        <div style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.6 }}>{h.tip}</div>
                                    </div>
                                    <div onClick={() => setChecked(prev => ({ ...prev, [key]: !done }))} style={{ width: 24, height: 24, borderRadius: 6, border: `2px solid ${done ? p.color : 'var(--border)'}`, background: done ? p.color : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, transition: 'all .2s' }}>
                                        {done && <span style={{ color: 'white', fontSize: 13, lineHeight: 1 }}>✓</span>}
                                    </div>
                                </div>
                            );
                        })}
                        {/* Confidence engine */}
                        <div style={{ background: 'rgba(206,147,216,.1)', border: '1px solid rgba(206,147,216,.3)', borderRadius: 'var(--r-lg)', padding: 16, marginTop: 8 }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--purple)', marginBottom: 8 }}>🌟 Confidence Engine</div>
                            <div className="serif" style={{ fontSize: 13, color: 'var(--text-dim)', fontStyle: 'italic', lineHeight: 1.7 }}>&#34;{wd.confidence}&#34;</div>
                        </div>
                    </div>
                )}

                {/* ── ALERTS ── */}
                {activeTab === 'alerts' && (
                    <div className="anim-fade-up">
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10 }}>Smart missed-cycle monitoring with compassionate support</div>
                        {/* Timeline selector */}
                        <div style={{ display: 'flex', gap: 6, marginBottom: 14, overflowX: 'auto', scrollbarWidth: 'none' }}>
                            {MISSED_ALERTS.map((a, i) => (
                                <button key={i} onClick={() => setAlertIdx(i)} style={{ padding: '6px 14px', borderRadius: 'var(--r-full)', border: `1px solid ${alertIdx === i ? a.color + '77' : 'var(--border)'}`, cursor: 'pointer', flexShrink: 0, background: alertIdx === i ? `${a.color}22` : 'var(--card)', color: alertIdx === i ? a.color : 'var(--text-muted)', fontSize: 11, fontWeight: alertIdx === i ? 700 : 400, fontFamily: 'var(--font-sans)' }}>{a.label}</button>
                            ))}
                        </div>
                        {/* Alert card */}
                        {(() => {
                            const a = MISSED_ALERTS[alertIdx];
                            return (
                                <div className="anim-fade-up" style={{ background: `${a.color}14`, border: `1px solid ${a.color}44`, borderRadius: 'var(--r-xl)', padding: 20, marginBottom: 14 }}>
                                    <div style={{ fontSize: 32, marginBottom: 12 }}>{a.icon}</div>
                                    <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{a.title}</div>
                                    <div style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.7 }}>{a.msg}</div>
                                    {a.actions && (
                                        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                                            <button style={{ flex: 1, padding: 10, background: a.color, border: 'none', borderRadius: 'var(--r-full)', color: 'white', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>Talk to Cohort</button>
                                            <button style={{ flex: 1, padding: 10, background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--r-full)', color: 'var(--text-dim)', fontSize: 12, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>Find a Doctor</button>
                                        </div>
                                    )}
                                </div>
                            );
                        })()}
                        {/* Common reasons */}
                        <div className="card" style={{ padding: 16 }}>
                            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>Common reasons for cycle changes</div>
                            {[
                                { icon: '😰', r: 'Stress & Anxiety', d: 'Most common cause of a delayed cycle' },
                                { icon: '✈️', r: 'Travel / Timezone Change', d: 'Disrupts circadian rhythm' },
                                { icon: '🍽', r: 'Significant Diet Changes', d: 'Drastic changes affect hormone levels' },
                                { icon: '🏋️', r: 'Over-exercising', d: 'Excess training can pause cycles' },
                                { icon: '💊', r: 'Medication Changes', d: 'Some medications delay or skip cycles' },
                            ].map((r, i) => (
                                <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderTop: '1px solid var(--border)' }}>
                                    <span style={{ fontSize: 15 }}>{r.icon}</span>
                                    <div>
                                        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>{r.r}</div>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{r.d}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <BottomNav />
        </div>
    );
}
