import { useEffect, useRef, useState, useCallback } from "react";
import { randomText } from "../api/textGenerator";
import { useNavigate } from "react-router-dom";

function GamePage() {
    const [time, setTime] = useState(10);
    const [text, setText] = useState("");
    const [startGame, setStartGame] = useState(false);
    const [endGame, setEndGame] = useState(false);
    const [wordsPerMin, setWordsPerMin] = useState(0);

    const charRefs = useRef([]);
    const position = useRef(0);

    // Navigation
    const navigate = useNavigate();

    const setup = async () => {
        const generatedText = await randomText();
        setText(generatedText);
    };

    useEffect(() => {
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

    // Calculate the words per minute
    const calculateWordsPerMin = () => {
        let paragraph = text;

        // take the paragraph until the current position
        let temp = paragraph.slice(0, position.current)
        // split the text into separate words and save it as a number
        let split = temp.split(" ");
        // divide the number with 60 and set it to the wordspermin var
        setWordsPerMin(Math.round(split.length / 60))
    }

    // Run this after a finished game, but before you show results
    const runCleanup = () => {
        calculateWordsPerMin();
        setStartGame(false);
        setEndGame(true);
        setText("");
    }

    // Pretty self explanatory, I think
    const tryAgain = () => {
        setEndGame(false);
        setTime(60)
        setup();
        position.current = 0;
    }

    // Timer functionality
    useEffect(() => {
        if (startGame) {
            const timer = setInterval(() => {
                setTime((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        runCleanup();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [startGame]);

    return (
        <>
            {
                endGame
                    ?
                    <div className="bg-gray-900 h-screen w-screen px-10 py-32 items-center text-white flex flex-col justify-center space-y-10 relative">
                        <div className="w-screen absolute h-10 flex text-center justify-center items-center bg-yellow-300 cursor-pointer top-0">
                            <h1 className="m-auto hover:underline cursor-pointer" onClick={() => navigate('/leaderboards')}>Check out the leaderboards🏆</h1>
                        </div>
                        <h1 className="text-4xl font-bold">Results</h1>
                        <div className="border-b-white border-2 w-96"></div>
                        <h1 className="text-3xl">You write: <span className="underline font-bold">{wordsPerMin} words</span> per minute</h1>
                        <div className="border-b-white border-2 w-96"></div>
                        <button onClick={() => tryAgain()} className="border-white border-2 px-5 py-2 rounded-2xl bg-gray-600 hover:bg-gray-700">Try Again?</button>
                    </div>
                    :
                    <div className="bg-gray-900 h-screen w-screen flex flex-col justify-center relative">
                        {/* Leaderboards button */}
                        <div className="w-screen h-10 flex text-center justify-center items-center bg-yellow-300 cursor-pointer absolute top-0">
                            <h1 className="m-auto hover:underline cursor-pointer" onClick={() => navigate('/leaderboards')}>Check out the leaderboards🏆</h1>
                        </div>
                        <div className=" items-center text-white flex flex-col justify-between h-screen max-w-6xl px-10 py-20">
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
                    </div>
            }

        </>

    );
}

export default GamePage;
