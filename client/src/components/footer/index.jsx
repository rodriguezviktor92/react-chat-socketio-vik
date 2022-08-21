export function Footer({ message, setMessage }) {
  return (
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
  );
}
