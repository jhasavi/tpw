export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'The Purple Wings',
    description: 'Women\'s financial empowerment through comprehensive online courses',
    url: 'https://www.thepurplewings.org',
    logo: 'https://www.thepurplewings.org/images/logo-nobg.png',
    founder: {
      '@type': 'Person',
      name: 'Shalini Jha',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Needham',
      addressRegion: 'MA',
      addressCountry: 'US',
    },
    sameAs: [
      'https://www.facebook.com/myPurpleWings/',
    ],
    educationalCredentialAwarded: 'Certificate of Completion',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
