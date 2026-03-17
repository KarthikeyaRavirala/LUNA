import { useState } from "react";

const C = {
  bg: "#f9f6f2",
  surface: "#ffffff",
  card: "#fdfaf7",
  border: "#ede8e0",
  rose: "#c2185b",
  roseDark: "#880e4f",
  roseLight: "#fce4ec",
  teal: "#00695c",
  tealLight: "#e0f2f1",
  gold: "#e65100",
  goldLight: "#fff3e0",
  blue: "#1565c0",
  blueLight: "#e3f2fd",
  purple: "#6a1b9a",
  purpleLight: "#f3e5f5",
  ink: "#1c1410",
  inkDim: "#5c4a3a",
  inkMuted: "#9c8a7a",
  green: "#2e7d32",
  greenLight: "#e8f5e9",
};

const phases = [
  {
    id: "phase0", number: "00", title: "Foundation Setup", duration: "Week 1–2", color: C.blue,
    light: C.blueLight, icon: "🏗️", status: "start",
    desc: "Everything you need before writing a single line of code.",
    sections: [
      {
        title: "Tools & Accounts to Create",
        items: [
          { task: "Create GitHub account (free) — stores all your code", link: "github.com", done: false },
          { task: "Create Vercel account (free) — hosts your web app online", link: "vercel.com", done: false },
          { task: "Create Supabase account (free) — your database + auth", link: "supabase.com", done: false },
          { task: "Create Google Cloud Console account — for Google integrations", link: "console.cloud.google.com", done: false },
          { task: "Create Figma account (free) — for design tweaks", link: "figma.com", done: false },
          { task: "Install VS Code on your laptop — code editor", link: "code.visualstudio.com", done: false },
          { task: "Install Node.js (LTS version) on your laptop", link: "nodejs.org", done: false },
        ]
      },
      {
        title: "Google API Setup (for Calendar, Fit, Sign-in)",
        items: [
          { task: "Go to Google Cloud Console → Create new project named 'LUNA'", done: false },
          { task: "Enable Google Calendar API in the project", done: false },
          { task: "Enable Google Fit API in the project", done: false },
          { task: "Enable Google OAuth 2.0 (for Sign in with Google)", done: false },
          { task: "Create OAuth credentials — copy Client ID & Client Secret", done: false },
          { task: "Add your Vercel domain to OAuth allowed origins (after deployment)", done: false },
        ]
      },
      {
        title: "Domain & Branding",
        items: [
          { task: "Buy domain: luna.app or tryluna.in or lunacycle.in (~₹800/year)", done: false },
          { task: "Set up professional email: hello@yourdomain.com via Google Workspace", done: false },
          { task: "Export LUNA logo from Figma (we'll design this)", done: false },
          { task: "Choose brand fonts: Libre Baskerville (headings) + Sora (body)", done: false },
        ]
      }
    ]
  },
  {
    id: "phase1", number: "01", title: "Tech Stack Decision", duration: "Week 2", color: C.purple,
    light: C.purpleLight, icon: "⚙️", status: "decide",
    desc: "Since you're building it yourself, here's the exact stack recommended for LUNA.",
    sections: [
      {
        title: "Frontend (What users see)",
        items: [
          { task: "Framework: React.js + Vite — fast, beginner-friendly, huge community", done: false },
          { task: "Styling: Tailwind CSS — responsive design without writing much CSS", done: false },
          { task: "Routing: React Router v6 — handles page navigation", done: false },
          { task: "State Management: Zustand — simple global state (user, phase, cohort data)", done: false },
          { task: "Animations: Framer Motion — smooth transitions between screens", done: false },
          { task: "Icons: Lucide React — clean icon library", done: false },
        ]
      },
      {
        title: "Backend (What runs behind the scenes)",
        items: [
          { task: "Database + Auth: Supabase (PostgreSQL) — handles users, posts, messages", done: false },
          { task: "Real-time chat: Supabase Realtime — powers Luna Rooms live chat", done: false },
          { task: "File Storage: Supabase Storage — profile photos, post images", done: false },
          { task: "Push Notifications: Firebase Cloud Messaging (FCM) — cycle alerts", done: false },
          { task: "Email: Resend.com — sends onboarding, alert, and reminder emails", done: false },
        ]
      },
      {
        title: "Google Integrations",
        items: [
          { task: "Google Sign-In: @react-oauth/google npm package", done: false },
          { task: "Google Calendar Sync: googleapis npm package (Node.js backend function)", done: false },
          { task: "Google Fit: REST API calls via Supabase Edge Functions", done: false },
          { task: "Google Reminders: Google Tasks API (same credentials as Calendar)", done: false },
        ]
      },
      {
        title: "Deployment",
        items: [
          { task: "Web App Hosting: Vercel (free tier, auto-deploys from GitHub)", done: false },
          { task: "Backend Functions: Supabase Edge Functions (serverless)", done: false },
          { task: "CI/CD: GitHub Actions — auto-test and deploy on every code push", done: false },
        ]
      }
    ]
  },
  {
    id: "phase2", number: "02", title: "Database Design", duration: "Week 3", color: C.teal,
    light: C.tealLight, icon: "🗄️", status: "build",
    desc: "Design the tables that store all LUNA data before writing any app code.",
    sections: [
      {
        title: "Core Tables to Create in Supabase",
        items: [
          { task: "users — id, name, luna_name, email, avatar, created_at, phase_start_dates[]", done: false },
          { task: "cycles — id, user_id, start_date, end_date, cycle_length, phase_day", done: false },
          { task: "cohorts — id, phase_window_start, phase_window_end, member_ids[]", done: false },
          { task: "posts — id, user_id, content, tags[], likes_count, phase, created_at", done: false },
          { task: "comments — id, post_id, user_id, content, created_at", done: false },
          { task: "messages — id, cohort_id, user_id, text, created_at (for Luna Rooms)", done: false },
          { task: "wellness_logs — id, user_id, date, mood, energy, water, sleep, habits[]", done: false },
          { task: "notifications — id, user_id, type, message, read, created_at", done: false },
          { task: "partner_bridge — id, user_id, partner_email, ping_sent, hangout_group_id", done: false },
        ]
      },
      {
        title: "Row Level Security (Privacy Rules)",
        items: [
          { task: "Users can only read their own cycle data", done: false },
          { task: "Users can only read messages in their own cohort", done: false },
          { task: "Posts are visible to cohort members only (private) or all (public)", done: false },
          { task: "Partner bridge data: only visible to the user who created it", done: false },
          { task: "Wellness logs: strictly private, user-only access", done: false },
        ]
      }
    ]
  },
  {
    id: "phase3", number: "03", title: "Authentication & Onboarding", duration: "Week 4–5", color: C.rose,
    light: C.roseLight, icon: "🔐", status: "build",
    desc: "First screens users see — sign up, login, and cycle setup.",
    sections: [
      {
        title: "Auth Screens to Build",
        items: [
          { task: "Landing page — hero, features, CTA ('Join LUNA')", done: false },
          { task: "Sign Up screen — name, email, password + Google Sign-in button", done: false },
          { task: "Login screen — email/password + Google Sign-in + forgot password", done: false },
          { task: "Email verification flow — Supabase handles this automatically", done: false },
          { task: "Password reset screen", done: false },
        ]
      },
      {
        title: "Onboarding Flow (5 steps)",
        items: [
          { task: "Step 1: 'Choose your Luna Name' — anonymous identity setup", done: false },
          { task: "Step 2: 'Tell us about your cycle' — enter last 3 period start dates", done: false },
          { task: "Step 3: Cycle length input (average) — default 28 days, adjustable", done: false },
          { task: "Step 4: 'Connect Google' — optional Calendar + Fit + Reminders auth", done: false },
          { task: "Step 5: 'Meet your Cohort' — show matched cohort members (animated)", done: false },
          { task: "Cohort matching algorithm — group users with ±3 day phase overlap", done: false },
        ]
      },
      {
        title: "Google Sign-in Integration",
        items: [
          { task: "Install @react-oauth/google package", done: false },
          { task: "Wrap app in GoogleOAuthProvider with your Client ID", done: false },
          { task: "Handle Google token → Supabase session exchange", done: false },
          { task: "Store Google refresh token for Calendar API calls later", done: false },
        ]
      }
    ]
  },
  {
    id: "phase4", number: "04", title: "Social Feed + Luna Rooms", duration: "Week 6–8", color: C.gold,
    light: C.goldLight, icon: "💬", status: "build",
    desc: "The heart of the social experience — feed, posting, and real-time cohort chat.",
    sections: [
      {
        title: "Social Feed",
        items: [
          { task: "Feed layout — responsive 3-col (desktop), 2-col (tablet), 1-col (mobile)", done: false },
          { task: "Post card component — avatar, phase tag, content, images, tags, actions", done: false },
          { task: "Create post modal — text, image upload, tag selector, phase auto-tag", done: false },
          { task: "Like, comment, repost, save functionality", done: false },
          { task: "Stories bar at top — 24hr disappearing updates", done: false },
          { task: "Feed filter — All / My Cohort / Following / Trending", done: false },
          { task: "Infinite scroll pagination (load 10 posts at a time)", done: false },
          { task: "Phase tag filtering — see only Luteal posts etc.", done: false },
        ]
      },
      {
        title: "Luna Rooms (Real-time Chat)",
        items: [
          { task: "Supabase Realtime subscription setup for cohort messages", done: false },
          { task: "Chat UI — message bubbles, timestamps, read receipts", done: false },
          { task: "Room activation logic — opens when 2+ members enter same phase window", done: false },
          { task: "Room expiry — auto-closes after phase ends, messages archived", done: false },
          { task: "Typing indicator ('MoonRose is typing...')", done: false },
          { task: "Emoji reactions on messages", done: false },
          { task: "Media sharing in rooms (images, GIFs)", done: false },
          { task: "Room member list sidebar (desktop) / bottom sheet (mobile)", done: false },
        ]
      },
      {
        title: "Explore & Search",
        items: [
          { task: "Search bar — users, posts, tags, spaces", done: false },
          { task: "Luna Spaces grid — Craving Kitchen, Calm Corner, Vent Space etc.", done: false },
          { task: "Trending hashtags section", done: false },
          { task: "Cohort finder CTA", done: false },
        ]
      }
    ]
  },
  {
    id: "phase5", number: "05", title: "Wellness Hub", duration: "Week 9–11", color: C.green,
    light: C.greenLight, icon: "🌿", status: "build",
    desc: "Exercise, food, habits, affirmations — all phase-synced.",
    sections: [
      {
        title: "Phase Dashboard",
        items: [
          { task: "Current phase card — phase name, day, energy bar, mood", done: false },
          { task: "Phase cycle wheel — visual 28-day cycle indicator", done: false },
          { task: "Phase transition notifications — 'You're entering Luteal phase tomorrow'", done: false },
          { task: "Confidence card — daily affirmation, tappable reveal", done: false },
        ]
      },
      {
        title: "Exercise Module",
        items: [
          { task: "Phase-based exercise cards — 3 routines per phase", done: false },
          { task: "Exercise detail modal — steps, duration, intensity, benefits", done: false },
          { task: "'Start Workout' timer — built-in countdown", done: false },
          { task: "Google Fit sync — log completed workout automatically", done: false },
          { task: "Streak tracker — days exercised this cycle", done: false },
        ]
      },
      {
        title: "Nutrition Module",
        items: [
          { task: "Daily food card — 'What to eat today' based on cycle day", done: false },
          { task: "Craving decoder — select craving → get nutritional explanation", done: false },
          { task: "Craving Kitchen — community recipe feed, phase-filtered", done: false },
          { task: "Weekly grocery list generator — export to Google Tasks", done: false },
          { task: "Foods to avoid warnings — displayed during sensitive phases", done: false },
        ]
      },
      {
        title: "Daily Habits Module",
        items: [
          { task: "3 daily micro-habit cards — phase-specific", done: false },
          { task: "Check-in widget — tap to mark habit done", done: false },
          { task: "Water tracker — tap glasses, phase target shown", done: false },
          { task: "Sleep logger — input hrs, get phase-aware tip", done: false },
          { task: "Google Calendar block — auto-add 'Recovery Time' during luteal/menstrual", done: false },
          { task: "Google Reminders — set daily habit reminders via Google Tasks API", done: false },
        ]
      },
      {
        title: "Luna Journal",
        items: [
          { task: "Private journal entry screen — rich text editor", done: false },
          { task: "Phase auto-tag on each entry", done: false },
          { task: "Mood selector — emoji-based daily mood log", done: false },
          { task: "Monthly pattern view — mood calendar heatmap", done: false },
          { task: "Doctor export — generate PDF summary of last 3 cycles", done: false },
        ]
      }
    ]
  },
  {
    id: "phase6", number: "06", title: "Missed Cycle Alerts", duration: "Week 12", color: C.purple,
    light: C.purpleLight, icon: "📅", status: "build",
    desc: "Smart, compassionate cycle monitoring with tiered alerts.",
    sections: [
      {
        title: "Alert Logic to Build",
        items: [
          { task: "Background job (Supabase cron) — runs daily, checks all user expected cycle dates", done: false },
          { task: "Day 0: 'Period due in 2 days' — Google Reminder + in-app notification", done: false },
          { task: "Day +3: 'Period due today' — gentle in-app card", done: false },
          { task: "Day +5: 'A little late' — compassionate explanation card + cohort prompt", done: false },
          { task: "Day +7: 'Check-in time' — home test reminder + doctor finder link", done: false },
          { task: "Day +10: 'We're with you' — emotional support card + doctor referral", done: false },
          { task: "Irregular cycle detector — flags if 3+ cycles deviate >7 days from average", done: false },
        ]
      },
      {
        title: "Notification Channels",
        items: [
          { task: "In-app notification bell — badge count, notification feed", done: false },
          { task: "Push notifications via Firebase (browser + mobile web)", done: false },
          { task: "Email alerts via Resend.com — styled HTML email templates", done: false },
          { task: "Google Calendar event — 'Expected Period' auto-added each cycle", done: false },
          { task: "User can customise — which alerts, which channels, snooze options", done: false },
        ]
      }
    ]
  },
  {
    id: "phase7", number: "07", title: "Google Integrations", duration: "Week 13–14", color: C.blue,
    light: C.blueLight, icon: "🔗", status: "build",
    desc: "Deep integration with Google's ecosystem — the feature that makes LUNA indispensable.",
    sections: [
      {
        title: "Google Sign-In",
        items: [
          { task: "One-tap Google login on web and mobile web", done: false },
          { task: "Auto-fill name + profile photo from Google account", done: false },
          { task: "Store OAuth tokens securely in Supabase (encrypted)", done: false },
        ]
      },
      {
        title: "Google Calendar",
        items: [
          { task: "On connect: ask permission to add events to user's calendar", done: false },
          { task: "Auto-create 'Menstrual Phase' event each cycle (private, colour-coded red)", done: false },
          { task: "Auto-create 'Luteal Phase' event (private, colour-coded pink)", done: false },
          { task: "Auto-block 'Recovery Time' slots during luteal days 24–28", done: false },
          { task: "Peak Performance days highlighted (follicular + ovulatory)", done: false },
          { task: "User can toggle each calendar event type on/off in settings", done: false },
        ]
      },
      {
        title: "Google Reminders / Tasks",
        items: [
          { task: "Daily habit reminders pushed to Google Tasks", done: false },
          { task: "Grocery list from Craving Kitchen → synced to Google Tasks", done: false },
          { task: "Medication / supplement reminders (magnesium, iron etc.)", done: false },
          { task: "Doctor appointment follow-up reminder", done: false },
        ]
      },
      {
        title: "Google Fit",
        items: [
          { task: "Read step count + active minutes from Google Fit", done: false },
          { task: "Display fitness data on Wellness Hub dashboard", done: false },
          { task: "Write completed LUNA workouts back to Google Fit", done: false },
          { task: "Phase-aware fitness insights — 'You walked 20% less in luteal — that's normal'", done: false },
        ]
      }
    ]
  },
  {
    id: "phase8", number: "08", title: "Profile & Settings", duration: "Week 15", color: C.teal,
    light: C.tealLight, icon: "👤", status: "build",
    desc: "User profile, privacy controls, partner bridge, and app settings.",
    sections: [
      {
        title: "Profile Screen",
        items: [
          { task: "Profile header — avatar, luna name, phase badge, location, bio", done: false },
          { task: "Stats row — cycles logged, room hours, posts, cohort friends", done: false },
          { task: "Cycle wheel — 4-phase visual overview with current phase highlighted", done: false },
          { task: "Recent posts grid", done: false },
          { task: "Edit profile modal", done: false },
        ]
      },
      {
        title: "Partner Bridge",
        items: [
          { task: "Add partner email — sends gentle ping during luteal/menstrual", done: false },
          { task: "Partner receives email: 'She needs extra care this week' (no details)", done: false },
          { task: "Husband Hangout group — partner gets matched into activity group", done: false },
          { task: "Toggle — user controls if/when partner is notified", done: false },
        ]
      },
      {
        title: "Privacy & Settings",
        items: [
          { task: "Privacy controls — who sees phase status, posts, cohort membership", done: false },
          { task: "Notification preferences — which alerts, which channels", done: false },
          { task: "Google integrations manager — connect/disconnect each service", done: false },
          { task: "Data export — download all personal data as JSON/PDF", done: false },
          { task: "Account deletion — full data wipe with confirmation", done: false },
          { task: "Anonymous mode toggle — hide identity from feed (luna name only)", done: false },
        ]
      }
    ]
  },
  {
    id: "phase9", number: "09", title: "Responsive Design & Testing", duration: "Week 16–17", color: C.gold,
    light: C.goldLight, icon: "📱", status: "test",
    desc: "Make LUNA pixel-perfect on every screen size, then test everything.",
    sections: [
      {
        title: "Responsive Breakpoints",
        items: [
          { task: "Mobile (320px–767px) — single column, bottom nav bar", done: false },
          { task: "Tablet (768px–1023px) — 2-column layout, side panels collapse", done: false },
          { task: "Laptop (1024px–1439px) — 3-column layout, persistent sidebar", done: false },
          { task: "Desktop (1440px+) — wide layout, max-width container centred", done: false },
          { task: "Test on: iPhone 13/14, Samsung Galaxy, iPad, MacBook, Windows laptop", done: false },
        ]
      },
      {
        title: "Testing Checklist",
        items: [
          { task: "Auth flow — sign up, login, Google sign-in, password reset", done: false },
          { task: "Onboarding — full 5-step flow, cohort matching", done: false },
          { task: "Feed — post, like, comment, save, share", done: false },
          { task: "Luna Room — real-time messages between 2 browser tabs", done: false },
          { task: "Wellness — all 4 phases, exercise, food, habits, journal", done: false },
          { task: "Missed cycle alerts — simulate delayed cycle in database", done: false },
          { task: "Google Calendar — events created correctly after connect", done: false },
          { task: "Google Fit — data reads/writes correctly", done: false },
          { task: "Notifications — push, email, in-app all fire correctly", done: false },
          { task: "Privacy — confirm Row Level Security works (users can't see others' data)", done: false },
        ]
      }
    ]
  },
  {
    id: "phase10", number: "10", title: "Launch Preparation", duration: "Week 18–20", color: C.rose,
    light: C.roseLight, icon: "🚀", status: "launch",
    desc: "Final steps before going live with your first 100 users in Hyderabad.",
    sections: [
      {
        title: "Pre-Launch",
        items: [
          { task: "Set up analytics — Posthog (free, privacy-friendly)", done: false },
          { task: "Set up error monitoring — Sentry (free tier)", done: false },
          { task: "Write Privacy Policy — use iubenda.com generator (₹0)", done: false },
          { task: "Write Terms of Service", done: false },
          { task: "GDPR/DPDP compliance review for Indian users", done: false },
          { task: "Performance audit — Lighthouse score >90 on mobile", done: false },
          { task: "SEO basics — meta tags, Open Graph, sitemap", done: false },
        ]
      },
      {
        title: "Beta Launch (100 Users)",
        items: [
          { task: "Identify 100 working women in Hyderabad IT parks / co-working spaces", done: false },
          { task: "Create waitlist landing page — collect emails before launch", done: false },
          { task: "Send personalised invite emails to beta users via Resend", done: false },
          { task: "Set up feedback channel — WhatsApp group or Discord server", done: false },
          { task: "Weekly feedback review — fix top 3 issues each week", done: false },
          { task: "Track: Day-7 retention, Luna Room usage, Google Calendar connects", done: false },
        ]
      },
      {
        title: "Mobile App (Phase 2)",
        items: [
          { task: "Convert web app to React Native using Expo", done: false },
          { task: "iOS App Store submission — Apple Developer account (₹8,000/year)", done: false },
          { task: "Google Play Store submission — Developer account ($25 one-time)", done: false },
          { task: "Push notifications via Expo + Firebase", done: false },
          { task: "Offline mode — cache wellness data locally", done: false },
        ]
      }
    ]
  }
];

