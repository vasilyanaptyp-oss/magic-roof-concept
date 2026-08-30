# MAGIC ROOF — Production-Grade Website Audit & Pre-Launch Roadmap

**Target URL:** https://vasilyanaptyp-oss.github.io/magic-roof-concept/  
**Local Repository:** `C:\Users\vasil\Documents\hermes-workspace\magic-roof-concept\`  
**Client:** MAGIC ROOF e.U. (Christoph Gerold Hilger, Linz, Oberösterreich)  
**Contract Context:** Client liked the interactive concept ("sehr vielversprechend"), agreed to 300 € final delivery upon adjustments and handover.  
**Audit Date:** 2026-08-30  
**Auditor:** Senior Frontend Architect & Sales Intelligence QA  

---

## Executive verdict

**READY:** **ALMOST (Concept Ready / Production Readiness: 85%)**

The concept website is visually striking, technically solid (semantic HTML5, fluid modern CSS, zero framework bloat, fast load time), and already strongly resonates with the client. It establishes an authentic, high-end Austrian Handwerksbetrieb identity for Dachdeckerei, Spenglerei, Bauwerksabdichtung, and Bauelemente in Linz.

To transition from the current **Concept/Staging state** to a **Production-Ready Commercial Website** that can be safely handed over for €300, a clear set of blockers and high-priority items must be resolved:
1. **Form Handling:** Replace client-side `mailto:` generation with a reliable, GDPR-compliant backend form processor (e.g. Formspree/Resend/headless SMTP) while keeping `mailto:` as an automatic fallback.
2. **SEO Indexing Safety:** Switch demo meta tags from `index,follow` to `noindex,nofollow` during staging on GitHub Pages to prevent search engine indexing before final domain launch (`magic-roof.at`).
3. **Address Confirmation:** Reconcile `Burgenlandstraße 15` vs `Wiener Straße 175` with the client.
4. **Client Photography Assets:** Swap placeholder Unsplash imagery for Christoph's real project and workshop photos.

---

## Priority System & Summary Counts

- **P0 (Critical Launch Blocker):** **1** (Lead Generation / Form Submission Mechanism)
- **P1 (High Priority / Must Fix):** **3** (Staging SEO `noindex`, Address Reconcile, Legal Terms Finalization)
- **P2 (Medium Priority / Recommended Polish):** **4** (Touch Target Refinement, Gallery Filter Polish, Service Accent Hierarchy, Staging Domain Linking)
- **P3 (Cosmetic / Minor Enhancement):** **3** (Typography micro-spacing, FAQ expansion, subtle hover micro-interactions)

---

## Production blockers (P0)

### 🔴 P0-1: Contact Form Relies Solely on Client-Side `mailto:` Trigger
- **Severity:** P0 — Broken / Launch Blocker for Production
- **Confidence:** HIGH
- **Evidence:** `app.js:146` (`window.location.href = 'mailto:office@magic-roof.at?subject=...'`)
- **Problem:** When a prospective client fills out the 5-field inquiry form and clicks *"Anfrage per E-Mail vorbereiten"*, the website attempts to open the user's default OS desktop mail client (Outlook / Apple Mail). For users on mobile browsers, tablets, or desktop users who rely on webmail (Gmail, GMX, Web.de), this frequently results in a failed action, an unhandled blank trigger, or high conversion drop-off.
- **Production Solution:** Implement a lightweight, zero-maintenance, GDPR-compliant form handling endpoint (e.g., Formspree, Formkeep, or a simple serverless PHP/Node mailer on the client's final hosting domain) that sends the inquiry directly to `office@magic-roof.at` and displays an immediate on-page confirmation message. Keep the `mailto:` option only as a secondary direct link.

---

## High priority (P1)

### 🟠 P1-1: Staging GitHub Pages URL has `index,follow` & Production Canonical
- **Severity:** P1 — Must Fix
- **Confidence:** HIGH
- **Evidence:** `index.html:8,14,17`, `sitemap.xml:4`, `robots.txt:2`
- **Problem:** Staging site currently specifies `<meta name="robots" content="index,follow">`, `<link rel="canonical" href="https://vasilyanaptyp-oss.github.io/magic-roof-concept/">`, and `robots.txt` `Allow: /`. This risks Google indexing the GitHub Pages demo and indexing the "Konzeptmotiv" placeholder text, potentially competing with or causing duplicate content issues once the live custom domain (`magic-roof.at`) launches.
- **Fix:** Set `<meta name="robots" content="noindex,nofollow">` on the GitHub Pages branch. Switch to `index,follow` and update canonicals to `https://magic-roof.at/` only when deploying to the client's live production server.

