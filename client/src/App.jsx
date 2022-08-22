import './App.css';
import io from 'socket.io-client';
import { useState, useEffect } from 'react';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { Chat } from './components/chat';

//Local
//const socket = io('http://localhost:4000');

//Remote
const socket = io();

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
    <div className="h-screen text-black  dark:text-white items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="h-screen bg-hero-pattern dark:bg-dark-pattern w-screen grid grid-rows-n-layout"
      >
        <Header />
        <Chat messages={messages} />
        <Footer message={message} setMessage={setMessage} />
      </form>
    </div>
  );
}

export default App;
