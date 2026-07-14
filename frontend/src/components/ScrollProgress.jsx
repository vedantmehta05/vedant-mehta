import React from "react";
import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      data-testid="scroll-progress-bar"
      className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-primary via-purple to-cyan"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
