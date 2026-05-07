import { useState } from "react";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Stack", href: "#stack" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false);
    }
  };

  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <button className="brand-lockup" onClick={() => scrollToSection("#home")} type="button">
            <span className="brand-dot" />
            <span>Portfolio Template</span>
          </button>

          <nav className="topbar-nav" aria-label="Primary">
            {navItems.map((item) => (
              <button key={item.href} onClick={() => scrollToSection(item.href)} type="button">
                {item.label}
              </button>
            ))}
          </nav>

          <button className="topbar-cta" onClick={() => scrollToSection("#contact")} type="button">
            Start Project
          </button>

          <button
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
            className="menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            Index
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
              Start Project
            </button>
          </div>
        ) : null}
      </header>

      <main>
        <section className="hero-section page-shell" id="home">
          <div className="hero-kicker-row">
            <p className="technical-kicker">01 / HERO</p>
            <p className="technical-kicker">Template Mode</p>
          </div>
          <h1 className="hero-title">
            Main Headline
            <br />
            <em>Goes Here</em>
          </h1>
          <div className="hero-bottom">
            <p className="hero-copy">
              Placeholder intro text. We will replace this section content with your final copy.
            </p>
            <div className="hero-meta">
              <div>
                <span>Role</span>
                <strong>Placeholder</strong>
              </div>
              <div>
                <span>Focus</span>
                <strong>Placeholder</strong>
              </div>
            </div>
            <div className="hero-actions">
              <button className="action-primary" type="button">
                Primary CTA
              </button>
              <button className="action-secondary" type="button">
                Secondary CTA
              </button>
            </div>
          </div>
        </section>

        <section className="work-section page-shell" id="work">
          <div className="section-head">
            <p className="technical-kicker">02 / WORK</p>
            <h2>
              Selected
              <br />
              Work
            </h2>
          </div>

          <article className="featured-work">
            <figure className="featured-media">
              <div className="figure-chip">FIG 01</div>
            </figure>
            <div className="featured-copy">
              <p className="project-eyebrow">Project Category</p>
              <h3>Featured Project Title</h3>
              <p>Short project description placeholder.</p>
              <div className="fact-line">
                <span>Stack</span>
                <strong>Placeholder / Placeholder</strong>
              </div>
              <a href="#contact">Project Link</a>
            </div>
          </article>

          <div className="secondary-work-grid">
            <article className="secondary-work-card">
              <figure className="secondary-media">
                <div className="figure-chip">FIG 02</div>
              </figure>
              <div className="secondary-copy">
                <p className="project-eyebrow">Project Category</p>
                <h3>Project Title</h3>
                <p>Short project description placeholder.</p>
                <div className="fact-line">
                  <span>Stack</span>
                  <strong>Placeholder</strong>
                </div>
                <a href="#contact">Project Link</a>
              </div>
            </article>

            <article className="secondary-work-card">
              <figure className="secondary-media">
                <div className="figure-chip">FIG 03</div>
              </figure>
              <div className="secondary-copy">
                <p className="project-eyebrow">Project Category</p>
                <h3>Project Title</h3>
                <p>Short project description placeholder.</p>
                <div className="fact-line">
                  <span>Stack</span>
                  <strong>Placeholder</strong>
                </div>
                <a href="#contact">Project Link</a>
              </div>
            </article>
          </div>
        </section>

        <section className="services-section page-shell" id="services">
          <div className="section-head">
            <p className="technical-kicker">03 / SERVICES</p>
            <h2>
              Service
              <br />
              Architecture
            </h2>
          </div>

          <div className="service-row">
            <article className="service-card">
              <div className="service-card-head">
                <h3>Service Title</h3>
                <span>01</span>
              </div>
              <p>Service description placeholder.</p>
              <div className="service-subtitle">Core Stack</div>
              <ul className="service-stack">
                <li>Placeholder</li>
                <li>Placeholder</li>
              </ul>
            </article>

            <article className="service-card">
              <div className="service-card-head">
                <h3>Service Title</h3>
                <span>02</span>
              </div>
              <p>Service description placeholder.</p>
              <div className="service-subtitle">Core Stack</div>
              <ul className="service-stack">
                <li>Placeholder</li>
                <li>Placeholder</li>
              </ul>
            </article>
          </div>

          <div className="service-row">
            <article className="service-card">
              <div className="service-card-head">
                <h3>Service Title</h3>
                <span>03</span>
              </div>
              <p>Service description placeholder.</p>
              <div className="service-subtitle">Core Stack</div>
              <ul className="service-stack">
                <li>Placeholder</li>
                <li>Placeholder</li>
              </ul>
            </article>

            <article className="service-card">
              <div className="service-card-head">
                <h3>Service Title</h3>
                <span>04</span>
              </div>
              <p>Service description placeholder.</p>
              <div className="service-subtitle">Core Stack</div>
              <ul className="service-stack">
                <li>Placeholder</li>
                <li>Placeholder</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="about-section page-shell" id="about">
          <div className="section-head">
            <p className="technical-kicker">04 / ABOUT</p>
            <h2>
              About
              <br />
              Section
            </h2>
          </div>

          <div className="about-grid">
            <div className="about-copy">
              <p>About paragraph placeholder.</p>
              <p>Second about paragraph placeholder.</p>
            </div>
            <figure className="about-portrait">
              <figcaption>PROFILE / PLACEHOLDER</figcaption>
            </figure>
          </div>
        </section>

        <section className="stack-section page-shell" id="stack">
          <div className="section-head">
            <p className="technical-kicker">05 / STACK</p>
            <h2>
              Tools
              <br />
              and Stack
            </h2>
          </div>
          <div className="stack-grid">
            {Array.from({ length: 8 }).map((_, index) => (
              <article key={index} className="stack-chip">
                <span>Category</span>
                <strong>Placeholder</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section page-shell" id="contact">
          <div className="section-head">
            <p className="technical-kicker">06 / CONTACT</p>
            <h2>
              Contact
              <br />
              Section
            </h2>
          </div>

          <p className="contact-intro">Contact description placeholder.</p>

          <div className="contact-grid">
            <article className="contact-card">
              <span>Email</span>
              <a href="#contact">placeholder@email.com</a>
            </article>
            <article className="contact-card">
              <span>LinkedIn</span>
              <a href="#contact">linkedin.com/in/placeholder</a>
            </article>
            <article className="contact-card">
              <span>GitHub</span>
              <a href="#contact">github.com/placeholder</a>
            </article>
          </div>
        </section>
      </main>

      <footer className="site-footer page-shell">
        <span>Footer note placeholder</span>
        <div>
          <a href="#contact">Email</a>
          <a href="#contact">LinkedIn</a>
          <a href="#contact">GitHub</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
