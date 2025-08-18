const express = require('express');

const app = express();
const connectDB = require("./config/database")
const User = require("./models/user")
const { validateSignUpData } = require("./utils/validations")
const bcrypt = require("bcrypt");

app.use(express.json())

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
        const isPasswordValid = await bcrypt.compare(password, emailId.password);
        if (isPasswordValid) {
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

// ----------------GET user by Name------------

app.get('/user', async (req, res) => {
    const name = req.body.firstName
    try {
        const user = await User.find({ firstName: name });
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

// ---------------- ALL DATA ---------------

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

//  ---------DELETE API---------------

app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete(userId)
        res.send("SUCCESSFULLY DELETED");
    }
    catch (err) {
        res.send("ERROR")
    }
})

// -------UPDATE API--------------
app.patch("/user", async (req, res) => {

    const userId = req.body.userId;
    const data = req.body;
    try {
        const ALLOWED_UPDATES = ["gender", "userId", "age", "skills", "emailId"];
        const is_allowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));

        if (!is_allowed) {
            throw new Error("Update not Possible ");
        }

        if (data?.skills.length > 10) {
            throw new Error("Skills Should not increase to more than 10")
        }

        const user = await User.findByIdAndUpdate(userId, data, {
            runValidators: true,
        })

        res.send("Successfull✅");
        console.log(user);
    }
    catch (err) {
        res.send("ERROR  ❌" + err.message)
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
