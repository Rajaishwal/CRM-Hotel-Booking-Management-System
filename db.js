const mongoose = require('mongoose');

const mongoURL = 'mongodb+srv://mern-roomstay:roomstay321@cluster0.t8xxte6.mongodb.net/mern-roomstay?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURL)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((error) => console.log('MongoDB connection error:', error));

module.exports = mongoose;
