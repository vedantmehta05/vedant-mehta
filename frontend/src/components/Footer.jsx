import React from "react";
import { Linkedin, Mail, ArrowUp } from "lucide-react";
import { scrollToSection } from "@/lib/lenis";
import { useContent } from "@/hooks/use-content";

export default function Footer() {
  const { content } = useContent();
  const personal = content.personal;

  return (
    <footer className="relative border-t border-border py-10" data-testid="site-footer">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {personal.name}. Crafted with care.
        </p>
        <div className="flex items-center gap-3">
          {personal.linkedin && (
            <a href={personal.linkedin} target="_blank" rel="noreferrer" data-testid="footer-linkedin-link" className="flex h-10 w-10 items-center justify-center rounded-full border border-border hover:border-primary hover:text-primary transition-colors">
              <Linkedin className="h-4 w-4" />
            </a>
          )}
          <a href={`mailto:${personal.email}`} data-testid="footer-email-link" className="flex h-10 w-10 items-center justify-center rounded-full border border-border hover:border-primary hover:text-primary transition-colors">
            <Mail className="h-4 w-4" />
          </a>
          <button
            onClick={() => scrollToSection("home")}
            data-testid="footer-back-to-top-button"
            aria-label="Back to top"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
