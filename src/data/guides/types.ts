export interface GuideSection {
  id: string
  title: string
  content: string
}

export interface GuideFAQ {
  question: string
  answer: string
}

export interface Guide {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  intro: string
  sections: GuideSection[]
  faqs: GuideFAQ[]
  courseCta: { label: string; href: string }
  sources: { title: string; url: string }[]
}
