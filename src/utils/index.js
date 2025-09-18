function broadcast(msg, server) {
    for (const client of server.clients) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(msg);
        }
    }
}
export default broadcast