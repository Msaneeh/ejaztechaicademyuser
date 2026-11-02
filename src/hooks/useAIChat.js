import { useState } from "react";

export function useAIChat(getContextLabel) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: inputValue }]);
    setInputValue("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: `Hello! Ready to work on ${getContextLabel()}?`,
        },
      ]);
    }, 1000);
  };

  return { messages, inputValue, setInputValue, sendMessage };
}