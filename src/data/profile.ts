export const profile = {
  name: "Caio Teixeira",
  title: "Senior Developer at NIUP Technologies",
  location: "Braga, Portugal",
  email: "caioteixeira@gmail.com",
  linkedin: "https://www.linkedin.com/in/caio-teixeira-espirito-santo",
  summary:
    "Stay open to solutions in every challenge life brings. Don\u2019t despair\u2014tomorrow can always be better than today. The sun shines for everyone.",
  skills: ["Requirements Gathering", "XML", "Software Design"],
  languages: [
    { name: "English", level: "Professional Working" },
    { name: "Portuguese", level: "Native or Bilingual" },
  ],
  publications: [
    "As 4 caracter\u00edsticas fascinantes do mercado do software",
  ],
  experience: [
    {
      company: "Niup Technologies",
      role: "Software Engineer",
      period: "May 2017 \u2013 Present",
      duration: "9 years",
      location: "Braga, Portugal",
      highlights: [
        "Led software architecture and coordinated development teams on multiple SaaS products",
        "Built and maintained scalable backend services in C#, Node.js, and PHP",
        "Developed modern and responsive frontend apps using React.js, Angular, and JavaScript",
        "Introduced best practices in code quality, mentoring, and Agile collaboration",
      ],
    },
    {
      company: "Universidade Federal do Esp\u00edrito Santo",
      role: "Tech Leader & Developer",
      period: "Jan 2013 \u2013 Oct 2017",
      duration: "4 years 10 months",
      location: "Vit\u00f3ria, Brazil",
      highlights: [
        "Managed the development of e-learning platforms integrated with Moodle",
        "Worked closely with educators and administrators to align tech solutions with academic goals",
      ],
    },
    {
      company: "Adron Digital Studio",
      role: "Tech Leader",
      period: "Jan 2012 \u2013 Jan 2013",
      duration: "1 year 1 month",
      location: "Vit\u00f3ria, ES",
      highlights: [
        "Led software development projects, managing development teams and contributing hands-on using PHP, JavaScript, C, VB.NET, and Node.js",
      ],
    },
    {
      company: "Highlan Servi\u00e7os Inteligentes",
      role: "Senior Software Engineer",
      period: "Jan 2005 \u2013 Dec 2011",
      duration: "7 years",
      location: "Vit\u00f3ria, ES",
      highlights: [
        "Developed software projects for Petrobras S.A. in engineering and geology, using Java (J2EE) and JavaScript",
      ],
    },
    {
      company: "Ag\u00eancia ebrand",
      role: "Internship Web Development",
      period: "May 2003 \u2013 Jan 2005",
      duration: "1 year 9 months",
      location: "",
      highlights: ["Internship in web systems development"],
    },
    {
      company: "Vale",
      role: "Internship",
      period: "Jun 2001 \u2013 May 2002",
      duration: "1 year",
      location: "",
      highlights: [
        "Provided support for email systems and mainframe registers",
      ],
    },
  ],
  education: [
    {
      institution: "Universidade Federal do Esp\u00edrito Santo",
      degree: "Master of Science (MSc), Management Information Systems",
      period: "2012 \u2013 2014",
    },
    {
      institution: "FAESA",
      degree: "Computer Science",
      period: "2004 \u2013 2009",
    },
  ],
} as const;

export type Profile = typeof profile;
