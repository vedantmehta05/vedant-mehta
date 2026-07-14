import React from "react";
import { motion } from "framer-motion";
import { Compass, Lightbulb, Target, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { about } from "@/data/resumeData";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" } }),
};

const cards = [
  { icon: Lightbulb, title: "Philosophy", text: about.philosophy, color: "text-primary" },
  { icon: Compass, title: "Engineering Mindset", text: about.mindset, color: "text-purple" },
  { icon: Target, title: "Goals & Direction", text: about.goals, color: "text-cyan" },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32" data-testid="about-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-3">About Me</p>
          <h2 className="text-4xl sm:text-5xl font-heading font-extrabold tracking-tight mb-5">The complete story</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0}
            className="md:col-span-8"
          >
            <Card className="h-full p-8 bg-gradient-to-br from-card to-card border-border relative overflow-hidden" data-testid="about-summary-card">
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Professional Summary</p>
              <div className="space-y-4">
                {about.summary.map((p, i) => (
                  <p key={i} className="text-sm md:text-base leading-relaxed text-foreground/85">
                    {p}
                  </p>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={1}
            className="md:col-span-4"
          >
            <Card className="h-full p-8 border-border bg-gradient-to-br from-primary/10 via-purple/5 to-transparent" data-testid="about-interests-card">
              <Sparkles className="h-6 w-6 text-primary mb-4" />
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Beyond Code</p>
              <ul className="space-y-3">
                {about.interests.map((item, i) => (
                  <li key={i} className="text-sm text-foreground/85 flex gap-2">
                    <span className="text-primary mt-1">◆</span> {item}
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {cards.map((c, i) => (
            <motion.div key={c.title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}>
              <Card
                className="h-full p-7 border-border transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-xl group"
                data-testid={`about-card-${c.title.toLowerCase().replace(/\s/g, "-")}`}
              >
                <c.icon className={`h-7 w-7 mb-4 ${c.color} transition-transform duration-300 group-hover:scale-110`} />
                <h3 className="font-heading font-bold text-lg mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.text}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-8 border-border" data-testid="about-expertise-card">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Areas of Expertise</p>
            <div className="flex flex-wrap gap-2.5">
              {about.expertiseAreas.map((area) => (
                <Badge key={area} variant="outline" className="text-sm py-1.5 px-4">
                  {area}
                </Badge>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
