import { useState } from "react";

const C = {
  bg: "#07090f",
  surface: "#0f1219",
  card: "#161b26",
  cardHover: "#1c2333",
  border: "#1e2738",
  borderHover: "#2e3d55",
  rose: "#f472b6",
  roseDark: "#be185d",
  roseGlow: "#f472b640",
  blue: "#60a5fa",
  blueDark: "#1d4ed8",
  blueGlow: "#60a5fa30",
  green: "#34d399",
  greenDark: "#065f46",
  greenGlow: "#34d39930",
  yellow: "#fbbf24",
  yellowDark: "#92400e",
  purple: "#a78bfa",
  purpleDark: "#4c1d95",
  red: "#f87171",
  text: "#f0f4ff",
  textDim: "#8892b0",
  textMuted: "#4a5568",
  googleBlue: "#4285F4",
  googleRed: "#EA4335",
  googleYellow: "#FBBC05",
  googleGreen: "#34A853",
};

const integrations = [
  {
    id: "signin",
    icon: "🔐",
    name: "Google Sign-In",
    color: C.googleBlue,
    glow: "#4285F420",
    tagline: "One tap to join LUNA — no passwords needed",
    whatItDoes: "Allows users to create and log into their LUNA account using their existing Google account. No separate password needed. Secure, fast, and trusted.",
    howItWorks: [
      { step: "1", title: "User clicks 'Continue with Google'", desc: "LUNA redirects to Google's secure OAuth 2.0 login page" },
      { step: "2", title: "Google authenticates the user", desc: "Google verifies identity and asks permission to share basic profile info (name, email, photo)" },
      { step: "3", title: "Token returned to LUNA", desc: "Google sends a secure access token back to LUNA confirming the user's identity" },
      { step: "4", title: "LUNA creates/loads the account", desc: "LUNA uses the token to create a new account or log into an existing one — instantly" },
    ],
    techStack: "Google Identity Services (GIS) SDK · OAuth 2.0 · JWT tokens",
    privacyNote: "LUNA only receives your name, email, and profile photo. Your Google password is never shared with LUNA.",
    difficulty: "Easy",
    diffColor: C.green,
    apiName: "Google Identity Services API",
    setupSteps: ["Enable Google Identity API in Google Cloud Console", "Get OAuth Client ID", "Add GIS script to frontend", "Handle credential callback in backend"],
    userBenefit: "Reduces signup friction by 70%. Women are more likely to try the app when login is one tap.",
  },
  {
    id: "calendar",
    icon: "📅",
    name: "Google Calendar",
    color: C.googleBlue,
    glow: "#4285F420",
    tagline: "Your cycle phases silently block time in your work calendar",
    whatItDoes: "LUNA automatically creates private, colour-coded calendar events for each cycle phase. Luteal days show as 'Focus Time' blocks. Ovulatory days show as ideal meeting windows. Your colleagues only see neutral labels — never personal details.",
    howItWorks: [
      { step: "1", title: "User connects Google Calendar", desc: "LUNA requests 'calendar.events' permission via OAuth. User approves once." },
      { step: "2", title: "LUNA calculates phases", desc: "Based on logged cycle data, LUNA predicts the next 3 months of phase windows" },
      { step: "3", title: "Events created automatically", desc: "LUNA uses Google Calendar API to create private events: 'Focus Block 🌸', 'Peak Energy Day ⚡', 'Rest Recommended 🌑'" },
      { step: "4", title: "Smart scheduling suggestions", desc: "Before creating a calendar event, LUNA warns: 'This falls in your luteal phase — consider rescheduling high-stress tasks'" },
    ],
    techStack: "Google Calendar API v3 · OAuth 2.0 · Recurring event creation",
    privacyNote: "Events are created in a private LUNA calendar. Only YOU can see the phase details. Others see only neutral block titles.",
    difficulty: "Medium",
    diffColor: C.yellow,
    apiName: "Google Calendar API",
    setupSteps: ["Enable Calendar API in Google Cloud Console", "Request calendar.events scope during OAuth", "Use events.insert() to create phase blocks", "Use events.delete() if user disconnects"],
    userBenefit: "Working women can plan presentations, reviews, and deadlines around their peak performance days — automatically.",
  },
  {
    id: "tasks",
    icon: "✅",
    name: "Google Reminders & Tasks",
    color: C.googleGreen,
    glow: "#34A85320",
    tagline: "Phase-aware daily reminders that arrive exactly when needed",
    whatItDoes: "LUNA creates smart reminders in Google Tasks and sends phase-timed notifications. Luteal phase: 'Take your magnesium 💊', 'Drink warm water 💧', 'Journal tonight 📓'. Follicular phase: 'Great day to tackle that project ⚡'. Every reminder is timed to when it will actually help.",
    howItWorks: [
      { step: "1", title: "User enables reminders in LUNA settings", desc: "User chooses which reminder types they want: wellness, habits, cycle alerts" },
      { step: "2", title: "LUNA calculates current phase", desc: "On each new day, LUNA checks which phase the user is in" },
      { step: "3", title: "Tasks created via API", desc: "Google Tasks API creates dated tasks with phase-specific content for the day" },
      { step: "4", title: "Google sends the reminder", desc: "User receives the reminder through Google's native notification system on phone/laptop" },
    ],
    techStack: "Google Tasks API · Google Calendar Reminders · Push notifications",
    privacyNote: "Task titles are generic wellness reminders. No cycle phase details appear in task names.",
    difficulty: "Easy",
    diffColor: C.green,
    apiName: "Google Tasks API",
    setupSteps: ["Enable Tasks API in Google Cloud Console", "Request tasks scope during OAuth", "Use tasks.insert() with due dates", "Set reminder time based on user preferences"],
    userBenefit: "Users don't have to remember what to do each day. LUNA's reminders land at exactly the right moment in the cycle.",
  },
  {
    id: "gmail",
    icon: "📧",
    name: "Gmail Integration",
    color: C.googleRed,
    glow: "#EA433520",
    tagline: "Doctor summaries and care reports delivered to your inbox",
    whatItDoes: "LUNA uses Gmail to send users a monthly Cycle Health Summary — a beautifully formatted email with their phase patterns, mood trends, symptom highlights, and a doctor-ready PDF attached. Also sends gentle alerts when cycles are irregular, and appointment reminders when a GP visit is suggested.",
    howItWorks: [
      { step: "1", title: "LUNA compiles monthly report", desc: "At the end of each cycle, LUNA's AI generates a personal health summary from logged data" },
      { step: "2", title: "PDF generated on server", desc: "A doctor-ready PDF is created with cycle dates, symptoms, mood patterns, and phase analysis" },
      { step: "3", title: "Email sent via Gmail API", desc: "LUNA sends the report to the user's Gmail with the PDF attached — formatted like a health record" },
      { step: "4", title: "Appointment email drafts", desc: "If LUNA detects irregularities, it drafts a pre-filled GP appointment email the user can send in one tap" },
    ],
    techStack: "Gmail API · OAuth 2.0 (gmail.send scope) · HTML email templates · PDF generation",
    privacyNote: "LUNA only sends emails TO the user — it never reads the user's inbox. The gmail.send permission is write-only.",
    difficulty: "Medium",
    diffColor: C.yellow,
    apiName: "Gmail API",
    setupSteps: ["Enable Gmail API in Google Cloud Console", "Request gmail.send scope (not gmail.readonly)", "Build HTML email template", "Use messages.send() with base64 encoded email"],
    userBenefit: "The doctor summary PDF alone is a reason to keep using LUNA. It makes GP visits 3x more productive.",
  },
  {
    id: "fit",
    icon: "🏃",
    name: "Google Fit",
    color: C.googleGreen,
    glow: "#34A85320",
    tagline: "Your real activity data powers smarter phase recommendations",
    whatItDoes: "LUNA reads step count, workout sessions, heart rate, and sleep data from Google Fit. It uses this to personalise exercise recommendations — if you've already walked 8,000 steps today, LUNA won't push a hard workout. If your sleep was poor last night, it adjusts your day's recommendations to recovery mode.",
    howItWorks: [
      { step: "1", title: "User connects Google Fit", desc: "LUNA requests fitness.activity.read and fitness.sleep.read permissions" },
      { step: "2", title: "Daily data sync", desc: "Each morning, LUNA pulls yesterday's steps, workout minutes, sleep hours, and heart rate from Fit API" },
      { step: "3", title: "AI adjusts recommendations", desc: "LUNA's wellness engine combines Fit data with cycle phase to generate today's personalised plan" },
      { step: "4", title: "Progress shown in LUNA", desc: "Users see their activity trends overlaid with cycle phases — discovering patterns like 'I always sleep poorly in late luteal'" },
    ],
    techStack: "Google Fit REST API · fitness.activity.read · fitness.sleep.read · DataSource queries",
    privacyNote: "LUNA only reads activity data — it never writes to or modifies your Fit data. Read-only access.",
    difficulty: "Hard",
    diffColor: C.red,
    apiName: "Google Fitness API",
    setupSteps: ["Enable Fitness API in Google Cloud Console", "Request fitness scopes during OAuth", "Query DataSources for steps/sleep/HR", "Store daily snapshots in LUNA database"],
    userBenefit: "This is what separates LUNA from every other cycle app — recommendations that know what your body actually did today, not just what phase you're in.",
  },
];

