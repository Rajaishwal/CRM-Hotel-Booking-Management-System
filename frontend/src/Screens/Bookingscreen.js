import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Components/Loader";
import Error from "../Components/Error";
import moment from "moment";
import Swal from "sweetalert2";

function Bookingscreen() {
  const { roomid, fromdate, todate } = useParams();
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [room, setRoom] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fromDateMoment = moment(fromdate, "DD-MM-YYYY");
  const toDateMoment = moment(todate, "DD-MM-YYYY");

  const totaldays =
    moment.duration(toDateMoment.diff(fromDateMoment)).asDays() + 1;
  const totalamount = room ? totaldays * room.rentperday : 0;

  useEffect(() => {
    const fetchRoom = async () => {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      if (!user) {
        setLoading(false);

        Swal.fire({
          icon: "info",
          title: "Login Required",
          text: "Please login to book a room",
          confirmButtonText: "Go to Login",
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then((result) => {
          if(result.isConfirmed) {

          // document.body.innerHTML = '';
          window.location.href = "/login";
          }
        });

        return null;
      }

      try {
        setLoading(true);
        const response = await axios.post(
          "http://localhost:5000/api/rooms/getallroombyid",
          { roomid }
        );
        setRoom(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching room:", err);
        setError(true);
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomid]);

  // Booking API call only
  async function bookRoom() {
    const bookingDetails = {
      room,
      userid: user._id,
      fromdate,
      todate,
      totalamount,
      totaldays,
    };

    try {
      await axios.post(
        "http://localhost:5000/api/bookings/bookroom",
        bookingDetails
      );
      return true;
    } catch (error) {
      console.error("Booking error:", error);
      throw error;
    }
  }

  // Razorpay handler
  async function handlePayment() {
    try {
      const result = await axios.post(
        "http://localhost:5000/api/payments/razorpay",
        {
          amount: totalamount,
          currency: "INR",
        }
      );

      const options = {
        key: "rzp_test_Z52xmOfB4khv86", // Replace with your key_id
        amount: result.data.amount,
        currency: result.data.currency,
        name: "Stay Room",
        description: `Booking room ${room.name}`,
        order_id: result.data.id,
        handler: async function (response) {
          try {
            setLoading(true); // Show loader
            await bookRoom(); // Save booking
            setTimeout(async () => {
              setLoading(false); // Hide loader

              const result = await Swal.fire({
                icon: "success",
                title: "Congratulations!",
                text: "Room Booked Successfully!",
                confirmButtonText: "OK",
                allowOutsideClick: false,
                allowEscapeKey: false,
              });

              if (result.isConfirmed) {
                window.location.reload();
              }
            }, 1500);
          } catch (error) {
            setLoading(false);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              confirmButtonText: "OK",
            });
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Initialization Error:", error);
      alert("Failed to initialize Razorpay.");
    }
  }

  return (
    <div className="m-5">
      {loading ? (
        <h1>
          <Loader />
        </h1>
      ) : room ? (
        <div className="row justify-content-center mt-5 bs">
          <div className="col-md-6">
            <h1>{room.name}</h1>
            <img src={room.imageurls[0]} className="bigimg" alt="room" />
          </div>

          <div className="col-md-6" style={{ textAlign: "right" }}>
            <h1 className="text-end">Booking Details</h1>
            <hr />
            <p>Name: {user.name}</p>
            <p>From Date: {fromdate}</p>
            <p>To Date: {todate}</p>
            <p>Max Count: {room.maxcount}</p>

            <h1 className="text-end">Amount</h1>
            <hr />
            <p>Total Days: {totaldays}</p>
            <p>Rent per Day: ₹{room.rentperday}</p>
            <p>Total Amount: ₹{totalamount}</p>

            <div style={{ float: "right" }}>
              <button className="btn btn-primary" onClick={handlePayment}>
                Pay Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default Bookingscreen;
