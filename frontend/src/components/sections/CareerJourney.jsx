import React from "react";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SectionEditButton from "@/components/SectionEditButton";
import { useContent } from "@/hooks/use-content";
import { useAuth } from "@/hooks/use-auth";

export default function CareerJourney() {
  const { content } = useContent();
  const { isAdmin } = useAuth();
  const experience = content.experience;

  return (
    <section id="journey" className="relative py-24 md:py-32" data-testid="career-journey-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl flex items-start justify-between gap-4"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-3">Career Journey</p>
            <h2 className="text-4xl sm:text-5xl font-heading font-extrabold tracking-tight">Where I've built</h2>
          </div>
          {isAdmin && <SectionEditButton section="experience" label="Career Journey" />}
        </motion.div>

        <div className="relative pl-8 md:pl-12">
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-purple to-transparent md:left-0" />

          {experience.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="relative mb-12 last:mb-0"
              data-testid={`timeline-item-${job.id}`}
            >
              <div
                className={`absolute -left-[38px] md:-left-[54px] top-1.5 h-4 w-4 rounded-full border-2 ${
                  job.current
                    ? "bg-primary border-primary shadow-[0_0_16px_hsl(var(--primary))] animate-glow"
                    : "bg-background border-border"
                }`}
              />

              <Card
                className={`p-6 md:p-8 border-border relative overflow-hidden transition-transform duration-300 hover:-translate-y-1 ${
                  job.current ? "border-primary/40 shadow-[0_0_40px_hsl(var(--primary)/0.15)]" : ""
                }`}
              >
                {job.current && (
                  <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
                )}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-heading text-xl md:text-2xl font-bold">{job.role}</h3>
                      {job.current && (
                        <Badge className="bg-primary text-primary-foreground" data-testid={`current-role-badge-${job.id}`}>
                          <Sparkles className="h-3 w-3 mr-1" /> Current
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm md:text-base text-muted-foreground flex items-center gap-2 flex-wrap">
                      {job.company && (
                        <span className="flex items-center gap-1.5 text-primary font-medium">
                          <Briefcase className="h-3.5 w-3.5" /> {job.company}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" /> {job.location}
                      </span>
                    </p>
                  </div>
                  <Badge variant="outline" className="whitespace-nowrap">
                    {job.duration}
                  </Badge>
                </div>

                {job.responsibilities.length > 0 && (
                  <ul className="space-y-2 mb-4">
                    {job.responsibilities.map((r, idx) => (
                      <li key={idx} className="text-sm text-foreground/80 flex gap-2 leading-relaxed">
                        <span className="text-primary mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                )}

                {job.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {job.technologies.map((t) => (
                      <Badge key={t} variant="outline" className="text-xs">
                        {t}
                      </Badge>
                    ))}
                  </div>
                )}

                {job.impact && (
                  <p className="text-sm font-medium text-emerald mt-3 pt-3 border-t border-border">
                    ▲ Impact: {job.impact}
                  </p>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
