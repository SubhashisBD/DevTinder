const express = require("express")
const profileRouter  = express.Router();
const { userAuth } = require("../middlewares/auth")

profileRouter.get("/profile", userAuth, async (req, res) => {

    try {
        const userId = req.user
        res.send(userId)
    }
    catch (err) {
        res.status(400).send("Error: " + err.message)
    }
})

module.exports = profileRouter;