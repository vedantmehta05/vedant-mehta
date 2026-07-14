import React, { useEffect } from "react";
import Lenis from "lenis";
import { ThemeProvider } from "@/hooks/use-theme";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import CursorGlow from "@/components/CursorGlow";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import CareerJourney from "@/components/sections/CareerJourney";
import Education from "@/components/sections/Education";
import Skills from "@/components/sections/Skills";
import TechStack from "@/components/sections/TechStack";
import Projects from "@/components/sections/Projects";
import Stats from "@/components/sections/Stats";
import Expertise from "@/components/sections/Expertise";
import Certifications from "@/components/sections/Certifications";
import Achievements from "@/components/sections/Achievements";
import Contact from "@/components/sections/Contact";
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
      <TooltipProvider delayDuration={200}>
        <div className="relative min-h-screen bg-background text-foreground noise-overlay overflow-x-hidden">
          <CursorGlow />
          <Navbar />
          <main>
            <Hero />
            <About />
            <CareerJourney />
            <Education />
            <Skills />
            <TechStack />
            <Projects />
            <Stats />
            <Expertise />
            <Certifications />
            <Achievements />
            <Contact />
          </main>
          <Footer />
          <Toaster />
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
