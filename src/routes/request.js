const express = require("express");
const { userAuth } = require("../middlewares/auth");
const connectionsRequest = require("../models/connectionsRequest");
const User = require("../models/user");
const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const formUserId = req.user._id
        const toUserId = req.params.toUserId
        const status = req.params.status

        const isAllowed = ["ignore", "interested"]
        if (!isAllowed.includes(status)) {
            return res.status(404).json({ message: "Invalid status type " + status })
        }

        const toUser = await User.findById(toUserId)
        if (!toUser) {
            res.status(404).json({ message: "User not found!" })
        }

        const existingConnectionRequest = await connectionsRequest.findOne({
            $or: [{ formUserId, toUserId },
            { formUserId: toUserId, toUserId: formUserId }
            ]
        })

        if (existingConnectionRequest) {
            return res.status(404).send({ message: " Connection Request Already Request" })
        }

        const connections = new connectionsRequest({
            formUserId,
            toUserId,
            status
        })
        const data = await connections.save()
        res.json({
            message: "Connection sent Successfully",
            data,
        });
    }
    catch (err) {
        res.status(404).send("ERROR: " + err.message)
    }
})

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {

    try {
        const loggedInUser = req.user
        const { status, requestId } = req.params

        const allowedStatus = ["rejected", "accepted"]
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Status not allowed" });
        }

        const isPresent = await connectionsRequest.findById({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested",
        })
        if (!isPresent) {
            throw new Error("Connection request is not Present")
        }
        connectionsRequest.status = status

        await connectionsRequest.save()

        res.json({ message: "Connnection Request accept" })
    }
    catch (err) {
        res.send("ERROR: " + err.message)
    }

})

module.exports = requestRouter;