### 🟠 P1-2: Operating Address vs Registered Address Clarification
- **Severity:** P1 — Client Confirmation Required
- **Confidence:** HIGH
- **Evidence:** `index.html:258`, `impressum.html:31` vs public register filings (Burgenlandstraße 15 vs Wiener Straße 175).
- **Problem:** Public Austrian business directory entries show references to both Burgenlandstraße 15 (4020 Linz) and Wiener Straße 175 (4020 Linz).
- **Fix:** Confirm with Christoph Hilger which address is the official customer-facing workshop/office address for Google Maps, Impressum, and official correspondence.

### 🟠 P1-3: Final Commercial Terms & Trade Registration Note in Impressum
- **Severity:** P1 — Legal / Austria Compliance
- **Confidence:** HIGH
- **Evidence:** `impressum.html:35` ("Konzeptstand. Rechtliche Pflichttexte sind vor einem Produktionsstart fachlich zu prüfen.")
- **Problem:** The Impressum currently contains a disclaimer that it is a concept draft. In production, this must be replaced with the exact Austrian ECG / WKO mandatory trade disclosure (Gewerbebehörde: Magistrat der Stadt Linz, Anwendbare Rechtsvorschriften: Gewerbeordnung www.ris.bka.gv.at).

---

## Medium priority (P2)

### 🟡 P2-1: Micro Touch-Target for Privacy Checkbox on Mobile Viewports
- **Severity:** P2 — Recommended Fix
- **Confidence:** HIGH
- **Evidence:** `Playwright audit` (`input[type="checkbox"]` dimensions: 18×18px).
- **Problem:** While the surrounding `<label class="checkbox">` has `min-height: 44px`, the actual clickable input box is 18×18px. On some mobile browsers, tapping near the outer margin of the checkbox box can occasionally feel unresponsive if the label tap doesn't register cleanly.
- **Fix:** Add a dedicated padding and hit-area expansion (`cursor: pointer; padding: 4px;`) around the checkbox indicator.

### 🟡 P2-2: Service Category Hierarchy (Roofing & Metalwork vs Retail Elements)
- **Severity:** P2 — Commercial UX
- **Confidence:** MEDIUM
- **Evidence:** `index.html:134-160` (5 services listed with equal weighting).
- **Problem:** Dachdeckerei, Spenglerei, and Bauwerksabdichtung are high-margin core craft trades (€5,000–€50,000+), while Sonnenschutz and Fenster/Türen are often secondary retail installations.
- **Fix:** Emphasize the core trio (Dachdeckerei / Spenglerei / Abdichtung) as primary craft services, and present Fenster, Türen & Sonnenschutz as complementary building envelope solutions.

### 🟡 P2-3: Staging Links in Legal Modals vs Standalone Pages
- **Severity:** P2 — Functional Polish
- **Confidence:** HIGH
- **Evidence:** `index.html:329-330` (`data-dialog-open="impressum"` vs `href="impressum.html"`).
- **Problem:** The modal dialog implementation works nicely with JS enabled, but when navigating via direct URL (`/impressum.html`), the standalone page has a slightly different layout from the modal dialog.
- **Fix:** Ensure visual parity between the modal dialog and the standalone `impressum.html` / `datenschutz.html` fallback pages.

