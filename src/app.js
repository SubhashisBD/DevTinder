const express = require('express');

const app = express();

app.use("/test", (req, res) => {
    res.send("Hello hello!")
})
app.use("/",(req, res) => {
    res.send("Hey There!")
})


app.listen(3000, () => {
    console.log("Server Start")
})