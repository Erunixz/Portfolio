"use client"
import { useState } from "react"
import { site } from "@/content/site"
import { cx } from "@/lib/utils"

type State = "idle" | "sending" | "sent" | { error: string }

export default function ContactForm() {
  const [state, setState] = useState<State>("idle")

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    setState("sending")
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form))) })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(json.error ?? `Something went wrong. Email me at ${site.email}.`)
      form.reset()
      setState("sent")
    } catch (err) {
      setState({ error: err instanceof Error ? err.message : "Something went wrong." })
    }
  }

  return (
    <form onSubmit={submit} className="card space-y-4 p-6 md:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-ink-2">Name</span>
          <input name="name" required maxLength={100} autoComplete="name" className="input" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-ink-2">Email</span>
          <input name="email" type="email" required maxLength={200} autoComplete="email" className="input" />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold text-ink-2">Message</span>
        <textarea name="message" required minLength={5} maxLength={4000} rows={5} className="input resize-none" />
      </label>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <p aria-live="polite" className={cx("text-sm", typeof state === "object" ? "text-maroon" : state === "sent" ? "text-ink" : "sr-only")}>
        {typeof state === "object" ? state.error : state === "sent" ? "Thanks! Your message is on its way. I'll reply by email." : ""}
      </p>

      <button type="submit" disabled={state === "sending"} className="btn btn-ink w-full disabled:opacity-60">
        {state === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  )
}
