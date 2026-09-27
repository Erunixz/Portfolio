import "server-only"
import nodemailer from "nodemailer"

export function getMailer() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM, MAIL_TO } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null
  const port = Number(SMTP_PORT ?? 465)
  const transport = nodemailer.createTransport({ host: SMTP_HOST, port, secure: port === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } })
  return { transport, from: MAIL_FROM ?? `Erfan Zamani <${SMTP_USER}>`, owner: MAIL_TO ?? SMTP_USER }
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const clean = (v: unknown, max: number, multiline = false) => {
  if (typeof v !== "string") return ""
  const s = v.trim().slice(0, max)
  return multiline ? s : s.replace(/[\r\n]+/g, " ")
}
export const isEmail = (v: string) => v.length <= 200 && EMAIL.test(v)

const hits = new Map<string, number[]>()
export function rateLimited(key: string, max = 3, windowMs = 60 * 60 * 1000) {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs)
  if (recent.length >= max) return true
  recent.push(now)
  hits.set(key, recent)
  return false
}

export const clientIp = (req: Request) => req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown"
