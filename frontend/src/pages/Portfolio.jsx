import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminToolbar from "@/components/AdminToolbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import CareerJourney from "@/components/sections/CareerJourney";
import Education from "@/components/sections/Education";
import Skills from "@/components/sections/Skills";
import TechStack from "@/components/sections/TechStack";
import Projects from "@/components/sections/Projects";
import Stats from "@/components/sections/Stats";
import Expertise from "@/components/sections/Expertise";
import Certifications from "@/components/sections/Certifications";
import Achievements from "@/components/sections/Achievements";
import Contact from "@/components/sections/Contact";
import { useContent } from "@/hooks/use-content";

export default function Portfolio() {
  const { content, loading } = useContent();

  if (loading || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background" data-testid="portfolio-loading">
        <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <CareerJourney />
        <Education />
        <Skills />
        <TechStack />
        <Projects />
        <Stats />
        <Expertise />
        <Certifications />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <AdminToolbar />
    </>
  );
}
