export function Chat({ messages }) {
  return (
    <div>
      <ul className="h-fit overflow-y-auto px-3">
        {messages.map((message, index) => (
          <li
            key={index}
            className={`my-2 p-2 max-w-[60%] table text-sm ${
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
  );
}
