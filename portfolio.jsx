const { useState, useEffect, useRef, useMemo } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "viewportMode": "auto",
  "viewport": "desktop",
  "accent": "#0055FF",
  "hero": "particles",
  "darkStack": true,
  "menuOpen": false
}/*EDITMODE-END*/;

function getViewportFromWidth(width) {
  if (width <= 640) return "mobile";
  if (width <= 1280) return "tablet";
  return "desktop";
}

// =================== Particle Sphere (canvas) ===================
function ParticleSphere({ variant = "particles", dark = false }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf, w, h, dpr;
    const rootStyles = getComputedStyle(document.documentElement);
    const colorPrimary = (rootStyles.getPropertyValue("--color-primary") || "#0055FF").trim();
    const colorTertiary = (rootStyles.getPropertyValue("--color-tertiary") || "#FFDD00").trim();
    const colorInk = (rootStyles.getPropertyValue("--color-secondary") || "#000000").trim();
    const colorNeutral = (rootStyles.getPropertyValue("--color-neutral") || "#FFFFFF").trim();
    const hexToRgb = (hex) => {
      const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      if (!m) return { r: 0, g: 0, b: 0 };
      return {
        r: parseInt(m[1], 16),
        g: parseInt(m[2], 16),
        b: parseInt(m[3], 16),
      };
    };
    const rgbaFromHex = (hex, a) => {
      const { r, g, b } = hexToRgb(hex);
      return `rgba(${r},${g},${b},${a})`;
    };
    const N = 1400;
    const pts = [];
    for (let i = 0; i < N; i++) {
      // distribute on sphere (Fibonacci)
      const t = i / N;
      const phi = Math.acos(1 - 2 * t);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      pts.push({
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.sin(phi) * Math.sin(theta),
        z: Math.cos(phi),
      });
    }
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    let t0 = performance.now();
    const draw = () => {
      const t = (performance.now() - t0) / 1000;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2;
      const radius = Math.min(w, h) * 0.34;
      const rotY = t * 0.25;
      const rotX = Math.sin(t * 0.18) * 0.3;
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);

      if (variant === "blob") {
        // soft orb gradient + grain
        const grad = ctx.createRadialGradient(cx - radius * 0.3, cy - radius * 0.3, radius * 0.1, cx, cy, radius * 1.2);
        grad.addColorStop(0, dark ? "#3a3a3a" : colorNeutral);
        grad.addColorStop(0.45, dark ? "#1a1a1a" : rgbaFromHex(colorPrimary, 0.3));
        grad.addColorStop(1, dark ? "#0a0a0a" : rgbaFromHex(colorInk, 0.28));
        ctx.fillStyle = grad;
        ctx.beginPath();
        const segs = 64;
        for (let i = 0; i <= segs; i++) {
          const a = (i / segs) * Math.PI * 2;
          const wob = 1 + Math.sin(a * 3 + t) * 0.04 + Math.cos(a * 5 + t * 0.7) * 0.025;
          const r = radius * wob;
          const x = cx + Math.cos(a) * r;
          const y = cy + Math.sin(a) * r;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.closePath(); ctx.fill();
        // dot center
        ctx.fillStyle = colorTertiary;
        ctx.beginPath(); ctx.arc(cx, cy, 14, 0, Math.PI * 2); ctx.fill();
      } else if (variant === "mark") {
        // pulse rings
        for (let i = 0; i < 6; i++) {
          const r = radius * (0.4 + i * 0.18) + Math.sin(t + i) * 6;
          const ringAlpha = dark ? 0.26 : 0.18;
          const ringColor = i % 3 === 0 ? colorPrimary : (i % 5 === 0 ? colorTertiary : (dark ? "#f1ede4" : colorInk));
          ctx.strokeStyle = rgbaFromHex(ringColor, ringAlpha);
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
        }
      } else {
        // particles
        for (let i = 0; i < pts.length; i++) {
          const p = pts[i];
          // rotate
          let x = p.x, y = p.y, z = p.z;
          const x1 = x * cosY - z * sinY;
          const z1 = x * sinY + z * cosY;
          const y2 = y * cosX - z1 * sinX;
          const z2 = y * sinX + z1 * cosX;
          const persp = 1 / (1.8 - z2);
          const px = cx + x1 * radius * persp * 1.6;
          const py = cy + y2 * radius * persp * 1.6;
          const alpha = (z2 + 1) / 2;
          const size = 0.6 + alpha * 1.6;
          if (!dark && i % 37 === 0) {
            ctx.fillStyle = rgbaFromHex(colorTertiary, 0.2 + alpha * 0.45);
          } else if (!dark && i % 17 === 0) {
            ctx.fillStyle = rgbaFromHex(colorPrimary, 0.18 + alpha * 0.5);
          } else {
            ctx.fillStyle = dark
              ? `rgba(241,237,228,${0.15 + alpha * 0.7})`
              : `rgba(10,10,10,${0.1 + alpha * 0.55})`;
          }
          ctx.beginPath(); ctx.arc(px, py, size, 0, Math.PI * 2); ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [variant, dark]);
  return <canvas ref={ref} />;
}

// =================== Project thumbnails (abstract) ===================
function ThumbA() {
  return (
    <div className="thumb-weeii">
      <img src="./assets/weeii-logo.jpg" alt="Weeii app logo" loading="lazy" decoding="async" />
    </div>
  );
}
function ThumbB() {
  return (
    <div className="thumb-carlo">
      <img
        src="./assets/carlo-logo.png"
        alt="Dr. Carlo Pedroza brand logo"
        loading="lazy"
        decoding="async"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "./assets/CARLO-PORTAFOLIO-still.jpg";
        }}
      />
    </div>
  );
}
function ThumbC() {
  // device mock with rounded screen
  return (
    <svg viewBox="0 0 600 380" preserveAspectRatio="xMidYMid slice">
      <rect width="600" height="380" fill="#cdd4dc" />
      <g transform="translate(190 24)">
        <rect width="220" height="332" rx="36" fill="#0a0a0a" />
        <rect x="10" y="10" width="200" height="312" rx="28" fill="#f1ede4" />
        <text x="110" y="70" textAnchor="middle" fontFamily="Archivo" fontWeight="900" fontSize="22" fill="#0a0a0a" letterSpacing="-1">ATELIER</text>
        <text x="110" y="92" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" letterSpacing="2" fill="#7a7770">SS / 26  INDEX</text>
        <rect x="22" y="120" width="176" height="100" rx="14" fill="#0a0a0a" />
        <circle cx="110" cy="170" r="22" fill="#e8c547" />
        <rect x="22" y="232" width="120" height="10" rx="4" fill="#0a0a0a" />
        <rect x="22" y="250" width="80" height="10" rx="4" fill="#0a0a0a" opacity=".5" />
        <rect x="22" y="282" width="176" height="32" rx="16" fill="#0a0a0a" />
        <text x="110" y="303" textAnchor="middle" fontFamily="Archivo" fontWeight="700" fontSize="10" fill="#f1ede4" letterSpacing="2">RESERVE </text>
      </g>
      <text x="20" y="30" fontFamily="JetBrains Mono" fontSize="10" letterSpacing="2" fill="#0a0a0a">002 / NATIVE</text>
      <text x="580" y="365" textAnchor="end" fontFamily="JetBrains Mono" fontSize="10" letterSpacing="2" fill="#0a0a0a">REACT NATIVE</text>
    </svg>
  );
}
function ThumbD() {
  return (
    <svg viewBox="0 0 600 380" preserveAspectRatio="xMidYMid slice">
      <rect width="600" height="380" fill="#e8e3d6" />
      <g stroke="#0a0a0a" strokeWidth="1">
        {Array.from({ length: 18 }).map((_, i) => (
          <line key={i} x1={i * 36} y1="0" x2={i * 36} y2="380" opacity={i % 3 === 0 ? .4 : .12} />
        ))}
      </g>
      <text x="30" y="120" fontFamily="Archivo" fontWeight="900" fontSize="120" letterSpacing="-6" fill="#0a0a0a">04</text>
      <text x="30" y="170" fontFamily="Archivo" fontWeight="800" fontSize="34" letterSpacing="-1" fill="#0a0a0a">HOTHOUSE</text>
      <text x="30" y="200" fontFamily="Instrument Serif" fontStyle="italic" fontSize="28" fill="#5b7a99"> a research log.</text>
      <rect x="30" y="240" width="540" height="1" fill="#0a0a0a" />
      <text x="30" y="275" fontFamily="JetBrains Mono" fontSize="11" letterSpacing="2" fill="#0a0a0a">NEXT.JS  MDX  TAILWIND</text>
      <text x="30" y="300" fontFamily="JetBrains Mono" fontSize="11" letterSpacing="2" fill="#0a0a0a">AWS  CLOUDFRONT  ROUTE53</text>
    </svg>
  );
}
function ThumbE() {
  return (
    <div className="thumb-jappy">
      <img
        src="./assets/jappy-logo.png"
        alt="Jappy startup logo"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

// =================== Components ===================
function Star({ size = 14, color = "currentColor" }) {
  return (
    <svg className="star-svg" viewBox="0 0 24 24" width={size} height={size}>
      <path fill={color} d="M12 1l1.6 7.4L21 10l-7.4 1.6L12 19l-1.6-7.4L3 10l7.4-1.6z" />
    </svg>
  );
}

function TopBar({ onMenu, menuButtonRef, activeNav, hoverNav, onHoverNav, onLeaveNav, onSelectNav }) {
  const items = [
    { id: "work", label: "Projects" },
    { id: "services", label: "Services" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];
  const highlightedNav = hoverNav || activeNav;

  return (
    <div className="topbar">
      <a className="logo" href="#">
        <span className="logo-mark" />
        <span>juan<span style={{ color: "var(--blue)" }}>.</span>barrera</span>
      </a>
      <nav className="nav-pri">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={highlightedNav === item.id ? "active" : ""}
            onMouseEnter={() => onHoverNav(item.id)}
            onMouseLeave={onLeaveNav}
            onFocus={() => onHoverNav(item.id)}
            onBlur={onLeaveNav}
            onClick={() => onSelectNav(item.id)}
          >
            <span className="dot" />
            {item.label}
          </a>
        ))}
      </nav>
      <div className="nav-end">
        <button ref={menuButtonRef} className="menu-pill" onClick={onMenu}>
          <span style={{ display: "inline-block", width: 12, height: 8, position: "relative" }}>
            <span style={{ position: "absolute", left: 0, right: 0, top: 0, height: 1, background: "currentColor" }} />
            <span style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 1, background: "currentColor" }} />
          </span>
          Menu
        </button>
        <span className="mono hide-tablet" style={{ fontSize: 10, opacity: .65 }}>Portfolio Edition 2026</span>
      </div>
    </div>
  );
}

