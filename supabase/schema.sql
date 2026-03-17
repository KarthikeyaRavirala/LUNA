-- ============================================================
-- LUNA — Supabase Database Schema
-- Phase 2 — All tables + Row Level Security policies
-- Generated from luna-implementation-plan.jsx (Phase 02)
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── USERS ──────────────────────────────────────────────────
CREATE TABLE users (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_id         UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  luna_name       TEXT NOT NULL UNIQUE,
  email           TEXT,
  avatar_url      TEXT,
  city            TEXT DEFAULT 'Hyderabad',
  cycle_length    INT  DEFAULT 28,
  phase_start_dates JSONB DEFAULT '[]',   -- last 3 period start dates as ISO strings
  current_phase   TEXT DEFAULT 'follicular' CHECK (current_phase IN ('menstrual','follicular','ovulatory','luteal')),
  phase_day       INT  DEFAULT 1,
  google_refresh_token TEXT,              -- encrypted, for Calendar/Fit API calls
  partner_email   TEXT,
  partner_bridge_on BOOLEAN DEFAULT false,
  onboarded       BOOLEAN DEFAULT false,
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- ── CYCLES ─────────────────────────────────────────────────
CREATE TABLE cycles (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  start_date  DATE NOT NULL,
  end_date    DATE,
  cycle_length INT,
  phase_day   INT,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- ── COHORTS ────────────────────────────────────────────────
CREATE TABLE cohorts (
  id                 UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phase              TEXT NOT NULL CHECK (phase IN ('menstrual','follicular','ovulatory','luteal')),
  phase_window_start DATE NOT NULL,
  phase_window_end   DATE NOT NULL,
  member_ids         UUID[] NOT NULL DEFAULT '{}',
  room_active        BOOLEAN DEFAULT false,
  room_opened_at     TIMESTAMPTZ,
  room_closed_at     TIMESTAMPTZ,
  created_at         TIMESTAMPTZ DEFAULT now()
);

-- ── POSTS (Social Feed) ────────────────────────────────────
CREATE TABLE posts (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content      TEXT NOT NULL,
  image_url    TEXT,
  tags         TEXT[] DEFAULT '{}',
  phase        TEXT CHECK (phase IN ('menstrual','follicular','ovulatory','luteal')),
  visibility   TEXT DEFAULT 'public' CHECK (visibility IN ('public','cohort','private')),
  likes_count  INT  DEFAULT 0,
  comments_count INT DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT now()
);

-- ── POST LIKES ─────────────────────────────────────────────
CREATE TABLE post_likes (
  user_id  UUID REFERENCES users(id) ON DELETE CASCADE,
  post_id  UUID REFERENCES posts(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, post_id)
);

-- ── COMMENTS ───────────────────────────────────────────────
CREATE TABLE comments (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id    UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content    TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ── MESSAGES (Luna Rooms) ──────────────────────────────────
-- These are ephemeral: deleted after phase ends (handled by edge function)
CREATE TABLE messages (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cohort_id  UUID NOT NULL REFERENCES cohorts(id) ON DELETE CASCADE,
  user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  text       TEXT NOT NULL,
  emoji_reaction TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ  -- set to phase_window_end + 24hrs
);

-- ── WELLNESS LOGS ──────────────────────────────────────────
-- Strictly private (user only)
CREATE TABLE wellness_logs (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date       DATE NOT NULL,
  mood       INT CHECK (mood BETWEEN 1 AND 5),
  energy     INT CHECK (energy BETWEEN 1 AND 100),
  water_ml   INT DEFAULT 0,
  sleep_hrs  NUMERIC(3,1),
  habits     JSONB DEFAULT '{}',   -- { hydration: true, journal: false, etc. }
  phase      TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, date)
);

-- ── JOURNAL ENTRIES ────────────────────────────────────────
-- Private cycle-aware diary
CREATE TABLE journal_entries (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date       DATE NOT NULL,
  text       TEXT NOT NULL,
  mood       INT CHECK (mood BETWEEN 1 AND 5),
  mood_emoji TEXT,
  mood_label TEXT,
  phase      TEXT,
  phase_day  INT,
  ai_tags    TEXT[] DEFAULT '{}',      -- AI-generated emotional pattern tags (Phase 3)
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, date)
);

-- ── RECIPES (Craving Kitchen) ──────────────────────────────
CREATE TABLE recipes (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name       TEXT NOT NULL,
  emoji      TEXT DEFAULT '🍽',
  content    TEXT NOT NULL,
  phase      TEXT CHECK (phase IN ('menstrual','follicular','ovulatory','luteal','all')),
  benefit    TEXT,
  prep_time  TEXT,
  likes_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ── PARTNER BRIDGE ─────────────────────────────────────────
CREATE TABLE partner_bridge (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  partner_email   TEXT NOT NULL,
  ping_type       TEXT DEFAULT 'care',   -- 'care' | 'period' | 'custom'
  ping_sent_at    TIMESTAMPTZ,
  hangout_group_id UUID,
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- ── NOTIFICATIONS ──────────────────────────────────────────
CREATE TABLE notifications (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type       TEXT NOT NULL,  -- 'phase_change' | 'room_open' | 'new_message' | 'partner_ping' | 'missed_cycle'
  title      TEXT NOT NULL,
  message    TEXT,
  read       BOOLEAN DEFAULT false,
  data       JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE users          ENABLE ROW LEVEL SECURITY;
ALTER TABLE cycles         ENABLE ROW LEVEL SECURITY;
ALTER TABLE cohorts        ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts          ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_likes     ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments       ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages       ENABLE ROW LEVEL SECURITY;
ALTER TABLE wellness_logs  ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipes        ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_bridge ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications  ENABLE ROW LEVEL SECURITY;

-- Users: own row only for private fields
CREATE POLICY "user_read_own" ON users FOR SELECT USING (auth.uid() = auth_id);
CREATE POLICY "user_update_own" ON users FOR UPDATE USING (auth.uid() = auth_id);

-- Cycles: strictly private
CREATE POLICY "cycles_own" ON cycles FOR ALL USING (
  user_id = (SELECT id FROM users WHERE auth_id = auth.uid())
);

-- Posts: public or cohort-gated
CREATE POLICY "posts_select" ON posts FOR SELECT USING (
  visibility = 'public'
  OR user_id = (SELECT id FROM users WHERE auth_id = auth.uid())
  OR (
    visibility = 'cohort' AND
    user_id = ANY(
      SELECT unnest(member_ids) FROM cohorts
      WHERE (SELECT id FROM users WHERE auth_id = auth.uid()) = ANY(member_ids)
    )
  )
);
CREATE POLICY "posts_insert_own" ON posts FOR INSERT WITH CHECK (
  user_id = (SELECT id FROM users WHERE auth_id = auth.uid())
);
CREATE POLICY "posts_delete_own" ON posts FOR DELETE USING (
  user_id = (SELECT id FROM users WHERE auth_id = auth.uid())
);

-- Messages: cohort members only
CREATE POLICY "messages_cohort" ON messages FOR ALL USING (
  (SELECT id FROM users WHERE auth_id = auth.uid()) = ANY(
    SELECT unnest(member_ids) FROM cohorts WHERE id = cohort_id
  )
);

-- Wellness logs: private
CREATE POLICY "wellness_own" ON wellness_logs FOR ALL USING (
  user_id = (SELECT id FROM users WHERE auth_id = auth.uid())
);

-- Journal: strictly private
CREATE POLICY "journal_own" ON journal_entries FOR ALL USING (
  user_id = (SELECT id FROM users WHERE auth_id = auth.uid())
);

-- Partner bridge: private
CREATE POLICY "partner_bridge_own" ON partner_bridge FOR ALL USING (
  user_id = (SELECT id FROM users WHERE auth_id = auth.uid())
);

-- Notifications: own only
CREATE POLICY "notifications_own" ON notifications FOR ALL USING (
  user_id = (SELECT id FROM users WHERE auth_id = auth.uid())
);

-- Recipes: public read, own write
CREATE POLICY "recipes_select" ON recipes FOR SELECT USING (true);
CREATE POLICY "recipes_insert" ON recipes FOR INSERT WITH CHECK (
  user_id = (SELECT id FROM users WHERE auth_id = auth.uid())
);

-- ============================================================
-- INDEXES for performance
-- ============================================================

CREATE INDEX idx_posts_user_id    ON posts(user_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_messages_cohort  ON messages(cohort_id, created_at);
CREATE INDEX idx_journal_user_date ON journal_entries(user_id, date DESC);
CREATE INDEX idx_wellness_user_date ON wellness_logs(user_id, date DESC);
CREATE INDEX idx_cycles_user_id   ON cycles(user_id, start_date DESC);
CREATE INDEX idx_cohorts_phase    ON cohorts(phase, phase_window_start);
