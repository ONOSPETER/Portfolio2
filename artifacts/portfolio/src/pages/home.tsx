import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Code2,
  ExternalLink,
  Github,
  Globe2,
  Layers3,
  Mail,
  Menu,
  Moon,
  Orbit,
  PenLine,
  Radio,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { useGetPortfolioFeed } from "@workspace/api-client-react";
import { useTheme } from "@/hooks/use-theme";

const reveal: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const revealGroup: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09 } },
};

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Research", href: "#research" },
  { label: "Writing", href: "#writing" },
  { label: "Services", href: "#services" },
];

const graphicWork = [
  { src: "/images/graphic-valentine-opt.jpg", title: "Valentine's campaign", year: "2025" },
  { src: "/images/graphic-xmas-opt.jpg", title: "Holiday retail system", year: "2025" },
  { src: "/images/graphic-easter-opt.jpg", title: "Easter day greeting", year: "2025" },
  { src: "/images/graphic-december-opt.jpg", title: "Hello December identity", year: "2025" },
  { src: "/images/graphic-november-opt.jpg", title: "Monthly social campaign", year: "2025" },
];

const services = [
  {
    number: "01",
    icon: Code2,
    title: "Web applications",
    body: "Interfaces and internal tools that turn messy operations into a clear daily workflow.",
    tags: ["React", "TypeScript", "Node.js"],
    accent: "teal",
  },
  {
    number: "02",
    icon: Orbit,
    title: "Autonomous systems",
    body: "Computer vision, bot automation, and experiments that let software sense, decide, and respond.",
    tags: ["Python", "OpenCV", "APIs"],
    accent: "coral",
  },
  {
    number: "03",
    icon: Layers3,
    title: "Data & crypto tools",
    body: "Pipelines, dashboards, DeFi utilities, and tax tooling with a bias for useful evidence.",
    tags: ["ETL", "AI/ML", "Web3"],
    accent: "blue",
  },
  {
    number: "04",
    icon: PenLine,
    title: "Research & visual work",
    body: "Technical writing and graphic systems that make an idea easier to inspect, share, and trust.",
    tags: ["Research", "Reports", "Design"],
    accent: "orange",
  },
];

function formatDate(dateString?: string) {
  if (!dateString) return "Date unavailable";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(date);
}

function compactNumber(value: number) {
  return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(value);
}

function ExternalAnchor({
  href,
  children,
  className = "",
  testId,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  testId: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      data-testid={testId}
    >
      {children}
    </a>
  );
}

