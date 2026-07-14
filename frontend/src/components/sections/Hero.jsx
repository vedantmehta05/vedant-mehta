import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Globe, Mail, Camera, MapPin, Sparkles } from "lucide-react";
import ParticleField from "@/components/ParticleField";
import MagneticButton from "@/components/MagneticButton";
import { Button } from "@/components/ui/button";
import { useTypewriter } from "@/hooks/use-typewriter";
import { scrollToSection } from "@/lib/lenis";
import { api, assetUrl } from "@/lib/api";
import { personal } from "@/data/resumeData";
import { useToast } from "@/hooks/use-toast";

const ROLES = [
  "Senior Software Engineer",
  "AI-Powered Backend Architect",
  "Cloud & Blockchain Engineer",
];

export default function Hero() {
  const typed = useTypewriter(ROLES);
  const [photoUrl, setPhotoUrl] = useState("");
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  useEffect(() => {
    api
      .get("/profile/photo")
      .then((res) => setPhotoUrl(assetUrl(res.data.photo_url)))
      .catch(() => {});
  }, []);

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await api.post("/profile/photo", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPhotoUrl(assetUrl(res.data.photo_url));
      toast({ title: "Photo updated", description: "Your profile photo has been changed." });
    } catch {
      toast({ title: "Upload failed", description: "Please try a JPEG, PNG or WEBP image.", variant: "destructive" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden flex items-center pt-32 pb-20"
      data-testid="hero-section"
    >
      {/* Background layers */}
      <div className="absolute inset-0 -z-10 bg-background">
        <div className="absolute top-[-10%] left-[-10%] h-[45vw] w-[45vw] rounded-full bg-primary/25 blur-[100px] animate-glow" />
        <div className="absolute bottom-[-15%] right-[-10%] h-[40vw] w-[40vw] rounded-full bg-purple/20 blur-[110px] animate-glow" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-[30%] right-[15%] h-[22vw] w-[22vw] rounded-full bg-cyan/15 blur-[90px] animate-glow" style={{ animationDelay: "3s" }} />
        <ParticleField density={55} />
      </div>

      {/* Floating geometric shapes */}
      <motion.div
        aria-hidden="true"
        className="absolute top-28 right-[8%] h-16 w-16 rounded-2xl border border-primary/30 hidden md:block"
        animate={{ y: [0, -20, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute bottom-40 left-[6%] h-10 w-10 rounded-full border border-cyan/40 hidden md:block"
        animate={{ y: [0, 24, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute top-[45%] left-[12%] h-6 w-6 rotate-45 border border-purple/40 hidden md:block"
        animate={{ rotate: [45, 90, 45], y: [0, -16, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:col-span-7 order-2 lg:order-1"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald/30 bg-emerald/10 px-4 py-1.5 mb-6" data-testid="availability-badge">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
            </span>
            <span className="text-xs font-mono uppercase tracking-[0.15em] text-emerald">{personal.availability}</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-[1.05] mb-5">
            Hi, I'm <span className="text-gradient">{personal.name}</span>
          </h1>

          <div className="h-10 sm:h-12 mb-6">
            <p className="text-xl sm:text-2xl font-heading font-semibold text-foreground/90">
              {typed}
              <span className="inline-block w-[2px] h-6 sm:h-7 bg-primary ml-1 align-middle animate-pulse" />
            </p>
          </div>

          <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed mb-6">{personal.tagline}</p>
          <p className="text-sm md:text-base text-muted-foreground/80 max-w-xl leading-relaxed mb-8">{personal.intro}</p>

          <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5" data-testid="hero-current-company">
              <Sparkles className="h-4 w-4 text-primary" /> {personal.company}
            </span>
            <span className="flex items-center gap-1.5" data-testid="hero-years-experience">
              {personal.yearsExperience} Years Experience
            </span>
            <span className="flex items-center gap-1.5" data-testid="hero-location">
              <MapPin className="h-4 w-4" /> {personal.location}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <MagneticButton>
              <Button
                size="lg"
                data-testid="hero-contact-button"
                onClick={() => scrollToSection("contact")}
                className="group"
              >
                Contact Me <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </MagneticButton>
            <MagneticButton>
              <a href={personal.resumeUrl} download data-testid="hero-resume-download-button">
                <Button size="lg" variant="outline">
                  <Download className="h-4 w-4" /> Download Resume
                </Button>
              </a>
            </MagneticButton>
          </div>

          <div className="flex items-center gap-3">
            {personal.linkedin && (
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noreferrer"
                data-testid="hero-social-linkedin"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary hover:bg-primary/10"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4.5 w-4.5" />
              </a>
            )}
            {personal.github && (
              <a href={personal.github} target="_blank" rel="noreferrer" data-testid="hero-social-github" className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary hover:bg-primary/10" aria-label="GitHub">
                <Github className="h-4.5 w-4.5" />
              </a>
            )}
            {personal.portfolio && (
              <a
                href={personal.portfolio}
                target="_blank"
                rel="noreferrer"
                data-testid="hero-social-portfolio"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary hover:bg-primary/10"
                aria-label="Portfolio"
              >
                <Globe className="h-4.5 w-4.5" />
              </a>
            )}
            <a
              href={`mailto:${personal.email}`}
              data-testid="hero-social-email"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary hover:bg-primary/10"
              aria-label="Email"
            >
              <Mail className="h-4.5 w-4.5" />
            </a>
          </div>
        </motion.div>

        {/* Right - avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="lg:col-span-5 order-1 lg:order-2 flex justify-center"
        >
          <div className="relative" data-testid="hero-avatar-wrapper">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-primary via-purple to-cyan opacity-30 blur-2xl animate-glow" />
            <div className="relative h-64 w-64 sm:h-80 sm:w-80 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
              {photoUrl && (
                <img
                  src={photoUrl}
                  alt={personal.name}
                  data-testid="hero-profile-photo"
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              data-testid="hero-change-photo-button"
              aria-label="Change profile photo"
              className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110"
            >
              <Camera className="h-4.5 w-4.5" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              data-testid="hero-photo-file-input"
              onChange={handlePhotoChange}
            />

            <motion.div
              className="absolute -top-6 -left-6 rounded-xl border border-border bg-card/90 backdrop-blur-xl px-4 py-2.5 shadow-xl hidden sm:block"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="text-xs font-mono text-muted-foreground">CURRENT ROLE</p>
              <p className="text-sm font-semibold">{personal.role}</p>
            </motion.div>

            <motion.div
              className="absolute -bottom-6 -left-10 rounded-xl border border-border bg-card/90 backdrop-blur-xl px-4 py-2.5 shadow-xl hidden sm:block"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <p className="text-xs font-mono text-emerald">● Actively Building</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollToSection("about")}
        data-testid="hero-scroll-indicator"
        aria-label="Scroll to About section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
        <div className="h-8 w-5 rounded-full border border-border flex justify-center pt-1.5">
          <div className="h-1.5 w-1 rounded-full bg-primary" />
        </div>
      </motion.button>
    </section>
  );
}
