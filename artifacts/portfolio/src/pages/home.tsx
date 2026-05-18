import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Sun,
  Moon,
  Menu,
  X,
  TrendingUp,
  FolderOpen,
  Clock,
  Award,
  Monitor,
  Database,
  BarChart2,
  Palette,
  Code2,
  ChevronLeft,
  ChevronRight,
  Zap,
  Globe,
  Star,
  MessageSquare,
} from "lucide-react";
import { FaGithub, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { useTheme } from "@/hooks/use-theme";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Resources", href: "#testimonials" },
  { label: "Blog", href: "#" },
];

const STATS = [
  { icon: TrendingUp, label: "Success rate", value: "95%", highlight: false },
  { icon: FolderOpen, label: "Total Projects", value: "10+", highlight: false },
  { icon: Clock, label: "Avg. Delivery Time", value: "4 weeks", highlight: false },
  { icon: Award, label: "Experience", value: "2 yrs", highlight: true },
];

const PROOF_STATS = [
  { value: "2+", label: "Years of Experience" },
  { value: "10+", label: "Projects Completed" },
  { value: "4.8", label: "Star Ratings" },
  { value: "8+", label: "Clients Served" },
];

const PROJECTS = [
  {
    title: "FinTech Landing Page",
    description:
      "A high-converting landing page for a financial technology startup. Designed for speed, clarity, and trust — resulting in a 40% increase in sign-up conversions.",
    image: "/images/project-1.png",
    tag: "Web Development",
  },
  {
    title: "Inventory ERP System",
    description:
      "A full-stack inventory management and ERP web application built for a small-scale trading business. Tracks stock, orders, and reports in real-time.",
    image: "/images/project-2.png",
    tag: "Full-Stack App",
  },
  {
    title: "Sales Analytics Dashboard",
    description:
      "An interactive data science dashboard visualizing sales KPIs, trends, and forecasts — built with Python, Pandas, and a React frontend.",
    image: "/images/project-3.png",
    tag: "Data Science",
  },
  {
    title: "Event Exhibition Campaign",
    description:
      "Complete graphic design package for a university exhibition: posters, flyers, social media banners, and branded materials delivered in 48 hours.",
    image: "/images/project-4.png",
    tag: "Graphic Design",
  },
];

const SERVICES = [
  {
    icon: Monitor,
    tag: "Web Development",
    title: "Landing Page Development",
    description:
      "Clean, fast, and conversion-focused landing pages built with modern frameworks. From design to deployment in days.",
    fullWidth: true,
    learnMore: true,
  },
  {
    icon: Code2,
    tag: "Business",
    title: "ERP Web Applications",
    description:
      "Small-scale enterprise resource planning web apps that streamline operations — inventory, HR, billing, and reporting all in one place.",
    fullWidth: false,
    learnMore: true,
  },
  {
    icon: Zap,
    tag: "Automation",
    title: "Data Automation Pipelines",
    description:
      "Custom scripts and ETL pipelines that extract, clean, and route data automatically — saving hours of manual work every week.",
    fullWidth: false,
    learnMore: true,
  },
  {
    icon: Globe,
    tag: "Design & Development",
    title: "Website Design & Development",
    description:
      "Modern, responsive websites that convert visitors into customers.",
    fullWidth: true,
    learnMore: false,
  },
  {
    icon: BarChart2,
    tag: "AI & Data",
    title: "Data Science & AI/ML",
    description:
      "Turn raw data into insight. Statistical analysis, visualizations, predictive models, and AI integrations tailored to your use case.",
    fullWidth: false,
    learnMore: true,
  },
  {
    icon: Palette,
    tag: "Design",
    title: "Graphic Design",
    description:
      "UI/UX design, posters, flyers, and social media graphics. Design that looks great and communicates clearly.",
    fullWidth: false,
    learnMore: false,
  },
];

const TESTIMONIALS = [
  {
    name: "Chukwuemeka Obi",
    role: "Founder at TradePilot",
    quote:
      "Peter delivered our inventory system ahead of schedule and it worked perfectly from day one. The UI is clean, the backend is solid. We've been running it for 3 months without a single issue. Genuinely impressed.",
    image: null,
  },
  {
    name: "Adaeze Nwosu",
    role: "Marketing Lead at BrandPulse",
    quote:
      "We needed graphics for a major campus event — posters, flyers, social posts — in under 48 hours. Peter came through with work that looked like it came from a proper design agency. Everyone kept asking who designed it.",
    image: null,
  },
];

