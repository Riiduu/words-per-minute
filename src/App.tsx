import { useEffect, useRef, useState } from "react";

function App() {

  useEffect(() => {
    document.addEventListener("keydown", detectKeyDown, true)
  }, [])

  const charRefs = useRef([]);

  const detectKeyDown = (e: any) => {
    console.log("Clicked: " + e.key)
  }


  const [paragraph, setParagraph] = useState("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam similique, cum officia, dolorem quidem cumque excepturi commodi sequi assumenda inventore quae tempore officiis odio odit eligendi dolore illo quos exercitationem?");

  let time = 20;

  return (
    <div className="bg-gray-800 h-screen w-screen px-10 py-32 items-center text-white flex flex-col justify-between">
      <div>
        <h1 className="text-center text-4xl font-bold">Words Per Minute Game</h1>
        <p className="text-center text-md text-gray-300 mt-3">Start typing to begin the game</p>
      </div>
      <div className="text-gray-500 text-2xl">
        <p>
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

      <h1 className="text-2xl font-bold">Time: {time}</h1>
    </div>
  )
}

export default App
