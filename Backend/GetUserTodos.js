const express = require('express')
 const app = express();;

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
        res.status(200).send("saved successfully");
    } catch (err) {
        console.log(err);
        return res.send("internal server error");
    }
});
