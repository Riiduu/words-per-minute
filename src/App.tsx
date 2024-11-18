import { useEffect, useRef, useState } from "react";

function App() {

  useEffect(() => {
    document.addEventListener("keydown", detectKeyDown, true)
  }, [])

  // Timer value
  const [time, setTime] = useState(60);

  // Starts and ends the game
  const [startGame, setStartGame] = useState(false);

  // Ref for paragraph styling
  const charRefs = useRef([]);
  const specialKeys = [
    "Shift",
    "Control",
    "Alt",
    "Meta",          // Windows key (or Command key on macOS)
    "Tab",
    "CapsLock",
    "Escape",
    "Enter",
    "Space",         // Represented as " " in `e.key`
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "Insert",
    "Delete",
    "Home",
    "End",
    "PageUp",
    "PageDown",
    "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12",  // Function keys
    "NumLock",
    "PrintScreen",
    "Pause",
    "ScrollLock",
    "ContextMenu"   // Right-click context menu key
  ];

  let position = 0;
  // track the click count and the paragraph position according to the clicks
  const detectKeyDown = (e: any) => {

    for (let i = 0; i < specialKeys.length; i++) {
      if (e.key === specialKeys[i]) {
        return;
      }
    }

    if (position < 0) {
      position = 0;
      return;
    }

    if (e.key === "Backspace") {
      position--;
      charRefs.current[position].className = "";
    }

    if (e.key == paragraph[position]) {
      charRefs.current[position].className = "text-white";
      position++;
    } else if (e.key != paragraph[position] && e.key != "Backspace") {
      charRefs.current[position].className = "text-red-500 underline";
      position++
    }

    if (position == 1) {
      setStartGame(true);
    }
  }

  const paragraph = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae cum ita sint, effectum est nihil esse malum, quod turpe non sit. At certe gravius. Sunt enim prima elementa naturae, quibus auctis vírtutis quasi germen efficitur. Cur ipse Pythagoras et Aegyptum lustravit et Persarum magos adiit? At iam decimum annum in spelunca iacet. Duo Reges: constructio interrete. Ergo hoc quidem apparet, nos ad agendum esse natos. Quibus ego vehementer assentior.";


  // Timer Logic
  useEffect(() => {
    if (startGame) {
      const timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setStartGame(false); // Stop the game when time runs out
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer); // Cleanup
    }
  }, [startGame]); // Runs only when `startGame` changes

  return (
    <div className="bg-gray-900 h-screen w-screen px-10 py-32 items-center text-white flex flex-col justify-between">
      <div>
        <h1 className="text-center text-4xl font-bold">Words Per Minute Game</h1>
        <p className="text-center text-md text-gray-300 mt-3">Start typing to begin the game</p>
      </div>
      <div className="text-gray-500 text-2xl h-32 flex items-center  ">
        <p className="">
          {/* Insert the paragraphText as Characters surrounded by spans */}
          {
            paragraph.split("").map((char, index) => {
              return <span
                key={index}
                className=""
                ref={(el) => (charRefs.current[index] = el)}
              >
                {char}
              </span>
            })
          }
        </p>
      </div>

      <h1 className="text-2xl font-bold">Time: <span className={time <= 10 ? "text-red-500 font-bold" : "font-bold"}>{time}</span></h1>
    </div>
  )
}

export default App
