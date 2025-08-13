const adminAuth = (req, res, next) => {
    console.log("Auth Identification")
    let token = "xyz";
    if (token === "xyz") {
        res.status(404).send("Unauthorized request")
    }
    else {
        next();
    }
};

const userAuth = (req, res, next) => {
    console.log("User Auth Identification")
    let token = "xyz";
    if (token === "xyz") {
        res.status(404).send("authorized request")
    }
    else {
        console.log("Else Part")
    }
};

module.exports = { adminAuth, userAuth };