import React from "react";
import { motion } from "framer-motion";
import { Trophy, Star, Medal } from "lucide-react";
import { Card } from "@/components/ui/card";
import SectionEditButton from "@/components/SectionEditButton";
import { useContent } from "@/hooks/use-content";
import { useAuth } from "@/hooks/use-auth";

const icons = { Competition: Trophy, "Academic Award": Medal, Award: Star, Recognition: Star };

export default function Achievements() {
  const { content } = useContent();
  const { isAdmin } = useAuth();
  const achievements = content.achievements;

  return (
    <section id="achievements" className="relative py-24 md:py-32" data-testid="achievements-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl flex items-start justify-between gap-4"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-3">Achievements</p>
            <h2 className="text-4xl sm:text-5xl font-heading font-extrabold tracking-tight">Recognition & milestones</h2>
          </div>
          {isAdmin && <SectionEditButton section="achievements" label="Achievements" />}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((a, i) => {
            const Icon = icons[a.type] || Star;
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <Card
                  className="h-full p-6 border-border relative overflow-hidden transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                  data-testid={`achievement-card-${a.id}`}
                >
                  <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-orange/10 blur-3xl" />
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange/10 text-orange mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading font-bold text-base mb-1.5 leading-snug">{a.title}</h3>
                  {a.issuer && <p className="text-xs text-muted-foreground mb-2">{a.issuer}</p>}
                  <span className="text-xs font-mono uppercase tracking-wider text-primary">{a.type}</span>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