const statusColors = {
  start: C.blue, decide: C.purple, build: C.teal, test: C.gold, launch: C.rose
};
const statusLabels = {
  start: "SETUP", decide: "DECIDE", build: "BUILD", test: "TEST", launch: "LAUNCH"
};

function ProgressRing({ done, total, color, size = 48 }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={`${color}22`} strokeWidth={5} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={5}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.5s ease" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color }}>
        {pct}%
      </div>
    </div>
  );
}

export default function LunaImplementationPlan() {
  const [taskState, setTaskState] = useState(() => {
    const s = {};
    phases.forEach(p => p.sections.forEach(sec => sec.items.forEach((item, i) => {
      s[`${p.id}-${sec.title}-${i}`] = false;
    })));
    return s;
  });
  const [openPhase, setOpenPhase] = useState("phase0");
  const [filterStatus, setFilterStatus] = useState("all");

  const toggleTask = (key) => setTaskState(s => ({ ...s, [key]: !s[key] }));

  const getPhaseStats = (phase) => {
    let done = 0, total = 0;
    phase.sections.forEach(sec => sec.items.forEach((_, i) => {
      const key = `${phase.id}-${sec.title}-${i}`;
      total++;
      if (taskState[key]) done++;
    }));
    return { done, total };
  };

  const totalStats = phases.reduce((acc, p) => {
    const s = getPhaseStats(p);
    return { done: acc.done + s.done, total: acc.total + s.total };
  }, { done: 0, total: 0 });

  const filteredPhases = filterStatus === "all" ? phases : phases.filter(p => p.status === filterStatus);

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Georgia', serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }
        .task-row:hover { background: #f5f0eb !important; }
        .phase-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.08) !important; }
      `}</style>

      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${C.roseDark} 0%, ${C.rose} 100%)`, padding: "clamp(32px,5vw,56px) clamp(16px,4vw,48px) 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 280, height: 280, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
        <div style={{ position: "absolute", bottom: 20, left: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", marginBottom: 10, fontFamily: "'DM Sans', sans-serif" }}>LUNA · Complete Build Plan</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,4vw,52px)", fontWeight: 700, color: "white", lineHeight: 1.15, marginBottom: 16 }}>
            Your Project Implementation<br /><em>Bible</em>
          </h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.82)", maxWidth: 560, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif", fontWeight: 300, marginBottom: 28 }}>
            11 phases · 20 weeks · Everything you need to build LUNA from scratch to launch — solo.
          </p>

          {/* Overall progress */}
          <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap", paddingBottom: 28 }}>
            <ProgressRing done={totalStats.done} total={totalStats.total} color="white" size={64} />
            <div>
              <div style={{ fontSize: 28, fontWeight: 700, color: "white", fontFamily: "'Playfair Display', serif" }}>{totalStats.done} / {totalStats.total}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans', sans-serif" }}>tasks completed overall</div>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {["all", "start", "decide", "build", "test", "launch"].map(s => (
                <button key={s} onClick={() => setFilterStatus(s)} style={{
                  padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer",
                  background: filterStatus === s ? "white" : "rgba(255,255,255,0.2)",
                  color: filterStatus === s ? C.rose : "white",
                  fontSize: 11, fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
                  textTransform: "uppercase", letterSpacing: "0.08em",
                }}>{s === "all" ? "All Phases" : statusLabels[s]}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Phase timeline strip */}
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, overflowX: "auto", scrollbarWidth: "none" }}>
        <div style={{ display: "flex", maxWidth: 1100, margin: "0 auto", padding: "0 clamp(16px,4vw,48px)" }}>
          {phases.map((p, i) => {
            const s = getPhaseStats(p);
            const pct = s.total ? Math.round((s.done / s.total) * 100) : 0;
            return (
              <button key={p.id} onClick={() => setOpenPhase(openPhase === p.id ? null : p.id)} style={{
                padding: "12px 16px", background: "none", border: "none", cursor: "pointer",
                borderBottom: openPhase === p.id ? `3px solid ${p.color}` : "3px solid transparent",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flexShrink: 0,
              }}>
                <span style={{ fontSize: 16 }}>{p.icon}</span>
                <span style={{ fontSize: 10, color: openPhase === p.id ? p.color : C.inkMuted, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}>{p.number}</span>
                {pct > 0 && <div style={{ width: 28, height: 3, background: `${p.color}33`, borderRadius: 2 }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: p.color, borderRadius: 2 }} />
                </div>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Phase cards */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px clamp(16px,4vw,48px) 64px" }}>
        {filteredPhases.map((phase) => {
          const stats = getPhaseStats(phase);
          const isOpen = openPhase === phase.id;
          return (
            <div key={phase.id} className="phase-card" style={{ background: C.surface, border: `1px solid ${isOpen ? phase.color + "66" : C.border}`, borderRadius: 18, marginBottom: 14, overflow: "hidden", transition: "all 0.2s", boxShadow: isOpen ? `0 4px 24px ${phase.color}18` : "none" }}>

              {/* Phase header */}
              <div onClick={() => setOpenPhase(isOpen ? null : phase.id)} style={{ padding: "20px 24px", display: "flex", gap: 16, alignItems: "center", cursor: "pointer", background: isOpen ? `${phase.color}07` : "transparent" }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: `${phase.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{phase.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", color: phase.color, background: `${phase.color}15`, padding: "2px 10px", borderRadius: 20, fontFamily: "'DM Sans', sans-serif" }}>
                      PHASE {phase.number} · {statusLabels[phase.status]}
                    </span>
                    <span style={{ fontSize: 12, color: C.inkMuted, fontFamily: "'DM Sans', sans-serif" }}>{phase.duration}</span>
                  </div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(16px,2.5vw,20px)", fontWeight: 700, color: C.ink, margin: 0 }}>{phase.title}</h2>
                  <p style={{ fontSize: 13, color: C.inkDim, marginTop: 3, fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>{phase.desc}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                  <ProgressRing done={stats.done} total={stats.total} color={phase.color} size={48} />
                  <span style={{ fontSize: 20, color: C.inkMuted, transition: "transform 0.25s", transform: isOpen ? "rotate(180deg)" : "none" }}>⌄</span>
                </div>
              </div>

              {/* Phase content */}
              {isOpen && (
                <div style={{ padding: "0 24px 24px", borderTop: `1px solid ${C.border}` }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%,400px),1fr))", gap: 16, marginTop: 20 }}>
                    {phase.sections.map((sec) => (
                      <div key={sec.title} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
                        <div style={{ padding: "12px 16px", background: `${phase.color}0a`, borderBottom: `1px solid ${C.border}` }}>
                          <span style={{ fontSize: 12, fontWeight: 600, color: phase.color, fontFamily: "'DM Sans', sans-serif" }}>{sec.title}</span>
                        </div>
                        <div>
                          {sec.items.map((item, i) => {
                            const key = `${phase.id}-${sec.title}-${i}`;
                            const done = taskState[key];
                            return (
                              <div key={i} className="task-row" onClick={() => toggleTask(key)} style={{ display: "flex", gap: 12, padding: "10px 16px", borderBottom: i < sec.items.length - 1 ? `1px solid ${C.border}` : "none", cursor: "pointer", background: done ? `${phase.color}05` : "transparent", transition: "background 0.15s", alignItems: "flex-start" }}>
                                <div style={{ width: 18, height: 18, borderRadius: 5, border: `2px solid ${done ? phase.color : C.border}`, background: done ? phase.color : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1, transition: "all 0.2s" }}>
                                  {done && <span style={{ color: "white", fontSize: 10 }}>✓</span>}
                                </div>
                                <div style={{ flex: 1 }}>
                                  <span style={{ fontSize: 13, color: done ? C.inkMuted : C.inkDim, textDecoration: done ? "line-through" : "none", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>{item.task}</span>
                                  {item.link && !done && (
                                    <div style={{ fontSize: 11, color: phase.color, marginTop: 2, fontFamily: "'DM Sans', sans-serif" }}>→ {item.link}</div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Tech stack summary card */}
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 18, padding: "28px", marginTop: 8 }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, marginBottom: 20, color: C.ink }}>⚡ Complete Tech Stack at a Glance</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
            {[
              { cat: "Frontend", color: C.rose, items: ["React + Vite", "Tailwind CSS", "Framer Motion", "React Router"] },
              { cat: "Backend", color: C.teal, items: ["Supabase (DB + Auth)", "Supabase Realtime", "Edge Functions", "Firebase FCM"] },
              { cat: "Google APIs", color: C.blue, items: ["Google OAuth", "Calendar API", "Google Fit API", "Tasks API"] },
              { cat: "Hosting", color: C.purple, items: ["Vercel (web)", "GitHub (code)", "Supabase (data)", "Resend (email)"] },
              { cat: "Tools", color: C.gold, items: ["VS Code", "Figma", "Postman", "Sentry + Posthog"] },
            ].map((s, i) => (
              <div key={i} style={{ padding: "14px", background: `${s.color}08`, border: `1px solid ${s.color}22`, borderRadius: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: s.color, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>{s.cat}</div>
                {s.items.map(item => (
                  <div key={item} style={{ fontSize: 12, color: C.inkDim, marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>✦ {item}</div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Timeline summary */}
        <div style={{ background: `linear-gradient(135deg, ${C.roseDark}15, ${C.rose}08)`, border: `1px solid ${C.rose}33`, borderRadius: 18, padding: "28px", marginTop: 14 }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, marginBottom: 16, color: C.ink }}>📅 20-Week Timeline Summary</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { weeks: "Week 1–2", label: "Setup all tools, accounts, Google APIs, domain", color: C.blue },
              { weeks: "Week 3", label: "Design database tables in Supabase", color: C.purple },
              { weeks: "Week 4–5", label: "Build auth screens + onboarding + cohort matching", color: C.rose },
              { weeks: "Week 6–8", label: "Build social feed + Luna Rooms real-time chat", color: C.gold },
              { weeks: "Week 9–11", label: "Build wellness hub — exercise, food, habits, journal", color: C.green },
              { weeks: "Week 12", label: "Build missed cycle alert system + notifications", color: C.purple },
              { weeks: "Week 13–14", label: "Connect all Google APIs (Calendar, Fit, Tasks)", color: C.blue },
              { weeks: "Week 15", label: "Profile, partner bridge, privacy settings", color: C.teal },
              { weeks: "Week 16–17", label: "Responsive design polish + full testing", color: C.gold },
              { weeks: "Week 18–20", label: "Launch prep → beta with 100 Hyderabad women", color: C.rose },
            ].map((row, i) => (
              <div key={i} style={{ display: "flex", gap: 14, alignItems: "center", padding: "10px 14px", background: "white", borderRadius: 10, border: `1px solid ${C.border}` }}>
                <div style={{ minWidth: 80, fontSize: 11, fontWeight: 700, color: row.color, fontFamily: "'DM Sans', sans-serif" }}>{row.weeks}</div>
                <div style={{ width: 1, height: 20, background: C.border }} />
                <div style={{ fontSize: 13, color: C.inkDim, fontFamily: "'DM Sans', sans-serif" }}>{row.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
