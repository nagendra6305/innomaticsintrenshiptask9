
const express = require('express');
const mongoose = require('mongoose');
const registeruser = require('./model.js');
const tododata = require('./todomodel.js');
const jwt = require("jsonwebtoken");
const middleware = require("./middleware.js");
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

mongoose.connect("mongodb+srv://Nagendrajwt:Nagendra123@cluster0.c6zmeu9.mongodb.net/usersdata")
    .then(() => console.log("DB connected successfully"))
    .catch(err => console.error("DB connection error:", err));

app.post("/todo", middleware, async (req, res) => {
    try {
        const { Description, due_date } = req.body;
        const userId = req.user.id;
        let newTodo = new tododata({
            Description,
            due_date,
            user: userId
        });
        await newTodo.save();
        res.status(200).send("Saved successfully");
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
});

app.get("/todolist", middleware, async (req, res) => {
    try {
       
              const userId = req.user.id
        let todos = await tododata.find({user:userId})
        res.json(todos);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
});
app.delete("/todo/:id", async (req, res) => {
    try{ const todoid = req.params.id;
    
  
         const todo = await tododata.findByIdAndDelete(todoid);
        
         
         res.status(200).send("deleted sucessfully");

       }
       catch(err){
        console.log(err)
        return res.status(500).send("error in deleting")
       } 
});
app.put("/todo/:id",async (req,res)=>{
    try{
        const todoid = req.params.id
        const updateData = req.body;
       
        
        const todo = await tododata.findByIdAndUpdate(todoid,
            updateData   )
     
        res.status(200).send("updated sucessfully")
    }
    catch(err){
console.log(err)
res.status(500).send("not updated")
    }
})

app.post("/registration", async (req, res) => {
    try {
        const { username, email, password, confirmpassword } = req.body;
        let exist = await registeruser.findOne({ email });
        if (exist) {
            return res.status(400).send("User already exists");
        }
        if (password !== confirmpassword) {
            return res.status(400).send("Passwords do not match");
        }
        let newUser = new registeruser({
            username,
            email,
            password,
            confirmpassword
        });
        await newUser.save();
        res.status(200).send("Registered successfully");
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
});

app.post("/login", async (req, res) => {
    try {
        console.log(req.body)
        const { email, password } = req.body;
        
        let exist = await registeruser.findOne({ email });
        if (!exist) {
            return res.status(400).send("User does not exist");
        }
        if (exist.password !== password) {
            return res.status(400).send("Invalid credentials");
        }
        let payload = {
            user: {
                id: exist.id
            }
        };
        jwt.sign(payload, "jwtsecret", { expiresIn: 7200000 }, (err, token) => {
            if (err) throw err;
            return res.json({ token });
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send("Server error");
    }
});



app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
