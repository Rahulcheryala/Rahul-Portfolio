const navLinks = [
  {
    id: 1,
    name: "Projects",
    type: "finder",
  },
  {
    id: 3,
    name: "Contact",
    type: "contact",
  },
  {
    id: 4,
    name: "Resume",
    type: "resume",
  },
];

const navIcons = [
  {
    id: 1,
    img: "/icons/wifi.svg",
    name: "Wifi",
  },
  {
    id: 2,
    img: "/icons/search.svg",
    name: "Search",
  },
  {
    id: 3,
    img: "/icons/user.svg",
    name: "User",
  },
  {
    id: 4,
    img: "/icons/mode.svg",
    name: "Mode",
  },
];

const dockApps = [
  {
    id: "finder",
    name: "Portfolio", // was "Finder"
    icon: "finder.png",
    canOpen: true,
  },
  {
    id: "safari",
    name: "Articles", // was "Safari"
    icon: "safari.png",
    canOpen: true,
  },
  {
    id: "photos",
    name: "Gallery", // was "Photos"
    icon: "photos.png",
    canOpen: true,
  },
  {
    id: "contact",
    name: "Contact", // or "Get in touch"
    icon: "contact.png",
    canOpen: true,
  },
  {
    id: "terminal",
    name: "Skills", // was "Terminal"
    icon: "terminal.png",
    canOpen: true,
  },
  {
    id: "calendar",
    name: "Experience",
    icon: "calendar.png",
    canOpen: true,
  },
  {
    id: "trash",
    name: "Archive", // was "Trash"
    icon: "trash.png",
    canOpen: false,
  },
];

const blogPosts = [
  {
    id: 1,
    date: "Sep 2, 2025",
    title:
      "TypeScript Explained: What It Is, Why It Matters, and How to Master It",
    image: "/images/blog1.png",
    link: "https://jsmastery.com/blog/typescript-explained-what-it-is-why-it-matters-and-how-to-master-it",
  },
  {
    id: 2,
    date: "Aug 28, 2025",
    title: "The Ultimate Guide to Mastering Three.js for 3D Development",
    image: "/images/blog2.png",
    link: "https://jsmastery.com/blog/the-ultimate-guide-to-mastering-three-js-for-3d-development",
  },
  {
    id: 3,
    date: "Aug 15, 2025",
    title: "The Ultimate Guide to Mastering GSAP Animations",
    image: "/images/blog3.png",
    link: "https://jsmastery.com/blog/the-ultimate-guide-to-mastering-gsap-animations",
  },
];

