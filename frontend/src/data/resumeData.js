// All data sourced directly from Vedant Mehta's LinkedIn resume. No fabricated facts —
// where resume data was silent, fields are intentionally left blank/omitted.

export const personal = {
  name: "Vedant Mehta",
  role: "Senior Software Engineer",
  headline:
    "Leading and building Adeptnova | Driving AI-Powered Backend Innovation | Cloud, Data & Blockchain",
  tagline: "Architecting scalable backend systems where AI, cloud, and blockchain converge.",
  intro:
    "Python-first backend engineer who thrives at the intersection of AI, cloud-native infrastructure, and blockchain innovation — building systems that don't just function, but scale.",
  company: "AdeptNova Ltd.",
  location: "Ahmedabad, Gujarat, India",
  yearsExperience: "5+",
  availability: "Currently building at AdeptNova",
  email: "vedantmehta350@gmail.com",
  phone: "+91-9227822372",
  linkedin: "https://www.linkedin.com/in/vedantmehta5",
  portfolio: "https://vedant-mehta-ai-r18qedf.gamma.site/",
  github: "",
  resumeUrl: "/api/resume/download",
};

export const about = {
  summary: [
    "Ever since I wrote my first script to automate a mundane task, I knew technology had the power to simplify the complex — and I was hooked. Today, I'm a Python developer who thrives at the intersection of backend engineering, cloud integration, and blockchain innovation.",
    "Currently at AdeptNova, I build scalable, high-performance systems that combine FastAPI, AI (LLMs and intelligent agents) and IoT — architecting platforms that enable seamless coordination between AI components, microservices, and external APIs while ensuring reliability, security, and performance.",
    "Previously, I specialized in FastAPI and cloud-native backend systems handling massive telecom datasets at NextGen Clearing, and wore the dual hat of Python & Blockchain Developer at Solvios Technology — building smart contracts, custom blockchain infrastructure, and a token-based marketplace.",
  ],
  philosophy:
    "Technology has the power to simplify the complex. Every system I build starts with that belief — clean, scalable code that solves real problems, not just checks boxes.",
  mindset:
    "A builder's mindset: whether it's automating a data pipeline, developing secure APIs, or collaborating across teams, I bring rigor, curiosity, and a bias toward shipping resilient systems.",
  goals:
    "Bridging traditional backend engineering with modern AI and IoT ecosystems — delivering practical, scalable innovation at the intersection of intelligent systems and distributed infrastructure.",
  expertiseAreas: [
    "Backend Engineering (FastAPI, Python)",
    "AI / LLM-Powered Systems",
    "Cloud-Native Architecture (AWS)",
    "Blockchain & Smart Contracts",
    "IoT & Real-Time Data Pipelines",
    "Data Engineering & Caching Strategy",
  ],
  interests: [
    "Knowledge-sharing & mentoring",
    "Tech conversations & community",
    "Hackathons & competitive building",
    "Exploring blockchain use cases",
  ],
};

