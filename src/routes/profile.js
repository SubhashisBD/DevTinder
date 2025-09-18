const express = require("express")
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth")
const { validateEditProfile } = require("../utils/validations")
const validator = require("validator")
const bcrypt = require("bcrypt")


profileRouter.get("/profile/view", userAuth, async (req, res) => {

    try {
        const userId = req.user
        res.send(userId)
    }
    catch (err) {
        res.status(400).send("Error: " + err.message)
    }
})

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {

    try {
        if (!validateEditProfile(req)) {
            throw new Error("Invalid Edit Request")
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]))
        await loggedInUser.save()
        res.send("Edit Successfull")
    }
    catch (err) {
        res.status(400).send("Error: " + err.message)
    }

});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {

    try {
        const changedPassword = req.body.password;
        const prevPassword = req.user.password;

        if (changedPassword == prevPassword) {
            throw new Error("New Password is not strong enough!")
        }
        if (!validator.isStrongPassword(password)) {
            throw new Error("Not a Strong Password!")
        }
        const passwordHasher = await bcrypt.hash(password, 10)
        prevPassword = passwordHasher;
        await req.user.save();
        res.status(200).send("Password Change Successfull");
    } catch (err) {
        res.status(400).send("Error " + err.message)
    }
})

module.exports = profileRouter;