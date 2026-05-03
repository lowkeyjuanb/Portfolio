import { useState } from "react";
import "./App.css";
import { portfolioContent } from "./content/portfolioContent";

function SystemTag({ children, tone = "yellow" }) {
  return <span className={`system-tag system-tag-${tone}`}>{children}</span>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeWebsiteSlide, setActiveWebsiteSlide] = useState(0);
  const { brand, hero, projects, about, skills, contact } = portfolioContent;

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  const featuredWork = projects.find((project) => project.mediaStyle === "browser") ?? projects[0];
  const secondaryWork = projects.find((project) => project.id !== featuredWork.id) ?? projects[0];

  const frontendGroup = skills.groups.find((group) => group.title === "Frontend");
  const mobileGroup = skills.groups.find((group) => group.title === "Mobile");
  const backendGroup = skills.groups.find((group) => group.title === "Backend and Data");
  const languageGroup = skills.groups.find((group) => group.title === "Languages");

  const processSteps = [
    {
      id: "01",
      label: "DISCOVER",
      title: "Technical Discovery",
      copy: "Requirements mapping, constraint review, and project feasibility before code starts.",
    },
    {
      id: "02",
      label: "DESIGN",
      title: "System Design",
      copy: "Flows, interface direction, and software structure aligned before implementation.",
    },
    {
      id: "03",
      label: "BUILD",
      title: "Full-Stack Dev",
      copy: "Frontend, backend, and mobile execution with attention to performance and clarity.",
    },
    {
      id: "04",
      label: "LAUNCH",
      title: "Deployment",
      copy: "Testing, production readiness, and release handoff for dependable delivery.",
    },
    {
      id: "05",
      label: "OPTIMIZE",
      title: "Optimization",
      copy: "Post-launch refinements, cleanup, and iterative improvements as usage grows.",
    },
  ];

  const scrollToSection = (href) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false);
    }
  };

  const goToWebsiteSlide = (direction) => {
    const total = featuredWork.images.length;
    setActiveWebsiteSlide((current) => (current + direction + total) % total);
  };

  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <button className="brand-lockup" onClick={() => scrollToSection("#home")} type="button">
            <span>DEV_CORE / ARCHIVE.01</span>
          </button>

          <nav className="topbar-nav" aria-label="Primary">
            {navItems.map((item) => (
              <button key={item.href} onClick={() => scrollToSection(item.href)} type="button">
                {item.label}
              </button>
            ))}
          </nav>

          <button className="topbar-cta" onClick={() => scrollToSection("#contact")} type="button">
            START_PROJECT
          </button>

          <button
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
            className="menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            MENU
          </button>
        </div>

        {menuOpen ? (
          <div className="mobile-nav">
            {navItems.map((item) => (
              <button key={item.href} onClick={() => scrollToSection(item.href)} type="button">
                {item.label}
              </button>
            ))}
            <button onClick={() => scrollToSection("#contact")} type="button">
              START_PROJECT
            </button>
          </div>
        ) : null}
      </header>

      <main>
        <section className="hero-section page-shell" id="home">
          <div className="hero-status">
            <SystemTag>STATUS: ONLINE</SystemTag>
            <span>V.2.0.4</span>
          </div>

          <p className="technical-kicker">// 01 INITIALIZATION</p>
          <h1>{hero.title}</h1>

          <div className="hero-columns">
            <p className="hero-copy">{hero.description}</p>

            <div className="hero-actions">
              <button
                className="action-primary"
                onClick={() => scrollToSection("#contact")}
                type="button"
              >
                START PROJECT
              </button>
              <button
                className="action-secondary"
                onClick={() => scrollToSection("#work")}
                type="button"
              >
                VIEW WORK
              </button>
            </div>
          </div>
        </section>

        <section className="services-section page-shell" id="services">
          <div className="section-frame-label">[SEC 02 // CAPABILITIES]</div>

          <div className="section-header">
            <div>
              <h2>
                Service
                <br />
                Architecture
              </h2>
              <p>
                A structured view of the capabilities behind the portfolio, organized to match
                the design direction you provided instead of the previous generic section cards.
              </p>
            </div>

            <div className="section-status">
              <span>Documentation Status</span>
              <strong>VERSION 2.4 / ACTIVE</strong>
            </div>
          </div>

          <div className="service-row">
            <article className="service-card">
              <div className="service-card-head">
                <h3>
                  Web
                  <br />
                  Dev
                </h3>
                <span>01</span>
              </div>
              <p>
                Frontend systems focused on clear information flow, responsive behavior, and
                dependable implementation from concept to production launch.
              </p>
              <div className="service-subtitle">Core Stack</div>
              <ul className="service-stack">
                {(frontendGroup?.items ?? []).map((item) => (
                  <li key={item.label}>{item.label}</li>
                ))}
              </ul>
            </article>

            <figure className="service-visual service-visual-web" aria-hidden="true">
              <div className="pixel-stage">
                <div className="pixel-cluster pixel-cluster-a" />
                <div className="pixel-cluster pixel-cluster-b" />
                <div className="pixel-cluster pixel-cluster-c" />
              </div>
              <div className="laptop-icon">
                <div className="laptop-screen">
                  <div className="screen-grid">
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <div className="laptop-base" />
                <div className="laptop-shadow" />
              </div>
              <div className="visual-label">SYSTEM OVERVIEW</div>
              <div className="visual-label visual-label-primary">RESPONSIVE WEB</div>
            </figure>
          </div>

          <div className="service-row service-row-reverse">
            <figure className="service-visual service-visual-mobile" aria-hidden="true">
              <div className="phone-signal">
                <span />
                <span />
                <span />
              </div>
              <div className="device-phone">
                <div className="device-phone-inner">
                  <div className="phone-notch" />
                  <div className="phone-card-stack">
                    <span className="phone-card phone-card-top" />
                    <span className="phone-card phone-card-mid" />
                    <span className="phone-card phone-card-low" />
                  </div>
                </div>
              </div>
              <div className="service-line">
                <span>iOS Target</span>
                <span>Android Target</span>
              </div>
            </figure>

            <article className="service-card">
              <div className="service-card-head">
                <h3>
                  Mobile
                  <br />
                  Apps
                </h3>
                <span>02</span>
              </div>
              <p>
                Product-driven mobile work with a focus on storefront flows, performance, and
                polished user experience across devices.
              </p>
              <div className="service-subtitle">Core Stack</div>
              <ul className="service-stack">
                {(mobileGroup?.items ?? []).map((item) => (
                  <li key={item.label}>{item.label}</li>
                ))}
              </ul>
            </article>
          </div>

          <div className="service-grid">
            <article className="service-mini-card">
              <div className="service-mini-head">
                <h3>03 / CMS & Architecture</h3>
                <SystemTag tone="yellow">[STABLE]</SystemTag>
              </div>
              <p>
                Content structure, information architecture, and clean presentation logic for
                websites that need to feel polished and easy to maintain.
              </p>
              <div className="mini-tags">
                <span>CONTENT DESIGN</span>
                <span>RESPONSIVE WEB</span>
              </div>
            </article>

            <article className="service-mini-card service-mini-card-dark">
              <div className="service-mini-head">
                <h3>04 / Backend & Data</h3>
                <SystemTag tone="blue">CORE</SystemTag>
              </div>
              <p>
                Application logic, data handling, and technical foundations that keep products
                reliable once they move beyond the initial interface layer.
              </p>
              <div className="mini-tags mini-tags-dark">
                {(backendGroup?.items ?? []).map((item) => (
                  <span key={item.label}>{item.label}</span>
                ))}
                {(languageGroup?.items ?? []).map((item) => (
                  <span key={item.label}>{item.label}</span>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="work-band" id="work">
          <div className="work-section page-shell">
            <div className="work-header">
              <h2>
                Selected
                <br />
                Work
              </h2>
              <div className="work-meta">
                <span>FIG. 01 - 03 // ARCHIVE</span>
                <div>
                  <SystemTag tone="yellow">[LIVE]</SystemTag>
                  <SystemTag tone="yellow">[V.1.0]</SystemTag>
                </div>
              </div>
            </div>

            <article className="featured-work">
              <figure className="featured-work-visual">
                <div
                  className="featured-work-track"
                  style={{ transform: `translateX(-${activeWebsiteSlide * 100}%)` }}
                >
                  {featuredWork.images.map((image) => (
                    <img
                      key={image.alt}
                      alt={image.alt}
                      className="featured-work-image"
                      src={image.src}
                    />
                  ))}
                </div>
                <div className="figure-chip">FIG 01</div>
                <div className="featured-work-controls">
                  <button
                    aria-label="Previous website screenshot"
                    className="carousel-button"
                    onClick={() => goToWebsiteSlide(-1)}
                    type="button"
                  >
                    &lt;
                  </button>
                  <button
                    aria-label="Next website screenshot"
                    className="carousel-button"
                    onClick={() => goToWebsiteSlide(1)}
                    type="button"
                  >
                    &gt;
                  </button>
                </div>
                <div className="featured-work-dots">
                  {featuredWork.images.map((image, index) => (
                    <button
                      key={image.alt}
                      aria-label={`Show website screenshot ${index + 1}`}
                      className={`carousel-dot ${index === activeWebsiteSlide ? "is-active" : ""}`}
                      onClick={() => setActiveWebsiteSlide(index)}
                      type="button"
                    />
                  ))}
                </div>
              </figure>

              <div className="featured-work-copy">
                <div className="work-type">WEBSITE SYSTEM</div>
                <h3>{featuredWork.title}</h3>
                <p>{featuredWork.description}</p>

                <div className="work-facts">
                  <div>
                    <span>Stack</span>
                    <strong>{featuredWork.stack.join(" / ")}</strong>
                  </div>
                  <div>
                    <span>Impact</span>
                    <strong>Clear content structure</strong>
                  </div>
                </div>

                <a href={featuredWork.links[0].href} rel="noreferrer" target="_blank">
                  VIEW LIVE PROJECT
                </a>
              </div>
            </article>

            <article className="app-work-card">
              <div className="app-work-copy">
                <div className="work-type">MOBILE PRODUCT</div>
                <h3>{secondaryWork.title}</h3>
                <p>{secondaryWork.description}</p>

                <div className="work-facts">
                  <div>
                    <span>Stack</span>
                    <strong>{secondaryWork.stack.join(" / ")}</strong>
                  </div>
                  <div>
                    <span>Focus</span>
                    <strong>Storefront / discovery / location</strong>
                  </div>
                </div>

                <a href={secondaryWork.links[0].href} rel="noreferrer" target="_blank">
                  VIEW ON APP STORE
                </a>
              </div>

              <div className="app-phone-gallery">
                {secondaryWork.images.map((image, index) => (
                  <figure key={image.alt} className="app-phone-card">
                    <div className="figure-chip">{`FIG 0${index + 2}`}</div>
                    <div className="app-phone-device">
                      <span className="app-phone-button app-phone-button-top" />
                      <span className="app-phone-button app-phone-button-mid" />
                      <span className="app-phone-button app-phone-button-low" />
                      <div className="app-phone-frame">
                        <div className="app-phone-island" />
                        <div className="app-phone-display">
                          <img alt={image.alt} className="app-phone-screen" src={image.src} />
                        </div>
                        <div className="app-phone-home-indicator" />
                      </div>
                    </div>
                  </figure>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="process-section page-shell" id="process">
          <div className="process-header">
            <div>
              <p className="technical-kicker">// SEC 03 // WORKFLOW</p>
              <h2>
                Engineering
                <br />
                Process
              </h2>
            </div>
            <p>
              The workflow follows the same concise, modular rhythm as the reference design:
              discovery, design, build, launch, and optimization.
            </p>
          </div>

          <div className="process-grid">
            {processSteps.map((step) => (
              <article key={step.id} className="process-card">
                <span>{`${step.id} / ${step.label}`}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about-section page-shell" id="about">
          <div className="about-copy">
            <p className="technical-kicker">// THE_ENGINEER</p>
            <h2>
              Bilingual Full-Stack
              <br />
              Expert.
            </h2>
            <p>{about.paragraphs[0]}</p>
            <p>{about.paragraphs[1]}</p>

            <div className="about-stats">
              <div>
                <strong>03+</strong>
                <span>Years Experience</span>
              </div>
              <div>
                <strong>10+</strong>
                <span>Projects Shipped</span>
              </div>
              <div>
                <strong>{brand.name.split(" ")[0]}</strong>
                <span>Bilingual Delivery</span>
              </div>
            </div>
          </div>

          <figure className="about-portrait">
            <img alt="Juan Barrera portrait" src={about.image} />
            <figcaption>ARCHIVE.ENGINE_V1</figcaption>
          </figure>
        </section>

        <section className="contact-section page-shell" id="contact">
          <div className="contact-header">
            <div>
              <SystemTag>STATUS: AVAILABLE FOR HIRE</SystemTag>
              <h2>
                Initiate
                <br />
                Protocol
              </h2>
            </div>
            <p>
              Structured software begins with a clear brief. Reach out with the product, platform,
              or collaboration you have in mind and we can scope the next step.
            </p>
          </div>

          <div className="contact-grid">
            <div className="contact-briefing-panel">
              <div className="contact-panel-id">FIG. 01 / DIRECT BRIEF CHANNEL</div>

              <div className="contact-launch-head">
                <span>PROJECT LAUNCH</span>
                <strong>No forms. Direct signal only.</strong>
                <p>
                  Send a concise project brief with scope, timeline, and current constraints. You
                  will get a focused reply with next steps.
                </p>
              </div>

              <div className="contact-launch-actions">
                <a className="action-primary" href="mailto:jbarrera.codes@gmail.com?subject=Project%20Brief">
                  SEND PROJECT BRIEF
                </a>
                <a
                  className="action-secondary"
                  href="https://www.linkedin.com/in/juandediosbarrera/"
                  rel="noreferrer"
                  target="_blank"
                >
                  OPEN LINKEDIN CHANNEL
                </a>
              </div>

              <div className="contact-response-strip">
                <div>
                  <span>Response Window</span>
                  <strong>&lt; 24 Hours</strong>
                </div>
                <div>
                  <span>Current Role</span>
                  <strong>{hero.eyebrow}</strong>
                </div>
                <div>
                  <span>Timezone</span>
                  <strong>Pacific Time (US)</strong>
                </div>
              </div>

              <div className="contact-lane-grid">
                <article className="contact-lane-card">
                  <span>Lane 01</span>
                  <h3>Web Platforms</h3>
                  <p>Frontend or full-stack builds with clear architecture, clean UX, and launch-ready output.</p>
                </article>
                <article className="contact-lane-card">
                  <span>Lane 02</span>
                  <h3>Mobile Products</h3>
                  <p>Cross-platform app features, product refinement, and performance-focused implementation.</p>
                </article>
                <article className="contact-lane-card">
                  <span>Lane 03</span>
                  <h3>Engineering Support</h3>
                  <p>Architecture direction, code quality upgrades, and product roadmap execution support.</p>
                </article>
              </div>
            </div>

            <div className="contact-side">
              <div className="contact-channel-block">
                <h3>Direct Channels</h3>
                <ul>
                  <li>
                    <span>Primary Email</span>
                    <a href="mailto:jbarrera.codes@gmail.com">jbarrera.codes@gmail.com</a>
                  </li>
                  <li>
                    <span>Primary Role</span>
                    <p>{hero.eyebrow}</p>
                  </li>
                </ul>
              </div>

              <div className="contact-channel-block">
                <h3>Social Graph</h3>
                <ul>
                  {contact.methods.map((method) => (
                    <li key={method.label}>
                      <a
                        href={method.href}
                        rel="noreferrer"
                        target={method.href.startsWith("mailto:") ? undefined : "_blank"}
                      >
                        <span>{method.label}</span>
                        <strong>-&gt;</strong>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="contact-tagline">
            LET&apos;S BUILD SOMETHING <span>RELIABLE</span>.
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>{contact.footerNote}</span>
        <div>
          {contact.methods.map((method) => (
            <a
              key={method.label}
              href={method.href}
              rel="noreferrer"
              target={method.href.startsWith("mailto:") ? undefined : "_blank"}
            >
              {method.label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}

export default App;
