import { WebSocketServer } from "ws";
import broadcast from "../utils/index.js";

const startServer = () => {
    const server = new WebSocketServer({ port: process.env.PORT || 8080 });
    server.on("connection", (ws, req) => {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const name = url.searchParams.get("name") || "unknown";
        ws.name = name;

        console.log(`⚡ [${ws.name}] joined!`);
        broadcast(`🟢 [${ws.name}] joined!`, server);

        ws.on("message", (data) => {
            console.log(`📥 Message received [${ws.name}]:`, data.toString());
            broadcast(`⚡ [${ws.name}] ${data.toString()}`, server);
        });

        ws.on("close", () => {
            console.log(`🔴 [${ws.name}] left!`);
            broadcast(`🔴 [${ws.name}] left!`, server);
        });
        ws.send("👋 Hello! You are connected to the WebSocket server.");
    });
    server.on('error', (err) => {
        console.error("❌ Failed to start server:", err.message);
        process.exit(1);
    })
    process.on('SIGINT', () => {
        console.log("\n🛑 Server shutting down...");
        for (const client of server.clients) {
            client.terminate();
            console.log("❌ All clients disconnected (server stopped).");
        }
        process.exit(0)
    })
    console.log(
        `🚀 WebSocket server running on port ${process.env.PORT || 8080}`
    );
} 

export default startServer;