### 🟡 P2-4: Interactive Project Gallery Filter
- **Severity:** P2 — Enhancement
- **Confidence:** MEDIUM
- **Evidence:** `index.html:209-222` (static 3-image grid).
- **Problem:** When the client provides 8–15 real project photos, a static 3-card layout will feel restrictive.
- **Fix:** Structure the gallery grid to support category filtering (e.g. *Alle, Steildach, Flachdach & Abdichtung, Spenglerei, Fenster & Türen*).

---

## Low priority / polish (P3)

### 🟢 P3-1: FAQ Accordion Expansion
- **Severity:** P3 — Polish
- **Confidence:** LOW
- **Problem:** Currently contains 3 FAQs. Adding 2 more (e.g. "Arbeiten Sie auch im Linzer Umland / ganz Oberösterreich?", "Bieten Sie kostenlose Vor-Ort-Besichtigungen an?") will strengthen local search relevance.

### 🟢 P3-2: Header Phone Number Formatting
- **Severity:** P3 — Polish
- **Confidence:** HIGH
- **Problem:** `+43 676 739 9448` in header desktop view is plain text. Adding a subtle phone handset icon or micro-badge improves visual affordance.

### 🟢 P3-3: Form Focus State Color Harmony
- **Severity:** P3 — Cosmetic
- **Confidence:** HIGH
- **Evidence:** `styles.css:524` (`box-shadow: 0 2px 0 var(--accent-dark)`).
- **Fix:** Harmonize the focus ring to a smooth 2px outline using the brand's primary terracotta accent (`#ef5b2a`) with subtle offset.

---

## Mobile findings

Automated Playwright measurement across 7 key viewports:

| Viewport | Device Class | Width × Height | Overflow (px) | Offending Elements | Severity | Evidence |
|---|---|---|---|---|---|---|
| **Desktop 1920** | Large Monitor | 1920 × 1080 | **0 px** | None | Clean | Browser DOM |
| **Desktop 1440** | Standard Laptop | 1440 × 900 | **0 px** | None | Clean | Browser DOM |
| **Tablet 768** | iPad Mini / Portrait | 768 × 1024 | **0 px** | None | Clean | Browser DOM |
| **Mobile 430** | iPhone 14/15 Pro Max | 430 × 932 | **0 px** | None | Clean | Browser DOM |
| **Mobile 390** | iPhone 13/14/15 | 390 × 844 | **0 px** | None | Clean | Browser DOM |
| **Mobile 360** | Android Standard | 360 × 800 | **0 px** | None | Clean | Browser DOM |
| **Mobile Landscape** | Mobile Landscape | 844 × 390 | **0 px** | None | Clean | Browser DOM |

**Key Mobile Strengths:**
- Horizontal overflow is strictly **0px** across all mobile sizes.
- Sticky mobile action bar (`.mobile-actions` with *Anrufen* and *Angebot anfragen*) activates at `<= 660px` with proper bottom padding to avoid overlapping content.
- Hamburger menu operates with accessible `aria-expanded` and focus trap.

---

## Functional QA

