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
  const message = clean(body.message, 4000, true)
  if (!name || !isEmail(email) || message.length < 5) return NextResponse.json({ error: "Please fill in your name, a valid email and a message." }, { status: 400 })
  if (rateLimited(`contact:${clientIp(req)}`, 5)) return NextResponse.json({ error: "Too many messages. Try again later." }, { status: 429 })

  const mailer = getMailer()
  if (!mailer) return NextResponse.json({ error: `Messages can't be sent from here right now. Email me at ${site.email}.` }, { status: 503 })

  try {
    await mailer.transport.sendMail({
      from: mailer.from,
      to: mailer.owner,
      replyTo: email,
      subject: `Portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    })
  } catch (err) {
    console.error("contact: send failed", err)
    return NextResponse.json({ error: `Couldn't send right now. Email me at ${site.email}.` }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}
