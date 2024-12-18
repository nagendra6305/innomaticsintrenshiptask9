import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { store } from './App';
import { useNavigate } from 'react-router-dom';

import "../../client/src/todolist.css"

const Todolist = () => {
  const navigate = useNavigate()
  const [Data, SetData] = useState({
    Description: "",
    due_date: "",
  });
  const [Token, setToken] = useContext(store);
  const [Todolist, SetTodolist] = useState([]);
  const[update,setupdate]=useState({Description:"",id:"", due_date: "",})

  const changeHandler = (e) => {
    SetData({ ...Data, [e.target.name]: e.target.value });
   
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post("https://innomaticsintrenshiptask9.onrender.com/todo", Data, {
      headers: { 'x-token': Token }
    }).then(res => {alert(res.data);}).catch(err => {console.error(err);});
SetData({
  Description: "",
  due_date: "",
})
  };

  const deletehandler  = (id)=>{
  
  axios.delete(`https://innomaticsintrenshiptask9.onrender.com/todo/${id}`).then(res=>alert(res.data))
  }
  
  const updatehandler = async () => {
    try {
      if (!update.id) {
        alert("No item selected for update");
        return;
      }
      const response = await axios.put(`https://innomaticsintrenshiptask9.onrender.com/todo/${update.id}`, 
        { Description: update.Description }, 
        {due_date:update.due_date},
        
        { headers: { 'x-token': Token } }
      );
      alert(response.data);
      setupdate({ Description: "", id: "" });
      fetchTodoList();
    } catch (err) {
      console.error(err);
      alert("Error updating the todo item");
    }
  };
  
  

 
  const fetchTodoList = async () => {
    try {
      const response = await axios.get("https://innomaticsintrenshiptask9.onrender.com/todolist", {
        headers: { 'x-token': Token }
        
      });
      SetTodolist(response.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching to-do list");
    }
  };
  
  

  useEffect(() => {
   if(Token) fetchTodoList();
   else{
    navigate('/login')
   }
  }, [fetchTodoList,navigate]);

  return (
    <>
    <div className='mainbody' >
    <div className='maincontainer' >
    
      <h2 style={{color:"white",}}>TODOLIST</h2>

      <form onSubmit={submitHandler}>
     
       {update.Description === "" ? <div className='inputdiv'><input className='input-main'  value={Data.Description} type="text" onChange={changeHandler} placeholder='type description' name='Description' size={33}  /> <input type='submit'  value='Enter' /></div>
       : <div className='inputdiv'><input className='input-main' size={33} type='text'onChange={(e)=>{setupdate({...update,Description:e.target.value})}} value={update.Description} />&nbsp;
       <button  onClick={()=>updatehandler()}>Update</button></div>}
       <br />
        <label style={{color:"white"}} htmlFor="due_date">due_date:</label>
        <input value={Data.due_date} type="date" onChange={changeHandler} name='due_date' /><br />
      </form>
      <ol >
        {Todolist.map((item, index) => (
   
        
      <li className='li' key={index}>
       
            {item.Description} - {item.due_date ? new Date(item.due_date).toLocaleDateString() : "No due date"}
            <button className='deleteicon' onClick={()=>deletehandler(item._id)}  ><i  class="fa-solid fa-trash-can dicon "></i></button>
            <button className='updateicon'
  onClick={() => {
    if (update.id !== item._id || update.Description !== item.Description) {
      setupdate({ Description: item.Description, id: item._id });
    }
  }}
>
<i  class="fa-solid fa-pen-to-square uicon "></i>
</button>

            
          </li>
                    
        ))}
      </ol>
      <button className='logoutbutton' onClick={()=> setToken(null)}>Logout</button>
    </div>
    </div>
    </>
  );
}

export default Todolist;
