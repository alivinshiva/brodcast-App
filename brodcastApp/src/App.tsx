import { useEffect, useRef, useState } from 'react'
import './App.css'


function App() {

  const [message, setmessage] = useState<string[]>([]);
  const [roomId, setRoomId] = useState<string>("");
  const [currentRoom, setCurrentRoom] = useState<string>("");
  const [joined, setJoined] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const wsRef = useRef<WebSocket | null>(null);



  useEffect(() => {
    const wss = new WebSocket("https://2csw0m35-8000.inc1.devtunnels.ms/")
    wss.onmessage = (e) => {
      setmessage(m => [...m, e.data])
    }
    wsRef.current = wss;

    wss.onopen = () => {
      console.log("connected to websocket server")
    }

    return () => {
      wss.close();
    }

  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [message]);

  function sendChat() {
    if (inputRef.current && inputRef.current.value.trim() && wsRef.current) {
      wsRef.current.send(JSON.stringify({ type: "chat", payload: { message: inputRef.current.value } }))
      inputRef.current.value = "";
    }
  }

  function joinRoom() {
    if (wsRef.current && roomId.trim()) {
      wsRef.current.send(JSON.stringify({ type: "join", payload: { roomId } }))
      setCurrentRoom(roomId);
      setJoined(true);
      setmessage([]);
    }
  }

  function leaveRoom() {
    setJoined(false);
    setCurrentRoom("");
    setRoomId("");
    setmessage([]);
  }


  return (
    <div className='flex flex-col h-screen align-middle bg-black'>
      <div className='flex justify-between items-center px-5 py-3 bg-gray-900'>
        <h1 className='text-blue-100 text-3xl'>Brodcast App 💬</h1>
        {joined && (
          <div className='flex items-center gap-3'>
            <span className='text-white'>Room: {currentRoom}</span>
            <button 
              className='bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600'
              onClick={leaveRoom}
            >
              Leave Room
            </button>
          </div>
        )}
      </div>

      {!joined ? (
        <div className='flex-1 flex items-center justify-center'>
          <div className='bg-gray-900 p-8 rounded-2xl w-96'>
            <h2 className='text-white text-2xl mb-4 text-center'>Join a Room</h2>
            <input 
              className='bg-blue-100 rounded-lg h-12 w-full mb-4 p-3' 
              type="text" 
              placeholder='Enter Room ID...'
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && joinRoom()}
            />
            <button 
              className='bg-blue-500 text-white rounded-lg h-12 w-full hover:bg-blue-600'
              onClick={joinRoom}
            >
              Join Room
            </button>
          </div>
        </div>
      ) : (
        <>
          <div ref={scrollRef} className='flex-1 overflow-y-auto bg-amber-50 p-5 pb-24'>
            <div className='flex flex-col gap-3'>
              {message.map((msg, index) => (
                <div
                  key={index}
                  className='text-lg border-0 rounded-2xl bg-black w-fit text-white px-4 py-2 max-w-xl break-words'
                >
                  {msg}
                </div>
              ))}
            </div>
          </div>

          <div className='flex border-2 fixed bottom-0 right-0 w-full rounded-t-3xl bg-gray-900 p-4 gap-3'>
            <input 
              ref={inputRef}
              className='bg-blue-100 rounded-2xl h-12 flex-1 px-4' 
              type="text" 
              placeholder='Type a message...'
              onKeyPress={(e) => e.key === 'Enter' && sendChat()}
            />
            <button 
              className='bg-blue-500 text-white rounded-2xl h-12 px-6 hover:bg-blue-600'
              onClick={sendChat}
            >
              Send ➛
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default App