import type { Metadata } from "next"
import { site } from "@/content/site"
import ContactForm from "@/components/home/ContactForm"
import { RequestResumeButton } from "@/components/ResumeRequest"
import { GitHub, LinkedIn, Mail } from "@/components/Icons"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Erfan Zamani, or request his résumé by email.",
  alternates: { canonical: "/contact" },
}

export default function ContactPage() {
  const links = [
    { href: `mailto:${site.email}`, label: site.email, icon: <Mail className="size-5" /> },
    { href: site.linkedin, label: "linkedin.com/in/erfan-zamani1", icon: <LinkedIn className="size-5" /> },
    { href: site.github, label: `github.com/${site.githubHandle}`, icon: <GitHub className="size-5" /> },
  ]
  return (
    <div className="shell grid gap-12 pt-6 md:pt-10 lg:grid-cols-12">
      <div className="reveal-left min-w-0 lg:col-span-5">
        <p className="mb-3 text-xs font-bold tracking-[0.2em] text-mute uppercase">Contact</p>
        <h1 className="text-3xl font-black tracking-tighter md:text-4xl">Let&apos;s build something real.</h1>
        <p className="mt-4 max-w-md text-mute">{site.availability}. Research collaborations and interesting ideas are welcome too.</p>
        <ul className="mt-8 space-y-3 text-sm font-medium">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="inline-flex items-center gap-3 hover:text-maroon">
                {l.icon} {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="card mt-10 p-6">
          <p className="font-bold">Need my résumé?</p>
          <p className="mt-1 text-sm text-mute">Request it and it&apos;s emailed to you automatically.</p>
          <RequestResumeButton className="btn btn-ink mt-4" />
        </div>
      </div>
      <div className="reveal-right min-w-0 lg:col-span-7">
        <ContactForm />
      </div>
    </div>
  )
}
