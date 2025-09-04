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




//* THis is match all the HTTP method API
app.use("/test", (req, res) => {
    res.send("Hello hello!")
})


// *-----------------------------------------------------------------------------------------------------------*//
// *--MULTIPLE ROUTE HANDLER----*//


// * app.use("/route",[rH,rH2],rH3,rH4)

app.use("/route", (req, res) => {
    //? Route Handler
})

// ?GET /play => Middlewire chain => requestHandler(The Function actually sending the request)

app.use("/play", (req, res, next) => {
    console.log("First Route Handler")
    next();
    res.send("Response 1");

}, (req, res, next) => {
    console.log("Second Route Handler");
    res.send("Response 2")
    // next();
}, (req, res, next) => {
    console.log("Third Route Handler");
    res.send("Response 2")
    // next();
})

// ? If res.send() Doesn't Present it will go to infinite loop .
// ? If next() --If next routeHandler not present in will give Cannot GET /

const { adminAuth, userAuth } = require("./middlewares/auth")
app.use("/admin", adminAuth)

app.use("/userr", userAuth, (req, res) => {
    res.send("DATA IS SAVED");
})

// * ERROR HANDLING app.use("/",err,req,res,next)

app.use("/", (err, req, res, next) => {
    if (err) {
        // Log error
        res.status(500).send("Something Went Wrong")
    }
})

// app.use((req, res) => {
//     res.status(404).send("Route not found");
// });

app.get('/', (req, res) => {
    throw new Error('BROKEN') // Express will catch this on its own.
})




function x() {
    for (var i = 1; i <= 5; i++) {
        setTimeout(function () {
            console.log(i);
        }, i * 1000);

    }
    console.log("ABCD")
}

x();


function counter() {
    let count = 0
    return function () {
        count++
        return count;
    }
}
const increment = counter();

const radius = [1, 12, 3, 4, 5]

const area = function (radius) {
    return Math.PI * radius * radius
}

const calculate = function (radius, area) {
    const output = [];
    for (let i = 0; i < radius.length; i++) {
        output.push(area(radius[i]))
    }
    return output;
}

console.log(calculate(radius, area))


const arr = [1, 2, 3, 4, 5, 6]

function double(x) {
    return 2 * x;
}

const dbleArr = arr.map(double)
console.log(dbleArr)


const check = arr.filter((x) => x *2)
console.log(check)


const calculate2 = arr.reduce((acc,curr)=>{
    acc = acc+ curr;
    return acc;
},0)


const promise = createOrder(Cart)

promise.then(function(){
   proceedToPayment(orderId)
});