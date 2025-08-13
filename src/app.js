const express = require('express');

const app = express();

// app.use("/",(req, res) => {
//     res.send("Hey There!")
// })

app.use("/user/:userId", (req, res) => {
    console.log(req.params)
    res.send("Iam EveryWhere")
})

//* This will only handle get call to user
app.get("/user", (req, res) => {
    res.send({ first_name: "Subhashis", last_name: "Bhanj Deo" });
})

app.post("/user", (req, res) => {
    res.send("DATA IS SAVED");
})


//* THis is match all the HTTP method API
app.use("/test", (req, res) => {
    res.send("Hello hello!")
})


app.listen(3000, () => {
    console.log("Server Start")
})

// *-----------------------------------------------------------------------------------------------------------*//
// *--MULTIPLE ROUTE HANDLER----*//


// * app.use("/route",[rH,rH2],rH3,rH4)

app.use("/route", (req, res) => {
    //? Route Handler
})

app.use("/play", (req, res, next) => {
    console.log("First Route Handler")
    // res.send("Response 1");
    next();
},(req,res,next)=>{
    console.log("Second Route Handler");
    res.send("Response 2")
},(req,res,next)=>{
    console.log("Second Route Handler");
    res.send("Response 2")
})