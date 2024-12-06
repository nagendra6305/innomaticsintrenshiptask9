import React,{useContext} from 'react'
import "../../client/src/Navbar.css"

import { Link } from 'react-router-dom'
import { store } from './App'

const Nav = () => {
  const [Token,setToken]=useContext(store)

  
  return (
    <div >
      {!Token &&
   
      <ul  className= 'Navbar '>
         <Link to='/login'><li> <a href="#home">Login</a></li></Link>
        <Link to="/register"> <li > <a href="#home">Register</a></li></Link>
        
       
      </ul>}
      
    </div>
  )
}

export default Nav