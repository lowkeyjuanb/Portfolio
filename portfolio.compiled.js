const {
  useState,
  useEffect,
  useRef,
  useMemo
} = React;
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "viewportMode": "auto",
  "viewport": "desktop",
  "accent": "#0055FF",
  "hero": "particles",
  "darkStack": true,
  "menuOpen": false
} /*EDITMODE-END*/;
function getViewportFromWidth(width) {
  if (width <= 640) return "mobile";
  if (width <= 1280) return "tablet";
  return "desktop";
}

// =================== Particle Sphere (canvas) ===================
function ParticleSphere({
  variant = "particles",
  dark = false
}) {
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
    const hexToRgb = hex => {
      const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      if (!m) return {
        r: 0,
        g: 0,
        b: 0
      };
      return {
        r: parseInt(m[1], 16),
        g: parseInt(m[2], 16),
        b: parseInt(m[3], 16)
      };
    };
    const rgbaFromHex = (hex, a) => {
      const {
        r,
        g,
        b
      } = hexToRgb(hex);
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
        z: Math.cos(phi)
      });
    }
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    let t0 = performance.now();
    const draw = () => {
      const t = (performance.now() - t0) / 1000;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2,
        cy = h / 2;
      const radius = Math.min(w, h) * 0.34;
      const rotY = t * 0.25;
      const rotX = Math.sin(t * 0.18) * 0.3;
      const cosY = Math.cos(rotY),
        sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX),
        sinX = Math.sin(rotX);
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
          const a = i / segs * Math.PI * 2;
          const wob = 1 + Math.sin(a * 3 + t) * 0.04 + Math.cos(a * 5 + t * 0.7) * 0.025;
          const r = radius * wob;
          const x = cx + Math.cos(a) * r;
          const y = cy + Math.sin(a) * r;
          if (i === 0) ctx.moveTo(x, y);else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        // dot center
        ctx.fillStyle = colorTertiary;
        ctx.beginPath();
        ctx.arc(cx, cy, 14, 0, Math.PI * 2);
        ctx.fill();
      } else if (variant === "mark") {
        // pulse rings
        for (let i = 0; i < 6; i++) {
          const r = radius * (0.4 + i * 0.18) + Math.sin(t + i) * 6;
          const ringAlpha = dark ? 0.26 : 0.18;
          const ringColor = i % 3 === 0 ? colorPrimary : i % 5 === 0 ? colorTertiary : dark ? "#f1ede4" : colorInk;
          ctx.strokeStyle = rgbaFromHex(ringColor, ringAlpha);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.stroke();
        }
      } else {
        // particles
        for (let i = 0; i < pts.length; i++) {
          const p = pts[i];
          // rotate
          let x = p.x,
            y = p.y,
            z = p.z;
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
            ctx.fillStyle = dark ? `rgba(241,237,228,${0.15 + alpha * 0.7})` : `rgba(10,10,10,${0.1 + alpha * 0.55})`;
          }
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [variant, dark]);
  return /*#__PURE__*/React.createElement("canvas", {
    ref: ref
  });
}

