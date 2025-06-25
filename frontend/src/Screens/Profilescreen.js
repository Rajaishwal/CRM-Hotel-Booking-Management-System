import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import Swal from "sweetalert2";
import { UserOutlined, BookOutlined } from "@ant-design/icons";
import axios from "axios";
import Loader from "../Components/Loader";
import Error from "../Components/Error";
import { Tag } from 'antd';

const Profilescreen = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) window.location.href = "/login";
  }, []);

  return (
    <div className="profile-bookings" style={{ padding: "20px" }}>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: (
              <span>
                <UserOutlined style={{ marginRight: 8 }} />
                Profile
              </span>
            ),
            children: (
              <>
                <h3>My Profile</h3>
                <br />
                <div className="bs" style={{ width: "50%" }}>
                  <h6><strong>Name:</strong> {user.name}</h6>
                  <h6><strong>Email:</strong> {user.email}</h6>
                  <h6><strong>isAdmin:</strong> {user.isAdmin ? "YES" : "NO"}</h6>
                </div>
              </>
            ),
          },
          {
            key: "2",
            label: (
              <span>
                <BookOutlined style={{ marginRight: 8 }} />
                Bookings
              </span>
            ),
            children: <MyBookings />,
          },
        ]}
      />
    </div>
  );
};

export default Profilescreen;

export function MyBookings() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [bookings, setbookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "https://crm-mern-hotel-booking-management-system-izx4.onrender.com/api/bookings/getbookingsbyuserid",
        { userid: user._id }
      );
      setbookings(res.data);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const cancelBooking = async (bookingid, roomid) => {
    try {
      setLoading(true);
      await axios.post("https://crm-mern-hotel-booking-management-system-izx4.onrender.com/api/bookings/cancelbooking", { bookingid, roomid });
      setTimeout(async () => {
        await Swal.fire({
          icon: "success",
          title: "Congrats!",
          text: "Room cancelled successfully!",
          confirmButtonText: "OK",
          allowOutsideClick: false,
        });
        fetchBookings();
      }, 1500);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <Error message="Error loading your bookings." />;

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          {bookings.map((booking) => (
            <div className="bs" key={booking._id}>
              <br />
              <h5>{booking.room}</h5>
              <h6><b>Booking Id :</b> {booking._id}</h6>
              <h6><b>Check In :</b> {booking.fromdate}</h6>
              <h6><b>Check Out :</b> {booking.todate}</h6>
              <h6><b>Amount :</b> {booking.totalamount}</h6>
              <h6>
                <b>Status :</b>{" "}
                {booking.status?.toLowerCase() === "cancelled" ? (
                  <Tag color="red">CANCELLED</Tag>
                ) : (
                  <Tag color="green">CONFIRMED</Tag>
                )}
              </h6>
              {booking.status?.toLowerCase() !== "cancelled" && (
                <div className="text-end">
                  <button
                    className="btn btn-danger cancel-btn"
                    onClick={() => cancelBooking(booking._id, booking.roomid)}
                  >
                    CANCEL BOOKING
                  </button>
                </div>
              )}
              <br />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
