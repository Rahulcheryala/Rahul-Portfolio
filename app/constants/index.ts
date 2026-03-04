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
    img: "/images/project-1.png",
  },
  {
    id: 2,
    img: "/images/project-2.png",
  },
  {
    id: 3,
    img: "/images/project-3.png",
  },
  {
    id: 4,
    img: "/images/project-4.png",
  },
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
};

const WORK_LOCATION = {
  id: 1,
  type: "work",
  name: "Work",
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
          imageUrl: "/images/project-1.png",
        },
        {
          id: 5,
          name: "livedocs-2.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-56 right-20",
          imageUrl: "/images/project-2.png",
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
          imageUrl: "/images/project-3.png",
        },
        {
          id: 5,
          name: "eventura-2.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          imageUrl: "/images/project-4.png",
          position: "top-60 left-5",
        },
      ],
    },

    // ▶ Project 3
    // {
    //   id: 7,
    //   name: "Food Delivery App",
    //   icon: "/images/folder.png",
    //   kind: "folder",
    //   position: "top-10 left-80",
    //   windowPosition: "top-[30vh] left-9",
    //   children: [
    //     {
    //       id: 1,
    //       name: "Food Delivery App Project.txt",
    //       icon: "/images/txt.png",
    //       kind: "file",
    //       fileType: "txt",
    //       position: "top-5 left-10",
    //       description: [
    //         "Our Food Delivery App is a fast and convenient way to order meals from your favorite restaurants.",
    //         "Instead of making calls or waiting in line, you can browse menus, customize orders, and track deliveries in real time.",
    //         "Think of it like having your favorite restaurants in your pocket—ready to deliver anytime, anywhere.",
    //         "It’s built with React Native, so it works smoothly on both iOS and Android with a clean, modern design.",
    //       ],
    //     },
    //     {
    //       id: 2,
    //       name: "food-delivery-app.com",
    //       icon: "/images/safari.png",
    //       kind: "file",
    //       fileType: "url",
    //       href: "https://youtu.be/LKrX390fJMw?si=cExkuVhf2DTV9G2-",
    //       position: "top-10 right-20",
    //     },
    //     {
    //       id: 4,
    //       name: "food-delivery-app.png",
    //       icon: "/images/image.png",
    //       kind: "file",
    //       fileType: "img",
    //       position: "top-52 right-80",
    //       imageUrl: "/images/project-3.png",
    //     },
    //     {
    //       id: 5,
    //       name: "Design.fig",
    //       icon: "/images/plain.png",
    //       kind: "file",
    //       fileType: "fig",
    //       href: "https://google.com",
    //       position: "top-60 right-20",
    //     },
    //   ],
    // },
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
      imageUrl: "/images/rahul.jpeg",
    },
    {
      id: 2,
      name: "casual-me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-28 right-72",
      imageUrl: "/images/rahul-2.jpg",
    },
    {
      id: 3,
      name: "convocation-me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-52 left-80",
      imageUrl: "/images/rahul-3.jpeg",
    },
    {
      id: 4,
      name: "about-me.txt",
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      position: "top-60 left-5",
      subtitle: "Meet the Developer Behind the Code",
      image: "/images/rahul.jpeg",
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
      imageUrl: "/images/trash-1.png",
    },
    {
      id: 2,
      name: "trash2.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-40 left-80",
      imageUrl: "/images/trash-2.png",
    },
  ],
};

export const locations = {
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
    "Bugs Fixed": "348+ (and 4 features created by accident)",
    "Prod Breaks": "4 (Everything is fine now)",
    "PR Reviews": "LGTM 👍 (Didn't actually read it)",
  },
};

export { TERMINAL_CONFIG };
