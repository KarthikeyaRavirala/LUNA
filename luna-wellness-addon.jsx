import { useState } from "react";

const C = {
  bg: "#0b0d12",
  surface: "#13161f",
  card: "#1b1f2e",
  cardAlt: "#1f2233",
  border: "#252840",
  rose: "#f06292",
  roseDark: "#ad1457",
  roseGlow: "#f06292",
  teal: "#4dd0e1",
  tealDark: "#00838f",
  gold: "#ffd54f",
  goldDark: "#f9a825",
  mint: "#69f0ae",
  mintDark: "#00c853",
  lavender: "#ce93d8",
  lavDark: "#7b1fa2",
  peach: "#ffab76",
  text: "#eef0ff",
  textDim: "#9198c0",
  textMuted: "#555e80",
  phases: {
    menstrual: "#ef5350",
    follicular: "#66bb6a",
    ovulatory: "#ffa726",
    luteal: "#f06292",
  },
};

// ── DATA ─────────────────────────────────────────────────

const phaseData = {
  menstrual: {
    label: "Menstrual", emoji: "🌑", color: C.phases.menstrual, days: "Day 1–5",
    energy: 25, mood: "Low & Introspective",
    exercise: [
      { name: "Yin Yoga", duration: "20 min", intensity: "Rest", icon: "🧘", benefit: "Eases cramps, calms nervous system" },
      { name: "Slow Walk", duration: "15 min", intensity: "Light", icon: "🚶", benefit: "Boosts circulation without stress" },
      { name: "Gentle Stretching", duration: "10 min", intensity: "Rest", icon: "🤸", benefit: "Relieves lower back tension" },
    ],
    foods: [
      { name: "Dark Chocolate (70%+)", icon: "🍫", why: "Magnesium replenishment, mood lift" },
      { name: "Iron-rich Lentils", icon: "🫘", why: "Replenishes iron lost during flow" },
      { name: "Ginger Tea", icon: "🍵", why: "Natural anti-inflammatory, reduces cramps" },
      { name: "Beetroot", icon: "🫑", why: "Iron + folate, rebuilds blood" },
      { name: "Avoid: Salty & Fried", icon: "🚫", why: "Worsens bloating and inflammation" },
    ],
    habits: [
      { icon: "💤", label: "Sleep", tip: "Sleep 8–9 hrs. Your body is repairing." },
      { icon: "💧", label: "Water", tip: "3L/day minimum. Warm water helps cramps." },
      { icon: "📵", label: "Screen Time", tip: "Cut screen time after 9pm. Reduces cortisol." },
      { icon: "🛁", label: "Self Care", tip: "Heat therapy on abdomen 2x/day." },
    ],
    affirmation: "Rest is not laziness. Your body is doing profound work right now. You are powerful even in stillness.",
    confidence: "This phase is your most intuitive. Trust your gut feelings — they are sharpest now.",
  },
  follicular: {
    label: "Follicular", emoji: "🌱", color: C.phases.follicular, days: "Day 6–13",
    energy: 80, mood: "Rising & Optimistic",
    exercise: [
      { name: "HIIT Training", duration: "30 min", intensity: "High", icon: "🏃", benefit: "Peak strength gains in this phase" },
      { name: "Dance Cardio", duration: "45 min", intensity: "High", icon: "💃", benefit: "Estrogen boost amplifies endurance" },
      { name: "Strength Training", duration: "40 min", intensity: "High", icon: "🏋️", benefit: "Muscle building is easiest now" },
    ],
    foods: [
      { name: "Eggs & Lean Protein", icon: "🥚", why: "Supports follicle development" },
      { name: "Fermented Foods", icon: "🥗", why: "Probiotic gut health, estrogen balance" },
      { name: "Flaxseeds", icon: "🌾", why: "Phytoestrogens support rising estrogen" },
      { name: "Fresh Fruits", icon: "🍓", why: "Antioxidants for cellular energy" },
      { name: "Green Vegetables", icon: "🥦", why: "Folate supports new cell growth" },
    ],
    habits: [
      { icon: "🌅", label: "Morning", tip: "Start new projects — creativity is high." },
      { icon: "💧", label: "Water", tip: "2.5L/day. Add lemon for detox." },
      { icon: "📚", label: "Learning", tip: "Best time to learn new skills or study." },
      { icon: "🤝", label: "Social", tip: "Schedule important meetings this week." },
    ],
    affirmation: "You are entering your power season. Every idea you have right now has the energy to become real.",
    confidence: "This is your social superpower phase. Your communication is at its clearest and most charming.",
  },
  ovulatory: {
    label: "Ovulatory", emoji: "🌕", color: C.phases.ovulatory, days: "Day 14–16",
    energy: 100, mood: "Confident & Radiant",
    exercise: [
      { name: "Group Sports", duration: "60 min", intensity: "Peak", icon: "⚽", benefit: "Social energy is at its peak" },
      { name: "Running / Cycling", duration: "45 min", intensity: "Peak", icon: "🚴", benefit: "Maximum endurance window" },
      { name: "Vinyasa Yoga", duration: "50 min", intensity: "High", icon: "🧘", benefit: "Channels peak energy gracefully" },
    ],
    foods: [
      { name: "Quinoa & Brown Rice", icon: "🍚", why: "Sustained energy for peak performance" },
      { name: "Berries & Citrus", icon: "🍊", why: "Antioxidants support peak hormones" },
      { name: "Cruciferous Veggies", icon: "🥬", why: "Supports estrogen metabolism" },
      { name: "Zinc-rich Pumpkin Seeds", icon: "🎃", why: "Supports progesterone production" },
      { name: "Light & Fresh Meals", icon: "🥙", why: "Appetite is naturally lower now" },
    ],
    habits: [
      { icon: "🎤", label: "Voice", tip: "Speak up — your voice is most persuasive now." },
      { icon: "💧", label: "Water", tip: "2.5L/day. Stay cool and hydrated." },
      { icon: "🎯", label: "Goals", tip: "Make decisions — judgment is at its best." },
      { icon: "✨", label: "Confidence", tip: "You literally glow today. Own it." },
    ],
    affirmation: "You are at your most magnetic. Walk into every room knowing you belong there — because you do.",
    confidence: "This is your leadership phase. Others naturally listen to you and trust your judgment right now.",
  },
  luteal: {
    label: "Luteal", emoji: "🌸", color: C.phases.luteal, days: "Day 17–28",
    energy: 45, mood: "Sensitive & Reflective",
    exercise: [
      { name: "Pilates", duration: "30 min", intensity: "Moderate", icon: "🤸", benefit: "Stabilizes mood through movement" },
      { name: "Swimming", duration: "30 min", intensity: "Moderate", icon: "🏊", benefit: "Full body, low impact, calming" },
      { name: "Nature Walk", duration: "25 min", intensity: "Light", icon: "🌿", benefit: "Reduces cortisol and anxiety naturally" },
    ],
    foods: [
      { name: "Magnesium-rich Spinach", icon: "🥬", why: "Directly reduces PMS cramps and mood swings" },
      { name: "Complex Carbs (Oats)", icon: "🌾", why: "Stabilizes serotonin, reduces cravings" },
      { name: "Chamomile Tea", icon: "🍵", why: "Reduces anxiety, improves sleep quality" },
      { name: "Avocado", icon: "🥑", why: "B6 supports progesterone, reduces bloating" },
      { name: "Avoid: Caffeine & Alcohol", icon: "🚫", why: "Amplifies anxiety and disrupts sleep" },
    ],
    habits: [
      { icon: "💤", label: "Sleep", tip: "Prioritise 8hrs. Melatonin drops this phase." },
      { icon: "💧", label: "Water", tip: "3L+ with electrolytes. Reduces bloating." },
      { icon: "📓", label: "Journal", tip: "Write feelings out — reduces overthinking." },
      { icon: "🌡️", label: "Heat", tip: "Heating pad on lower abdomen before sleep." },
    ],
    affirmation: "Your sensitivity is not weakness — it is depth. The world needs women who feel things this fully.",
    confidence: "Your empathy is at its highest this week. You understand people in ways others simply cannot.",
  },
};

