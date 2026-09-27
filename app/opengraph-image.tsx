import { ImageResponse } from "next/og"
import { site } from "@/content/site"

export const dynamic = "force-static"
export const alt = `${site.name} | ${site.headline}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  const grid = "linear-gradient(to right, rgba(20,19,18,.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,19,18,.07) 1px, transparent 1px)"
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#f5f2ec", backgroundImage: grid, backgroundSize: "40px 40px", color: "#141312" }}>
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 2, color: "#6b655c" }}>ERFAN ZAMANI · CS @ MCMASTER · ML · SYSTEMS · PRODUCTS</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 120, fontWeight: 800, letterSpacing: -5, lineHeight: 1 }}>
          <div style={{ display: "flex" }}>
            Erfan Zamani<span style={{ color: "#7a003c" }}>.</span>
          </div>
          <div style={{ display: "flex", fontSize: 52, letterSpacing: -1, color: "#6b7280", marginTop: 20 }}>ML research · clinical software · full-stack</div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#3a3733" }}>ML Research @ McMaster · Software Engineer @ KITE (UHN) · GDG Open Source</div>
      </div>
    ),
    size,
  )
}
