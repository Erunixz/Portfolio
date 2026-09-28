import type { Metadata, Viewport } from "next"
import { Caveat, Geist_Mono, Poppins } from "next/font/google"
import "./globals.css"
import { site } from "@/content/site"
import Providers from "@/components/Providers"
import SiteHeader from "@/components/SiteHeader"
import SiteFooter from "@/components/SiteFooter"

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"], variable: "--font-poppins" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })
const caveat = Caveat({ subsets: ["latin"], weight: ["500"], variable: "--font-caveat" })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.headline}`, template: `%s | ${site.name}` },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: ["Erfan Zamani", "machine learning", "computer vision", "sleep apnea", "software engineering", "software engineer", "McMaster", "KITE", "UHN"],
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: `${site.name} | ${site.headline}`,
    description: site.description,
    locale: "en_CA",
  },
  twitter: { card: "summary_large_image", title: `${site.name} | ${site.headline}`, description: site.description },
  alternates: { canonical: "/" },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfaf7" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
}

const bootScript = `(function(){var c=document.documentElement.classList;c.add('js');try{var t=localStorage.getItem('theme');if(t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches)c.add('dark')}catch(e){}})()`

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} ${geistMono.variable} ${caveat.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="min-h-dvh">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
          Skip to content
        </a>
        <Providers>
          <SiteHeader />
          <main id="main" className="pt-32 lg:pt-28">
            {children}
          </main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  )
}
