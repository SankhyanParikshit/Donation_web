const express = require('express');
const Razorpay = require('razorpay');
const router = express.Router();
require('dotenv').config();

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET
});

router.post('/create-order', async (req, res) => {
  const { amount, currency } = req.body;
  try {
    const options = {
      amount: amount * 100, // Razorpay uses paise
      currency,
      receipt: `receipt_order_${Date.now()}`
    };

    const order = await instance.orders.create(options);
    res.status(200).json({ order });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ error: "Order creation failed" });
  }
});

module.exports = router;