const missedCycleAlerts = [
  { level: "info", icon: "📅", title: "Cycle Due Soon", msg: "Your period is expected in 2 days. Prepare your care kit.", color: C.teal },
  { level: "gentle", icon: "🌸", title: "Cycle Delay Detected", msg: "Your cycle is 5 days late. This can be normal — stress, diet changes, or travel can cause delays.", color: C.gold },
  { level: "check", icon: "💛", title: "Check-in Reminder", msg: "7 days late. Your cohort is here if you need to talk. Consider a home test or GP visit.", color: C.peach },
  { level: "care", icon: "❤️", title: "We're With You", msg: "It's been 10+ days. Whatever you're feeling is valid. LUNA's support team and a doctor referral are one tap away.", color: C.rose },
];

// ── COMPONENTS ───────────────────────────────────────────

function PhaseTab({ phase, active, onClick }) {
  const d = phaseData[phase];
  return (
    <button onClick={onClick} style={{
      flex: 1, padding: "10px 4px", background: active ? `${d.color}22` : "transparent",
      border: "none", borderBottom: active ? `2px solid ${d.color}` : "2px solid transparent",
      cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
      transition: "all 0.2s",
    }}>
      <span style={{ fontSize: 18 }}>{d.emoji}</span>
      <span style={{ fontSize: 9, color: active ? d.color : C.textMuted, fontWeight: active ? 700 : 400, fontFamily: "inherit" }}>{d.label}</span>
    </button>
  );
}

