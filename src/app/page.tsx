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
          --maxw: 1180px;
          --pad: 2.5rem;
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

        /* centered content container — kills edge-to-edge sprawl */
        .container { width: 100%; max-width: var(--maxw); margin: 0 auto; }

        /* FILM GRAIN */
        .grain {
          position: fixed;
          inset: 0;
          z-index: 9998;
          pointer-events: none;
          opacity: 0.04;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
        }

        /* AURORA */
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
          filter: blur(100px);
          opacity: 0.5;
        }
        .aurora .a1 {
          top: -12%; left: -8%;
          width: 42vw; height: 42vw;
          background: radial-gradient(circle, rgba(212,168,83,0.11), transparent 65%);
          animation: drift1 22s ease-in-out infinite;
        }
        .aurora .a2 {
          bottom: -18%; right: -12%;
          width: 40vw; height: 40vw;
          background: radial-gradient(circle, rgba(196,75,75,0.07), transparent 65%);
          animation: drift2 28s ease-in-out infinite;
        }
        @keyframes drift1 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(7vw, 5vh) scale(1.12); }
        }
        @keyframes drift2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-5vw, -4vh) scale(1.1); }
        }

        nav, .hero, section, footer { position: relative; z-index: 1; }

        /* NAV */
        nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          transition: background 0.4s, border-color 0.4s, padding 0.4s;
          border-bottom: 1px solid transparent;
          padding: 1.1rem 0;
        }
        nav .container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-left: var(--pad);
          padding-right: var(--pad);
        }
        nav.scrolled {
          background: rgba(12,12,12,0.6);
          backdrop-filter: blur(16px) saturate(150%);
          -webkit-backdrop-filter: blur(16px) saturate(150%);
          border-color: rgba(255,255,255,0.06);
          padding: 0.8rem 0;
        }
        .nav-logo {
          font-family: 'DM Mono', monospace;
          font-size: 0.85rem;
          letter-spacing: 0.15em;
          color: var(--accent);
          text-decoration: none;
          font-weight: 500;
        }
        .nav-links { display: flex; gap: 2.25rem; list-style: none; }
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

        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 4px;
        }
        .hamburger span { display: block; width: 22px; height: 1.5px; background: var(--text); transition: all 0.3s; }

        /* HERO — contained two-column, vertically centered */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 7rem var(--pad) 4rem;
          overflow: hidden;
        }
        .hero-grid {
          position: absolute;
          inset: 0;
          z-index: -1;
          background-image:
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px);
          background-size: 64px 64px;
          opacity: 0.25;
          -webkit-mask-image: radial-gradient(circle at 70% 40%, #000 0%, transparent 70%);
          mask-image: radial-gradient(circle at 70% 40%, #000 0%, transparent 70%);
        }
        .hero-inner {
          display: grid;
          grid-template-columns: 1.05fr 0.85fr;
          gap: 4rem;
          align-items: center;
        }
        .hero-number {
          font-family: 'DM Mono', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          color: var(--accent);
          margin-bottom: 1.25rem;
        }
        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3rem, 7vw, 5.5rem);
          font-weight: 900;
          line-height: 0.95;
          letter-spacing: -0.02em;
          margin-bottom: 1.5rem;
        }
        .hero-title span {
          background: linear-gradient(120deg, var(--accent), #f0d49a 50%, var(--accent));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-subtitle {
          font-family: 'DM Mono', monospace;
          font-size: 0.78rem;
          letter-spacing: 0.16em;
          color: var(--muted);
          text-transform: uppercase;
          margin-bottom: 1.75rem;
        }
        .hero-desc {
          max-width: 46ch;
          color: #a09890;
          font-weight: 300;
          line-height: 1.75;
          font-size: 0.98rem;
          margin-bottom: 2.25rem;
        }
        .hero-cta { display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.85rem 1.9rem;
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
          padding: 0.85rem 1.9rem;
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

        /* HERO portrait — compact, framed */
        .hero-portrait { position: relative; justify-self: end; width: 100%; max-width: 340px; }
        .hero-portrait .img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4/5;
          overflow: hidden;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .hero-portrait .img-wrap::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(10,10,10,0.55), transparent 55%);
          z-index: 1;
        }
        .hero-portrait img {
          width: 100%; height: 100%;
          object-fit: cover;
          filter: grayscale(15%) contrast(1.05);
          transition: filter 0.5s, transform 0.6s;
        }
        .hero-portrait:hover img { filter: grayscale(0%); transform: scale(1.04); }
        .hero-portrait .frame {
          position: absolute;
          inset: -0.85rem -0.85rem auto auto;
          top: 0.85rem; left: 0.85rem; right: -0.85rem; bottom: -0.85rem;
          border: 1px solid var(--accent);
          border-radius: 14px;
          z-index: -1;
          transition: transform 0.5s;
        }
        .hero-portrait:hover .frame { transform: translate(-0.35rem, 0.35rem); }
        .hero-badge {
          position: absolute;
          left: -0.85rem; bottom: 1.25rem;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.9rem;
          background: rgba(12,12,12,0.85);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 999px;
          font-family: 'DM Mono', monospace;
          font-size: 0.62rem;
          letter-spacing: 0.1em;
          color: var(--text);
          text-transform: uppercase;
        }
        .hero-badge .dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 0 0 rgba(212,168,83,0.6);
          animation: pulse 2s infinite;
        }

        /* HERO stats — inline row */
        .hero-stats {
          display: flex;
          gap: 2.5rem;
          margin-top: 3rem;
          flex-wrap: wrap;
        }
        .stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 1.9rem;
          font-weight: 700;
          color: var(--text);
          line-height: 1;
        }
        .stat-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.62rem;
          letter-spacing: 0.14em;
          color: var(--muted);
          text-transform: uppercase;
          margin-top: 0.4rem;
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(212,168,83,0.5); }
          70% { box-shadow: 0 0 0 7px rgba(212,168,83,0); }
          100% { box-shadow: 0 0 0 0 rgba(212,168,83,0); }
        }

        /* SECTION COMMON — tighter rhythm, contained */
        section { padding: 6.5rem var(--pad); }
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
        .section-label::before { content: ''; display: block; width: 30px; height: 1px; background: var(--accent); }
        h2.section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.25rem, 4vw, 3.25rem);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -0.02em;
          margin-bottom: 3rem;
        }

        /* ABOUT — text-led, contained, no giant photo */
        .about-grid {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 4rem;
          align-items: start;
        }
        .about-lead {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem;
          font-weight: 400;
          line-height: 1.4;
          color: var(--text);
        }
        .about-lead em { color: var(--accent); font-style: italic; }
        .about-text p {
          color: #a09890;
          font-size: 1rem;
          line-height: 1.85;
          font-weight: 300;
          margin-bottom: 1.25rem;
          max-width: 62ch;
        }
        .skills-wrap { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 2rem; }
        .skill-tag {
          padding: 0.4rem 0.9rem;
          border: 1px solid var(--dim);
          border-radius: 999px;
          font-family: 'DM Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.08em;
          color: var(--muted);
          transition: border-color 0.2s, color 0.2s, transform 0.2s;
        }
        .skill-tag:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }

        /* EXPERIENCE */
        #experience { background: var(--surface); }
        .exp-list { display: flex; flex-direction: column; }
        .exp-item {
          display: grid;
          grid-template-columns: 190px 1fr;
          gap: 2.5rem;
          padding: 2rem 1rem 2rem 0;
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
        .exp-meta { display: flex; flex-direction: column; gap: 0.3rem; }
        .exp-period {
          font-family: 'DM Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.08em;
          color: var(--accent);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .exp-current {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 0 0 rgba(212,168,83,0.6);
          animation: pulse 2s infinite;
        }
        .exp-company { font-family: 'DM Mono', monospace; font-size: 0.72rem; color: var(--muted); }
        .exp-role {
          font-family: 'Playfair Display', serif;
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.6rem;
          color: var(--text);
        }
        .exp-desc { color: #7a7068; font-size: 0.9rem; font-weight: 300; line-height: 1.7; max-width: 60ch; }

        /* PROJECTS */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5px;
          background: var(--border);
          border: 1px solid var(--border);
          border-radius: 14px;
          overflow: hidden;
        }
        .project-card {
          background: var(--bg);
          padding: 2.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
          transition: background 0.25s;
          position: relative;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          min-height: 240px;
        }
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
        .project-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(440px circle at var(--mx, 50%) var(--my, 50%), rgba(212,168,83,0.10), transparent 45%);
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }
        .project-card:hover { background: var(--surface2); }
        .project-card:hover::before { transform: scaleX(1); }
        .project-card:hover::after { opacity: 1; }
        .project-num { font-family: 'DM Mono', monospace; font-size: 0.62rem; color: var(--dim); letter-spacing: 0.1em; position: relative; z-index: 1; }
        .project-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.35rem;
          font-weight: 700;
          line-height: 1.2;
          color: var(--text);
          position: relative; z-index: 1;
        }
        .project-desc { color: #7a7068; font-size: 0.85rem; font-weight: 300; line-height: 1.65; flex: 1; position: relative; z-index: 1; }
        .project-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.4rem; position: relative; z-index: 1; }
        .project-tag {
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.06em;
          color: var(--accent);
          border: 1px solid rgba(212,168,83,0.25);
          border-radius: 999px;
          padding: 0.2rem 0.55rem;
        }
        .project-arrow {
          position: absolute;
          top: 2rem; right: 2rem;
          font-size: 0.85rem;
          color: var(--dim);
          transition: color 0.2s, transform 0.2s;
          z-index: 2;
        }
        .project-card:hover .project-arrow { color: var(--accent); transform: translate(2px, -2px); }

        /* CERTIFICATIONS */
        #certifications { background: var(--surface); }
        .certs-list { display: flex; flex-direction: column; }
        .cert-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.35rem 0;
          border-bottom: 1px solid var(--border);
          gap: 2rem;
          transition: padding-left 0.3s;
        }
        .cert-item:hover { padding-left: 0.75rem; }
        .cert-item:first-child { border-top: 1px solid var(--border); }
        .cert-title { font-size: 0.92rem; font-weight: 400; color: var(--text); flex: 1; }
        .cert-org { font-family: 'DM Mono', monospace; font-size: 0.65rem; color: var(--accent); letter-spacing: 0.08em; white-space: nowrap; }
        .cert-date { font-family: 'DM Mono', monospace; font-size: 0.65rem; color: var(--muted); white-space: nowrap; }

        /* PUBLICATIONS */
        .pubs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5px;
          background: var(--border);
          border: 1px solid var(--border);
          border-radius: 14px;
          overflow: hidden;
        }
        .pub-card {
          background: var(--bg);
          padding: 2.5rem;
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
          font-size: 1.25rem;
          font-weight: 700;
          line-height: 1.25;
          color: var(--text);
          margin-bottom: 1.25rem;
        }
        .pub-link { font-family: 'DM Mono', monospace; font-size: 0.65rem; color: var(--muted); letter-spacing: 0.08em; display: flex; align-items: center; gap: 0.5rem; }
        .pub-card:hover .pub-link { color: var(--text); }

        /* CONTACT */
        #contact { background: var(--surface); text-align: center; }
        .contact-inner { max-width: 620px; margin: 0 auto; }
        .contact-big {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
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
        .contact-sub { color: var(--muted); font-size: 0.9rem; font-weight: 300; margin-bottom: 2.5rem; line-height: 1.7; }
        .contact-links { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; }
        .contact-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border: 1px solid var(--dim);
          border-radius: 999px;
          font-family: 'DM Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          color: var(--muted);
          text-decoration: none;
          transition: all 0.2s;
        }
        .contact-chip:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }

        /* FOOTER */
        footer { padding: 2rem var(--pad); border-top: 1px solid var(--border); }
        footer .container { display: flex; justify-content: space-between; align-items: center; }
        footer p { font-family: 'DM Mono', monospace; font-size: 0.65rem; color: var(--dim); letter-spacing: 0.08em; }

        /* TABLET */
        @media (max-width: 1024px) {
          .about-grid { grid-template-columns: 1fr; gap: 2rem; }
          .hero-inner { gap: 2.5rem; }
          .hero-portrait { max-width: 300px; }
        }

        /* MOBILE */
        @media (max-width: 760px) {
          :root { --pad: 1.5rem; }
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
          .hero { padding: 6rem var(--pad) 4rem; min-height: auto; }
          .hero-inner { grid-template-columns: 1fr; gap: 2.5rem; }
          .hero-portrait { order: -1; max-width: 230px; justify-self: start; }
          .hero-stats { gap: 1.75rem; }
          section { padding: 4.5rem var(--pad); }
          .exp-item { grid-template-columns: 1fr; gap: 0.5rem; }
          .projects-grid { grid-template-columns: 1fr; }
          .pubs-grid { grid-template-columns: 1fr; }
          .cert-item { flex-direction: column; align-items: flex-start; gap: 0.4rem; }
          footer .container { flex-direction: column; gap: 0.5rem; text-align: center; }
        }

        /* REDUCED MOTION */
        @media (prefers-reduced-motion: reduce) {
          .aurora span, .exp-current, .hero-badge .dot { animation: none !important; }
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
        <div className="container">
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
        </div>
      </nav>

      {/* HERO */}
      <div className="hero">
        <div className="hero-grid" />
        <div className="container hero-inner">
          <div className="hero-left">
            <motion.div
              className="hero-number"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >01 / INTRODUCTION</motion.div>
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              Arjun Shoba<br /><span>Dileep</span>
            </motion.h1>
            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >AI Developer · LLM Engineer · ML Engineer</motion.p>
            <motion.p
              className="hero-desc"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              MSc Big Data Analytics graduate with 2+ years of developer experience. Specialising in scalable AI systems, ETL pipelines, and LLM-powered applications.
            </motion.p>
            <motion.div
              className="hero-cta"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Magnetic href="#projects" className="btn-primary">View Projects ↓</Magnetic>
              <Magnetic href="#contact" className="btn-ghost" strength={0.25}>Get in Touch →</Magnetic>
            </motion.div>
            <motion.div
              className="hero-stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
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

          <motion.div
            className="hero-portrait"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="img-wrap">
              <img src="/assets/images/profile.jpg" alt="Arjun Shoba Dileep" />
            </div>
            <div className="frame" />
            <span className="hero-badge"><span className="dot" />Available for work</span>
          </motion.div>
        </div>
      </div>

      {/* ABOUT */}
      <section id="about">
        <div className="container">
          <Reveal>
            <div className="section-label">02 / About</div>
            <h2 className="section-title">Who I Am</h2>
          </Reveal>
          <div className="about-grid">
            <Reveal delay={0.05}>
              <p className="about-lead">
                Engineering at the intersection of <em>rigorous data work</em> and <em>real-world AI impact</em>.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="about-text">
                <p>
                  I'm an AI/ML engineer and data professional based in the UK, with a Master's in Big Data Analytics. I bring production-grade instincts to every project — whether that's architecting a multi-agent LLM pipeline or building an executive-ready Power BI dashboard from millions of raw records.
                </p>
                <p>
                  My background spans Python development at Infosys, quality engineering at Amazon, and applied ML research published at IEEE.
                </p>
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
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience">
        <div className="container">
          <Reveal>
            <div className="section-label">03 / Experience</div>
            <h2 className="section-title">Where I've Worked</h2>
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
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="container">
          <Reveal>
            <div className="section-label">04 / Projects</div>
            <h2 className="section-title">Selected Work</h2>
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
                transition={{ duration: 0.6, delay: (i % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
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
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications">
        <div className="container">
          <Reveal>
            <div className="section-label">05 / Certifications</div>
            <h2 className="section-title">Licences & Credentials</h2>
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
        </div>
      </section>

      {/* PUBLICATIONS */}
      <section id="publications">
        <div className="container">
          <Reveal>
            <div className="section-label">06 / Publications</div>
            <h2 className="section-title">Research & Writing</h2>
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
        <div className="container">
          <p>© 2026 Arjun Shoba Dileep</p>
          <p>Built with Next.js · Tailwind · Framer Motion</p>
        </div>
      </footer>
    </>
  );
}
