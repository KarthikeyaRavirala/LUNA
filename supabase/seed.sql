-- LUNA Supabase Mock Data Seed
-- To apply: npx supabase db reset (once project initialized)

-- 1. Insert 5 Users Across Phases
INSERT INTO users (id, email, luna_name, full_name, role, current_phase, onboarded) VALUES
('b19cfba3-b0e7-4e67-ab10-fc2b6a22f251', 'priya@luna.app', 'MoonRose_22', 'Priya S.', 'user', 'luteal', true),
('f2d8a4e9-1c7b-4832-9b5f-5d1c2a0b3e64', 'sarah@luna.app', 'CycleSister', 'Sarah J.', 'user', 'follicular', true),
('e9b41a5c-7d3f-4e2b-8a1c-6f8d9c0e4b2a', 'anya@luna.app', 'AnyaBloom', 'Anya K.', 'user', 'menstrual', true),
('c8d7e6f5-a4b3-4c2d-9e1f-0a2b3c4d5e6f', 'zoya@luna.app', 'ZoyaZ', 'Zoya M.', 'premium', 'ovulatory', true),
('d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a', 'kiran@luna.app', 'KiranWave', 'Kiran R.', 'user', 'luteal', true);

-- 2. Insert 1 Cohort & Members
INSERT INTO cohorts (id, name, phase_alignment) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Luteal Sisters #402', 'luteal');

INSERT INTO cohort_members (cohort_id, user_id) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'b19cfba3-b0e7-4e67-ab10-fc2b6a22f251'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a');

-- 3. Insert Posts
INSERT INTO posts (id, user_id, content, phase_tag, cohort_id, is_anonymous) VALUES
('p1', 'b19cfba3-b0e7-4e67-ab10-fc2b6a22f251', 'Anyone else get insane chocolate cravings right before day 1?', 'luteal', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', false),
('p2', 'f2d8a4e9-1c7b-4832-9b5f-5d1c2a0b3e64', 'First day of follicular! Just crushed a 5k run, energy is back!! 🏃‍♀️✨', 'follicular', null, false),
('p3', 'c8d7e6f5-a4b3-4c2d-9e1f-0a2b3c4d5e6f', 'Feeling so confident today for my presentation. Ovulatory phase magic is real! 🌟', 'ovulatory', null, false),
('p4', 'e9b41a5c-7d3f-4e2b-8a1c-6f8d9c0e4b2a', 'Heating pad + tea = heaven. Sending love to everyone bleeding today ❤️', 'menstrual', null, true);

-- 4. Journal Entries
INSERT INTO journal_entries (id, user_id, content, mood, phase_at_time, symptoms) VALUES
('j1', 'b19cfba3-b0e7-4e67-ab10-fc2b6a22f251', 'Feeling a bit foggy today. Need to remember to drink water.', 'cloudy', 'luteal', '{"brain_fog": true, "cramps": false}'),
('j2', 'f2d8a4e9-1c7b-4832-9b5f-5d1c2a0b3e64', 'Great day at work, highly productive.', 'happy', 'follicular', '{"energy": "high"}');

-- 5. Wellness Logs & Recipes
INSERT INTO recipes (id, title, phase_target, description, content, tags) VALUES
('r1', 'Iron-Rich Spinach Dal', 'menstrual', 'Replenish iron levels during your period.', 'Cook spinach with lentils and mild spices...', '{"iron", "warm"}'),
('r2', 'Maca Smoothie Bowl', 'follicular', 'Energy boosting superfoods to match rising estrogen.', 'Blend maca powder, berries, and oat milk...', '{"energy", "cold"}'),
('r3', 'Avocado & Seed Toast', 'ovulatory', 'Healthy fats to support hormone peaks.', 'Smash avocado with pumpkin and flax seeds...', '{"fats", "quick"}'),
('r4', 'Dark Chocolate & Magnesium Bites', 'luteal', 'Satisfy cravings and reduce cramping.', 'Mix dark cocoa, dates, and almonds...', '{"magnesium", "sweet"}');
