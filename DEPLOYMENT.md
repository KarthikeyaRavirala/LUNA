# Deployment Configuration for LUNA

## Frontend (LUNA-Phase1) - Vercel/Netlify

### Environment Variables Required:
```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
VITE_GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
VITE_APP_NAME=LUNA
VITE_APP_URL=https://tryluna.in
VITE_RESEND_API_KEY=re_your_resend_key_here
VITE_PARTNER_FROM_EMAIL=care@tryluna.in
```

## Backend - Railway/Render/Heroku

### Environment Variables Required:
```
PORT=3000
DATABASE_URL=postgresql://user:password@host:5432/database
FRONTEND_URL=https://your-deployed-frontend.vercel.app
```

## Database Setup (Supabase)

Run the SQL files in order:
1. backend/db/schema.sql - Create tables and structure
2. LUNA-Phase1/supabase/schema.sql - Additional frontend schema
3. LUNA-Phase1/supabase/seed.sql - Seed initial data

## Deployment Steps

### Option 1: Vercel (Frontend) + Railway (Backend)

#### Frontend (Vercel):
1. Go to vercel.com
2. Import GitHub repository: KarthikeyaRavirala/LUNA
3. Set Root Directory: `LUNA-Phase1`
4. Add environment variables from above
5. Deploy

#### Backend (Railway):
1. Go to railway.app
2. Deploy from GitHub: KarthikeyaRavirala/LUNA
3. Set Root Directory: `backend`
4. Add PostgreSQL database
5. Add environment variables
6. Deploy

### Option 2: Netlify (Frontend) + Render (Backend)

#### Frontend (Netlify):
1. Go to netlify.com
2. Import from Git: KarthikeyaRavirala/LUNA
3. Base directory: `LUNA-Phase1`
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Add environment variables
7. Deploy

#### Backend (Render):
1. Go to render.com
2. New Web Service from GitHub
3. Root directory: `backend`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add PostgreSQL database
7. Add environment variables
8. Deploy

### Option 3: Full Vercel Deployment

#### Frontend:
Same as Option 1 Frontend

#### Backend (Vercel Serverless):
Convert backend to Vercel serverless functions:
- Move routes to `/api` folder
- Update imports for serverless
- Deploy as Vercel project with root: `backend`

## Post-Deployment Tasks

1. Update CORS: Set FRONTEND_URL in backend to deployed frontend URL
2. Test authentication flow
3. Verify database connections
4. Test all API endpoints
5. Configure custom domain (optional)
6. Set up monitoring and logs

## URLs After Deployment

- Frontend: https://luna-[random].vercel.app
- Backend: https://luna-backend-[random].railway.app
- Database: Supabase connection string
