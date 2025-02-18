const http = require('http')
const express = require('express')
const path = require('path')
const { Server } = require('socket.io')
const app = express()
const PORT = 8000

const server = http.createServer(app)
const io = new Server(server) 

//Socket.io
io.on('connection', (socket) => {
    // console.log("A new use has connected", socket.id)
    socket.on('user-msg', (message) => {
        // console.log("A new user message", message)
        io.emit('msg', message)
    })
})

app.use(express.static(path.resolve('./public')))

app.get('/', (req, res) => {
    res.sendFile("public/index.html")
})

server.listen(PORT, () => {
    console.log(`Server is listening at: Port:${PORT}`)
})

