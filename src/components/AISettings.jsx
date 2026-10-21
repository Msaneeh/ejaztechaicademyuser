const AISettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-ink">AI Preferences</h2>
        <p className="text-sm text-ink-soft">Customize your AI learning assistant.</p>
      </div>

      <div className="space-y-4 border-t border-ink-line pt-6">
        <ToggleRow
          title="Context awareness"
          description="Allow the AI to read the current lesson so it can give relevant answers."
          defaultChecked
        />
        <ToggleRow
          title="Save conversation history"
          description="Keep a history of your AI chats so you can review past explanations."
          defaultChecked
        />
        
        <div className="pt-4">
          <label className="mb-1.5 block text-xs font-medium text-ink">AI Tone</label>
          <select className="h-10 w-full max-w-xs rounded-xl border border-ink-line bg-background px-3 text-sm text-ink outline-none">
            <option>Encouraging & Mentor-like</option>
            <option>Direct & Technical</option>
            <option>Simple & ELI5 (Explain Like I'm 5)</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default AISettings;