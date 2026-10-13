"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, MotionConfig } from "framer-motion";
import {
  projects,
  otherProjects,
  experience,
  capabilities,
} from "@/data/portfolio";

const nav = [
  ["projects", "Work"],
  ["about", "About"],
  ["experience", "Experience"],
  ["contact", "Contact"],
];
const filters = ["All work", "Applied AI", "Data engineering", "Research"];
const cvPath = "/assets/documents/arjun-sd-cv-2026.pdf";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function ProjectVisual({ id }: { id: string }) {
  if (id === "voice")
    return (
      <div
        className="project-visual voice-visual"
        aria-label="Voice agent architecture illustration"
      >
        <div className="visual-top">
          <span>VOICE INTELLIGENCE</span>
          <span className="live-label">
            <i /> Audio pipeline
          </span>
        </div>
        <div className="waveform" aria-hidden="true">
          {Array.from({ length: 47 }, (_, i) => (
            <span
              key={i}
              style={
                {
                  "--bar": `${Math.round(14 + Math.abs(Math.sin(i * 1.79) * Math.cos(i * 0.27)) * 86)}%`,
                  "--delay": `${i * -0.09}s`,
                } as CSSProperties
              }
            />
          ))}
        </div>
        <div className="voice-route">
          <span>Listen</span>
          <span>Understand</span>
          <span>
            Respond <Arrow />
          </span>
        </div>
        <div className="visual-bottom">
          <span>Smartflo → Gemini Live → Voice</span>
          <span>01 / SYSTEM STUDY</span>
        </div>
      </div>
    );
  if (id === "pipeline")
    return (
      <div
        className="project-visual pipeline-visual"
        aria-label="Pipeline processing reduced from four hours to under twenty minutes"
      >
        <div className="visual-top">
          <span>DATA IN MOTION</span>
          <span>30,000+ records</span>
        </div>
        <div className="pipeline-chart">
          <div className="chart-row">
            <span>Before</span>
            <div className="bar-before" />
            <strong>4 hrs</strong>
          </div>
          <div className="chart-row">
            <span>After</span>
            <div className="bar-after" />
            <strong>&lt;20 min</strong>
          </div>
        </div>
        <div className="pipeline-nodes">
          <span>Extract</span>
          <b>→</b>
          <span>Queue</span>
          <b>→</b>
          <span>Sync</span>
        </div>
        <div className="visual-bottom">
          <span>Persistent. Resumable. Duplicate-safe.</span>
          <span>02 / SYSTEM STUDY</span>
        </div>
      </div>
    );
  if (id === "matching")
    return (
      <div
        className="project-visual matching-visual"
        aria-label="Resume matching architecture illustration"
      >
        <div className="visual-top">
          <span>RECRUITMENT INTELLIGENCE</span>
          <span>Hybrid matching</span>
        </div>
        <div className="match-flow">
          <div className="document-shape">
            <span>CV</span>
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="match-connector">→</div>
          <div className="match-core">
            AI<span>Extract + match</span>
          </div>
          <div className="match-connector">→</div>
          <div className="match-results">
            <span>✓ Skills</span>
            <span>✓ Experience</span>
            <span>✓ Eligibility</span>
          </div>
        </div>
        <div className="visual-bottom">
          <span>Context beyond keywords.</span>
          <span>03 / SYSTEM STUDY</span>
        </div>
      </div>
    );
  return (
    <div
      className="project-visual research-visual"
      aria-label="Illustration of human pose estimation keypoints"
    >
      <div className="visual-top">
        <span>COMPUTER VISION</span>
        <span>Pose → Classification</span>
      </div>
      <svg
        className="pose-art"
        viewBox="0 0 420 180"
        fill="none"
        aria-hidden="true"
      >
        <g stroke="currentColor" strokeWidth="2">
          <path d="M190 48 187 72 159 87 137 121 110 130M187 72 217 84 241 62 264 45M187 72 195 119 169 153 154 174M195 119 230 139 259 166" />
          <circle cx="191" cy="31" r="16" />
          {[
            [190, 48],
            [187, 72],
            [159, 87],
            [137, 121],
            [110, 130],
            [217, 84],
            [241, 62],
            [264, 45],
            [195, 119],
            [169, 153],
            [154, 174],
            [230, 139],
            [259, 166],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="4" fill="currentColor" />
          ))}
        </g>
        <path
          d="M92 18H72V160H92M285 18H305V160H285"
          stroke="currentColor"
          opacity=".3"
        />
        <text
          x="325"
          y="82"
          fill="currentColor"
          fontSize="12"
          fontFamily="monospace"
        >
          94.6%
        </text>
        <text
          x="325"
          y="100"
          fill="currentColor"
          fontSize="8"
          fontFamily="monospace"
        >
          ACCURACY
        </text>
      </svg>
      <div className="visual-bottom">
        <span>2D pose estimation + CNN</span>
        <span>04 / RESEARCH STUDY</span>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All work");
  const [selected, setSelected] = useState<(typeof projects)[number] | null>(
    null,
  );
  const [copyState, setCopyState] = useState("Copy email");
  const dialog = useRef<HTMLDialogElement>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            setActive(entry.target.id === "top" ? "" : entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -55% 0px" },
    );
    [["top"], ...nav].forEach(([id]) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => {
      observer.disconnect();
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);

  useEffect(() => {
    if (selected) {
      dialog.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.current?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText("arjunyash2@gmail.com");
      setCopyState("Email copied");
    } catch {
      setCopyState("Use the email link");
    }
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopyState("Copy email"), 3000);
  }

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Arjun SD, back to top">
          arjun<span>sd.</span>
          <span className="wordmark-star" aria-hidden="true">
            [ / ]
          </span>
        </a>
        <nav
          className={menuOpen ? "main-nav is-open" : "main-nav"}
          id="main-navigation"
          aria-label="Main navigation"
        >
          {nav.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? "active" : ""}
              aria-current={active === id ? "location" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
        <a className="nav-contact" href="mailto:arjunyash2@gmail.com">
          Let’s talk <Arrow />
        </a>
        <button
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "Close −" : "Menu +"}
        </button>
      </header>
      <main id="main">
        <section
          className="hero container"
          id="top"
          aria-labelledby="hero-title"
        >
          <div className="hero-eyebrow">
            <span>
              <i className="status-dot" /> AI DEVELOPER & PYTHON ENGINEER
            </span>
            <span>BASED IN KERALA, INDIA ↗</span>
          </div>
          <div className="hero-grid">
            <motion.div
              className="hero-copy"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 id="hero-title">
                AI systems.
                <br />
                <span className="accent-word">Built for reality.</span>
              </h1>
              <p className="hero-intro">
                I’m Arjun Shoba Dileep. I build AI that talks,
                <br className="desktop-break" /> data that moves, and software
                that works.
              </p>
              <div className="hero-actions">
                <a className="button primary-button" href="#projects">
                  Explore my work <span aria-hidden="true">↓</span>
                </a>
                <a className="text-link" href={cvPath} download>
                  Download CV <span aria-hidden="true">↘</span>
                </a>
              </div>
              <div className="hero-footnote">
                <span className="tiny-cross" aria-hidden="true">
                  +
                </span>
                <p>
                  Currently building applied AI
                  <br />
                  <strong>at GNX Digital Solutions</strong>
                </p>
              </div>
            </motion.div>
            <motion.figure
              className="portrait"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="portrait-image">
                <Image
                  src="/assets/images/profile.jpg"
                  alt="Arjun Shoba Dileep outdoors among bamboo trees"
                  fill
                  priority
                  sizes="(max-width: 700px) 90vw, 36vw"
                />
                <span className="portrait-corner" aria-hidden="true">
                  ↗
                </span>
                <span className="portrait-side">ARJUN S.D. / ENGINEER</span>
              </div>
              <figcaption>
                <span>Arjun S.D.</span>
                <span>Engineer. Researcher. Builder.</span>
              </figcaption>
            </motion.figure>
          </div>
          <div className="proof-strip">
            <p>
              A little context.
              <br />
              <strong>A lot of hands-on work.</strong>
            </p>
            <div>
              <strong>
                30K<span>+</span>
              </strong>
              <span>employee records synchronized</span>
            </div>
            <div>
              <strong>
                92<span>%</span>
              </strong>
              <span>faster HRMS processing</span>
            </div>
            <div>
              <strong>2</strong>
              <span>research publications</span>
            </div>
          </div>
        </section>

        <section className="work-section section-pad" id="projects">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">01 / SELECTED WORK</p>
                <h2>
                  Less theory.
                  <br />
                  <span className="accent-word">More shipped.</span>
                </h2>
              </div>
              <p>
                A selection of professional systems, independent builds, and
                published research. Built to solve something real.
              </p>
            </div>
            <div className="work-toolbar">
              <div
                className="filters"
                role="group"
                aria-label="Filter projects"
              >
                {filters.map((item) => (
                  <button
                    key={item}
                    aria-pressed={filter === item}
                    onClick={() => setFilter(item)}
                  >
                    {item}
                    {item === "All work" && <span>04</span>}
                  </button>
                ))}
              </div>
              <span className="work-count" aria-live="polite">
                {String(
                  projects.filter(
                    (p) => filter === "All work" || p.category === filter,
                  ).length,
                ).padStart(2, "0")}{" "}
                projects
              </span>
            </div>
            <div className="projects-grid">
              {projects
                .filter((p) => filter === "All work" || p.category === filter)
                .map((p) => (
                  <article className="project" key={p.id}>
                    <button
                      className="project-open"
                      onClick={() => setSelected(p)}
                      aria-label={`Read case study: ${p.shortTitle}`}
                    >
                      <ProjectVisual id={p.id} />
                      <span className="project-open-label">
                        Explore project <Arrow />
                      </span>
                    </button>
                    <div className="project-meta">
                      <span>{p.context}</span>
                      <span>{p.number}</span>
                    </div>
                    <button
                      className="project-title-button"
                      onClick={() => setSelected(p)}
                    >
                      <h3>{p.title}</h3>
                      <Arrow />
                    </button>
                    <p className="project-description">{p.description}</p>
                    <div className="tags">
                      {p.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </article>
                ))}
            </div>
            <div className="more-work">
              <h3>
                Also on my workbench<span> / More projects</span>
              </h3>
              {otherProjects.map((p) => (
                <div className="more-work-row" key={p.title}>
                  <span className="more-work-type">{p.type}</span>
                  <div>
                    <h4>{p.title}</h4>
                    <p>{p.description}</p>
                  </div>
                  {p.link ? (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${p.label}: ${p.title}`}
                    >
                      <Arrow />
                    </a>
                  ) : (
                    <a
                      href={`mailto:arjunyash2@gmail.com?subject=${encodeURIComponent(`Tell me about ${p.title}`)}`}
                      aria-label={`Ask about ${p.title}`}
                    >
                      <Arrow />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="about-section section-pad container" id="about">
          <div className="about-grid">
            <div>
              <p className="eyebrow">02 / THE WAY I THINK</p>
              <h2>
                Curious by nature.
                <br />
                <span className="accent-word">Engineer by practice.</span>
              </h2>
              <div className="about-note">
                <span aria-hidden="true">[ / ]</span>
                <p>
                  Good engineering starts with
                  <br />a better question.
                </p>
              </div>
            </div>
            <div className="about-copy">
              <p className="large-copy">
                The interesting part isn’t just making a model work. It’s making
                it work for people.
              </p>
              <p>
                My work sits between applied AI, data engineering, and the
                practical details of shipping software. That means everything
                from helping a voice agent handle interruptions to making sure
                30,000 employee records arrive intact.
              </p>
              <p>
                I hold a First-Class MSc in Big Data Analytics from Sheffield
                Hallam University. My path has taken me through enterprise data
                at Infosys, analytics in UK service operations, and now
                production AI in Kochi.
              </p>
              <div className="education">
                <span>2022 — 2023</span>
                <strong>MSc, Big Data Analytics</strong>
                <p>Sheffield Hallam University · First Class</p>
                <span>2017 — 2021</span>
                <strong>B.Tech, Computer Science & Engineering</strong>
                <p>APJ Abdul Kalam Technological University</p>
              </div>
            </div>
          </div>
          <div className="capability-grid">
            {capabilities.map((c) => (
              <article key={c.number}>
                <span className="eyebrow">{c.number} /</span>
                <h3>{c.title}</h3>
                <p>{c.description}</p>
                <div>{c.tools}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="experience-section section-pad" id="experience">
          <div className="container experience-grid">
            <div className="experience-heading">
              <p className="eyebrow">03 / THE JOURNEY</p>
              <h2>
                Built on
                <br />
                <span className="accent-word">experience.</span>
              </h2>
              <a className="text-link" href={cvPath} download>
                Get the full CV <span aria-hidden="true">↘</span>
              </a>
            </div>
            <div className="experience-list">
              {experience.map((e, i) => (
                <details
                  className="experience-item"
                  key={e.company}
                  open={i === 0 ? true : undefined}
                >
                  <summary>
                    <span className="experience-period">
                      {e.period}
                      {i === 0 && <i className="status-dot" />}
                    </span>
                    <span className="experience-company">{e.company}</span>
                    <span className="experience-role">{e.role}</span>
                    <span className="expand-icon" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <div className="experience-detail">
                    <span>{e.location}</span>
                    <p>{e.description}</p>
                    <p>{e.details}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section
          className="research-section section-pad container"
          id="publications"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">04 / BEYOND THE BUILD</p>
              <h2>
                Research that
                <br />
                <span className="accent-word">leaves the notebook.</span>
              </h2>
            </div>
            <p>
              Exploring how we understand human activity, academic outcomes, and
              the patterns hiding in data.
            </p>
          </div>
          <div className="publications">
            <a
              href="https://doi.org/10.1109/WiSPNET54241.2022.9767152"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="publication-index">01</span>
              <div>
                <span className="eyebrow">IEEE WiSPNET / 2022</span>
                <h3>
                  Suspicious human activity recognition using 2D pose estimation
                  and convolutional neural network
                </h3>
                <span className="publication-kind">Conference paper</span>
              </div>
              <Arrow />
            </a>
            <a
              href="https://www.amazon.co.uk/Educations-Hidden-Drivers-Comprehensive-Universities/dp/6208444330"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="publication-index">02</span>
              <div>
                <span className="eyebrow">
                  LAP LAMBERT ACADEMIC PUBLISHING / 2025
                </span>
                <h3>
                  Education’s Hidden Drivers: A Comprehensive Study of Academic
                  Performance Drivers in English Universities
                </h3>
                <span className="publication-kind">Co-authored book</span>
              </div>
              <Arrow />
            </a>
          </div>
          <div className="credentials" id="certifications">
            <p className="eyebrow">CLOUD CREDENTIALS</p>
            <div>
              <strong>AWS Certified Cloud Practitioner</strong>
              <span>2024 · Valid through April 2027</span>
            </div>
            <div>
              <strong>Microsoft Azure Fundamentals</strong>
              <span>AZ-900 · 2022</span>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="container">
            <div className="contact-top">
              <p className="eyebrow">05 / WHAT’S NEXT?</p>
              <span>GOOD WORK STARTS WITH A CONVERSATION</span>
            </div>
            <div className="contact-main">
              <h2>
                Something in mind?
                <br />
                <span className="accent-word">Let’s build it.</span>
              </h2>
              <a
                className="contact-arrow"
                href="mailto:arjunyash2@gmail.com"
                aria-label="Email Arjun"
              >
                <Arrow />
              </a>
            </div>
            <div className="contact-bottom">
              <div>
                <a className="email-link" href="mailto:arjunyash2@gmail.com">
                  arjunyash2@gmail.com
                </a>
                <button
                  className="copy-email"
                  onClick={copyEmail}
                  aria-live="polite"
                >
                  {copyState} <span aria-hidden="true">⧉</span>
                </button>
              </div>
              <p>
                AI engineering opportunities, thoughtful collaborations,
                <br />
                or a good technical conversation. My inbox is open.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="container site-footer">
        <a className="wordmark" href="#top">
          arjun<span>sd.</span>
        </a>
        <span>© {new Date().getFullYear()} Arjun Shoba Dileep</span>
        <div>
          <a
            href="https://github.com/arjunyash2"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <Arrow />
          </a>
          <a
            href="https://linkedin.com/in/arjunsdileep"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn <Arrow />
          </a>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
      <dialog
        className="case-dialog"
        ref={dialog}
        aria-labelledby="case-title"
        onCancel={() => setSelected(null)}
        onClose={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setSelected(null);
        }}
      >
        {selected && (
          <div className="case-inner">
            <div className="case-header">
              <span className="eyebrow">
                PROJECT {selected.number} / {selected.category}
              </span>
              <button
                autoFocus
                onClick={() => setSelected(null)}
                aria-label="Close case study"
              >
                Close ×
              </button>
            </div>
            <p className="case-context">{selected.context}</p>
            <h2 id="case-title">{selected.shortTitle}</h2>
            <div className="case-metric">
              <strong>{selected.metric}</strong>
              <span>{selected.metricLabel}</span>
            </div>
            <div className="case-content">
              <section>
                <h3>The challenge</h3>
                <p>{selected.challenge}</p>
              </section>
              <section>
                <h3>The engineering</h3>
                <p>{selected.approach}</p>
              </section>
              <section>
                <h3>The outcome</h3>
                <p>{selected.result}</p>
              </section>
            </div>
            <div className="tags">
              {selected.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="case-footer">
              {selected.link ? (
                <a
                  className="button primary-button"
                  href={selected.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {selected.linkLabel} <Arrow />
                </a>
              ) : (
                <>
                  <p>
                    Professional work · Summary based on my contribution.
                    <br />
                    Source code and internal systems are not public.
                  </p>
                  <a
                    className="text-link"
                    href={`mailto:arjunyash2@gmail.com?subject=${encodeURIComponent(`Let's discuss ${selected.shortTitle}`)}`}
                  >
                    Let’s discuss the work <Arrow />
                  </a>
                </>
              )}
            </div>
          </div>
        )}
      </dialog>
    </MotionConfig>
  );
}
