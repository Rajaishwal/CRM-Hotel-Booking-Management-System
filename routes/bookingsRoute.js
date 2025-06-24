const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Room = require("../models/room");
const moment = require("moment");

router.post("/bookroom", async (req, res) => {
  const { room, userid, fromdate, todate, totalamount, totaldays } = req.body;

  try {
    const newbooking = new Booking({
      room: room.name,
      roomid: room._id,
      userid,
      fromdate,
      todate,
      totalamount,
      totaldays,
      transactionid: "12345",
    });

    const booking = await newbooking.save();

    await Room.updateOne(
      { _id: room._id },
      {
        $push: {
          currentbookings: {
            bookingid: booking._id,
            fromdate: moment(fromdate, "DD-MM-YYYY").format("DD-MM-YYYY"),
            todate: moment(todate, "DD-MM-YYYY").format("DD-MM-YYYY"),
            userid: userid,
            status: booking.status,
          },
        },
      }
    );

    res.send("Room Booked Successfully");
  } catch (error) {
    console.error("Booking failed:", error);
    return res.status(400).json({ message: "Booking Failed", error });
  }
});

router.post("/getbookingsbyuserid", async (req, res) => {
  const userid = req.body.userid;

  try {
    const bookings = await Booking.find({ userid: userid });
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ message: "Booking Failed", error });
  }
});

router.post("/cancelbooking", async (req, res) => {
  const { bookingid, roomid } = req.body;

  try {
    const bookingitem = await Booking.findOne({ _id: bookingid });

    bookingitem.status = "cancelled";
    await bookingitem.save();

    const room = await Room.findOne({ _id: roomid });

    const bookings = room.currentbookings;

    const temp = bookings.filter(
      (booking) => booking.bookingid.toString() !== bookingid
    );
    room.currentbookings = temp;

    await room.save({ validateBeforeSave: false });

    res.send("Your booking cancelled successfully");
  } catch (error) {
    return res.status(400).json({ message: "Booking Failed", error });
  }
});

router.get('/getallbookings', async (req, res) => {

  try {
    const bookings = await Booking.find();
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ message: "Booking Failed", error });
  }
});

module.exports = router;
