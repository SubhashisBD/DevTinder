const mongooes = require("mongoose")

const userSchema = mongooes.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String
    },
    password: {
        type: String
    },
    gender: {
        type: String
    }
});

const User = mongooes.model("User",userSchema);

module.exports = User;