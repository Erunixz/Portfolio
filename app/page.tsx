import Link from "next/link"
import { awardsSummary } from "@/content/awards"
import { site } from "@/content/site"
import Hero from "@/components/home/Hero"
import VelocityMarquee from "@/components/home/VelocityMarquee"
import Terminal from "@/components/home/Terminal"
import TechStack from "@/components/home/TechStack"
import SectionHead from "@/components/SectionHead"
import { ArrowRight } from "@/components/Icons"

const highlights = [
  { k: "Now", v: "ML Research Assistant at McMaster, building machine learning systems and software", href: "/experience" },
  { k: "Before", v: "Software Engineer at KITE Research Institute (UHN) on a voice-based obstructive sleep apnea screening platform", href: "/experience" },
  { k: "Open source", v: "Team member with Google Developer Groups, contributing to shared open-source projects", href: "/experience" },
  { k: "Recognized", v: awardsSummary, href: "/awards" },
]

export default function Home() {
  return (
    <>
      <Hero />
      <VelocityMarquee />

      <section aria-labelledby="shell-title" className="shell py-20 md:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="reveal-left min-w-0 lg:col-span-4">
            <SectionHead kicker="Try it" title={<span id="shell-title">Explore by typing.</span>} className="mb-6 md:mb-8" />
            <p className="text-mute">
              A tiny shell with my experience, projects, skills and awards. Type <code className="font-mono text-ink">help</code>, press{" "}
              <kbd className="font-mono text-ink">Tab</kbd> to autocomplete, or tap a command.
            </p>
          </div>
          <div className="reveal-right min-w-0 lg:col-span-8">
            <Terminal />
          </div>
        </div>
      </section>

      <section id="about" className="border-t border-mute/10 py-20 md:py-24">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <SectionHead kicker="About me" title="More than anything, I want my work to matter." className="mb-6 md:mb-8" />
            <div className="reveal-left space-y-4 leading-relaxed text-mute">
              <p className="text-lg text-ink">
                Two years after immigrating to Canada, I found myself contributing to <B>AI and software systems</B> at{" "}
                <B>one of the world&apos;s leading rehabilitation research institutes</B>, building tools used across <B>real patient sessions</B>, competing among{" "}
                <B>Canada&apos;s strongest mathematics and computing students</B>, and earning opportunities I once considered impossible.
              </p>
              <p>
                When my family immigrated to Canada, we had to <B>rebuild our lives in a new country</B> while my parents restarted their careers. I entered an unfamiliar education
                system alongside students who had spent their entire lives growing within it. That created a gap, and I became <B>determined to close it as quickly as I could</B>.
              </p>
              <p>
                In a remarkably short period, I <B>qualified among top national mathematics and computing competitors</B>, received <B>more than $120,000 in scholarship offers</B>{" "}
                from the University of Toronto, and earned the <B>$25,000 University of Waterloo Faculty of Mathematics Global Scholarship</B>, awarded to{" "}
                <B>only ten students worldwide</B>. I ultimately turned down both to pursue Computer Science at McMaster University, where I now hold a <B>{site.gpa} GPA</B> and have
                earned <B>$239,000 CAD in merit-based entrance, research and excellence awards</B>.
              </p>
              <p>
                What matters most to me, however, is not the numbers. Those achievements proved something to me: even with uncertainty, financial pressure, unfamiliarity and the
                challenge of starting over, <B>opportunities that once felt out of reach were still possible</B>. Each milestone became proof that obstacles did not have to define the
                ceiling of what I could achieve.
              </p>
              <p>
                Before beginning university, I worked at the <B>KITE Research Institute at University Health Network</B>, where I built an{" "}
                <B>audio and video recording system used in real patient sessions</B>, and contributed to an <B>AI platform for sleep apnea screening</B> alongside{" "}
                <B>senior researchers and University of Toronto faculty</B>. Seeing something I helped build move beyond my laptop and become part of real research changed the way I
                thought about technology.
              </p>
              <p>
                I realized that what excites me most is not simply building advanced models. It is creating something that <B>makes a tangible difference in people&apos;s lives</B>. I
                want to work on AI that is <B>useful, trusted and meaningful</B>, where research becomes something real and where the impact can actually be felt.
              </p>
              <p>
                Today, I continue that pursuit as a <B>Machine Learning Research Assistant at McMaster</B>. I keep seeking environments where{" "}
                <B>the problems are difficult, the standards are high</B>, and the people around me force me to become better. I want to work alongside exceptional people, contribute
                to ambitious AI, and build technology whose impact extends beyond the model itself to <B>the people who ultimately depend on it</B>.
              </p>
            </div>
          </div>
          <ul className="grid content-start gap-3 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:pt-28">
            {highlights.map((h, i) => (
              <li key={h.k} className="reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <Link href={h.href} className="card card-hover group flex h-full items-start gap-4 p-5">
                  <span className="flex-1">
                    <span className="block text-[11px] font-bold tracking-widest text-maroon uppercase">{h.k}</span>
                    <span className="mt-1.5 block text-sm leading-relaxed font-medium">{h.v}</span>
                  </span>
                  <ArrowRight className="mt-1 size-4 shrink-0 text-mute transition-transform group-hover:translate-x-1 group-hover:text-ink" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="stack" className="border-t border-mute/10 py-20 md:py-24">
        <div className="shell">
          <SectionHead kicker="Skills & tools" title="My tech stack." />
          <TechStack />
        </div>
      </section>
    </>
  )
}

function B({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-ink">{children}</strong>
}
