const mongoose = require('mongoose')
const connectionsRequest = new mongoose.Schema(
    {
        formUserId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,

        },
        toUserId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,

        },
        status: {
            type: String,
            required: true,
            enum: {
                values: ["ignored", "interested", "accepted", "rejected"],
                message: `{VALUE} is incorrect in status type`,
            },
            required: true
        },
    },
    {
        timestamps: true,
    },
);

//* Why not to create Index for every field
// * Making Index to make query Faster and why need?

connectionsRequest.index({ formUserId: 1, toUserId: 1 })

connectionsRequest.pre("save", function (next) {
    const connectionsRequest = this
    if (connectionsRequest.formUserId.equals(connectionsRequest.formUserId)) {
        throw new Error("Cannot Send Connection Request to itself!")
    }
    next();
})

const ConnectionsRequestModel = new mongoose.model("ConnectionRequest", connectionsRequest);
module.exports = ConnectionsRequestModel;
