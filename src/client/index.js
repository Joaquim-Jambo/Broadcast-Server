import { WebSocket } from "ws";
import readline from "readline"

const connect = (username) => {
    const url = new URL(`ws://localhost:8080`);
    url.searchParams.set("name", username);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    const ws = new WebSocket(url.toString());
    ws.on('open', () => {
        console.log(`⚡ [${username}] joined!`);
    })
    rl.on("line", (input) => {
        ws.send(input);
    })
    ws.on('message', (data) => {
        console.log(`📥 Message received:`, data.toString());
        console.log("✍️ Type a message:");
    })
    ws.on('error', () => {
        console.error("❌ Connection error");
        process.exit(1);
    })
    ws.on('close', () => {
        console.log("⚠️ Server went down, connection lost.");
        process.exit(0);
    })
}

export default connect;