// =================== Project thumbnails (abstract) ===================
function ThumbA() {
  return /*#__PURE__*/React.createElement("div", {
    className: "thumb-weeii"
  }, /*#__PURE__*/React.createElement("img", {
    src: "./assets/weeii-logo.jpg",
    alt: "Weeii app logo",
    loading: "lazy",
    decoding: "async"
  }));
}
function ThumbB() {
  return /*#__PURE__*/React.createElement("div", {
    className: "thumb-carlo"
  }, /*#__PURE__*/React.createElement("img", {
    src: "./assets/carlo-logo.png",
    alt: "Dr. Carlo Pedroza brand logo",
    loading: "lazy",
    decoding: "async",
    onError: e => {
      e.currentTarget.onerror = null;
      e.currentTarget.src = "./assets/CARLO-PORTAFOLIO-still.jpg";
    }
  }));
}
function ThumbC() {
  // device mock with rounded screen
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 600 380",
    preserveAspectRatio: "xMidYMid slice"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "600",
    height: "380",
    fill: "#cdd4dc"
  }), /*#__PURE__*/React.createElement("g", {
    transform: "translate(190 24)"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "220",
    height: "332",
    rx: "36",
    fill: "#0a0a0a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "10",
    y: "10",
    width: "200",
    height: "312",
    rx: "28",
    fill: "#f1ede4"
  }), /*#__PURE__*/React.createElement("text", {
    x: "110",
    y: "70",
    textAnchor: "middle",
    fontFamily: "Archivo",
    fontWeight: "900",
    fontSize: "22",
    fill: "#0a0a0a",
    letterSpacing: "-1"
  }, "ATELIER"), /*#__PURE__*/React.createElement("text", {
    x: "110",
    y: "92",
    textAnchor: "middle",
    fontFamily: "JetBrains Mono",
    fontSize: "8",
    letterSpacing: "2",
    fill: "#7a7770"
  }, "SS / 26  INDEX"), /*#__PURE__*/React.createElement("rect", {
    x: "22",
    y: "120",
    width: "176",
    height: "100",
    rx: "14",
    fill: "#0a0a0a"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "110",
    cy: "170",
    r: "22",
    fill: "#e8c547"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "22",
    y: "232",
    width: "120",
    height: "10",
    rx: "4",
    fill: "#0a0a0a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "22",
    y: "250",
    width: "80",
    height: "10",
    rx: "4",
    fill: "#0a0a0a",
    opacity: ".5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "22",
    y: "282",
    width: "176",
    height: "32",
    rx: "16",
    fill: "#0a0a0a"
  }), /*#__PURE__*/React.createElement("text", {
    x: "110",
    y: "303",
    textAnchor: "middle",
    fontFamily: "Archivo",
    fontWeight: "700",
    fontSize: "10",
    fill: "#f1ede4",
    letterSpacing: "2"
  }, "RESERVE ")), /*#__PURE__*/React.createElement("text", {
    x: "20",
    y: "30",
    fontFamily: "JetBrains Mono",
    fontSize: "10",
    letterSpacing: "2",
    fill: "#0a0a0a"
  }, "002 / NATIVE"), /*#__PURE__*/React.createElement("text", {
    x: "580",
    y: "365",
    textAnchor: "end",
    fontFamily: "JetBrains Mono",
    fontSize: "10",
    letterSpacing: "2",
    fill: "#0a0a0a"
  }, "REACT NATIVE"));
}
function ThumbD() {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 600 380",
    preserveAspectRatio: "xMidYMid slice"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "600",
    height: "380",
    fill: "#e8e3d6"
  }), /*#__PURE__*/React.createElement("g", {
    stroke: "#0a0a0a",
    strokeWidth: "1"
  }, Array.from({
    length: 18
  }).map((_, i) => /*#__PURE__*/React.createElement("line", {
    key: i,
    x1: i * 36,
    y1: "0",
    x2: i * 36,
    y2: "380",
    opacity: i % 3 === 0 ? .4 : .12
  }))), /*#__PURE__*/React.createElement("text", {
    x: "30",
    y: "120",
    fontFamily: "Archivo",
    fontWeight: "900",
    fontSize: "120",
    letterSpacing: "-6",
    fill: "#0a0a0a"
  }, "04"), /*#__PURE__*/React.createElement("text", {
    x: "30",
    y: "170",
    fontFamily: "Archivo",
    fontWeight: "800",
    fontSize: "34",
    letterSpacing: "-1",
    fill: "#0a0a0a"
  }, "HOTHOUSE"), /*#__PURE__*/React.createElement("text", {
    x: "30",
    y: "200",
    fontFamily: "Instrument Serif",
    fontStyle: "italic",
    fontSize: "28",
    fill: "#5b7a99"
  }, " a research log."), /*#__PURE__*/React.createElement("rect", {
    x: "30",
    y: "240",
    width: "540",
    height: "1",
    fill: "#0a0a0a"
  }), /*#__PURE__*/React.createElement("text", {
    x: "30",
    y: "275",
    fontFamily: "JetBrains Mono",
    fontSize: "11",
    letterSpacing: "2",
    fill: "#0a0a0a"
  }, "NEXT.JS  MDX  TAILWIND"), /*#__PURE__*/React.createElement("text", {
    x: "30",
    y: "300",
    fontFamily: "JetBrains Mono",
    fontSize: "11",
    letterSpacing: "2",
    fill: "#0a0a0a"
  }, "AWS  CLOUDFRONT  ROUTE53"));
}
function ThumbE() {
  return /*#__PURE__*/React.createElement("div", {
    className: "thumb-jappy"
  }, /*#__PURE__*/React.createElement("img", {
    src: "./assets/jappy-logo.png",
    alt: "Jappy startup logo",
    loading: "lazy",
    decoding: "async"
  }));
}

