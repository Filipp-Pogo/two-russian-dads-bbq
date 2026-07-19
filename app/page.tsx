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
    perGuest: 125,
    minimum: 2750,
  },
  {
    number: "02",
    name: "BIG FAMILY TABLE",
    size: "40–80 GUESTS",
    copy: "A bigger fire, an abundant shared table, and enough lavash to keep every relative strategically occupied.",
    perGuest: 118,
    minimum: 5000,
  },
  {
    number: "03",
    name: "CORPORATE DEBRIEF",
    size: "50+ GUESTS",
    copy: "Team gathering, minus the slides. Live-fire cooking, generous service, and no quarterly review required.",
    perGuest: 110,
    minimum: 6000,
  },
];

const priceAllocation = [
  ["25%", "Ingredients, generous portions & food waste"],
  ["35%", "Prep, live-fire cooking, service & cleanup labor"],
  ["12%", "Charcoal, transport, cleaning & service supplies"],
  ["8%", "Permits, insurance, commissary & equipment"],
  ["4%", "Payment processing, B&O tax & administration"],
  ["16%", "Contingency, reinvestment & operating profit"],
];

const faqs = [
  {
    q: "What does the base price include?",
    a: "Two proteins, the full mangal table, standard nonalcoholic drinks, Vlad and Sergey, a size-appropriate service crew, up to four on-site hours, setup, cleanup, charcoal, and live-fire equipment.",
  },
  {
    q: "What happens after I send an inquiry?",
    a: "Your email includes the date, city, guest count, working estimate, menu shortlist, and venue details. The dads confirm availability and turn that brief into a written custom proposal before anything is booked.",
  },
  {
    q: "Are there surprise service charges?",
    a: "No automatic gratuity is added. Sales tax is required based on the event location. Rentals, unusual access, parking, venue-specific permits, ferries, and travel beyond the published zone are clearly quoted when they apply.",
  },
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
    a: "No. Bomond is part of Sergey’s separate business story, but Two Russian Dads BBQ does not sell, serve, or provide vodka or any other alcohol. Any client-supplied alcohol is subject to venue rules, permits, and applicable law.",
  },
  {
    q: "What does “Russian” mean in the name?",
    a: "It describes Vlad and Sergey’s personal family background—not a government, political ideology, or endorsement of Russia’s war against Ukraine. The business welcomes Ukrainian, Russian, Armenian, Azerbaijani, and all other Greater Seattle neighbors.",
  },
  {
    q: "Are these real photos of Vlad and Sergey?",
    a: "Vlad and Sergey’s individual portraits use their real faces from supplied photographs with playful editorial treatments. The two-dad hero image remains a temporary stand-in until a professional shoot with both dads is available.",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dadAnimation, setDadAnimation] = useState<{ name: "vlad" | "sergey" | null; run: number }>({ name: null, run: 0 });
  const [selectedDishes, setSelectedDishes] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState("BACKYARD TAKEOVER");
  const [guestCount, setGuestCount] = useState(30);
  const [travelZone, setTravelZone] = useState("included");
  const [lambUpgrade, setLambUpgrade] = useState(false);
  const [thirdProtein, setThirdProtein] = useState(false);
  const [serviceware, setServiceware] = useState(false);
  const [extraHours, setExtraHours] = useState(0);

  const selectedPlan = experiences.find((item) => item.name === selectedExperience) ?? experiences[0];
  const billableGuests = Math.max(20, guestCount || 20);
  const baseEventPrice = Math.max(selectedPlan.minimum, billableGuests * selectedPlan.perGuest);
  const lambUpgradePrice = lambUpgrade ? billableGuests * 10 : 0;
  const thirdProteinPrice = thirdProtein ? billableGuests * 14 : 0;
  const servicewarePrice = serviceware ? billableGuests * 4 : 0;
  const extraHoursPrice = extraHours * 250;
  const travelPrice = travelZone === "extended" ? 275 : 0;
  const estimatedSubtotal = baseEventPrice + lambUpgradePrice + thirdProteinPrice + servicewarePrice + extraHoursPrice + travelPrice;
  const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  function toggleDish(item: string) {
    setSelectedDishes((current) =>
      current.includes(item)
        ? current.filter((dish) => dish !== item)
        : [...current, item],
    );
  }

  function animateDad(name: "vlad" | "sergey") {
    setDadAnimation((current) => ({ name, run: current.run + 1 }));
  }

  function goToBooking() {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("book")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  }

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
      `Preferred experience: ${data.get("experience") || "Not selected"}`,
      `Working estimate: ${data.get("estimate") || "Not calculated"}`,
      `Estimate travel zone: ${data.get("travelZone") || "Not selected"}`,
      `Estimate add-ons: ${data.get("estimateAddOns") || "None"}`,
      `Menu shortlist: ${data.get("menuShortlist") || "Not selected"}`,
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
          <a href="#feast" onClick={closeMenu}>The Menu</a>
          <a href="#experience" onClick={closeMenu}>Pricing</a>
          <a className="nav-cta" href="#book" onClick={closeMenu}>Check Your Date</a>
        </nav>
      </header>

      <div id="content">
        <section className="hero" id="top">
          <div className="hero-copy">
            <p className="eyebrow">GREATER SEATTLE <span>·</span> BACKYARD TO YOUR BACKYARD</p>
            <h1>LAID OFF.<br /><em>FIRED UP.</em></h1>
            <p className="hero-intro">
              Vlad Pogostkin and Sergey Shkrebtan bring the mangal, the smoke, and an Armenian-rooted barbecue table—cooked live, served generously, and cleaned up before they leave.
            </p>
            <div className="hero-offer" aria-label="Starting price and minimum event size">
              <span>FULL LIVE-FIRE CATERING FROM</span>
              <b>$110 <small>/ GUEST</small></b>
              <em>20 GUEST MINIMUM · NO AUTOMATIC GRATUITY</em>
            </div>
            <div className="button-row">
              <a className="button button-primary" href="#experience">Price My Event <span aria-hidden="true">→</span></a>
              <a className="button button-secondary" href="#feast">See the Menu <span aria-hidden="true">↓</span></a>
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

        <section className="purchase-path" aria-labelledby="purchase-path-title">
          <div>
            <span className="purchase-path-kicker">FROM IDEA TO FIRE</span>
            <h2 id="purchase-path-title">BOOKING WITHOUT THE COMMITTEE MEETING.</h2>
          </div>
          <ol>
            <li><span>01</span><b>Build an estimate</b><small>Choose format, guest count, travel, and upgrades.</small></li>
            <li><span>02</span><b>Send your event brief</b><small>Your menu and estimate are already attached.</small></li>
            <li><span>03</span><b>Approve the proposal</b><small>Availability, final menu, venue details, and tax are confirmed in writing.</small></li>
          </ol>
          <a className="button purchase-path-button" href="#experience">START MY ESTIMATE <span aria-hidden="true">→</span></a>
        </section>

        <section className="dad-video" aria-labelledby="dad-video-title">
          <div className="dad-video-copy">
            <p className="section-label">A VERY SERIOUS DEMONSTRATION <span>00:08</span></p>
            <h2 id="dad-video-title">FIRST THEY DANCE.<br /><em>THEN THE FIRE GETS SERIOUS.</em></h2>
            <p>
              Eight seconds of strategic movement, skewer oversight, and the exact moment two dads remember they are technically at work.
            </p>
            <div className="dad-video-notes" aria-label="Video details">
              <span>2 FICTIONAL DADS</span><span>1 LIVE FIRE</span><span>0 LOGOS</span>
            </div>
            <a className="button dad-video-button" href="#experience">PRICE THE REAL EXPERIENCE <span aria-hidden="true">→</span></a>
          </div>
          <figure className="dad-video-frame">
            <video
              controls
              playsInline
              preload="metadata"
              poster="/dads-dance-bbq-poster.webp"
              aria-label="Two fictional editorial stand-in dads in logo-free black tracksuits dance briefly, then turn shashlik skewers over a charcoal mangal"
            >
              <source src="/dads-dance-bbq.mp4" type="video/mp4" />
              Your browser does not support embedded video. <a href="/dads-dance-bbq.mp4">Open the barbecue video.</a>
            </video>
            <figcaption>
              PRESS PLAY. THEY WERE TOLD THIS COUNTS AS MARKETING. · FICTIONAL EDITORIAL STAND-INS, NOT ACTUAL FOOTAGE OF VLAD AND SERGEY.
            </figcaption>
          </figure>
        </section>

        <section className="dad-audio" aria-labelledby="dad-audio-title">
          <div className="dad-audio-heading">
            <p className="section-label light">A MESSAGE FROM MANAGEMENT <span>00:41</span></p>
            <h2 id="dad-audio-title">HEAR THE<br /><em>DAD PITCH.</em></h2>
            <p>
              An intentionally exaggerated, Hollywood-strength Russian-accented briefing on live fire, Armenian-rooted barbecue, and mandatory portion oversight.
            </p>
          </div>
          <div className="dad-audio-player">
            <div className="audio-status">
              <span aria-hidden="true">▶</span>
              <div>
                <b>THE COMPLETE DAD EXPERIENCE</b>
                <small>AI-GENERATED VOICE PERFORMANCE · NOT VLAD OR SERGEY’S REAL VOICE</small>
              </div>
            </div>
            <audio controls preload="metadata" aria-label="Play the Two Russian Dads barbecue sales pitch">
              <source src="/two-dads-pitch.mp3" type="audio/mpeg" />
              Your browser does not support embedded audio. <a href="/two-dads-pitch.mp3">Open the audio pitch.</a>
            </audio>
            <details className="audio-transcript">
              <summary>READ THE TRANSCRIPT <span aria-hidden="true">+</span></summary>
              <p>
                <span lang="ru">Здравствуйте</span>, Seattle. Listen, please. We are Vlad and Sergey. Before—corporate professionals. Now—Chief Barbecue Officers.
              </p>
              <p>
                We bring to your backyard real charcoal mangal. We cook Armenian khorovats and shashlik over live fire. There is smoke, lavash, herbs, pickles, stories, and very, very full table.
              </p>
              <p>
                <span lang="ru">Это не доставка еды.</span> This is not food delivery. This is complete dad experience.
              </p>
              <p>
                <span lang="ru">Мы отвечаем за огонь.</span> We take care of fire. We take care of guests. We make sure nobody leaves hungry. <span lang="ru">Заказывайте</span> Two Russian Dads BBQ. Come hungry. This is not suggestion.
              </p>
            </details>
            <a className="button dad-audio-button" href="#book">BOOK AFTER THE BRIEFING <span aria-hidden="true">→</span></a>
          </div>
        </section>

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
            <article className="dad-card red-card vlad-card">
              <span className="card-index">01</span>
              <figure className="dad-portrait">
                <button
                  className="dad-portrait-button"
                  type="button"
                  aria-label="Animate Vlad performing a lavash quality-control bite"
                  onClick={() => animateDad("vlad")}
                >
                  <span
                    key={`vlad-${dadAnimation.name === "vlad" ? dadAnimation.run : 0}`}
                    className={dadAnimation.name === "vlad" ? "dad-portrait-scene vlad-scene is-active" : "dad-portrait-scene vlad-scene"}
                  >
                    <img
                      src="/vlad-editorial.webp"
                      alt="Editorial portrait of Vlad Pogostkin in a logo-free black retro tracksuit holding folded lavash"
                      width={960}
                      height={960}
                      loading="lazy"
                    />
                    <span className="lavash-prop" aria-hidden="true" />
                    <span className="dad-reaction vlad-reaction" aria-hidden="true">CRUNCH. APPROVED.</span>
                    <span className="portrait-action-hint" aria-hidden="true">TAP: LAVASH TEST <b>→</b></span>
                  </span>
                </button>
                <figcaption>REAL VLAD · CLICK FOR QUALITY CONTROL</figcaption>
              </figure>
              <span className="sr-only" aria-live="polite">{dadAnimation.name === "vlad" ? "Vlad performs a lavash quality-control bite. Approved." : ""}</span>
              <h3>VLAD<br />POGOSTKIN</h3>
              <p>Live-fire operations.<br />Smoke strategy.<br />Lavash quality control.</p>
              <span className="status">STATUS: FIRED UP</span>
            </article>
            <article className="dad-card green-card sergey-card">
              <span className="card-index">02</span>
              <figure className="dad-portrait">
                <button
                  className="dad-portrait-button"
                  type="button"
                  aria-label="Animate Sergey conducting a barbecue tong inspection"
                  onClick={() => animateDad("sergey")}
                >
                  <span
                    key={`sergey-${dadAnimation.name === "sergey" ? dadAnimation.run : 0}`}
                    className={dadAnimation.name === "sergey" ? "dad-portrait-scene sergey-scene is-active" : "dad-portrait-scene sergey-scene"}
                  >
                    <img
                      src="/sergey-editorial.webp"
                      alt="Editorial portrait of Sergey Shkrebtan in a logo-free black retro tracksuit holding barbecue tongs"
                      width={960}
                      height={960}
                      loading="lazy"
                    />
                    <span className="tong-spark tong-spark-one" aria-hidden="true">✦</span>
                    <span className="tong-spark tong-spark-two" aria-hidden="true">✦</span>
                    <span className="dad-reaction sergey-reaction" aria-hidden="true">CLACK. CLACK. READY.</span>
                    <span className="portrait-action-hint" aria-hidden="true">TAP: TONG INSPECTION <b>→</b></span>
                  </span>
                </button>
                <figcaption>REAL SERGEY · CLICK FOR TONG PROTOCOL</figcaption>
              </figure>
              <span className="sr-only" aria-live="polite">{dadAnimation.name === "sergey" ? "Sergey conducts a serious barbecue tong inspection. Ready." : ""}</span>
              <h3>SERGEY<br />SHKREBTAN</h3>
              <p>Table logistics.<br />Portion auditing.<br />Freezer temperature oversight.</p>
              <div className="sergey-brand-chip">
                <img src="/bomond-bottle.webp" alt="Bomond Vodka bottle" width={900} height={900} loading="lazy" />
                <span><small>ALSO ON HIS DESK</small><b>BOMOND VODKA</b></span>
              </div>
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
              <h3>ARMENIAN FIRE.<br />DISTINCT FAMILY STORIES.</h3>
              <p>
                Armenian khorovats is the culinary foundation: meat and vegetables cooked over a traditional charcoal mangal and served hot, generously, and together. The hospitality also reflects family experience in Azerbaijani and Russian homes. We name those influences separately and respectfully; shared regional ingredients do not make distinct cultures interchangeable.
              </p>
            </div>
          </div>

          <div className="identity-note">
            <div>
              <p className="section-label light">A NOTE ON THE NAME</p>
              <h3>PEOPLE FIRST.<br /><em>POLITICS OFF THE MENU.</em></h3>
            </div>
            <div className="identity-copy">
              <p>
                “Two Russian Dads” describes Vlad and Sergey’s personal family background. It is not an endorsement of the Russian government, its war against Ukraine, or any political ideology. Our table welcomes Ukrainian, Russian, Armenian, Azerbaijani, and every other Greater Seattle neighbor.
              </p>
              <p>
                The parody stays where it belongs: layoffs, meetings, spreadsheets, middle-aged reinvention, and two dads taking barbecue extremely seriously. War, displacement, nationality, and ethnicity are never the punchline.
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
                  {group.items.map((item) => {
                    const selected = selectedDishes.includes(item);
                    return (
                      <li className={selected ? "selected" : ""} key={item}>
                        <button type="button" aria-pressed={selected} onClick={() => toggleDish(item)}>
                          <span>{item}</span><i aria-hidden="true">{selected ? "✓" : "+"}</i>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </article>
            ))}
          </div>
          <div className="feast-builder" aria-live="polite">
            <div>
              <p className="section-label light">YOUR FEAST SHORTLIST</p>
              <h3>{selectedDishes.length ? `${selectedDishes.length} ITEM${selectedDishes.length === 1 ? "" : "S"} SELECTED` : "TAP A DISH. BUILD A TABLE."}</h3>
              <div className="feast-selection">
                {selectedDishes.length ? selectedDishes.map((dish) => <span key={dish}>{dish}</span>) : <p>Your choices will follow you into the inquiry form. The dads will handle final menu strategy.</p>}
              </div>
            </div>
            <div className="feast-builder-actions">
              {selectedDishes.length > 0 && <button type="button" className="clear-selection" onClick={() => setSelectedDishes([])}>Clear</button>}
              <button type="button" className="button shortlist-button" onClick={goToBooking}>Add to Inquiry <span aria-hidden="true">→</span></button>
            </div>
          </div>
          <p className="menu-note"><b>MAKE IT YOUR TABLE.</b> Vegetarian menus, allergy-aware adjustments, and meat substitutions are available with advance notice.</p>
          <div className="feast-cta">
            <p><span>SEEN ENOUGH?</span><b>PRICE THIS TABLE FOR YOUR GUEST COUNT.</b></p>
            <a className="button" href="#experience">BUILD MY ESTIMATE <span aria-hidden="true">→</span></a>
          </div>
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
            {experiences.map((item) => {
              const selected = selectedExperience === item.name;
              return (
              <article className={selected ? "experience-card selected" : "experience-card"} key={item.name}>
                <span className="large-number">{item.number}</span>
                <div>
                  <p className="guest-size">SUGGESTED SIZE: {item.size}</p>
                  <h3>{item.name}</h3>
                  <p>{item.copy}</p>
                </div>
                <div className="experience-actions">
                  <div className="proposal">
                    <span>STARTING AT</span>
                    <b>{currency.format(item.perGuest)}<small>/ GUEST</small></b>
                    <em>{currency.format(item.minimum)} MINIMUM</em>
                  </div>
                  <button type="button" className="experience-select" aria-pressed={selected} onClick={() => setSelectedExperience(item.name)}>
                    {selected ? "SELECTED ✓" : "PRICE THIS"}
                  </button>
                </div>
              </article>
              );
            })}
          </div>

          <section className="pricing-planner" aria-labelledby="pricing-title">
            <div className="pricing-controls">
              <p className="section-label light">BUILD A WORKING ESTIMATE</p>
              <h3 id="pricing-title">THE DAD<br /><em>CALCULATOR.</em></h3>
              <p className="pricing-intro">Launch pricing for a full live-fire experience—not drop-off trays. Adjust the event below; your choices follow you into the inquiry.</p>

              <div className="pricing-fields">
                <label>
                  Guest count
                  <input type="number" min="20" step="1" value={guestCount} onChange={(event) => setGuestCount(Math.max(20, Number(event.target.value)))} />
                </label>
                <label>
                  Experience
                  <select value={selectedExperience} onChange={(event) => setSelectedExperience(event.target.value)}>
                    {experiences.map((item) => <option key={item.name}>{item.name}</option>)}
                  </select>
                </label>
                <label className="wide">
                  Travel from Seattle
                  <select value={travelZone} onChange={(event) => setTravelZone(event.target.value)}>
                    <option value="included">Up to 25 driving miles · included</option>
                    <option value="extended">26–50 driving miles · $275</option>
                    <option value="custom">Beyond 50 miles / ferry · custom</option>
                  </select>
                </label>
              </div>

              <fieldset className="pricing-addons">
                <legend>Optional upgrades</legend>
                <label><input type="checkbox" checked={lambUpgrade} onChange={(event) => setLambUpgrade(event.target.checked)} /><span><b>Lamb as a featured protein</b><small>+$10 per guest</small></span></label>
                <label><input type="checkbox" checked={thirdProtein} onChange={(event) => setThirdProtein(event.target.checked)} /><span><b>Add a third protein</b><small>+$14 per guest</small></span></label>
                <label><input type="checkbox" checked={serviceware} onChange={(event) => setServiceware(event.target.checked)} /><span><b>Compostable serviceware</b><small>+$4 per guest</small></span></label>
                <label className="extra-hours"><span><b>Extra service hours</b><small>+$250 each</small></span><input aria-label="Extra service hours" type="number" min="0" max="4" value={extraHours} onChange={(event) => setExtraHours(Math.min(4, Math.max(0, Number(event.target.value))))} /></label>
              </fieldset>
            </div>

            <div className="pricing-result" aria-live="polite">
              <span className="estimate-kicker">WORKING EVENT ESTIMATE</span>
              <h4>{currency.format(estimatedSubtotal)}</h4>
              <p className="effective-rate">About {currency.format(estimatedSubtotal / billableGuests)} per guest · before sales tax</p>
              <dl>
                <div><dt>{selectedPlan.name}</dt><dd>{currency.format(baseEventPrice)}</dd></div>
                {lambUpgrade && <div><dt>Lamb upgrade</dt><dd>{currency.format(lambUpgradePrice)}</dd></div>}
                {thirdProtein && <div><dt>Third protein</dt><dd>{currency.format(thirdProteinPrice)}</dd></div>}
                {serviceware && <div><dt>Compostable serviceware</dt><dd>{currency.format(servicewarePrice)}</dd></div>}
                {extraHours > 0 && <div><dt>{extraHours} extra service hour{extraHours === 1 ? "" : "s"}</dt><dd>{currency.format(extraHoursPrice)}</dd></div>}
                {travelZone === "extended" && <div><dt>Extended travel</dt><dd>{currency.format(travelPrice)}</dd></div>}
                {travelZone === "custom" && <div><dt>Travel / ferry</dt><dd>TO QUOTE</dd></div>}
              </dl>
              <div className="included-list">
                <b>THE BASE EVENT INCLUDES</b>
                <p>Two proteins · full mangal table · standard nonalcoholic drinks · Vlad &amp; Sergey · size-appropriate service crew · up to four on-site hours · setup &amp; cleanup · charcoal &amp; equipment.</p>
              </div>
              <button type="button" className="button estimate-button" onClick={goToBooking}>USE THIS ESTIMATE <span aria-hidden="true">→</span></button>
              <p className="estimate-legal">Sales tax is added at the rate for the event location. No automatic gratuity. Rentals, difficult access, parking, permits unique to the venue, and ferry costs are quoted separately. Final price requires a written proposal.</p>
            </div>

            <details className="pricing-method">
              <summary>WHAT IS BUILT INTO THE PRICE? <span>SHOW THE MATH +</span></summary>
              <div className="allocation-grid">
                {priceAllocation.map(([amount, label]) => <div key={label}><b>{amount}</b><span>{label}</span></div>)}
              </div>
              <p>This is the target allocation for every $100 of pre-tax catering revenue. Actual ingredient mix and crew needs vary by event; the minimums protect small events from being priced below the real prep, transport, and setup cost.</p>
            </details>
          </section>

          <div className="expectations" aria-labelledby="expectations-title">
            <div className="expectations-heading">
              <p className="section-label">BEFORE YOU BOOK</p>
              <h3 id="expectations-title">THE PRACTICAL<br /><em>FIRE DETAILS.</em></h3>
              <p>Clear expectations now. A custom proposal after we know the event.</p>
            </div>
            <div className="expectations-grid">
              <article>
                <span>01</span>
                <h4>20+ GUESTS</h4>
                <p>The full dad experience is designed for gatherings of twenty guests or more.</p>
              </article>
              <article>
                <span>02</span>
                <h4>BOOK EARLY</h4>
                <p>A few weeks of lead time is best. Short-notice events depend on menu and crew availability.</p>
              </article>
              <article>
                <span>03</span>
                <h4>OUTDOORS REQUIRED</h4>
                <p>We need a safe, level outdoor cooking area, water access, and venue approval for charcoal.</p>
              </article>
              <article>
                <span>04</span>
                <h4>GREATER SEATTLE</h4>
                <p>Our primary service area. Your city, access, and travel time are confirmed in the proposal.</p>
              </article>
              <article>
                <span>05</span>
                <h4>WEATHER PLAN</h4>
                <p>Seattle happens. A safe covered cooking area may be required when rain is in the forecast.</p>
              </article>
              <article>
                <span>06</span>
                <h4>PRICE, THEN PROPOSAL</h4>
                <p>Use the live estimate above. Venue access, final menu, tax, rentals, and unusual travel are confirmed in writing.</p>
              </article>
            </div>
            <div className="expectations-note">
              <b>WHAT IS INCLUDED?</b>
              <p>Two proteins, the full table, standard nonalcoholic drinks, live-fire setup, cooking, service, and cleanup. Alcohol is never sold or provided.</p>
            </div>
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
            <ul className="booking-basics" aria-label="Booking basics">
              <li><b>20 guest minimum</b><span>Designed for full gatherings, not drop-off orders.</span></li>
              <li><b>From $110–$125</b><span>Per guest, with event minimums. Tax and special venue costs are additional.</span></li>
              <li><b>Outdoor fire plan</b><span>Charcoal approval and a safe cooking area are required.</span></li>
            </ul>
            <div className="booking-bomond-note">
              <img src="/bomond-bottle.webp" alt="Bomond Vodka bottle, shown as part of Sergey’s separate brand story" width={900} height={900} loading="lazy" />
              <p><b>BOMOND IS SERGEY’S BRAND.</b><span>It is not part of the catering package. Client-supplied alcohol only, where permitted.</span></p>
            </div>
            <div className="booking-callout">
              <span>THE PROMISE</span>
              <b>NOBODY LEAVES HUNGRY.</b>
              <small>This is both a promise and a warning.</small>
            </div>
          </div>

          <form className="booking-form" onSubmit={createEmailInquiry}>
            <input type="hidden" name="experience" value={selectedExperience} />
            <input type="hidden" name="menuShortlist" value={selectedDishes.join(", ")} />
            <input type="hidden" name="estimate" value={`${currency.format(estimatedSubtotal)} pre-tax for ${billableGuests} guests`} />
            <input type="hidden" name="travelZone" value={travelZone === "included" ? "Up to 25 miles" : travelZone === "extended" ? "26–50 miles" : "Beyond 50 miles / ferry"} />
            <input type="hidden" name="estimateAddOns" value={[lambUpgrade && "Lamb featured protein", thirdProtein && "Third protein", serviceware && "Compostable serviceware", extraHours > 0 && `${extraHours} extra service hour(s)`].filter(Boolean).join(", ")} />
            <div className="form-header">
              <h3>START THE INQUIRY</h3>
              <p>All fields marked * are required.</p>
            </div>
            {(selectedExperience || selectedDishes.length > 0) && (
              <div className="form-selection-summary" aria-live="polite">
                <span>YOUR WORKING BRIEF</span>
                {selectedExperience && <p><b>Experience:</b> {selectedExperience}</p>}
                <p><b>Working estimate:</b> {currency.format(estimatedSubtotal)} before tax · {billableGuests} guests</p>
                {selectedDishes.length > 0 && <p><b>Menu shortlist:</b> {selectedDishes.join(" · ")}</p>}
                <small>These preferences will be included in your email inquiry and confirmed in the custom proposal.</small>
              </div>
            )}
            <div className="form-grid">
              <label>Name *<input name="name" type="text" autoComplete="name" required /></label>
              <label>Email *<input name="email" type="email" autoComplete="email" required /></label>
              <label>Phone<input name="phone" type="tel" autoComplete="tel" /></label>
              <label>Event date *<input name="date" type="date" required /></label>
              <label>Event city *<input name="city" type="text" autoComplete="address-level2" required /></label>
              <label>Guest count *<input name="guests" type="number" min="20" inputMode="numeric" value={guestCount} onChange={(event) => setGuestCount(Math.max(20, Number(event.target.value)))} required /></label>
              <label className="full">Event type *
                <select name="type" defaultValue="" required>
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
            <button className="button form-button" type="submit">OPEN MY BOOKING EMAIL <span aria-hidden="true">→</span></button>
            <div className="booking-assurance" aria-label="Booking assurances">
              <span>NO PAYMENT TO INQUIRE</span><span>NO AUTOMATIC GRATUITY</span><span>FINAL PRICE IN WRITING</span>
            </div>
            <p className="form-disclaimer">
              This form opens a draft in your email app; it does not send automatically. <strong>Booking note:</strong> bookings@tworussiandadsbbq.com is a temporary address pending final confirmation.
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

        <section className="bomond-feature" aria-labelledby="bomond-title">
          <div className="bomond-gallery" aria-label="Bomond Vodka product photography">
            <figure className="bomond-photo bomond-photo-red">
              <img src="/bomond-red.webp" alt="Bomond Vodka bottle photographed in a dramatic red and black studio setting" width={664} height={1000} loading="lazy" />
            </figure>
            <figure className="bomond-photo bomond-photo-bottle">
              <img src="/bomond-bottle.webp" alt="Clear embossed Bomond Vodka bottle on a white background" width={900} height={900} loading="lazy" />
            </figure>
            <figure className="bomond-photo bomond-photo-color">
              <img src="/bomond-color.webp" alt="Bomond Vodka bottle photographed with red, blue, and violet studio lighting" width={664} height={1000} loading="lazy" />
            </figure>
          </div>

          <div className="bomond-copy">
            <p className="section-label light">SERGEY’S OTHER VENTURE</p>
            <h2 id="bomond-title">A VERY<br />SERIOUS<br /><em>BOTTLE.</em></h2>
            <p className="bomond-lead">
              Sergey is also behind Bomond Vodka, a Seattle-area brand made and bottled in France from French wheat and grapes. Apparently one highly controlled process was not enough for this dad.
            </p>
            <div className="bomond-facts" aria-label="Bomond Vodka facts">
              <div><b>6×</b><span>DISTILLED</span></div>
              <div><b>92</b><span>POINT GOLD · 2018</span></div>
              <div><b>FR</b><span>MADE &amp; BOTTLED</span></div>
            </div>
            <p>
              The official brand describes Bomond as distilled without additives or enzymes and made with limestone-filtered water. It also received Silver medals at the San Francisco World Spirits Competition in 2017 and 2018.
            </p>
            <a className="button bomond-button" href="https://bomondvodka.com/" target="_blank" rel="noreferrer">
              Visit Bomond Vodka <span aria-hidden="true">↗</span>
            </a>
            <p className="bomond-legal">
              <strong>21+ · Please enjoy responsibly.</strong> Bomond is a separate brand and is not included with catering. Two Russian Dads BBQ does not sell, serve, or provide alcohol.
            </p>
          </div>
        </section>
      </div>

      <div className="mobile-purchase-bar" aria-label="Quick booking action">
        <p><span>FULL EXPERIENCE FROM</span><b>$110 / GUEST</b></p>
        <a href="#book">CHECK DATE <span aria-hidden="true">→</span></a>
      </div>

      <footer>
        <div className="footer-top">
          <div className="footer-brand"><span>TWO RUSSIAN DADS</span><b>BBQ</b></div>
          <p>Armenian fire <i>·</i> Family-table hospitality <i>·</i> Greater Seattle</p>
          <a href="#top">BACK TO TOP ↑</a>
        </div>
        <div className="footer-bottom">
          <p>Two Russian Dads BBQ does not sell, serve, or provide alcohol. Bomond imagery shares Sergey’s separate brand story and is not an offer to include alcohol with catering. Client-supplied alcohol is subject to venue rules, permits, and applicable law.</p>
          <p>Bomond marks and product photography belong to their respective owner. Two Russian Dads BBQ is not sponsored by, endorsed by, or affiliated with Adidas or any tracksuit brand. Temporary tracksuit imagery is generic and logo-free.</p>
          <p>FAMILY FOOD · NO GOVERNMENT OR POLITICAL AFFILIATION · © {new Date().getFullYear()} TWO RUSSIAN DADS BBQ</p>
        </div>
      </footer>
    </main>
  );
}
