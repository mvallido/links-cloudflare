import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { authClient } from "@/components/auth/client";
import { LoginPopup } from "@/components/auth/login-popup";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";

export function HeroSection() {
  const { data } = authClient.useSession();
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const handleTryIt = () => {
    navigate({
      to: "/app/create",
      search: url ? { url } : undefined,
    });
  };

  return (
    <section className="flex-1 flex items-center justify-center px-6">
      <div className="w-full max-w-[680px] mx-auto -mt-12">
        <div className="text-center">
          {/* Headline */}
          <motion.h1
            className="text-5xl sm:text-[80px] font-semibold tracking-[-0.04em] text-foreground leading-[1.05] mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Shorten, share,{" "}
            <span className="text-muted-foreground">
              track.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-lg sm:text-xl font-normal text-muted-foreground mb-8 max-w-[420px] mx-auto leading-[1.5]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Create short links in seconds. See who clicks, where, and when.
          </motion.p>

          {/* URL input + CTA */}
          <motion.div
            className="flex flex-col sm:flex-row gap-2 justify-center items-center mb-8 max-w-[360px] mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Input
              placeholder="Paste a long URL"
              className="h-10 text-[13px] rounded-lg border-border bg-background placeholder:text-muted-foreground/50"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            {data ? (
              <Button
                size="lg"
                className="h-10 px-5 bg-foreground text-background hover:bg-foreground/85 rounded-full shrink-0 text-[13px] font-medium transition-colors duration-200"
                onClick={handleTryIt}
              >
                Try it
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            ) : (
              <LoginPopup
                callbackURL="/app/create"
                onBeforeAuth={() => {
                  if (url) {
                    sessionStorage.setItem("prefill_url", url);
                  }
                }}
              >
                <Button
                  size="lg"
                  className="h-10 px-5 bg-foreground text-background hover:bg-foreground/85 rounded-full shrink-0 text-[13px] font-medium transition-colors duration-200"
                >
                  Try it
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              </LoginPopup>
            )}
          </motion.div>

          {/* Subtle feature line */}
          <motion.p
            className="text-[13px] text-muted-foreground/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Instant links &middot; Click analytics &middot; Geo routing
          </motion.p>
        </div>
      </div>
    </section>
  );
}