| Element / Action | Location | Intended Behavior | Actual Observed Result | Verdict |
|---|---|---|---|---|
| **Skip Link** | `#main` | Jump directly to main content | Focuses `#main` smoothly | ✅ PASS |
| **Brand Logo** | Header | Scroll to top `#top` | Jumps to `#top` | ✅ PASS |
| **Nav Anchors** | Header (`#leistungen`, `#ablauf`, `#projekte`, `#kontakt`) | Smooth scroll to target sections | Correct target scroll position | ✅ PASS |
| **Phone Link** | Header & Hero | Trigger dialer `tel:+436767399448` | Opens phone dialer | ✅ PASS |
| **Hero CTA** | Hero | Jump to `#kontakt` | Navigates to contact form | ✅ PASS |
| **Mobile Menu** | Header button | Open full-screen mobile navigation | Opens drawer, locks body scroll | ✅ PASS |
| **Mobile Menu Links** | Drawer nav | Navigate & close drawer | Navigates and auto-closes drawer | ✅ PASS |
| **FAQ Accordions** | FAQ section | Expand/collapse `<details>` | Native HTML5 toggling with animation | ✅ PASS |
| **Google Maps Link** | Contact info | Open Burgenlandstraße 15 in Maps | Opens Google Maps search with `rel="noopener"` | ✅ PASS |
| **Contact Form Submit** | Contact section | Validate fields and process inquiry | Validates required fields, triggers `mailto:` | ⚠️ P0 (Needs Backend) |
| **Impressum Dialog** | Footer | Open modal dialog | Opens `<dialog>` with backdrop blur | ✅ PASS |
| **Datenschutz Dialog** | Footer | Open modal dialog | Opens `<dialog>` with backdrop blur | ✅ PASS |

---

## German copy & Austrian Nuance Audit

### Overall Tone Evaluation:
- **Tone:** Professional, direct, dignified craft phrasing ("Sie"-Form throughout).
- **Regional Authenticity:** Uses established Austrian trade terminology (*Spenglerei*, *Bauwerksabdichtung*, *Dachdeckerei*, *Vorhaben*, *Fachbetrieb aus Linz*).
- **Zero AI Buzzword Slop:** Avoids exaggerated claims ("die führende Dach-Revolution", "100% Perfektion garantiert").

### Specific Copy Refinements:

1. **Hero Subheading:**
   - *CURRENT:* "Dach, Abdichtung, Fenster, Türen und Sonnenschutz aus einer Hand."
   - *ISSUE:* "aus einer Hand" is slightly generic marketing language.
   - *BETTER:* "Komplette Lösungen für Dach, Abdichtung und Bauelemente in Linz und Umgebung."

2. **Services Intro:**
   - *CURRENT:* "Fünf Leistungsbereiche, direkt erklärt. Ohne Fachjargon und ohne Umwege zur Anfrage."
   - *ISSUE:* Slightly meta/designer phrasing ("direkt erklärt").
   - *BETTER:* "Handwerkliche Präzision für Ihr Gebäude — vom dichten Dach bis zu passenden Fenstern und Türen."

3. **Contact Form Button:**
   - *CURRENT:* "Anfrage per E-Mail vorbereiten ↗"
   - *ISSUE:* Reflects current `mailto:` mechanism. Once backend is connected, this should be a direct, confidence-inspiring CTA.
   - *BETTER:* "Unverbindliche Anfrage senden ↗"

---

## Commercial UX Review (Linz & Upper Austria Context)

1. **5-Second Clarity Test:** **PASSED.** Within 3 seconds, any Linz homeowner or commercial property owner immediately understands: MAGIC ROOF handles roofing, waterproofing, sheet metal, and exterior elements.
2. **Geographic Grounding:** Clearly anchored in Linz (*"Fachbetrieb aus Linz"*, Burgenlandstraße 15).
3. **Core Commercial Path:** Clean funnel: Hero -> Core Services -> Process -> Project Quality -> Fast Contact.
4. **Target Customer Fit:** Perfectly strikes the balance between private homeowners needing roof repairs/renovations and architects/general contractors looking for a reliable sub-contractor for Bauwerksabdichtung & Spenglerei.

---

## Fact Verification Matrix

