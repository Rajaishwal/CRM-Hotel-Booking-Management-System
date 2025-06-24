const express = require('express');
const app = express();
const cors = require('cors');
const dbConfig = require('./db');
const roomsRoute = require('./routes/roomsRoute');
const usersRoute = require('./routes/usersRoute');
const bookingsRoute = require('./routes/bookingsRoute');
const paymentRoute = require('./routes/paymentRoute');

// Apply CORS before any routes
app.use(cors());
app.use(express.json());


// Now use routes
app.use('/api/rooms', roomsRoute);
app.use('/api/users', usersRoute);
app.use('/api/bookings', bookingsRoute);

app.use('/api/payments', paymentRoute);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Node server started using nodemon`));