function EnergyBar({ value, color }) {
  return (
    <div style={{ flex: 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 10, color: C.textMuted }}>Energy Level</span>
        <span style={{ fontSize: 10, color, fontWeight: 700 }}>{value}%</span>
      </div>
      <div style={{ height: 5, background: C.border, borderRadius: 3 }}>
        <div style={{ width: `${value}%`, height: "100%", background: `linear-gradient(90deg, ${color}88, ${color})`, borderRadius: 3, transition: "width 0.6s ease" }} />
      </div>
    </div>
  );
}

function AppScreen() {
  const [activePhase, setActivePhase] = useState("luteal");
  const [activeTab, setActiveTab] = useState("exercise");
  const [alertIdx, setAlertIdx] = useState(1);
  const [showAffirm, setShowAffirm] = useState(false);
  const d = phaseData[activePhase];

  const tabs = [
    { id: "exercise", icon: "🏃", label: "Move" },
    { id: "food", icon: "🍽", label: "Eat" },
    { id: "habits", icon: "🌿", label: "Habits" },
    { id: "missed", icon: "📅", label: "Alerts" },
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", display: "flex", justifyContent: "center" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { display: none; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes glowPulse { 0%,100%{box-shadow:0 0 12px ${C.roseGlow}44} 50%{box-shadow:0 0 24px ${C.roseGlow}88} }
      `}</style>

      <div style={{ width: "100%", maxWidth: 420, display: "flex", flexDirection: "column", fontFamily: "'Sora', sans-serif" }}>

        {/* Top bar */}
        <div style={{ padding: "14px 16px 10px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${C.border}`, background: `${C.bg}ee`, backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 18 }}>🌸</span>
            <span style={{ fontSize: 17, fontWeight: 700, color: C.text, fontFamily: "'Libre Baskerville', serif", letterSpacing: 1 }}>LUNA</span>
            <span style={{ fontSize: 10, color: C.textMuted, marginLeft: 2 }}>Wellness</span>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ padding: "4px 10px", background: `${d.color}22`, border: `1px solid ${d.color}55`, borderRadius: 20, fontSize: 10, color: d.color, fontWeight: 700 }}>
              {d.emoji} {d.label} Phase
            </div>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", paddingBottom: 24 }}>

          {/* Phase Selector */}
          <div style={{ display: "flex", borderBottom: `1px solid ${C.border}` }}>
            {Object.keys(phaseData).map(p => (
              <PhaseTab key={p} phase={p} active={activePhase === p} onClick={() => { setActivePhase(p); setShowAffirm(false); }} />
            ))}
          </div>

          {/* Phase Hero Card */}
          <div style={{ margin: "16px 16px 0", background: `linear-gradient(135deg, ${d.color}20, ${d.color}08)`, border: `1px solid ${d.color}44`, borderRadius: 18, padding: "18px", animation: "fadeUp 0.3s ease" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{ fontSize: 36 }}>{d.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.text }}>{d.label} Phase</div>
                <div style={{ fontSize: 11, color: C.textDim, marginTop: 1 }}>{d.days} · {d.mood}</div>
              </div>
            </div>
            <EnergyBar value={d.energy} color={d.color} />

            {/* Confidence badge */}
            <div style={{ marginTop: 14, padding: "10px 14px", background: `${d.color}15`, borderRadius: 12, cursor: "pointer" }} onClick={() => setShowAffirm(!showAffirm)}>
              <div style={{ fontSize: 11, fontWeight: 700, color: d.color, marginBottom: showAffirm ? 6 : 0 }}>💪 {d.confidence}</div>
              {showAffirm && (
                <div style={{ fontSize: 12, color: C.textDim, fontStyle: "italic", lineHeight: 1.6, fontFamily: "'Libre Baskerville', serif", marginTop: 6, borderTop: `1px solid ${d.color}33`, paddingTop: 8 }}>
                  ✨ "{d.affirmation}"
                </div>
              )}
              <div style={{ fontSize: 10, color: C.textMuted, marginTop: 4 }}>{showAffirm ? "Tap to collapse" : "Tap for today's affirmation"}</div>
            </div>
          </div>

          {/* Sub-tabs */}
          <div style={{ display: "flex", gap: 8, padding: "14px 16px 0", overflowX: "auto", scrollbarWidth: "none" }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                padding: "8px 16px", borderRadius: 20, border: "none", cursor: "pointer", flexShrink: 0,
                background: activeTab === t.id ? d.color : C.card,
                color: activeTab === t.id ? "white" : C.textDim,
                fontSize: 12, fontWeight: activeTab === t.id ? 700 : 400, fontFamily: "'Sora', sans-serif",
                transition: "all 0.2s",
              }}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {/* EXERCISE TAB */}
          {activeTab === "exercise" && (
            <div style={{ padding: "14px 16px", animation: "fadeUp 0.3s ease" }}>
              <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 12 }}>Best exercises for your {d.label} phase</div>
              {d.exercise.map((e, i) => (
                <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 16px", marginBottom: 10, display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ width: 46, height: 46, borderRadius: 12, background: `${d.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{e.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{e.name}</span>
                      <span style={{ fontSize: 10, color: d.color, background: `${d.color}18`, padding: "2px 8px", borderRadius: 10 }}>{e.intensity}</span>
                    </div>
                    <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 3 }}>⏱ {e.duration}</div>
                    <div style={{ fontSize: 12, color: C.textDim }}>{e.benefit}</div>
                  </div>
                </div>
              ))}
              <div style={{ background: `${d.color}10`, border: `1px solid ${d.color}30`, borderRadius: 12, padding: "12px 14px", marginTop: 4 }}>
                <div style={{ fontSize: 11, color: d.color, fontWeight: 700, marginBottom: 4 }}>💡 Phase Tip</div>
                <div style={{ fontSize: 12, color: C.textDim, lineHeight: 1.6 }}>
                  {activePhase === "luteal" && "Reduce workout intensity by 20–30% in the last 3 days. Listen to your body — rest is progress too."}
                  {activePhase === "menstrual" && "Movement reduces cramps naturally. Even 10 minutes of gentle yoga is better than none."}
                  {activePhase === "follicular" && "Your muscle recovery is fastest now. Push harder — your body can handle it."}
                  {activePhase === "ovulatory" && "This is your peak athletic window. Set personal records and try challenging workouts now."}
                </div>
              </div>
            </div>
          )}

          {/* FOOD TAB */}
          {activeTab === "food" && (
            <div style={{ padding: "14px 16px", animation: "fadeUp 0.3s ease" }}>
              <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 12 }}>Phase-specific nutrition for {d.label}</div>
              {d.foods.map((f, i) => (
                <div key={i} style={{ background: f.icon === "🚫" ? `${C.roseDark}12` : C.card, border: `1px solid ${f.icon === "🚫" ? C.roseDark + "44" : C.border}`, borderRadius: 12, padding: "12px 14px", marginBottom: 8, display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ fontSize: 24, flexShrink: 0 }}>{f.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: f.icon === "🚫" ? "#ef9a9a" : C.text, marginBottom: 3 }}>{f.name}</div>
                    <div style={{ fontSize: 11, color: C.textMuted, lineHeight: 1.5 }}>{f.why}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* HABITS TAB */}
          {activeTab === "habits" && (
            <div style={{ padding: "14px 16px", animation: "fadeUp 0.3s ease" }}>
              <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 12 }}>Daily adjustments for {d.label} phase</div>
              {d.habits.map((h, i) => (
                <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 16px", marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <span style={{ fontSize: 22 }}>{h.icon}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{h.label}</span>
                  </div>
                  <div style={{ fontSize: 13, color: C.textDim, lineHeight: 1.6, paddingLeft: 32 }}>{h.tip}</div>
                </div>
              ))}

              {/* Daily check-in */}
              <div style={{ background: `linear-gradient(135deg, ${C.lavender}18, ${C.lavDark}18)`, border: `1px solid ${C.lavender}44`, borderRadius: 14, padding: "16px", marginTop: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.lavender, marginBottom: 10 }}>📓 Today's Check-in</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["😴 Rested", "💧 Hydrated", "🧘 Moved", "🥗 Ate Well", "📓 Journaled"].map(item => (
                    <div key={item} style={{ padding: "6px 12px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, fontSize: 11, color: C.textDim, cursor: "pointer" }}>{item}</div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MISSED CYCLE ALERTS TAB */}
          {activeTab === "missed" && (
            <div style={{ padding: "14px 16px", animation: "fadeUp 0.3s ease" }}>
              <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 12 }}>Smart cycle monitoring & compassionate alerts</div>

              {/* Alert selector */}
              <div style={{ display: "flex", gap: 6, marginBottom: 14, overflowX: "auto", scrollbarWidth: "none" }}>
                {missedCycleAlerts.map((a, i) => (
                  <button key={i} onClick={() => setAlertIdx(i)} style={{
                    padding: "6px 12px", borderRadius: 20, border: "none", cursor: "pointer", flexShrink: 0,
                    background: alertIdx === i ? `${a.color}22` : C.card,
                    color: alertIdx === i ? a.color : C.textMuted,
                    fontSize: 11, fontWeight: alertIdx === i ? 700 : 400, fontFamily: "inherit",
                    border: `1px solid ${alertIdx === i ? a.color + "66" : C.border}`,
                  }}>Day {[0, 5, 7, 10][i]}+</button>
                ))}
              </div>

              {/* Active Alert */}
              <div style={{ background: `${missedCycleAlerts[alertIdx].color}15`, border: `1px solid ${missedCycleAlerts[alertIdx].color}44`, borderRadius: 16, padding: "18px", marginBottom: 14, animation: "fadeUp 0.3s ease" }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{missedCycleAlerts[alertIdx].icon}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 8 }}>{missedCycleAlerts[alertIdx].title}</div>
                <div style={{ fontSize: 13, color: C.textDim, lineHeight: 1.7 }}>{missedCycleAlerts[alertIdx].msg}</div>
                {alertIdx >= 2 && (
                  <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
                    <button style={{ flex: 1, padding: "9px", background: missedCycleAlerts[alertIdx].color, border: "none", borderRadius: 10, color: "white", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Talk to Cohort</button>
                    <button style={{ flex: 1, padding: "9px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, color: C.textDim, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>Find a Doctor</button>
                  </div>
                )}
              </div>

              {/* What can cause it */}
              <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "16px" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.text, marginBottom: 10 }}>Common Reasons for Cycle Changes</div>
                {[
                  { icon: "😰", reason: "Stress & Anxiety", desc: "Most common cause of a delayed cycle" },
                  { icon: "✈️", reason: "Travel or Timezone Change", desc: "Disrupts circadian rhythm" },
                  { icon: "🍽", reason: "Significant Diet Changes", desc: "Drastic changes affect hormone levels" },
                  { icon: "🏋️", reason: "Over-exercising", desc: "Excess training can pause cycles" },
                  { icon: "💊", reason: "Medication Changes", desc: "Some medications delay or skip cycles" },
                ].map((r, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: i < 4 ? `1px solid ${C.border}` : "none" }}>
                    <span style={{ fontSize: 16 }}>{r.icon}</span>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{r.reason}</div>
                      <div style={{ fontSize: 11, color: C.textMuted }}>{r.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── FEATURE PLAN ──────────────────────────────────────────

function FeaturePlan() {
  const [open, setOpen] = useState(0);

  const features = [
    {
      icon: "📅", color: C.teal, title: "Missed & Irregular Cycle Detection",
      tagline: "Compassionate, not alarming — like a best friend who notices",
      problem: "Women talking to friends often realise they've missed a cycle only when someone else mentions it. There's no proactive, emotionally intelligent alert system for this.",
      how: "LUNA tracks expected cycle windows. If a cycle is late, it sends a tiered, compassionate notification sequence — starting gentle, escalating warmly, never clinically. It avoids panic by also explaining common non-medical reasons for delays (stress, travel, diet) before suggesting medical attention.",
      keyPoints: ["Day 0: 'Your period is due soon' reminder", "Day +5: 'A little late — completely normal, here's why'", "Day +7: Cohort check-in prompt + home test reminder", "Day +10: Warm doctor referral + emotional support resources", "Cycle irregularity pattern detection after 3+ months"],
      confidence: "Knowing your body is being watched over — not judged — builds deep trust in the app and in yourself.",
    },
    {
      icon: "🏃", color: C.mint, title: "Phase-Based Exercise Routines",
      tagline: "Stop fighting your body. Move with it.",
      problem: "Most fitness apps give the same workout every day. But a woman's capacity for exercise changes dramatically across her 28-day cycle — and working against it causes burnout, injury, and shame.",
      how: "LUNA prescribes 4 distinct movement modes — Rest & Restore (menstrual), Build & Challenge (follicular), Peak Performance (ovulatory), and Gentle Movement (luteal). Intensity, duration, and type adapt automatically. Every routine comes with a 'why this works now' explanation rooted in hormone science.",
      keyPoints: ["Pre-built routines for all 4 phases with video guidance", "Intensity auto-adjusts based on logged mood & energy", "'Skip without guilt' option during low-energy days", "Streak tracking that rewards consistency over perfection", "Integration with Apple Health, Google Fit"],
      confidence: "When a woman sees her body perform well in phases it's designed for, she stops feeling broken on hard days. She starts trusting herself.",
    },
    {
      icon: "🍽", color: C.gold, title: "Phase-Synced Nutrition Plans",
      tagline: "Food as medicine, timed perfectly",
      problem: "Cravings during PMS are not weakness — they are the body signalling specific nutrient deficiencies. Ignoring them or shaming them makes PMS worse.",
      how: "LUNA provides a phase-specific food guide: Iron-rich foods during menstrual, protein + probiotics during follicular, light antioxidant-rich meals during ovulatory, magnesium + complex carbs during luteal. The Craving Kitchen feature crowd-sources recipes from the community that match each phase's nutritional needs.",
      keyPoints: ["Daily 'What to eat today' card based on exact cycle day", "Craving decoder: 'You want chocolate → you need magnesium'", "Community recipe bank organised by phase", "Grocery list auto-generator for the week ahead", "Foods-to-avoid warnings during sensitive phases"],
      confidence: "Understanding why your body craves what it craves removes guilt entirely. Eating becomes an act of self-knowledge, not self-sabotage.",
    },
    {
      icon: "🌿", color: C.lavender, title: "Daily Habit Adjustment System",
      tagline: "Small shifts, massive difference",
      problem: "Women know they should sleep more, drink water, reduce stress — but generic advice ignores that the urgency and type of these habits changes dramatically by cycle phase.",
      how: "LUNA delivers a daily 3-item habit card, phase-calibrated. Menstrual phase: heat therapy + 9hrs sleep + warm fluids. Follicular phase: morning exercise + social scheduling + learning. Ovulatory: bold decisions + high hydration + social. Luteal: journalling + reduced caffeine + early sleep. Each habit has a science-backed 1-line explanation.",
      keyPoints: ["3 micro-habits per day — achievable, never overwhelming", "Daily check-in widget to mark completion", "Habit streaks that reset gracefully without shame", "Water tracker with phase-specific targets", "Weekly habit score with personalised reflection"],
      confidence: "Completing even one small daily habit builds a compounding sense of 'I showed up for myself today.' Over months, that becomes identity.",
    },
    {
      icon: "✨", color: C.rose, title: "Confidence & Affirmation Engine",
      tagline: "The feature that makes LUNA irreplaceable",
      problem: "PMS is deeply connected to a woman's sense of self-worth. During luteal phase, confidence craters. Women feel 'too much,' 'too emotional,' 'not good enough.' This is a hormonal reality — not a personal failing.",
      how: "LUNA reframes every phase as a superpower. Each phase gets a unique confidence truth (e.g. 'Your empathy is highest now — that's leadership'), a daily affirmation, and a community 'Glow Board' where women post wins from their current phase. The AI coach tracks patterns and tells you 'Last luteal phase, you wrote a breakthrough report — your best work often comes from this phase.'",
      keyPoints: ["Phase-specific daily affirmation (not generic positivity)", "Glow Board: community wins organised by phase", "AI memory: 'Here's what you achieved last cycle in this phase'", "Confidence journal prompts tuned to hormonal reality", "'You are not too much' messaging baked into every screen"],
      confidence: "When a woman understands that her 'weakness' is actually a cyclical pattern with an end date and a purpose — she stops fighting herself. That is the deepest form of confidence.",
    },
  ];

  return (
    <div style={{ background: "#0f1117", minHeight: "100vh", fontFamily: "'Sora', sans-serif", color: C.text }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');* { box-sizing: border-box; } ::-webkit-scrollbar { display: none; } @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }`}</style>

      <div style={{ background: "linear-gradient(135deg, #1a0a2e 0%, #0f1117 60%)", padding: "40px 24px 32px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.2em", color: C.rose, textTransform: "uppercase", marginBottom: 10, fontWeight: 600 }}>LUNA · Wellness Add-ons</div>
          <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(24px,4vw,40px)", fontWeight: 700, lineHeight: 1.2, marginBottom: 12 }}>
            5 Features That Give Women<br /><em style={{ color: C.rose }}>Back Their Confidence</em>
          </h1>
          <p style={{ fontSize: 14, color: C.textDim, lineHeight: 1.8, maxWidth: 520 }}>
            Built from a simple human truth — when a woman understands her own cycle, she stops feeling broken and starts feeling powerful.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "28px 24px 64px" }}>
        {features.map((f, i) => (
          <div key={i} style={{ marginBottom: 12, border: `1px solid ${open === i ? f.color + "55" : C.border}`, borderRadius: 16, overflow: "hidden", transition: "border-color 0.2s" }}>
            <div onClick={() => setOpen(open === i ? -1 : i)} style={{ padding: "18px 20px", display: "flex", gap: 14, alignItems: "center", cursor: "pointer", background: open === i ? `${f.color}08` : "transparent" }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `${f.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{f.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 3 }}>{f.title}</div>
                <div style={{ fontSize: 12, color: f.color, fontStyle: "italic" }}>{f.tagline}</div>
              </div>
              <span style={{ fontSize: 18, color: C.textMuted, transition: "transform 0.2s", transform: open === i ? "rotate(180deg)" : "none" }}>⌄</span>
            </div>

            {open === i && (
              <div style={{ padding: "0 20px 20px", animation: "fadeUp 0.25s ease" }}>
                <div style={{ padding: "12px 14px", background: `${C.roseDark}15`, borderLeft: `3px solid ${C.roseDark}`, borderRadius: "0 8px 8px 0", marginBottom: 14 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#ef9a9a", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>The Problem</div>
                  <div style={{ fontSize: 13, color: C.textDim, lineHeight: 1.7 }}>{f.problem}</div>
                </div>
                <div style={{ padding: "12px 14px", background: `${f.color}0d`, borderLeft: `3px solid ${f.color}`, borderRadius: "0 8px 8px 0", marginBottom: 14 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: f.color, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>How LUNA Solves It</div>
                  <div style={{ fontSize: 13, color: C.textDim, lineHeight: 1.7 }}>{f.how}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
                  {f.keyPoints.map((p, j) => (
                    <div key={j} style={{ display: "flex", gap: 10, padding: "8px 12px", background: C.card, borderRadius: 8, fontSize: 12, color: C.textDim }}>
                      <span style={{ color: f.color }}>✦</span> {p}
                    </div>
                  ))}
                </div>
                <div style={{ padding: "12px 14px", background: `${C.gold}0d`, border: `1px solid ${C.gold}33`, borderRadius: 10 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: C.gold, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>💛 Confidence Impact</div>
                  <div style={{ fontSize: 13, color: C.textDim, lineHeight: 1.7, fontStyle: "italic", fontFamily: "'Libre Baskerville', serif" }}>{f.confidence}</div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Closing insight */}
        <div style={{ marginTop: 24, padding: "24px", background: `linear-gradient(135deg, ${C.rose}18, ${C.lavDark}18)`, border: `1px solid ${C.rose}33`, borderRadius: 18, textAlign: "center" }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>🌸</div>
          <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 10 }}>The Bigger Vision</h3>
          <p style={{ fontSize: 14, color: C.textDim, lineHeight: 1.8, maxWidth: 500, margin: "0 auto" }}>
            Every woman who uses LUNA for 3 months will understand her cycle better than most doctors do. That knowledge is the most powerful form of confidence — and it stays with her for life.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── ROOT ──────────────────────────────────────────────────

export default function LunaWellness() {
  const [view, setView] = useState("app");

  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      {/* View Switcher */}
      <div style={{ display: "flex", justifyContent: "center", padding: "12px 16px", background: "#0b0d12", borderBottom: "1px solid #252840", gap: 8, position: "sticky", top: 0, zIndex: 100 }}>
        {[{ id: "app", label: "📱 App Mockup" }, { id: "plan", label: "📋 Feature Plan" }].map(v => (
          <button key={v.id} onClick={() => setView(v.id)} style={{
            padding: "8px 20px", borderRadius: 20, border: "none", cursor: "pointer",
            background: view === v.id ? C.rose : "#1b1f2e",
            color: view === v.id ? "white" : "#9198c0",
            fontSize: 13, fontWeight: view === v.id ? 700 : 400, fontFamily: "'Sora', sans-serif",
            transition: "all 0.2s",
          }}>{v.label}</button>
        ))}
      </div>

      {view === "app" ? <AppScreen /> : <FeaturePlan />}
    </div>
  );
}
