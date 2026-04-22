import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import ShareAchievement from '@/components/ShareAchievement'
import PrintCertificateButton from '@/components/PrintCertificateButton'

interface CertificatePageProps {
  params: Promise<{ courseSlug: string }>
  searchParams: Promise<{ name?: string }>
}

// Friendly display names for course slugs
const COURSE_DISPLAY_NAMES: Record<string, { title: string; curriculum: string; level: string }> = {
  'financial-literacy-basics':      { title: 'Financial Literacy Basics',       curriculum: "Women's Financial Literacy", level: 'Beginner' },
  'budgeting-basics':               { title: 'Budgeting Basics',                curriculum: "Women's Financial Literacy", level: 'Beginner' },
  'emergency-planning':             { title: 'Emergency Planning & Safety Net', curriculum: "Women's Financial Literacy", level: 'Beginner' },
  'credit-management':              { title: 'Credit Management',               curriculum: "Women's Financial Literacy", level: 'Intermediate' },
  'investing-fundamentals':         { title: 'Investing Fundamentals',          curriculum: "Women's Financial Literacy", level: 'Intermediate' },
  'retirement-planning':            { title: 'Retirement Planning',             curriculum: "Women's Financial Literacy", level: 'Intermediate' },
  'tax-strategies':                 { title: 'Tax Strategies',                  curriculum: "Women's Financial Literacy", level: 'Advanced' },
  'real-estate-investing':          { title: 'Real Estate Investing',           curriculum: "Women's Financial Literacy", level: 'Advanced' },
}

export async function generateMetadata({ params }: CertificatePageProps): Promise<Metadata> {
  const { courseSlug } = await params
  const course = COURSE_DISPLAY_NAMES[courseSlug]
  const title = course?.title ?? courseSlug.replace(/-/g, ' ')
  return {
    title: `Certificate of Completion: ${title} — The Purple Wings`,
    description: `Certificate of completion for ${title} from The Purple Wings financial literacy platform.`,
    robots: { index: false },
  }
}

export default async function CertificatePage({ params, searchParams }: CertificatePageProps) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth?returnTo=/certificate/' + (await params).courseSlug)

  const { courseSlug } = await params
  const { name: nameParam } = await searchParams

  const course = COURSE_DISPLAY_NAMES[courseSlug] ?? {
    title: courseSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    curriculum: "Women's Financial Literacy",
    level: 'Certificate',
  }

  // Prefer URL-provided name, then profile name, then email prefix
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user.id)
    .maybeSingle()

  const recipientName =
    nameParam ||
    profile?.full_name ||
    user.user_metadata?.full_name ||
    user.email?.split('@')[0] ||
    'Learner'

  const completionDate = new Date().toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  })

  const certificateUrl = `https://www.thepurplewings.org/certificate/${courseSlug}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-12 px-4">
      {/* Actions bar */}
      <div className="max-w-4xl mx-auto mb-8 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <Link href="/dashboard" className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1">
          ← Back to Dashboard
        </Link>
        <div className="flex gap-3">
          <PrintCertificateButton />
        </div>
      </div>

      {/* Certificate — also renders nicely when printed */}
      <div
        id="certificate"
        className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-double border-purple-300 print:shadow-none print:border-purple-400"
      >
        {/* Top banner */}
        <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 p-10 text-center">
          <div className="text-6xl mb-3">🦋</div>
          <h1 className="text-white text-3xl md:text-4xl font-extrabold tracking-tight mb-1">
            The Purple Wings
          </h1>
          <p className="text-purple-200 text-lg">Financial Empowerment for Women</p>
        </div>

        {/* Certificate body */}
        <div className="p-10 md:p-16 text-center">
          <p className="text-gray-500 uppercase tracking-[0.2em] text-sm font-semibold mb-6">
            Certificate of Completion
          </p>

          <p className="text-gray-700 text-xl mb-4">This is to certify that</p>

          <h2 className="text-4xl md:text-5xl font-extrabold text-purple-700 mb-6 border-b-4 border-purple-200 pb-4 max-w-md mx-auto">
            {recipientName}
          </h2>

          <p className="text-gray-700 text-xl mb-3">has successfully completed</p>

          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {course.title}
          </h3>
          <p className="text-purple-600 font-medium mb-2">{course.curriculum}</p>
          <span className="inline-block bg-purple-100 text-purple-700 text-sm font-semibold px-3 py-1 rounded-full mb-8">
            {course.level}
          </span>

          <p className="text-gray-500 text-sm mb-12">{completionDate}</p>

          {/* Signature area */}
          <div className="flex justify-center gap-16 md:gap-32 mb-10">
            <div className="text-center">
              <div className="h-0.5 w-32 bg-gray-400 mb-2 mx-auto"></div>
              <p className="text-gray-700 font-semibold">Shalini Jha</p>
              <p className="text-gray-500 text-sm">Founder & CEO</p>
            </div>
            <div className="text-center">
              <div className="h-0.5 w-32 bg-gray-400 mb-2 mx-auto"></div>
              <p className="text-gray-700 font-semibold">The Purple Wings</p>
              <p className="text-gray-500 text-sm">Financial Literacy Platform</p>
            </div>
          </div>

          {/* Verification */}
          <p className="text-gray-400 text-xs">
            Verify at{' '}
            <a href={certificateUrl} className="text-purple-500 hover:underline">
              {certificateUrl}
            </a>
          </p>
        </div>
      </div>

      {/* Share section */}
      <div className="max-w-4xl mx-auto mt-8 bg-white rounded-2xl shadow-lg p-6 print:hidden">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          🎉 Proud of your achievement? Share it!
        </h3>
        <ShareAchievement
          type="course"
          title={course.title}
          description={`I completed "${course.title}" — a free financial literacy course on The Purple Wings. Building financial independence one lesson at a time.`}
          url={certificateUrl}
        />
        <div className="mt-6 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600 mb-3">
            <strong>LinkedIn tip:</strong> Add this course to your LinkedIn profile under "Licenses &amp; Certifications" → Issuing organization: <em>The Purple Wings</em>
          </p>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium text-sm"
          >
            Continue learning → Browse next course
          </Link>
        </div>
      </div>

      <style>{`
        @media print {
          body * { visibility: hidden; }
          #certificate, #certificate * { visibility: visible; }
          #certificate { position: absolute; left: 0; top: 0; width: 100%; }
        }
      `}</style>
    </div>
  )
}
