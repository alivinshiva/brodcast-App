import './App.css'


function App() {

  function sendChat () {

  }

  return (
    <div className='flex flex-col h-full w-full justify-center align-middle bg-gray-700'>
        <h1 className='text-blue-100 text-3xl text-center'>Brodcast App 💬</h1>
        <div className='flex border-2 fixed bottom-10 right-0 w-full'>
        <input className='bg-blue-100 rounded-2xl h-10 w-full m-5 p-2' type="text" placeholder='message...' />
        <button className='bg-blue-400 rounded-2xl h-10 w-50 m-5 p-2' onClick={sendChat}>Send ➛</button>
        </div>



    </div>
  )
}

export default App