import './App.css';
import io from 'socket.io-client';
import { useState, useEffect } from 'react';

const socket = io('http://localhost:4000');

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      body: message,
      from: {
        id: socket.id,
        user: 'Me',
      },
    };
    socket.emit('message', message);
    setMessage('');
    setMessages([...messages, newMessage]);
  };

  useEffect(() => {
    const receiverMessage = (message) => {
      console.log(message);
      setMessages([...messages, message]);
    };

    socket.on('message', receiverMessage);

    return () => {
      socket.off('message', receiverMessage);
    };
  }, [messages]);
  return (
    <div className="h-screen bg-zinc-800 text-black  items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="h-screen bg-hero-pattern w-screen grid grid-rows-n-layout"
      >
        <div className="px-3 py-2 flex bg-[#f1f2f6] items-center">
          <span className="rounded-full bg-black p-1 text-white">Me</span>
          <h1 className="font-bold underline pl-2">Chat</h1>
        </div>
        <div>
          <ul className="h-fit overflow-y-auto px-3">
            {messages.map((message, index) => (
              <li
                key={index}
                className={`my-2 p-2 table text-sm ${
                  message.from.user === 'Me'
                    ? 'bg-green-500 rounded-t-lg rounded-l-lg ml-auto'
                    : 'bg-white rounded-t-lg rounded-r-lg'
                }`}
              >
                <p>
                  <b>{message.from.user}</b>: {message.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex p-3 bg-[#f1f2f6] justify-between">
          <input
            type="text"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            className="p-2 text-black rounded-md h-8 w-full bg-white"
          />
          <button className="pl-1">
            <span>
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path
                  fill="#6e7a80"
                  d="M1.101 21.757 23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"
                ></path>
              </svg>
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
