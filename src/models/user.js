const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLenght:3,
        maxLength:15
    },
    lastName: {
        type: String,
        minLenght:3,
        maxLength:15
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String
    },
    gender: {
        type: String,
        // *For validate it will work on new user but for old we have to enabled it.
        validate(value) {
            if (!["male", "female", "other"].includes(value)) {
                throw new Error("Not a Valid Gender")
            }
        }
    },
    about: {
        type: String,
        default: "This is a default about Section"
    },
    skills:{
        type:[String]
    },
    age:{
        type:Number
    }
},
    {
        timestamps: true
    },
);

const User = mongoose.model("User", userSchema);

module.exports = User;