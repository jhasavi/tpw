import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About The Purple Wings - Empowering Women Through Financial Education | Shalini Jha',
  description: 'Learn about The Purple Wings founder Shalini Jha and our mission to empower women through financial literacy. Founded during COVID-19 in Needham, MA, with support from Namaste Boston Homes, Needham Bank, ICON, and BJANE.',
  keywords: 'Shalini Jha, The Purple Wings, women financial education, Needham Massachusetts, COVID-19 initiative, Namaste Boston Homes, Needham Bank, financial literacy, Sanjeev Jha, women empowerment',
  openGraph: {
    title: 'About The Purple Wings - Founded by Shalini Jha',
    description: 'Empowering women through financial literacy since the COVID-19 pandemic. Based in Needham, MA.',
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
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
              Empowering women through financial literacy, community support, and educational excellence
            </p>
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
                <strong className="text-purple-600"> Shalini Jha</strong> recognized a critical need: women were 
                facing unprecedented financial challenges, yet lacked accessible resources to navigate them.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                From her home in <strong>Needham, Massachusetts</strong>, Shalini founded The Purple Wings with a 
                simple but powerful vision—to create a safe, welcoming space where women could build financial confidence 
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
                  "Every woman deserves the knowledge and confidence to control her financial future."
                </p>
                <p className="text-purple-600 font-semibold text-xs mt-2">— Shalini Jha, Founder & CEO</p>
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
                <p className="text-purple-600 font-medium mb-3">Founder & CEO</p>
                <p className="text-gray-600 mb-4">
                  Visionary founder who started The Purple Wings during COVID-19 to address the financial literacy gap. 
                  Based in Needham, MA, Shalini brings passion and expertise to women's financial education.
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
                    src="/images/Shweta.jpeg"
                    alt="Shweta"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Shweta</h3>
                <p className="text-green-600 font-medium mb-3">Community Helper</p>
                <p className="text-gray-600 mb-4">
                  Passionate volunteer who helps organize workshops and events. Shweta's dedication to empowering 
                  women through financial education has made a significant impact in our community.
                </p>
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">Namaste Boston Homes</h3>
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">ICON</h3>
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">Namaste Needham Lab</h3>
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
    </div>
  )
}
