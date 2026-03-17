import { useState } from "react";

const sections = [
  {
    id: "vision",
    icon: "🌸",
    title: "Product Vision",
    color: "#C2185B",
    content: {
      headline: "LUNA — Connect Through Your Cycle",
      tagline: "The world's first cycle-synchronized social support platform for women.",
      description:
        "LUNA is a private, empathetic community app where women are grouped with peers who share their cycle timing — so they receive real-time understanding, support, and connection from people who *literally* know what they're going through, right now.",
    },
  },
  {
    id: "problem",
    icon: "💡",
    title: "Problem Statement",
    color: "#7B1FA2",
    points: [
      { label: "Isolated Experience", text: "PMS/PMDD affects 75–80% of women, yet it's mostly suffered alone or dismissed." },
      { label: "Misunderstood by Surroundings", text: "Partners, colleagues, and family rarely understand the emotional and physical weight of premenstrual phases." },
      { label: "Existing Apps Are Solo Tools", text: "Flo, Clue, and Period Tracker log cycles but offer zero community connection." },
      { label: "Unsynchronized Support", text: "Online groups (Reddit, Facebook) are always-on but never timed to when a woman actually needs support." },
    ],
  },
  {
    id: "solution",
    icon: "✨",
    title: "Core Solution — The Luna Algorithm",
    color: "#00796B",
    algorithm: [
      { step: "1", title: "Onboarding", desc: "User logs her last 3 cycle start dates. LUNA calculates her personal phase calendar (Follicular → Ovulatory → Luteal → Menstrual)." },
      { step: "2", title: "Cohort Matching", desc: "Among her network of ~100 women, LUNA groups those whose Luteal/PMS phase overlaps within a ±3 day window — forming 4 to 5 tight cohorts." },
      { step: "3", title: "Phase Rooms Activate", desc: "When a woman enters her PMS window, her cohort's group chat and feed goes LIVE. The room opens, notifications pulse gently, and her matched group is active together." },
      { step: "4", title: "Room Goes Quiet", desc: "After the phase ends, the room gracefully winds down until next month. Low noise, high relevance — always." },
    ],
  },
  {
    id: "features",
    icon: "📱",
    title: "Key Features",
    color: "#1565C0",
    features: [
      { name: "Luna Rooms", icon: "🌙", desc: "Temporary, phase-synced group chats. Cozy, anonymous-optional spaces. Disappear after the phase ends. No permanent receipts." },
      { name: "Mood Board Feed", icon: "🎨", desc: "A shared canvas inside the room — women post memes, rants, recipes, comfort content. AI curates calming content based on group mood signals." },
      { name: "Craving Kitchen", icon: "🍫", desc: "Crowdsourced comfort food & self-care rituals. 'What are you eating right now?' becomes a community ritual." },
      { name: "Partner Bridge", icon: "💌", desc: "Optional: Women can silently notify their partner (app sends a gentle, non-intrusive 'she needs extra care this week' ping — no details shared)." },
      { name: "Husband Hangout Mode", icon: "🎮", desc: "Partners get matched into their own relaxed group (sports, movies, games, cooking) while wives are in Luna Rooms — keeping households harmonious." },
      { name: "Luna Journal", icon: "📓", desc: "Private cycle-aware journal. AI identifies emotional patterns across months. Helps women understand themselves and share insights with doctors." },
      { name: "Symptom Validator", icon: "🩺", desc: "Community symptom tracking — women vote on shared experiences. Normalizes what's common, flags what may need medical attention." },
      { name: "Calm Corner", icon: "🧘", desc: "Guided meditations, breathing exercises, and curated playlists for each phase. AI-personalized based on logged mood." },
    ],
  },
  {
    id: "privacy",
    icon: "🔒",
    title: "Privacy & Trust Architecture",
    color: "#D84315",
    points: [
      { label: "No Real Names Required", text: "Users choose a Luna Name (e.g., 'CrimsonMoon_42'). Identity is optional to reveal." },
      { label: "Zero Health Data Selling", text: "Cycle data is stored encrypted, never sold, never used for ad targeting. This is non-negotiable and legally committed." },
      { label: "Ephemeral Rooms", text: "Group chats are deleted after each phase cycle. No screenshot culture. What happens in the room, stays in the room." },
      { label: "Consent Layers", text: "Women choose: who sees their phase status, whether partners are notified, and what data is used for matching." },
      { label: "Medical Disclaimer", text: "LUNA is a social support app, not a medical device. Clear disclaimers and partnerships with OB-GYN communities for credibility." },
    ],
  },
  {
    id: "market",
    icon: "📊",
    title: "Market Opportunity",
    color: "#558B2F",
    stats: [
      { number: "800M+", label: "Women globally experience menstrual cycles" },
      { number: "75–80%", label: "Experience PMS symptoms regularly" },
      { number: "$4.2B", label: "Women's health app market by 2027" },
      { number: "0", label: "Cycle-synchronized community platforms exist today" },
    ],
  },
  {
    id: "monetization",
    icon: "💰",
    title: "Revenue Model",
    color: "#F57F17",
    streams: [
      { name: "LUNA Premium", price: "₹199/month", desc: "Unlimited rooms, advanced journal AI, partner bridge, priority matching" },
      { name: "Brand Partnerships", price: "Ethical only", desc: "Heating pad brands, dark chocolate companies, wellness brands — contextually shown, never intrusive" },
      { name: "Clinic Connect", price: "B2B", desc: "Gynecologists and women's health clinics pay to be listed as trusted resources inside the app" },
      { name: "Corporate Wellness", price: "B2B", desc: "Companies pay for LUNA for Teams — helping HR understand and support women employees better" },
    ],
  },
  {
    id: "roadmap",
    icon: "🗺️",
    title: "Launch Roadmap",
    color: "#37474F",
    phases: [
      { phase: "Phase 1", time: "Month 1–3", title: "MVP", items: ["Cycle onboarding", "Cohort matching algorithm", "Luna Rooms (text only)", "Basic mood board"] },
      { phase: "Phase 2", time: "Month 4–6", title: "Growth", items: ["Partner Bridge feature", "Husband Hangout Mode", "Luna Journal (AI)", "Craving Kitchen"] },
      { phase: "Phase 3", time: "Month 7–12", title: "Scale", items: ["Symptom Validator", "Clinic Connect (B2B)", "Corporate Wellness tier", "Regional language support"] },
    ],
  },
];

