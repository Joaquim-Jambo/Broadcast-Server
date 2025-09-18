# 📡 Broadcast Server CLI

A simple **WebSocket Broadcast Server** built with Node.js.  
It allows multiple clients to connect and send messages to each other in real time.  

---

## ✨ Features
- 🌍 Clients can connect to the server using a **username** via query parameters.
- 💬 Messages sent by a client are broadcasted to all connected clients.
- 👋 Notify when a user joins or leaves.
- ⚠️ Handles server shutdown gracefully (all clients are disconnected).
- 🖥️ CLI commands available globally through `bin`.

---

Aqui está o teu conteúdo já formatado corretamente em **Markdown**:

````markdown
## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/broadcast-server.git
   cd broadcast-server
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set the environment variable in a `.env` file:

   ```env
   PORT=8080
   ```

4. Link the package globally (to run commands anywhere):

   ```bash
   npm link
   ```

---

## 🚀 Usage

Start the WebSocket server:

```bash
broadcast-server start
```

Connect a client with a username:

```bash
broadcast-server connect --name Joaquim
```

---

## 📋 Commands

* `broadcast-server start` → Starts the WebSocket server.
* `broadcast-server connect --name <username>` → Connects as a client.
* Inside the client:

  * Type a message and press **Enter** to send.
  * All connected clients will receive it instantly.

---

## 📚 Reference

This project is based on the [Broadcast Server challenge](https://roadmap.sh/projects/broadcast-server) from [roadmap.sh](https://roadmap.sh).

---

## 👨‍💻 Author

**Joaquim Jambo**
```

