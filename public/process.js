const socket = io("http://localhost:3000");
$(document).ready(()=>{
    $("#btnCreateRoom").click(()=>{
        socket.emit("create-room", $("#txtRoom").val())
    })

    $("#btnChat").click(()=>{
        socket.emit("user-chat", $("#txtMessage").val())
    })
})

socket.on("server-send-room",(data)=>{
    $("#dsRooms").html("")
    data.map((r)=>{
        $("#dsRooms").append("<h4 class='room'>" + r + "</h4>")
    })
})

socket.on("server-send-room-socket", (data)=>{
    $("#roomHienTai").html(data)
})

socket.on("server-chat", (data)=>{
    $("#right").append("<div>" +data + "</div>")
})