import React, {useEffect, useState} from 'react'
import Loader from "../Components/Loader";
import Error from "../Components/Error";
import axios from 'axios'

function Loginscreen() {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();

  async function Login() {

      const user = {
      email, 
      password,
    }
     try {
      setloading(true);
      const response = await axios.post("https://crm-hotel-booking-management-system-1.onrender.com/api/users/login", user);
      const result = response.data;

      setloading(false);

      localStorage.setItem('currentUser', JSON.stringify(result));
      window.location.href = '/home';

      setemail('')
      setpassword('')

      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(true);
      }
    }

  return (
    <div>

      {loading && (<Loader />)}

      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">

          {error && (<Error message='Invalid Credentionals' />)}

          <div className='bs'>
            <h1>Login</h1>

            <input type='text' className='form-control' placeholder='Email'  
            value={email} onChange={(e) => {setemail(e.target.value)}} required />

            <input type='text' className='form-control' placeholder='Password' 
            value={password} onChange={(e) => {setpassword(e.target.value)}} required />

            <button className='btn btn-primary mt-3'onClick={Login}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loginscreen

