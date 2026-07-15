import React from "react";
import { motion } from "framer-motion";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";
import SectionEditButton from "@/components/SectionEditButton";
import { useContent } from "@/hooks/use-content";
import { useAuth } from "@/hooks/use-auth";

function CustomTick({ payload, x, y, textAnchor, cx, cy, ...rest }) {
  return (
    <text x={x} y={y} textAnchor={textAnchor} fill="hsl(var(--muted-foreground))" fontSize={11} fontWeight={500} {...rest}>
      {payload.value}
    </text>
  );
}

export default function Expertise() {
  const { content } = useContent();
  const { isAdmin } = useAuth();
  const expertiseRadar = content.expertiseRadar;

  return (
    <section id="expertise" className="relative py-24 md:py-32" data-testid="expertise-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl flex items-start justify-between gap-4"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-3">Technical Expertise</p>
            <h2 className="text-4xl sm:text-5xl font-heading font-extrabold tracking-tight">Depth across the stack</h2>
          </div>
          {isAdmin && <SectionEditButton section="expertiseRadar" label="Technical Expertise" />}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Card className="p-4 md:p-8 border-border" data-testid="expertise-radar-chart">
              <div className="h-[340px] md:h-[420px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={expertiseRadar}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="subject" tick={<CustomTick />} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                      name="Proficiency"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.35}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {expertiseRadar.map((item, i) => (
              <motion.div
                key={item.subject}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <Card className="p-5 border-border relative overflow-hidden" data-testid={`expertise-item-${item.subject.toLowerCase().replace(/[\s()/]+/g, "-")}`}>
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"
                    style={{ width: `${item.value}%` }}
                  />
                  <p className="relative text-sm font-medium mb-1">{item.subject}</p>
                  <p className="relative text-2xl font-heading font-bold text-gradient">{item.value}%</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
