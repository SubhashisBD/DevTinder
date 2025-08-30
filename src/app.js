const express = require('express');
const app = express();
const connectDB = require("./config/database")
// TO read the cookies from req.cookies we need cookie-parser
const cookieParser = require("cookie-parser");

// We use express.json() bcz we parse it to json for reading the req.body
app.use(express.json())
app.use(cookieParser())

const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request")

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)


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
