import useDarkSide from '../../hook/useDarkSide';
import { useState } from 'react';

export function Header() {
  const [colorTheme, toggleTheme] = useDarkSide();

  const [darkSide, setDarkSide] = useState(
    colorTheme === 'light' ? true : false
  );

  return (
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
  );
}
