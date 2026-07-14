import React from "react";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import { techStack } from "@/data/resumeData";

export default function TechStack() {
  return (
    <section id="tech-stack" className="relative py-24 md:py-28 overflow-hidden" data-testid="tech-stack-section">
      <div className="container mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-3">Technology Stack</p>
          <h2 className="text-4xl sm:text-5xl font-heading font-extrabold tracking-tight">Tools I build with</h2>
        </motion.div>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="flex gap-5 mb-5 animate-marquee whitespace-nowrap" data-testid="tech-stack-marquee-row-1">
          {[...techStack, ...techStack].map((tech, i) => (
            <div
              key={`${tech}-${i}`}
              className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-6 py-4 shrink-0 transition-transform duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
            >
              <Code2 className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
