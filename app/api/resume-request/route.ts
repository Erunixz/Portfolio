import { readFile } from "node:fs/promises"
import path from "node:path"
import { NextResponse } from "next/server"
import { site } from "@/content/site"
import { clean, clientIp, getMailer, isEmail, rateLimited } from "@/lib/mail"

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

  const pdf = await readFile(path.join(process.cwd(), "private", "resume.pdf")).catch(() => null)

  const reply = [
    `Hi ${name.split(" ")[0]},`,
    "",
    pdf ? "Thanks for your interest. My résumé is attached." : "Thanks for your interest! I'll send my résumé over personally shortly.",
    "",
    `Projects: ${site.url}/projects`,
    `GitHub: ${site.github}`,
    "",
    "If you'd like to talk, just reply to this email.",
    "",
    "Erfan Zamani",
  ].join("\n")

  try {
    await Promise.all([
      mailer.transport.sendMail({
        from: mailer.from,
        to: email,
        replyTo: mailer.owner,
        subject: "Erfan Zamani's résumé",
        text: reply,
        attachments: pdf ? [{ filename: "Erfan-Zamani-Resume.pdf", content: pdf, contentType: "application/pdf" }] : [],
      }),
      mailer.transport.sendMail({
        from: mailer.from,
        to: mailer.owner,
        replyTo: email,
        subject: `Résumé request from ${name}${company ? ` (${company})` : ""}`,
        text: [`Name: ${name}`, `Email: ${email}`, `Company: ${company || "not given"}`, "", note || "(no note)", "", pdf ? "Résumé was sent automatically." : "No private/resume.pdf found; send it manually."].join("\n"),
      }),
    ])
  } catch (err) {
    console.error("resume-request: send failed", err)
    return NextResponse.json({ error: `Couldn't send right now. Email me at ${site.email}.` }, { status: 502 })
  }

  return NextResponse.json({ ok: true, attached: !!pdf })
}
