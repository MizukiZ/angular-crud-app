const mongo = require("./init")

const todoSchema = new mongo.Schema({
  title: String,
  isDone: Boolean
})

const Todo = mongo.model("Todo", todoSchema)

module.exports = Todo
