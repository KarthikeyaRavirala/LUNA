import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

// Import Routes
import authRoutes from './routes/auth.js';
import cohortsRoutes from './routes/cohorts.js';
import roomsRoutes from './routes/rooms.js';
import paymentsRoutes from './routes/payments.js';
import adminRoutes from './routes/admin.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));

// Parse raw body for Razorpay webhooks, else JSON
app.use('/api/payments/webhook', express.raw({ type: 'application/json' }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cohorts', cohortsRoutes);
app.use('/api/rooms', roomsRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/admin', adminRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`LUNA Backend running on port ${PORT}`);
});
