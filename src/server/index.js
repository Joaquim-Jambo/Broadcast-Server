import { WebSocketServer } from "ws";
import dotenv from "dotenv";

dotenv.config();

export const startServer = () => {
    const server = new WebSocketServer({ port: process.env.PORT || 8080 })
    const onMessage = (ws, data) => {
        console.log("📥 Mensagem recebida:", data.toString());
        server.broadcast(data.toString());
    }
    function broadcast(msg) {
        if (!this.clients) return;
        this.clients.forEach(client => {
            if (client.readyState == WebSocket.OPEN) {
                client.send(`⚡ ${client.name} ${msg}`)
            }
        });
    }
    server.broadcast = broadcast;
    server.on('connection', (ws, req) => {
        const url = new URL(req.url, `http://${req.headers.host}`)
        const name = url.searchParams.get("name") || "desconhecido";
        ws.name = name;
        console.log(`🟢 ${ws.name} Entrou !`);
        ws.on('message', (ws, data) => {
            for (const client of ws.client) {
                client.send(`🟢 ${client.name} entrou!`)
            }
        })
        ws.on('message', data => onMessage(ws, data))
        ws.on('close', () => {
            for (const client of server.clients) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(`🔴 ${ws.name} saiu!`)
                }
            }
            console.log(`🔴 ${ws.name} Saiu !`);
        });
        ws.send("👋 Olá! Você está conectado ao servidor WebSocket.");
    });
    console.log(`🖥️ Servidor WebSocket rodando na porta ${process.env.PORT || 8080}`);
}



