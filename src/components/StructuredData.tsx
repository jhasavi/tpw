export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'The Purple Wings',
    alternateName: 'Purple Wings Financial Literacy',
    description: 'Free online financial literacy platform for women. Learn budgeting, investing, retirement planning, debt management, and wealth building. Founded by Shalini Jha in Needham, MA.',
    url: 'https://www.thepurplewings.org',
    logo: 'https://www.thepurplewings.org/images/logo-nobg.png',
    founder: {
      '@type': 'Person',
      name: 'Shalini Jha',
      jobTitle: 'President & Founder',
      description: 'Financial literacy advocate dedicated to empowering women through education',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Needham',
      addressRegion: 'MA',
      addressCountry: 'US',
    },
    sameAs: [
      'https://www.facebook.com/myPurpleWings/',
      'https://needhamobserver.com/program-encourages-women-to-spread-financial-literacy-wings/',
      'https://www.boston25news.com/news/local/she-had-no-clue-how-much-money-she-had-local-group-empowering-women-understand-finances/JBGKMMBLRRHQPLIP564E6NCNUY/',
    ],
    educationalCredentialAwarded: 'Certificate of Completion',
    knowsAbout: [
      'Financial Literacy',
      'Personal Finance',
      'Budgeting',
      'Investing',
      'Retirement Planning',
      'Debt Management',
      'Women Empowerment',
      'Financial Independence',
      'Wealth Building',
    ],
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'info@thepurplewings.org',
      availableLanguage: 'English',
    },
    offers: {
      '@type': 'Offer',
      category: 'Educational',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      description: 'Free online financial literacy courses for women',
    },
  }

  // FAQ Schema for AI engines
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is The Purple Wings?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Purple Wings is a free online financial literacy platform founded by Shalini Jha in Needham, MA. We provide comprehensive courses for women covering budgeting, investing, retirement planning, and wealth building.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are the courses really free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, all our courses are 100% free. We believe financial education should be accessible to all women, regardless of their background or financial situation.',
        },
      },
      {
        '@type': 'Question',
        name: 'Who can take these courses?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our courses are designed specifically for women at all stages of their financial journey, from complete beginners to those seeking advanced investment strategies.',
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}
