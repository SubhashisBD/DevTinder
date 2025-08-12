const express = require('express');

const app = express();

// app.use("/",(req, res) => {
//     res.send("Hey There!")
// })

app.use("/user",(req,res)=>{
    res.send("Iam EveryWhere")
})

//* This will only handle get call to user
app.get("/user",(req,res)=>{
    res.send({first_name:"Subhashis",last_name:"Bhanj Deo"});
})

app.post("/user",(req,res)=>{
    res.send("DATA IS SAVED");
})


//* THis is match all the HTTP method API
app.use("/test", (req, res) => {
    res.send("Hello hello!")
})


app.listen(3000, () => {
    console.log("Server Start")
})