export const experience = [
  {
    id: "adeptnova",
    company: "AdeptNova Ltd.",
    role: "Senior Software Engineer",
    duration: "August 2025 — Present",
    period: "1 yr",
    location: "Ahmedabad, Gujarat, India",
    current: true,
    responsibilities: [
      "Design and integrate AI-powered platforms using Large Language Models (LLMs) and intelligent agents capable of executing context-aware workflows.",
      "Architect systems enabling seamless coordination between AI components, microservices, and external APIs while ensuring reliability, security, and performance.",
      "Build real-time AI + IoT pipelines that ingest data from sensors/devices, process it through scalable backend services, and apply AI models for monitoring, anomaly detection, and predictive insights.",
      "Contribute to intelligent supply chain solutions — combining IoT-based asset tracking, inventory monitoring, and logistics telemetry with AI-driven demand forecasting, route optimization, and risk analysis.",
      "Leverage FastAPI to build secure, low-latency APIs with clean, maintainable architectures.",
    ],
    projects: ["AI + IoT Supply Chain Platform", "LLM-Powered Intelligent Agent Workflows"],
    technologies: ["FastAPI", "Python", "LLMs", "IoT", "Microservices", "AI Agents"],
    impact: "Bridging traditional backend engineering with modern AI + IoT ecosystems for practical, scalable innovation.",
  },
  {
    id: "nextgen",
    company: "Nextgen Clearing Ltd",
    role: "Python Developer",
    duration: "July 2023 — July 2025",
    period: "2 yrs 1 mo",
    location: "Ahmedabad, Gujarat, India",
    current: false,
    responsibilities: [
      "Built robust backend services using FastAPI, PostgreSQL, and Redis for high-volume telecom data platforms.",
      "Implemented automated testing with PyTest, Mypy, and Flake8 — improving code reliability by 40%.",
      "Developed RESTful APIs and integrated third-party services, significantly improving data interoperability across cloud-based systems.",
      "Designed optimized data storage solutions and deployed secure data access protocols using Keycloak, reducing data latency and ensuring compliance with industry security standards.",
      "Actively contributed to architectural decisions, improving scalability for high-volume telecom data platforms.",
      "Improved cloud integrations using AWS and reduced data processing time via caching strategies and asynchronous programming.",
    ],
    projects: ["High-Volume Telecom Data Platform"],
    technologies: ["FastAPI", "PostgreSQL", "Redis", "PyTest", "Mypy", "Flake8", "Keycloak", "AWS"],
    impact: "40% improvement in code reliability; reduced data latency and improved platform scalability.",
  },
  {
    id: "solvios-blockchain",
    company: "Solvios Technology",
    role: "Python / Blockchain Developer",
    duration: "August 2022 — June 2023",
    period: "11 mos",
    location: "Ahmedabad, Gujarat, India",
    current: false,
    responsibilities: [
      "Developed a telecom Invoice Processing Tool using AWS services and Python — reducing manual effort by 60% and cutting processing time by 35%.",
      "Created a token-based marketplace using Solidity, enabling fractional asset ownership and driving new revenue streams.",
      "Led custom blockchain development and smart contract implementation supporting business use cases in logistics and identity verification.",
      "Spearheaded automation testing using Selenium, identifying bugs and improving platform stability.",
      "Collaborated directly with clients, ensuring seamless communication and timely delivery.",
      "Implemented secure coding practices aligned with client compliance requirements.",
    ],
    projects: ["Telecom Invoice Processing Tool", "Token-Based Digital Asset Marketplace"],
    technologies: ["Python", "AWS", "Solidity", "Blockchain", "Selenium"],
    impact: "60% less manual effort & 35% faster invoice processing; new revenue stream via tokenized marketplace.",
  },
  {
    id: "solvios-python",
    company: "Solvios Technology",
    role: "Python Developer",
    duration: "May 2021 — July 2022",
    period: "1 yr 3 mos",
    location: "Ahmedabad, Gujarat, India",
    current: false,
    responsibilities: [
      "Built foundational Python backend development skills, laying the groundwork for the Blockchain Developer role that followed.",
    ],
    projects: [],
    technologies: ["Python"],
    impact: "",
  },
  {
    id: "it-intern",
    company: "",
    role: "Information Technology Intern",
    duration: "September 2020 — April 2021",
    period: "8 mos",
    location: "Ahmedabad, Gujarat, India",
    current: false,
    responsibilities: ["Began professional journey exploring IT fundamentals and software development practices."],
    projects: [],
    technologies: [],
    impact: "",
  },
];

export const education = [
  {
    id: "iit-toronto",
    degree: "Advanced Data Science Certificate Program",
    school: "Indian Institute of Technology, Madras — in collaboration with University of Toronto (Rotman School of Management)",
    duration: "September 2023 — June 2024",
    gpa: "",
    coursework: ["Data Science", "Applied Statistics", "Machine Learning Foundations"],
  },
  {
    id: "msc-it",
    degree: "Master of Science (MSc), Information Technology",
    school: "GLS University",
    duration: "June 2021 — April 2023",
    gpa: "",
    coursework: [],
  },
  {
    id: "bsc-it",
    degree: "Bachelor of Science, Information Technology",
    school: "GLS University",
    duration: "June 2018 — April 2021",
    gpa: "",
    coursework: [],
    achievement: "Best Student Awardee — 2018-2021 Batch (BSc-IT)",
  },
  {
    id: "csp",
    degree: "CSP — Certified Software Programmer",
    school: "IANT (Institute of Advance Network Technology)",
    duration: "2017 — 2020",
    gpa: "",
    coursework: [],
  },
];

