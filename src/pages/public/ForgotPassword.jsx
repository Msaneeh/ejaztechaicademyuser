import { useState } from "react";
import { Link, } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// components
import RequestPassWordStage from "@/components/Auth/RequestPassWordStage";
import SentPasswordStage from "@/components/Auth/SentPasswordStage";




const ForgotPassword = () => {
  const [stage, setStage] = useState("request"); // "request" | "sent" | "reset"
  const [email, setEmail] = useState("");

  const openEmailHandler = () => {
    if (!email) return;

    const domain = email.split('@')[1]?.toLowerCase();

    const emailProviders = {
        'gmail.com' : 'https://google.com',
        'yahoo.com' : 'https://yahoo.com',
        'hotmail.com' : 'https://hotmail.com',
        'outlook.com' : 'https://outlook.com',
        'live.com' : 'https://live.com',
    };

    // if it's a known webmail provider, open it. Otherwise, trigger the system default email app.
    const targetUrl = emailProviders[domain] || 'mailto:';

    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  }


  return (
    <div className="flex min-h-screen bg-background">
      
      <div className="relative flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16">
       
        <Link
          to="/auth"
          className="
            group absolute left-6 top-6 inline-flex items-center gap-2
            rounded-full border border-ink-line bg-surface/80
            px-4 py-2
            text-sm font-semibold text-ink
            shadow-sm backdrop-blur-md transition-all
            hover:border-ink/30 hover:bg-surface hover:shadow-md
            focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/20
            lg:left-16
          "
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Back to Sign In</span>
        </Link>

        <div className="mx-auto w-full max-w-sm">
          
          <div
           
            className="inline-flex items-center transition-opacity hover:opacity-80"
            aria-label="EJAZTECH home"
          >
            <img
              src="/logo.jpg"
              alt="EJAZTECH.AI"
              className="h-20 w-auto rounded-full"
            />
          </div>

          {/* ---------------- Stage 1: Request ---------------- */}
          {stage === "request" && (
            <RequestPassWordStage
              onSent={(sentEmail) => {
                setEmail(sentEmail);
                setStage("sent");
              }}
            />
          )}

          {/* ---------------- Stage 2: Sent ---------------- */}
          {stage === "sent" && (
            <SentPasswordStage
              email={email}
              onContinue={openEmailHandler}
              onChangeEmail={() => setStage("request")}
            />
          )}

        </div>
      </div>

      
      <div className="relative hidden lg:flex lg:w-1/2 items-center justify-center border-l border-border bg-secondary/40">
        <div className="max-w-md px-12 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Account recovery
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
            Let's get you
            <br />
            back in.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Enter the email you signed up with and we'll send you a secure
            link to reset your password.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;