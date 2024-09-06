const mongoose = require("mongoose");

async function ConnectDb() {
  try {
    await mongoose.connect(process.env.DBURL);
    console.log("connected to server");
  } catch (error) {
    console.log(error);
  }
}
module.exports = ConnectDb;
