import React from "react";
import { motion } from "framer-motion";
import { BadgeCheck, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SectionEditButton from "@/components/SectionEditButton";
import { useContent } from "@/hooks/use-content";
import { useAuth } from "@/hooks/use-auth";

export default function Certifications() {
  const { content } = useContent();
  const { isAdmin } = useAuth();
  const certifications = content.certifications;

  return (
    <section id="certifications" className="relative py-24 md:py-32" data-testid="certifications-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl flex items-start justify-between gap-4"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-3">Certifications</p>
            <h2 className="text-4xl sm:text-5xl font-heading font-extrabold tracking-tight">Verified knowledge</h2>
          </div>
          {isAdmin && <SectionEditButton section="certifications" label="Certifications" />}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <Card
                className="h-full p-6 border-border transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-primary/40"
                data-testid={`certification-card-${cert.id}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald/10 text-emerald">
                    <BadgeCheck className="h-5 w-5" />
                  </div>
                  {cert.link && (
                    <a href={cert.link} target="_blank" rel="noreferrer" data-testid={`certification-verify-link-${cert.id}`}>
                      <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-primary" />
                    </a>
                  )}
                </div>
                <h3 className="font-heading font-bold text-base mb-1.5 leading-snug">{cert.name}</h3>
                {cert.provider && <p className="text-xs text-muted-foreground mb-3">{cert.provider}</p>}
                {cert.skills?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {cert.skills.map((s) => (
                      <Badge key={s} variant="outline" className="text-xs">
                        {s}
                      </Badge>
                    ))}
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
