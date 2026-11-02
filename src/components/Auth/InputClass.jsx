const InputClass = (error) => {
  return [
    "h-11 w-full rounded-xl border bg-background px-4",
    "text-sm text-foreground placeholder:text-muted-foreground",
    "outline-none transition",
    error
      ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
      : "border-border focus:border-foreground/30 focus:ring-2 focus:ring-foreground/5",
  ].join(" ");
}

export default InputClass;
