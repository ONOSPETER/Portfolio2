import { useState, useEffect, useCallback } from "react";
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
  BarChart2,
  Palette,
  Code2,
  ChevronLeft,
  ChevronRight,
  Zap,
  Globe,
  Star,
  MessageSquare,
  ExternalLink,
  Bitcoin,
  Binary,
} from "lucide-react";
import { FaGithub, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { SiFiverr } from "react-icons/si";
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
  { label: "Graphics", href: "#graphics" },
  { label: "Contact", href: "#contact" },
];

const STATS = [
  { icon: TrendingUp, label: "Success rate", value: "95%", highlight: false },
  { icon: FolderOpen, label: "Total Projects", value: "3+", highlight: false },
  { icon: Clock, label: "Avg. Delivery Time", value: "2 weeks", highlight: false },
  { icon: Award, label: "Experience", value: "1.5+ yrs", highlight: true },
];

const PROOF_STATS = [
  { value: "5+", label: "Years Coding" },
  { value: "1.5+", label: "Years Experience" },
  { value: "10+", label: "Projects Built" },
  { value: "2", label: "Research Papers" },
];

type Category =
  | "All"
  | "AI & Computer Vision"
  | "Bot Automation"
  | "Crypto & FinTech"
  | "Web Applications"
  | "Privacy & Security"
  | "Learning & Practice";

interface Project {
  id: string;
  category: Category;
  gradientFrom: string;
  gradientTo: string;
  badgeClass: string;
  title: string;
  description: string;
  stack: string[];
  image: string | null;
  link: string;
}

const PROJECTS: Project[] = [
  {
    id: "iris",
    category: "AI & Computer Vision",
    gradientFrom: "#6d28d9",
    gradientTo: "#3730a3",
    badgeClass: "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300",
    title: "IRIS – Intelligent Real-time Imaging System",
    description:
      "Real-time computer vision system for target detection, tracking, behavioral analysis, and multi-camera inference.",
    stack: ["Python", "OpenCV", "AI/ML"],
    image: "/images/proj-iris-opt.jpg",
    link: "https://github.com/ONOSPETER/IRIS-Intelligent-Real-time-Imaging-System-",
  },
  {
    id: "telegram-py",
    category: "Bot Automation",
    gradientFrom: "#2563eb",
    gradientTo: "#0891b2",
    badgeClass: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
    title: "Telegram Echo Bot (Python)",
    description:
      "Telegram bot that echoes user messages for testing and automation purposes.",
    stack: ["Python", "Telegram Bot API"],
    image: null,
    link: "https://github.com/ONOSPETER/telegram-echo-bot",
  },
  {
    id: "telegram-node",
    category: "Bot Automation",
    gradientFrom: "#2563eb",
    gradientTo: "#0891b2",
    badgeClass: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
    title: "Telegram Echo Bot (Node.js)",
    description:
      "Node.js implementation of a Telegram echo bot for real-time messaging automation.",
    stack: ["Node.js", "Telegram Bot API"],
    image: null,
    link: "https://github.com/ONOSPETER/telegram-echo-bot",
  },
  {
    id: "discord",
    category: "Bot Automation",
    gradientFrom: "#2563eb",
    gradientTo: "#0891b2",
    badgeClass: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
    title: "Discord Echo Bot",
    description:
      "Discord bot that listens and echoes messages for server automation and testing.",
    stack: ["Node.js", "Discord.js"],
    image: "/images/proj-discord-opt.jpg",
    link: "https://github.com/ONOSPETER/nodejs-discord-echobot",
  },
  {
    id: "peerpump",
    category: "Crypto & FinTech",
    gradientFrom: "#d97706",
    gradientTo: "#c2410c",
    badgeClass: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
    title: "PeerPumP",
    description:
      "Decentralized crypto system focused on peer-based trading and token mechanics.",
    stack: ["Node.js", "React.js"],
    image: "/images/proj-peerpump-opt.jpg",
    link: "https://github.com/ONOSPETER/PeerPumP",
  },
  {
    id: "cat",
    category: "Crypto & FinTech",
    gradientFrom: "#d97706",
    gradientTo: "#c2410c",
    badgeClass: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
    title: "CAT – Crypto AI Tax Assistant",
    description:
      "AI-assisted tool for analyzing crypto transactions and generating detailed tax reports.",
    stack: ["Node.js", "React.js", "AI"],
    image: "/images/proj-cat-opt.jpg",
    link: "https://github.com/ONOSPETER/CAT-Crypto-AI-Tax-assistant-",
  },
  {
    id: "blackfly",
    category: "Crypto & FinTech",
    gradientFrom: "#d97706",
    gradientTo: "#c2410c",
    badgeClass: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
    title: "BlackFly",
    description:
      "Crypto automation and utility tool for trading signals and financial systems.",
    stack: ["Node.js", "React.js"],
    image: "/images/proj-blackfly-opt.jpg",
    link: "https://github.com/ONOSPETER/BlackFly",
  },
  {
    id: "portfolio",
    category: "Web Applications",
    gradientFrom: "#16a34a",
    gradientTo: "#0d9488",
    badgeClass: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
    title: "Peter Obiegba Portfolio",
    description:
      "Personal developer portfolio website showcasing projects, skills, and services.",
    stack: ["React.js", "Node.js", "TypeScript"],
    image: null,
    link: "https://github.com/ONOSPETER/Peter-Obiegba-Portfolio",
  },
  {
    id: "shadowpost",
    category: "Privacy & Security",
    gradientFrom: "#475569",
    gradientTo: "#1e293b",
    badgeClass: "bg-slate-100 text-slate-700 dark:bg-slate-700/40 dark:text-slate-300",
    title: "ShadowPost",
    description:
      "Secure anonymous posting system with encrypted, privacy-focused message handling.",
    stack: ["Node.js", "React.js"],
    image: "/images/proj-shadowpost-opt.jpg",
    link: "https://github.com/ONOSPETER/ShadowPost",
  },
  {
    id: "exercism",
    category: "Learning & Practice",
    gradientFrom: "#0d9488",
    gradientTo: "#0891b2",
    badgeClass: "bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300",
    title: "Exercism Repository",
    description:
      "Collection of coding exercises for algorithm practice and software engineering skill development.",
    stack: ["Python"],
    image: null,
    link: "https://github.com/ONOSPETER/Exercism",
  },
];

