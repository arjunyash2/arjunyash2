import { Github, Linkedin, Mail } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <header className="text-center py-16 bg-white shadow-md">
        <h1 className="text-4xl font-bold mb-2">Arjun S.D</h1>
        <p className="text-lg text-gray-600">Data Analyst | Developer | Researcher</p>
        <div className="flex justify-center gap-4 mt-4">
          <a aria-label="Email" href="mailto:arjunyash2@gmail.com"><Mail className="w-6 h-6" /></a>
          <a aria-label="LinkedIn" href="https://www.linkedin.com/in/arjunsdileep/" target="_blank" rel="noreferrer"><Linkedin className="w-6 h-6" /></a>
          {/* Optional: replace with your real GitHub URL */}
          {/* <a aria-label="GitHub" href="https://github.com/your-username" target="_blank" rel="noreferrer"><Github className="w-6 h-6" /></a> */}
        </div>
      </header>

      {/* Summary */}
      <section className="max-w-4xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-semibold mb-4">About Me</h2>
        <p>
          MSc in Big Data Analytics (1st Class) from Sheffield Hallam University with 2+ years of
          experience in developer and data roles. Proficient in SQL, Python (NumPy, Pandas, SciPy),
          cloud technologies, predictive modelling, A/B testing, and real-time dashboards.
        </p>
      </section>

      {/* Experience */}
      <section className="bg-gray-100 py-12 px-4">
        <h2 className="text-2xl font-semibold mb-8 text-center">Experience</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {[
            {
              role: "Data Processor",
              company: "Capita PLC",
              date: "Feb 2025 – Present",
              desc: "Resolved data deviation by efficiently managing support tickets, achieving 95% accuracy."
            },
            {
              role: "Team Leader",
              company: "KFC QFM Group",
              date: "Oct 2022 – Sep 2024",
              desc: "Optimised staff scheduling reducing inefficiencies by 15% and waste by 10%."
            },
            {
              role: "IT Assistant / Quality Associate",
              company: "Amazon",
              date: "Nov 2023 – Feb 2024",
              desc: "Improved workflow efficiency by 24% through IT error resolution."
            },
            {
              role: "Python Developer",
              company: "Infosys",
              date: "Jul 2021 – Sep 2022",
              desc: "Built ETL pipelines, migrated 1TB+ data to Snowflake, improved reporting speed by 40%."
            }
          ].map((job, idx) => (
            <div key={idx} className="rounded-2xl shadow-md bg-white p-6">
              <h3 className="font-bold text-lg">{job.role}</h3>
              <p className="text-gray-600">{job.company} | {job.date}</p>
              <p className="mt-2 text-sm text-gray-700">{job.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="max-w-5xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-semibold mb-8 text-center">Projects</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Student Attainment Dashboard",
              desc: "Processed 2M+ records in Python, built Power BI dashboards for UK student performance.",
            },
            {
              title: "Real Estate & Crime Analysis",
              desc: "Built ETL pipelines integrating 30M+ records, visualized insights with R & Tableau.",
            },
            {
              title: "Suspicious Human Activity Recognition",
              desc: "CNN + Pose Estimation for surveillance, achieving 94.6% accuracy (IEEE published).",
            }
          ].map((proj, idx) => (
            <div key={idx} className="rounded-2xl shadow-md bg-white p-6">
              <h3 className="font-bold text-lg">{proj.title}</h3>
              <p className="mt-2 text-sm text-gray-700">{proj.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Publications */}
      <section className="bg-gray-100 py-12 px-4">
        <h2 className="text-2xl font-semibold mb-8 text-center">Publications</h2>
        <ul className="list-disc list-inside max-w-3xl mx-auto text-gray-700">
          <li>
            Suspicious Human Activity Recognition using 2D Pose Estimation and CNN, IEEE WiSPNET 2022
          </li>
          <li>
            Book: Education's Hidden Drivers – LAP Lambert Academic Publishing (2025)
          </li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-500 text-sm">
        © {new Date().getFullYear()} Arjun S.D | Built with Next.js & Tailwind
      </footer>
    </main>
  );
}
