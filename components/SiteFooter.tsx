import Link from "next/link"
import { site } from "@/content/site"
import { GitHub, LinkedIn, Mail } from "./Icons"

export default function SiteFooter() {
  return (
    <footer className="border-t border-mute/10">
      <div className="shell flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={site.avatar} alt="" width={32} height={32} className="size-8 rounded-full object-cover ring-1 ring-mute/20" />
            {site.name}
          </Link>
          <p className="mt-2 text-sm text-mute">
            © {new Date().getFullYear()} {site.name}. Built from scratch with Next.js.
          </p>
        </div>
        <div className="flex gap-3">
          {[
            { href: site.github, label: "GitHub", icon: <GitHub className="size-4" /> },
            { href: site.linkedin, label: "LinkedIn", icon: <LinkedIn className="size-4" /> },
            { href: `mailto:${site.email}`, label: "Email", icon: <Mail className="size-4" /> },
          ].map((s) => (
            <a key={s.label} href={s.href} aria-label={s.label} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="rounded-xl border border-mute/20 p-2.5 transition-all duration-300 hover:border-ink hover:bg-ink hover:text-paper">
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
