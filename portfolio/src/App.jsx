import { useState } from "react";
import "./App.css";
import iphoneMockUp from "./assets/iphone.svg";
import { portfolioContent } from "./content/portfolioContent";

function SectionHeading({ eyebrow, title, description, align = "center" }) {
  const alignment = align === "left" ? "items-start text-left" : "items-center text-center";

  return (
    <div className={`mx-auto flex max-w-3xl flex-col gap-4 ${alignment}`}>
      {eyebrow ? (
        <span className="section-eyebrow">{eyebrow}</span>
      ) : null}
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const {
    brand,
    nav,
    hero,
    projects,
    about,
    skills,
    experiencePlaceholder,
    resumePlaceholder,
    contact,
  } = portfolioContent;

  const scrollToSection = (href) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false);
    }
  };

  return (
    <div className="site-shell">
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-full border border-white/10 bg-slate-950/75 px-4 py-3 backdrop-blur-xl sm:px-6">
          <button
            className="text-left"
            onClick={() => scrollToSection("#home")}
            type="button"
          >
            <span className="text-sm font-semibold tracking-[0.2em] text-white sm:text-base">
              {brand.name}
            </span>
          </button>

          <nav className="hidden items-center gap-6 lg:flex">
            {nav.map((item) => (
              <button
                key={item.href}
                className="text-sm text-slate-300 transition hover:text-white"
                onClick={() => scrollToSection(item.href)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:block">
            <button
              className="rounded-full border border-indigo-400/40 bg-indigo-400/10 px-4 py-2 text-sm font-medium text-indigo-100 transition hover:border-indigo-300 hover:bg-indigo-300/20"
              onClick={() => scrollToSection("#resume")}
              type="button"
            >
              {brand.resumeLabel}
            </button>
          </div>

          <button
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
            className="rounded-full border border-white/10 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/5 lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            Menu
          </button>
        </div>

        {menuOpen ? (
          <div className="mx-auto mt-3 flex max-w-6xl flex-col gap-2 rounded-3xl border border-white/10 bg-slate-950/90 p-4 backdrop-blur-xl lg:hidden">
            {nav.map((item) => (
              <button
                key={item.href}
                className="rounded-2xl px-4 py-3 text-left text-sm text-slate-200 transition hover:bg-white/5"
                onClick={() => scrollToSection(item.href)}
                type="button"
              >
                {item.label}
              </button>
            ))}
            <button
              className="rounded-2xl border border-indigo-400/40 bg-indigo-400/10 px-4 py-3 text-left text-sm text-indigo-100 transition hover:bg-indigo-300/20"
              onClick={() => scrollToSection("#resume")}
              type="button"
            >
              {brand.resumeLabel}
            </button>
          </div>
        ) : null}
      </header>

      <main>
        <section
          id="home"
          className="gradient-bg relative isolate flex min-h-screen items-center overflow-hidden px-4 pb-24 pt-32 sm:px-6"
        >
          <div className="hero-grid" />
          <div className="hero-vignette" />
          <div className="g1" />

          <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
            <span className="section-eyebrow mb-6">{hero.eyebrow}</span>
            <h1 className="hero-title max-w-4xl text-balance text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
              {hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-slate-300 sm:text-lg">
              {hero.description}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                className="primary-button"
                onClick={() => scrollToSection(hero.primaryCta.href)}
                type="button"
              >
                {hero.primaryCta.label}
              </button>
              <button
                className="secondary-button"
                onClick={() => scrollToSection(hero.secondaryCta.href)}
                type="button"
              >
                {hero.secondaryCta.label}
              </button>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {hero.highlights.map((highlight) => (
                <span key={highlight} className="chip">
                  {highlight}
                </span>
              ))}
            </div>

            <div className="mt-10 flex items-center justify-center gap-4">
              {hero.socialLinks.map((link) => (
                <a
                  key={link.label}
                  className="icon-link"
                  href={link.href}
                  rel="noreferrer"
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                >
                  <img alt={link.iconAlt} className="h-5 w-5 opacity-90 invert" src={link.icon} />
                  <span className="sr-only">{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="portfolio" className="section-shell">
          <SectionHeading
            eyebrow="Selected Work"
            title="Real projects, presented with a sharper system."
            description="The visuals borrow from the Stitch concept, but the content stays grounded in your real project work, screenshots, and live links."
          />

          <div className="mt-16 grid gap-8">
            {projects.map((project) => (
              <article
                key={project.id}
                className="glass-panel overflow-hidden rounded-[2rem] border border-white/10 p-6 sm:p-8"
              >
                <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-2xl">
                    <p className="section-eyebrow">{project.eyebrow}</p>
                    <h3 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                      {project.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                      {project.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      {project.stack.map((item) => (
                        <span key={item} className="chip">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {project.links.map((link) => (
                      <a
                        key={link.label}
                        className="secondary-button"
                        href={link.href}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  {project.images.map((image) => (
                    <div
                      key={image.alt}
                      className={`media-card ${project.mediaStyle === "phone" ? "media-card-phone" : "media-card-browser"}`}
                    >
                      {project.mediaStyle === "phone" ? (
                        <div className="phone-frame">
                          <img
                            alt={image.alt}
                            className="phone-screen"
                            src={image.src}
                          />
                          <img
                            alt=""
                            aria-hidden="true"
                            className="phone-shell"
                            src={iphoneMockUp}
                          />
                        </div>
                      ) : (
                        <img alt={image.alt} className="h-full w-full object-cover" src={image.src} />
                      )}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="section-shell section-alt">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="About"
                title={about.title}
                description={about.paragraphs[0]}
                align="left"
              />
              <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                {about.paragraphs[1]}
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {about.highlights.map((highlight) => (
                  <div key={highlight.label} className="glass-panel rounded-3xl p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                      {highlight.label}
                    </p>
                    <p className="mt-3 text-sm font-medium leading-6 text-white">
                      {highlight.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mx-auto max-w-sm">
              <div className="profile-frame">
                <img
                  alt="Juan Barrera portrait"
                  className="h-full w-full rounded-[1.75rem] object-cover"
                  src={about.image}
                />
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section-shell">
          <SectionHeading
            eyebrow="Skills"
            title={skills.title}
            description="Your original tech stack is still here, just reorganized into a cleaner system that is easier to scan."
          />

          <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {skills.groups.map((group) => (
              <article key={group.title} className="glass-panel rounded-[1.75rem] p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">{group.title}</h3>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-slate-400">
                    {group.items.length} items
                  </span>
                </div>
                <div className="grid gap-3">
                  {group.items.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/5 px-4 py-3"
                    >
                      <img
                        alt={item.label}
                        className="h-8 w-8 object-contain"
                        src={item.icon}
                      />
                      <span className="text-sm font-medium text-slate-100">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="section-shell section-alt">
          <SectionHeading
            eyebrow="Placeholder Section"
            title={experiencePlaceholder.title}
            description={experiencePlaceholder.intro}
          />

          <div className="mx-auto mt-16 grid max-w-4xl gap-6">
            {experiencePlaceholder.items.map((item, index) => (
              <article
                key={item.title}
                className="timeline-card glass-panel rounded-[1.75rem] p-6 sm:p-7"
              >
                <div className="timeline-marker">{index + 1}</div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <span className="text-xs uppercase tracking-[0.24em] text-slate-400">
                    {item.period}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="resume" className="section-shell">
          <div className="glass-panel mx-auto max-w-4xl rounded-[2rem] p-8 text-center sm:p-10">
            <span className="section-eyebrow">Placeholder Section</span>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
              {resumePlaceholder.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              {resumePlaceholder.description}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a className="primary-button" href={resumePlaceholder.primaryLink.href}>
                {resumePlaceholder.primaryLink.label}
              </a>
              <a
                className="secondary-button"
                href={resumePlaceholder.secondaryLink.href}
                rel="noreferrer"
                target="_blank"
              >
                {resumePlaceholder.secondaryLink.label}
              </a>
            </div>
          </div>
        </section>

        <section id="contact" className="section-shell section-alt">
          <SectionHeading
            eyebrow="Contact"
            title={contact.title}
            description={contact.description}
          />

          <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {contact.methods.map((method) => (
              <a
                key={method.label}
                className="contact-method"
                href={method.href}
                rel="noreferrer"
                target={method.href.startsWith("mailto:") ? undefined : "_blank"}
              >
                <img alt={method.iconAlt} className="h-5 w-5 opacity-90 invert" src={method.icon} />
                <span>{method.label}</span>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-4 py-8 text-center text-sm text-slate-400 sm:px-6">
        {contact.footerNote}
      </footer>
    </div>
  );
}

export default App;
