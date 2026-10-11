import type { Metadata } from "next"
import ContactSection from "@/components/ContactSection"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Erfan Zamani, or request his résumé by email.",
  alternates: { canonical: "/contact" },
}

export default function ContactPage() {
  return (
    <div className="shell pt-6 md:pt-10">
      <ContactSection />
    </div>
  )
}
