import React ,{useState,useContext} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { store } from './App'
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import "../../client/src/Loginform.css"



const Login = () => {
    const navigate = useNavigate()
    const [Token,SetToken]= useContext(store)
   

    const[Data,setData]=useState({
        email:"",
        password:""
    }) 
    
   if(Token){
 navigate('/todo' )
   }
   
    const changeHandler= e  =>{
        setData({...Data,[e.target.name]:e.target.value})
       
    }
    const submitHandler= async (e)=>{
        e.preventDefault();
        try {
            const response = await axios.post("https://innomaticsintrenshiptask9.onrender.com/login", Data);
            const token = response.data.token;
            sessionStorage.setItem('token', token); 
            SetToken(token); 
        } catch (err) {
            console.error(err);
            alert("Error logging in");
        }
    };
    

  return (
    <div className='LoginBody'>
    <div className='wrapper'>
       
            <form onSubmit={submitHandler}> 
                <h1>Login</h1>
              <div className='input-box'><input name='email' onChange={changeHandler}  type='email' placeholder='Email'/>  <FaUser  className='icon'/></div>  


              
               <div className='input-box'><input name='password' onChange={changeHandler}  type='password' placeholder='Password'/> <FaLock className='icon' />
              
               </div>
                <input className='button' type='submit'  value="Login"/>
                <div className='register-link'>
                    <p>Don't have an account < NavLink to='/'>Register</NavLink></p>

                </div>
            </form>
       
    </div>
    </div>
  )
}

export default Login