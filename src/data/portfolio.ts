export const projects = [
  {
    id: "voice",
    number: "01",
    category: "Applied AI",
    context: "GNX Digital Solutions · Professional work",
    title: "A voice agent that listens. And understands.",
    shortTitle: "Conversational voice AI",
    description:
      "Real-time, multilingual conversations built for the realities of a phone call: interruptions, background noise, and human intent.",
    metric: "Real-time",
    metricLabel: "multilingual voice interactions",
    tags: ["Google ADK", "Gemini Live API", "Python", "Docker"],
    challenge:
      "Build a conversational telephony agent that can handle natural interruptions and reliably capture candidate intent.",
    approach:
      "Integrated Tata Smartflo with Google ADK and Gemini native audio. Tuned voice activity detection, custom barge-in handling, audio resampling, and echo cancellation. Added a second agent to review transcripts and identify interested candidates missed during the live call.",
    result:
      "Delivered a Docker-deployed voice workflow with automated CI/CD, more consistent call outcomes, and fixes for conflicting submissions and call-record synchronization race conditions.",
  },
  {
    id: "pipeline",
    number: "02",
    category: "Data engineering",
    context: "GNX Digital Solutions · Professional work",
    title: "Four hours of data work. Done in minutes.",
    shortTitle: "Distributed HRMS pipeline",
    description:
      "A fault-tolerant pipeline that migrates and synchronizes employee data, with recovery built into every batch.",
    metric: "92%",
    metricLabel: "less processing time",
    tags: ["PostgreSQL", "Celery", "RabbitMQ", "Redis"],
    challenge:
      "Replace a legacy synchronization process that took four hours to move more than 30,000 employee records.",
    approach:
      "Rebuilt the ETL architecture in Python and PostgreSQL. Used Celery, RabbitMQ, and Redis for asynchronous processing, persistent messaging, retries, lost-chunk recovery, and connection pooling. Added resumable, duplicate-safe bulk uploads.",
    result:
      "Reduced synchronization time from four hours to under 20 minutes while supporting configurable concurrency and recovery from interrupted jobs.",
  },
  {
    id: "matching",
    number: "03",
    category: "Applied AI",
    context: "GNX Digital Solutions · Professional work",
    title: "From a stack of CVs to a stronger match.",
    shortTitle: "Intelligent recruitment",
    description:
      "Structured resume extraction meets hybrid recommendations, with eligibility, experience, and skills in the loop.",
    metric: "18–20s",
    metricLabel: "average CV processing time",
    tags: ["Vertex AI", "FastAPI", "pgvector", "OCR"],
    challenge:
      "Extract dependable candidate data from varied resume formats, then match candidates to relevant jobs without overlooking eligibility requirements.",
    approach:
      "Built a Gemini-powered parsing service using FastAPI, OCR, and PostgreSQL. Combined CV and job-description embeddings with cosine similarity, skills matching, experience scoring, and eligibility filters.",
    result:
      "Reduced average CV processing from approximately 38–50 seconds to 18–20 seconds. Improved matching across education, experience, and technical skills.",
  },
  {
    id: "research",
    number: "04",
    category: "Research",
    context: "IEEE WiSPNET 2022 · Published research",
    title: "Understanding movement through machine learning.",
    shortTitle: "Human activity recognition",
    description:
      "Combining 2D pose estimation and convolutional neural networks to classify suspicious human activity.",
    metric: "94.6%",
    metricLabel: "classification accuracy",
    tags: ["TensorFlow", "OpenCV", "Python", "CNN"],
    challenge:
      "Explore whether pose-based features and deep learning can improve human activity classification over traditional motion-based approaches.",
    approach:
      "Designed a convolutional neural network integrated with 2D pose estimation. Built the research pipeline in Python using OpenCV, TensorFlow/Keras, and Matplotlib.",
    result:
      "Achieved 94.6% classification accuracy in the research evaluation. The work was published at IEEE WiSPNET 2022.",
    link: "https://doi.org/10.1109/WiSPNET54241.2022.9767152",
    linkLabel: "Read the paper",
  },
];

export const otherProjects = [
  {
    title: "HireIndia",
    type: "Independent product",
    description: "A job aggregation platform with resume-based ATS matching.",
    link: "https://hire-india.vercel.app/",
    label: "Visit project",
  },
  {
    title: "Student attainment",
    type: "Data analytics · 2M+ records",
    description:
      "Python analysis and Power BI dashboards exploring the drivers of UK student outcomes.",
    link: "https://github.com/arjunyash2/unistats",
    label: "View repository",
  },
  {
    title: "Crime & real estate",
    type: "Data engineering · 30M+ records",
    description:
      "An ETL and analytics project connecting crime, property values, and demographics.",
    link: "https://github.com/arjunyash2/crimeRateRealestate",
    label: "View repository",
  },
  {
    title: "CodeDoc AI",
    type: "Developer tooling",
    description:
      "An LLM documentation assistant with structured Markdown output and an evaluation workflow.",
  },
  {
    title: "ScamGuardAI",
    type: "Applied machine learning",
    description:
      "Hybrid ML and LLM email fraud triage with explained risk scores and an ML-only fallback.",
  },
];

export const experience = [
  {
    company: "GNX Digital Solutions",
    role: "AI Developer",
    period: "May 2026 — Present",
    location: "Kochi, India",
    description:
      "Building conversational voice AI, intelligent recruitment systems, and resilient data infrastructure.",
    details:
      "Own implementation across real-time audio, LLM extraction, hybrid recommendations, and distributed ETL. Ship containerized services with automated CI/CD and focus on recovery, correctness, and production performance.",
  },
  {
    company: "Zecser Business LLP",
    role: "AI Developer Intern",
    period: "Apr — May 2026",
    location: "Kochi, India",
    description: "Built the foundations for AI-powered recruitment services.",
    details:
      "Developed FastAPI services, a PDF/DOCX extraction engine with layout detection and confidence scoring, versioned candidate schemas, pytest coverage, and AI-powered video screening.",
  },
  {
    company: "Capita PLC",
    role: "Customer Service Advisor",
    period: "Feb 2025 — Jan 2026",
    location: "Coventry, UK",
    description: "Brought analytics and data quality into service operations.",
    details:
      "Built Power BI reporting for ticket metrics and SLA monitoring. Assisted with Python/SQL data checks and worked with service leads to define traceable, clearly documented KPIs.",
  },
  {
    company: "Infosys",
    role: "Python Developer",
    period: "Jul 2021 — Sep 2022",
    location: "Kerala, India",
    description:
      "Enterprise data engineering, from development to production support.",
    details:
      "Developed ETL workflows and Teradata/Snowflake SQL, automated loading and validation, and supported production through Control-M and UNIX. Added operational monitoring, root-cause fixes, and documentation.",
  },
];

export const capabilities = [
  {
    number: "01",
    title: "Applied AI",
    description: "Models connected to useful, dependable products.",
    tools: "Gemini · LangChain · LangGraph · RAG · TensorFlow",
  },
  {
    number: "02",
    title: "Data systems",
    description: "Reliable data, from source to decision.",
    tools: "Python · SQL · PostgreSQL · Snowflake · Power BI",
  },
  {
    number: "03",
    title: "Production engineering",
    description: "Services designed to ship, recover, and scale.",
    tools: "FastAPI · Docker · Celery · Redis · CI/CD · pytest",
  },
];
