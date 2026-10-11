import Link from "next/link"
import { site } from "@/content/site"
import Hero from "@/components/home/Hero"
import VelocityMarquee from "@/components/home/VelocityMarquee"
import Terminal from "@/components/home/Terminal"
import TechStack from "@/components/home/TechStack"
import ExperienceTimeline from "@/components/home/ExperienceTimeline"
import ProjectsGrid from "@/components/ProjectsGrid"
import AwardsList from "@/components/AwardsList"
import ContactSection from "@/components/ContactSection"
import SectionHead from "@/components/SectionHead"
import { ArrowRight } from "@/components/Icons"

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
        <div className="shell">
          <div className="max-w-3xl">
            <SectionHead title="About me" className="mb-6 md:mb-8" />
            <div className="reveal-left space-y-4 leading-relaxed text-mute">
              <p>
                When my family moved to Canada, we started over. My parents rebuilt their careers from nothing, and I walked into classrooms where everyone else already knew the
                system they&apos;d grown up in. I was behind, and I couldn&apos;t afford to stay there.
              </p>
              <p>
                Barely two years later, I was qualifying for the <B>Canadian Mathematical Olympiad Repêchage</B>, earning distinction in the{" "}
                <B>Canadian Computing Competition</B>, and building clinical AI at the <B>KITE Research Institute (UHN)</B> beside senior researchers and University of Toronto
                professors, before I&apos;d even started university.
              </p>
              <p>
                That work was recognized with <B>$120K+ in scholarship offers from U of T</B> and Waterloo&apos;s <B>Global Scholarship</B>, given to just ten students in the
                world. Today I study Computer Science at McMaster, where I&apos;ve earned <B>$239K in scholarships</B> and work as an <B>ML Research Assistant</B>.
              </p>
              <p>
                I don&apos;t take any of it for granted. Starting from behind taught me to learn fast, work relentlessly and stay hungry, and that&apos;s what I bring to every
                team I join. I want to build AI that genuinely matters, alongside people who push me to be better.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" aria-labelledby="experience-title" className="scroll-mt-24 border-t border-mute/10 py-20 md:py-24">
        <div className="shell">
          <SectionHead kicker="Experience" title={<span id="experience-title">Where I&apos;ve worked and learned.</span>} aside={<SeeAll href="/experience" />} />
          <ExperienceTimeline />
        </div>
      </section>

      <section id="projects" aria-labelledby="projects-title" className="scroll-mt-24 border-t border-mute/10 py-20 md:py-24">
        <div className="shell">
          <SectionHead title={<span id="projects-title">Projects</span>} aside={<SeeAll href="/projects" />} />
          <ProjectsGrid />
        </div>
      </section>

      <section id="awards" aria-labelledby="awards-title" className="scroll-mt-24 border-t border-mute/10 py-20 md:py-24">
        <div className="shell">
          <SectionHead
            kicker="Awards & honours"
            title={<span id="awards-title">Recognition along the way.</span>}
            aside={
              <p className="rounded-full border border-line bg-card px-4 py-2 text-sm font-semibold">
                {site.program}, {site.school} · <span className="text-maroon">GPA {site.gpa}</span>
              </p>
            }
          />
          <AwardsList nav={false} headingLevel="h3" />
        </div>
      </section>

      <section id="stack" className="border-t border-mute/10 py-20 md:py-24">
        <div className="shell">
          <SectionHead kicker="Skills & tools" title="My tech stack." />
          <TechStack />
        </div>
      </section>

      <section id="contact" aria-labelledby="contact-title" className="scroll-mt-24 border-t border-mute/10 py-20 md:py-24">
        <div className="shell">
          <ContactSection as="h2" titleId="contact-title" />
        </div>
      </section>
    </>
  )
}

function SeeAll({ href }: { href: string }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-1.5 text-sm font-bold text-mute hover:text-ink">
      Open tab <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
    </Link>
  )
}

function B({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-ink">{children}</strong>
}
