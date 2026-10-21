import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";

const AppearanceSettings = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-ink">Appearance</h2>
        <p className="text-sm text-ink-soft">Customize how EJAZTECH.AI looks on your device.</p>
      </div>

      <div className="space-y-4 border-t border-ink-line pt-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          
          {/* Light Mode Card */}
          <button
            onClick={() => setTheme("light")}
            className={[
              "flex flex-col items-center gap-3 rounded-xl border-2 p-4 transition-all",
              theme === "light"
                ? "border-ink bg-ink/5"
                : "border-ink-line hover:border-ink/30",
            ].join(" ")}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface shadow-sm border border-ink-line">
              <Sun className="h-6 w-6 text-ink" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-ink">Light</p>
              <p className="text-xs text-ink-faint">Bright and clean</p>
            </div>
          </button>

          {/* Dark Mode Card */}
          <button
            onClick={() => setTheme("dark")}
            className={[
              "flex flex-col items-center gap-3 rounded-xl border-2 p-4 transition-all",
              theme === "dark"
                ? "border-ink bg-ink/5"
                : "border-ink-line hover:border-ink/30",
            ].join(" ")}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0A0A0A] shadow-sm border border-[#222]">
              <Moon className="h-6 w-6 text-[#FAF8F5]" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-ink">Dark</p>
              <p className="text-xs text-ink-faint">Easy on the eyes</p>
            </div>
          </button>

        </div>
      </div>
    </div>
  );
}

export default AppearanceSettings