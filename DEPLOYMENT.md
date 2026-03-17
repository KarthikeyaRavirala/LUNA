# 🚀 LUNA Deployment Guide

## Quick Start - Deploy Using GitHub Actions

### Step 1: Enable GitHub Pages
1. Go to: https://github.com/KarthikeyaRavirala/LUNA/settings/pages
2. Under "Source", select **GitHub Actions**
3. Your site will deploy automatically when you push to main branch

### Step 2: Add Secrets (Required for Frontend)
Go to: https://github.com/KarthikeyaRavirala/LUNA/settings/secrets/actions

Add these secrets:
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `VITE_GOOGLE_CLIENT_ID` - Your Google OAuth client ID

### Step 3: Trigger Deployment
Just push any change to the `LUNA-Phase1` folder and GitHub Actions will:
- Build your React app
- Deploy it to GitHub Pages
- Your app will be live at: `https://KarthikeyaRavirala.github.io/LUNA`

---

## Alternative: Manual Deployment

### Option A: Vercel (Recommended for Frontend)

1. **Go to** [vercel.com](https://vercel.com)
2. **Click** "Add New Project"
3. **Import** your GitHub repo: `KarthikeyaRavirala/LUNA`
4. **Configure**:
   - Root Directory: `LUNA-Phase1`
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. **Add Environment Variables**:
   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
   ```
6. **Deploy!**

### Option B: Netlify

1. **Go to** [netlify.com](https://netlify.com)
2. **Import** from GitHub
3. **Settings**:
   - Base directory: `LUNA-Phase1`
   - Build command: `npm run build`
   - Publish directory: `dist`
4. **Add environment variables** (same as above)
5. **Deploy**

---

## Backend Deployment

### Railway (Easiest)

1. **Go to** [railway.app](https://railway.app)
2. **New Project** → "Deploy from GitHub"
3. **Select**: `KarthikeyaRavirala/LUNA`
4. **Configure**:
   - Root directory: `backend`
   - Add PostgreSQL database plugin
5. **Environment Variables**:
   ```
   PORT=3000
   DATABASE_URL=postgresql://...
   FRONTEND_URL=https://your-frontend-url
   ```
6. **Deploy**

### Render

1. **Go to** [render.com](https://render.com)
2. **New Web Service** from GitHub
3. **Root directory**: `backend`
4. **Build**: `npm install`
5. **Start**: `npm start`
6. **Add PostgreSQL** and environment variables

---

## Database Setup (Supabase)

1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Go to SQL Editor
4. Run these files in order:
   - `backend/db/schema.sql`
   - `LUNA-Phase1/supabase/schema.sql`
   - `LUNA-Phase1/supabase/seed.sql`

---

## After Deployment

✅ Update backend CORS with your frontend URL  
✅ Test login/authentication  
✅ Verify database connections  
✅ Test all features  

**Need help?** Check your GitHub Actions tab for deployment logs!