const techStack = [
  {
    category: "Frontend",
    items: ["React.js", "Next.js", "TypeScript"],
  },
  {
    category: "Mobile",
    items: ["React Native", "Expo", "Flutter"],
  },
  {
    category: "Styling",
    items: ["Tailwind CSS", "Sass", "CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "Django", "FastAPI"],
  },
  {
    category: "Database",
    items: ["MySQL", "PostgreSQL", "MongoDB", "Supabase"],
  },
  {
    category: "Dev Tools",
    items: ["Git", "GitHub", "Docker"],
  },
];

const socials = [
  {
    id: 1,
    text: "Github",
    icon: "/icons/github.svg",
    bg: "#f4656b",
    link: "https://github.com/rahulcheryala",
  },
  {
    id: 4,
    text: "LinkedIn",
    icon: "/icons/linkedin.svg",
    bg: "#05b6f6",
    link: "https://www.linkedin.com/in/rahulcheryala",
  },
];

const photosLinks = [
  {
    id: 1,
    icon: "/icons/gicon1.svg",
    title: "Library",
  },
  {
    id: 2,
    icon: "/icons/gicon2.svg",
    title: "Memories",
  },
  {
    id: 3,
    icon: "/icons/file.svg",
    title: "Places",
  },
  {
    id: 4,
    icon: "/icons/gicon4.svg",
    title: "People",
  },
  {
    id: 5,
    icon: "/icons/gicon5.svg",
    title: "Favorites",
  },
];

const gallery = [
  {
    id: 1,
    img: "/images/project-1.webp",
  },
  {
    id: 2,
    img: "/images/project-2.webp",
  },
  {
    id: 3,
    img: "/images/project-3.webp",
  },
  {
    id: 4,
    img: "/images/project-4.webp",
  },
];

const careerTimeline = [
  {
    id: 1,
    year: "2024",
    title: "Full-stack Developer",
    company: "Quantlytix Pvt Ltd",
    type: "fulltime",
    duration: "Aug 2024 — Present",
    location: "Remote",
    color: "#0058bc",
    clients: [
      {
        name: "IPSY",
        achievements: [
          "Migrated legacy HTML/CSS to React.js for an internal platform, maintaining 100% feature parity with zero disruption.",
          "Streamlined internal workflows and redesigned UIs, improving task completion efficiency by 35%.",
          "Developed automated E2E test suites using WebdriverIO integrated into Jenkins CI pipelines.",
        ],
      },
      {
        name: "Vethuk",
        achievements: [
          "Architected CI/CD pipelines using GitHub Actions, reducing manual intervention by 80%.",
          "Built observability stack with AWS, Grafana, Loki, FluentBit, and InfluxDB + Telegraf.",
          "Designed containerized deployments using AWS ECS and ECR across multiple environments.",
          "Led end-to-end development of the company's public-facing platform using Next.js and Django.",
        ],
      },
    ],
    techStack: [
      "React.js",
      "Next.js",
      "Django",
      "AWS",
      "Docker",
      "Jenkins",
      "GitHub Actions",
      "Grafana",
    ],
  },
  {
    id: 2,
    year: "2024",
    title: "Full-stack Developer Intern",
    company: "CodeUnity Technologies",
    type: "intern",
    duration: "Feb 2024 — Aug 2024",
    location: "Remote",
    color: "#006b27",
    achievements: [
      "Refactored backend services to eliminate code redundancy within a multi-tenant SaaS ERP system.",
      "Designed multi-tenant ERP modules modeling organizational hierarchies for scalable resource planning.",
      "Built a reusable frontend component library, reducing delivery time by 25%.",
      "Documented component architecture and integration workflows for developer onboarding.",
    ],
    techStack: ["React.js", "Node.js", "PostgreSQL", "TypeScript"],
  },
  {
    id: 3,
    year: "2023",
    title: "Software Engineer Intern",
    company: "Azgaurd Technologies",
    type: "intern",
    duration: "Aug 2023 — Jan 2024",
    location: "Remote",
    color: "#f97316",
    achievements: [
      "Engineered Chrome extensions to automate job application workflows, reducing manual effort by 3.5x.",
      "Built a high-performance job portal frontend using Next.js and Tailwind CSS.",
      "Developed Django backend integrated with AWS S3 and deployed on EC2 with optimized utilization.",
      "Utilized Terraform for IaC deployment, reducing deployment time by 60%.",
    ],
    techStack: [
      "Next.js",
      "Django",
      "AWS S3",
      "EC2",
      "Terraform",
      "Tailwind CSS",
    ],
  },
  {
    id: 4,
    year: "2021",
    title: "Bachelor of Technology",
    company: "IIT Dharwad",
    type: "education",
    duration: "2021 — 2025",
    location: "Dharwad, India",
    color: "#8b5cf6",
    achievements: ["Computer Science & Engineering", "CPI: 7.6"],
    techStack: [],
  },
];

const careerCategories = [
  { id: "all", label: "Overview", icon: "📋" },
  { id: "fulltime", label: "Full-time Roles", icon: "💼" },
  { id: "intern", label: "Internships", icon: "🎓" },
  { id: "education", label: "Education", icon: "🏛️" },
];

export {
  navLinks,
  navIcons,
  dockApps,
  blogPosts,
  techStack,
  socials,
  photosLinks,
  gallery,
  careerTimeline,
  careerCategories,
};

const WORK_LOCATION = {
  id: 1,
  type: "work",
  name: "Projects",
  icon: "/icons/work.svg",
  kind: "folder",
  children: [
    // ▶ Project 1
    {
      id: 5,
      name: "LiveDocs",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-5", // icon position inside Finder
      windowPosition: "top-[6vh] left-9", // optional: Finder window position
      children: [
        {
          id: 1,
          name: "LiveDocs Project.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "Work together in real-time with your team, seeing changes instantly as they happen.",
            "Edit and update documents easily without worrying about version conflicts.",
            "Share files quickly and keep everyone on the same page.",
            "Improve team productivity with smooth, seamless collaboration.",
          ],
        },
        {
          id: 2,
          name: "livedocs.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://live-docs-nextjs-three.vercel.app/",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "livedocs-1.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/project-1.webp",
        },
        {
          id: 5,
          name: "livedocs-2.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-56 right-20",
          imageUrl: "/images/project-2.webp",
        },
      ],
    },

    // ▶ Project 2
    {
      id: 6,
      name: "Eventura",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-52 right-80",
      windowPosition: "top-[18vh] left-9",
      children: [
        {
          id: 1,
          name: "Eventura Project.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 right-10",
          description: [
            "Easily host and manage events with a modern, user-friendly platform designed to simplify every step of the process.",
            "Keep your events secure with reliable authentication and smooth, integrated Stripe payments for hassle-free transactions.",
            "Help attendees discover more with related event suggestions, advanced search, and smart filtering options.",
            "Stay organized with flexible event management tools and dynamic category creation tailored to your needs.",
          ],
        },
        {
          id: 2,
          name: "eventura.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://evently-event-management-nextjs-lime.vercel.app/",
          position: "top-20 left-20",
        },
        {
          id: 4,
          name: "eventura-1.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 left-80",
          imageUrl: "/images/project-3.webp",
        },
        {
          id: 5,
          name: "eventura-2.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          imageUrl: "/images/project-4.webp",
          position: "top-60 left-5",
        },
      ],
    },
  ],
};

