require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./db');

const roomsRoute = require('./routes/roomsRoute');
const usersRoute = require('./routes/usersRoute');
const bookingsRoute = require('./routes/bookingsRoute');
const paymentRoute = require('./routes/paymentRoute');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

const allowedOrigins = [
  'http://localhost:3000',
  'https://crm-hotel-booking-management-system-n79t.onrender.com'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn('Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'), false);
    }
  },
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.options('/*corsPreflight', cors(corsOptions)); 

// Optional echo route
app.post('/api/rooms/addroom', (req, res) => {
  console.log('Echo payload:', req.body);
  res.json({ echo: req.body });
});

app.use('/api/rooms', roomsRoute);
app.use('/api/users', usersRoute);
app.use('/api/bookings', bookingsRoute);
app.use('/api/payments', paymentRoute);

app.get('/', (req, res) => {
  res.send('Backend server is running');
});

app.use('/*catchAll', (req, res) => {
  res.status(404).json({ error: `Cannot ${req.method} ${req.originalUrl}` });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
