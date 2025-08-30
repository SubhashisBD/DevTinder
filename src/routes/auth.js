const express = require("express");
const authRouter = express.Router();
const User = require("../models/user")
const { validateSignUpData } = require("../utils/validations")
const bcrypt = require("bcrypt")

authRouter.post("/signup", async (req, res) => {

    try {

        //* Validate the Data
        validateSignUpData(req);

        const { firstName, lastName, emailId, password } = req.body;
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

authRouter.post("/login", async (req, res) => {

    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId })
        if (!user) {
            throw new Error("Invalid Credentials")
        }
        const isPasswordValid = await user.passwordHasher(password)

        if (isPasswordValid) {

            // Create a JWT Token
            const token = await user.getJWT();

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

module.exports = authRouter;