const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const shortid = require('shortid');

const razorpay = new Razorpay({
  key_id: 'rzp_test_Z52xmOfB4khv86',
  key_secret: 'mviBMZHwzboUD6C5wtnqRQ56',
});

router.post('/razorpay', async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100, // Razorpay needs amount in paise
    currency: 'INR',
    receipt: shortid.generate(),
    payment_capture: 1, // Auto capture after payment success
  };

  try {
    const response = await razorpay.orders.create(options);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong');
  }
});

module.exports = router;
