import { Sparkles, Send } from "lucide-react";

export default function AIHighlight() {
  return (
    <section className="border-y border-border bg-secondary/40 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            AI learning assistant
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            An AI that knows exactly which lesson you're on
          </h2>
          <p className="mt-4 text-muted-foreground">
            Ask it to explain, summarize, quiz you, or give you a practice
            question — right inside the lesson.
          </p>
        </div>

        {/* Chat mock */}
        <div className="mt-14 flex justify-center">
          <ChatMock />
        </div>

        {/* Suggested prompts */}
        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2">
          {[
            "Explain this in simple terms",
            "Give me an example",
            "Summarize this lesson",
            "Quiz me on this topic",
          ].map((prompt) => (
            <span
              key={prompt}
              className="
                rounded-full border border-border bg-background
                px-3.5 py-1.5 text-xs text-muted-foreground
              "
            >
              {prompt}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Chat panel mock                                                     */
/* ------------------------------------------------------------------ */
function ChatMock() {
  return (
    <div className="w-full max-w-xl">
      {/* Window */}
      <div
        className="
          overflow-hidden rounded-3xl border border-border
          bg-background/70 shadow-sm backdrop-blur-xl
        "
      >
        {/* Window header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-3">
            <span
              className="
                inline-flex h-8 w-8 items-center justify-center
                rounded-xl border border-border bg-secondary
              "
            >
              <Sparkles className="h-4 w-4 text-foreground" />
            </span>
            <div>
              <p className="text-sm font-medium text-foreground">
                AI Assistant
              </p>
              <p className="text-[11px] text-muted-foreground">
                React.js Masterclass · Module 3 · Context API
              </p>
            </div>
          </div>
          <span
            className="
              h-2 w-2 rounded-full bg-foreground/70
            "
            aria-hidden
          />
        </div>

        {/* Messages */}
        <div className="space-y-4 px-5 py-6">
          <UserBubble>
            Explain Context API in simple terms.
          </UserBubble>

          <AssistantBubble>
            Think of Context as a shared backpack. Instead of passing props
            down every component, you put what you need in the backpack once,
            and any component can reach in and grab it — no matter how deep
            it is in the tree.
          </AssistantBubble>

          <UserBubble>Give me a small example.</UserBubble>

          <AssistantBubble>
            Sure — imagine a `ThemeContext`. You set it at the top of your
            app, and any button, card, or modal can read the current theme
            without receiving it as a prop.
          </AssistantBubble>
        </div>

        {/* Input bar (disabled mock) */}
        <div className="border-t border-border px-5 py-4">
          <div
            className="
              flex items-center gap-3 rounded-full
              border border-border bg-secondary/60 px-4 py-2.5
            "
          >
            <span className="flex-1 text-sm text-muted-foreground">
              Ask anything about this lesson…
            </span>
            <span
              className="
                inline-flex h-7 w-7 items-center justify-center
                rounded-full bg-foreground text-primary-foreground
              "
            >
              <Send className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserBubble({ children }) {
  return (
    <div className="flex justify-end">
      <div
        className="
          max-w-[80%] rounded-2xl rounded-br-md
          bg-foreground px-4 py-3
          text-sm text-primary-foreground
        "
      >
        {children}
      </div>
    </div>
  );
}

function AssistantBubble({ children }) {
  return (
    <div className="flex justify-start">
      <div
        className="
          max-w-[85%] rounded-2xl rounded-bl-md
          border border-border bg-secondary/60
          px-4 py-3 text-sm text-foreground
        "
      >
        {children}
      </div>
    </div>
  );
}