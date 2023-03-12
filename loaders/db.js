const Mongoose = require("mongoose");

const db = Mongoose.connection;

// ideally get connection string from .env file
const db_connection_string = "mongodb://localhost:27017/gamegos"; 

db.once("open", () => {
  console.log("DB connection succeeded");
});

// connect to local MongoDB database
const connectDB = async () => {
  await Mongoose.connect(db_connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = {
  connectDB,
};