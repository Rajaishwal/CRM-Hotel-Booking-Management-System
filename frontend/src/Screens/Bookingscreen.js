import React, { useEffect, useState } from "react";
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
  const totaldays = moment.duration(toDateMoment.diff(fromDateMoment)).asDays() + 1;
  const totalamount = room ? totaldays * room.rentperday : 0;

  useEffect(() => {
    const fetchRoom = async () => {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (!currentUser) {
        setLoading(false);
        await Swal.fire({
          icon: "info",
          title: "Login Required",
          text: "Please login to book a room",
          confirmButtonText: "Go to Login",
        });
        window.location.href = "/login";
        return;
      }
      try {
        setLoading(true);
        const response = await axios.post("https://crm-mern-hotel-booking-management-system-izx4.onrender.com/api/rooms/getallroombyid", { roomid });
        setRoom(response.data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [roomid]);

  const bookRoom = async () => {
    const bookingDetails = {
      room,
      userid: user._id,
      fromdate,
      todate,
      totalamount,
      totaldays,
    };
    try {
      await axios.post("https://crm-mern-hotel-booking-management-system-izx4.onrender.com/api/bookings/bookroom", bookingDetails);
      return true;
    } catch {
      throw new Error("Booking error");
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const result = await axios.post("https://crm-mern-hotel-booking-management-system-izx4.onrender.com/api/payments/razorpay", {
        amount: totalamount,
        currency: "INR",
      });

      const options = {
        key: "rzp_test_Z52xmOfB4khv86",
        amount: result.data.amount,
        currency: result.data.currency,
        name: "Stay Room",
        description: `Booking room ${room.name}`,
        order_id: result.data.id,
        handler: async () => {
          try {
            await bookRoom();
            await Swal.fire({
              icon: "success",
              title: "Room Booked Successfully!",
              confirmButtonText: "OK",
            });
            window.location.reload();
          } catch {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          }
        },
        prefill: { name: user.name, email: user.email },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      Swal.fire({
        icon: "error",
        title: "Payment Initialization Failed",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <Error />;

  return (
    <div className="m-5">
      {room ? (
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
              <button className="btn btn-primary" onClick={handlePayment} disabled={loading}>
                {loading ? "Processing..." : "Pay Now"}
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
