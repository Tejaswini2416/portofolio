# ?? Tejaswini Kummari � Personal Portfolio

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38BDF8?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-latest-EF008F?style=for-the-badge&logo=framer)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel)

**A high-converting, interactive, and visually stunning personal portfolio website**
Built for Tejaswini Kummari � CSE Graduate specializing in AI/ML, Full-Stack Development & DevOps.

[?? Live Demo](https://tejaswini-portfolio.vercel.app) � [?? GitHub Repo](https://github.com/Tejaswini2416/portofolio) � [?? Contact](mailto:tejaswinikummari17@gmail.com)

</div>

---

## ? Features

- ?? **Premium Dark UI** � Glassmorphism, neon glow effects, animated gradient rings
- ??? **Animated Hero Section** � Profile portrait with floating tech badges & pulsing status pill
- ?? **Projects Showcase** � Filterable project cards with detailed modals (problem, solution, metrics)
- ??? **Skills Matrix** � Categorized skill grid with icon-based visual representation
- ?? **Education Timeline** � Interactive vertical timeline with highlights
- ?? **Certifications Wall** � Verified badge display with credential links
- ?? **Working Contact Form** � EmailJS-powered, sends directly to tejaswinikummari17@gmail.com
- ?? **Admin CMS Panel** � Edit projects, profile & content at /admin without touching code
- ?? **Particle Canvas Background** � Dynamic animated starfield background
- ?? **Fully Responsive** � Mobile-first design, works on all screen sizes
- ? **SEO Optimized** � OpenGraph, Twitter card metadata, semantic HTML

---

## ?? Pages

| Route | Description |
|---|---|
| `/` | Hero, featured projects, skills snapshot, stats |
| `/about` | Bio, education timeline, achievements |
| `/skills` | Full skills matrix by category |
| `/projects` | All projects with filter by category |
| `/certifications` | Certification cards with verification links |
| `/contact` | Contact form + direct social links |
| `/admin` | CMS panel to edit portfolio content |

---

## ??? Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS + Custom CSS |
| **Animations** | Framer Motion |
| **Icons** | React Icons |
| **Email** | EmailJS |
| **CMS** | JSON-based (`public/data/projects.json`) + Admin UI |
| **Deployment** | Vercel |

---

## ?? Getting Started

### Prerequisites
- Node.js `v18+`
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Tejaswini2416/portofolio.git

# 2. Navigate into the project
cd portofolio

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open http://localhost:3000 in your browser.

---

## ?? Available Scripts

```bash
npm run dev      # Start development server (hot reload)
npm run build    # Build for production
npm run start    # Run production build locally
npm run lint     # Lint the codebase
```

---

## ?? Configuration

### Contact Form (EmailJS)
To enable the contact form, update your EmailJS credentials in:
`app/api/contact/route.ts`

Set your:
- `EMAILJS_SERVICE_ID`
- `EMAILJS_TEMPLATE_ID`
- `EMAILJS_PUBLIC_KEY`

### Updating Portfolio Content
All portfolio data lives in:

```
data/portfolioData.ts       # Profile, skills, education, certifications
public/data/projects.json   # Project entries (editable via /admin)
```

Or use the built-in **Admin Panel** at `/admin` to edit without touching code.

---

## ?? Project Structure

```
portfolio/
+-- app/
�   +-- layout.tsx          # Root layout with SEO metadata
�   +-- page.tsx            # Homepage (Hero + Featured Projects)
�   +-- about/              # About page
�   +-- skills/             # Skills page
�   +-- projects/           # Projects page
�   +-- certifications/     # Certifications page
�   +-- contact/            # Contact page
�   +-- admin/              # Admin CMS panel
�   +-- api/contact/        # Email API route
+-- components/
�   +-- Navbar.tsx
�   +-- Footer.tsx
�   +-- ProjectCard.tsx
�   +-- ProjectModal.tsx
�   +-- SkillIcon.tsx
�   +-- ContactForm.tsx
�   +-- EducationTimeline.tsx
�   +-- TiltCard.tsx
�   +-- BackgroundCanvas.tsx
+-- context/
�   +-- PortfolioContext.tsx # Global state for portfolio data
+-- data/
�   +-- portfolioData.ts    # Static portfolio data
+-- public/
    +-- images/             # Profile & project images
    +-- data/
        +-- projects.json   # Editable projects data
```

---

## ?? Deployment

This project is deployed on **Vercel** with zero-config setup.

```bash
# Build for production
npm run build

# Deploy via Vercel CLI
npx vercel --prod
```

Or connect your GitHub repo to https://vercel.com for automatic deployments on every push.

---

## ????? Author

**Tejaswini Kummari**
Computer Science & Engineering Graduate
Specializing in AI/ML � Full-Stack Development � DevOps

[![GitHub](https://img.shields.io/badge/GitHub-Tejaswini2416-181717?style=flat&logo=github)](https://github.com/Tejaswini2416)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-tejaswini--kummari-0A66C2?style=flat&logo=linkedin)](https://www.linkedin.com/in/tejaswini-kummari-192425313/)
[![Email](https://img.shields.io/badge/Email-tejaswinikummari17@gmail.com-EA4335?style=flat&logo=gmail)](mailto:tejaswinikummari17@gmail.com)

---

## ?? License

This project is open source and available under the [MIT License](LICENSE).
