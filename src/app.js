const express = require('express');

const app = express();
const connectDB = require("./config/database")

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
