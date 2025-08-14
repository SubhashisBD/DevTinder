const express = require('express');

const app = express();
const connectDB = require("./config/database")
const User = require("./models/user")

app.post("/signup", async (req, res) => {
    const userObj = {
        firstName: "Virat",
        lastName: "Bhanj Deo",
        email: "subh123bhanj@gmail.com",
        password: "Abc123",

    };
    // *Creating a new Instance of the User Model
    const user = new User(userObj)
    try {

        await user.save();
        res.send("Document Sent Successful");
    }
    catch (err) {
        res.status(400).send("Error:" + err.message)
    }
})


connectDB()
    .then(() => {
        console.log("Database Connected SuccessFully");
        app.listen(3000, () => {
            console.log("Server Start")
        })

    })
    .catch((err) => {
        console.log("Database not Connected")
    })
