import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SectionEditButton from "@/components/SectionEditButton";
import { useContent } from "@/hooks/use-content";
import { useAuth } from "@/hooks/use-auth";

export default function Education() {
  const { content } = useContent();
  const { isAdmin } = useAuth();
  const education = content.education;

  return (
    <section id="education" className="relative py-24 md:py-32" data-testid="education-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl flex items-start justify-between gap-4"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-3">Education</p>
            <h2 className="text-4xl sm:text-5xl font-heading font-extrabold tracking-tight">Academic foundation</h2>
          </div>
          {isAdmin && <SectionEditButton section="education" label="Education" />}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((ed, i) => (
            <motion.div
              key={ed.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <Card className="h-full p-7 border-border transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-xl" data-testid={`education-card-${ed.id}`}>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-lg leading-snug mb-1">{ed.degree}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{ed.school}</p>
                    <Badge variant="outline" className="text-xs mb-3">{ed.duration}</Badge>
                    {ed.gpa && <p className="text-sm mb-2">GPA: {ed.gpa}</p>}
                    {ed.coursework?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {ed.coursework.map((c) => (
                          <span key={c} className="text-xs rounded-full bg-muted px-2.5 py-1 text-muted-foreground">
                            {c}
                          </span>
                        ))}
                      </div>
                    )}
                    {ed.achievement && (
                      <p className="text-xs text-emerald flex items-center gap-1.5 mt-3">
                        <Award className="h-3.5 w-3.5" /> {ed.achievement}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
