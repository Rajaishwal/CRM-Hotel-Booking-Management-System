const express = require('express');
const router = express.Router();
const Room = require('../models/room');

// GET /api/rooms/ — fetch all rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ message: 'Error fetching rooms', error });
  }
});

// GET /api/rooms/getallrooms — alias for root
router.get('/getallrooms', async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.json(rooms);
  } catch (error) {
    console.error('Error in /getallrooms:', error);
    res.status(500).json({ message: 'Error fetching rooms', error });
  }
});

// POST /api/rooms/getallroombyid — fetch by ID
router.post('/getallroombyid', async (req, res) => {
  console.log('getallroombyid payload:', req.body);
  const { roomid } = req.body;
  if (!roomid) {
    return res.status(400).json({ message: 'Missing roomid in request body' });
  }

  try {
    const room = await Room.findById(roomid);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json(room);
  } catch (error) {
    console.error('Error fetching room by ID:', error);
    res.status(500).json({ message: 'Error fetching room by ID', error });
  }
});

// POST /api/rooms/addroom — create a new room
router.post('/addroom', async (req, res) => {
  console.log('addroom payload:', req.body);

  try {
    const newRoom = new Room(req.body);
    await newRoom.save();
    res.status(201).json({ message: 'New Room Added Successfully', room: newRoom });
  } catch (error) {
    console.error('Error adding room:', error);
    res.status(400).json({ message: 'Error adding room', error });
  }
});

module.exports = router;
