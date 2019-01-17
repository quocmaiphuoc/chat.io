const express = require('express')
const app = express()
app.use(express.static('public'))
app.set("view engine", "ejs")
app.set("views", "./views");

const server = require("http").Server(app)
const io = require('socket.io')(server)
server.listen(3000,()=>{
    console.log("Connect server success")
})

io.on("connection", (socket)=>{
    console.log("Có người kết nối" + socket.id)
    console.log(socket.adapter.rooms)

    socket.on("create-room", (data)=>{
        socket.join(data)
        socket.room = data
        var mang = []
        for(r in socket.adapter.rooms){
            mang.push(r)
        }
        io.sockets.emit("server-send-room", mang)
        socket.emit("server-send-room-socket", data)
    })

    socket.on("user-chat",(data)=>{
        io.sockets.in(socket.room).emit("server-chat",data);
    })
})

app.get("/", (req,res)=>{
    res.render("homepage")
})
