
import { useRef, useEffect } from "react";
import { Bot, Send, X } from "lucide-react";

const AIAssistant = ({ open, onClose, messages, inputValue, onInputChange, onSubmit, contextTitle }) => {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  return (
    <div className={`fixed inset-y-0 right-0 z-50 w-96 max-w-[100vw] transform border-l border-white/10 bg-[#141414] shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
      <div className="flex h-14 items-center justify-between border-b border-white/10 px-4">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-blue-400" />
          <h2 className="text-sm font-semibold text-white">AI Assistant</h2>
        </div>
        <button onClick={onClose} aria-label="Close AI assistant" className="text-white/50 hover:text-white"><X className="h-5 w-5" /></button>
      </div>

      <div className="flex h-[calc(100vh-3.5rem)] flex-col">
        <div className="flex-1 space-y-4 overflow-y-auto p-4 [&::-webkit-scrollbar]:hidden">
          <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-3 text-xs text-blue-200">
            Context: You are viewing <span className="font-semibold">{contextTitle || "the course"}</span>.
          </div>
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${msg.role === "assistant" ? "bg-blue-600" : "bg-white/20"}`}>
                {msg.role === "assistant" ? <Bot className="h-4 w-4 text-white" /> : <span className="text-xs text-white">You</span>}
              </div>
              <div className={`rounded-2xl p-3 text-sm ${msg.role === "assistant" ? "rounded-tl-sm bg-white/10 text-white/90" : "rounded-tr-sm bg-blue-600 text-white"}`}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <form onSubmit={onSubmit} className="border-t border-white/10 p-4">
          <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-black/50 p-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 bg-transparent px-2 text-sm text-white outline-none placeholder:text-white/30"
            />
            <button type="submit" aria-label="Send" className="rounded-lg bg-white p-2 text-black hover:bg-gray-200">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AIAssistant;