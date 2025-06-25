const express = require('express');
const router = express.Router();
const Room = require('../models/room');

// GET /api/rooms/ — fetch all rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.json(rooms);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching rooms', error });
  }
});

// GET /api/rooms/getallrooms — same as root
router.get('/getallrooms', async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.json(rooms);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching rooms', error });
  }
});

// POST /api/rooms/getallroombyid — fetch room by ID
router.post('/getallroombyid', async (req, res) => {
  try {
    const room = await Room.findById(req.body.roomid);
    res.json(room);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching room', error });
  }
});

// POST /api/rooms/addroom — add a new room
router.post('/addroom', async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    await newRoom.save();
    res.send('New Room Added Successfully');
  } catch (error) {
    res.status(400).json({ message: 'Error adding room', error });
  }
});

module.exports = router;
