import express from 'express';
const router = express.Router();

// Assign a user to a cohort based on phase
router.post('/assign', async (req, res) => {
    res.status(200).json({ message: 'Cohort assigned (mock)', cohortId: 'mock-uuid' });
});

// Get cohort members
router.get('/:id/members', async (req, res) => {
    res.status(200).json({ members: [] });
});

export default router;
