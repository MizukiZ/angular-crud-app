const mongoose = require("mongoose")

// use promise
mongoose.Promise = global.Promise

mongoose
  .connect("mongodb://localhost:27017/todo-database")
  .then(() => {
    console.log("Successfully connected to database")
  })
  .catch(() => {
    console.error("Error connecting to MongoDB database", error)
  })

module.exports = mongoose