function Avatar({ size = "large", src = "/images/peter-portrait-illustrated.png" }: { size?: "small" | "large"; src?: string }) {
  return (
    <div className={size === "large" ? "avatar avatar-large" : "avatar avatar-small"} data-testid="img-avatar">
      <img src={src} alt="Peter Obiegba" loading={size === "large" ? "eager" : "lazy"} />
    </div>
  );
}

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "site-header-scrolled" : ""}`} data-testid="navbar">
      <div className="nav-shell">
        <a href="#" className="brand" data-testid="link-home">
          <span className="brand-mark">PO</span>
          <span>peter<span className="brand-dot">.</span>ng</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a href={item.href} key={item.href} data-testid={`link-nav-${item.label.toLowerCase()}`}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            type="button"
            onClick={toggleTheme}
            className="icon-button"
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            data-testid="button-theme-toggle"
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <a href="#contact" className="nav-contact" data-testid="link-nav-contact">
            Start a conversation <ArrowRight size={14} />
          </a>
          <button
            type="button"
            className="mobile-menu-button icon-button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            data-testid="button-menu-toggle"
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            aria-label="Mobile navigation"
          >
            {navItems.map((item) => (
              <a href={item.href} key={item.href} onClick={() => setMenuOpen(false)} data-testid={`link-mobile-${item.label.toLowerCase()}`}>
                {item.label} <ArrowDownRight size={15} />
              </a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)} data-testid="link-mobile-contact">
              Start a conversation <ArrowRight size={15} />
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function LoadingState() {
  return (
    <div className="loading-panel" aria-label="Loading live portfolio data" data-testid="status-loading">
      <div className="skeleton-line skeleton-short" />
      <div className="skeleton-line" />
      <div className="skeleton-line skeleton-medium" />
      <span className="font-mono loading-copy">syncing live sources…</span>
    </div>
  );
}

export default function Home() {
  const data = useGetPortfolioFeed();
  const { isLoading, isError, refetch } = data;
  const feed = data.data;
  const [graphicIndex, setGraphicIndex] = useState(0);
  const [repoFilter, setRepoFilter] = useState("All");

  const repositories = useMemo(
    () =>
      [...(feed?.github?.repositories ?? [])]
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, 5),
    [feed?.github?.repositories],
  );
  const languages = useMemo(
    () => ["All", ...Array.from(new Set(repositories.map((repo) => repo.language).filter(Boolean) as string[]))],
    [repositories],
  );
  const filteredRepositories = repoFilter === "All"
    ? repositories
    : repositories.filter((repo) => repo.language === repoFilter);

  const showNextGraphic = useCallback(() => {
    setGraphicIndex((index) => (index + 1) % graphicWork.length);
  }, []);
  const showPreviousGraphic = useCallback(() => {
    setGraphicIndex((index) => (index - 1 + graphicWork.length) % graphicWork.length);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(showNextGraphic, 6000);
    return () => window.clearInterval(timer);
  }, [showNextGraphic]);

  const research = feed?.researchgate;
  const hasPartialData = Boolean(feed && (!feed.github || !feed.medium || !feed.researchgate));

  return (
    <div className="portfolio-page">
      <Navbar />

      <main>
        <section className="hero-section" id="top">
          <div className="hero-grid">
            <motion.div className="hero-copy" initial="hidden" animate="visible" variants={revealGroup}>
              <motion.div variants={reveal} className="eyebrow">
                <span className="live-dot" />
                <span>Information systems / Lagos, Nigeria</span>
                <span className="font-mono eyebrow-code">[01—26]</span>
              </motion.div>
              <motion.h1 variants={reveal}>
                I build systems<br />
                <em>worth studying.</em>
              </motion.h1>
              <motion.p variants={reveal} className="hero-lede">
                Peter Obiegba is an Information Systems student and analyst working at the useful edge of autonomous technology, data, web applications, and research.
              </motion.p>
              <motion.div variants={reveal} className="hero-actions">
                <a href="#work" className="button button-primary" data-testid="link-hero-work">
                  See the working set <ArrowDownRight size={16} />
                </a>
                <a href="#contact" className="text-link" data-testid="link-hero-contact">
                  Have a problem to map? <ArrowRight size={15} />
                </a>
              </motion.div>
              <motion.div variants={reveal} className="hero-note">
                <span className="font-mono">currently</span>
                <span>researching how software makes decisions in the real world.</span>
              </motion.div>
            </motion.div>

            <motion.div className="hero-portrait-wrap" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <div className="portrait-grid" />
              <div className="portrait-label font-mono">FIELD NOTE 001 / PORTRAIT</div>
              <Avatar />
              <div className="portrait-stamp">
                <Sparkles size={14} />
                <span>Thoughtful<br />by default</span>
              </div>
              <div className="portrait-caption font-mono">08° 29′ N / 04° 32′ E</div>
            </motion.div>
          </div>
          <div className="hero-ticker" aria-label="Areas of practice" data-testid="text-practice-ticker">
            <div className="marquee-track">
              <span>RESEARCH WRITING</span><i>+</i><span>AUTONOMOUS TECHNOLOGY</span><i>+</i><span>DATA SYSTEMS</span><i>+</i><span>WEB APPLICATIONS</span><i>+</i><span>RESEARCH WRITING</span><i>+</i><span>AUTONOMOUS TECHNOLOGY</span><i>+</i><span>DATA SYSTEMS</span><i>+</i><span>WEB APPLICATIONS</span><i>+</i>
            </div>
          </div>
        </section>

        <section className="intro-section section-rule">
          <div className="section-kicker"><span className="font-mono">01</span><span>Context, not a tagline</span></div>
          <div className="intro-layout">
            <h2>Many disciplines.<br /><em>One operating system.</em></h2>
            <div className="intro-text">
              <p>I am drawn to the places where a good question meets a workable prototype. My practice moves between building, investigating, and explaining — because a system is only useful when people can understand what it is doing.</p>
              <p className="muted-copy">Based in Nigeria, available for collaborations that need both an analytical mind and a pair of hands that ships.</p>
              <div className="stat-strip" data-testid="stats-live">
                <div><strong>{feed?.github?.repositories?.length ?? "—"}</strong><span>public builds</span></div>
                <div><strong>{feed?.medium?.articles?.length ?? "—"}</strong><span>published notes</span></div>
                <div><strong>{research?.citations ?? "—"}</strong><span>research citations</span></div>
              </div>
              <div className="profile-moment" data-testid="profile-moment">
                <div className="profile-moment-image">
                  <img src="/images/peter-portrait.png" alt="Peter Obiegba in his studio" loading="lazy" />
                </div>
                <div className="profile-moment-copy">
                  <span className="font-mono">the person behind the systems</span>
                  <strong>Build with curiosity. Verify with evidence.</strong>
                  <span>Student, analyst, and builder based in Nigeria — close to the problem and close to the code.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="work-section section-rule" id="work">
          <div className="section-heading">
            <div>
              <div className="section-kicker"><span className="font-mono">02</span><span>Live repository index</span></div>
              <h2>Selected <em>working set.</em></h2>
            </div>
            {feed?.github?.profileUrl && (
              <ExternalAnchor href={feed.github.profileUrl} className="outline-link" testId="link-github-profile">
                <Github size={16} /> @{feed.github.username} <ExternalLink size={13} />
              </ExternalAnchor>
            )}
          </div>

          {isLoading ? <LoadingState /> : isError ? (
            <div className="empty-panel error-panel" data-testid="status-feed-error">
              <Radio size={21} />
              <div><strong>Live sources are taking a pause.</strong><p>Try the connection again to load the current repository index.</p></div>
              <button type="button" onClick={() => refetch()} className="button button-small" data-testid="button-retry-feed">Retry sync</button>
            </div>
          ) : (
            <>
              {hasPartialData && <div className="partial-notice" data-testid="status-partial-feed">Some live sources are unavailable; the rest of the notebook is still readable.</div>}
              <div className="filter-row" aria-label="Filter repositories by language">
                {languages.map((language) => (
                  <button type="button" key={language} onClick={() => setRepoFilter(language)} className={`filter-chip ${repoFilter === language ? "filter-chip-active" : ""}`} data-testid={`button-filter-${language.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                    {language}
                  </button>
                ))}
              </div>
              {filteredRepositories.length === 0 ? (
                <div className="empty-panel" data-testid="status-repositories-empty">
                  <Code2 size={23} />
                  <div><strong>No public repositories in this view yet.</strong><p>When a live source is available, it will appear here with its current language and activity.</p></div>
                </div>
              ) : (
                <motion.div className="repo-grid" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={revealGroup}>
                  {filteredRepositories.map((repo, index) => (
                      <motion.article className={`repo-card ${index === 0 ? "repo-card-featured" : ""}`} variants={reveal} key={repo.url} data-testid={`card-repository-${repo.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                        <div className="repo-content">
                          <span className="font-mono repo-index">0{index + 1} / LIVE REPOSITORY</span>
                          <div className="repo-meta font-mono"><span>{repo.language || "multi-stack"}</span><span>updated {formatDate(repo.updatedAt)}</span></div>
                          <h3>{repo.name}</h3>
                          <p>{repo.description || "A live experiment in Peter's working set, documented in code."}</p>
                          <div className="repo-footer font-mono"><span>{repo.stars} stars</span><span>{repo.forks} forks</span></div>
                          <ExternalAnchor href={repo.url} className="repo-open" testId={`link-repository-${index}`}>
                            Inspect source <ExternalLink size={13} />
                          </ExternalAnchor>
                        </div>
                      </motion.article>
                  ))}
                </motion.div>
              )}
            </>
          )}
        </section>

        <section className="research-section section-rule" id="research">
          <div className="section-kicker"><span className="font-mono">03</span><span>Research portfolio</span></div>
          <div className="research-layout">
            <div className="research-intro">
              <h2>Curiosity,<br /><em>with receipts.</em></h2>
              <p>Ideas get sharper when they leave the notebook. Explore the academic work, affiliations, and reading trail behind the builds.</p>
              {research?.profileUrl && <ExternalAnchor href={research.profileUrl} className="button button-dark" testId="link-researchgate-profile">View ResearchGate profile <ArrowRight size={15} /></ExternalAnchor>}
            </div>
            {research?.available ? (
              <div className="research-card" data-testid="card-research-profile">
                <div className="research-card-top"><span className="status-pill"><span className="live-dot" /> profile available</span><Globe2 size={20} /></div>
                <h3>{research.name}</h3>
                <p className="research-affiliation">{research.affiliation}</p>
                <p className="research-about">{research.about}</p>
                <div className="research-metrics">
                  <div><strong>{research.publications}</strong><span>publications</span></div>
                  <div><strong>{compactNumber(research.reads)}</strong><span>reads</span></div>
                  <div><strong>{research.citations}</strong><span>citations</span></div>
                </div>
              </div>
            ) : (
              <div className="empty-panel research-unavailable" data-testid="status-research-unavailable">
                <BookOpen size={23} />
                <div><strong>Research profile currently unavailable.</strong><p>The public profile feed will populate this panel when it is reachable.</p></div>
              </div>
            )}
          </div>
        </section>

        <section className="writing-section section-rule" id="writing">
          <div className="section-heading">
            <div>
              <div className="section-kicker"><span className="font-mono">04</span><span>Public technical essays</span></div>
              <h2>Notes from <em>the edge.</em></h2>
            </div>
            {feed?.medium?.profileUrl && <ExternalAnchor href={feed.medium.profileUrl} className="outline-link" testId="link-medium-profile">Read on Medium <ExternalLink size={13} /></ExternalAnchor>}
          </div>
            {!feed?.medium?.articles?.length ? (
            <div className="empty-panel" data-testid="status-articles-empty"><PenLine size={22} /><div><strong>No articles in the live feed yet.</strong><p>Writing will appear here as soon as the publishing source is available.</p></div></div>
          ) : (
            <div className="article-list">
              {feed.medium.articles.map((article, index) => (
                <ExternalAnchor key={article.url} href={article.url} className="article-row" testId={`link-article-${index}`}>
                  <span className="article-number font-mono">0{index + 1}</span>
                  <div className="article-main"><h3>{article.title}</h3><p>{article.excerpt}</p></div>
                  <div className="article-meta font-mono"><span><CalendarDays size={13} /> {formatDate(article.publishedAt)}</span><span>{article.readingMinutes} min read</span></div>
                  <ArrowUpRightIcon />
                </ExternalAnchor>
              ))}
            </div>
          )}
        </section>

        <section className="services-section section-rule" id="services">
          <div className="section-kicker"><span className="font-mono">05</span><span>How I can be useful</span></div>
          <div className="services-heading"><h2>Useful things,<br /><em>made carefully.</em></h2><p>For teams who need a person that can zoom from the system diagram to the last visible detail.</p></div>
          <div className="services-grid">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article className={`service-card service-${service.accent}`} key={service.number} data-testid={`card-service-${service.number}`}>
                  <div className="service-top"><span className="font-mono">{service.number}</span><Icon size={21} /></div>
                  <h3>{service.title}</h3><p>{service.body}</p>
                  <div className="service-tags">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="visual-section section-rule" id="graphics">
          <div className="visual-heading"><div><div className="section-kicker"><span className="font-mono">06</span><span>Selected visual work</span></div><h2>Systems need a <em>visual language.</em></h2></div><p>Campaign graphics for Phonify Communications — a reminder that clear information can still have a little theatre.</p></div>
          <div className="gallery-stage">
            <AnimatePresence mode="wait">
              <motion.div key={graphicWork[graphicIndex].src} className="gallery-image-wrap" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.35 }}>
                <img src={graphicWork[graphicIndex].src} alt={graphicWork[graphicIndex].title} data-testid={`img-graphic-${graphicIndex}`} />
                <div className="gallery-label font-mono">{graphicWork[graphicIndex].year} / {graphicWork[graphicIndex].title}</div>
              </motion.div>
            </AnimatePresence>
            <div className="gallery-controls">
              <span className="font-mono">{String(graphicIndex + 1).padStart(2, "0")} <i>/</i> {String(graphicWork.length).padStart(2, "0")}</span>
              <button type="button" onClick={showPreviousGraphic} aria-label="Previous graphic" data-testid="button-graphic-previous"><ChevronLeft size={18} /></button>
              <button type="button" onClick={showNextGraphic} aria-label="Next graphic" data-testid="button-graphic-next"><ChevronRight size={18} /></button>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-orbit orbit-one" /><div className="contact-orbit orbit-two" />
          <div className="contact-content">
            <div className="section-kicker"><span className="font-mono">07</span><span>Open channel</span></div>
            <h2>Bring the<br /><em>interesting problem.</em></h2>
            <p>Tell me what is unclear, slow, fragile, or waiting to be built. I will reply with a considered next step.</p>
            <a href="mailto:peterobiegba@gmail.com" className="button button-accent" data-testid="link-contact-email"><Mail size={16} /> peterobiegba@gmail.com <ArrowUpRightIcon /></a>
            <div className="social-links">
              {feed?.github?.profileUrl && <ExternalAnchor href={feed.github.profileUrl} className="social-link" testId="link-contact-github"><Github size={16} /> GitHub</ExternalAnchor>}
              {feed?.medium?.profileUrl && <ExternalAnchor href={feed.medium.profileUrl} className="social-link" testId="link-contact-medium"><PenLine size={16} /> Medium</ExternalAnchor>}
              {research?.profileUrl && <ExternalAnchor href={research.profileUrl} className="social-link" testId="link-contact-researchgate"><BookOpen size={16} /> ResearchGate</ExternalAnchor>}
            </div>
          </div>
          <div className="contact-side font-mono"><span>BUILD / STUDY / SHARE</span><span>PG-2026</span></div>
        </section>
      </main>

      <footer className="site-footer"><a href="#" className="brand" data-testid="link-footer-home"><span className="brand-mark">PO</span><span>peter<span className="brand-dot">.</span>ng</span></a><span className="footer-copy">A personal lab notebook from Nigeria.</span><span className="font-mono">© {new Date().getFullYear()} / made in public</span></footer>
    </div>
  );
}

function ArrowUpRightIcon() {
  return <ArrowUpRight size={17} />;
}