const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLenght: 3,
        maxLength: 15
    },
    lastName: {
        type: String,
        minLenght: 3,
        maxLength: 15
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email address")
            }
        }
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
    skills: {
        type: [String]
    },
    age: {
        type: Number
    }
},
    {
        timestamps: true
    },
);

userSchema.methods.getJWT = async function () {
    const user = this;

    const token = await jwt.sign({ _id: user._id }, "SUBH@Tinder123", { expiresIn: "4d" });

    return token;
};

userSchema.methods.passwordHasher = async function (passwordByUser) {
    const isPasswordValid = await bcrypt.compare(passwordByUser, this.password);
    return isPasswordValid
}

const User = mongoose.model("User", userSchema);

module.exports = User;