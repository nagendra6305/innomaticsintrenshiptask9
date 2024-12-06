
import './App.css';
import Registerfoam from './registerfoam';
import React, { createContext, useState,useEffect } from 'react';
import Login from './login';


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Todolist from './todolist';



 

export const store = createContext();
function App() {
 
   const [Token, SetToken] = useState(sessionStorage.getItem('token') || null);

  useEffect(() => {
    if (Token) {
      sessionStorage.setItem('token', Token);
    } else {
      sessionStorage.removeItem('token');
    }
  }, [Token]);


 

  return (
    <div className="App">
    
      <store.Provider value={[Token,SetToken]}>
   
      <BrowserRouter>
   <Routes>
 
    <Route path='/todo' element={<Todolist/>}  />
 
    <Route path='/' element={<Registerfoam/>}  />
    <Route path='/login' element={<Login/>}  />
 
   </Routes>
   </BrowserRouter>
   
   
   </store.Provider>
    </div>
  );
}

export default App;
