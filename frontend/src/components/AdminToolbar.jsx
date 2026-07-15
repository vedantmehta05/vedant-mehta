import React from "react";
import { ShieldCheck, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export default function AdminToolbar() {
  const { admin, logout } = useAuth();
  if (!admin) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-[70] flex items-center gap-3 rounded-full border border-emerald/30 bg-card/95 backdrop-blur-xl px-4 py-2.5 shadow-2xl"
      data-testid="admin-toolbar"
    >
      <span className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-emerald">
        <ShieldCheck className="h-3.5 w-3.5" /> Admin Mode
      </span>
      <button
        onClick={logout}
        data-testid="admin-logout-button"
        className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium transition-colors hover:bg-accent"
      >
        <LogOut className="h-3.5 w-3.5" /> Logout
      </button>
    </div>
  );
}