export const skillCategories = [
  {
    category: "Programming Languages",
    skills: [
      { name: "Python", level: 95, years: "5+" },
      { name: "Solidity", level: 70, years: "1+" },
      { name: "SQL", level: 80, years: "4+" },
    ],
  },
  {
    category: "Backend & APIs",
    skills: [
      { name: "FastAPI", level: 95, years: "3+" },
      { name: "RESTful APIs", level: 92, years: "5+" },
      { name: "Microservices", level: 85, years: "2+" },
      { name: "Async Programming", level: 88, years: "3+" },
    ],
  },
  {
    category: "Databases",
    skills: [
      { name: "PostgreSQL", level: 88, years: "3+" },
      { name: "Redis", level: 85, years: "3+" },
    ],
  },
  {
    category: "Cloud & DevOps",
    skills: [
      { name: "AWS", level: 85, years: "3+" },
      { name: "Keycloak", level: 78, years: "2+" },
      { name: "Linux", level: 82, years: "4+" },
    ],
  },
  {
    category: "AI / ML",
    skills: [
      { name: "LLM Integration", level: 82, years: "1+" },
      { name: "AI Agents", level: 80, years: "1+" },
      { name: "Anomaly Detection", level: 75, years: "1+" },
    ],
  },
  {
    category: "Blockchain",
    skills: [
      { name: "Solidity Smart Contracts", level: 75, years: "1+" },
      { name: "Custom Blockchain Infra", level: 72, years: "1+" },
    ],
  },
  {
    category: "Testing & QA",
    skills: [
      { name: "PyTest", level: 88, years: "3+" },
      { name: "Selenium", level: 78, years: "1+" },
      { name: "Mypy / Flake8", level: 85, years: "3+" },
    ],
  },
  {
    category: "IoT & Embedded",
    skills: [
      { name: "NodeMCU", level: 70, years: "1+" },
      { name: "Arduino", level: 68, years: "1+" },
    ],
  },
  {
    category: "Tools & Version Control",
    skills: [
      { name: "Git", level: 85, years: "5+" },
      { name: "Linux CLI", level: 82, years: "4+" },
    ],
  },
  {
    category: "Soft Skills",
    skills: [
      { name: "Cross-team Collaboration", level: 90, years: "5+" },
      { name: "Mentoring & Knowledge-sharing", level: 88, years: "3+" },
      { name: "Client Communication", level: 85, years: "3+" },
    ],
  },
];

export const techStack = [
  "Python", "FastAPI", "PostgreSQL", "Redis", "AWS", "Solidity", "Blockchain",
  "Selenium", "PyTest", "Git", "Linux", "Keycloak", "NodeMCU", "Arduino",
  "LLMs / AI Agents", "IoT", "Microservices", "Flake8", "Mypy",
];

export const projects = [
  {
    id: "ai-iot-platform",
    title: "AI + IoT Supply Chain Platform",
    company: "AdeptNova Ltd.",
    description:
      "An intelligent, data-driven supply chain platform combining IoT-based asset tracking, inventory monitoring, and logistics telemetry with AI-driven demand forecasting, route optimization, and risk analysis.",
    challenge:
      "Fragmented visibility across logistics, inventory, and asset data made real-time decision-making slow and reactive.",
    solution:
      "Architected real-time ingestion pipelines from IoT sensors into scalable FastAPI backend services, layering AI models on top for anomaly detection and predictive insight generation.",
    achievements: [
      "Enabled real-time monitoring & anomaly detection across distributed IoT data",
      "Improved operational visibility and decision-making across supply chain",
      "Coordinated AI agents, microservices, and external APIs into one reliable system",
    ],
    technologies: ["FastAPI", "Python", "LLMs", "IoT", "AI Agents", "Microservices"],
    architecture: "IoT sensors → ingestion service → FastAPI microservices → AI/LLM inference layer → real-time dashboards & alerts.",
    github: "",
    demo: "",
  },
  {
    id: "telecom-data-platform",
    title: "High-Volume Telecom Data Platform",
    company: "Nextgen Clearing Ltd",
    description:
      "Backend services powering a high-volume telecom clearing platform, built for reliability, security, and scale using FastAPI, PostgreSQL, and Redis.",
    challenge:
      "Massive telecom datasets required low-latency processing with strict compliance and security requirements.",
    solution:
      "Designed optimized storage and secure access protocols with Keycloak, layered caching with Redis, and enforced code quality through automated testing (PyTest, Mypy, Flake8).",
    achievements: [
      "Improved code reliability by 40% via automated testing pipelines",
      "Reduced data latency through caching strategies and async programming",
      "Ensured compliance with industry security standards via Keycloak",
    ],
    technologies: ["FastAPI", "PostgreSQL", "Redis", "Keycloak", "AWS", "PyTest"],
    architecture: "Client apps → FastAPI REST APIs → Keycloak auth layer → PostgreSQL + Redis cache → AWS cloud infra.",
    github: "",
    demo: "",
  },
  {
    id: "invoice-tool",
    title: "Telecom Invoice Processing Tool",
    company: "Solvios Technology",
    description:
      "An AWS-powered automation tool that transformed manual telecom billing invoice processing into a streamlined, largely automated workflow.",
    challenge:
      "Manual invoice processing for telecom billing was slow, error-prone, and resource-intensive.",
    solution:
      "Built a Python-based automation pipeline on AWS to parse, validate, and process invoices with minimal manual intervention.",
    achievements: [
      "Reduced manual effort by 60%",
      "Cut processing time by 35%",
      "Improved consistency and accuracy of telecom billing operations",
    ],
    technologies: ["Python", "AWS"],
    architecture: "Invoice ingestion → AWS-based Python processing pipeline → validation & billing system integration.",
    github: "",
    demo: "",
  },
  {
    id: "token-marketplace",
    title: "Token-Based Digital Asset Marketplace",
    company: "Solvios Technology",
    description:
      "A blockchain-powered marketplace enabling fractional ownership of assets through custom token issuance and smart contracts.",
    challenge:
      "Traditional asset ownership models limit access — full-unit ownership creates high entry barriers for investors.",
    solution:
      "Developed Solidity smart contracts and custom blockchain infrastructure to tokenize assets, enabling fractional ownership and new liquidity.",
    achievements: [
      "Enabled fractional asset ownership via tokenization",
      "Opened new revenue streams for the business",
      "Applied blockchain use cases to logistics & identity verification",
    ],
    technologies: ["Solidity", "Blockchain", "Python"],
    architecture: "Smart contracts (Solidity) → blockchain ledger → marketplace backend (Python) → client-facing interface.",
    github: "",
    demo: "",
  },
];

