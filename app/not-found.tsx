import Link from "next/link"

export default function NotFound() {
  return (
    <div className="shell grid min-h-[60vh] place-items-center py-24 text-center">
      <div>
        <p className="font-mono text-[12px] text-maroon">ERR 404 · node not found</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-[-0.045em] md:text-7xl">This path has no edge.</h1>
        <p className="mt-4 text-ink-2">
          Try the <Link href="/" className="link">system map</Link>, or press <kbd className="font-mono">Ctrl K</kbd> to search.
        </p>
      </div>
    </div>
  )
}
