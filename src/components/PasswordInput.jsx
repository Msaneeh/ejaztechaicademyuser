import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput({
  label = "Password",
  error,
  placeholder = "••••••••",
  autoComplete = "current-password",
  ...inputProps
}) {
  const [show, setShow] = useState(false);

  return (
    <div>
      {label && (
        <label className="mb-1.5 block text-xs font-medium text-foreground">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          type={show ? "text" : "password"}
          autoComplete={autoComplete}
          placeholder={placeholder}
          {...inputProps}
          className={[
            "h-11 w-full rounded-xl border bg-background pl-4 pr-10",
            "text-sm text-foreground placeholder:text-muted-foreground",
            "outline-none transition",
            error
              ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
              : "border-border focus:border-foreground/30 focus:ring-2 focus:ring-foreground/5",
          ].join(" ")}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Hide password" : "Show password"}
          className="
            absolute right-2 top-1/2 -translate-y-1/2
            rounded-full p-1.5 text-muted-foreground
            transition hover:bg-secondary hover:text-foreground
          "
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>

      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}