"use client";

import { FormEvent, useState } from "react";

const menuGroups = [
  {
    number: "01",
    title: "FROM THE MANGAL",
    items: [
      "Pork neck khorovats",
      "Chicken thigh shashlik",
      "Lamb lula kebab",
      "Fire-roasted seasonal vegetables",
    ],
  },
  {
    number: "02",
    title: "AROUND THE FIRE",
    items: [
      "Warm lavash",
      "Fresh kanachi herbs",
      "Smoky eggplant, tomato & pepper salad",
      "Red onion",
      "House pickles",
      "Ajika",
      "Matzoon garlic sauce",
    ],
  },
  {
    number: "03",
    title: "FOR THE TABLE",
    items: [
      "Ember-roasted potatoes",
      "Tomato, cucumber & herb salad",
      "Seasonal fruit",
      "Traditional sweets",
      "Cold nonalcoholic drinks",
    ],
  },
];

const experiences = [
  {
    number: "01",
    name: "BACKYARD TAKEOVER",
    size: "20–40 GUESTS",
    copy: "The full mangal setup for birthdays, graduations, reunions, and very serious backyard gatherings.",
  },
  {
    number: "02",
    name: "BIG FAMILY TABLE",
    size: "40–80 GUESTS",
    copy: "A bigger fire, an abundant shared table, and enough lavash to keep every relative strategically occupied.",
  },
  {
    number: "03",
    name: "CORPORATE DEBRIEF",
    size: "50+ GUESTS",
    copy: "Team gathering, minus the slides. Live-fire cooking, generous service, and no quarterly review required.",
  },
];

