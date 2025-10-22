import React, { useCallback, useEffect, useRef, useState } from "react";

const App = () => {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  // password generate 
  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQURSTUVWXYZabcdefghijklmnopqurstuvwxyz";

    if (number) str += "0123456789";
    if (charAllowed) str += "~!@#$%^&*(){}[]|?";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length );
      pass += str.charAt(char);

    }
    setPassword(pass);
  }, [length, number, charAllowed, setPassword]);

  // copy password

  const passwordCopy = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password);
  }, [password]);

  // useEffect
  useEffect(() => {
    generatePassword();
  }, [length, charAllowed, number, generatePassword]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-4">
      <div className="w-full max-w-md bg-gray-950 rounded-2xl shadow-lg p-8 border border-gray-800">
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Password Generator
        </h1>

        {/* Input + Copy Button */}
        <div className="flex items-center gap-3 mb-6">
          <input
            type="text"
            value={password}
            readOnly
            placeholder="Generate password"
            ref={passwordRef}
            className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />
          <button
            onClick={passwordCopy}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold transition-all"
          >
            Copy
          </button>
        </div>

        {/* Options */}
        <div className="space-y-4">
          {/* Length Range */}
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-300">
              Password Length:{length}
            </label>
            <input
              type="range"
              min="8"
              max="32"
              value={length}
              onChange={(e) => {
                setLength(Number(e.target.value));
              }}
              className="w-2/3 accent-blue-500 cursor-pointer"
            />
          </div>

          {/* Character Options */}
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-300">
              Include Numbers
            </label>
            <input
              type="checkbox"
              checked={number}
              id="numberInput"
              onChange={() => {
                setNumber((prev) => !prev);
              }}
              className="w-5 h-5 accent-blue-500 cursor-pointer"
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-300">
              Include Special Characters
            </label>
            <input
              type="checkbox"
              id="charInput"
              checked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
              className="w-5 h-5 accent-blue-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generatePassword}
          className="mt-6 w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white py-3 rounded-xl font-semibold text-lg transition-all"
        >
          Generate Password
        </button>
      </div>
    </div>
  );
};

export default App;