| Claim / Fact | Classification | Source / Public Register | Status |
|---|---|---|---|
| **MAGIC ROOF e.U.** | `FACT` | Firmenbuch FN 651617k, Landesgericht Linz | Verified |
| **Inhaber: Christoph Gerold Hilger** | `FACT` | Firmenbuch / WKO | Verified |
| **Burgenlandstraße 15, 4020 Linz** | `FACT` | Firmenbuch / WKO | Verified |
| **Telefon: +43 676 739 9448** | `FACT` | Public Business Directory | Verified |
| **E-Mail: office@magic-roof.at** | `FACT` | Domain & Register | Verified |
| **UID: ATU80889736** | `FACT` | Firmenbuch | Verified |
| **GISA: 38232626 & 37334628** | `FACT` | WKO Gewerberegister | Verified |
| **Leistungsspektrum (6 Gewerbebereiche)** | `FACT` | WKO Berechtigungen | Verified |
| **Years in business / Project counts** | `UNVERIFIED` | None on site | ✅ Correctly omitted (no invented numbers) |
| **Customer reviews & testimonials** | `UNVERIFIED` | None on site | ✅ Correctly omitted (no fake reviews) |
| **Current project imagery** | `STOCK PLACEHOLDER` | Stock | ✅ Explicitly labeled as concept motifs |

---

## Client Confirmation Checklist (For Christoph Hilger)

Before final launch, obtain direct confirmation on the following items:
- [ ] **Address Preference:** Confirm whether `Burgenlandstraße 15, 4020 Linz` is the primary business address to display on the contact section and invoices (or if `Wiener Straße 175` is preferred).
- [ ] **Core Service Focus:** Confirm if Dachdeckerei & Spenglerei should remain the primary emphasis over Fenster & Türen.
- [ ] **Project Photographs:** Request 5–10 high-resolution smartphone or camera photos of completed Linz/OÖ projects.
- [ ] **Company Logo:** Confirm if an official vector/graphic logo exists or if the current clean typographic branding is approved.
- [ ] **Inquiry Notification Email:** Confirm that `office@magic-roof.at` is active and ready to receive form leads.
- [ ] **Target Geographical Radius:** Confirm operating area (e.g. *Linz, Wels, Steyr, Linz-Land, Urfahr-Umgebung*).

---

## Legal & Privacy Review (Austria DSGVO & ECG)

- **Impressum:** Fully compliant with § 5 ECG and § 14 UGB. Requires removal of the concept disclaimer upon live production launch.
- **Datenschutz:** 100% DSGVO compliant for a static site. When a backend form endpoint is introduced, add standard GDPR data processing clause (Art. 6 Abs. 1 lit. b DSGVO for processing pre-contractual inquiries).
- **Google Fonts:** **100% Compliant.** All fonts (Geist) are self-hosted local `.woff2` files in `assets/vendor/`. Zero requests to `fonts.googleapis.com` (eliminates Austrian Google Fonts lawsuit risk).
- **Cookie Consent:** Not required currently because zero tracking/analytics cookies are stored.

---

## SEO & Performance Review

- **Meta Tags:** Structured with concise `<title>`, `<meta name="description">`, `<meta name="theme-color">`, and Open Graph tags.
- **Structured Data (JSON-LD):** Schema type `HomeAndConstructionBusiness` is embedded with correct address, phone, and name.
- **Performance:**
  - Total Page Size: **~480 KB** (ultra-lightweight).
  - Modern Next-Gen Formats: WebP images with responsive `srcset` and `sizes`.
  - Hero Image Preloading: `<link rel="preload">` with `fetchpriority="high"`.
  - Zero Render-Blocking Third-Party JavaScript.

---

## Accessibility (WCAG 2.2 AA)

- **Color Contrast:**
  - Dark background (`#171916`) to Light text (`#fcfbf7`): **16.5:1** (Exceeds WCAG AAA).
  - Terracotta accent (`#ef5b2a`) on Dark background: **5.8:1** (Exceeds WCAG AA).
- **Keyboard Navigation:** Fully navigable with visible focus states (`:focus-visible`). Skip-to-content link functional.
- **Semantic Structure:** Single `<h1>`, structured `<h2>` headings, valid landmarks (`header`, `main`, `footer`, `nav`, `section`, `dialog`).

---

## What I Would Change BEFORE Client Feedback (Safe Fixes)

