import { NextResponse } from "next/server"
import { site } from "@/content/site"
import { clean, clientIp, getMailer, getResume, isEmail, rateLimited } from "@/lib/mail"

export const runtime = "nodejs"

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 })
  if (body.website) return NextResponse.json({ ok: true })

  const name = clean(body.name, 100)
  const email = clean(body.email, 200)
  const company = clean(body.company, 120)
  const note = clean(body.note, 1500, true)
  if (!name || !isEmail(email)) return NextResponse.json({ error: "Please add your name and a valid email." }, { status: 400 })
  if (rateLimited(`resume:${clientIp(req)}`)) return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 })

  const mailer = getMailer()
  if (!mailer) return NextResponse.json({ error: `Résumé requests can't be sent right now. Email me at ${site.email}.` }, { status: 503 })

  const pdf = await getResume()

  const domain = site.url.replace(/^https?:\/\/(www\.)?/, "")
  const reply = [
    `Hi ${name.split(" ")[0]},`,
    "",
    pdf
      ? `Thanks for your interest. My résumé is attached, and my projects are at ${domain}/projects.`
      : `Thanks for your interest. I'll send my résumé over personally shortly. In the meantime, my projects are at ${domain}/projects.`,
    "",
    "I'd love to hear what your team is working on and talk about where I could make an impact. Just reply here and I'll get back to you personally.",
    "",
    "Best,",
    "Erfan Zamani",
    "ML Research Assistant · McMaster University",
    `${domain} · linkedin.com/in/erfan-zamani1`,
  ].join("\n")

  try {
    await Promise.all([
      mailer.transport.sendMail({
        from: mailer.from,
        to: email,
        replyTo: mailer.owner,
        subject: "Résumé – Erfan Zamani",
        text: reply,
        attachments: pdf ? [{ filename: "Erfan-Zamani-Resume.pdf", content: pdf, contentType: "application/pdf" }] : [],
      }),
      mailer.transport.sendMail({
        from: mailer.from,
        to: mailer.owner,
        replyTo: email,
        subject: `Résumé request: ${name}${company ? ` (${company})` : ""}`,
        text: [`Name: ${name}`, `Email: ${email}`, `Company: ${company || "not given"}`, "", note || "(no note)", "", pdf ? "Résumé was sent automatically." : "No résumé found (private/resume.pdf or RESUME_URL); send it manually."].join("\n"),
      }),
    ])
  } catch (err) {
    console.error("resume-request: send failed", err)
    return NextResponse.json({ error: `Couldn't send right now. Email me at ${site.email}.` }, { status: 502 })
  }

  return NextResponse.json({ ok: true, attached: !!pdf })
}
