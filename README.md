<div align="center">

# Erfan Zamani · Portfolio

**ML Research Assistant at McMaster · Software Engineer · Computer Science**

My personal site: experience, projects and awards, with a terminal you can type into.

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-149ECA?style=flat&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/license-MIT-7a003c?style=flat)](LICENSE)

[LinkedIn](https://www.linkedin.com/in/erfan-zamani1/) · [GitHub](https://github.com/Erunixz) · [Email](mailto:zamane1@mcmaster.ca)

<br />

<img src="docs/home-light.webp" alt="Portfolio home page in light mode" width="49%" />
<img src="docs/home-dark.webp" alt="Portfolio home page in dark mode" width="49%" />

</div>

<br />

## Highlights

| | |
| --- | --- |
| **Tabbed layout** | Home, Experience, Projects, Awards and Contact, each one click away from a pill header with a sliding indicator. |
| **Interactive terminal** | Type `whoami`, `experience`, `projects`, `skills`, `awards` or `open orbitour`. Tab autocompletes, ↑ and ↓ walk history, and every command also has a tap-friendly chip. |
| **Experience timeline** | A centre line that fills as you scroll, with roles alternating left and right. On phones the line moves to the side. |
| **Résumé by email** | Visitors request the résumé and receive the PDF automatically, and I get notified. The PDF is never publicly downloadable. |
| **Project case studies** | Real screenshots with a full-screen viewer, architecture diagrams that draw themselves, and the stack shown as icon chips. |
| **Command palette** | `Ctrl K` / `⌘ K` jumps to any page, project or link from anywhere. |
| **Light and dark themes** | Follows the system setting and remembers your choice. |
| **Accessible and fast** | Pages are prerendered, animations respect reduced motion, keyboard navigation works everywhere, and every page fits a phone screen. |

<table>
  <tr>
    <td width="50%"><img src="docs/terminal.webp" alt="The interactive terminal" /></td>
    <td width="50%"><img src="docs/experience.webp" alt="The experience timeline" /></td>
  </tr>
  <tr>
    <td align="center"><sub>The terminal</sub></td>
    <td align="center"><sub>The experience timeline</sub></td>
  </tr>
</table>

## Built with

| Area | Tools |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS 4, Poppins, Geist Mono |
| Motion | `motion` for the tab indicator, dialogs and the scroll-linked timeline |
| Email | Nodemailer over SMTP for the contact form and résumé requests |
| Icons | [Simple Icons](https://simpleicons.org) (CC0) |

## Getting started

Requires Node 20.9 or newer.

```bash
git clone https://github.com/Erunixz/Portfolio.git
cd Portfolio
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Environment variables

The contact form and résumé requests send email over SMTP. Without these variables the site still works, and the forms ask visitors to email directly.

| Variable | Example | Notes |
| --- | --- | --- |
| `SMTP_HOST` | `smtp.gmail.com` | Required |
| `SMTP_PORT` | `465` | Defaults to 465 |
| `SMTP_USER` | `you@gmail.com` | Required |
| `SMTP_PASS` | App Password | Required. For Gmail: Google Account › Security › App passwords |
| `MAIL_FROM` | `Erfan Zamani <you@gmail.com>` | Optional |
| `MAIL_TO` | `you@gmail.com` | Optional. Where notifications go, defaults to `SMTP_USER` |

Put the résumé at `private/resume.pdf`. The API route attaches it to each request. If the repository is public, anything committed in `private/` is visible on GitHub.

## Project structure

```
app/
  page.tsx                Home: hero, terminal, about, tech stack
  experience/             Experience timeline
  projects/               Project grid and /projects/[slug] case studies
  awards/                 Scholarships and competition distinctions
  contact/                Contact form and résumé request
  api/contact/            Contact form email
  api/resume-request/     Automatic résumé email
components/
  SiteHeader.tsx          Pill header with tabs
  home/Terminal.tsx       The interactive shell
  home/ExperienceTimeline.tsx
  Gallery.tsx             Screenshots and full-screen viewer
  ResumeRequest.tsx       Résumé request dialog
  CommandPalette.tsx      Ctrl K / ⌘ K palette
content/                  All text and data lives here
public/projects/          Project screenshots
```

## Editing content

Everything on the site comes from the files in `content/`, so updates rarely touch components.

| To change | Edit |
| --- | --- |
| Name, links, intro, typing roles | `content/site.ts` |
| Experience | `content/experience.ts` |
| Projects | `content/projects.ts` |
| Awards | `content/awards.ts` |
| Tech stack | `content/stack.ts` |
| About me | the `about` section in `app/page.tsx` |

**Adding a project:** add an entry to `content/projects.ts`, and put screenshots in `public/projects/<slug>/` (WebP, about 1600px wide). The first image becomes the card cover. The project page, terminal commands, command palette and sitemap update automatically.

## Deploy

1. Push to GitHub and import the repository on [Vercel](https://vercel.com). The default Next.js settings work as is.
2. Add the SMTP variables under Project › Settings › Environment Variables.
3. Set your domain in `content/site.ts` (`url`).

The contact and résumé forms use server routes, so the site needs a Node host like Vercel rather than a static host like GitHub Pages.

## License

[MIT](LICENSE) © Erfan Zamani
