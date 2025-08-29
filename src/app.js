const express = require('express');
const app = express();
const connectDB = require("./config/database")
const User = require("./models/user")
const { validateSignUpData } = require("./utils/validations")
const bcrypt = require("bcrypt");
const { userAuth } = require("./middlewares/auth")

// TO read the cookies from req.cookies we need cookie-parser
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken")

// We use express.json() bcz we parse it to json for reading the req.body
app.use(express.json())
app.use(cookieParser())

app.post("/signup", async (req, res) => {

    try {

        //* Validate the Data
        validateSignUpData(req);

        const { firstName, lastName, emailId, password } = req.body;
        // const userObj = {
        //     firstName: "Virat",
        //     lastName: "Kohli",
        //     email: "subh123bhanj@gmail.com",
        //     password: "Abc123",
        // };

        // *Encrypt the Password
        const passwordHash = await bcrypt.hash(password, 10)
        console.log(passwordHash)

        // *Creating a new Instance of the User Model
        // const user = new User(userObj)
        const user = new User({ firstName, lastName, emailId, password: passwordHash });


        await user.save();
        res.send("Document Sent Successful");
    }
    catch (err) {
        res.status(400).send("Error: " + err.message)
    }
})

// POST Login API
app.post("/login", async (req, res) => {

    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId })
        if (!user) {
            throw new Error("Invalid Credentials")
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {

            // Create a JWT Token
            const token = await jwt.sign({ _id: user._id }, "SUBH@Tinder123", { expiresIn: "1d" });

            // Add the token to cookie and send the response back to user
            res.cookie('token', token);

            res.send("Login Successfull✅")
            return;
        }
        else {
            res.send("Invalid Credentials")
            return;
        }
    }
    catch (err) {
        res.send("Invalid Credentials ");
    }
})

// GET Profile API
app.get("/profile", userAuth, async (req, res) => {

    try {
        const userId = req.user
        res.send(userId)
    }
    catch (err) {
        res.status(400).send("Error: " + err.message)
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
