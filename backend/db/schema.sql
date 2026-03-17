-- backend/db/schema.sql
-- Luna PostgreSQL Database Schema (Privacy First)

-- cohorts: 5 women per cohort, phases staggered by ~7 days
CREATE TABLE cohorts (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  is_active   BOOLEAN DEFAULT TRUE
);

-- users: auth handled by Supabase, we store profile only
CREATE TABLE users (
  id          UUID PRIMARY KEY, -- References auth.users(id) from Supabase
  display_name TEXT NOT NULL,
  avatar_url  TEXT,
  current_phase TEXT CHECK (current_phase IN ('MENSTRUAL','FOLLICULAR','OVULATORY','LUTEAL')),
  tier        TEXT DEFAULT 'free' CHECK (tier IN ('free','pro','elite')),
  trial_start DATE,
  cohort_id   UUID REFERENCES cohorts(id),
  created_at  TIMESTAMPTZ DEFAULT NOW()
  -- NOTE: no cycle_start_date, no period_dates — ever
);

-- room_messages: ephemeral — auto-deleted after phase_expires_at
CREATE TABLE room_messages (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cohort_id       UUID REFERENCES cohorts(id) ON DELETE CASCADE,
  user_id         UUID REFERENCES users(id),
  content         TEXT NOT NULL,
  phase_tag       TEXT NOT NULL,
  phase_expires_at TIMESTAMPTZ NOT NULL, -- 7 days post-phase
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- journal_entries: private, encrypted at rest
CREATE TABLE journal_entries (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id   UUID REFERENCES users(id),
  phase_tag TEXT NOT NULL,
  content   TEXT NOT NULL, -- encrypted client-side before storage
  mood      INTEGER CHECK (mood BETWEEN 1 AND 5),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- subscriptions: Razorpay webhook updates this
CREATE TABLE subscriptions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES users(id),
  razorpay_sub_id TEXT UNIQUE,
  tier            TEXT NOT NULL,
  status          TEXT DEFAULT 'active',
  current_period_end TIMESTAMPTZ
);
