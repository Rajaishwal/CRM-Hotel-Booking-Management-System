import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../Components/Room";
import Loader from "../Components/Loader";
import "antd/dist/reset.css";
import Error from "../Components/Error";
import moment from "moment";
import { DatePicker, Space } from "antd";

const { RangePicker } = DatePicker;

const Homescreen = () => {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);

  const [fromdate, setfromdate] = useState("");
  const [todate, settodate] = useState("");
  const [dublicaterooms, setdublicaterooms] = useState([]);

  const [searchkey, setsearchkey] = useState("");
  const [type, settype] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const response = await axios.get(
          "https://crm-hotel-booking-management-system-1.onrender.com/api/rooms/getallrooms"
        );
        setrooms(response.data);
        setdublicaterooms(response.data);
        setloading(false);
      } catch (err) {
        console.error("Error fetching rooms: ", err);
        seterror(true);
        setloading(false);
      }
    };

    fetchData();
  }, []);

  function filterByDate(dates) {
    if (dates && dates.length === 2) {
      const from = moment(dates[0].$d).format("DD-MM-YYYY");
      const to = moment(dates[1].$d).format("DD-MM-YYYY");
      setfromdate(from);
      settodate(to);

      var temprooms = [];

      for (const room of dublicaterooms) {
        let availability = true;

        if (room.currentbookings.length > 0) {
          for (const booking of room.currentbookings) {
            const bookingFrom = moment(booking.fromdate, "DD-MM-YYYY");
            const bookingTo = moment(booking.todate, "DD-MM-YYYY");

            if (
              moment(from, "DD-MM-YYYY").isBetween(
                bookingFrom,
                bookingTo,
                undefined,
                "[]"
              ) ||
              moment(to, "DD-MM-YYYY").isBetween(
                bookingFrom,
                bookingTo,
                undefined,
                "[]"
              ) ||
              bookingFrom.isBetween(
                moment(from, "DD-MM-YYYY"),
                moment(to, "DD-MM-YYYY"),
                undefined,
                "[]"
              )
            ) {
              availability = false;
              break;
            }
          }
        }

        if (availability) {
          temprooms.push(room);
        }
      }

      setrooms(temprooms);
    }
  }

  function filterBySearch(){
    
    const temprooms = dublicaterooms.filter(room => room.name.toLowerCase().includes(searchkey.toLowerCase()))
    setrooms(temprooms);
  }

  function filterByType(e){

    settype(e);
    
    if(e !== "all") {
      const formattedType = e.replace(/-/g, ' ').toLowerCase();
      const temprooms = dublicaterooms.filter(room => room.type.toLowerCase() === formattedType)
      setrooms(temprooms);
    } else {
      setrooms(dublicaterooms);
    }
  }

  return (
    <div className="container">
      <div className="row mt-5 bs">
        <div className="col-md-3">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>

        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Search rooms"
            value={searchkey} onChange={(e) => {setsearchkey(e.target.value)}} onKeyUp={filterBySearch}
          />
        </div>

        <div className="col-md-3">
          <select className="form-control" value={type} onChange={(e) => {filterByType(e.target.value)}}>
            <option value="all">All</option>
            <option value="delux">Delux</option>
            <option value="non-delux">Non Delux</option>
          </select>
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader />
        ) : (
          rooms.map((room) => (
            <div className="col-md-9 mt-3" key={room._id}>
              <Room room={room} fromdate={fromdate} todate={todate} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Homescreen;
