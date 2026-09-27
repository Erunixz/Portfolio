export const SHOW_AMOUNTS = true

export type AwardCategory = "scholarships" | "math" | "computing"

export const awardCategories: { id: AwardCategory; title: string; blurb: string }[] = [
  { id: "scholarships", title: "Scholarships & university awards", blurb: "Merit-based entrance, research and excellence awards." },
  { id: "math", title: "Mathematics competitions", blurb: "National and provincial math contests." },
  { id: "computing", title: "Computing & science", blurb: "Programming and science olympiads." },
]

export type Award = {
  title: string
  category: AwardCategory
  issuer?: string
  detail?: string
  year?: string
  amount?: string

  featured?: boolean
}

export const awards: Award[] = [
  { category: "scholarships", title: "Faculty of Mathematics Global Scholarship", issuer: "University of Waterloo", detail: "Top 10 worldwide", amount: "$25k", featured: true },
  { category: "scholarships", title: "Engineering a Brighter Future Scholarship", issuer: "McMaster University", detail: "Entrance scholarship", amount: "$100k", featured: true },
  { category: "scholarships", title: "McMaster Scholarship", issuer: "McMaster University", detail: "Entrance scholarship", amount: "$120k" },
  { category: "scholarships", title: "Engineering Research Experience Award (EREA)", issuer: "McMaster University", detail: "Research award", amount: "$6k" },
  { category: "scholarships", title: "Computer Science International Scholar", issuer: "McMaster University", detail: "Merit award", amount: "$10k" },
  { category: "scholarships", title: "McMaster Award of Excellence", issuer: "McMaster University", detail: "Excellence award", amount: "$3k" },

  { category: "math", title: "Canadian Mathematical Olympiad Qualifying Repêchage (CMOQR)", issuer: "Canadian Mathematical Society", detail: "Top 50 in Canada", year: "2025", featured: true },
  { category: "math", title: "Canadian Lynx Mathematics Challenge", detail: "National Honour Roll · Provincial Senior Champion", year: "2024", featured: true },
  { category: "math", title: "EMACS at Waterloo Invitational", issuer: "University of Waterloo", detail: "Top 30 of 17,000+ competitors", year: "2024" },
  { category: "math", title: "Canadian Open Mathematics Challenge", issuer: "Canadian Mathematical Society", detail: "Top 150 nationwide", year: "2024" },
  { category: "math", title: "Canadian Senior Mathematics Challenge", issuer: "University of Waterloo", detail: "Honour Roll", year: "2024" },

  { category: "computing", title: "Canadian Computing Competition", issuer: "University of Waterloo", detail: "Certificate of Distinction", year: "2025" },
  { category: "computing", title: "Brain Bee", issuer: "University of Toronto", detail: "Stage 2 Qualifier", year: "2025" },
]

export const awardsSummary = "Merit-based entrance, research and excellence awards from McMaster, a University of Waterloo global scholarship, and national math and computing distinctions."
