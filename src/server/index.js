import { WebSocketServer } from "ws";
import dotenv from "dotenv";

dotenv.config();

const server = new WebSocketServer({ port: process.env.PORT || 8080 })

const onMessage = (ws, data) => {
    server.broadcast(data.toString());
}
function broadcast(msg) {
    if (!this.clients) return;
    this.clients.forEach(client => {
        if (client.readyState == WebSocket.OPEN) {
            client.send(msg)
        }
    });
}
server.broadcast = broadcast;
server.on('connection', (ws, req) => {
    console.info("Cliente connectado !");
    clients.push(ws);
    ws.on('message', data => onMessage(ws, data))
});





