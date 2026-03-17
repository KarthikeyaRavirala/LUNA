import { useState } from 'react';
import BottomNav from '../components/BottomNav';

const TIERS = [
    {
        name: 'Luna Free',
        price: '₹0',
        period: '',
        badge: null,
        color: '#9e9e9e',
        features: [
            { label: 'Cycle tracking', included: true },
            { label: 'Basic wellness hub', included: true },
            { label: 'Luna Journal (7 entries/mo)', included: true },
            { label: 'Cohort matching', included: true },
            { label: 'Craving Kitchen (3 recipes)', included: true },
            { label: 'Symptom Validator', included: true },
            { label: 'Luna Rooms real-time chat', included: false },
            { label: 'AI Journal insights', included: false },
            { label: 'Partner Bridge feature', included: false },
            { label: 'Google Calendar sync', included: false },
            { label: 'Missed cycle alerts', included: false },
            { label: 'PDF doctor export', included: false },
            { label: 'Unlimited journal entries', included: false },
            { label: 'Clinic Connect (B2B)', included: false },
        ],
        cta: 'Current Plan',
        ctaStyle: { background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-muted)' },
    },
    {
        name: 'Luna Premium',
        price: '₹299',
        period: '/month',
        badge: '⭐ Most Popular',
        badgeColor: '#ffa726',
        color: '#f06292',
        features: [
            { label: 'Everything in Free', included: true },
            { label: 'Luna Rooms real-time chat', included: true },
            { label: 'AI Journal insights', included: true },
            { label: 'Partner Bridge feature', included: true },
            { label: 'Google Calendar sync', included: true },
            { label: 'Missed cycle alerts', included: true },
            { label: 'PDF doctor export', included: true },
            { label: 'Unlimited journal entries', included: true },
            { label: 'All Craving Kitchen recipes', included: true },
            { label: 'Calm Corner full access', included: true },
            { label: 'Priority cohort matching', included: true },
            { label: 'Clinic Connect (B2B)', included: false },
            { label: 'API access', included: false },
            { label: 'Custom branding', included: false },
        ],
        cta: 'Start 7-day Free Trial',
        ctaStyle: { background: '#f06292', border: 'none', color: 'white' },
        highlight: true,
    },
    {
        name: 'Luna Partner',
        price: '₹499',
        period: '/month',
        badge: '🏢 For Couples',
        badgeColor: '#ce93d8',
        color: '#ce93d8',
        features: [
            { label: 'Everything in Premium', included: true },
            { label: 'Partner app access (his side)', included: true },
            { label: 'Husband Hangout full groups', included: true },
            { label: 'Couples wellness dashboard', included: true },
            { label: 'Partner email notifications', included: true },
            { label: 'Monthly couple insights PDF', included: true },
            { label: 'Clinic Connect (B2B)', included: false },
            { label: 'API access', included: false },
            { label: 'Custom branding', included: false },
            { label: 'Dedicated support', included: false },
        ],
        cta: 'Start 7-day Free Trial',
        ctaStyle: { background: '#ce93d8', border: 'none', color: 'white' },
    },
];

const FAQS = [
    { q: 'Can I cancel anytime?', a: 'Yes. Cancel from Settings → Subscription at any time. You keep access until the end of your billing period.' },
    { q: 'Is my data private on Premium?', a: 'Always. Premium does not change privacy — all journal entries are private and encrypted regardless of plan.' },
    { q: 'What is the 7-day trial?', a: 'Try all Premium features free for 7 days. No card required for the trial. You will be reminded before it ends.' },
    { q: 'Can my husband and I share a plan?', a: 'Yes — the Luna Partner plan gives you both full access. His dashboard shows only what you choose to share.' },
    { q: 'Do you offer student discounts?', a: 'Yes! Students get 50% off Luna Premium. Email us at care@tryluna.in with your college email to unlock the discount.' },
    { q: 'Is there a yearly plan?', a: 'Coming soon — yearly plans will save 20% (₹2,990/year vs ₹3,588). Join the waitlist from your Profile.' },
];

const WHATS_INCLUDED = [
    { icon: '🤖', title: 'AI Journal Insights', desc: 'Every 30 days, your journal entries are analysed to surface emotional patterns across your cycle — completely private.' },
    { icon: '📅', title: 'Google Calendar Sync', desc: 'Auto-add phase blocks, recovery time, and peak performance days to your Google Calendar.' },
    { icon: '🔔', title: 'Smart Cycle Alerts', desc: 'Never miss a period. Compassionate alerts starting Day +3 with escalating support.' },
    { icon: '💌', title: 'Partner Bridge', desc: 'Send a gentle, private ping to your partner during sensitive phases. No personal details shared.' },
    { icon: '📄', title: 'Doctor PDF Export', desc: 'Generate a 3-cycle summary PDF to share with your gynaecologist — mood, symptoms, sleep, and habits.' },
];