function Avatar({ size = 48, className = "" }: { size?: number; className?: string }) {
  return (
    <div
      className={`rounded-full bg-primary flex items-center justify-center font-bold text-primary-foreground ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.35 }}
      data-testid="avatar-initials"
    >
      PO
    </div>
  );
}

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur border-b border-border shadow-sm"
          : "bg-background/80 backdrop-blur"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-bold text-lg" data-testid="nav-logo">
          <span className="text-primary">Peter</span>
          <span className="text-foreground">.ng</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              data-testid={`nav-link-${link.label.toLowerCase()}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="h-9 w-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Toggle theme"
            data-testid="btn-theme-toggle"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <a
            href="#contact"
            className="hidden md:flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
            data-testid="nav-contact-btn"
          >
            <MessageSquare size={14} />
            Contact
          </a>

          <button
            className="md:hidden h-9 w-9 flex items-center justify-center text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            data-testid="btn-menu-toggle"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border px-4 pb-4"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block py-3 text-sm font-medium text-muted-foreground hover:text-foreground border-b border-border/50 last:border-0"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-4 flex items-center justify-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-full"
              onClick={() => setMenuOpen(false)}
            >
              <MessageSquare size={14} />
              Contact
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default function Home() {
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const prevTestimonial = () =>
    setTestimonialIdx((i) => (i === 0 ? TESTIMONIALS.length - 1 : i - 1));
  const nextTestimonial = () =>
    setTestimonialIdx((i) => (i === TESTIMONIALS.length - 1 ? 0 : i + 1));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ─── HERO ──────────────────────────────────────────── */}
      <section className="pt-28 pb-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp}>
            <Avatar size={64} className="mb-5" />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-2"
            data-testid="hero-title"
          >
            Hi, I'm Peter Obiegba.
          </motion.h1>
          <motion.h2
            variants={fadeUp}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-muted-foreground mb-5"
          >
            Information Systems Student
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg text-muted-foreground max-w-xl mb-6 leading-relaxed"
          >
            I help clients launch web apps, automate data pipelines, and design
            high-quality graphics — from idea to deployment, fast and right.
          </motion.p>

          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
            <span className="text-2xl" role="img" aria-label="Nigeria flag">
              🇳🇬
            </span>
            <span className="text-sm text-muted-foreground font-medium">
              Trusted by clients worldwide
            </span>
            <div className="flex text-yellow-400 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity text-sm sm:text-base"
              data-testid="hero-cta"
            >
              Let's talk now
              <ArrowRight size={16} />
            </a>
          </motion.div>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mt-12 border border-border rounded-2xl p-2 grid grid-cols-2 gap-2"
          data-testid="stats-grid"
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className={`rounded-xl p-5 ${
                stat.highlight
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/50"
              }`}
              data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <stat.icon
                size={20}
                className={`mb-3 ${stat.highlight ? "text-primary-foreground" : "text-primary"}`}
              />
              <p
                className={`text-xs mb-1 ${
                  stat.highlight ? "text-primary-foreground/80" : "text-muted-foreground"
                }`}
              >
                {stat.label}
              </p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─── SOCIAL PROOF ──────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-primary/5 dark:bg-primary/10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-10 leading-tight"
          >
            Delivering quality results for clients across the globe.
          </motion.h2>

          <motion.div
            variants={stagger}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10"
          >
            {PROOF_STATS.map((s) => (
              <motion.div key={s.label} variants={fadeUp} className="text-center">
                <p className="text-4xl font-extrabold text-foreground">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp}>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              Let's talk now
              <ArrowRight size={16} />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── PROJECTS ──────────────────────────────────────── */}
      <section id="projects" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="text-center mb-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold">
              Some projects I've worked on
            </h2>
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="text-center text-muted-foreground mb-12 max-w-lg mx-auto"
          >
            Not to brag, but here are a few things I've shipped that I'm proud of.
          </motion.p>

          <div className="space-y-16">
            {PROJECTS.map((project) => (
              <motion.div
                key={project.title}
                variants={fadeUp}
                className="border border-border rounded-2xl overflow-hidden"
                data-testid={`project-card-${project.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="bg-muted/30 overflow-hidden aspect-video w-full">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                    {project.description}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
                    data-testid={`btn-view-project-${project.title.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    View project: {project.title}
                    <ArrowRight size={14} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="text-center mt-12">
            <a
              href="#"
              className="inline-flex items-center gap-2 border border-primary text-primary font-semibold px-6 py-3 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              View All Projects
              <ArrowRight size={16} />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── SERVICES ──────────────────────────────────────── */}
      <section id="services" className="py-20 px-4 sm:px-6 bg-slate-900">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center mb-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Services I Offer
            </h2>
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="text-center text-slate-400 mb-14 max-w-lg mx-auto"
          >
            While I offer a wide range of services, here are the top ones to keep
            things concise and impactful.
          </motion.p>

          <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SERVICES.map((service) => (
              <motion.div
                key={service.title}
                variants={fadeUp}
                className={`border border-slate-700 rounded-2xl p-6 hover:border-primary/50 transition-colors ${
                  service.fullWidth ? "md:col-span-2" : ""
                }`}
                data-testid={`service-card-${service.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <service.icon size={24} className="text-white" />
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                    {service.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                {service.learnMore && (
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1 text-primary text-sm font-semibold hover:gap-2 transition-all"
                  >
                    Learn more
                    <ArrowRight size={14} />
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="text-center mt-14">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              Let's talk now
              <ArrowRight size={16} />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── TESTIMONIALS ──────────────────────────────────── */}
      <section
        id="testimonials"
        className="py-20 px-4 sm:px-6 max-w-5xl mx-auto"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl font-extrabold text-center mb-12"
          >
            Amazing Testimonials
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          >
            {/* Photo side */}
            <div className="flex justify-center">
              <div className="w-64 h-72 sm:w-72 sm:h-80 rounded-2xl bg-muted overflow-hidden flex items-center justify-center">
                <Avatar size={100} />
              </div>
            </div>

            {/* Quote side */}
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonialIdx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-bold mb-1">
                    {TESTIMONIALS[testimonialIdx].name}
                  </h3>
                  <p className="text-primary font-medium text-sm mb-6">
                    {TESTIMONIALS[testimonialIdx].role}
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {TESTIMONIALS[testimonialIdx].quote}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={prevTestimonial}
                  className="h-10 w-10 rounded-full border border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="Previous testimonial"
                  data-testid="btn-prev-testimonial"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity"
                  aria-label="Next testimonial"
                  data-testid="btn-next-testimonial"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── CTA ───────────────────────────────────────────── */}
      <section
        id="contact"
        className="py-24 px-4 sm:px-6 max-w-3xl mx-auto text-center"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl font-extrabold mb-4"
          >
            Ready to start your project?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-muted-foreground mb-8 max-w-md mx-auto"
          >
            Let's work together to bring your ideas to life. Get in touch today
            and let's discuss how I can help you achieve your goals.
          </motion.p>
          <motion.div variants={fadeUp}>
            <a
              href="https://wa.me/2347055876701"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity"
              data-testid="btn-get-started"
            >
              Get Started
              <ArrowRight size={16} />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── FOOTER ────────────────────────────────────────── */}
      <footer className="border-t border-border bg-muted/30 py-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-8">
            <div className="flex items-center gap-3">
              <Avatar size={40} />
              <div>
                <p className="font-bold text-sm">Peter Obiegba</p>
                <p className="text-xs text-muted-foreground max-w-xs leading-snug">
                  Building sharp web apps, data tools, and design systems.
                  Based in Nigeria, working worldwide.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6 text-sm text-muted-foreground">
            {["Home", "Projects", "Services", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="hover:text-foreground transition-colors"
                data-testid={`footer-link-${link.toLowerCase()}`}
              >
                {link}
              </a>
            ))}
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex gap-4">
              <a
                href="https://github.com/ONOSPETER"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="footer-social-github"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://x.com/lexlex99722746"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter / X"
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="footer-social-twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://wa.me/2347055876701"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="footer-social-whatsapp"
              >
                <FaWhatsapp size={20} />
              </a>
            </div>

            <p className="text-xs text-muted-foreground">
              © Peter Obiegba. All rights reserved. 2025–{new Date().getFullYear()}.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