const CATEGORIES: Category[] = [
  "All",
  "AI & Computer Vision",
  "Bot Automation",
  "Crypto & FinTech",
  "Web Applications",
  "Privacy & Security",
  "Learning & Practice",
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
    icon: Bitcoin,
    tag: "Crypto & Web3",
    title: "Crypto Solutions & DeFi Systems",
    description:
      "Decentralized finance tools, crypto trading systems, AI tax assistants, and Web3 integrations built with modern blockchain-ready stacks.",
    fullWidth: false,
    learnMore: true,
  },
  {
    icon: Binary,
    tag: "Algorithms",
    title: "Algorithm Design & Problem Solving",
    description:
      "Custom algorithm development, computational problem solving, and optimization solutions for complex business and data challenges.",
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

const GRAPHICS = [
  { src: "/images/graphic-valentine-opt.jpg", label: "Valentine's Day Campaign", client: "Phonify Communications" },
  { src: "/images/graphic-xmas-opt.jpg", label: "Christmas Promo Poster", client: "Phonify Communications" },
  { src: "/images/graphic-easter-opt.jpg", label: "Easter Day Greeting", client: "Phonify Communications" },
  { src: "/images/graphic-december-opt.jpg", label: "Hello December Poster", client: "Phonify Communications" },
  { src: "/images/graphic-november-opt.jpg", label: "Hello November Flyer", client: "Phonify Communications" },
];

function Avatar({
  size = 48,
  className = "",
  priority = false,
}: {
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`rounded-full overflow-hidden border-2 border-primary/30 ${className}`}
      style={{ width: size, height: size, minWidth: size }}
      data-testid="avatar"
    >
      <img
        src="/images/peter-opt.jpg"
        alt="Peter Obiegba"
        width={size * 2}
        height={size * 2}
        className="w-full h-full object-cover object-top"
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
      />
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

        <div className="hidden md:flex items-center gap-7">
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

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="h-9 w-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Toggle theme"
            data-testid="btn-theme-toggle"
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <a
            href="https://www.fiverr.com/s/Ldr0Zxo"
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Fiverr"
            data-testid="nav-fiverr-btn"
          >
            <SiFiverr size={14} className="text-[#1dbf73]" />
            Fiverr
          </a>

          <a
            href="#contact"
            className="hidden md:flex items-center gap-1.5 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
            data-testid="nav-contact-btn"
          >
            <MessageSquare size={13} />
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
            <div className="mt-4 flex gap-3">
              <a
                href="https://www.fiverr.com/s/Ldr0Zxo"
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 border border-border text-sm font-semibold px-4 py-2.5 rounded-full"
                onClick={() => setMenuOpen(false)}
              >
                <SiFiverr size={14} className="text-[#1dbf73]" />
                Fiverr
              </a>
              <a
                href="#contact"
                className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2.5 rounded-full"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [graphicsIdx, setGraphicsIdx] = useState(0);

  const filteredProjects =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  const nextGraphic = useCallback(() => {
    setGraphicsIdx((i) => (i + 1) % GRAPHICS.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextGraphic, 3500);
    return () => clearInterval(timer);
  }, [nextGraphic]);

  const prevGraphic = () =>
    setGraphicsIdx((i) => (i === 0 ? GRAPHICS.length - 1 : i - 1));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ─── HERO ──────────────────────────────────────────── */}
      <section className="pt-28 pb-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp}>
            <Avatar size={72} className="mb-5" priority />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-2"
            data-testid="hero-title"
          >
            Hi, I'm Peter O.
          </motion.h1>
          <motion.h2
            variants={fadeUp}
            className="text-xl sm:text-2xl md:text-3xl font-bold text-muted-foreground mb-5"
          >
            Information Systems Student & Analyst
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg text-muted-foreground max-w-xl mb-6 leading-relaxed"
          >
            An information systems analyst dedicated to building efficient systems.
            I help clients launch web apps, automate data pipelines, build crypto
            solutions, and design high-quality graphics — from idea to deployment,
            fast and right.
          </motion.p>

          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
            <span className="text-2xl" role="img" aria-label="Nigeria flag">🇳🇬</span>
            <span className="text-sm text-muted-foreground font-medium">
              Trusted by clients worldwide
            </span>
            <div className="flex text-yellow-400 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} fill="currentColor" />
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity text-sm sm:text-base"
              data-testid="hero-cta"
            >
              Let's talk now
              <ArrowRight size={15} />
            </a>
            <a
              href="https://www.fiverr.com/s/Ldr0Zxo"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-border text-foreground font-semibold px-6 py-3 rounded-full hover:bg-muted transition-colors text-sm sm:text-base"
              data-testid="hero-fiverr-cta"
            >
              <SiFiverr size={15} className="text-[#1dbf73]" />
              Hire on Fiverr
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
                className={`mb-3 ${
                  stat.highlight ? "text-primary-foreground" : "text-primary"
                }`}
              />
              <p
                className={`text-xs mb-1 ${
                  stat.highlight
                    ? "text-primary-foreground/80"
                    : "text-muted-foreground"
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

          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              Let's talk now
              <ArrowRight size={15} />
            </a>
            <a
              href="https://www.fiverr.com/s/Ldr0Zxo"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-border bg-background text-foreground font-semibold px-6 py-3 rounded-full hover:bg-muted transition-colors"
            >
              <SiFiverr size={15} className="text-[#1dbf73]" />
              Hire on Fiverr
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
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl font-extrabold text-center mb-3"
          >
            Some projects I've worked on
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-center text-muted-foreground mb-8 max-w-lg mx-auto"
          >
            A collection of systems, tools, and apps built across different domains.
          </motion.p>

          {/* Category filter */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-2 justify-center mb-10"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs sm:text-sm font-medium px-4 py-2 rounded-full border transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                data-testid={`filter-${cat.toLowerCase().replace(/[\s&]/g, "-")}`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-colors group"
                  data-testid={`project-card-${project.id}`}
                >
                  {/* Preview */}
                  <div className="relative aspect-video overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})`,
                        }}
                      >
                        <span className="text-white/30 text-6xl font-black tracking-tighter select-none">
                          {project.title.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${project.badgeClass}`}>
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h3 className="font-bold text-base mb-1.5">{project.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.stack.map((t) => (
                        <span
                          key={t}
                          className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
                      data-testid={`btn-view-project-${project.id}`}
                    >
                      View on GitHub
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          <motion.div variants={fadeUp} className="text-center mt-12">
            <a
              href="https://github.com/ONOSPETER"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-primary text-primary font-semibold px-6 py-3 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <FaGithub size={16} />
              View All on GitHub
              <ArrowRight size={15} />
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
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl font-extrabold text-white text-center mb-3"
          >
            Services I Offer
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-center text-slate-400 mb-14 max-w-lg mx-auto"
          >
            A wide range of services — here are the key ones that make the most
            impact.
          </motion.p>

          <motion.div
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {SERVICES.map((service) => (
              <motion.div
                key={service.title}
                variants={fadeUp}
                className={`border border-slate-700 rounded-2xl p-6 hover:border-primary/50 transition-colors ${
                  service.fullWidth ? "md:col-span-2" : ""
                }`}
                data-testid={`service-card-${service.title
                  .toLowerCase()
                  .replace(/[\s&/]/g, "-")}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <service.icon size={22} className="text-white" />
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                    {service.tag}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">
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
                    <ArrowRight size={13} />
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
              <ArrowRight size={15} />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── GRAPHICS PORTFOLIO ────────────────────────────── */}
      <section id="graphics" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl font-extrabold text-center mb-3"
          >
            Graphics Portfolio
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-center text-muted-foreground mb-12 max-w-lg mx-auto"
          >
            A showcase of UI/UX work, poster designs, flyers, and social media
            graphics.
          </motion.p>

          <motion.div variants={fadeUp} className="relative">
            {/* Main slide */}
            <div className="overflow-hidden rounded-2xl border border-border bg-muted/30">
              <AnimatePresence mode="wait">
                <motion.div
                  key={graphicsIdx}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.35 }}
                  className="relative"
                >
                  <img
                    src={GRAPHICS[graphicsIdx].src}
                    alt={GRAPHICS[graphicsIdx].label}
                    className="w-full max-h-[520px] object-contain mx-auto block"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-5 py-4">
                    <p className="text-white font-semibold text-sm">{GRAPHICS[graphicsIdx].label}</p>
                    <p className="text-white/70 text-xs">{GRAPHICS[graphicsIdx].client}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={prevGraphic}
              className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/90 border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors shadow-md"
              aria-label="Previous"
              data-testid="btn-prev-graphic"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextGraphic}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity shadow-md"
              aria-label="Next"
              data-testid="btn-next-graphic"
            >
              <ChevronRight size={18} />
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-5">
              {GRAPHICS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setGraphicsIdx(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === graphicsIdx ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Thumbnail strip */}
            <div className="grid grid-cols-5 gap-2 mt-5">
              {GRAPHICS.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setGraphicsIdx(i)}
                  className={`rounded-lg overflow-hidden border-2 transition-colors aspect-square ${
                    i === graphicsIdx ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={g.src}
                    alt={g.label}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              ))}
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
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/2347055876701"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity"
              data-testid="btn-get-started"
            >
              Get Started
              <ArrowRight size={15} />
            </a>
            <a
              href="https://www.fiverr.com/s/Ldr0Zxo"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-border text-foreground font-semibold px-8 py-3.5 rounded-full hover:bg-muted transition-colors"
              data-testid="btn-fiverr-cta"
            >
              <SiFiverr size={16} className="text-[#1dbf73]" />
              Order on Fiverr
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
                  Building sharp web apps, data tools, crypto systems, and design
                  systems. Based in Nigeria, working worldwide.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6 text-sm text-muted-foreground">
            {[
              { label: "Home", href: "#" },
              { label: "Projects", href: "#projects" },
              { label: "Services", href: "#services" },
              { label: "Graphics", href: "#graphics" },
              { label: "Contact", href: "#contact" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-foreground transition-colors"
                data-testid={`footer-link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex gap-4 items-center">
              <a
                href="https://github.com/ONOSPETER"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="footer-social-github"
              >
                <FaGithub size={19} />
              </a>
              <a
                href="https://x.com/lexlex99722746"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter / X"
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="footer-social-twitter"
              >
                <FaTwitter size={19} />
              </a>
              <a
                href="https://wa.me/2347055876701"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="footer-social-whatsapp"
              >
                <FaWhatsapp size={19} />
              </a>
              <a
                href="https://www.fiverr.com/s/Ldr0Zxo"
                target="_blank"
                rel="noreferrer"
                aria-label="Fiverr"
                className="text-muted-foreground hover:text-[#1dbf73] transition-colors"
                data-testid="footer-social-fiverr"
              >
                <SiFiverr size={19} />
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
