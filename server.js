const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const dbConfig = require('./db');

const roomsRoute = require('./routes/roomsRoute');
const usersRoute = require('./routes/usersRoute');
const bookingsRoute = require('./routes/bookingsRoute');
const paymentRoute = require('./routes/paymentRoute');

dotenv.config(); // environment variables

const app = express();
const port = process.env.PORT || 5000;

// Allow requests from your frontend Render URL
app.use(cors({
  origin: 'https://crm-hotel-booking-management-system-1.onrender.com',
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/rooms', roomsRoute);
app.use('/api/users', usersRoute);
app.use('/api/bookings', bookingsRoute);
app.use('/api/payments', paymentRoute);

// Server listening
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
