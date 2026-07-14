import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { useActiveSection } from "@/hooks/use-active-section";
import { scrollToSection } from "@/lib/lenis";
import ThemeToggle from "@/components/ThemeToggle";
import ScrollProgress from "@/components/ScrollProgress";
import { personal } from "@/data/resumeData";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "expertise", label: "Expertise" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = useActiveSection(NAV_ITEMS.map((n) => n.id));

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => (document.body.style.overflow = "");
  }, [mobileOpen]);

  const handleNav = (id) => {
    scrollToSection(id);
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="fixed top-4 left-1/2 z-50 w-[95%] max-w-6xl -translate-x-1/2"
        data-testid="main-navbar"
      >
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 dark:bg-black/60 backdrop-blur-2xl shadow-2xl glass supports-[not(backdrop-filter)]:bg-black/90">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3">
            <button
              onClick={() => handleNav("home")}
              data-testid="nav-logo-button"
              className="font-heading text-lg font-extrabold tracking-tight text-white"
            >
              VM<span className="text-primary">.</span>
            </button>

            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  data-testid={`nav-link-${item.id}`}
                  onClick={() => handleNav(item.id)}
                  className={`relative px-3.5 py-2 text-sm font-medium rounded-full transition-colors ${
                    active === item.id ? "text-white" : "text-white/60 hover:text-white/90"
                  }`}
                >
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full bg-white/10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={personal.resumeUrl}
                download
                data-testid="nav-resume-download-button"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/15"
              >
                <Download className="h-3.5 w-3.5" /> Resume
              </a>
              <div className="[&_button]:border-white/15 [&_button]:text-white [&_button]:bg-white/5 [&_button:hover]:bg-white/15">
                <ThemeToggle />
              </div>
              <button
                data-testid="mobile-menu-toggle-button"
                onClick={() => setMobileOpen((o) => !o)}
                className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <ScrollProgress />
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl lg:hidden"
            data-testid="mobile-menu-panel"
          >
            <div className="flex h-full flex-col items-center justify-center gap-6">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  data-testid={`mobile-nav-link-${item.id}`}
                  onClick={() => handleNav(item.id)}
                  className={`font-heading text-2xl font-bold ${active === item.id ? "text-primary" : "text-white"}`}
                >
                  {item.label}
                </motion.button>
              ))}
              <a
                href={personal.resumeUrl}
                download
                data-testid="mobile-nav-resume-download-button"
                className="mt-4 flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-white"
              >
                <Download className="h-4 w-4" /> Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
