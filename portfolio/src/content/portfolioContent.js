import profile from "../assets/profile.jpg";
import mailSymbol from "../assets/mail-symbol.svg";
import linkedinSymbol from "../assets/linkedin-symbol.svg";
import githubSymbol from "../assets/github-symbol.svg";
import htmlSymbol from "../assets/html-lg.svg";
import cssSymbol from "../assets/css-lg.svg";
import jsSymbol from "../assets/js-lg.svg";
import reactSymbol from "../assets/react-lg.svg";
import nodeSymbol from "../assets/node-lg.svg";
import mySqlSymbol from "../assets/mysql-lg.svg";
import flutterSymbol from "../assets/flutter-lg.svg";
import swiftSymbol from "../assets/swift-lg.svg";
import espSymbol from "../assets/esp-lg.svg";
import engSymbol from "../assets/en-lg.svg";
import weeiiHs from "../assets/weeii-hs.png";
import weeiiLoc from "../assets/weeii-loc.png";
import weeiiStore from "../assets/weeii-store.png";
import otorrinoHs from "../assets/otorrino-hs.png";
import otorrinoAbout from "../assets/otorrino-about.png";
import otorrinoServices from "../assets/otorrino-services.png";

export const portfolioContent = {
  brand: {
    name: "Juan Barrera",
    resumeLabel: "Resume",
  },
  nav: [
    { label: "Projects", href: "#portfolio" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    eyebrow: "Full-Stack and Mobile Developer",
    title: "Building high-performance web and mobile experiences.",
    description:
      "I design and ship polished software products with a strong focus on architecture, performance, and user-centered execution.",
    primaryCta: { label: "View My Work", href: "#portfolio" },
    secondaryCta: { label: "Contact Me", href: "#contact" },
    socialLinks: [
      {
        label: "Email",
        href: "mailto:this.is.juanb@gmail.com",
        icon: mailSymbol,
        iconAlt: "Email",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/juandediosbarrera/",
        icon: linkedinSymbol,
        iconAlt: "LinkedIn",
      },
      {
        label: "GitHub",
        href: "https://github.com/lowkeyjuanb",
        icon: githubSymbol,
        iconAlt: "GitHub",
      },
    ],
    highlights: [
      "Scalable product thinking",
      "Cross-platform delivery",
      "Clean systems and strong UX",
    ],
  },
  projects: [
    {
      id: "weeii",
      eyebrow: "Featured App | 2024 - 2025",
      title: "Weeii App",
      description:
        "Created and optimized cross-platform features for a consumer mobile app, focusing on storefront, location, and product discovery flows.",
      stack: ["Flutter", "Swift", "Mobile UX", "App Store"],
      mediaStyle: "phone",
      images: [
        { src: weeiiHs, alt: "Weeii app home screen" },
        { src: weeiiLoc, alt: "Weeii app location screen" },
        { src: weeiiStore, alt: "Weeii app store screen" },
      ],
      links: [
        {
          label: "View on App Store",
          href: "https://apps.apple.com/us/app/weeii/id6467936370",
        },
      ],
    },
    {
      id: "otorrino",
      eyebrow: "Featured Website | 2023",
      title: "Dr. Carlo Pedroza Website",
      description:
        "Designed and built a service-focused medical website with clear navigation, informative content structure, and a polished presentation.",
      stack: ["Responsive Web", "Content Design", "Frontend"],
      mediaStyle: "browser",
      images: [
        { src: otorrinoHs, alt: "Dr. Carlo Pedroza website home page" },
        { src: otorrinoAbout, alt: "Dr. Carlo Pedroza website about page" },
        { src: otorrinoServices, alt: "Dr. Carlo Pedroza website services page" },
      ],
      links: [
        {
          label: "Visit Website",
          href: "https://carlopedrozaotorrino.com/",
        },
      ],
    },
  ],
  about: {
    title: "Engineering Precision",
    image: profile,
    paragraphs: [
      "I'm a Full-Stack Developer with a deep passion for creating scalable and thoughtful software solutions. I graduated magna cum laude with a Bachelor's in Electronic Cybernetics Engineering, and I enjoy turning complex requirements into products that feel clear and reliable.",
      "My approach blends technical range with practical delivery. Whether I am shaping front-end experiences or building the systems behind them, I care about performance, clarity, and helping teams ship work that genuinely serves people.",
    ],
    highlights: [
      { label: "Focus", value: "Full-Stack and Mobile" },
      { label: "Strength", value: "Architecture and Product Execution" },
      { label: "Mindset", value: "Curious, collaborative, and detail-driven" },
    ],
  },
  skills: {
    title: "Technical Arsenal",
    groups: [
      {
        title: "Frontend",
        items: [
          { label: "HTML5", icon: htmlSymbol },
          { label: "CSS3", icon: cssSymbol },
          { label: "JavaScript", icon: jsSymbol },
          { label: "React", icon: reactSymbol },
        ],
      },
      {
        title: "Backend and Data",
        items: [
          { label: "Node.js", icon: nodeSymbol },
          { label: "MySQL", icon: mySqlSymbol },
        ],
      },
      {
        title: "Mobile",
        items: [
          { label: "Flutter", icon: flutterSymbol },
          { label: "Swift", icon: swiftSymbol },
        ],
      },
      {
        title: "Languages",
        items: [
          { label: "Spanish", icon: espSymbol },
          { label: "English", icon: engSymbol },
        ],
      },
    ],
  },
  experiencePlaceholder: {
    title: "Experience",
    intro:
      "This section stays in the refreshed layout intentionally, but the timeline is still being rewritten so every role, date, and result is verified before publishing.",
    items: [
      {
        title: "Verified timeline coming soon",
        period: "Placeholder",
        description:
          "Professional roles, dates, and impact notes will be added here as part of the resume refresh.",
      },
      {
        title: "Current focus",
        period: "Now",
        description:
          "Shipping product work, refining portfolio presentation, and preparing a polished public summary of recent experience.",
      },
    ],
  },
  resumePlaceholder: {
    title: "Resume",
    description:
      "A cleaner downloadable resume is being prepared. Until that version is ready, the latest copy is available on request.",
    primaryLink: {
      label: "Request Resume",
      href: "mailto:this.is.juanb@gmail.com?subject=Resume%20Request",
    },
    secondaryLink: {
      label: "Message on LinkedIn",
      href: "https://www.linkedin.com/in/juandediosbarrera/",
    },
  },
  contact: {
    title: "Let's build something together",
    description:
      "I'm open to interesting product work, freelance opportunities, and thoughtful collaborations.",
    methods: [
      {
        label: "Email",
        href: "mailto:this.is.juanb@gmail.com",
        icon: mailSymbol,
        iconAlt: "Email",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/juandediosbarrera/",
        icon: linkedinSymbol,
        iconAlt: "LinkedIn",
      },
      {
        label: "GitHub",
        href: "https://github.com/lowkeyjuanb",
        icon: githubSymbol,
        iconAlt: "GitHub",
      },
    ],
    footerNote: "© 2026 Juan de Dios Barrera. Built from real project work with a refreshed visual system.",
  },
};
