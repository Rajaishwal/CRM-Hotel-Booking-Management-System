require('dotenv').config();
const express = require('express');
const cors = require('cors');

require('./db'); // initialize DB connection

const roomsRoute = require('./routes/roomsRoute');
const usersRoute = require('./routes/usersRoute');
const bookingsRoute = require('./routes/bookingsRoute');
const paymentRoute = require('./routes/paymentRoute');

const app = express();
const port = process.env.PORT || 5000;


app.use(express.json());
app.use(cors());


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

// Start server
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
