import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useCountUp } from "@/hooks/use-count-up";
import { stats } from "@/data/resumeData";

function StatCard({ stat, index }) {
  const { ref, value } = useCountUp(stat.value, 1600);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
    >
      <Card
        className="p-6 text-center border-border transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-primary/40"
        data-testid={`stat-card-${stat.label.toLowerCase().replace(/\s/g, "-")}`}
      >
        <p className="text-4xl md:text-5xl font-heading font-extrabold text-gradient mb-2">
          {value}
          {stat.suffix}
        </p>
        <p className="text-xs md:text-sm text-muted-foreground font-medium">{stat.label}</p>
      </Card>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="relative py-20 md:py-24" data-testid="stats-section">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
