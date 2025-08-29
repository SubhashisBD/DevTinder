const jwt = require("jsonwebtoken")
const User = require("../models/user")

const userAuth = async (req, res, next) => {

    try {
        // Read the tokens from the cookies
        const { token } = req.cookies
        if (!token) {
            throw new Error("Token is not valid")
        }

        // Validate the tokens
        const decodedObj = await jwt.verify(token, "SUBH@Tinder123")

        // Finding the User By Id
        const { _id } = decodedObj;
        const user = await User.findById(_id)
        
        if (!user) {
            throw new Error("User is not Present")
        }
        req.user = user;
        next()
    }
    catch (err) {
        res.status(400).send("Error: " + err.message)
    }

};

module.exports = { userAuth };