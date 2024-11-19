import { useEffect, useRef, useState, useCallback } from "react";
import { randomText } from "./api/textGenerator";

function App() {
  const [time, setTime] = useState(5);
  const [text, setText] = useState("");
  const [startGame, setStartGame] = useState(false);
  const [endGame, setEndGame] = useState(false);

  const charRefs = useRef([]);
  const position = useRef(0);

  useEffect(() => {
    const setup = async () => {
      const generatedText = await randomText();
      setText(generatedText);
    };
    setup();
  }, []);

  const specialKeys = [
    "Shift", "Control", "Alt", "Meta", "Tab", "CapsLock", "Escape", "Enter", "Space",
    "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Insert", "Delete", "Home",
    "End", "PageUp", "PageDown", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8",
    "F9", "F10", "F11", "F12", "NumLock", "PrintScreen", "Pause", "ScrollLock", "ContextMenu"
  ];

  const detectKeyDown = useCallback((e: any) => {
    if (!text || endGame) return; // Skip if text is not loaded

    if (specialKeys.includes(e.key)) return;

    if (e.key === "Backspace") {
      position.current = Math.max(0, position.current - 1);
      charRefs.current[position.current]?.classList.remove("text-white", "text-red-500", "underline");
    } else if (e.key === text[position.current]) {
      charRefs.current[position.current]?.classList.add("text-white");
      position.current++;
    } else {
      charRefs.current[position.current]?.classList.add("text-red-500", "underline");
      position.current++;
    }

    if (position.current === 1) setStartGame(true);
  }, [text]);

  useEffect(() => {
    if (!endGame) {
      document.addEventListener("keydown", detectKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", detectKeyDown);
    };
  }, [detectKeyDown, endGame]);

  useEffect(() => {
    if (startGame) {
      const timer = setInterval(() => {
        setTime((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setStartGame(false);
            setEndGame(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [startGame]);

  return (
    <div className="bg-gray-900 h-screen w-screen px-10 py-32 items-center text-white flex flex-col justify-between">
      <div>
        <h1 className="text-center text-4xl font-bold">Words Per Minute Game</h1>
        <p className="text-center text-md text-gray-300 mt-3">Start typing to begin the game</p>
      </div>
      <div className="text-gray-500 text-2xl h-32 flex items-center">
        <p>
          {text
            ? text.split("").map((char, index) => (
              <span key={index} ref={(el) => (charRefs.current[index] = el)}>
                {char}
              </span>
            ))
            : "Loading..."}
        </p>
      </div>
      <h1 className="text-2xl font-bold">
        Time: <span className={time <= 10 ? "text-red-500 font-bold" : "font-bold"}>{time}</span>
      </h1>
    </div>
  );
}

export default App;
