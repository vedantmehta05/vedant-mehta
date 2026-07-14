import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, XCircle, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-3 pointer-events-none" data-testid="toast-container">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="pointer-events-auto glass flex items-start gap-3 rounded-xl border border-border bg-card/95 p-4 shadow-2xl w-80"
            data-testid={`toast-${t.variant || "default"}`}
          >
            {t.variant === "destructive" ? (
              <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="h-5 w-5 text-emerald shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              {t.title && <p className="text-sm font-semibold">{t.title}</p>}
              {t.description && <p className="text-xs text-muted-foreground mt-1">{t.description}</p>}
            </div>
            <button onClick={() => dismiss(t.id)} className="text-muted-foreground hover:text-foreground" data-testid="toast-dismiss-button">
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
