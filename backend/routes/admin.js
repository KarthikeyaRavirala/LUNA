import express from 'express';
const router = express.Router();

// Get system stats
router.get('/stats', async (req, res) => {
    res.status(200).json({ totalUsers: 0, premiumUsers: 0 });
});

export default router;
