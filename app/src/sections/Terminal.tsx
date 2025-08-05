import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PropTypes {
    onType?: (command: string) => void;
}

const Terminal = ({onType} : PropTypes) => {
    const [commands, setCommands] = useState([
        "git init",
        "git add .",
        `git commit -m "Hello world 👋"`,
        `git commit -m "Frontend polish, add personal flair ✨"`,
        "git push origin main",
    ]);
    const [input, setInput] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleTerminalClick = () => {
        inputRef.current?.focus();
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        onType?.(input.trim());
        
        if (e.key === "Enter" && input.trim()) {
            setCommands([...commands, input.trim()]);
            setInput("");
        }
    };

    return (
        <div
            className="bg-black border border-white/10 rounded-xl shadow-lg p-6 font-mono text-base text-green-300 relative overflow-hidden"
            style={{ minHeight: 260, maxWidth: 600, margin: "0 auto", boxShadow: "0 4px 32px #0004" }}
            tabIndex={0}
            onClick={handleTerminalClick}
        >
            <div className="absolute top-0 left-0 w-full h-10 flex items-center px-4 gap-2 bg-neutral-900 border-b border-white/10 rounded-t-xl">
                <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-400 inline-block" />
                <span className="ml-4 text-xs text-neutral-400">~/portfolio</span>
            </div>
            <div className="pt-12 pb-2">
                <AnimatePresence>
                    {commands.map((cmd, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.18 }}
                            className="whitespace-pre"
                        >
                            <span className="text-cyan-400">$</span> {cmd}
                        </motion.div>
                    ))}
                </AnimatePresence>
                {/* Input line */}
                <div className="flex items-center mt-1">
                    <span className="text-cyan-400">$</span>
                    <input
                        ref={inputRef}
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        className="bg-transparent border-none outline-none text-green-300 ml-2 flex-1"
                        style={{ fontFamily: "inherit", fontSize: "inherit" }}
                        autoFocus={false}
                        spellCheck={false}
                    />
                    {/* Blinking cursor */}
                    <span
                        className="ml-1"
                        style={{
                            display: "inline-block",
                            width: "10px",
                            height: "22px",
                            background: "transparent",
                            verticalAlign: "middle",
                            animation: "blink 1s steps(2, start) infinite",
                        }}
                    >
                        |
                    </span>
                </div>
            </div>
            {/* Blinking cursor animation */}
            <style>
                {`
                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }
                `}
            </style>
        </div>
    );
}

export default Terminal