export default function LunaPremium() {
    const [openFaq, setOpenFaq] = useState(null);
    const [expanded, setExpanded] = useState(false);
    const [selected, setSelected] = useState(null);
    const [trialStarted, setTrialStarted] = useState(false);

    return (
        <div className="page has-bottom-nav" style={{ fontFamily: 'var(--font-sans)' }}>
            {/* Header */}
            <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(13,13,20,.94)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)', padding: '13px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 20 }}>⭐</span>
                    <span className="serif" style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>LUNA Premium</span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Made for you</div>
            </div>

            <div style={{ maxWidth: 680, margin: '0 auto', padding: '20px 16px' }}>

                {/* Hero */}
                <div style={{ textAlign: 'center', marginBottom: 28 }}>
                    <div className="serif" style={{ fontSize: 28, fontWeight: 700, color: 'var(--text)', marginBottom: 8, lineHeight: 1.3 }}>Unlock the full power<br /> of your cycle</div>
                    <div style={{ fontSize: 13, color: 'var(--text-dim)', maxWidth: 360, margin: '0 auto' }}>AI insights, real-time chat, Google sync, partner bridge — everything LUNA has to offer.</div>
                </div>

                {/* Pricing Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 28 }}>
                    {TIERS.map((tier, i) => (
                        <div key={i} className="card" onClick={() => setSelected(i)} style={{ padding: '20px 18px', border: `1.5px solid ${selected === i ? tier.color : tier.highlight ? tier.color + '55' : 'var(--border)'}`, background: tier.highlight ? `${tier.color}08` : 'var(--card)', cursor: 'pointer', transition: 'all .2s', transform: selected === i ? 'translateY(-2px)' : 'none', boxShadow: tier.highlight ? `0 4px 20px ${tier.color}22` : 'none', position: 'relative', overflow: 'hidden' }}>
                            {tier.badge && (
                                <div style={{ position: 'absolute', top: 12, right: -10, background: tier.badgeColor, color: '#1a1a2e', fontSize: 9, fontWeight: 800, padding: '3px 18px 3px 10px', borderRadius: '3px 0 0 3px' }}>{tier.badge}</div>
                            )}
                            <div style={{ fontSize: 13, fontWeight: 700, color: tier.color, marginBottom: 8 }}>{tier.name}</div>
                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, marginBottom: 16 }}>
                                <span className="serif" style={{ fontSize: 32, fontWeight: 700, color: 'var(--text)', lineHeight: 1 }}>{tier.price}</span>
                                <span style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>{tier.period}</span>
                            </div>
                            <div style={{ marginBottom: 16 }}>
                                {tier.features.slice(0, 6).map((f, j) => (
                                    <div key={j} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '4px 0', fontSize: 11, color: f.included ? 'var(--text-dim)' : 'var(--text-muted)', textDecoration: f.included ? 'none' : 'none', opacity: f.included ? 1 : 0.45 }}>
                                        <span style={{ flexShrink: 0, fontSize: 12 }}>{f.included ? '✓' : '—'}</span>
                                        {f.label}
                                    </div>
                                ))}
                            </div>
                            <button onClick={(e) => { e.stopPropagation(); if (tier.cta !== 'Current Plan') { setTrialStarted(true); setTimeout(() => setTrialStarted(false), 3000); } }} style={{ width: '100%', padding: '10px', borderRadius: 'var(--r-full)', fontSize: 12, fontWeight: 700, cursor: tier.cta === 'Current Plan' ? 'default' : 'pointer', fontFamily: 'var(--font-sans)', ...tier.ctaStyle }}>
                                {trialStarted && selected === i ? '✓ Trial started! Check your email.' : tier.cta}
                            </button>
                        </div>
                    ))}
                </div>

                {/* What's included */}
                <div style={{ marginBottom: 24 }}>
                    <button onClick={() => setExpanded(!expanded)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>🔍 What's included in Premium?</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>{expanded ? '↑' : '↓'}</span>
                    </button>
                    {expanded && (
                        <div className="anim-fade-up" style={{ marginTop: 8 }}>
                            {WHATS_INCLUDED.map((item, i) => (
                                <div key={i} style={{ display: 'flex', gap: 14, padding: '14px 18px', background: 'var(--card)', border: '1px solid var(--border)', borderTop: i === 0 ? '1px solid var(--border)' : 'none', borderRadius: i === 0 ? 'var(--r-md)' : i === WHATS_INCLUDED.length - 1 ? '0 0 var(--r-md) var(--r-md)' : 0 }}>
                                    <span style={{ fontSize: 22, flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
                                    <div>
                                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 3 }}>{item.title}</div>
                                        <div style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.6 }}>{item.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* FAQs */}
                <div style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>💬 Frequently Asked Questions</div>
                    {FAQS.map((faq, i) => (
                        <div key={i}>
                            <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 16px', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', cursor: 'pointer', fontFamily: 'var(--font-sans)', marginBottom: 6, textAlign: 'left' }}>
                                <span style={{ fontSize: 13, color: 'var(--text)', fontWeight: openFaq === i ? 700 : 400 }}>{faq.q}</span>
                                <span style={{ color: 'var(--text-muted)', fontSize: 14, flexShrink: 0, marginLeft: 12 }}>{openFaq === i ? '↑' : '↓'}</span>
                            </button>
                            {openFaq === i && (
                                <div className="anim-fade-up" style={{ padding: '12px 16px', background: 'rgba(240,98,146,.06)', border: '1px solid rgba(240,98,146,.2)', borderRadius: 'var(--r-md)', marginBottom: 6, fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.7 }}>{faq.a}</div>
                            )}
                        </div>
                    ))}
                </div>

                <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.8, paddingBottom: 8 }}>
                    Made with love in Hyderabad 🌸 · care@tryluna.in<br />
                    No ads. No selling your data. LUNA is funded by subscriptions only.
                </div>
            </div>
            <BottomNav />
        </div>
    );
}
