import React ,{useState} from 'react'
import axios, { Axios } from 'axios'
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import "../../client/src/register.css"
import { useNavigate } from 'react-router-dom';

const Registerfoam = () => {
    const navigate =useNavigate()
    const[Data,setData]=useState({
        username:"",
        email:"",
        password:"",
        confirmpassword:""
    })
    const changeHandler= e =>{
        setData({...Data,[e.target.name]:e.target.value})
    }
    const submitHandler= e=>{
        e.preventDefault();
        axios.post("http://localhost:5000/registration",Data).then(
            res=>alert(res.data)
        )
        navigate('/login')
    }

  return (
    <div className='Registerbody'>
    <div className='wrapper'>
        <center>
            <form onSubmit={submitHandler}> 
          <h1>RegistrationForm</h1>

          <div className='input-box'><input name='username' onChange={changeHandler} type='text' placeholder='Username'/><FaUser  className='icon'/></div>
          <div className='input-box'> <input name='email' onChange={changeHandler}  type='email' placeholder='Email'/> <FaUser  className='icon'/></div>
          <div className='input-box'><input name='password' onChange={changeHandler}  type='password' placeholder='Password'/> <FaLock className='icon' /></div>
          <div className='input-box'><input name='confirmpassword' onChange={changeHandler}  type='password' placeholder='ConfirmPassword'/> <FaLock className='icon' /></div>
                <input className='button' type='submit'  value="Register"/>
                <div className='register-link'>
                    <p>Already Have An Account <a href='http://localhost:3000/login'>Login</a></p>

                </div>
            </form>
        </center>
    </div>
    </div>
  )
}

export default Registerfoam