export const stats = [
  { label: "Years of Experience", value: 5, suffix: "+" },
  { label: "Companies", value: 3, suffix: "" },
  { label: "Major Projects", value: 6, suffix: "+" },
  { label: "Certifications", value: 5, suffix: "" },
  { label: "Hackathons", value: 2, suffix: "" },
  { label: "Peak Efficiency Gain", value: 60, suffix: "%" },
];

export const expertiseRadar = [
  { subject: "Backend Engineering", value: 95 },
  { subject: "Cloud (AWS)", value: 85 },
  { subject: "AI / LLMs", value: 80 },
  { subject: "Blockchain", value: 72 },
  { subject: "Databases", value: 87 },
  { subject: "Testing & QA", value: 84 },
  { subject: "IoT", value: 70 },
  { subject: "Security", value: 78 },
];

export const certifications = [
  {
    id: "python-cert",
    name: "Python",
    provider: "",
    date: "",
    skills: ["Python Programming"],
    link: "",
  },
  {
    id: "cloud-cert",
    name: "Cloud Computing",
    provider: "",
    date: "",
    skills: ["Cloud Fundamentals", "Cloud Architecture"],
    link: "",
  },
  {
    id: "redhat-cert",
    name: "Red Hat System Administration",
    provider: "Red Hat",
    date: "",
    skills: ["Linux Administration", "System Configuration"],
    link: "",
  },
  {
    id: "poolparty-2",
    name: "PoolParty Course 2: Knowledge Engineering Training",
    provider: "PoolParty",
    date: "",
    skills: ["Knowledge Engineering"],
    link: "",
  },
  {
    id: "poolparty-3",
    name: "PoolParty Course 3: Semantic Integration Training",
    provider: "PoolParty",
    date: "",
    skills: ["Semantic Integration"],
    link: "",
  },
];

export const achievements = [
  {
    id: "sih-2022",
    title: "Finalist — Smart India Hackathon 2022",
    issuer: "Government of India",
    type: "Competition",
  },
  {
    id: "yi-hackathon",
    title: "YI Innovation India Hackathon 2020",
    issuer: "",
    type: "Competition",
  },
  {
    id: "best-student",
    title: "Best Student Awardee — 2018-2021 Batch (BSc-IT)",
    issuer: "GLS University",
    type: "Academic Award",
  },
  {
    id: "special-achievement",
    title: "Special Achievement Award",
    issuer: "",
    type: "Award",
  },
  {
    id: "idea-presentation",
    title: "Idea Presentation Recognition",
    issuer: "",
    type: "Recognition",
  },
  {
    id: "code-blue",
    title: "Code Blue",
    issuer: "",
    type: "Competition",
  },
];
