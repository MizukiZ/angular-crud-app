const express = require("express")
const Todo = require("../models/Todo")

const router = new express.Router()

// get
router.get("/todos", (req, res) => {
  Todo.find({})
    .then(todos => {
      res.json(todos)
    })
    .catch(error => {
      res.json({ error })
    })
})

// create
router.post("/todos", (req, res) => {
  Todo.create(req.body)
    .then(todo => {
      res.status(201).json(todo)
    })
    .catch(error => {
      res.status(400).json({ error })
    })
})

// update
router.put("/todo/:id", (req, res) => {
  const { id } = req.params
  Todo.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    .then(todo => {
      res.json(todo)
    })
    .catch(error => {
      res.status(400).json({ error })
    })
})

// delete
router.delete("/todo/:id", (req, res) => {
  const { id } = req.params
  Todo.findByIdAndDelete(id)
    .then(todo => {
      res.json({ message: `${todo.title} is deleted!` })
    })
    .catch(error => {
      res.status(500).json({ error: error.message })
    })
})

module.exports = router
