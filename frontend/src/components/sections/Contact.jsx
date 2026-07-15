import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Download, Send, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import MagneticButton from "@/components/MagneticButton";
import { useToast } from "@/hooks/use-toast";
import { api, formatApiErrorDetail } from "@/lib/api";
import { useContent } from "@/hooks/use-content";

export default function Contact() {
  const { content } = useContent();
  const personal = content.personal;
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const contactLinks = [
    { icon: Mail, label: "Email", value: personal.email, href: `mailto:${personal.email}`, testid: "contact-email" },
    { icon: Phone, label: "Phone", value: personal.phone, href: `tel:${personal.phone}`, testid: "contact-phone" },
    { icon: MapPin, label: "Location", value: personal.location, href: null, testid: "contact-location" },
    { icon: Linkedin, label: "LinkedIn", value: "vedantmehta5", href: personal.linkedin, testid: "contact-linkedin" },
  ];

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/contact", form);
      toast({ title: "Message sent!", description: "Thanks for reaching out — I'll get back to you soon." });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      const isRateLimited = err.response?.status === 429;
      toast({
        title: isRateLimited ? "Too many messages" : "Something went wrong",
        description: isRateLimited
          ? "Please wait a while before sending another message."
          : formatApiErrorDetail(err.response?.data?.detail) || "Please try again or email me directly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32" data-testid="contact-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-3">Contact</p>
          <h2 className="text-4xl sm:text-5xl font-heading font-extrabold tracking-tight mb-4">Let's build something</h2>
          <p className="text-base text-muted-foreground">
            Working on innovative backend, cloud, AI or blockchain systems? I'm always open to knowledge-sharing, mentoring, and exciting tech conversations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-4"
          >
            {contactLinks.map((c) => (
              <Card key={c.label} className="p-5 border-border flex items-center gap-4 transition-transform duration-300 hover:-translate-y-1 hover:border-primary/40" data-testid={`${c.testid}-card`}>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <c.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">{c.label}</p>
                  {c.href ? (
                    <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="text-sm font-medium hover:text-primary truncate block">
                      {c.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium truncate">{c.value}</p>
                  )}
                </div>
              </Card>
            ))}

            <MagneticButton className="w-full">
              <a href={personal.resumeUrl} download data-testid="contact-resume-download-button" className="block">
                <Button size="lg" variant="outline" className="w-full">
                  <Download className="h-4 w-4" /> Download Full Resume
                </Button>
              </a>
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <Card className="p-7 md:p-8 border-border">
              <form onSubmit={handleSubmit} className="space-y-5" data-testid="contact-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" required value={form.name} onChange={handleChange} placeholder="Your name" data-testid="contact-form-name-input" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="you@example.com" data-testid="contact-form-email-input" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" name="subject" required value={form.subject} onChange={handleChange} placeholder="What's this about?" data-testid="contact-form-subject-input" />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" required value={form.message} onChange={handleChange} placeholder="Tell me about your project or opportunity..." data-testid="contact-form-message-input" />
                </div>
                <MagneticButton className="w-full">
                  <Button type="submit" size="lg" className="w-full" disabled={loading} data-testid="contact-form-submit-button">
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </MagneticButton>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