function Hero({ heroVariant }) {
  return (
    <section className="hero" data-screen-label="01 Hero">
      <div className="hero-grid">
        <div className="hero-meta">
          <div className="row-i"><span className="lbl">Role</span><span>Full-Stack and Mobile Developer</span></div>
          <div className="row-i"><span className="lbl">Available</span><span>Web | Mobile | Product</span></div>
          <div className="row-i"><span className="lbl">Contact</span><span>jbarrera.codes@gmail.com</span></div>
        </div>
        <div className="hero-meta hide-tablet" style={{ alignItems: "flex-end", textAlign: "right" }}>
          <div className="row-i" style={{ width: "100%" }}><span className="lbl">Current Focus</span><span>Shipping thoughtful product work</span></div>
          <div className="row-i" style={{ width: "100%" }}><span className="lbl">Recent</span><span>Weeii App | Dr. Carlo Pedroza</span></div>
        </div>

        <div className="hero-stage">
          <ParticleSphere variant={heroVariant} />
          <span className="corner tl mono">Folio / 01</span>
          <span className="corner tr mono">Process | Iterative</span>
        </div>
      </div>

      <h1 className="hero-title">
        HIGH-PERFORMANCE<br />
        WEB & MOBILE<br />
        <em>PRODUCTS.</em>
      </h1>

      <div className="hero-bottom">
        <p className="lede">
          I design and ship polished software products with a strong focus on architecture,
          performance, and user-centered execution.
        </p>
        <div className="ctas">
          <a className="btn dark" href="#work">View My Work <span className="arr">-&gt;</span></a>
          <a className="btn" href="#contact">Contact Me <span className="arr">-&gt;</span></a>
        </div>
      </div>
    </section>
  );
}

