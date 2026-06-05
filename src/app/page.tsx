"use client";
import { useEffect, useRef, useState, ReactNode } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  animate,
  useReducedMotion,
} from "framer-motion";

/* ── Motion primitives ───────────────────────────────────────── */

// Scroll-reveal wrapper: fades + lifts content into view once.
function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Counts up to `to` when scrolled into view.
function Counter({
  to,
  decimals = 0,
  suffix = "",
}: {
  to: number;
  decimals?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setVal(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to, reduce]);

  return (
    <span ref={ref}>
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

// Cursor-following magnetic pull for buttons.
function Magnetic({
  children,
  href,
  className,
  strength = 0.35,
}: {
  children: ReactNode;
  href: string;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 16, mass: 0.4 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.a>
  );
}

/* ── Page ────────────────────────────────────────────────────── */

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about");
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = ["about", "experience", "projects", "certifications", "publications", "contact"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -40% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#certifications", label: "Certs" },
    { href: "#publications", label: "Papers" },
    { href: "#contact", label: "Contact" },
  ];

  const skills = ["Python", "SQL", "Power BI", "AWS", "Azure", "Snowflake", "TensorFlow", "PyTorch", "Pandas", "NumPy", "Matplotlib", "Seaborn"];

  const stats = [
    { to: 2, suffix: "+", label: "Years Exp." },
    { to: 2, suffix: "", label: "Publications" },
    { to: 7, suffix: "", label: "Certifications" },
    { to: 94.6, decimals: 1, suffix: "%", label: "Model Accuracy" },
  ];

  const experiences = [
    {
      role: "AI Developer",
      company: "GNx Solutions",
      period: "May 2026 – Present",
      desc: "Building production LLM-powered applications and multi-agent AI systems — designing prompt pipelines, RAG-backed tooling, and intelligent automation.",
    },
    {
      role: "Data Processor",
      company: "Capita PLC",
      period: "Feb 2025 – Jan 2026",
      desc: "Resolved 200+ tickets daily with 95% accuracy; improved customer satisfaction by 90%.",
    },
    {
      role: "IT Assistant / Quality Associate",
      company: "Amazon",
      period: "Nov 2023 – Feb 2024",
      desc: "Improved workflow efficiency by 24%, ensured 100% compliance in quality analysis.",
    },
    {
      role: "Python Developer",
      company: "Infosys",
      period: "Jul 2021 – Sep 2022",
      desc: "Led 10-person data team, migrated 1TB+ to Snowflake, maintained 99% data accuracy.",
    },
    {
      role: "Software Developer",
      company: "ARCITE",
      period: "Jan 2020 – Jun 2021",
      desc: "Built Django web apps, integrated MySQL, improved system performance by 40%.",
    },
  ];

  const projects = [
    {
      title: "HireIndia",
      desc: "Live job aggregation platform pulling from 14 sources (Naukri, LinkedIn, Indeed, Gulf Talent & more). Upload your resume to get an instant ATS match % on every listing. 12,480+ live jobs updated every 6 hours.",
      tags: ["Next.js", "Python", "ATS Matching", "Web Scraping", "NLP"],
      link: "https://hire-india.vercel.app/",
    },
    {
      title: "Student Attainment Dashboard",
      desc: "Processed 2M+ records and built Power BI dashboards for academic planning.",
      tags: ["Python", "Power BI", "SQL", "Data Analysis"],
      link: "https://github.com/arjunyash2/unistats",
    },
    {
      title: "Real Estate & Crime Analysis",
      desc: "Integrated 30M+ records with R, Hadoop, Tableau for geospatial visual insights.",
      tags: ["R", "SQL", "ETL", "Tableau", "Hadoop", "Hive"],
      link: "https://github.com/arjunyash2/crimeRateRealestate",
    },
    {
      title: "Suspicious Activity Recognition",
      desc: "Pose Estimation + CNN model achieving 94.6% accuracy. Published at IEEE WiSPNET 2022.",
      tags: ["Python", "CNN", "Pose Estimation", "TensorFlow"],
      link: "https://doi.org/10.1109/WiSPNET54241.2022.9767152",
    },
  ];

  const certs = [
    { title: "PwC Switzerland – Digital Intelligence Simulation", org: "Forage", date: "Dec 2024" },
    { title: "Databases and SQL for Data Science", org: "Coursera", date: "Oct 2024" },
    { title: "AWS Certified Cloud Practitioner", org: "AWS", date: "Apr 2024 – Apr 2027" },
    { title: "Microsoft Certified: Azure Fundamentals", org: "Microsoft", date: "May 2022" },
    { title: "Google IT Support Certificate", org: "Coursera", date: "Dec 2021" },
    { title: "Advanced Unix – Shell Programming", org: "Infosys", date: "Oct 2021" },
    { title: "Google Cloud Big Data & ML Fundamentals", org: "Coursera", date: "May 2020" },
  ];

  const publications = [
    {
      title: "Suspicious Human Activity Recognition using Pose Estimation + CNN",
      venue: "IEEE WiSPNET 2022",
      link: "https://doi.org/10.1109/WiSPNET54241.2022.9767152",
    },
    {
      title: "Education's Hidden Drivers – A Comprehensive Study",
      venue: "LAP Lambert Academic Publishing (2025)",
      link: "https://www.amazon.co.uk/Educations-Hidden-Drivers-Comprehensive-Universities/dp/6208444330",
    },
  ];

  // Spotlight-follow handler shared by project cards.
  const onCardMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Mono:wght@300;400;500&family=Instrument+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #0a0a0a;
          --surface: #111111;
          --surface2: #181818;
          --border: #222222;
          --accent: #d4a853;
          --accent2: #c44b4b;
          --text: #f0ede8;
          --muted: #6b6560;
          --dim: #3a3530;
        }

        html { scroll-behavior: smooth; }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'Instrument Sans', sans-serif;
          font-size: 16px;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }

        /* FILM GRAIN — fixed overlay for tactile depth */
        .grain {
          position: fixed;
          inset: 0;
          z-index: 9998;
          pointer-events: none;
          opacity: 0.045;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
        }

        /* AURORA — slow-drifting accent light behind the page */
        .aurora {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .aurora span {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.5;
        }
        .aurora .a1 {
          top: -10%; left: -5%;
          width: 50vw; height: 50vw;
          background: radial-gradient(circle, rgba(212,168,83,0.10), transparent 65%);
          animation: drift1 22s ease-in-out infinite;
        }
        .aurora .a2 {
          bottom: -15%; right: -10%;
          width: 45vw; height: 45vw;
          background: radial-gradient(circle, rgba(196,75,75,0.07), transparent 65%);
          animation: drift2 28s ease-in-out infinite;
        }
        @keyframes drift1 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(8vw, 6vh) scale(1.15); }
        }
        @keyframes drift2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-6vw, -5vh) scale(1.1); }
        }

        /* keep real content above the aurora layer */
        nav, .hero, section, footer { position: relative; z-index: 1; }

        /* NAV — glassmorphic when scrolled */
        nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.2rem 3rem;
          transition: background 0.4s, border-color 0.4s, padding 0.4s;
          border-bottom: 1px solid transparent;
        }
        nav.scrolled {
          background: rgba(12,12,12,0.6);
          backdrop-filter: blur(16px) saturate(150%);
          -webkit-backdrop-filter: blur(16px) saturate(150%);
          border-color: rgba(255,255,255,0.06);
          padding: 0.9rem 3rem;
        }
        .nav-logo {
          font-family: 'DM Mono', monospace;
          font-size: 0.85rem;
          letter-spacing: 0.15em;
          color: var(--accent);
          text-decoration: none;
          font-weight: 500;
        }
        .nav-links {
          display: flex;
          gap: 2.5rem;
          list-style: none;
        }
        .nav-links a {
          font-family: 'DM Mono', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.2s;
          position: relative;
        }
        .nav-links a:hover, .nav-links a.active { color: var(--text); }
        .nav-links a.active::after {
          content: '';
          position: absolute;
          left: 0; right: 0; bottom: -4px;
          height: 1px;
          background: var(--accent);
        }

        /* HAMBURGER */
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 4px;
        }
        .hamburger span {
          display: block;
          width: 22px;
          height: 1.5px;
          background: var(--text);
          transition: all 0.3s;
        }

        /* HERO */
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 0 3rem 5rem;
          overflow: hidden;
        }
        .hero-grid {
          position: absolute;
          inset: 0;
          z-index: -1;
          background-image:
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px);
          background-size: 60px 60px;
          opacity: 0.3;
          -webkit-mask-image: radial-gradient(circle at 30% 60%, #000 0%, transparent 75%);
          mask-image: radial-gradient(circle at 30% 60%, #000 0%, transparent 75%);
        }
        .hero-number {
          font-family: 'DM Mono', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          color: var(--accent);
          margin-bottom: 1.5rem;
        }
        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(4rem, 10vw, 9rem);
          font-weight: 900;
          line-height: 0.92;
          letter-spacing: -0.02em;
          margin-bottom: 2rem;
        }
        .hero-title span {
          background: linear-gradient(120deg, var(--accent), #f0d49a 50%, var(--accent));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-subtitle {
          font-family: 'DM Mono', monospace;
          font-size: 0.8rem;
          letter-spacing: 0.18em;
          color: var(--muted);
          text-transform: uppercase;
          margin-bottom: 2.5rem;
        }
        .hero-desc {
          max-width: 520px;
          color: #a09890;
          font-weight: 300;
          line-height: 1.7;
          font-size: 0.95rem;
          margin-bottom: 3rem;
        }
        .hero-cta {
          display: flex;
          gap: 1rem;
          align-items: center;
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.85rem 2rem;
          background: var(--accent);
          color: #0a0a0a;
          font-family: 'DM Mono', monospace;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          box-shadow: 0 0 0 rgba(212,168,83,0);
          transition: box-shadow 0.3s, opacity 0.2s;
        }
        .btn-primary:hover { opacity: 0.92; box-shadow: 0 10px 40px -8px rgba(212,168,83,0.45); }
        .btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.85rem 2rem;
          border: 1px solid var(--dim);
          color: var(--muted);
          font-family: 'DM Mono', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s;
        }
        .btn-ghost:hover { border-color: var(--muted); color: var(--text); }
        .hero-stats {
          position: absolute;
          right: 3rem;
          bottom: 5rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          text-align: right;
          z-index: 1;
        }
        .stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 2.2rem;
          font-weight: 700;
          color: var(--text);
          line-height: 1;
        }
        .stat-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          color: var(--muted);
          text-transform: uppercase;
        }

        /* SECTION COMMON */
        section { padding: 8rem 3rem; }
        .section-label {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-family: 'DM Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          color: var(--accent);
          text-transform: uppercase;
          margin-bottom: 1rem;
        }
        .section-label::before {
          content: '';
          display: block;
          width: 30px;
          height: 1px;
          background: var(--accent);
        }
        h2.section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -0.02em;
          margin-bottom: 4rem;
        }

        /* ABOUT */
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: start;
        }
        .about-text p {
          color: #a09890;
          font-size: 1rem;
          line-height: 1.8;
          font-weight: 300;
          margin-bottom: 1.5rem;
        }
        .skills-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 2.5rem;
        }
        .skill-tag {
          padding: 0.4rem 0.9rem;
          border: 1px solid var(--dim);
          font-family: 'DM Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          color: var(--muted);
          transition: border-color 0.2s, color 0.2s, transform 0.2s;
        }
        .skill-tag:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }
        .profile-card { position: relative; }
        .profile-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4/5;
          overflow: hidden;
        }
        .profile-img-wrap::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 50%, rgba(10,10,10,0.8));
          z-index: 1;
        }
        .profile-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(20%) contrast(1.05);
          transition: filter 0.5s, transform 0.6s;
        }
        .profile-card:hover .profile-img-wrap img { filter: grayscale(0%) contrast(1.05); transform: scale(1.03); }
        .profile-accent-border {
          position: absolute;
          top: 1.5rem;
          right: -1.5rem;
          bottom: -1.5rem;
          left: 1.5rem;
          border: 1px solid var(--accent);
          z-index: -1;
          transition: transform 0.5s;
        }
        .profile-card:hover .profile-accent-border { transform: translate(-0.4rem, 0.4rem); }

        /* EXPERIENCE */
        #experience { background: var(--surface); }
        .exp-list { display: flex; flex-direction: column; gap: 0; }
        .exp-item {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 3rem;
          padding: 2.5rem 1rem 2.5rem 0;
          border-bottom: 1px solid var(--border);
          transition: background 0.3s, padding-left 0.3s;
          position: relative;
        }
        .exp-item::before {
          content: '';
          position: absolute;
          left: -1rem; top: 0; bottom: -1px;
          width: 2px;
          background: var(--accent);
          transform: scaleY(0);
          transform-origin: top;
          transition: transform 0.3s;
        }
        .exp-item:hover { background: rgba(255,255,255,0.015); padding-left: 1rem; }
        .exp-item:hover::before { transform: scaleY(1); }
        .exp-item:first-child { border-top: 1px solid var(--border); }
        .exp-meta { display: flex; flex-direction: column; gap: 0.25rem; }
        .exp-period {
          font-family: 'DM Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          color: var(--accent);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .exp-current {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 0 0 rgba(212,168,83,0.6);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(212,168,83,0.5); }
          70% { box-shadow: 0 0 0 7px rgba(212,168,83,0); }
          100% { box-shadow: 0 0 0 0 rgba(212,168,83,0); }
        }
        .exp-company {
          font-family: 'DM Mono', monospace;
          font-size: 0.72rem;
          color: var(--muted);
        }
        .exp-role {
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          color: var(--text);
        }
        .exp-desc { color: #7a7068; font-size: 0.9rem; font-weight: 300; line-height: 1.7; }

        /* PROJECTS */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5px;
          background: var(--border);
        }
        .project-card {
          background: var(--bg);
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: background 0.25s;
          position: relative;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
        }
        /* top reveal line */
        .project-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--accent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s;
          z-index: 2;
        }
        /* cursor spotlight */
        .project-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(212,168,83,0.10), transparent 45%);
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }
        .project-card:hover { background: var(--surface2); }
        .project-card:hover::before { transform: scaleX(1); }
        .project-card:hover::after { opacity: 1; }
        .project-num {
          font-family: 'DM Mono', monospace;
          font-size: 0.62rem;
          color: var(--dim);
          letter-spacing: 0.1em;
          position: relative; z-index: 1;
        }
        .project-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.35rem;
          font-weight: 700;
          line-height: 1.2;
          color: var(--text);
          position: relative; z-index: 1;
        }
        .project-desc { color: #7a7068; font-size: 0.85rem; font-weight: 300; line-height: 1.65; flex: 1; position: relative; z-index: 1; }
        .project-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.5rem; position: relative; z-index: 1; }
        .project-tag {
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.08em;
          color: var(--accent);
          border: 1px solid rgba(212,168,83,0.25);
          padding: 0.2rem 0.5rem;
        }
        .project-arrow {
          position: absolute;
          top: 2rem;
          right: 2rem;
          font-size: 0.8rem;
          color: var(--dim);
          transition: color 0.2s, transform 0.2s;
          z-index: 2;
        }
        .project-card:hover .project-arrow { color: var(--accent); transform: translate(2px, -2px); }

        /* CERTIFICATIONS */
        #certifications { background: var(--surface); }
        .certs-list { display: flex; flex-direction: column; gap: 0; }
        .cert-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 0;
          border-bottom: 1px solid var(--border);
          gap: 2rem;
          transition: padding-left 0.3s, color 0.3s;
        }
        .cert-item:hover { padding-left: 0.75rem; }
        .cert-item:first-child { border-top: 1px solid var(--border); }
        .cert-title {
          font-size: 0.92rem;
          font-weight: 400;
          color: var(--text);
          flex: 1;
        }
        .cert-org {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          color: var(--accent);
          letter-spacing: 0.1em;
          white-space: nowrap;
        }
        .cert-date {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          color: var(--muted);
          white-space: nowrap;
        }

        /* PUBLICATIONS */
        .pubs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5px; background: var(--border); }
        .pub-card {
          background: var(--bg);
          padding: 3rem;
          text-decoration: none;
          display: block;
          transition: background 0.25s;
          position: relative;
          overflow: hidden;
        }
        .pub-card::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 2px;
          background: var(--accent);
          transform: scaleY(0);
          transform-origin: top;
          transition: transform 0.3s;
        }
        .pub-card:hover { background: var(--surface2); }
        .pub-card:hover::before { transform: scaleY(1); }
        .pub-venue {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          color: var(--accent);
          text-transform: uppercase;
          margin-bottom: 1rem;
        }
        .pub-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem;
          font-weight: 700;
          line-height: 1.25;
          color: var(--text);
          margin-bottom: 1.5rem;
        }
        .pub-link {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          color: var(--muted);
          letter-spacing: 0.08em;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .pub-card:hover .pub-link { color: var(--text); }

        /* CONTACT */
        #contact { background: var(--surface); text-align: center; }
        .contact-inner { max-width: 600px; margin: 0 auto; }
        .contact-big {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.5rem, 6vw, 5rem);
          font-weight: 900;
          line-height: 1.05;
          margin-bottom: 1.5rem;
        }
        .contact-big span {
          background: linear-gradient(120deg, var(--accent), #f0d49a 50%, var(--accent));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .contact-sub {
          color: var(--muted);
          font-size: 0.9rem;
          font-weight: 300;
          margin-bottom: 3rem;
          line-height: 1.7;
        }
        .contact-links { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; }
        .contact-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border: 1px solid var(--dim);
          font-family: 'DM Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          color: var(--muted);
          text-decoration: none;
          transition: all 0.2s;
        }
        .contact-chip:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }

        /* FOOTER */
        footer {
          padding: 2rem 3rem;
          border-top: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        footer p {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          color: var(--dim);
          letter-spacing: 0.08em;
        }

        /* DIVIDER */
        .ruled { width: 60px; height: 1px; background: var(--accent); margin-bottom: 3rem; }

        /* MOBILE */
        @media (max-width: 900px) {
          nav, nav.scrolled { padding: 1rem 1.5rem; }
          .nav-links { display: none; }
          .nav-links.open {
            display: flex;
            flex-direction: column;
            position: fixed;
            inset: 0;
            background: rgba(10,10,10,0.95);
            backdrop-filter: blur(12px);
            justify-content: center;
            align-items: center;
            gap: 2.5rem;
            z-index: 99;
          }
          .nav-links.open a { font-size: 1rem; }
          .hamburger { display: flex; z-index: 101; }
          .hero { padding: 0 1.5rem 4rem; }
          .hero-stats { position: static; flex-direction: row; flex-wrap: wrap; gap: 2rem; margin-top: 2rem; text-align: left; }
          section { padding: 5rem 1.5rem; }
          .about-grid { grid-template-columns: 1fr; gap: 3rem; }
          .profile-card { max-width: 360px; }
          .exp-item { grid-template-columns: 1fr; gap: 0.5rem; }
          .projects-grid { grid-template-columns: 1fr; }
          .pubs-grid { grid-template-columns: 1fr; }
          .cert-item { flex-direction: column; align-items: flex-start; gap: 0.4rem; }
          footer { flex-direction: column; gap: 0.5rem; text-align: center; }
        }

        /* RESPECT REDUCED MOTION */
        @media (prefers-reduced-motion: reduce) {
          .aurora span, .exp-current { animation: none !important; }
          html { scroll-behavior: auto; }
        }
      `}</style>

      {/* AMBIENT LAYERS */}
      <div className="aurora" aria-hidden="true">
        <span className="a1" />
        <span className="a2" />
      </div>
      <div className="grain" aria-hidden="true" />

      {/* NAV */}
      <nav className={scrollY > 40 ? "scrolled" : ""}>
        <a href="#" className="nav-logo">ASD — Portfolio</a>
        <ul className={`nav-links${menuOpen ? " open" : ""}`}>
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className={activeSection === href.slice(1) ? "active" : ""}
                onClick={() => setMenuOpen(false)}
              >{label}</a>
            </li>
          ))}
        </ul>
        <button
          className="hamburger"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* HERO */}
      <div className="hero" ref={heroRef}>
        <div className="hero-grid" />
        <motion.div
          className="hero-number"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >01 / INTRODUCTION</motion.div>
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          Arjun<br />
          Shoba<br />
          <span>Dileep</span>
        </motion.h1>
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >AI Developer · LLM Engineer · ML Engineer</motion.p>
        <motion.p
          className="hero-desc"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          MSc Big Data Analytics graduate with 2+ years of developer experience. Specialising in scalable AI systems, ETL pipelines, and LLM-powered applications.
        </motion.p>
        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <Magnetic href="#projects" className="btn-primary">View Projects ↓</Magnetic>
          <Magnetic href="#contact" className="btn-ghost" strength={0.25}>Get in Touch →</Magnetic>
        </motion.div>
        <motion.div
          className="hero-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {stats.map((s) => (
            <div key={s.label}>
              <div className="stat-num">
                <Counter to={s.to} decimals={s.decimals ?? 0} suffix={s.suffix} />
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ABOUT */}
      <section id="about">
        <Reveal>
          <div className="section-label">02 / About</div>
          <h2 className="section-title">Who I Am</h2>
        </Reveal>
        <div className="about-grid">
          <Reveal delay={0.05}>
            <div className="about-text">
              <p>
                I'm an AI/ML engineer and data professional based in the UK, with a Master's in Big Data Analytics. I bring production-grade instincts to every project — whether that's architecting a multi-agent LLM pipeline or building an executive-ready Power BI dashboard from millions of raw records.
              </p>
              <p>
                My background spans Python development at Infosys, quality engineering at Amazon, and applied ML research published at IEEE. I thrive at the intersection of rigorous engineering and real-world impact.
              </p>
              <div className="ruled" />
              <div className="skills-wrap">
                {skills.map((s, i) => (
                  <motion.span
                    key={s}
                    className="skill-tag"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.03 }}
                  >{s}</motion.span>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="profile-card">
              <div className="profile-img-wrap">
                <img src="/assets/images/profile.jpg" alt="Arjun Shoba Dileep" />
              </div>
              <div className="profile-accent-border" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience">
        <Reveal>
          <div className="section-label">03 / Experience</div>
          <h2 className="section-title">Where I've<br />Worked</h2>
        </Reveal>
        <div className="exp-list">
          {experiences.map((e, i) => {
            const isCurrent = e.period.includes("Present");
            return (
              <Reveal key={e.company} delay={i * 0.06}>
                <div className="exp-item">
                  <div className="exp-meta">
                    <span className="exp-period">
                      {isCurrent && <span className="exp-current" />}
                      {e.period}
                    </span>
                    <span className="exp-company">{e.company}</span>
                  </div>
                  <div>
                    <div className="exp-role">{e.role}</div>
                    <div className="exp-desc">{e.desc}</div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <Reveal>
          <div className="section-label">04 / Projects</div>
          <h2 className="section-title">Selected<br />Work</h2>
        </Reveal>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card"
              onMouseMove={onCardMove}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="project-arrow">↗</span>
              <div className="project-num">0{i + 1}</div>
              <div className="project-title">{p.title}</div>
              <div className="project-desc">{p.desc}</div>
              <div className="project-tags">
                {p.tags.map(t => <span key={t} className="project-tag">{t}</span>)}
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications">
        <Reveal>
          <div className="section-label">05 / Certifications</div>
          <h2 className="section-title">Licences &<br />Credentials</h2>
        </Reveal>
        <div className="certs-list">
          {certs.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.04} y={16}>
              <div className="cert-item">
                <div className="cert-title">{c.title}</div>
                <div className="cert-org">{c.org}</div>
                <div className="cert-date">{c.date}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PUBLICATIONS */}
      <section id="publications">
        <Reveal>
          <div className="section-label">06 / Publications</div>
          <h2 className="section-title">Research &<br />Writing</h2>
        </Reveal>
        <div className="pubs-grid">
          {publications.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="pub-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="pub-venue">{p.venue}</div>
              <div className="pub-title">{p.title}</div>
              <div className="pub-link">Read paper ↗</div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <Reveal className="contact-inner">
          <div className="section-label" style={{ justifyContent: "center" }}>07 / Contact</div>
          <div className="contact-big">Let's <span>build</span><br />something.</div>
          <p className="contact-sub">
            Open to roles in AI/ML engineering, data analytics, and LLM application development. Drop me a line.
          </p>
          <div className="contact-links">
            <a href="mailto:arjunyash2@gmail.com" className="contact-chip">✉ arjunyash2@gmail.com</a>
            <a href="https://linkedin.com/in/arjunsdileep" target="_blank" rel="noopener noreferrer" className="contact-chip">↗ LinkedIn</a>
            <a href="https://github.com/arjunyash2" target="_blank" rel="noopener noreferrer" className="contact-chip">↗ GitHub</a>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer>
        <p>© 2026 Arjun Shoba Dileep</p>
        <p>Built with Next.js · Tailwind · Framer Motion</p>
      </footer>
    </>
  );
}
