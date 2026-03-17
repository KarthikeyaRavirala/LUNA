import express from 'express';
const router = express.Router();

// Mock endpoints for Sprint 0. Integration with Supabase Auth comes later.

router.post('/signup', async (req, res) => {
    // Expected: { email, password, displayName }
    res.status(201).json({ message: 'User created (mock)' });
});

router.post('/login', async (req, res) => {
    // Expected: { email, password }
    res.status(200).json({ token: 'mock-jwt-token' });
});

export default router;