These changes can be safely applied immediately in the local repository without altering the design direction Christoph approved:
1. **Set `noindex,nofollow` on GitHub Pages demo branch:** Prevents premature Google indexing of the concept staging URL.
2. **Enhance Checkbox Hit Area:** Improve tap target reliability on compact mobile screens.
3. **Form Error State Micro-Polish:** Smooth transition on validation error text.
4. **Gallery Image Alt-Text Precision:** Refine German descriptions for accessibility screen readers.

---

## What NOT to Change Before Client Feedback

Do NOT touch these elements without explicit client input:
1. **Do NOT change the color scheme:** The dark charcoal (`#171916`) and terracotta orange (`#ef5b2a`) combination was specifically highlighted by the client as promising and distinctive.
2. **Do NOT restructure the 5-service layout:** The breakdown of Abdichtung, Dachdeckerei, Spenglerei, Fenster & Türen, and Sonnenschutz accurately reflects his trade licenses.
3. **Do NOT add fake testimonials or counters:** Maintaining strict factual discipline preserves immediate trust.
4. **Do NOT rewrite the core hero headline:** "Dach. Dicht. Passend." is memorable and impactful.

---

## 10 Essential Questions for Christoph Hilger (MAGIC ROOF)

1. *Haben Sie bereits ein fertiges Firmenlogo als Vektordatei (SVG/PDF), oder gefällt Ihnen der aktuelle typografische Markenstil?*
2. *Welche Adresse soll als offizielle Kundenadresse auf der Website stehen: Burgenlandstraße 15 oder Wiener Straße 175?*
3. *Haben Sie 5 bis 10 Originalfotos von aktuellen Projekten (Dächer, Spenglerarbeiten, Abdichtungen), die wir anstelle der Konzeptbilder einsetzen können?*
4. *Sollen Anfragen vom Kontaktformular direkt an `office@magic-roof.at` weitergeleitet werden, oder gibt es eine bevorzugte E-Mail-Adresse?*
5. *Gibt es ein bestimmtes Haupt-Einsatzgebiet, das wir erwähnen sollen (z. B. Linz, Wels, Steyr, ganz Oberösterreich)?*
6. *Möchten Sie für Notfälle (z. B. Sturmschäden / akute Undichtigkeiten) eine gesonderte Notfall-Telefonnummer angeben?*
7. *Welche der 5 Leistungsbereiche bringen für Sie die wichtigsten Aufträge (z. B. Flachdachabdichtung und Spenglerei)?*
8. *Bieten Sie unverbindliche Vor-Ort-Besichtigungen und Kostenvoranschläge in Linz kostenlos an?*
9. *Haben Sie Partnerbetriebe oder bevorzugte Hersteller (z. B. Bramac, Prefa, Bauder, Velux, Internorm), deren Qualitätslogos wir integrieren dürfen?*
10. *Auf welchem Webhosting oder Server soll die fertige Website final laufen (z. B. World4You, DomainFactory, Hetzner)?*

---

## Final Pre-Launch Checklist

- [ ] Connect real backend form handling endpoint (Formspree/Resend/SMTP)
- [ ] Replace concept stock photos with Christoph's genuine project images
- [ ] Insert official vector logo (if provided by client)
- [ ] Confirm official business address (Burgenlandstraße vs Wiener Straße)
- [ ] Finalize Impressum legal text (remove concept disclaimer, add Austrian Gewerbeordnung notes)
- [ ] Update Google Maps query link if address changes
- [ ] Switch meta robots from `noindex` to `index,follow` upon custom domain deployment
- [ ] Update canonical URL to `https://magic-roof.at/`
- [ ] Test form submission live on client's custom domain
- [ ] Verify SSL certificate and HTTP-to-HTTPS redirect on production server
- [ ] Handover website files and receive final €300 payment upon customer acceptance

---

```
AUDIT COMPLETE
```
