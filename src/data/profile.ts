export const profile = {
  name: "Caio Teixeira",
  firstName: "Caio",
  lastName: "Teixeira",
  title: "Senior Software Engineer",
  company: "NIUP Technologies",
  location: "Braga, Portugal",
  email: "caioteixeira@gmail.com",
  linkedin: "https://www.linkedin.com/in/caio-teixeira-espirito-santo",
  // Positioning line for recruiters, composed from the facts below.
  headline:
    "I design software architecture and build the systems that sit under it — SaaS platforms, backend services, and the web apps on top. Twenty-five years shipping, across Brazil and Portugal.",
  // Caio's own words, kept as written.
  summary:
    "Stay open to solutions in every challenge life brings. Don’t despair—tomorrow can always be better than today. The sun shines for everyone.",
  careerStart: 2001,
  countries: ["Brazil", "Portugal"],
  languages: [
    // LinkedIn proficiency scale: Elementary, Limited Working,
    // Professional Working, Full Professional, Native/Bilingual.
    { name: "Portuguese", level: "Native or Bilingual", scale: 5 },
    { name: "English", level: "Professional Working", scale: 3 },
  ],
  // Grouped from the technologies and practices named in the roles below.
  stack: [
    {
      group: "Languages & runtimes",
      items: ["C#", "Node.js", "PHP", "JavaScript", "Java (J2EE)", "VB.NET", "C"],
    },
    {
      group: "Frontend",
      items: ["React", "Angular"],
    },
    {
      group: "Architecture & practice",
      items: [
        "Software architecture",
        "Software design",
        "Requirements gathering",
        "Team leadership",
        "Mentoring",
        "Code quality",
        "Agile",
      ],
    },
    {
      group: "Platforms & integration",
      items: ["SaaS products", "Moodle", "E-learning platforms", "XML"],
    },
  ],
  experience: [
    {
      company: "Niup Technologies",
      short: "Niup",
      role: "Software Engineer",
      period: "May 2017 – Present",
      duration: "9 years",
      location: "Braga, Portugal",
      start: 2017.33,
      end: null,
      current: true,
      stack: ["Architecture", "C#", "Node.js", "PHP", "React", "Angular", "SaaS"],
      highlights: [
        "Led software architecture and coordinated development teams on multiple SaaS products",
        "Built and maintained scalable backend services in C#, Node.js, and PHP",
        "Developed modern and responsive frontend apps using React.js, Angular, and JavaScript",
        "Introduced best practices in code quality, mentoring, and Agile collaboration",
      ],
    },
    {
      company: "Universidade Federal do Espírito Santo",
      short: "UFES",
      role: "Tech Leader & Developer",
      period: "Jan 2013 – Oct 2017",
      duration: "4 years 10 months",
      location: "Vitória, Brazil",
      start: 2013.0,
      end: 2017.75,
      current: false,
      stack: ["Moodle", "E-learning", "Team leadership"],
      highlights: [
        "Managed the development of e-learning platforms integrated with Moodle",
        "Worked closely with educators and administrators to align tech solutions with academic goals",
      ],
    },
    {
      company: "Adron Digital Studio",
      short: "Adron",
      role: "Tech Leader",
      period: "Jan 2012 – Jan 2013",
      duration: "1 year 1 month",
      location: "Vitória, Brazil",
      start: 2012.0,
      end: 2013.0,
      current: false,
      stack: ["PHP", "JavaScript", "Node.js", "C", "VB.NET", "Team leadership"],
      highlights: [
        "Led software development projects, managing development teams and contributing hands-on using PHP, JavaScript, C, VB.NET, and Node.js",
      ],
    },
    {
      company: "Highlan Serviços Inteligentes",
      short: "Highlan",
      role: "Senior Software Engineer",
      period: "Jan 2005 – Dec 2011",
      duration: "7 years",
      location: "Vitória, Brazil",
      start: 2005.0,
      end: 2011.92,
      current: false,
      stack: ["Java (J2EE)", "JavaScript", "Engineering & geology"],
      highlights: [
        "Developed software projects for Petrobras S.A. in engineering and geology, using Java (J2EE) and JavaScript",
      ],
    },
    {
      company: "Agência ebrand",
      short: "ebrand",
      role: "Internship Web Development",
      period: "May 2003 – Jan 2005",
      duration: "1 year 9 months",
      location: "",
      start: 2003.33,
      end: 2005.0,
      current: false,
      stack: ["Web development"],
      highlights: ["Internship in web systems development"],
    },
    {
      company: "Vale",
      short: "Vale",
      role: "Internship",
      period: "Jun 2001 – May 2002",
      duration: "1 year",
      location: "",
      start: 2001.42,
      end: 2002.33,
      current: false,
      stack: ["Email systems", "Mainframe"],
      highlights: [
        "Provided support for email systems and mainframe registers",
      ],
    },
  ],
  education: [
    {
      institution: "Universidade Federal do Espírito Santo",
      degree: "Master of Science (MSc), Management Information Systems",
      period: "2012 – 2014",
    },
    {
      institution: "FAESA",
      degree: "Computer Science",
      period: "2004 – 2009",
    },
  ],
} as const;

export type Profile = typeof profile;
