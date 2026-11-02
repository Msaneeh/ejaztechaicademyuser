import { MailCheckIcon, Mail } from "lucide-react";

const SentPasswordStage = ({ email, onContinue, onChangeEmail }) => {
      return (
    <div className="mt-10">
      <div
        className="
          inline-flex h-12 w-12 items-center justify-center
          rounded-2xl border border-border bg-secondary
        "
      >
        <Mail className="h-5 w-5 text-foreground" />
      </div>

      <h1 className="mt-6 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        Check your email
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        We sent a reset link to{" "}
        <span className="font-medium text-foreground">{email}</span>. The link
        expires in 15 minutes.
      </p>

      <div className="mt-8 space-y-3">
        {/* Demo-only: simulate clicking the email link */}
        <button
          type="button"
          onClick={onContinue}
          className="
            inline-flex h-11 w-full items-center justify-center gap-2
            rounded-full bg-primary px-6
            text-sm font-medium text-primary-foreground
            transition hover:opacity-90
            focus:outline-none focus-visible:ring-2
            focus-visible:ring-ring focus-visible:ring-offset-2
            focus-visible:ring-offset-background
          "
        >
          <MailCheckIcon className="h-4 w-4" />
          Open Your Mail
        </button>

        <button
          type="button"
          onClick={onChangeEmail}
          className="
            inline-flex h-11 w-full items-center justify-center
            rounded-full border border-border bg-background
            px-6 text-sm font-medium text-foreground
            transition hover:bg-secondary
          "
        >
          Use a different email
        </button>
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Didn't get it? Check spam, or{" "}
        <button
          type="button"
          onClick={onChangeEmail}
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          try again
        </button>
        .
      </p>
    </div>
  );
}

export default SentPasswordStage;