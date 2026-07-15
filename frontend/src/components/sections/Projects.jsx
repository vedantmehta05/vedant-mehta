import React, { useState } from "react";
import { motion } from "framer-motion";
import { Layers, ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import SectionEditButton from "@/components/SectionEditButton";
import { useContent } from "@/hooks/use-content";
import { useAuth } from "@/hooks/use-auth";

export default function Projects() {
  const { content } = useContent();
  const { isAdmin } = useAuth();
  const projects = content.projects;
  const [selected, setSelected] = useState(null);

  return (
    <section id="projects" className="relative py-24 md:py-32" data-testid="projects-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl flex items-start justify-between gap-4"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-3">Featured Projects</p>
            <h2 className="text-4xl sm:text-5xl font-heading font-extrabold tracking-tight">Things I've built</h2>
          </div>
          {isAdmin && <SectionEditButton section="projects" label="Featured Projects" />}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <Card
                onClick={() => setSelected(p)}
                data-testid={`project-card-${p.id}`}
                className="group h-full cursor-pointer border-border p-7 relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-primary/40"
              >
                <div className="absolute -top-14 -right-14 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition-opacity opacity-0 group-hover:opacity-100" />
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Layers className="h-5 w-5" />
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" />
                </div>
                <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">{p.company}</p>
                <h3 className="font-heading text-xl font-bold mb-3">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">{p.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.technologies.slice(0, 4).map((t) => (
                    <Badge key={t} variant="outline" className="text-xs">
                      {t}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent data-testid="project-detail-dialog">
          {selected && (
            <>
              <DialogHeader>
                <p className="text-xs font-mono uppercase tracking-widest text-primary">{selected.company}</p>
                <DialogTitle data-testid="project-detail-title">{selected.title}</DialogTitle>
                <DialogDescription>{selected.description}</DialogDescription>
              </DialogHeader>

              <div className="space-y-5">
                <div>
                  <p className="text-sm font-semibold mb-1.5">Challenge</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selected.challenge}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1.5">Solution</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selected.solution}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-2">Key Achievements</p>
                  <ul className="space-y-1.5">
                    {selected.achievements.map((a, i) => (
                      <li key={i} className="text-sm text-foreground/80 flex gap-2">
                        <span className="text-emerald mt-1">✓</span> {a}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1.5">Architecture Overview</p>
                  <p className="text-sm font-mono text-muted-foreground bg-muted rounded-lg p-3 leading-relaxed">{selected.architecture}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selected.technologies.map((t) => (
                    <Badge key={t} variant="outline">
                      {t}
                    </Badge>
                  ))}
                </div>
                {(selected.github || selected.demo) && (
                  <div className="flex gap-3 pt-2">
                    {selected.github && (
                      <a href={selected.github} target="_blank" rel="noreferrer" data-testid="project-github-link" className="flex items-center gap-1.5 text-sm text-primary">
                        <Github className="h-4 w-4" /> Code
                      </a>
                    )}
                    {selected.demo && (
                      <a href={selected.demo} target="_blank" rel="noreferrer" data-testid="project-demo-link" className="flex items-center gap-1.5 text-sm text-primary">
                        <ExternalLink className="h-4 w-4" /> Live Demo
                      </a>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