// =================== Components ===================
function Star({
  size = 14,
  color = "currentColor"
}) {
  return /*#__PURE__*/React.createElement("svg", {
    className: "star-svg",
    viewBox: "0 0 24 24",
    width: size,
    height: size
  }, /*#__PURE__*/React.createElement("path", {
    fill: color,
    d: "M12 1l1.6 7.4L21 10l-7.4 1.6L12 19l-1.6-7.4L3 10l7.4-1.6z"
  }));
}
function TopBar({
  onMenu,
  menuButtonRef,
  activeNav,
  hoverNav,
  onHoverNav,
  onLeaveNav,
  onSelectNav
}) {
  const items = [{
    id: "work",
    label: "Projects"
  }, {
    id: "services",
    label: "Services"
  }, {
    id: "about",
    label: "About"
  }, {
    id: "contact",
    label: "Contact"
  }];
  const highlightedNav = hoverNav || activeNav;
  return /*#__PURE__*/React.createElement("div", {
    className: "topbar"
  }, /*#__PURE__*/React.createElement("a", {
    className: "logo",
    href: "#"
  }, /*#__PURE__*/React.createElement("span", {
    className: "logo-mark"
  }), /*#__PURE__*/React.createElement("span", null, "juan", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--blue)"
    }
  }, "."), "barrera")), /*#__PURE__*/React.createElement("nav", {
    className: "nav-pri"
  }, items.map(item => /*#__PURE__*/React.createElement("a", {
    key: item.id,
    href: `#${item.id}`,
    className: highlightedNav === item.id ? "active" : "",
    onMouseEnter: () => onHoverNav(item.id),
    onMouseLeave: onLeaveNav,
    onFocus: () => onHoverNav(item.id),
    onBlur: onLeaveNav,
    onClick: () => onSelectNav(item.id)
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), item.label))), /*#__PURE__*/React.createElement("div", {
    className: "nav-end"
  }, /*#__PURE__*/React.createElement("button", {
    ref: menuButtonRef,
    className: "menu-pill",
    onClick: onMenu
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      width: 12,
      height: 8,
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      height: 1,
      background: "currentColor"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      height: 1,
      background: "currentColor"
    }
  })), "Menu"), /*#__PURE__*/React.createElement("span", {
    className: "mono hide-tablet",
    style: {
      fontSize: 10,
      opacity: .65
    }
  }, "Portfolio Edition 2026")));
}
function Hero({
  heroVariant
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "hero",
    "data-screen-label": "01 Hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row-i"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, "Role"), /*#__PURE__*/React.createElement("span", null, "Full-Stack and Mobile Developer")), /*#__PURE__*/React.createElement("div", {
    className: "row-i"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, "Available"), /*#__PURE__*/React.createElement("span", null, "Web | Mobile | Product")), /*#__PURE__*/React.createElement("div", {
    className: "row-i"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, "Contact"), /*#__PURE__*/React.createElement("span", null, "jbarrera.codes@gmail.com"))), /*#__PURE__*/React.createElement("div", {
    className: "hero-meta hide-tablet",
    style: {
      alignItems: "flex-end",
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "row-i",
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, "Current Focus"), /*#__PURE__*/React.createElement("span", null, "Shipping thoughtful product work")), /*#__PURE__*/React.createElement("div", {
    className: "row-i",
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, "Recent"), /*#__PURE__*/React.createElement("span", null, "Weeii App | Dr. Carlo Pedroza"))), /*#__PURE__*/React.createElement("div", {
    className: "hero-stage"
  }, /*#__PURE__*/React.createElement(ParticleSphere, {
    variant: heroVariant
  }), /*#__PURE__*/React.createElement("span", {
    className: "corner tl mono"
  }, "Folio / 01"), /*#__PURE__*/React.createElement("span", {
    className: "corner tr mono"
  }, "Process | Iterative"))), /*#__PURE__*/React.createElement("h1", {
    className: "hero-title"
  }, "HIGH-PERFORMANCE", /*#__PURE__*/React.createElement("br", null), "WEB & MOBILE", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", null, "PRODUCTS.")), /*#__PURE__*/React.createElement("div", {
    className: "hero-bottom"
  }, /*#__PURE__*/React.createElement("p", {
    className: "lede"
  }, "I design and ship polished software products with a strong focus on architecture, performance, and user-centered execution."), /*#__PURE__*/React.createElement("div", {
    className: "ctas"
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn dark",
    href: "#work"
  }, "View My Work ", /*#__PURE__*/React.createElement("span", {
    className: "arr"
  }, "->")), /*#__PURE__*/React.createElement("a", {
    className: "btn",
    href: "#contact"
  }, "Contact Me ", /*#__PURE__*/React.createElement("span", {
    className: "arr"
  }, "->")))));
}
function Work() {
  const projects = [{
    cls: "feat e",
    thumb: /*#__PURE__*/React.createElement(ThumbE, null),
    type: "Current Startup",
    year: "2026",
    title: "Jappy",
    desc: "Building the product experience for Jappy, a home-services startup focused on easy scheduling, dependable service delivery, and polished mobile-first journeys.",
    stack: ["Mobile Product", "UX Strategy", "Frontend", "Startup"],
    meta: ["001", "Web | Live"],
    link: "https://jappyapp.com/",
    linkLabel: "Visit Website",
    status: "Live"
  }, {
    cls: "feat",
    thumb: /*#__PURE__*/React.createElement(ThumbA, null),
    type: "Featured App",
    year: "2024 - 2025",
    title: "Weeii App",
    desc: "Created and optimized cross-platform features for a consumer mobile app, focusing on storefront, location, and product discovery flows.",
    stack: ["Flutter", "Swift", "Mobile UX", "App Store"],
    meta: ["002", "iOS | Android"],
    link: "https://apps.apple.com/us/app/weeii/id6467936370",
    linkLabel: "View on App Store",
    status: "Live"
  }, {
    cls: "b",
    thumb: /*#__PURE__*/React.createElement(ThumbB, null),
    type: "Featured Website",
    year: "2023",
    title: "Dr. Carlo Pedroza Website",
    desc: "Designed and built a service-focused medical website with clear navigation, informative content structure, and a polished presentation.",
    stack: ["Responsive Web", "Content Design", "Frontend"],
    meta: ["003", "Web | Medical Services"],
    link: "https://carlopedrozaotorrino.com/",
    linkLabel: "Visit Website",
    status: "Live"
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "sec",
    id: "work",
    "data-screen-label": "02 Work"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-num"
  }, "02 / PROJECTS"), /*#__PURE__*/React.createElement("h2", {
    className: "sec-title"
  }, "Selected", /*#__PURE__*/React.createElement("br", null), "projects ", /*#__PURE__*/React.createElement("em", null, "(curated work).")), /*#__PURE__*/React.createElement("div", {
    className: "sec-meta"
  }, "3 featured entries", /*#__PURE__*/React.createElement("br", null), "Case study archive growing")), /*#__PURE__*/React.createElement("div", {
    className: "work-grid"
  }, projects.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: `card ${p.cls}`,
    style: {
      gridColumn: i === 0 ? "1 / -1" : "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "meta"
  }, /*#__PURE__*/React.createElement("span", null, p.meta[0], " - ", p.type), /*#__PURE__*/React.createElement("span", {
    className: "tag"
  }, p.year)), /*#__PURE__*/React.createElement("div", {
    className: "thumb"
  }, p.thumb), /*#__PURE__*/React.createElement("div", {
    className: "body"
  }, /*#__PURE__*/React.createElement("h3", null, p.title), /*#__PURE__*/React.createElement("p", null, p.desc), /*#__PURE__*/React.createElement("div", {
    className: "stack"
  }, p.stack.map(s => /*#__PURE__*/React.createElement("span", {
    key: s
  }, s)))), /*#__PURE__*/React.createElement("div", {
    className: "foot"
  }, /*#__PURE__*/React.createElement("span", null, p.meta[1]), /*#__PURE__*/React.createElement("a", {
    href: p.link,
    target: p.link.startsWith("http") ? "_blank" : undefined,
    rel: p.link.startsWith("http") ? "noreferrer" : undefined
  }, p.linkLabel, " ->"))))));
}
function Services() {
  const items = [{
    n: "01",
    t: /*#__PURE__*/React.createElement(React.Fragment, null, "Full-Stack ", /*#__PURE__*/React.createElement("em", null, "delivery")),
    d: "End-to-end product development with architecture, implementation, and launch support for modern web platforms.",
    c: "Scope on request"
  }, {
    n: "02",
    t: /*#__PURE__*/React.createElement(React.Fragment, null, "Mobile ", /*#__PURE__*/React.createElement("em", null, "development")),
    d: "Cross-platform and native mobile work in Flutter and Swift, focused on polished UX and reliable delivery.",
    c: "Scope on request"
  }, {
    n: "03",
    t: /*#__PURE__*/React.createElement(React.Fragment, null, "Frontend ", /*#__PURE__*/React.createElement("em", null, "engineering")),
    d: "High-quality frontend implementation with strong performance, responsive behavior, and maintainable UI systems.",
    c: "Scope on request"
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "sec",
    id: "services",
    "data-screen-label": "03 Services"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-num"
  }, "03 / SERVICES"), /*#__PURE__*/React.createElement("h2", {
    className: "sec-title"
  }, "How I ", /*#__PURE__*/React.createElement("em", null, "build"), " and ship."), /*#__PURE__*/React.createElement("div", {
    className: "sec-meta"
  }, "Focused offerings", /*#__PURE__*/React.createElement("br", null), "Clear execution")), /*#__PURE__*/React.createElement("div", {
    className: "services"
  }, items.map(s => /*#__PURE__*/React.createElement("div", {
    className: "srv",
    key: s.n
  }, /*#__PURE__*/React.createElement("div", {
    className: "srv-num"
  }, s.n), /*#__PURE__*/React.createElement("div", {
    className: "srv-title"
  }, s.t), /*#__PURE__*/React.createElement("div", {
    className: "srv-desc"
  }, s.d), /*#__PURE__*/React.createElement("a", {
    className: "srv-cta",
    href: "#contact"
  }, s.c, " ", /*#__PURE__*/React.createElement("span", {
    className: "arr",
    "aria-hidden": "true"
  }, "\u2192"))))));
}
function About() {
  return /*#__PURE__*/React.createElement("section", {
    className: "sec",
    id: "about",
    "data-screen-label": "04 About"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-num"
  }, "04 / ABOUT"), /*#__PURE__*/React.createElement("h2", {
    className: "sec-title"
  }, "Engineering ", /*#__PURE__*/React.createElement("em", null, "precision"), /*#__PURE__*/React.createElement("br", null), "with product focus."), /*#__PURE__*/React.createElement("div", {
    className: "sec-meta"
  }, "Read time", /*#__PURE__*/React.createElement("br", null), "~1 min")), /*#__PURE__*/React.createElement("div", {
    className: "about"
  }, /*#__PURE__*/React.createElement("p", {
    className: "about-lede"
  }, "I am a Full-Stack Developer focused on building scalable, thoughtful software solutions that feel clear and reliable."), /*#__PURE__*/React.createElement("div", {
    className: "about-side"
  }, /*#__PURE__*/React.createElement("p", null, "My approach blends technical range with practical delivery. Whether shaping frontend experiences or backend systems, I care about performance, clarity, and shipping work that serves people."), /*#__PURE__*/React.createElement("p", null, "I am most useful when a project needs both taste and rigor: clean implementation, solid architecture, and product-minded execution."))));
}
function Stack() {
  const items = [{
    nm: "HTML5",
    cat: "Frontend",
    yr: "Core",
    lvl: 92
  }, {
    nm: "CSS3",
    cat: "Frontend",
    yr: "Core",
    lvl: 90
  }, {
    nm: "JavaScript",
    cat: "Language",
    yr: "Core",
    lvl: 93
  }, {
    nm: "React",
    cat: "Frontend",
    yr: "Core",
    lvl: 91
  }, {
    nm: "Node.js",
    cat: "Backend",
    yr: "Core",
    lvl: 86
  }, {
    nm: "MySQL",
    cat: "Data",
    yr: "Core",
    lvl: 82
  }, {
    nm: "Flutter",
    cat: "Mobile",
    yr: "Core",
    lvl: 88
  }, {
    nm: "Swift",
    cat: "Mobile",
    yr: "Core",
    lvl: 80
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "sec stack-section",
    id: "stack",
    "data-screen-label": "05 Stack"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-num"
  }, "05 / STACK"), /*#__PURE__*/React.createElement("h2", {
    className: "sec-title",
    style: {
      color: "var(--gray-100)"
    }
  }, "Technical stack,", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", null, "plainly arranged.")), /*#__PURE__*/React.createElement("div", {
    className: "sec-meta"
  }, "8 core tools", /*#__PURE__*/React.createElement("br", null), "Production ready")), /*#__PURE__*/React.createElement("div", {
    className: "stack-grid"
  }, items.map(s => /*#__PURE__*/React.createElement("div", {
    className: "chip",
    key: s.nm
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "cat"
  }, s.cat), /*#__PURE__*/React.createElement("div", {
    className: "nm"
  }, s.nm)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "bar"
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      width: `${s.lvl}%`
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "yr",
    style: {
      marginTop: 8,
      display: "flex",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", null, s.yr), /*#__PURE__*/React.createElement("span", null, s.lvl, "/100")))))));
}
function Contact() {
  return /*#__PURE__*/React.createElement("section", {
    className: "contact",
    id: "contact",
    "data-screen-label": "06 Contact"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-num"
  }, "06 / CONTACT"), /*#__PURE__*/React.createElement("div", {
    className: "sec-meta hide-tablet"
  }, "Reply window", /*#__PURE__*/React.createElement("br", null), "~24-48h")), /*#__PURE__*/React.createElement("h2", null, "Let us build something", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", null, "together.")), /*#__PURE__*/React.createElement("div", {
    className: "contact-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "contact-cell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, "Email"), /*#__PURE__*/React.createElement("div", {
    className: "big"
  }, /*#__PURE__*/React.createElement("a", {
    href: "mailto:jbarrera.codes@gmail.com"
  }, "jbarrera.codes@gmail.com ->"))), /*#__PURE__*/React.createElement("div", {
    className: "contact-cell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, "LinkedIn"), /*#__PURE__*/React.createElement("div", {
    className: "big"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://www.linkedin.com/in/juandediosbarrera/",
    target: "_blank",
    rel: "noreferrer"
  }, "juandediosbarrera ->"))), /*#__PURE__*/React.createElement("div", {
    className: "contact-cell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, "GitHub"), /*#__PURE__*/React.createElement("div", {
    className: "big"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://github.com/lowkeyjuanb",
    target: "_blank",
    rel: "noreferrer"
  }, "lowkeyjuanb ->")))));
}
function Footer() {
  return /*#__PURE__*/React.createElement("div", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("div", null, "(c) 2026 Juan de Dios Barrera"), /*#__PURE__*/React.createElement("div", {
    className: "hide-tablet"
  }, "Built from real project work with a refined editorial system."), /*#__PURE__*/React.createElement("div", null, "Portfolio edition | Active update cycle"));
}
function MobileMenu({
  open,
  onClose,
  anchorStyle,
  menuRef,
  onSelectNav
}) {
  const menuItems = [{
    n: "01",
    t: "Projects",
    anchor: "work"
  }, {
    n: "02",
    t: "Services",
    anchor: "services"
  }, {
    n: "03",
    t: "About",
    anchor: "about"
  }, {
    n: "04",
    t: "Contact",
    anchor: "contact"
  }];
  return /*#__PURE__*/React.createElement("div", {
    ref: menuRef,
    className: `menu-sheet ${open ? "open" : ""}`,
    style: anchorStyle
  }, /*#__PURE__*/React.createElement("div", {
    className: "top"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "logo-mark",
    style: {
      background: "var(--gray-100)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 900
    }
  }, "Juan Barrera")), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close",
    style: {
      color: "var(--gray-100)",
      fontSize: 22
    }
  }, "x")), /*#__PURE__*/React.createElement("nav", {
    className: "links",
    "aria-label": "Mobile navigation"
  }, menuItems.map(item => /*#__PURE__*/React.createElement("a", {
    key: item.n,
    href: `#${item.anchor}`,
    onClick: () => {
      onSelectNav(item.anchor);
      onClose();
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "n"
  }, "- ", item.n, " -"), /*#__PURE__*/React.createElement("span", null, item.t)))), /*#__PURE__*/React.createElement("div", {
    className: "foot"
  }, /*#__PURE__*/React.createElement("span", null, "jbarrera.codes@gmail.com"), /*#__PURE__*/React.createElement("span", null, "@lowkeyjuanb")));
}
// =================== App ===================
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [menu, setMenu] = useState(false);
  const [activeNav, setActiveNav] = useState("work");
  const [hoverNav, setHoverNav] = useState("");
  const menuButtonRef = useRef(null);
  const menuRef = useRef(null);
  const [menuAnchor, setMenuAnchor] = useState({
    top: 74,
    right: 20,
    width: 280
  });
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
      setMenuAnchor({
        right,
        top,
        width
      });
    };
    updateMenuAnchor();
    window.addEventListener("resize", updateMenuAnchor);
    return () => {
      window.removeEventListener("resize", updateMenuAnchor);
    };
  }, [menu, resolvedViewport]);
  useEffect(() => {
    if (!menu) return;
    const handlePointerDown = event => {
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
    width: `${menuAnchor.width}px`
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: cls
  }, /*#__PURE__*/React.createElement(MobileMenu, {
    open: menu,
    onClose: () => setMenu(false),
    anchorStyle: menuStyle,
    menuRef: menuRef,
    onSelectNav: setActiveNav
  }), /*#__PURE__*/React.createElement(TopBar, {
    onMenu: () => setMenu(v => !v),
    menuButtonRef: menuButtonRef,
    activeNav: activeNav,
    hoverNav: hoverNav,
    onHoverNav: setHoverNav,
    onLeaveNav: () => setHoverNav(""),
    onSelectNav: setActiveNav
  }), /*#__PURE__*/React.createElement(Hero, {
    heroVariant: heroVariant
  }), /*#__PURE__*/React.createElement(Work, null), /*#__PURE__*/React.createElement(Services, null), /*#__PURE__*/React.createElement(About, null), /*#__PURE__*/React.createElement(Stack, null), /*#__PURE__*/React.createElement(Contact, null), /*#__PURE__*/React.createElement(Footer, null)), /*#__PURE__*/React.createElement(TweaksPanel, {
    title: "Tweaks"
  }, /*#__PURE__*/React.createElement(TweakSection, {
    title: "Viewport"
  }, /*#__PURE__*/React.createElement(TweakRadio, {
    value: viewportMode,
    options: [{
      value: "auto",
      label: "Auto"
    }, {
      value: "manual",
      label: "Manual"
    }],
    onChange: v => setTweak("viewportMode", v)
  }), viewportMode === "manual" && /*#__PURE__*/React.createElement(TweakRadio, {
    value: t.viewport,
    options: [{
      value: "desktop",
      label: "Desktop"
    }, {
      value: "tablet",
      label: "Tablet"
    }, {
      value: "mobile",
      label: "Mobile"
    }],
    onChange: v => setTweak("viewport", v)
  })), /*#__PURE__*/React.createElement(TweakSection, {
    title: "Hero visual"
  }, /*#__PURE__*/React.createElement(TweakRadio, {
    value: t.hero,
    options: [{
      value: "particles",
      label: "Particles"
    }, {
      value: "blob",
      label: "Blob"
    }, {
      value: "mark",
      label: "Rings"
    }],
    onChange: v => setTweak("hero", v)
  }))));
}
ReactDOM.createRoot(document.getElementById("app")).render(/*#__PURE__*/React.createElement(App, null));
