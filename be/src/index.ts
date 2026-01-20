import { WebSocketServer, WebSocket } from 'ws'

const wss = new WebSocketServer({port: 8000});

interface User {
    socket: WebSocket;
    room: string;
}

let alluser: User[] = [];

wss.on("connection", function(socket: WebSocket) {

    socket.on("message", (e: any)=> {
        try {
            const parsedMessage = JSON.parse(e.toString());

            if (parsedMessage.type === "join") {
                console.log("user joined " + parsedMessage.payload.roomId);
                alluser.push({
                    socket,
                    room: parsedMessage.payload.roomId
                })
            }

            if(parsedMessage.type === "chat") {
                console.log("user want to chat");
                let currentRoom: string | null = null;
                for (let i = 0; i < alluser.length; i++) {
                    if(alluser[i]?.socket === socket) {
                        // @ts-ignore
                        currentRoom = alluser[i].room
                    }
                }
                
                if (currentRoom) {
                    console.log("Broadcasting to room: " + currentRoom);
                    for(let i = 0; i < alluser.length; i++) {
                        if (alluser[i]?.room === currentRoom) {
                            alluser[i]?.socket.send(parsedMessage.payload.message);
                        }
                    }
                }
            }
        } catch (error) {
            console.error("Error parsing message:", error);
        }
    })

    socket.on("close", () => {
        alluser = alluser.filter(user => user.socket !== socket);
        console.log("User disconnected. Active users: " + alluser.length);
    })
})