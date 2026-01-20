# 🚀 Broadcast App - Real-Time Chat Application

A full-stack real-time messaging application built with WebSocket technology, featuring room-based chat functionality. Users can create or join chat rooms and communicate instantly with other participants in the same room.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![WebSocket](https://img.shields.io/badge/WebSocket-010101?style=flat&logo=socket.io&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Running the Application](#-running-the-application)
- [Usage](#-usage)
- [WebSocket Protocol](#-websocket-protocol)
- [Development](#-development)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

- 💬 **Real-time messaging** - Instant message delivery using WebSocket
- 🏠 **Room-based chat** - Create or join chat rooms with unique IDs
- 👥 **Multi-user support** - Multiple users can chat simultaneously in the same room
- 🎨 **Modern UI** - Clean and responsive design with Tailwind CSS
- 📱 **Mobile-friendly** - Responsive layout that works on all devices
- ⚡ **Fast & lightweight** - Minimal dependencies and optimized performance
- 🔐 **Type-safe** - Built entirely with TypeScript

---

## 🛠️ Tech Stack

### Frontend
- **React 19.2** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **WebSocket API** - Real-time communication

### Backend
- **Node.js** - Runtime environment
- **TypeScript** - Type-safe JavaScript
- **ws** - WebSocket library for Node.js

---

## 📁 Project Structure

```
brodcast-App/
├── be/                          # Backend server
│   ├── src/
│   │   └── index.ts            # WebSocket server implementation
│   ├── package.json
│   ├── tsconfig.json
│   └── chatSchema.md           # WebSocket protocol documentation
├── brodcastApp/                # Frontend application
│   ├── src/
│   │   ├── App.tsx             # Main React component
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.tsx            # Entry point
│   ├── public/
│   ├── index.html
│   ├── vite.config.ts
│   ├── package.json
│   └── tsconfig.json
├── .gitignore
└── README.md
```

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (v9 or higher) - Comes with Node.js
- A modern web browser (Chrome, Firefox, Safari, or Edge)

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd brodcast-App
```

### 2. Install Backend Dependencies

```bash
cd be
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../brodcastApp
npm install
```

---

## 🏃 Running the Application

You'll need to run both the backend and frontend servers.

### Terminal 1: Start the Backend Server

```bash
cd be
npm run dev
```

The WebSocket server will start on `ws://localhost:8000`

**Expected output:**
```
Compiled successfully!
WebSocket server running on port 8000
```

### Terminal 2: Start the Frontend Development Server

```bash
cd brodcastApp
npm run dev
```

The frontend will be available at `http://localhost:5173`

**Expected output:**
```
VITE v7.2.4  ready in 234 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

---

## 📖 Usage

### Joining a Chat Room

1. Open your browser and navigate to `http://localhost:5173`
2. Enter a **Room ID** in the input field (e.g., "room1", "general", "team-alpha")
3. Click **"Join Room"** or press **Enter**
4. You're now in the chat room!

### Sending Messages

1. Type your message in the input field at the bottom
2. Click **"Send ➛"** or press **Enter**
3. Your message will be broadcast to all users in the same room

### Leaving a Room

- Click the **"Leave Room"** button in the top-right corner
- You'll be returned to the room selection screen

### Testing with Multiple Users

To test the chat functionality:

1. Open multiple browser tabs/windows
2. Navigate to `http://localhost:5173` in each
3. Join the **same room ID** in all tabs
4. Send messages from any tab - they'll appear in all tabs instantly!

---

## 🔌 WebSocket Protocol

The application uses a JSON-based message protocol. See [be/chatSchema.md](be/chatSchema.md) for detailed documentation.

### Client → Server Messages

#### Join Room
```json
{
  "type": "join",
  "payload": {
    "roomId": "room-name"
  }
}
```

#### Send Chat Message
```json
{
  "type": "chat",
  "payload": {
    "message": "Hello everyone!"
  }
}
```

### Server → Client Messages

The server broadcasts chat messages as plain text to all users in the room.

---

## 👨‍💻 Development

### Backend Development

The backend code is located in [`be/src/index.ts`](be/src/index.ts).

**Key components:**
- WebSocket server initialization
- User management with room tracking
- Message broadcasting logic
- Connection cleanup on disconnect

**Rebuild after changes:**
```bash
cd be
npm run dev
```

### Frontend Development

The frontend code is in [`brodcastApp/src/App.tsx`](brodcastApp/src/App.tsx).

**Key features:**
- WebSocket connection management
- Room joining/leaving logic
- Message state management
- Auto-scrolling chat interface

**Hot reload is enabled** - changes will reflect automatically.

### Building for Production

#### Backend
```bash
cd be
npm run dev  # Compiles TypeScript to dist/
```

#### Frontend
```bash
cd brodcastApp
npm run build
```

The production build will be in `brodcastApp/dist/`

---

## 🐛 Troubleshooting

### WebSocket Connection Failed

**Problem:** Frontend can't connect to backend

**Solutions:**
- Ensure backend is running on port 8000
- Check if firewall is blocking WebSocket connections
- Verify the WebSocket URL in [`App.tsx`](brodcastApp/src/App.tsx) matches your backend URL

### Messages Not Appearing

**Problem:** Sent messages don't show up

**Solutions:**
- Check browser console for errors (F12)
- Verify you've joined a room before sending messages
- Ensure multiple users are in the **same room ID**

### Port Already in Use

**Problem:** `Error: listen EADDRINUSE: address already in use :::8000`

**Solutions:**
```bash
# Find process using port 8000
lsof -i :8000

# Kill the process
kill -9 <PID>
```

### TypeScript Compilation Errors

**Problem:** Build fails with TypeScript errors

**Solutions:**
```bash
# Clear TypeScript cache
rm -rf node_modules/.cache

# Reinstall dependencies
npm install
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Maintain existing code style
- Add comments for complex logic
- Test your changes thoroughly

---

## 📝 Future Enhancements

- [ ] User authentication and usernames
- [ ] Message history persistence
- [ ] Private/direct messaging
- [ ] Typing indicators
- [ ] Online user list
- [ ] Message timestamps
- [ ] Emoji support
- [ ] File sharing
- [ ] Room creation UI
- [ ] Mobile app (React Native)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👥 Authors

- Your Name - Initial work

---

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- WebSocket library: [ws](https://github.com/websockets/ws)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Powered by [Vite](https://vite.dev/)

---

## 📞 Support

If you encounter any issues or have questions:

1. Open an issue on GitHub

---

**Happy Chatting! 💬✨**