const ABOUT_LOCATION = {
  id: 2,
  type: "about",
  name: "About me",
  icon: "/icons/info.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-5",
      imageUrl: "/images/rahul.webp",
    },
    {
      id: 2,
      name: "casual-me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-28 right-72",
      imageUrl: "/images/rahul-2.webp",
    },
    {
      id: 3,
      name: "convocation-me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-52 left-80",
      imageUrl: "/images/rahul-3.webp",
    },
    {
      id: 4,
      name: "about-me.txt",
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      position: "top-60 left-5",
      subtitle: "Meet the Developer Behind the Code",
      image: "/images/rahul.webp",
      description: [
        "Hi, I’m Rahul 👋 — a full-stack engineer who enjoys building things that actually work in production (and preferably stay that way 🚀).",
        "I graduated from IIT Dharwad with a background in Computer Science, and since then I’ve focused on turning ideas into reliable, scalable software. I’ve worked across frontend and backend systems, built CI/CD pipelines ⚙️, improved observability stacks 📊, and shipped features that real users depend on.",
        "I’m naturally curious 🔍, which means I ask “why” a lot — sometimes more than necessary — but that habit has saved me from shipping questionable decisions more than once. I care about clean architecture, thoughtful engineering, and writing code that future-me won’t complain about 😄.",
        "I enjoy taking messy problems and structuring them into dependable systems. My goal is simple: build impactful products, keep learning 📚, and reduce the number of 2 AM production surprises along the way.",
      ],
    },
  ],
};

const RESUME_LOCATION = {
  id: 3,
  type: "resume",
  name: "Resume",
  icon: "/icons/file.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "Resume.pdf",
      icon: "/images/pdf.png",
      kind: "file",
      fileType: "pdf",
      // you can add `href` if you want to open a hosted resume
      // href: "/your/resume/path.pdf",
    },
  ],
};

const TRASH_LOCATION = {
  id: 4,
  type: "trash",
  name: "Trash",
  icon: "/icons/trash.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "trash1.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-10",
      imageUrl: "/images/trash-1.webp",
    },
    {
      id: 2,
      name: "trash2.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-40 left-80",
      imageUrl: "/images/trash-2.webp",
    },
  ],
};

const EXPERIENCE_POSITIONS = [
  "top-5 left-10",
  "top-10 right-20",
  "top-52 left-5",
  "top-56 right-60",
];

const EXPERIENCE_LOCATION = {
  id: 100,
  type: "experience",
  name: "Work Exp",
  icon: "/icons/work.svg",
  kind: "folder",
  children: careerTimeline.map((entry, i) => ({
    id: 100 + entry.id,
    name: `${entry.company}.txt`,
    icon: "/images/txt.png",
    kind: "file",
    fileType: "experience",
    position: EXPERIENCE_POSITIONS[i % EXPERIENCE_POSITIONS.length],
    calendarEntryId: entry.id,
    subtitle: entry.title,
    description:
      "clients" in entry && entry.clients
        ? entry.clients.flatMap((c) => [`Client: ${c.name}`, ...c.achievements])
        : (entry.achievements ?? []),
  })),
};

export const locations = {
  experience: EXPERIENCE_LOCATION,
  work: WORK_LOCATION,
  about: ABOUT_LOCATION,
  resume: RESUME_LOCATION,
  trash: TRASH_LOCATION,
};

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
  finder: {
    isOpen: false,
    isMaximized: false,
    isMinimized: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  contact: {
    isOpen: false,
    isMaximized: false,
    isMinimized: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  resume: {
    isOpen: false,
    isMaximized: false,
    isMinimized: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  photos: {
    isOpen: false,
    isMaximized: false,
    isMinimized: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  terminal: {
    isOpen: false,
    isMaximized: false,
    isMinimized: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  txtfile: {
    isOpen: false,
    isMaximized: false,
    isMinimized: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  imgfile: {
    isOpen: false,
    isMaximized: false,
    isMinimized: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  calendar: {
    isOpen: false,
    isMaximized: false,
    isMinimized: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };

const TERMINAL_CONFIG = {
  name: "Rahul Cheryala",
  ps1_username: "rahulcheryala",
  ps1_hostname: "portfolio",
  email: "rahulcheryala787@gmail.com",
  repo: "https://github.com/rahulcheryala",
  social: {
    github: "rahulcheryala",
    linkedin: "rahulcheryala",
  },
  sumfetch: {
    OS: "Human/MacOS Tahoe",
    Host: "FullStack-Developer-Body-v1.1",
    Uptime: "1.5 years of professional grind",
    Caffeine: "8 cups/day",
    "Bugs Fixed": "174+ (3 features created by accident)",
    "Prod Breaks": "4 (Everything is fine now)",
    "PR Reviews": "LGTM 👍 (Didn't actually read it)",
  },
};

export { TERMINAL_CONFIG };
