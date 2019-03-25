const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const server = express()
const port = 8000

server.use(bodyParser.json())
server.use(cors())

// router
server.use([require("./routes/todos")])

server.use((error, req, res, next) => {
  res.json({
    error: {
      message: error.message
    }
  })
})

server.listen(port, error => {
  if (error) {
    console.error("Server connection fail", error)
  } else {
    console.log(`Server started on port ${port}`)
  }
})
