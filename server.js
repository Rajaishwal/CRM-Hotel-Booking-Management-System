const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const roomsRoute = require('./routes/roomsRoute');
const usersRoute = require('./routes/usersRoute');
const bookingsRoute = require('./routes/bookingsRoute');
const paymentRoute = require('./routes/paymentRoute');

const app = express();
const port = process.env.PORT || 5000;

// Allow multiple specific origins (frontend and backend)
const allowedOrigins = [
  'https://crm-hotel-booking-management-system-1.onrender.com',
  'https://crm-hotel-booking-management-system-2.onrender.com'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like Postman or server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error('CORS policy violation: Not allowed by server'), false);
  },
  credentials: true,
}));

app.use(express.json());

// API routes
app.use('/api/rooms', roomsRoute);
app.use('/api/users', usersRoute);
app.use('/api/bookings', bookingsRoute);
app.use('/api/payments', paymentRoute);

// Root route for simple testing
app.get('/', (req, res) => {
  res.send('Backend server is running');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
