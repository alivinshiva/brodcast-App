# 📡 Broadcast App - Chat Schema

A room-based real-time messaging system using WebSocket communication.

---

## 📋 Table of Contents

- [Message Types](#message-types)
- [Client Messages](#client-messages)
- [Server Logic](#server-logic)

---

## 🔌 Message Types

All messages follow a standardized structure with `type` and `payload` fields.

---

## 📤 Client Messages

### 1. Join Room

**Description:** User connects and joins a specific chat room.

**Message Structure:**
```json
{
  "type": "join",
  "payload": {
    "roomId": "123"
  }
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | string | ✅ | Must be `"join"` |
| `payload.roomId` | string | ✅ | Unique identifier for the room |

**Example:**
```json
{
  "type": "join",
  "payload": {
    "roomId": "room-abc-123"
  }
}
```

---

### 2. Send Chat Message

**Description:** User sends a message to their current room.

**Message Structure:**
```json
{
  "type": "chat",
  "payload": {
    "message": "Hi everyone"
  }
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | string | ✅ | Must be `"chat"` |
| `payload.message` | string | ✅ | Text content of the message |

**Example:**
```json
{
  "type": "chat",
  "payload": {
    "message": "Hello, how is everyone doing today?"
  }
}
```

---

## ⚙️ Server Logic

### Message Handler Flow

The server processes incoming messages based on their `type` field:

#### **Join Handler**

```javascript
if (user.type === "join") {
  // Add user socket to the room's socket array
  addUserToRoom(user.payload.roomId, socket);
  
  // Optionally: Broadcast join notification to room
  notifyRoomMembers(user.payload.roomId, "User joined");
}
```

**Actions:**
- ✅ Add user's socket connection to the room's socket array
- ✅ User is now subscribed to all messages in that room

---

#### **Chat Handler**

```javascript
if (user.type === "chat") {
  // Verify user membership in a room
  if (userIsInRoom(socket)) {
    // Broadcast message to all users in the same room
    broadcastToRoom(socket.roomId, user.payload.message);
  } else {
    // Send error: User not in any room
    socket.send({ 
      type: "error", 
      message: "You must join a room first" 
    });
  }
}
```

**Actions:**
- ✅ Check if user is part of a room
- ✅ If valid: Broadcast message to all room members
- ❌ If invalid: Return error response

---

## 🎯 Implementation Notes

1. **Room Management:**
   - Each room maintains an array of active socket connections
   - Users can only send messages to rooms they've joined

2. **Message Broadcasting:**
   - Messages are sent to all connected users in the same room
   - Sender receives their own message (echo)

3. **Error Handling:**
   - Validate room existence before joining
   - Ensure user is in a room before allowing chat
   - Handle disconnections and cleanup

---

## 📝 Future Enhancements

- [ ] Add user authentication
- [ ] Support private messages (DM)
- [ ] Add typing indicators
- [ ] Implement message history
- [ ] Add leave room functionality