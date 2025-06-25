import React, { useEffect, useState } from "react";
import Loader from "../Components/Loader";
import Error from "../Components/Error";
import axios from "axios";
import Success from "../Components/Success";

function Registerscreen() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  const [success, setsuccess] = useState();

  async function register() {
    if (password === cpassword) {
      const user = {
        name,
        email,
        password,
        cpassword,
      };

      try {
        setloading(true);
        const result = await axios.post("https://crm-hotel-booking-management-system-1.onrender.com/api/users/register", user).data;
        setloading(false);
        setsuccess(true)

        setname('')
        setemail('')
        setpassword('')
        setcpassword('')

      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(true);
      }
    } else {
      alert("Passwords not matched");
    }
  }

  return (
    <div>

      {loading && (<Loader />)}
      {error && (<Error />)}

      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          
          {success && (<Success message="User Registration Successfully" />)}

          <div className="bs">
            <h1>Register</h1>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
              required
            />

            <input
              type="text"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
              required
            />

            <input
              type="text"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              required
            />

            <input
              type="text"
              className="form-control"
              placeholder="Confirm password"
              value={cpassword}
              onChange={(e) => {
                setcpassword(e.target.value);
              }}
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
