import React, { useEffect, useState } from "react";
import Loader from "../Components/Loader";
import Error from "../Components/Error";
import Success from "../Components/Success";
import axios from "axios";

function Registerscreen() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [success, setsuccess] = useState(false);

  async function register() {
    if (password !== cpassword) {
      alert("Passwords do not match");
      return;
    }

    const user = { name, email, password, cpassword };

    try {
      setloading(true);
      seterror(false);
      setsuccess(false);

      await axios.post("https://crm-mern-hotel-booking-management-system-izx4.onrender.com/api/users/register", user);

      setloading(false);
      setsuccess(true);

      // Clear input fields
      setname("");
      setemail("");
      setpassword("");
      setcpassword("");

      // Optionally hide success after a few seconds
      setTimeout(() => setsuccess(false), 3000);
    } catch (err) {
      console.error(err);
      setloading(false);
      seterror(true);
    }
  }

  return (
    <div>
      {loading && <Loader />}
      {error && <Error message="Registration failed" />}
      {success && <Success message="User registered successfully" />}

      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          <div className="bs">
            <h1>Register</h1>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => setname(e.target.value)}
              required
            />
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
            />
            <input
              type="password"
              className="form-control"
              placeholder="Confirm password"
              value={cpassword}
              onChange={(e) => setcpassword(e.target.value)}
              required
            />
            <button className="btn btn-primary mt-3" onClick={register}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registerscreen;
