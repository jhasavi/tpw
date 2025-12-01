import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import DonateButton from '@/components/DonateButton'

export const metadata: Metadata = {
  title: 'About The Purple Wings - 501(c)(3) Nonprofit | Shalini Jha',
  description: 'Learn about The Purple Wings, a 501(c)(3) nonprofit founded by President Shalini Jha to empower women through financial literacy. Featured in Needham Observer and Boston 25 News. Based in Needham, MA.',
  keywords: 'Shalini Jha, The Purple Wings, 501c3 nonprofit, women financial education, Needham Massachusetts, COVID-19 initiative, Namaste Boston Homes, Needham Bank, financial literacy, Sanjeev Jha, women empowerment, Needham Observer, Aditi Pranjape',
  openGraph: {
    title: 'About The Purple Wings - 501(c)(3) Nonprofit Founded by Shalini Jha',
    description: 'Empowering women through financial literacy since the COVID-19 pandemic. Featured in media. Based in Needham, MA.',
    images: ['/images/Shalini.jpg'],
  }
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-6xl mb-6">🦋</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About The Purple Wings
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-4">
              A 501(c)(3) Nonprofit Organization
            </p>
            <p className="text-lg text-purple-100 max-w-3xl mx-auto mb-8">
              Empowering women through financial literacy, community support, and educational excellence
            </p>
            <div className="mt-6">
              <a href="https://needhamobserver.com/program-encourages-women-to-spread-financial-literacy-wings/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="inline-flex items-center bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                📰 Featured in Needham Observer
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story: Born from COVID-19 Crisis
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                During the COVID-19 pandemic, when the world stood still and uncertainty gripped every household, 
                <strong className="text-purple-600"> Shalini Jha</strong>, President and founder of The Purple Wings, 
                recognized a critical need: women were facing unprecedented financial challenges, yet lacked accessible 
                resources to navigate them.
              </p>
              <div className="bg-purple-50 border-l-4 border-purple-600 p-6 my-6 rounded-r-lg">
                <p className="text-gray-700 italic text-lg leading-relaxed">
                  "Every time I meet women from different backgrounds, I become more determined to help those who 
                  were not prepared for sudden changes in life. Financial literacy isn't just about money—it's about 
                  giving women the power to navigate life's uncertainties with confidence."
                </p>
                <p className="text-purple-600 font-semibold mt-3">— Shalini Jha, President & Founder</p>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                From her home in <strong>Needham, Massachusetts</strong>, Shalini founded The Purple Wings as a 
                <strong className="text-purple-600"> 501(c)(3) nonprofit organization</strong> with a simple but 
                powerful vision—to create a safe, welcoming space where women could build financial confidence 
                and independence, free from judgment and full of practical support.
              </p>
              <p className="text-lg text-gray-600">
                What started as community workshops in Needham has grown into a comprehensive online platform serving 
                women across Massachusetts and beyond, offering everything from basic budgeting to advanced investment 
                strategies—all designed specifically for women's unique financial journeys.
              </p>
            </div>
            <div className="relative">
              <div className="relative mx-auto w-full max-w-md rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/Shalini.jpg"
                  alt="Shalini Jha - Founder of The Purple Wings"
                  width={400}
                  height={400}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-6 max-w-xs hidden lg:block">
                <p className="text-gray-700 italic text-sm leading-relaxed">
                  "I want to see women not just survive, but thrive—regardless of their background or circumstances."
                </p>
                <p className="text-purple-600 font-semibold text-xs mt-2">— Shalini Jha, President & Founder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission & Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to closing the financial literacy gap for women through education, mentorship, and community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💪</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">Empowerment</h3>
              <p className="text-gray-600 text-center">Every woman deserves the knowledge and confidence to make informed financial decisions</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">Community</h3>
              <p className="text-gray-600 text-center">Building a supportive network where women can learn, share, and grow together</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📚</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">Education</h3>
              <p className="text-gray-600 text-center">Providing accessible, practical financial education that makes a real difference</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">Impact</h3>
              <p className="text-gray-600 text-center">Creating lasting change in women's financial lives and their families' futures</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team & Contributors */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dedicated professionals and community leaders working together to empower women
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src="/images/Shalini.jpg"
                    alt="Shalini Jha"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Shalini Jha</h3>
                <p className="text-purple-600 font-medium mb-3">President & Founder</p>
                <p className="text-gray-600 mb-4">
                  President and inspiration behind The Purple Wings. Featured in Needham Observer and Boston 25 News 
                  for her work empowering women. Based in Needham, MA, Shalini's personal journey and determination 
                  inspire thousands of women to take control of their financial futures.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src="/images/sanjeev.jpg"
                    alt="Sanjeev Jha"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Sanjeev Jha</h3>
                <p className="text-blue-600 font-medium mb-3">Technical Advisor & Contributor</p>
                <p className="text-gray-600 mb-4">
                  Provides technical expertise and real estate investment knowledge. Instrumental in developing 
                  the platform's technology infrastructure and contributing educational content on property investment.
                </p>
              </div>
            </div>

            <div className="bg-pink-50 p-6 rounded-xl border-2 border-pink-200">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src="/images/Bala.jpeg"
                    alt="Bala"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Bala</h3>
                <p className="text-pink-600 font-medium mb-3">Community Supporter</p>
                <p className="text-gray-600 mb-4">
                  Dedicated community supporter who has been instrumental in spreading awareness and helping women 
                  connect with The Purple Wings programs. A trusted friend and advocate for women's financial empowerment.
                </p>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src="/images/Aditi.jpeg"
                    alt="Aditi Pranjape"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Aditi Pranjape</h3>
                <p className="text-green-600 font-medium mb-3">Community Connector</p>
                <p className="text-gray-600 mb-4">
                  Co-founder and community connector who bridges gaps between women seeking financial knowledge 
                  and resources. A public health dietetic consultant, Aditi brings her passion for wellness to 
                  financial empowerment.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Volunteers */}
          <div className="mt-12 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Dedicated Volunteers</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md border border-purple-100">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Yulia</h4>
                <p className="text-purple-600 font-medium mb-3">Volunteer Educator</p>
                <p className="text-gray-600">
                  Passionate volunteer dedicated to helping women understand complex financial concepts through 
                  clear, accessible teaching and mentorship.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border border-purple-100">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Yashodhara</h4>
                <p className="text-purple-600 font-medium mb-3">Volunteer Educator</p>
                <p className="text-gray-600">
                  Committed volunteer who shares her expertise and time to ensure every woman has access to 
                  quality financial education and support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media Coverage */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Media Coverage</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              The Purple Wings has been featured in local and regional media for our impact on women's financial literacy
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-8 rounded-xl shadow-lg border-2 border-purple-200 dark:border-purple-800">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-4xl">📰</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    Needham Observer Feature
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    "Program encourages women to spread financial literacy wings" - A comprehensive feature on how 
                    Shalini Jha and her co-founders started The Purple Wings to help women overcome financial fear 
                    and build confidence through education and community support.
                  </p>
                  <a 
                    href="https://needhamobserver.com/program-encourages-women-to-spread-financial-literacy-wings/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold"
                  >
                    Read Full Article →
                  </a>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">Published: February 14, 2024</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 rounded-xl shadow-lg border-2 border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-4xl">📺</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    Boston 25 News Coverage
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    "She had no clue how much money she had" - Boston 25 News featured The Purple Wings, 
                    highlighting our mission to empower women through financial literacy and the impact we're 
                    making in the Greater Boston community.
                  </p>
                  <div className="flex gap-4">
                    <a 
                      href="https://www.boston25news.com/news/local/she-had-no-clue-how-much-money-she-had-local-group-empowering-women-understand-finances/JBGKMMBLRRHQPLIP564E6NCNUY/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold"
                    >
                      Watch on Boston 25 →
                    </a>
                    <a 
                      href="https://www.yahoo.com/news/she-had-no-clue-much-114224629.html" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold"
                    >
                      Read on Yahoo News →
                    </a>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">Television broadcast coverage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supporters & Partners */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Supporters & Partners</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Grateful for the organizations and institutions that believe in our mission
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Namaste Boston Homes */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-20 h-20 mx-auto mb-4 rounded-lg overflow-hidden">
                <Image
                  src="/images/Namaste-Boston.png"
                  alt="Namaste Boston Homes"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
                <a href="https://www.namastebostonhomes.com/" target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-purple-600 transition-colors">
                  Namaste Boston Homes
                </a>
              </h3>
              <p className="text-sm text-gray-600 text-center mb-3">Real Estate Partner</p>
              <p className="text-gray-600 text-sm">
                Supporting our mission through real estate expertise, homeownership education, and community outreach in the Greater Boston area.
              </p>
            </div>

            {/* Namaste Needham */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-20 h-20 mx-auto mb-4 rounded-lg bg-purple-100 flex items-center justify-center">
                <span className="text-3xl">🏠</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">Namaste Needham</h3>
              <p className="text-sm text-gray-600 text-center mb-3">Community Partner</p>
              <p className="text-gray-600 text-sm">
                Local community organization providing support and resources for women in the Needham area.
              </p>
            </div>

            {/* Needham Bank */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-20 h-20 mx-auto mb-4 rounded-lg bg-blue-100 flex items-center justify-center">
                <span className="text-3xl">🏦</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">Needham Bank</h3>
              <p className="text-sm text-gray-600 text-center mb-3">Financial Partner</p>
              <p className="text-gray-600 text-sm">
                Supporting financial literacy initiatives and providing banking education resources for our community.
              </p>
            </div>

            {/* Needham Schools */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-20 h-20 mx-auto mb-4 rounded-lg bg-green-100 flex items-center justify-center">
                <span className="text-3xl">🎓</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">Needham Schools</h3>
              <p className="text-sm text-gray-600 text-center mb-3">Education Partner</p>
              <p className="text-gray-600 text-sm">
                Collaborating on educational programs and providing venues for community workshops and events.
              </p>
            </div>

            {/* ICON */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-20 h-20 mx-auto mb-4 rounded-lg bg-orange-100 flex items-center justify-center">
                <span className="text-3xl">🤲</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
                <a href="https://hometownweekly.net/needham/icon-celebrates-indias-independence-day/" target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-purple-600 transition-colors">
                  ICON
                </a>
              </h3>
              <p className="text-sm text-gray-600 text-center mb-3">Non-Profit Partner</p>
              <p className="text-gray-600 text-sm">
                Community-focused non-profit supporting our educational outreach and community engagement initiatives.
              </p>
            </div>

            {/* BJANE */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-20 h-20 mx-auto mb-4 rounded-lg bg-pink-100 flex items-center justify-center">
                <span className="text-3xl">💖</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">BJANE</h3>
              <p className="text-sm text-gray-600 text-center mb-3">Non-Profit Partner</p>
              <p className="text-gray-600 text-sm">
                Dedicated non-profit organization supporting women's empowerment and financial independence initiatives.
              </p>
            </div>

            {/* Namaste Needham Lab */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-20 h-20 mx-auto mb-4 rounded-lg bg-purple-100 flex items-center justify-center">
                <span className="text-3xl">💻</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
                <a href="https://www.namasteneedham.com/" target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-purple-600 transition-colors">
                  Namaste Needham Lab
                </a>
              </h3>
              <p className="text-sm text-gray-600 text-center mb-3">Technical Partner</p>
              <p className="text-gray-600 text-sm">
                Providing comprehensive technical infrastructure, platform development, and technology support for our digital learning environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Together, we're creating measurable change in women's financial lives
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-gray-600">Women Served</div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-purple-600 mb-2">20+</div>
              <div className="text-gray-600">Courses Available</div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-purple-600 mb-2">12+</div>
              <div className="text-gray-600">Events Hosted</div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-gray-600">Free Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Women Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Why We Focus on Women</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                Women face unique financial challenges: the gender pay gap, career interruptions for caregiving, 
                longer lifespans requiring more retirement savings, and higher rates of financial abuse. Traditional 
                financial education often overlooks these realities. We don't.
              </p>
              <p className="mb-4">
                Our curriculum is designed specifically for women's financial journeys—from navigating divorce and 
                financial abuse to planning for solo retirement, from negotiating salaries to starting businesses, 
                from managing family finances to building generational wealth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Join Our Community
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Be part of a movement that's transforming how women think about and manage money. 
            Your financial independence starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Get Started Today
            </Link>
            <Link
              href="/community"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-purple-600 transition-colors"
            >
              Explore Community
            </Link>
          </div>
        </div>
      </section>

      {/* Support Our Mission - Donate */}
      <section className="py-16 bg-gradient-to-br from-purple-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Support Our Mission
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            As a 501(c)(3) nonprofit organization, we rely on donations to keep our financial education programs 
            free and accessible to all women. Your contribution helps us reach more women and expand our impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <DonateButton size="lg" variant="secondary" />
            <Link
              href="/partnerships"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold text-lg rounded-lg hover:bg-white hover:text-purple-600 transition-all"
            >
              Become a Partner
            </Link>
          </div>
          <p className="text-sm text-purple-200 mt-6">
            The Purple Wings is a registered 501(c)(3) nonprofit organization. Your donation may be tax-deductible.
          </p>
        </div>
      </section>
    </div>
  )
}
