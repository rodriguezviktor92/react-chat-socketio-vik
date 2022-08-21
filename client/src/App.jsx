import './App.css';
import io from 'socket.io-client';
import { useState, useEffect } from 'react';
import useDarkSide from './hook/useDarkSide';

const socket = io('http://localhost:4000');

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [colorTheme, toggleTheme] = useDarkSide();

  const [darkSide, setDarkSide] = useState(
    colorTheme === 'light' ? true : false
  );

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
    <div className="h-screen text-black  dark:text-white items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="h-screen bg-hero-pattern dark:bg-dark-pattern w-screen grid grid-rows-n-layout"
      >
        <div className="px-3 py-2 flex bg-[#f1f2f6] dark:bg-[#212e35] items-center justify-between">
          <span className="rounded-full bg-black p-1 text-white">Me</span>
          <h1 className="font-bold underline pl-2">Chat</h1>

          <label
            for="default-toggle"
            class="inline-flex relative items-center cursor-pointer"
          >
            <input
              type="checkbox"
              value=""
              id="default-toggle"
              class="sr-only peer"
              onChange={toggleTheme}
              defaultChecked={darkSide}
            />
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span class="ml-3 text-sm font-medium text-gray-900 dark:text-white">
              {colorTheme === 'light' ? 'Light' : 'Dark'} Mode
            </span>
          </label>
        </div>
        <div>
          <ul className="h-fit overflow-y-auto px-3">
            {messages.map((message, index) => (
              <li
                key={index}
                className={`my-2 p-2 table text-sm ${
                  message.from.user === 'Me'
                    ? 'bg-green-500 rounded-t-lg rounded-l-lg ml-auto'
                    : 'bg-white dark:bg-[#1f2c33] dark:text-white rounded-t-lg rounded-r-lg'
                }`}
              >
                <p>
                  <b>{message.from.user}</b>: {message.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex p-3 bg-[#f1f2f6] dark:bg-[#212e35] justify-between items-center">
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
