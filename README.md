# ArboSerwisBeskidy.pl

> A high-performance, SEO-optimized landing page built for a local arborist company in the Beskidy region of Poland. Designed to maximize lead generation through conversion-focused layout, fast load times, and strong local SEO signals.

**[Live Demo →](https://arboserwisbeskidy.pl/)**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/Deployed-GitHub%20Pages-222?style=flat&logo=github)

---

## Overview

This project is a production landing page for a real client — an arborist business offering tree surgery and landscaping services. The goal was to build a fast, accessible, conversion-ready site with zero dependencies and no frameworks, keeping full control over performance and SEO.

The site is deployed automatically via GitHub Actions on every push to `main`.

## Technical Highlights

- **Zero dependencies** — no frameworks, no build tools, no npm. Pure HTML/CSS/JS, which results in near-instant load times and no supply chain risk.
- **Intersection Observer API** for scroll-triggered reveal animations, replacing heavier scroll event listeners and keeping the main thread free.
- **Custom drag-to-scroll gallery** built from scratch using Pointer Events API — works on both touch and desktop without a library.
- **WebP image format** used throughout for 30–50% smaller file sizes vs. JPEG, with proper fallbacks.
- **Video background** served as a native `<video>` element with `muted`, `autoplay`, and `playsinline` attributes for cross-browser compatibility and no layout shift.
- **Open Graph + semantic HTML5** structure for correct social sharing previews and crawler-friendly content hierarchy.
- **GDPR-compliant** privacy policy subpage required for professional services operating in the EU.
- **CI/CD** — automated deployment to GitHub Pages via `.github/workflows/static.yml`.

## Features

| Feature | Implementation |
|---|---|
| Responsive layout | CSS Grid + Flexbox, mobile-first breakpoints |
| Portfolio gallery | Custom drag-to-scroll (Pointer Events API) |
| Testimonials slider | Vanilla JS with auto-pagination |
| Scroll animations | Intersection Observer API |
| Contact form | Client-side validation, no backend required |
| SEO | Semantic H1–H4 hierarchy, ALT attributes, Open Graph |
| Legal compliance | Dedicated GDPR/Privacy Policy page |

## Project Structure

```
ArboSerwisBeskidy/
├── index.html          # Landing page (semantic HTML5, SEO structured)
├── style.css           # Styles (CSS custom properties, modern layouts)
├── script.js           # Gallery, slider, animations, form validation
├── dokumenty.html      # GDPR / Privacy Policy
├── img/                # WebP images + video assets
└── .github/workflows/  # GitHub Actions deployment pipeline
```

## What I Learned

Building this without any framework forced deliberate decisions at every step — choosing the right browser API instead of reaching for a library, structuring CSS for maintainability without a preprocessor, and thinking carefully about how the page would be indexed and rendered. It also gave me a much deeper understanding of Core Web Vitals and how layout, image formats, and JavaScript execution timing affect real-world performance scores.

---

**Live site:** [arboserwisbeskidy.pl](https://arboserwisbeskidy.pl/) · **Authors:** [DolilDev](https://github.com/DolilDev) · [screampy525](https://github.com/screampy525)
