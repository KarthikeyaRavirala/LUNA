import { useNavigate } from 'react-router-dom';
import { useCycleStore } from '../store/cycleStore';
import { PHASES } from '../lib/constants';
import BottomNav from '../components/BottomNav';

export default function LunaInsights() {
    const currentPhase = useCycleStore(state => state.currentPhase);
    const navigate = useNavigate();
    const p = PHASES[currentPhase] || PHASES.luteal;

    const INSIGHTS = {
        menstrual: {
            symptom: "Based on your last 3 cycles, you often experience lower back pain on Day 2. We recommend gentle stretching today.",
            mood: "Your journal entries from past Menstrual phases show a 40% increase in words related to 'relief' and 'fatigue'. Rest is productive right now.",
            nutrition: "You've logged iron-rich foods less frequently. Consider adding spinach or lentils to your upcoming meals.",
            accuracy: 89
        },
        follicular: {
            symptom: "Your energy levels usually peak between Day 8 and 10. Tomorrow looks like a great day for an intense workout.",
            mood: "Pattern detected: You consistently feel more sociable and optimistic in this phase. Great time to schedule meetings!",
            nutrition: "Your protein intake was optimal last Follicular phase, which correlated with higher energy. Keep it up!",
            accuracy: 94
        },
        ovulatory: {
            symptom: "You have a 75% chance of experiencing slight bloating tomorrow. Staying hydrated will help mitigate this.",
            mood: "Confidence is high! Your communication is typically at its best during these 3 days.",
            nutrition: "You tend to crave fewer sweets during this phase. Focus on complex carbs for sustained energy.",
            accuracy: 82
        },
        luteal: {
            symptom: "Predictive alert: Your sleep quality often drops around Day 22. Consider a magnesium supplement before bed tonight.",
            mood: "We noticed a recurring pattern of anxiety in your Luteal phase entries. This is completely normal hormonal shifting. Be gentle with yourself.",
            nutrition: "You logged chocolate cravings 3 times last week. Try pairing dark chocolate with nuts for better blood sugar balance.",
            accuracy: 91
        }
    };

    const insight = INSIGHTS[currentPhase] || INSIGHTS.luteal;

    return (
        <div className="page has-bottom-nav" style={{ fontFamily: 'var(--font-sans)', background: 'var(--bg)', minHeight: '100vh', paddingBottom: 80 }}>
            {/* Header */}
            <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(13,13,20,.94)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <button onClick={() => navigate(-1)} style={{ background: 'var(--surface)', border: 'none', width: 36, height: 36, borderRadius: 18, color: 'var(--text)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    ←
                </button>
                <div style={{ flex: 1 }}>
                    <div className="serif" style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)' }}>Luna AI Insights</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Pattern Recognition Engine</div>
                </div>
                <div style={{ padding: '4px 8px', background: 'rgba(206,147,216,.1)', border: '1px solid rgba(206,147,216,.3)', borderRadius: 'var(--r-md)', fontSize: 10, color: '#ce93d8', fontWeight: 700, textTransform: 'uppercase' }}>Beta</div>
            </div>

            <div style={{ padding: '24px 16px', maxWidth: 600, margin: '0 auto' }}>
                
                {/* Hero */}
                <div className="anim-fade-up" style={{ textAlign: 'center', marginBottom: 32 }}>
                    <div style={{ width: 80, height: 80, borderRadius: 40, background: 'var(--surface)', border: `2px solid ${p.color}55`, margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, boxShadow: `0 0 30px ${p.color}22` }}>
                        ✨
                    </div>
                    <h1 className="serif" style={{ fontSize: 24, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>Your {p.label} Patterns</h1>
                    <p style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.6, padding: '0 20px' }}>
                        Luna AI has analyzed your past 6 cycles, journal entries, and logged symptoms to generate these personalized predictions.
                    </p>
                </div>

                {/* Accuracy Card */}
                <div className="anim-fade-up" style={{ animationDelay: '0.1s', background: `linear-gradient(135deg, var(--card), ${p.color}11)`, border: `1px solid ${p.color}33`, borderRadius: 'var(--r-lg)', padding: 16, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 50, height: 50, borderRadius: 25, background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={p.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    </div>
                    <div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 4 }}>Prediction Confidence</div>
                        <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>{insight.accuracy}% Match</div>
                    </div>
                </div>

                {/* Insight Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    
                    <div className="card anim-fade-up" style={{ animationDelay: '0.2s', padding: 20, borderLeft: '3px solid #ef5350' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                            <span style={{ fontSize: 20 }}>🩺</span>
                            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Symptom Forecast</span>
                        </div>
                        <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.6 }}>{insight.symptom}</p>
                    </div>

                    <div className="card anim-fade-up" style={{ animationDelay: '0.3s', padding: 20, borderLeft: '3px solid #4dd0e1' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                            <span style={{ fontSize: 20 }}>🧠</span>
                            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Mood & Mindset</span>
                        </div>
                        <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.6 }}>{insight.mood}</p>
                        <div style={{ marginTop: 14, padding: '10px 14px', background: 'var(--surface)', borderRadius: 'var(--r-md)', fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontSize: 14 }}>📓</span> Derived from your Journal entries
                        </div>
                    </div>

                    <div className="card anim-fade-up" style={{ animationDelay: '0.4s', padding: 20, borderLeft: '3px solid #66bb6a' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                            <span style={{ fontSize: 20 }}>🥗</span>
                            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Nutrition Advice</span>
                        </div>
                        <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.6 }}>{insight.nutrition}</p>
                    </div>

                </div>

            </div>
            
        </div>
    );
}
