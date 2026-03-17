// ============================================================
// LUNA — Google OAuth + API Integration Helper
// Phase 2 — src/lib/googleAuth.js
//
// Usage:
//   import { signInWithGoogle, getAuthClient } from './lib/googleAuth';
// ============================================================

// ── Required scopes for each integration ──────────────────
export const GOOGLE_SCOPES = {
    base: 'openid email profile',
    calendar: 'https://www.googleapis.com/auth/calendar.events',
    tasks: 'https://www.googleapis.com/auth/tasks',
    fit: 'https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.heart_rate.read',
    gmail: 'https://www.googleapis.com/auth/gmail.send',
};

// All scopes combined (Phase 2 default)
export const ALL_SCOPES = Object.values(GOOGLE_SCOPES).join(' ');

// ── Google OAuth Config ────────────────────────────────────
// Replace with your actual Client ID from Google Cloud Console
// Store in .env: VITE_GOOGLE_CLIENT_ID=your_client_id_here.apps.googleusercontent.com
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'YOUR_CLIENT_ID_HERE.apps.googleusercontent.com';

// ── Supabase ──────────────────────────────────────────────
// import { createClient } from '@supabase/supabase-js';
// export const supabase = createClient(
//   import.meta.env.VITE_SUPABASE_URL,
//   import.meta.env.VITE_SUPABASE_ANON_KEY
// );

// ── Sign In with Google → exchange for Supabase session ───
// Phase 2 implementation (requires supabase + @react-oauth/google installed)
//
// export async function signInWithGoogle(googleCredential) {
//   const { data, error } = await supabase.auth.signInWithIdToken({
//     provider: 'google',
//     token: googleCredential,
//   });
//   if (error) throw error;
//   return data;
// }

// ── Google Calendar: block phase windows ──────────────────
//
// export async function blockPhaseOnCalendar({ accessToken, phaseName, startDate, endDate }) {
//   const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
//     method: 'POST',
//     headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       summary: `🌸 ${phaseName} Phase — LUNA`,
//       description: 'Auto-scheduled by LUNA. Extra care time.',
//       start: { date: startDate },
//       end:   { date: endDate },
//       colorId: '11',  // Tomato (red)
//       reminders: { useDefault: false, overrides: [{ method: 'popup', minutes: 1440 }] },
//     }),
//   });
//   return response.json();
// }

// ── Google Tasks: create phase habits ─────────────────────
//
// export async function createPhaseHabits({ accessToken, phase, taskListId }) {
//   const habits = PHASE_HABITS[phase] || [];
//   for (const habit of habits) {
//     await fetch(`https://tasks.googleapis.com/tasks/v1/lists/${taskListId}/tasks`, {
//       method: 'POST',
//       headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
//       body: JSON.stringify({ title: habit, due: new Date().toISOString() }),
//     });
//   }
// }

// ── Google Fit: fetch activity data ───────────────────────
//
// export async function fetchFitActivity({ accessToken }) {
//   const now = Date.now();
//   const weekAgo = now - 7 * 24 * 60 * 60 * 1000;
//   const response = await fetch(
//     'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate',
//     {
//       method: 'POST',
//       headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         aggregateBy: [{ dataTypeName: 'com.google.step_count.delta' }],
//         bucketByTime: { durationMillis: 86400000 },
//         startTimeMillis: weekAgo,
//         endTimeMillis: now,
//       }),
//     }
//   );
//   return response.json();
// }

// ── Gmail: send monthly health summary ────────────────────
//
// export async function sendHealthSummary({ accessToken, to, pdfBase64 }) {
//   const email = [
//     `To: ${to}`,
//     'Subject: Your LUNA Monthly Cycle Summary 🌸',
//     'MIME-Version: 1.0',
//     'Content-Type: text/html',
//     '',
//     '<h2>Your LUNA Cycle Summary</h2><p>...</p>',
//   ].join('\n');
//   const encoded = btoa(email).replace(/\+/g, '-').replace(/\//g, '_');
//   await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
//     method: 'POST',
//     headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
//     body: JSON.stringify({ raw: encoded }),
//   });
// }

// ── Phase habit suggestions for Google Tasks ──────────────
export const PHASE_HABITS = {
    menstrual: ['💧 Drink 3L water', '🧘 Yin yoga 20 min', '🌡️ Heat therapy', '💤 Sleep by 10pm'],
    follicular: ['📚 Learn something new', '🏃 HIIT workout', '💧 Drink 2.5L water', '🤝 Schedule social plans'],
    ovulatory: ['🎤 Big presentation or pitch today', '🏋️ Strength training', '💧 Stay cool — 2.5L water', '🎯 Make major decisions'],
    luteal: ['📓 Journal your feelings', '💊 Magnesium supplement', '💧 3L water + electrolytes', '🌿 Gentle walk 25 min'],
};
