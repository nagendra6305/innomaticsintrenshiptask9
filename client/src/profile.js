import React ,{useContext,useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { store } from './App'

const Profile = () => {
    const navigate = useNavigate()
    const [Token,setToken]=useContext(store)
    const [Data,SetData]= useState(null)


    useEffect(()=>{
      axios.get("http://localhost:5000/myprofile",{
        headers:{
          "x-token": Token 
        }
      }).then( res => SetData(res.data)).catch((err)=>console.log(err))
    },[])
    if(!Token){
      return navigate('/login')
  }
   
  return (
      
    <div>  {
               Data&& <center>
                welcome user :{Data.username}<br></br>
                  welcome :{Data.email}<br></br>
                <button onClick={()=> setToken(null)}> Logut</button>
               </center> }
              </div>
    
  )
}

export default Profile