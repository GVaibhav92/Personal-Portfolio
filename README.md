# Vaibhav Gupta — Portfolio

A responsive personal portfolio showcasing my work as a backend and systems-focused developer.

Built with **React, TypeScript, Tailwind CSS, Framer Motion, and Lottie**, with an emphasis on clean UI, subtle interactions, accessibility, and a strong engineering-focused visual identity.

**Live site:** [https://gupta-vaibhav-92.vercel.app/]

---

## ✨ Highlights

- Responsive portfolio designed for desktop, tablet, and mobile.
- Glassmorphism floating navbar with active-section tracking and light/dark theme switching.
- Animated **Lottie panda** in the hero section for a lightweight, playful introduction.
- Interactive project cards with cursor-following glow, 3D tilt, and detailed project modals.
- Skills explorer with technology logos, core-stack cards, and a request-flow visualization.
- Animated count-up statistics, experience accordion, education timeline, and interactive fun-fact flip card.
- Semantic HTML and keyboard-accessible interactive elements.
- Respects `prefers-reduced-motion` for users who prefer minimal animation.
- Responsive layouts and custom CSS theme tokens for consistent styling.

---

## 🚀 Featured Projects

| Project | Description |
|---|---|
| [URLify](https://github.com/GVaibhav92/URLify) | High-performance Go URL shortener with Redis cache-aside redirects, Lua token-bucket rate limiting, JWT authentication, PostgreSQL, Prometheus, Grafana, and load testing. |
| [CampusHub](https://github.com/GVaibhav92/CampusHub) | Multi-tenant campus booking platform built with Go and a serverless AWS architecture. |
| **This Portfolio** | Responsive React portfolio focused on backend engineering, systems thinking, and interactive UI. |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 18 + Vite** | UI framework and development/build tooling |
| **TypeScript** | Type safety and maintainable component development |
| **Tailwind CSS v4** | Utility-based styling and responsive layouts |
| **Custom CSS** | Theme tokens, glassmorphism, cards, animations, and visual effects |
| **Framer Motion** | Entrance animations, transitions, modals, and interactive motion |
| **Lottie React** | Hero illustration and animated panda |
| **Lucide React** | Interface icons |
| **Simple Icons** | Technology and brand logos |
| **Vercel** | Production hosting and continuous deployment |

---

## 📁 Project Structure

```text
src/
├── App.tsx       # Navbar, hero, sections, project modals and interactions
├── Skills.tsx    # Skills explorer and technology visualization
├── data.ts       # Portfolio content and project data
├── index.css     # Theme tokens and component styling
├── main.tsx      # Application entry point
└── assets/
    └── panda.json # Lottie hero animation

public/
└── resume.pdf    # Downloadable resume
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/GVaibhav92/<repository-name>.git
cd <repository-name>
npm install
```

### Development

```bash
npm run dev
```

The development server will be available at:

```text
http://localhost:5173
```

### Production Build

```bash
npm run build
```

This creates the optimized production build in:

```text
dist/
```

### Preview Production Build

```bash
npm run preview
```

---

## 🎨 Customising the Portfolio

Most portfolio content can be changed without modifying the component structure.

| What to change | Location |
|---|---|
| Name, email, social links, resume | `src/data.ts` → `links` |
| Projects | `src/data.ts` → `projects` |
| Education | `src/data.ts` → `education` |
| Experience | `src/data.ts` → `experience` |
| Certificates | `src/data.ts` → `certificates` |
| Skills and technology logos | `src/Skills.tsx` |
| Hero, sections, interactions and modals | `src/App.tsx` |
| Colors, typography and theme tokens | `src/index.css` |
| Hero Lottie animation | `src/assets/panda.json` |
| Resume | `public/resume.pdf` |

Sections with no corresponding data, such as certificates, are automatically hidden.

---

## 🎯 Design Philosophy

The portfolio is designed around a few principles:

### Measure first

Visual and technical changes should have a reason behind them rather than being added simply for decoration.

### Design for failure

The projects showcased here focus heavily on real-world backend concerns such as retries, timeouts, caching, idempotency, observability, and service reliability.

### Keep it simple

Interactions are intentionally subtle. Motion is used to improve hierarchy and feedback rather than compete with the content.

---

## ♿ Accessibility

The portfolio includes:

- Semantic HTML elements.
- Keyboard-accessible interactive components.
- Visible focus states.
- Accessible labels for interactive controls.
- Reduced-motion support through `prefers-reduced-motion`.
- Responsive layouts across screen sizes.
- Appropriate ARIA attributes for menus, dialogs, toggles, and interactive elements.

---

## ☁️ Deployment

The portfolio is deployed using [Vercel](https://vercel.com).

The project uses Vite, which Vercel can deploy with zero special framework configuration.

For Git-based deployments, the GitHub repository can be connected to Vercel so that pushes to the configured production branch trigger new deployments, while Git-based workflows can also provide preview deployments.

Typical production configuration:

```text
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

---

## 📜 Credits

- [Lottie](https://lottiefiles.com/) — Hero animation
- [Lucide](https://lucide.dev/) — Interface icons
- [Simple Icons](https://simpleicons.org/) — Technology logos
- Plus Jakarta Sans — Primary typeface
- JetBrains Mono — Monospace typeface

---

## 📬 Connect

If you'd like to discuss backend engineering, distributed systems, or a project, feel free to reach out.

- [GitHub](https://github.com/GVaibhav92)
- [LinkedIn](https://www.linkedin.com/)
- [LeetCode](https://leetcode.com/)
- Email — available through the portfolio

---

**Built with React, TypeScript, and a lot of curiosity about how systems work.**
