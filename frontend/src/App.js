import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import { ThemeProvider } from "@/hooks/use-theme";
import { AuthProvider } from "@/hooks/use-auth";
import { ContentProvider } from "@/hooks/use-content";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import CursorGlow from "@/components/CursorGlow";
import Portfolio from "@/pages/Portfolio";
import LoginPage from "@/pages/LoginPage";
import { setLenis } from "@/lib/lenis";
import "./App.css";

function App() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    setLenis(lenis);

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <ContentProvider>
          <TooltipProvider delayDuration={200}>
            <div className="relative min-h-screen bg-background text-foreground noise-overlay overflow-x-hidden">
              <CursorGlow />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Portfolio />} />
                  <Route path="/login" element={<LoginPage />} />
                </Routes>
              </BrowserRouter>
              <Toaster />
            </div>
          </TooltipProvider>
        </ContentProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
