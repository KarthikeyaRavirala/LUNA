import express from 'express';
const router = express.Router();

// Get room messages
router.get('/:cohortId/messages', async (req, res) => {
    res.status(200).json({ messages: [] });
});

// Post a new message (triggers intervention engine)
router.post('/:cohortId/messages', async (req, res) => {
    res.status(201).json({ message: 'Message posted (mock)' });
});

export default router;
