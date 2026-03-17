import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

export default function AuthPage() {
    const navigate = useNavigate();
    const login = useAuthStore(state => state.loginMock);

    const [tab, setTab] = useState('login');   // 'login' | 'signup'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lunaName, setLunaName] = useState('');
    const [agree, setAgree] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [resetSent, setResetSent] = useState(false);
    const [showReset, setShowReset] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [showPass, setShowPass] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        if (!email || !password) { setError('Please fill in all fields.'); return; }
        setLoading(true);
        await new Promise(r => setTimeout(r, 900)); // simulate latency
        // ── Uncomment below to wire to Supabase: ──
        // const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        // if (error) { setError(error.message); setLoading(false); return; }
        login({ email, name: email.split('@')[0], lunaName: email.split('@')[0].replace(/[^a-zA-Z]/g, '') || 'LunaUser', role: 'user' });
        setLoading(false);
        navigate('/dashboard');
    };

    const handleQuickLogin = (role) => {
        setLoading(true);
        setTimeout(() => {
            const profile = role === 'admin' 
                ? { email: 'admin@luna.app', name: 'LUNA Admin', lunaName: 'LunaAdmin', role: 'admin' }
                : { email: 'guest@luna.app', name: 'Guest User', lunaName: 'GuestVisitor', role: 'guest' };
            login(profile);
            setLoading(false);
            navigate('/dashboard');
        }, 600);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        if (!name || !email || !password || !lunaName) { setError('Please fill in all fields.'); return; }
        if (!agree) { setError('Please accept the Terms of Service to continue.'); return; }
        if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
        setLoading(true);
        await new Promise(r => setTimeout(r, 1200));
        // ── Uncomment below to wire to Supabase: ──
        // const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { name, luna_name: lunaName } } });
        // if (error) { setError(error.message); setLoading(false); return; }
        login({ email, name, lunaName });
        setLoading(false);
        navigate('/onboarding');
    };

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setLoading(true);
            try {
                // In a real app we would send this token to our backend for validation
                // Here we decode the user info for the client-side session
                const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                });
                if (!res.ok) throw new Error('Failed to fetch user profile');
                const profile = await res.json();
                login({
                    name: profile.name,
                    email: profile.email,
                    lunaName: profile.given_name ? `${profile.given_name}Luna` : 'LunaUser',
                    role: 'user'
                });
                setLoading(false);
                navigate('/dashboard');
            } catch (err) {
                setError('Google sign in failed. Please try again.');
                setLoading(false);
            }
        },
        onError: () => {
             setError('Google sign in failed. Please try again.');
        }
    });

    const handleGoogleSignIn = () => {
        googleLogin();
    };

    const handleReset = () => {
        if (!resetEmail) return;
        setResetSent(true);
        // supabase.auth.resetPasswordForEmail(resetEmail);
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-sans)', padding: 20 }}>
            <div style={{ width: '100%', maxWidth: 420 }}>

                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: 28 }}>
                    <div className="serif" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontSize: 36, fontWeight: 700, color: 'var(--rose-lite)', marginBottom: 6 }}>
                        <img src="/luna-logo.png" alt="Luna Logo" style={{ width: 44, height: 44, borderRadius: '20%' }} /> LUNA
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Connect through your cycle</div>
                </div>

                <div className="card" style={{ padding: '28px 24px', boxShadow: '0 16px 60px rgba(240,98,146,.12)' }}>

                    {/* Password Reset Mode */}
                    {showReset && (
                        <div className="anim-fade-up">
                            <button onClick={() => setShowReset(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 12, fontFamily: 'var(--font-sans)', marginBottom: 16 }}>← Back</button>
                            <div className="serif" style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>Reset Password</div>
                            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20 }}>We'll send a reset link to your email address.</div>
                            {resetSent ? (
                                <div style={{ padding: '14px 16px', background: 'rgba(105,240,174,.1)', border: '1px solid rgba(105,240,174,.3)', borderRadius: 'var(--r-md)', fontSize: 13, color: 'var(--mint)', textAlign: 'center' }}>
                                    ✓ Reset link sent to {resetEmail}. Check your inbox.
                                </div>
                            ) : (<>
                                <input value={resetEmail} onChange={e => setResetEmail(e.target.value)} type="email" placeholder="Your email address" style={inputStyle} />
                                <button onClick={handleReset} className="btn btn-primary" style={{ width: '100%', marginTop: 14, padding: 12 }}>Send Reset Link</button>
                            </>)}
                        </div>
                    )}

                    {!showReset && (<>
                        {/* Tab toggle */}
                        <div style={{ display: 'flex', background: 'var(--surface)', borderRadius: 'var(--r-lg)', padding: 4, marginBottom: 24 }}>
                            {['login', 'signup'].map(t => (
                                <button key={t} onClick={() => { setTab(t); setError(''); }} style={{ flex: 1, padding: '8px', borderRadius: 'var(--r-md)', border: 'none', cursor: 'pointer', background: tab === t ? 'var(--card)' : 'transparent', color: tab === t ? 'var(--text)' : 'var(--text-muted)', fontSize: 13, fontFamily: 'var(--font-sans)', fontWeight: tab === t ? 700 : 400, boxShadow: tab === t ? '0 1px 4px rgba(0,0,0,.3)' : 'none', transition: 'all .2s' }}>
                                    {t === 'login' ? '🔑 Log In' : '✨ Sign Up'}
                                </button>
                            ))}
                        </div>

                        {/* Google Sign-In */}
                        <button onClick={handleGoogleSignIn} disabled={loading} style={{ width: '100%', padding: '11px 16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-full)', cursor: 'pointer', display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'center', fontSize: 13, color: 'var(--text)', fontFamily: 'var(--font-sans)', fontWeight: 600, marginBottom: 16, transition: 'all .2s' }}>
                            <svg width="18" height="18" viewBox="0 0 18 18"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" /><path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853" /><path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" /><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" /></svg>
                            Continue with Google
                        </button>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>or</span>
                            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                        </div>

                        {/* Form */}
                        <form onSubmit={tab === 'login' ? handleLogin : handleSignup}>
                            {tab === 'signup' && (<>
                                <div style={{ marginBottom: 12 }}>
                                    <label style={labelStyle}>Your name</label>
                                    <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Priya Sharma" style={inputStyle} />
                                </div>
                                <div style={{ marginBottom: 12 }}>
                                    <label style={labelStyle}>Luna Name (shown in community)</label>
                                    <input value={lunaName} onChange={e => setLunaName(e.target.value.replace(/\s/g, ''))} placeholder="e.g. MoonRose_22" style={inputStyle} />
                                    <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>Anonymous — your real name is never shown in the feed.</div>
                                </div>
                            </>)}

                            <div style={{ marginBottom: 12 }}>
                                <label style={labelStyle}>Email</label>
                                <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="your@email.com" style={inputStyle} />
                            </div>

                            <div style={{ marginBottom: tab === 'login' ? 8 : 16 }}>
                                <label style={labelStyle}>Password</label>
                                <div style={{ position: 'relative' }}>
                                    <input value={password} onChange={e => setPassword(e.target.value)} type={showPass ? 'text' : 'password'} placeholder={tab === 'login' ? '••••••••' : 'Min. 8 characters'} style={{ ...inputStyle, paddingRight: 40 }} />
                                    <button type="button" onClick={() => setShowPass(s => !s)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 14 }}>
                                        {showPass ? '🙈' : '👁'}
                                    </button>
                                </div>
                            </div>

                            {tab === 'login' && (
                                <button type="button" onClick={() => setShowReset(true)} style={{ background: 'none', border: 'none', color: 'var(--rose-lite)', fontSize: 11, cursor: 'pointer', fontFamily: 'var(--font-sans)', marginBottom: 16, padding: 0 }}>Forgot password?</button>
                            )}

                            {tab === 'signup' && (
                                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 16 }}>
                                    <input type="checkbox" id="agree" checked={agree} onChange={e => setAgree(e.target.checked)} style={{ marginTop: 2, accentColor: 'var(--rose)' }} />
                                    <label htmlFor="agree" style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.6, cursor: 'pointer' }}>
                                        I agree to the <span style={{ color: 'var(--rose-lite)' }}>Terms of Service</span> and <span style={{ color: 'var(--rose-lite)' }}>Privacy Policy</span>. My cycle data is private and never shared.
                                    </label>
                                </div>
                            )}

                            {error && (
                                <div style={{ padding: '10px 12px', background: 'rgba(239,83,80,.1)', border: '1px solid rgba(239,83,80,.3)', borderRadius: 'var(--r-md)', fontSize: 12, color: '#ef9a9a', marginBottom: 12 }}>⚠ {error}</div>
                            )}

                            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: 13, fontSize: 14 }} disabled={loading}>
                                {loading ? '⏳ Please wait...' : tab === 'login' ? '🌸 Log In to LUNA' : '✨ Create my LUNA account'}
                            </button>
                        </form>

                        {/* Quick Testing Logins */}
                        {tab === 'login' && (
                            <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
                                <div style={{ fontSize: 11, color: 'var(--text-muted)', textAlign: 'center', marginBottom: 12, letterSpacing: '.05em', textTransform: 'uppercase' }}>Quick Testing Accounts</div>
                                <div style={{ display: 'flex', gap: 10 }}>
                                    <button onClick={() => handleQuickLogin('admin')} disabled={loading} style={{ flex: 1, padding: '9px 12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', color: 'var(--text)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)', transition: 'all .2s' }}>
                                        🛡 Admin
                                    </button>
                                    <button onClick={() => handleQuickLogin('guest')} disabled={loading} style={{ flex: 1, padding: '9px 12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', color: 'var(--text)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)', transition: 'all .2s' }}>
                                        👋 Guest
                                    </button>
                                </div>
                            </div>
                        )}
                    </>)}
                </div>

                <div style={{ textAlign: 'center', marginTop: 16, fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.8 }}>
                    🔒 Your data is encrypted & never sold.<br />
                    LUNA is funded by subscriptions, never by ads.
                </div>
            </div>
        </div>
    );
}

const inputStyle = {
    width: '100%', padding: '10px 14px', background: 'var(--surface)',
    border: '1px solid var(--border)', borderRadius: 'var(--r-md)',
    color: 'var(--text)', fontSize: 13, fontFamily: 'var(--font-sans)',
    outline: 'none', boxSizing: 'border-box',
};
const labelStyle = {
    display: 'block', fontSize: 11, color: 'var(--text-muted)',
    letterSpacing: '.07em', textTransform: 'uppercase', marginBottom: 6,
};
