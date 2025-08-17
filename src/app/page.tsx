"use client";

import { Github, Linkedin, Mail, BookOpen, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "Arjun S.D";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-black text-gray-100 relative overflow-hidden">
      {/* Geeky animated SVG background */}
      <div className="absolute inset-0 z-0">
        <svg className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#6366f1", stopOpacity: 0.6 }} />
              <stop offset="100%" style={{ stopColor: "#9333ea", stopOpacity: 0.6 }} />
            </linearGradient>
          </defs>
          <g stroke="url(#grad)" strokeWidth="0.5">
            {Array.from({ length: 60 }).map((_, i) => (
              <circle
                key={i}
                cx={Math.random() * 1600}
                cy={Math.random() * 900}
                r={Math.random() * 2 + 1}
                fill="url(#grad)"
              >
                <animate
                  attributeName="cy"
                  values="0;900"
                  dur={`${5 + Math.random() * 10}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="cx"
                  values={`0;${1600}`}
                  dur={`${8 + Math.random() * 12}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
          </g>
        </svg>
      </div>

      {/* Hero Section */}
      <header className="relative text-center py-24 z-10">
        <div className="relative w-56 h-56 mx-auto mb-6">
          <motion.img
            src="/assets/images/profile_1.JPG"
            alt="Arjun S.D"
            className="w-56 h-56 rounded-full border-4 border-indigo-400 shadow-2xl cursor-pointer object-cover"
            whileHover={{ scale: 1.08 }}
          />
          <a
            href="https://www.amazon.co.uk/Educations-Hidden-Drivers-Comprehensive-Universities/dp/6208444330"
            target="_blank"
            rel="noreferrer"
            className="absolute inset-0 rounded-full"
          >
            <span className="sr-only">View Book</span>
          </a>
        </div>

        {/* Typing animation with blinking cursor */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-6xl font-extrabold mb-4 font-mono text-indigo-400 whitespace-nowrap"
        >
          {displayedText}
          <span className="blinking-cursor">_</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg max-w-xl mx-auto text-gray-300"
        >
          Prompt Engineer | LLM Engineer | Machine Learning Engineer
        </motion.p>

        <div className="flex justify-center gap-6 mt-6">
          <a aria-label="Email" href="mailto:arjunyash2@gmail.com" className="hover:scale-125 transition-transform"><Mail className="w-8 h-8 text-indigo-300" /></a>
          <a aria-label="LinkedIn" href="https://www.linkedin.com/in/arjunsdileep/" target="_blank" rel="noreferrer" className="hover:scale-125 transition-transform"><Linkedin className="w-8 h-8 text-indigo-300" /></a>
          <a aria-label="GitHub" href="https://github.com/your-username" target="_blank" rel="noreferrer" className="hover:scale-125 transition-transform"><Github className="w-8 h-8 text-indigo-300" /></a>
          <a aria-label="Book" href="https://www.amazon.co.uk/Educations-Hidden-Drivers-Comprehensive-Universities/dp/6208444330" target="_blank" rel="noreferrer" className="hover:scale-125 transition-transform"><BookOpen className="w-8 h-8 text-indigo-300" /></a>
        </div>
      </header>

      {/* Summary */}
      <section className="relative z-10 max-w-4xl mx-auto py-16 px-6 text-center">
        <motion.h2 className="text-3xl font-semibold mb-6 text-indigo-300" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>About Me</motion.h2>
        <motion.p
          className="text-lg text-gray-300 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          I am a Prompt Engineer and ML Engineer passionate about building intelligent systems powered by LLMs and deep learning. With expertise in Python, SQL, and cloud platforms, I design scalable pipelines, develop AI-driven solutions, and craft optimized prompts to unlock the full potential of large language models. My goal is to merge creativity with engineering to build impactful, real-world AI applications.
        </motion.p>
      </section>

      {/* Experience */}
      <section className="relative z-10 bg-gray-900/60 py-16 px-6">
        <h2 className="text-3xl font-semibold mb-10 text-center text-indigo-300">Experience</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {[
            {
              role: "Data Processor",
              company: "Capita PLC",
              date: "Feb 2025 – Present",
              desc: "Managed support tickets with 95%+ accuracy, driving data quality improvements.",
            },
            {
              role: "Python Developer",
              company: "Infosys",
              date: "Jul 2021 – Sep 2022",
              desc: "Built ETL pipelines and migrated 1TB+ data to Snowflake, boosting reporting speed.",
            },
            {
              role: "IT Assistant / Quality Associate",
              company: "Amazon",
              date: "Nov 2023 – Feb 2024",
              desc: "Enhanced workflow efficiency by 24% with IT error resolution and quality analysis.",
            },
            {
              role: "Team Leader",
              company: "KFC QFM Group",
              date: "Oct 2022 – Sep 2024",
              desc: "Reduced inefficiencies by 15% and minimized waste by 10% using data-driven insights.",
            },
          ].map((job, idx) => (
            <motion.div
              key={idx}
              className="rounded-2xl shadow-lg bg-gray-800/90 p-8 hover:shadow-2xl transition-shadow"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="font-bold text-xl text-indigo-400">{job.role}</h3>
              <p className="text-gray-400">{job.company} | {job.date}</p>
              <p className="mt-3 text-gray-300">{job.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="relative z-10 max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-semibold mb-10 text-center text-indigo-300">Projects</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Student Attainment Dashboard",
              desc: "Processed 2M+ records in Python and built Power BI dashboards for academic planning.",
            },
            {
              title: "Real Estate & Crime Analysis",
              desc: "Integrated 30M+ records using ETL pipelines and visualized insights with R & Tableau.",
            },
            {
              title: "Suspicious Human Activity Recognition",
              desc: "Developed CNN + Pose Estimation achieving 94.6% accuracy, published in IEEE.",
            },
          ].map((proj, idx) => (
            <motion.div
              key={idx}
              className="rounded-2xl shadow-lg bg-gray-800/90 p-8 hover:shadow-2xl transition-shadow"
              whileHover={{ scale: 1.03 }}
            >
              <h3 className="font-bold text-xl text-purple-300">{proj.title}</h3>
              <p className="mt-3 text-gray-300">{proj.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Publications */}
      <section className="relative z-10 bg-gray-900/60 py-16 px-6">
        <h2 className="text-3xl font-semibold mb-10 text-center text-indigo-300">Publications</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {[
            {
              title: "Suspicious Human Activity Recognition using 2D Pose Estimation and CNN",
              source: "IEEE WiSPNET 2022",
              link: "https://doi.org/10.1109/WiSPNET54241.2022.9767152",
            },
            {
              title: "Education&apos;s Hidden Drivers – A Comprehensive Study",
              source: "LAP Lambert Academic Publishing (2025)",
              link: "https://www.amazon.co.uk/Educations-Hidden-Drivers-Comprehensive-Universities/dp/6208444330",
            },
          ].map((pub, idx) => (
            <motion.a
              key={idx}
              href={pub.link}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl shadow-lg bg-gray-800/90 p-6 flex items-start gap-4 hover:shadow-2xl transition-shadow hover:scale-[1.02]"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex-1">
                <h3 className="font-bold text-lg text-indigo-300">{pub.title}</h3>
                <p className="text-gray-400">{pub.source}</p>
              </div>
              <ExternalLink className="w-5 h-5 text-indigo-400 mt-1" />
            </motion.a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-gray-400 text-sm bg-black/70 shadow-inner">
        © {new Date().getFullYear()} Arjun | Built with Next.js, Tailwind & Framer Motion
      </footer>

      {/* Blinking cursor CSS */}
      <style jsx>{`
        .blinking-cursor {
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          from, to { opacity: 0 }
          50% { opacity: 1 }
        }
      `}</style>
    </main>
  );
}
