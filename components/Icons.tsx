type P = { className?: string }

export const ArrowRight = ({ className = "size-4" }: P) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2 8h11m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
  </svg>
)

export const ArrowUpRight = ({ className = "size-4" }: P) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
  </svg>
)

export const Download = ({ className = "size-4" }: P) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 2v8m-3.5-3.5L8 10l3.5-3.5M2.5 13.5h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
  </svg>
)

export const GitHub = ({ className = "size-4" }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
  </svg>
)

export const LinkedIn = ({ className = "size-4" }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.83v1.5h.05c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.14v5.42h-4v-4.8c0-1.15-.02-2.62-1.6-2.62-1.6 0-1.84 1.25-1.84 2.54v4.88h-4v-11Z" />
  </svg>
)

export const Mail = ({ className = "size-4" }: P) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2 3.5h12v9H2zM2 4l6 5 6-5" stroke="currentColor" strokeWidth="1.3" />
  </svg>
)

export const Search = ({ className = "size-4" }: P) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4" />
    <path d="m10.5 10.5 3.5 3.5" stroke="currentColor" strokeWidth="1.4" />
  </svg>
)

export const Mark = ({ className = "size-6" }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="0.5" y="0.5" width="23" height="23" stroke="currentColor" />
    <path d="M4 17 C9 17 9 7 14 7" stroke="currentColor" />
    <path d="M4 7 C9 7 9 17 14 17" stroke="currentColor" opacity=".35" />
    <circle cx="17" cy="12" r="3" fill="#7a003c" />
  </svg>
)
