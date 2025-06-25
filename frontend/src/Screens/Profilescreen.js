import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import Swal from "sweetalert2";
import { UserOutlined, BookOutlined } from "@ant-design/icons";
import axios from "axios";
import Loader from "../Components/Loader";
import Error from "../Components/Error";
import { Divider, Flex, Tag } from 'antd';

const Profilescreen = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
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
                  <h6>
                    <strong>Name:</strong> {user.name}
                  </h6>
                  <h6>
                    <strong>Email:</strong> {user.email}
                  </h6>
                  <h6>
                    <strong>isAdmin:</strong> {user.isAdmin ? "YES" : "NO"}
                  </h6>
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
      const data = await axios.post(
        "http://localhost:5000/api/bookings/getbookingsbyuserid",
        { userid: user._id }
      );
      setbookings(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  async function cancelBooking(bookingid, roomid) {
    try {
      setLoading(true);
      const result = (
        await axios.post("https://crm-hotel-booking-management-system-1.onrender.com/api/bookings/cancelbooking", {
          bookingid,
          roomid,
        })
      ).data;
      setTimeout(async () => {
        setLoading(false); // Hide loader

        const result = await Swal.fire({
          icon: "success",
          title: "Congrats!",
          text: "Room cancelled successfully!",
          confirmButtonText: "OK",
          allowOutsideClick: false,
          allowEscapeKey: false,
        });

        if (result.isConfirmed) {
          fetchBookings();
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
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          {loading && <Loader />}
          {bookings &&
            bookings.map((booking) => {
              return (
                // <div><h4>My Bookings</h4>

                <div className="bs">
                  <br />
                  <h5>{booking.room}</h5>
                  <h6>
                    <b>Booking Id :</b> {booking._id}
                  </h6>
                  <h6>
                    <b>Check In :</b> {booking.fromdate}
                  </h6>
                  <h6>
                    <b>Check Out :</b> {booking.todate}
                  </h6>
                  <h6>
                    <b>Amount :</b> {booking.totalamount}
                  </h6>
                  <h6>
                    <b>Status :</b>{" "}
                    {booking.status?.toLowerCase() === "cancelled" ? <Tag color="red">CANCELLED</Tag> : <Tag color="green">CONFIRMED</Tag>}
                  </h6>

                  {booking.status?.toLowerCase() !== 'cancelled' && (
                    <div className="text-end">
                    <button
                      className="btn btn-danger cancel-btn"
                      onClick={() => {
                        cancelBooking(booking._id, booking.roomid);
                      }}
                    >
                      CANCEL BOOKING
                    </button>
                  </div>)}
                </div>
                // </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