function Work() {
  const projects = [
    {
      cls: "feat e", thumb: <ThumbE />, type: "Current Startup", year: "2026",
      title: "Jappy",
      desc: "Building the product experience for Jappy, a home-services startup focused on easy scheduling, dependable service delivery, and polished mobile-first journeys.",
      stack: ["Mobile Product", "UX Strategy", "Frontend", "Startup"],
      meta: ["001", "Web | Live"],
      link: "https://jappyapp.com/",
      linkLabel: "Visit Website",
      status: "Live",
    },
    {
      cls: "feat", thumb: <ThumbA />, type: "Featured App", year: "2024 - 2025",
      title: "Weeii App",
      desc: "Created and optimized cross-platform features for a consumer mobile app, focusing on storefront, location, and product discovery flows.",
      stack: ["Flutter", "Swift", "Mobile UX", "App Store"],
      meta: ["002", "iOS | Android"],
      link: "https://apps.apple.com/us/app/weeii/id6467936370",
      linkLabel: "View on App Store",
      status: "Live",
    },
    {
      cls: "b", thumb: <ThumbB />, type: "Featured Website", year: "2023",
      title: "Dr. Carlo Pedroza Website",
      desc: "Designed and built a service-focused medical website with clear navigation, informative content structure, and a polished presentation.",
      stack: ["Responsive Web", "Content Design", "Frontend"],
      meta: ["003", "Web | Medical Services"],
      link: "https://carlopedrozaotorrino.com/",
      linkLabel: "Visit Website",
      status: "Live",
    },
  ];
  return (
    <section className="sec" id="work" data-screen-label="02 Work">
      <div className="sec-head">
        <div className="sec-num">02 / PROJECTS</div>
        <h2 className="sec-title">Selected<br />projects <em>(curated work).</em></h2>
        <div className="sec-meta">3 featured entries<br />Case study archive growing</div>
      </div>
      <div className="work-grid">
        {projects.map((p, i) => (
          <div key={i} className={`card ${p.cls}`} style={{ gridColumn: i === 0 ? "1 / -1" : "auto" }}>
            <div className="meta">
              <span>{p.meta[0]} - {p.type}</span>
              <span className="tag">{p.year}</span>
            </div>
            <div className="thumb">{p.thumb}</div>
            <div className="body">
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="stack">{p.stack.map((s) => <span key={s}>{s}</span>)}</div>
            </div>
            <div className="foot">
              <span>{p.meta[1]}</span>
              <a href={p.link} target={p.link.startsWith("http") ? "_blank" : undefined} rel={p.link.startsWith("http") ? "noreferrer" : undefined}>{p.linkLabel} -&gt;</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Services() {
  const items = [
    { n: "01", t: <>Full-Stack <em>delivery</em></>, d: "End-to-end product development with architecture, implementation, and launch support for modern web platforms.", c: "Scope on request" },
    { n: "02", t: <>Mobile <em>development</em></>, d: "Cross-platform and native mobile work in Flutter and Swift, focused on polished UX and reliable delivery.", c: "Scope on request" },
    { n: "03", t: <>Frontend <em>engineering</em></>, d: "High-quality frontend implementation with strong performance, responsive behavior, and maintainable UI systems.", c: "Scope on request" },
  ];
  return (
    <section className="sec" id="services" data-screen-label="03 Services">
      <div className="sec-head">
        <div className="sec-num">03 / SERVICES</div>
        <h2 className="sec-title">How I <em>build</em> and ship.</h2>
        <div className="sec-meta">Focused offerings<br />Clear execution</div>
      </div>
      <div className="services">
        {items.map((s) => (
          <div className="srv" key={s.n}>
            <div className="srv-num">{s.n}</div>
            <div className="srv-title">{s.t}</div>
            <div className="srv-desc">{s.d}</div>
            <a className="srv-cta" href="#contact">{s.c} <span className="arr" aria-hidden="true">→</span></a>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="sec" id="about" data-screen-label="04 About">
      <div className="sec-head">
        <div className="sec-num">04 / ABOUT</div>
        <h2 className="sec-title">Engineering <em>precision</em><br />with product focus.</h2>
        <div className="sec-meta">Read time<br />~1 min</div>
      </div>
      <div className="about">
        <p className="about-lede">
          I am a Full-Stack Developer focused on building scalable, thoughtful software solutions that feel clear and reliable.
        </p>
        <div className="about-side">
          <p>
            My approach blends technical range with practical delivery. Whether shaping frontend experiences or backend systems, I care about performance, clarity, and shipping work that serves people.
          </p>
          <p>
            I am most useful when a project needs both taste and rigor: clean implementation, solid architecture, and product-minded execution.
          </p>
        </div>
      </div>
    </section>
  );
}

function Stack() {
  const items = [
    { nm: "HTML5", cat: "Frontend", yr: "Core", lvl: 92 },
    { nm: "CSS3", cat: "Frontend", yr: "Core", lvl: 90 },
    { nm: "JavaScript", cat: "Language", yr: "Core", lvl: 93 },
    { nm: "React", cat: "Frontend", yr: "Core", lvl: 91 },
    { nm: "Node.js", cat: "Backend", yr: "Core", lvl: 86 },
    { nm: "MySQL", cat: "Data", yr: "Core", lvl: 82 },
    { nm: "Flutter", cat: "Mobile", yr: "Core", lvl: 88 },
    { nm: "Swift", cat: "Mobile", yr: "Core", lvl: 80 },
  ];
  return (
    <section className="sec stack-section" id="stack" data-screen-label="05 Stack">
      <div className="sec-head">
        <div className="sec-num">05 / STACK</div>
        <h2 className="sec-title" style={{ color: "var(--gray-100)" }}>Technical stack,<br /><em>plainly arranged.</em></h2>
        <div className="sec-meta">8 core tools<br />Production ready</div>
      </div>
      <div className="stack-grid">
        {items.map((s) => (
          <div className="chip" key={s.nm}>
            <div>
              <div className="cat">{s.cat}</div>
              <div className="nm">{s.nm}</div>
            </div>
            <div>
              <div className="bar"><i style={{ width: `${s.lvl}%` }} /></div>
              <div className="yr" style={{ marginTop: 8, display: "flex", justifyContent: "space-between" }}>
                <span>{s.yr}</span><span>{s.lvl}/100</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact" id="contact" data-screen-label="06 Contact">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 12 }}>
        <div className="sec-num">06 / CONTACT</div>
        <div className="sec-meta hide-tablet">Reply window<br />~24-48h</div>
      </div>
      <h2>Let us build something<br /><em>together.</em></h2>
      <div className="contact-grid">
        <div className="contact-cell">
          <div className="lbl">Email</div>
          <div className="big"><a href="mailto:jbarrera.codes@gmail.com">jbarrera.codes@gmail.com -&gt;</a></div>
        </div>
        <div className="contact-cell">
          <div className="lbl">LinkedIn</div>
          <div className="big"><a href="https://www.linkedin.com/in/juandediosbarrera/" target="_blank" rel="noreferrer">juandediosbarrera -&gt;</a></div>
        </div>
        <div className="contact-cell">
          <div className="lbl">GitHub</div>
          <div className="big"><a href="https://github.com/lowkeyjuanb" target="_blank" rel="noreferrer">lowkeyjuanb -&gt;</a></div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <div className="footer">
      <div>(c) 2026 Juan de Dios Barrera</div>
      <div className="hide-tablet">Built from real project work with a refined editorial system.</div>
      <div>Portfolio edition | Active update cycle</div>
    </div>
  );
}

function MobileMenu({ open, onClose, anchorStyle, menuRef, onSelectNav }) {
  const menuItems = [
    { n: "01", t: "Projects", anchor: "work" },
    { n: "02", t: "Services", anchor: "services" },
    { n: "03", t: "About", anchor: "about" },
    { n: "04", t: "Contact", anchor: "contact" },
  ];

  return (
    <div ref={menuRef} className={`menu-sheet ${open ? "open" : ""}`} style={anchorStyle}>
      <div className="top">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className="logo-mark" style={{ background: "var(--gray-100)" }} />
          <span style={{ fontWeight: 900 }}>Juan Barrera</span>
        </div>
        <button onClick={onClose} aria-label="Close" style={{ color: "var(--gray-100)", fontSize: 22 }}>x</button>
      </div>
      <nav className="links" aria-label="Mobile navigation">
        {menuItems.map((item) => (
          <a
            key={item.n}
            href={`#${item.anchor}`}
            onClick={() => {
              onSelectNav(item.anchor);
              onClose();
            }}
          >
            <span className="n">- {item.n} -</span>
            <span>{item.t}</span>
          </a>
        ))}
      </nav>
      <div className="foot">
        <span>jbarrera.codes@gmail.com</span>
        <span>@lowkeyjuanb</span>
      </div>
    </div>
  );
}
// =================== App ===================
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [menu, setMenu] = useState(false);
  const [activeNav, setActiveNav] = useState("work");
  const [hoverNav, setHoverNav] = useState("");
  const menuButtonRef = useRef(null);
  const menuRef = useRef(null);
  const [menuAnchor, setMenuAnchor] = useState({ top: 74, right: 20, width: 280 });
  const [autoViewport, setAutoViewport] = useState(() => {
    if (typeof window === "undefined") return "desktop";
    return getViewportFromWidth(window.innerWidth);
  });

  useEffect(() => {
    const onResize = () => setAutoViewport(getViewportFromWidth(window.innerWidth));
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const heroVariant = t.hero;
  const viewportMode = t.viewportMode || "auto";
  const resolvedViewport = viewportMode === "manual" ? t.viewport : autoViewport;
  const cls = `device ${resolvedViewport}`;

  useEffect(() => {
    if (!menu) return;

    const updateMenuAnchor = () => {
      const btn = menuButtonRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const right = Math.max(8, Math.round(window.innerWidth - rect.right));
      const top = Math.round(rect.bottom + 8);
      const width = 280;
      setMenuAnchor({ right, top, width });
    };

    updateMenuAnchor();
    window.addEventListener("resize", updateMenuAnchor);
    return () => {
      window.removeEventListener("resize", updateMenuAnchor);
    };
  }, [menu, resolvedViewport]);

  useEffect(() => {
    if (!menu) return;

    const handlePointerDown = (event) => {
      const menuEl = menuRef.current;
      const menuBtnEl = menuButtonRef.current;
      const target = event.target;
      if (!target || !menuEl) return;
      if (menuEl.contains(target)) return;
      if (menuBtnEl && menuBtnEl.contains(target)) return;
      setMenu(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [menu]);

  const menuStyle = {
    top: `${menuAnchor.top}px`,
    right: `${menuAnchor.right}px`,
    width: `${menuAnchor.width}px`,
  };

  return (
    <>
      <div className={cls}>
        <MobileMenu
          open={menu}
          onClose={() => setMenu(false)}
          anchorStyle={menuStyle}
          menuRef={menuRef}
          onSelectNav={setActiveNav}
        />
        <TopBar
          onMenu={() => setMenu((v) => !v)}
          menuButtonRef={menuButtonRef}
          activeNav={activeNav}
          hoverNav={hoverNav}
          onHoverNav={setHoverNav}
          onLeaveNav={() => setHoverNav("")}
          onSelectNav={setActiveNav}
        />
        <Hero heroVariant={heroVariant} />
        <Work />
        <Services />
        <About />
        <Stack />
        <Contact />
        <Footer />
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection title="Viewport">
          <TweakRadio
            value={viewportMode}
            options={[
              { value: "auto", label: "Auto" },
              { value: "manual", label: "Manual" },
            ]}
            onChange={(v) => setTweak("viewportMode", v)}
          />
          {viewportMode === "manual" && (
            <TweakRadio
              value={t.viewport}
              options={[
                { value: "desktop", label: "Desktop" },
                { value: "tablet", label: "Tablet" },
                { value: "mobile", label: "Mobile" },
              ]}
              onChange={(v) => setTweak("viewport", v)}
            />
          )}
        </TweakSection>
        <TweakSection title="Hero visual">
          <TweakRadio
            value={t.hero}
            options={[
              { value: "particles", label: "Particles" },
              { value: "blob", label: "Blob" },
              { value: "mark", label: "Rings" },
            ]}
            onChange={(v) => setTweak("hero", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);

