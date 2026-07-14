import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { skillCategories } from "@/data/resumeData";

function SkillBar({ skill, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group"
      data-testid={`skill-bar-${skill.name.toLowerCase().replace(/[\s/]+/g, "-")}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium transition-colors group-hover:text-primary">{skill.name}</span>
        <span className="text-xs font-mono text-muted-foreground">{skill.years} yrs · {skill.level}%</span>
      </div>
      <Progress value={skill.level} className="h-2" />
    </motion.div>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState(skillCategories[0].category);

  return (
    <section id="skills" className="relative py-24 md:py-32" data-testid="skills-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-3">Skills</p>
          <h2 className="text-4xl sm:text-5xl font-heading font-extrabold tracking-tight">Technical arsenal</h2>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} data-testid="skills-tabs">
          <TabsList className="mb-2">
            {skillCategories.map((cat) => (
              <TabsTrigger key={cat.category} value={cat.category} data-testid={`skills-tab-${cat.category.toLowerCase().replace(/[\s&/]+/g, "-")}`}>
                {cat.category}
              </TabsTrigger>
            ))}
          </TabsList>

          {skillCategories.map((cat) => (
            <TabsContent key={cat.category} value={cat.category}>
              <Card className="p-7 md:p-10 border-border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                  {cat.skills.map((skill, i) => (
                    <SkillBar key={skill.name} skill={skill} index={i} />
                  ))}
                </div>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
