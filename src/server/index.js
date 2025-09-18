import { WebSocketServer, WebSocket } from "ws";
import dotenv from "dotenv";

dotenv.config();

export const startServer = () => {
    const server = new WebSocketServer({ port: process.env.PORT || 8080 });

    function broadcast(msg) {
        for (const client of server.clients) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(msg);
            }
        }
    }
    server.on("connection", (ws, req) => {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const name = url.searchParams.get("name") || "unknown";
        ws.name = name;

        console.log(`⚡ [${ws.name}] joined!`);
        broadcast(`🟢 [${ws.name}] joined!`);

        ws.on("message", (data) => {
            console.log(`📥 Message received [${ws.name}]:`, data.toString());
            broadcast(`⚡ [${ws.name}] ${data.toString()}`);
        });

        ws.on("close", () => {
            console.log(`🔴 [${ws.name}] left!`);
            broadcast(`🔴 [${ws.name}] left!`);
        });
        ws.send("👋 Hello! You are connected to the WebSocket server.");
    });

    console.log(
        `🚀 WebSocket server running on port ${process.env.PORT || 8080}`
    );
};