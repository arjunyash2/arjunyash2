"use client";

import { Github, Linkedin, Mail, BookOpen, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-100 text-gray-900">
      {/* Hero Section */}
      <header className="text-center py-20 bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md">
        <div className="relative w-40 h-40 mx-auto mb-6">
          <motion.img
            src="/profile.jpg" // replace with your profile photo path
            alt="Arjun S.D"
            className="w-40 h-40 rounded-full border-4 border-white shadow-xl cursor-pointer"
            whileHover={{ scale: 1.1 }}
          />
          <a
            href="https://www.amazon.com/dp/YOUR-BOOK-LINK" // replace with your book link
            target="_blank"
            rel="noreferrer"
            className="absolute inset-0 rounded-full"
          >
            <span className="sr-only">View Book</span>
          </a>
        </div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold mb-3"
        >
          Arjun S.D
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg max-w-xl mx-auto"
        >
          Prompt Engineer | LLM Engineer | Machine Learning Engineer
        </motion.p>
        <div className="flex justify-center gap-6 mt-6">
          <a aria-label="Email" href="mailto:arjunyash2@gmail.com" className="hover:scale-110 transition-transform"><Mail className="w-7 h-7" /></a>
          <a aria-label="LinkedIn" href="https://www.linkedin.com/in/arjunsdileep/" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform"><Linkedin className="w-7 h-7" /></a>
          <a aria-label="GitHub" href="https://github.com/your-username" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform"><Github className="w-7 h-7" /></a>
          <a aria-label="Book" href="https://www.amazon.com/dp/YOUR-BOOK-LINK" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform"><BookOpen className="w-7 h-7" /></a>
        </div>
      </header>

      {/* Summary */}
      <section className="max-w-4xl mx-auto py-16 px-6 text-center">
        <motion.h2 className="text-3xl font-semibold mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>About Me</motion.h2>
        <motion.p
          className="text-lg text-gray-700 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          I am a Prompt Engineer and ML Engineer passionate about building intelligent systems powered by LLMs and deep learning. With expertise in Python, SQL, and cloud platforms, I design scalable pipelines, develop AI-driven solutions, and craft optimized prompts to unlock the full potential of large language models. My goal is to merge creativity with engineering to build impactful, real-world AI applications.
        </motion.p>
      </section>

      {/* Experience */}
      <section className="bg-gradient-to-r from-indigo-100 to-purple-100 py-16 px-6">
        <h2 className="text-3xl font-semibold mb-10 text-center">Experience</h2>
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
              className="rounded-2xl shadow-lg bg-white p-8 hover:shadow-2xl transition-shadow"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="font-bold text-xl text-indigo-700">{job.role}</h3>
              <p className="text-gray-600">{job.company} | {job.date}</p>
              <p className="mt-3 text-gray-700">{job.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-semibold mb-10 text-center">Projects</h2>
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
              className="rounded-2xl shadow-lg bg-white p-8 hover:shadow-2xl transition-shadow"
              whileHover={{ scale: 1.03 }}
            >
              <h3 className="font-bold text-xl text-purple-700">{proj.title}</h3>
              <p className="mt-3 text-gray-700">{proj.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Publications */}
      <section className="bg-gradient-to-r from-indigo-50 to-purple-50 py-16 px-6">
        <h2 className="text-3xl font-semibold mb-10 text-center">Publications</h2>
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
              link: "https://www.amazon.com/dp/YOUR-BOOK-LINK",
            },
          ].map((pub, idx) => (
            <motion.a
              key={idx}
              href={pub.link}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl shadow-lg bg-white p-6 flex items-start gap-4 hover:shadow-2xl transition-shadow hover:scale-[1.02]"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex-1">
                <h3 className="font-bold text-lg text-indigo-700">{pub.title}</h3>
                <p className="text-gray-600">{pub.source}</p>
              </div>
              <ExternalLink className="w-5 h-5 text-indigo-500 mt-1" />
            </motion.a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-600 text-sm bg-white shadow-inner">
        © {new Date().getFullYear()} Arjun
      </footer>
    </main>
  );
}
