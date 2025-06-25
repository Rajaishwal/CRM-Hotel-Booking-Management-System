import React, { useEffect, useState } from "react";
import Loader from "../Components/Loader";
import Error from "../Components/Error";
import Swal from "sweetalert2";
import { Tabs } from "antd";
import axios from "axios";

const { TabPane } = Tabs;

function Adminscreen() {
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
      window.location.href = "/home";
    }
  }, []);

  return (
    <div className="admin-panel bs">
      <h2 className="text-center mb-4">Admin Panel</h2>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Bookings" key="1">
          <Bookings />
        </TabPane>
        <TabPane tab="Rooms" key="2">
          <Rooms />
        </TabPane>
        <TabPane tab="Add Room" key="3">
          <Addroom />
        </TabPane>
        <TabPane tab="Users" key="4">
          <Users />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Adminscreen;

// For Booking Details
export function Bookings() {
  const [bookings, setbookings] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = (
          await axios.get("https://crm-mern-hotel-booking-management-system-izx4.onrender.com/api/bookings/getallbookings")
        ).data;
        setbookings(data);
      } catch (error) {
        console.log(error);
        seterror(true);
      } finally {
        setloading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) return <Loader />;
  if (error) return <Error message="Error loading bookings" />;

  return (
    <div className="row">
      <div className="col-md-12">
        <h5>Bookings</h5>
        <table className="table table-bordered table-dark">
          <thead className="bs">
            <tr>
              <th>Booking Id</th>
              <th>User Id</th>
              <th>Room</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking._id}</td>
                <td>{booking.userid}</td>
                <td>{booking.room}</td>
                <td>{booking.fromdate}</td>
                <td>{booking.todate}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// For Room Details
export function Rooms() {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = (
          await axios.get("https://crm-mern-hotel-booking-management-system-izx4.onrender.com/api/rooms/getallrooms")
        ).data;
        setrooms(data);
      } catch (error) {
        console.log(error);
        seterror(true);
      } finally {
        setloading(false);
      }
    };
    fetchRooms();
  }, []);

  if (loading) return <Loader />;
  if (error) return <Error message="Error loading rooms" />;

  return (
    <div className="row">
      <div className="col-md-12">
        <h5>Rooms</h5>
        <table className="table table-bordered table-dark">
          <thead className="bs">
            <tr>
              <th>Room Id</th>
              <th>Name</th>
              <th>Type</th>
              <th>Rent Per day</th>
              <th>Max Count</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room._id}>
                <td>{room._id}</td>
                <td>{room.name}</td>
                <td>{room.type}</td>
                <td>{room.rentperday}</td>
                <td>{room.maxcount}</td>
                <td>{room.phonenumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// For User Details
export function Users() {
  const [users, setusers] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = (
          await axios.get("https://crm-mern-hotel-booking-management-system-izx4.onrender.com/api/users/getallusers")
        ).data;
        setusers(data);
      } catch (error) {
        console.log(error);
        seterror(true);
      } finally {
        setloading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <Loader />;
  if (error) return <Error message="Error loading users" />;

  return (
    <div className="row">
      <div className="col-md-12">
        <h5>Users</h5>
        <table className="table table-bordered table-dark">
          <thead className="bs">
            <tr>
              <th>User Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Is Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "YES" : "NO"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// For Add Room
export function Addroom() {
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  const [name, setname] = useState("");
  const [rentperday, setrentperday] = useState("");
  const [maxcount, setmaxcount] = useState("");
  const [description, setdescription] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [type, settype] = useState("");
  const [imageurl1, setimageurl1] = useState("");
  const [imageurl2, setimageurl2] = useState("");
  const [imageurl3, setimageurl3] = useState("");

  async function addroom() {
    const newroom = {
      name,
      rentperday,
      maxcount,
      description,
      phonenumber,
      type,
      imageurls: [imageurl1, imageurl2, imageurl3],
    };

    try {
      setloading(true);
      const result = (
        await axios.post("https://crm-mern-hotel-booking-management-system-izx4.onrender.com/api/rooms/addroom", newroom)
      ).data;
      console.log(result);
      Swal.fire({
        icon: "success",
        title: "Congrats!",
        text: "Room Added successfully!",
        confirmButtonText: "OK",
        allowOutsideClick: false,
      }).then(() => {
        window.location.href = "/home";
      });
    } catch (error) {
      console.log(error);
      setloading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        confirmButtonText: "OK",
      });
    }
  }

  return (
    <div className="row">
      <div className="col-md-5">
        {loading && <Loader />}
        <input
          type="text"
          className="form-control"
          placeholder="Room Name"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Rent Per day"
          value={rentperday}
          onChange={(e) => setrentperday(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Max Count"
          value={maxcount}
          onChange={(e) => setmaxcount(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Description"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Phone Number"
          value={phonenumber}
          onChange={(e) => setphonenumber(e.target.value)}
        />
      </div>

      <div className="col-md-5">
        <input
          type="text"
          className="form-control"
          placeholder="Type"
          value={type}
          onChange={(e) => settype(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Image URL 1"
          value={imageurl1}
          onChange={(e) => setimageurl1(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Image URL 2"
          value={imageurl2}
          onChange={(e) => setimageurl2(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Image URL 3"
          value={imageurl3}
          onChange={(e) => setimageurl3(e.target.value)}
        />

        <div className="text-end">
          <button
            className="btn btn-primary mt-2"
            onClick={addroom}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Room"}
          </button>
        </div>
      </div>
    </div>
  );
}
