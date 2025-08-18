const express = require('express');

const app = express();
const connectDB = require("./config/database")
const User = require("./models/user")

app.use(express.json())

app.post("/signup", async (req, res) => {

    console.log(req.body)
    // const userObj = {
    //     firstName: "Virat",
    //     lastName: "Kohli",
    //     email: "subh123bhanj@gmail.com",
    //     password: "Abc123",

    // };
    // *Creating a new Instance of the User Model
    // const user = new User(userObj)
    const user = new User(req.body)
    try {

        await user.save();
        res.send("Document Sent Successful");
    }
    catch (err) {
        res.status(400).send("Error:" + err.message)
    }
})

//* ----------------GET user by Name------------

app.get('/user', async (req, res) => {
    const name =  req.body.firstName
    try {
        const user =await User.find({ firstName: name});
        if (user.length === 0) {
            res.send("NO User in the DB")
        }
        res.send(user)
        console.log("Successful ✅")
    }
    catch (err) {
        res.send("ERROR")
    }
})

// *---------------- ALL DATA ---------------

app.get('/feed', async (req, res) => {

    try {

        const user = await User.find({})
        if (user.length === 0) {
            res.send("NO User in the DB")
        }
        res.send(user)
        console.log("Successful ✅")
    }
    catch (err) {
        res.send("ERROR")
    }
})

// * ---------DELETE API---------------

app.delete("/user", async (req,res)=>{
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId)
        res.send("SUCCESSFULLY DELETED");
    }
    catch(err){
        res.send("ERROR")
    }
})

// *-------UPDATE API--------------
app.patch("/user",async (req,res)=>{

    const userId = req.body.userId
    try{
        const user = await User.findByIdAndUpdate(userId,req.body)
        res.send("Successfull✅");
        console.log(user);
    }
    catch(err){
        res.send("ERROR  ❌")
    }
})

connectDB()
    .then(() => {
        console.log("Database Connected SuccessFully ✅");
        app.listen(7777, () => {
            console.log("Server Start")
        })

    })
    .catch((err) => {
        console.log("Database not Connected")
    })
