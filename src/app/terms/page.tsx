import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | The Purple Wings',
  description: 'Terms of Service and User Agreement for The Purple Wings financial literacy platform.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Terms of Service</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Last Updated: November 30, 2025</p>

        <div className="prose prose-purple max-w-none dark:prose-invert">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 dark:text-gray-300">
              By accessing and using The Purple Wings ("Platform", "Service", "we", "us", or "our"), you accept and agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our Platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Description of Service</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              The Purple Wings is a financial literacy and education platform designed to empower women through:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Educational courses and lessons on personal finance</li>
              <li>Interactive quizzes and assessments</li>
              <li>Progress tracking and achievement systems</li>
              <li>Community resources and support</li>
              <li>Blog articles and financial tips</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Educational Purpose Only</h2>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-4">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Important Notice:</strong> The content provided on The Purple Wings is for educational and informational purposes only. 
                It does not constitute financial, investment, legal, or tax advice. We are not registered investment advisors or financial planners.
              </p>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              You should consult with qualified professionals before making any financial decisions. We do not guarantee any specific financial outcomes 
              from using our educational materials.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. User Accounts</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">To access certain features, you must create an account. You agree to:</p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your password and account</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Be responsible for all activities under your account</li>
              <li>Not share your account with others</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. User Conduct</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Use the Platform for any illegal purpose</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Post false, misleading, or inappropriate content</li>
              <li>Attempt to gain unauthorized access to the Platform</li>
              <li>Copy, distribute, or modify our content without permission</li>
              <li>Use automated systems to access the Platform (bots, scrapers)</li>
              <li>Impersonate others or misrepresent your affiliation</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Intellectual Property</h2>
            <p className="text-gray-600 dark:text-gray-300">
              All content on The Purple Wings, including but not limited to text, graphics, logos, courses, and software, is owned by 
              The Purple Wings or its licensors and protected by copyright, trademark, and other intellectual property laws.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              You may access and use the content for personal, non-commercial educational purposes only. You may not reproduce, distribute, 
              modify, or create derivative works without our express written permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Privacy</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Your use of the Platform is also governed by our Privacy Policy. By using the Platform, you consent to our collection 
              and use of your data as described in the Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Free Service and Pricing</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Currently, The Purple Wings offers its educational content free of charge. We reserve the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Introduce premium features or paid content in the future</li>
              <li>Modify or discontinue features at any time</li>
              <li>Change pricing with reasonable notice to users</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Disclaimer of Warranties</h2>
            <p className="text-gray-600 dark:text-gray-300">
              THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. 
              We do not warrant that the Platform will be uninterrupted, error-free, or free of viruses or other harmful components.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Limitation of Liability</h2>
            <p className="text-gray-600 dark:text-gray-300">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE PURPLE WINGS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, 
              SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR OTHER INTANGIBLE LOSSES 
              ARISING FROM YOUR USE OF THE PLATFORM.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">11. Termination</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We reserve the right to suspend or terminate your access to the Platform at any time, with or without cause or notice. 
              You may also terminate your account at any time by contacting us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">12. Changes to Terms</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We may modify these Terms of Service at any time. We will notify users of significant changes via email or Platform notice. 
              Continued use of the Platform after changes constitutes acceptance of the modified terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">13. Governing Law</h2>
            <p className="text-gray-600 dark:text-gray-300">
              These Terms shall be governed by and construed in accordance with the laws of the Commonwealth of Massachusetts, 
              without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">14. Contact Information</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300"><strong>The Purple Wings</strong></p>
              <p className="text-gray-600 dark:text-gray-400">Needham, Massachusetts</p>
              <p className="text-gray-600 dark:text-gray-400">Email: <a href="mailto:info@thepurplewings.org" className="text-purple-600 dark:text-purple-400 hover:underline">info@thepurplewings.org</a></p>
              <p className="text-gray-600 dark:text-gray-400">Website: <a href="https://www.thepurplewings.org" className="text-purple-600 dark:text-purple-400 hover:underline">www.thepurplewings.org</a></p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">15. Entire Agreement</h2>
            <p className="text-gray-600 dark:text-gray-300">
              These Terms of Service, together with our Privacy Policy, constitute the entire agreement between you and The Purple Wings 
              regarding the use of the Platform.
            </p>
          </section>

          <div className="mt-12 p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              By using The Purple Wings, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