const faqs = [
  {
    q: "Where do you travel?",
    a: "Greater Seattle is our primary service area. Tell us your event city and we’ll confirm travel details in your custom proposal.",
  },
  {
    q: "Do you need a full kitchen?",
    a: "No full kitchen is required. The dads bring the live-fire cooking equipment, but every venue must provide a safe outdoor cooking location, water access, and approval for charcoal cooking.",
  },
  {
    q: "Can the menu change?",
    a: "Yes. Menus can be adjusted for event size, season, vegetarian guests, allergies, and meat preferences with advance notice.",
  },
  {
    q: "Does the vodka come with the barbecue?",
    a: "No. Two Russian Dads BBQ does not sell, serve, or provide alcohol. Any client-supplied alcohol is subject to venue rules and applicable law.",
  },
  {
    q: "Are these real photos of Vlad and Sergey?",
    a: "Not yet. This initial concept website uses temporary editorial stand-ins until professional photographs of Vlad and Sergey are available.",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  function createEmailInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lines = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone")}`,
      `Event date: ${data.get("date")}`,
      `Event city: ${data.get("city")}`,
      `Guest count: ${data.get("guests")}`,
      `Event type: ${data.get("type")}`,
      `Dietary restrictions: ${data.get("dietary")}`,
      `Venue details: ${data.get("venue")}`,
      `Additional notes: ${data.get("notes")}`,
    ];
    const subject = encodeURIComponent(
      `Mangal catering inquiry — ${data.get("date") || "date TBD"}`,
    );
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:bookings@tworussiandadsbbq.com?subject=${subject}&body=${body}`;
  }

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <a className="skip-link" href="#content">Skip to content</a>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Two Russian Dads BBQ, home" onClick={closeMenu}>
          <span>TWO RUSSIAN DADS</span>
          <b>BBQ</b>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span>{menuOpen ? "CLOSE" : "MENU"}</span>
          <i aria-hidden="true" />
        </button>

        <nav id="site-nav" className={menuOpen ? "nav open" : "nav"} aria-label="Primary navigation">
          <a href="#story" onClick={closeMenu}>Our Story</a>
          <a href="#feast" onClick={closeMenu}>The Feast</a>
          <a href="#experience" onClick={closeMenu}>The Experience</a>
          <a className="nav-cta" href="#book" onClick={closeMenu}>Book the Dads</a>
        </nav>
      </header>

      <div id="content">
        <section className="hero" id="top">
          <div className="hero-copy">
            <p className="eyebrow">GREATER SEATTLE <span>·</span> BACKYARD TO YOUR BACKYARD</p>
            <h1>LAID OFF.<br /><em>FIRED UP.</em></h1>
            <p className="hero-intro">
              Vlad Pogostkin and Sergey Shkrebtan bring the mangal, the smoke, and an Armenian-rooted barbecue table served with Russian table generosity.
            </p>
            <div className="button-row">
              <a className="button button-primary" href="#book">Book the Dads <span aria-hidden="true">→</span></a>
              <a className="button button-secondary" href="#feast">See the Feast <span aria-hidden="true">↓</span></a>
            </div>
            <p className="trust-line">Private parties <i>·</i> Corporate events <i>·</i> Backyard takeovers</p>
          </div>

          <div className="hero-art">
            <div className="hero-image-frame">
              <img
                src="/two-dads-editorial.webp"
                alt="Temporary editorial stand-ins for Vlad and Sergey: exactly two friendly middle-aged dads in logo-free black retro tracksuits cooking shashlik over a charcoal mangal"
                width={1536}
                height={1024}
                fetchPriority="high"
                decoding="async"
              />
            </div>
            <div className="stamp" aria-label="Made with love"><span>MADE<br />WITH<br />LOVE</span></div>
            <p className="photo-note">TEMPORARY EDITORIAL IMAGERY · REAL DADS, PROFESSIONAL PHOTOS COMING</p>
          </div>
        </section>

        <aside className="ticker" aria-label="Brand promises">
          <div>
            <span>NOBODY LEAVES HUNGRY</span><b>✦</b>
            <span>REAL CHARCOAL</span><b>✦</b>
            <span>NO QUARTERLY REVIEW REQUIRED</span><b>✦</b>
            <span>LIVE FIRE · FULL TABLE</span>
          </div>
        </aside>

        <section className="section story" id="story">
          <div className="section-heading story-heading">
            <p className="section-label">THE ORIGIN STORY <span>01</span></p>
            <h2>TWO CAREERS ENDED.<br /><em>DINNER STARTED.</em></h2>
          </div>
          <div className="story-copy">
            <p className="lead">
              Between Vlad and Sergey there was one successful technology career, one successful accounting career, and enough corporate frustration to season several hundred pounds of meat.
            </p>
            <p>
              Getting laid off gave them time to return to what they do best: building a fire, filling a table, telling stories, and making people feel like family. After years of meetings and spreadsheets, they promoted themselves to Chief Barbecue Officers.
            </p>
          </div>

          <div className="dad-grid">
            <article className="dad-card red-card">
              <span className="card-index">01</span>
              <h3>VLAD<br />POGOSTKIN</h3>
              <p>Live-fire operations.<br />Smoke strategy.<br />Lavash quality control.</p>
              <span className="status">STATUS: FIRED UP</span>
            </article>
            <article className="dad-card green-card">
              <span className="card-index">02</span>
              <h3>SERGEY<br />SHKREBTAN</h3>
              <p>Table logistics.<br />Portion auditing.<br />Freezer temperature oversight.</p>
              <span className="status">STATUS: FEEDING PEOPLE</span>
            </article>
            <article className="dad-card title-card">
              <span className="card-index">03</span>
              <p className="micro">NEW TITLE:</p>
              <h3>CHIEF<br />BARBECUE<br />OFFICERS</h3>
              <span className="no-review">NO QUARTERLY REVIEW REQUIRED.</span>
            </article>
          </div>

          <div className="culture-note">
            <p className="section-label">THE TABLE HAS A FOUNDATION</p>
            <div>
              <h3>ARMENIAN FIRE.<br />A WIDER FAMILY STORY.</h3>
              <p>
                Armenian khorovats is the culinary foundation: meat and vegetables cooked over a traditional charcoal mangal and served hot, generously, and together. The atmosphere draws respectfully from Armenian, Azerbaijani, and Russian homes—Russian table generosity and the broader Caucasus experience shape the hospitality, stories, herbs, pickles, sauces, and instinct to keep the table full.
              </p>
            </div>
          </div>
        </section>

        <section className="section feast" id="feast">
          <div className="section-heading feast-heading">
            <p className="section-label light">THE ARMENIAN MANGAL TABLE <span>02</span></p>
            <h2>COME HUNGRY.<br /><em>THIS IS NOT A SUGGESTION.</em></h2>
            <p>Every menu can be customized, but every experience starts with real charcoal, abundant food, and hot skewers served directly from the mangal.</p>
          </div>

          <div className="menu-grid">
            {menuGroups.map((group) => (
              <article className="menu-card" key={group.title}>
                <div className="menu-title"><span>{group.number}</span><h3>{group.title}</h3></div>
                <ul>
                  {group.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
          <p className="menu-note"><b>MAKE IT YOUR TABLE.</b> Vegetarian menus, allergy-aware adjustments, and meat substitutions are available with advance notice.</p>
        </section>

        <section className="section experience" id="experience">
          <div className="experience-intro">
            <div className="section-heading">
              <p className="section-label">CHOOSE YOUR LEVEL OF SMOKE <span>03</span></p>
              <h2>WE BRING THE<br /><em>WHOLE EXPERIENCE.</em></h2>
            </div>
            <p>
              This is not ordinary food delivery. Vlad and Sergey arrive, set up the live-fire cooking area, cook in front of your guests, serve the meal, and turn the barbecue into the entertainment.
            </p>
          </div>

          <div className="experience-list">
            {experiences.map((item) => (
              <article className="experience-card" key={item.name}>
                <span className="large-number">{item.number}</span>
                <div>
                  <p className="guest-size">SUGGESTED SIZE: {item.size}</p>
                  <h3>{item.name}</h3>
                  <p>{item.copy}</p>
                </div>
                <div className="proposal">
                  <span>PRICING</span>
                  <b>CUSTOM<br />PROPOSAL</b>
                </div>
              </article>
            ))}
          </div>

          <div className="process" aria-label="How the barbecue experience works">
            {[
              ["01", "THE DADS ARRIVE"],
              ["02", "THE FIRE GETS SERIOUS"],
              ["03", "THE TABLE FILLS"],
              ["04", "NOBODY LEAVES HUNGRY"],
            ].map(([number, label]) => (
              <div className="process-step" key={number}><span>{number}</span><b>{label}</b></div>
            ))}
          </div>
        </section>

        <section className="booking" id="book">
          <div className="booking-copy">
            <p className="section-label light">BOOK THE DADS <span>04</span></p>
            <h2>PUT TWO<br />RUSSIAN DADS<br /><em>IN YOUR BACKYARD.</em></h2>
            <p>Tell us your date, city, and guest count. We’ll build a custom mangal menu and an appropriately dramatic arrival plan.</p>
            <div className="booking-callout">
              <span>THE PROMISE</span>
              <b>NOBODY LEAVES HUNGRY.</b>
              <small>This is both a promise and a warning.</small>
            </div>
          </div>

          <form className="booking-form" onSubmit={createEmailInquiry}>
            <div className="form-header">
              <h3>START THE INQUIRY</h3>
              <p>All fields marked * are required.</p>
            </div>
            <div className="form-grid">
              <label>Name *<input name="name" type="text" autoComplete="name" required /></label>
              <label>Email *<input name="email" type="email" autoComplete="email" required /></label>
              <label>Phone<input name="phone" type="tel" autoComplete="tel" /></label>
              <label>Event date *<input name="date" type="date" required /></label>
              <label>Event city *<input name="city" type="text" autoComplete="address-level2" required /></label>
              <label>Guest count *<input name="guests" type="number" min="10" inputMode="numeric" required /></label>
              <label className="full">Event type
                <select name="type" defaultValue="">
                  <option value="" disabled>Select an event type</option>
                  <option>Private party</option>
                  <option>Corporate event</option>
                  <option>Birthday</option>
                  <option>Reunion</option>
                  <option>Graduation</option>
                  <option>Other celebration</option>
                </select>
              </label>
              <label className="full">Dietary restrictions<textarea name="dietary" rows={2} /></label>
              <label className="full">Venue details<textarea name="venue" rows={2} placeholder="Outdoor space, water access, charcoal approval…" /></label>
              <label className="full">Additional notes<textarea name="notes" rows={4} /></label>
            </div>
            <button className="button form-button" type="submit">CREATE EMAIL INQUIRY <span aria-hidden="true">→</span></button>
            <p className="form-disclaimer">
              This form opens a draft in your email app; it does not send automatically. <strong>Private concept version:</strong> bookings@tworussiandadsbbq.com is a temporary booking address pending final confirmation.
            </p>
          </form>
        </section>

        <section className="section faq" id="faq">
          <div className="section-heading">
            <p className="section-label">QUESTIONS, ANSWERED <span>05</span></p>
            <h2>BEFORE THE<br /><em>FIRE STARTS.</em></h2>
          </div>
          <div className="faq-list">
            {faqs.map((item, index) => (
              <details key={item.q} open={index === 0}>
                <summary><span>{String(index + 1).padStart(2, "0")}</span>{item.q}<i aria-hidden="true">+</i></summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>

      <footer>
        <div className="footer-top">
          <div className="footer-brand"><span>TWO RUSSIAN DADS</span><b>BBQ</b></div>
          <p>Armenian fire <i>·</i> Russian hospitality <i>·</i> Greater Seattle</p>
          <a href="#top">BACK TO TOP ↑</a>
        </div>
        <div className="footer-bottom">
          <p>Two Russian Dads BBQ does not sell, serve, or provide alcohol. Any client-supplied alcohol is subject to venue rules and applicable law.</p>
          <p>Two Russian Dads BBQ is not sponsored by, endorsed by, or affiliated with Adidas or any other tracksuit brand. All temporary imagery uses generic, logo-free retro tracksuits.</p>
          <p>PRIVATE CONCEPT · © {new Date().getFullYear()} TWO RUSSIAN DADS BBQ</p>
        </div>
      </footer>
    </main>
  );
}
