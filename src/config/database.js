const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://subhashisbhanjdeo:9YowP5ahnBYH3CYE@namastenodejs.gvqibh9.mongodb.net/devTinder");
};
module.exports = connectDB;
