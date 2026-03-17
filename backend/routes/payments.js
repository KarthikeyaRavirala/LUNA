import express from 'express';
const router = express.Router();

// Create Razorpay Subscription
router.post('/create-subscription', async (req, res) => {
    res.status(200).json({ subscriptionId: 'sub_mock_id' });
});

// Razorpay Webhook
router.post('/webhook', async (req, res) => {
    console.log('Webhook received:', req.body);
    res.json({ received: true });
});

export default router;