const difficultyInfo = {
  Easy: { color: C.green, desc: "Can be built in 1–2 days by a beginner developer" },
  Medium: { color: C.yellow, desc: "Needs 3–5 days and some API experience" },
  Hard: { color: C.red, desc: "Needs 1–2 weeks and a developer comfortable with REST APIs" },
};

function ConnectButton({ connected, color, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: "8px 20px", borderRadius: 20, border: "none", cursor: "pointer",
      background: connected ? `${color}22` : color,
      color: connected ? color : "white",
      fontSize: 12, fontWeight: 700, fontFamily: "inherit",
      border: `1px solid ${connected ? color + "55" : "transparent"}`,
      transition: "all 0.2s",
    }}>
      {connected ? "✓ Connected" : "Connect"}
    </button>
  );
}

function IntegrationCard({ intg, expanded, onToggle }) {
  const [connected, setConnected] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div style={{
      background: C.card, border: `1px solid ${expanded ? intg.color + "55" : C.border}`,
      borderRadius: 18, overflow: "hidden", transition: "all 0.25s",
      boxShadow: expanded ? `0 0 32px ${intg.glow}` : "none",
    }}>
      {/* Header */}
      <div onClick={onToggle} style={{ padding: "20px 24px", cursor: "pointer", display: "flex", gap: 16, alignItems: "center", background: expanded ? `${intg.color}08` : "transparent" }}>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: `${intg.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0, border: `1px solid ${intg.color}33` }}>
          {intg.icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: C.text }}>{intg.name}</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: difficultyInfo[intg.difficulty].color, background: `${difficultyInfo[intg.difficulty].color}18`, padding: "2px 8px", borderRadius: 10 }}>
              {intg.difficulty}
            </span>
          </div>
          <div style={{ fontSize: 13, color: intg.color, fontStyle: "italic" }}>{intg.tagline}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <ConnectButton connected={connected} color={intg.color} onClick={(e) => { e.stopPropagation(); setConnected(!connected); }} />
          <span style={{ fontSize: 18, color: C.textMuted, transition: "transform 0.2s", transform: expanded ? "rotate(180deg)" : "none" }}>⌄</span>
        </div>
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div style={{ padding: "0 24px 24px", borderTop: `1px solid ${intg.color}22` }}>

          {/* What it does */}
          <div style={{ padding: "14px 16px", background: `${intg.color}0c`, borderLeft: `3px solid ${intg.color}`, borderRadius: "0 10px 10px 0", margin: "18px 0 16px" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: intg.color, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 6 }}>What This Does In LUNA</div>
            <div style={{ fontSize: 13, color: C.textDim, lineHeight: 1.75 }}>{intg.whatItDoes}</div>
          </div>

          {/* How it works — interactive steps */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>How It Works — Step by Step</div>
            <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
              {intg.howItWorks.map((s, i) => (
                <button key={i} onClick={() => setActiveStep(i)} style={{
                  width: 32, height: 32, borderRadius: "50%", border: "none", cursor: "pointer",
                  background: activeStep === i ? intg.color : C.surface,
                  color: activeStep === i ? "white" : C.textMuted,
                  fontSize: 13, fontWeight: 700, fontFamily: "inherit",
                  border: `1px solid ${activeStep === i ? intg.color : C.border}`,
                  transition: "all 0.2s",
                }}>{s.step}</button>
              ))}
            </div>
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px 16px", minHeight: 72 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 6 }}>
                Step {intg.howItWorks[activeStep].step}: {intg.howItWorks[activeStep].title}
              </div>
              <div style={{ fontSize: 13, color: C.textDim, lineHeight: 1.6 }}>{intg.howItWorks[activeStep].desc}</div>
            </div>
          </div>

          {/* 2-col: Tech + Setup */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>🛠 Tech Stack</div>
              <div style={{ fontSize: 12, color: C.textDim, lineHeight: 1.6 }}>{intg.techStack}</div>
              <div style={{ marginTop: 8, padding: "4px 10px", background: `${intg.color}15`, borderRadius: 8, fontSize: 11, color: intg.color, display: "inline-block" }}>{intg.apiName}</div>
            </div>
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>⚡ Setup Steps</div>
              {intg.setupSteps.map((s, i) => (
                <div key={i} style={{ fontSize: 11, color: C.textDim, marginBottom: 4, display: "flex", gap: 6 }}>
                  <span style={{ color: intg.color, flexShrink: 0 }}>{i + 1}.</span> {s}
                </div>
              ))}
            </div>
          </div>

          {/* Privacy */}
          <div style={{ background: "#0a1628", border: "1px solid #1e3050", borderRadius: 10, padding: "10px 14px", marginBottom: 12, display: "flex", gap: 10 }}>
            <span style={{ fontSize: 16 }}>🔒</span>
            <div style={{ fontSize: 12, color: "#7ea8d4", lineHeight: 1.6 }}><strong style={{ color: "#90caf9" }}>Privacy: </strong>{intg.privacyNote}</div>
          </div>

          {/* User benefit */}
          <div style={{ background: `${C.yellow}0c`, border: `1px solid ${C.yellow}30`, borderRadius: 10, padding: "10px 14px", display: "flex", gap: 10 }}>
            <span style={{ fontSize: 16 }}>💡</span>
            <div style={{ fontSize: 12, color: "#d4b483", lineHeight: 1.6 }}><strong style={{ color: C.yellow }}>Why users love this: </strong>{intg.userBenefit}</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── SETTINGS PANEL UI ─────────────────────────────────────

function SettingsPanel() {
  const [connections, setConnections] = useState({
    signin: true, calendar: false, tasks: false, gmail: false, fit: false,
  });
  const [calSettings, setCalSettings] = useState({ blockLuteal: true, showPeak: true, privateLabels: true });
  const [reminderSettings, setReminderSettings] = useState({ morning: true, evening: false, time: "08:00" });

  const toggle = (key) => setConnections(p => ({ ...p, [key]: !p[key] }));

  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 18, overflow: "hidden" }}>
      <div style={{ padding: "18px 24px", borderBottom: `1px solid ${C.border}`, background: "#0f1219" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg viewBox="0 0 24 24" width="28" height="28">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Google Integrations</div>
            <div style={{ fontSize: 12, color: C.textDim }}>Manage your connected Google services</div>
          </div>
        </div>
      </div>

      <div style={{ padding: "16px 24px" }}>
        {/* Connection toggles */}
        {[
          { id: "signin", icon: "🔐", name: "Google Account", desc: "Signed in as luna.user@gmail.com", color: C.googleBlue },
          { id: "calendar", icon: "📅", name: "Google Calendar", desc: "Phase blocks & smart scheduling", color: C.googleBlue },
          { id: "tasks", icon: "✅", name: "Google Tasks", desc: "Phase-aware daily reminders", color: C.googleGreen },
          { id: "gmail", icon: "📧", name: "Gmail", desc: "Monthly health reports to inbox", color: C.googleRed },
          { id: "fit", icon: "🏃", name: "Google Fit", desc: "Activity & sleep data sync", color: C.googleGreen },
        ].map(s => (
          <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: `${s.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{s.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{s.name}</div>
              <div style={{ fontSize: 11, color: connections[s.id] ? s.color : C.textMuted }}>{connections[s.id] ? "✓ " + s.desc : "Not connected"}</div>
            </div>
            {/* Toggle */}
            <div onClick={() => toggle(s.id)} style={{ width: 44, height: 24, borderRadius: 12, background: connections[s.id] ? s.color : C.surface, border: `1px solid ${connections[s.id] ? s.color : C.border}`, cursor: "pointer", position: "relative", transition: "all 0.25s", flexShrink: 0 }}>
              <div style={{ position: "absolute", top: 2, left: connections[s.id] ? 22 : 2, width: 18, height: 18, borderRadius: "50%", background: "white", transition: "left 0.25s", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }} />
            </div>
          </div>
        ))}

        {/* Calendar settings (if connected) */}
        {connections.calendar && (
          <div style={{ margin: "14px 0 0", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>📅 Calendar Settings</div>
            {[
              { key: "blockLuteal", label: "Block luteal phase as 'Focus Time'" },
              { key: "showPeak", label: "Mark peak energy days for meetings" },
              { key: "privateLabels", label: "Use neutral labels (not phase names)" },
            ].map(opt => (
              <div key={opt.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0" }}>
                <span style={{ fontSize: 12, color: C.textDim }}>{opt.label}</span>
                <div onClick={() => setCalSettings(p => ({ ...p, [opt.key]: !p[opt.key] }))} style={{ width: 36, height: 20, borderRadius: 10, background: calSettings[opt.key] ? C.googleBlue : C.card, border: `1px solid ${calSettings[opt.key] ? C.googleBlue : C.border}`, cursor: "pointer", position: "relative", transition: "all 0.2s", flexShrink: 0 }}>
                  <div style={{ position: "absolute", top: 1, left: calSettings[opt.key] ? 17 : 1, width: 16, height: 16, borderRadius: "50%", background: "white", transition: "left 0.2s" }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Reminder time (if tasks connected) */}
        {connections.tasks && (
          <div style={{ margin: "12px 0 0", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>✅ Reminder Settings</div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ fontSize: 12, color: C.textDim, flex: 1 }}>Daily reminder time</span>
              <input type="time" value={reminderSettings.time} onChange={e => setReminderSettings(p => ({ ...p, time: e.target.value }))} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "5px 10px", color: C.text, fontSize: 13, fontFamily: "inherit", outline: "none" }} />
            </div>
          </div>
        )}

        <button style={{ width: "100%", marginTop: 16, padding: "12px", background: `linear-gradient(135deg, #4285F4, #34A853)`, border: "none", borderRadius: 12, color: "white", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.02em" }}>
          Save Integration Settings
        </button>
      </div>
    </div>
  );
}

// ── FLOW DIAGRAM ──────────────────────────────────────────

function FlowDiagram() {
  const steps = [
    { icon: "👩", label: "User opens LUNA", color: C.rose },
    { icon: "🔐", label: "Sign in with Google", color: C.googleBlue },
    { icon: "🌸", label: "Log cycle data", color: C.rose },
    { icon: "🧠", label: "LUNA calculates phases", color: C.purple },
    { icon: "📅", label: "Calendar blocks created", color: C.googleBlue },
    { icon: "✅", label: "Reminders set in Tasks", color: C.googleGreen },
    { icon: "🏃", label: "Fit data synced", color: C.googleGreen },
    { icon: "📧", label: "Monthly report emailed", color: C.googleRed },
    { icon: "💪", label: "Woman feels in control", color: C.yellow },
  ];

  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 18, padding: "24px" }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 20 }}>🔄 How All 5 Integrations Work Together</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", justifyContent: "center" }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: `${s.color}18`, border: `1px solid ${s.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{s.icon}</div>
              <div style={{ fontSize: 9, color: C.textMuted, textAlign: "center", maxWidth: 60, lineHeight: 1.3 }}>{s.label}</div>
            </div>
            {i < steps.length - 1 && <span style={{ color: C.textMuted, fontSize: 16, marginBottom: 16 }}>→</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ══ MAIN ══════════════════════════════════════════════════

export default function LunaGoogleIntegrations() {
  const [expandedId, setExpandedId] = useState("signin");
  const [activeView, setActiveView] = useState("explain");

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'DM Sans', 'Segoe UI', sans-serif", color: C.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=Playfair+Display:ital,wght@0,700;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #0f1219; } ::-webkit-scrollbar-thumb { background: #2e3d55; border-radius: 2px; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #07090f 0%, #0a1020 50%, #07090f 100%)", padding: "48px 24px 36px", borderBottom: `1px solid ${C.border}`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(ellipse at 20% 50%, #4285F415, transparent 60%), radial-gradient(ellipse at 80% 50%, #34A85315, transparent 60%)" }} />
        <div style={{ maxWidth: 860, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <span style={{ fontSize: 28 }}>🌸</span>
            <span style={{ fontSize: 13, color: C.textDim, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 500 }}>LUNA × Google</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px,4vw,46px)", fontWeight: 700, lineHeight: 1.2, marginBottom: 12 }}>
            Yes — LUNA connects with<br /><em style={{ color: C.googleBlue }}>all your Google apps.</em>
          </h1>
          <p style={{ fontSize: 15, color: C.textDim, lineHeight: 1.8, maxWidth: 560, marginBottom: 24 }}>
            LUNA integrates deeply with Google's ecosystem — making your cycle intelligence flow into your calendar, reminders, email, fitness tracker, and login. Here's exactly how each one works.
          </p>
          {/* Google color bar */}
          <div style={{ display: "flex", gap: 3, marginBottom: 24 }}>
            {[C.googleBlue, C.googleRed, C.googleYellow, C.googleGreen, C.googleBlue].map((c, i) => (
              <div key={i} style={{ height: 4, flex: 1, background: c, borderRadius: 2, maxWidth: 60 }} />
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["✓ Sign-In", "✓ Calendar", "✓ Tasks & Reminders", "✓ Gmail", "✓ Google Fit"].map(t => (
              <div key={t} style={{ padding: "5px 14px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, fontSize: 12, color: C.textDim }}>{t}</div>
            ))}
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "12px 24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", gap: 8 }}>
          {[{ id: "explain", label: "📖 How Each Integration Works" }, { id: "settings", label: "⚙️ Integration Settings UI" }, { id: "flow", label: "🔄 Full Flow Diagram" }].map(v => (
            <button key={v.id} onClick={() => setActiveView(v.id)} style={{
              padding: "8px 18px", borderRadius: 20, border: "none", cursor: "pointer",
              background: activeView === v.id ? C.googleBlue : C.card,
              color: activeView === v.id ? "white" : C.textDim,
              fontSize: 12, fontWeight: activeView === v.id ? 700 : 400, fontFamily: "inherit",
              transition: "all 0.2s", whiteSpace: "nowrap",
            }}>{v.label}</button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "28px 24px 64px" }}>

        {/* EXPLAIN VIEW */}
        {activeView === "explain" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12, animation: "fadeUp 0.3s ease" }}>
            <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 4 }}>Click any integration to expand the full technical explanation. Use the step buttons to walk through exactly how each one works.</div>
            {integrations.map(intg => (
              <IntegrationCard key={intg.id} intg={intg} expanded={expandedId === intg.id} onToggle={() => setExpandedId(expandedId === intg.id ? null : intg.id)} />
            ))}

            {/* Cloud Console CTA */}
            <div style={{ marginTop: 8, background: "linear-gradient(135deg, #0a1628, #0f1a2e)", border: "1px solid #1e3050", borderRadius: 18, padding: "24px" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#90caf9", marginBottom: 8 }}>🚀 Where to Start — Google Cloud Console</div>
              <p style={{ fontSize: 13, color: "#7ea8d4", lineHeight: 1.7, marginBottom: 16 }}>
                All 5 integrations are managed from one place: <strong style={{ color: "#90caf9" }}>console.cloud.google.com</strong>. You create one project called "LUNA App", enable each API you need, and get your OAuth credentials. It's free to start.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 8 }}>
                {["1. Create project: 'LUNA'", "2. Enable each API", "3. Create OAuth 2.0 credentials", "4. Add authorized redirect URIs", "5. Download credentials JSON", "6. Build your integration"].map((s, i) => (
                  <div key={i} style={{ padding: "8px 12px", background: "#0d1e33", border: "1px solid #1e3050", borderRadius: 8, fontSize: 12, color: "#7ea8d4", display: "flex", gap: 6 }}>
                    <span style={{ color: "#4285F4", flexShrink: 0, fontWeight: 700 }}>{i + 1}.</span>
                    <span>{s.substring(3)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SETTINGS VIEW */}
        {activeView === "settings" && (
          <div style={{ animation: "fadeUp 0.3s ease", maxWidth: 560, margin: "0 auto" }}>
            <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 16 }}>This is exactly what the Google Integrations settings page will look like inside LUNA. Toggle each service on/off — it shows real UI behaviour.</div>
            <SettingsPanel />
          </div>
        )}

        {/* FLOW VIEW */}
        {activeView === "flow" && (
          <div style={{ animation: "fadeUp 0.3s ease" }}>
            <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 16 }}>How all 5 Google integrations connect together in a single user journey — from opening the app to feeling in control.</div>
            <FlowDiagram />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12, marginTop: 20 }}>
              {integrations.map(intg => (
                <div key={intg.id} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "16px" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 20 }}>{intg.icon}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: intg.color }}>{intg.name}</span>
                  </div>
                  <div style={{ fontSize: 12, color: C.textDim, lineHeight: 1.6, marginBottom: 8 }}>{intg.userBenefit}</div>
                  <div style={{ fontSize: 10, padding: "3px 10px", background: `${difficultyInfo[intg.difficulty].color}18`, color: difficultyInfo[intg.difficulty].color, borderRadius: 10, display: "inline-block", fontWeight: 700 }}>
                    {intg.difficulty} to build
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
