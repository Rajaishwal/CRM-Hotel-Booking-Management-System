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

const allowedOrigins = [
  'https://crm-hotel-booking-management-system-1.onrender.com',
  'https://crm-hotel-booking-management-system-2.onrender.com'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow server-to-server/Postman
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('CORS policy violation'), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Pre-flight support
app.options('*', cors());

// Parse JSON bodies
app.use(express.json());

// API endpoints
app.use('/api/rooms', roomsRoute);
app.use('/api/users', usersRoute);
app.use('/api/bookings', bookingsRoute);
app.use('/api/payments', paymentRoute);

// Simple root check
app.get('/', (req, res) => {
  res.send('Backend server is running');
});


app.listen(port, () => console.log(`Server running on port ${port}`));
