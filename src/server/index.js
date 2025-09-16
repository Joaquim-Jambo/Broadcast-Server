import ws from "ws";

const WebSocket = ws();
// abrir uma portar
const server = WebSocket.server({
    port: 8080
});
// criar a lista de sockets
let sockets = [];
//criar a ponte de comunicacao
server.on('conection', function (socket) {
    sockets.push(socket);
    // quando receber uma mensagem, enviar ela para todos os sockets
    socket.on('message', function (msg) {
        sockets.forEach(s => s.send());
    })
    // quando a conexao de um socket e fechada, removemos o socket do array
    socket.on('close', function(){
        sockets = sockets.filter(s=> s != socket)      
    })
})


