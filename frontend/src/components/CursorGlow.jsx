import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 30, stiffness: 250, mass: 0.4 });
  const springY = useSpring(y, { damping: 30, stiffness: 250, mass: 0.4 });
  const isTouch = useRef(false);

  useEffect(() => {
    isTouch.current = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch.current) return;

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y, visible]);

  if (isTouch.current) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[60] h-6 w-6 rounded-full mix-blend-difference bg-white hidden md:block"
      style={{
        translateX: springX,
        translateY: springY,
        x: "-50%",
        y: "-50%",
        opacity: visible ? 1 : 0,
      }}
    />
  );
}