export default function LunaConceptDoc() {
  const [active, setActive] = useState("vision");

  const current = sections.find((s) => s.id === active);

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#0d0d14", minHeight: "100vh", color: "#f0e6f6" }}>
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #1a0a2e 0%, #2d0f4e 50%, #1a0a2e 100%)",
          padding: "48px 32px 32px",
          borderBottom: "1px solid #3d1a5e",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(ellipse at 30% 50%, rgba(194,24,91,0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(123,31,162,0.15) 0%, transparent 60%)" }} />
        <div style={{ position: "relative", maxWidth: 900, margin: "0 auto" }}>
          <div style={{ fontSize: 13, letterSpacing: "0.2em", color: "#C2185B", textTransform: "uppercase", marginBottom: 12 }}>Product Blueprint</div>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 400, margin: "0 0 8px", lineHeight: 1.1, letterSpacing: "-1px" }}>
            🌸 <span style={{ color: "#f8bbd0" }}>LUNA</span>
          </h1>
          <p style={{ fontSize: 18, color: "#ce93d8", margin: "0 0 4px", fontStyle: "italic" }}>Connect Through Your Cycle</p>
          <p style={{ fontSize: 14, color: "#9e7bba", margin: 0 }}>A 9/10 Workable Product Concept — Built from Your Idea</p>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px", display: "flex", gap: 24, flexWrap: "wrap" }}>
        {/* Sidebar Nav */}
        <div style={{ width: 200, flexShrink: 0 }}>
          <div style={{ position: "sticky", top: 16 }}>
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 10, width: "100%",
                  padding: "10px 14px", marginBottom: 4, borderRadius: 10, border: "none",
                  background: active === s.id ? `${s.color}22` : "transparent",
                  borderLeft: active === s.id ? `3px solid ${s.color}` : "3px solid transparent",
                  color: active === s.id ? "#f0e6f6" : "#9e7bba",
                  cursor: "pointer", textAlign: "left", fontSize: 13, fontFamily: "Georgia, serif",
                  transition: "all 0.2s",
                }}
              >
                <span>{s.icon}</span>
                <span>{s.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ background: "#12101e", borderRadius: 16, border: `1px solid ${current.color}33`, padding: "28px 28px", minHeight: 400 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `${current.color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
                {current.icon}
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: 22, fontWeight: 400, color: "#f8bbd0" }}>{current.title}</h2>
                <div style={{ width: 40, height: 2, background: current.color, marginTop: 6, borderRadius: 2 }} />
              </div>
            </div>

            {/* Vision Section */}
            {active === "vision" && (
              <div>
                <div style={{ background: `${current.color}15`, border: `1px solid ${current.color}33`, borderRadius: 12, padding: 24, marginBottom: 20 }}>
                  <h3 style={{ margin: "0 0 6px", fontSize: 26, fontWeight: 400, color: "#f8bbd0" }}>{current.content.headline}</h3>
                  <p style={{ margin: "0 0 14px", fontSize: 16, color: "#ce93d8", fontStyle: "italic" }}>{current.content.tagline}</p>
                  <p style={{ margin: 0, fontSize: 15, color: "#c5a8d8", lineHeight: 1.7 }}>{current.content.description}</p>
                </div>
                <div style={{ padding: "16px 20px", background: "#1a0a2e", borderRadius: 10, borderLeft: `4px solid ${current.color}` }}>
                  <p style={{ margin: 0, fontSize: 14, color: "#ce93d8", fontStyle: "italic" }}>
                    💭 "LUNA doesn't just track your period — it connects you to 4 other women going through it with you, right now."
                  </p>
                </div>
              </div>
            )}

            {/* Problem Section */}
            {active === "problem" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {current.points.map((p, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, padding: "16px 18px", background: "#1a0a2e", borderRadius: 10, border: "1px solid #2a1a3e" }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: `${current.color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0, color: current.color, fontWeight: "bold" }}>✗</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: "bold", color: "#f0e6f6", marginBottom: 4 }}>{p.label}</div>
                      <div style={{ fontSize: 14, color: "#a98fc0", lineHeight: 1.6 }}>{p.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Solution Section */}
            {active === "solution" && (
              <div>
                <p style={{ color: "#c5a8d8", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
                  The beating heart of LUNA is its <strong style={{ color: "#80cbc4" }}>cycle-synchronization engine</strong> — an algorithm that doesn't just track periods, but uses timing to create moments of genuine human connection.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {current.algorithm.map((a, i) => (
                    <div key={i} style={{ display: "flex", gap: 16, padding: "16px 18px", background: "#0a1a18", borderRadius: 10, border: `1px solid ${current.color}33` }}>
                      <div style={{ width: 36, height: 36, borderRadius: "50%", background: current.color, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold", flexShrink: 0, fontSize: 16 }}>{a.step}</div>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: "bold", color: "#80cbc4", marginBottom: 6 }}>{a.title}</div>
                        <div style={{ fontSize: 14, color: "#a8c8c0", lineHeight: 1.6 }}>{a.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features Section */}
            {active === "features" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
                {current.features.map((f, i) => (
                  <div key={i} style={{ padding: "16px 18px", background: "#0c0f1e", borderRadius: 12, border: `1px solid ${current.color}22`, transition: "border-color 0.2s" }}>
                    <div style={{ fontSize: 22, marginBottom: 8 }}>{f.icon}</div>
                    <div style={{ fontSize: 15, color: "#b39ddb", fontWeight: "bold", marginBottom: 6 }}>{f.name}</div>
                    <div style={{ fontSize: 13, color: "#9e7bba", lineHeight: 1.6 }}>{f.desc}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Privacy Section */}
            {active === "privacy" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <p style={{ color: "#ffab91", fontSize: 14, fontStyle: "italic", marginBottom: 4 }}>⚠️ Trust is LUNA's most important feature. Without it, nothing else works.</p>
                {current.points.map((p, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, padding: "14px 18px", background: "#1a0f0a", borderRadius: 10, border: `1px solid ${current.color}33` }}>
                    <span style={{ color: current.color, fontSize: 18, flexShrink: 0 }}>🔒</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: "bold", color: "#ffccbc", marginBottom: 4 }}>{p.label}</div>
                      <div style={{ fontSize: 14, color: "#bcaaa4", lineHeight: 1.6 }}>{p.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Market Section */}
            {active === "market" && (
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 24 }}>
                  {current.stats.map((s, i) => (
                    <div key={i} style={{ padding: "20px", background: "#0a140a", borderRadius: 12, border: `1px solid ${current.color}44`, textAlign: "center" }}>
                      <div style={{ fontSize: 32, fontWeight: "bold", color: "#aed581", fontFamily: "monospace" }}>{s.number}</div>
                      <div style={{ fontSize: 13, color: "#8bc34a", marginTop: 6, lineHeight: 1.5 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: "16px 20px", background: "#0a140a", borderRadius: 10, borderLeft: `4px solid ${current.color}` }}>
                  <p style={{ margin: 0, fontSize: 14, color: "#aed581" }}>🎯 <strong>Blue Ocean Opportunity:</strong> No direct competitor exists in the cycle-synchronized social community space. First mover advantage is massive.</p>
                </div>
              </div>
            )}

            {/* Monetization Section */}
            {active === "monetization" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {current.streams.map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: "16px 18px", background: "#14100a", borderRadius: 10, border: `1px solid ${current.color}33` }}>
                    <div style={{ flexShrink: 0, minWidth: 90 }}>
                      <div style={{ fontSize: 14, fontWeight: "bold", color: "#ffe082" }}>{s.name}</div>
                      <div style={{ fontSize: 12, color: current.color, marginTop: 3 }}>{s.price}</div>
                    </div>
                    <div style={{ fontSize: 14, color: "#bcaaa4", lineHeight: 1.6 }}>{s.desc}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Roadmap Section */}
            {active === "roadmap" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {current.phases.map((p, i) => (
                  <div key={i} style={{ padding: "20px", background: "#0d1218", borderRadius: 12, border: `1px solid ${current.color}33` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                      <div style={{ padding: "4px 12px", background: `${current.color}22`, borderRadius: 20, fontSize: 12, color: current.color, fontWeight: "bold" }}>{p.phase}</div>
                      <div style={{ fontSize: 12, color: "#78909c" }}>{p.time}</div>
                      <div style={{ fontSize: 14, color: "#b0bec5", fontWeight: "bold" }}>{p.title}</div>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {p.items.map((item, j) => (
                        <div key={j} style={{ padding: "6px 12px", background: "#1c2530", borderRadius: 6, fontSize: 13, color: "#90a4ae" }}>✦ {item}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Score card */}
          <div style={{ marginTop: 16, padding: "16px 20px", background: "#12101e", borderRadius: 12, border: "1px solid #3d1a5e", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div style={{ fontSize: 13, color: "#9e7bba" }}>Idea Viability Score</div>
            <div style={{ display: "flex", gap: 8 }}>
              {["Originality ✦✦✦✦✦", "Market Need ✦✦✦✦✦", "Tech Feasibility ✦✦✦✦", "Monetization ✦✦✦✦", "Privacy Risk ⚠️ High Focus Needed"].map((tag, i) => (
                <div key={i} style={{ padding: "4px 10px", background: "#1a0a2e", borderRadius: 20, fontSize: 11, color: "#ce93d8", border: "1px solid #3d1a5e" }}>{tag}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
