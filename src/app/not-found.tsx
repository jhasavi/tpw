import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <Image
            src="/images/logo-nobg.png"
            alt="The Purple Wings"
            width={100}
            height={100}
            className="mx-auto mb-6"
          />
        </div>
        
        <h1 className="text-9xl font-bold text-purple-600 mb-4">404</h1>
        
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-xl text-gray-600 mb-8">
          Oops! The page you're looking for seems to have flown away. 
          Let's get you back on track to financial empowerment.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-lg"
          >
            ← Back to Home
          </Link>
          
          <Link
            href="/courses"
            className="inline-flex items-center justify-center px-8 py-3 border-2 border-purple-600 text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition-colors"
          >
            Browse Courses
          </Link>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600 mb-4">Looking for something specific?</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/about" className="text-purple-600 hover:text-purple-700 font-medium">
              About Us
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/events" className="text-purple-600 hover:text-purple-700 font-medium">
              Events
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/dashboard" className="text-purple-600 hover:text-purple-700 font-medium">
              Dashboard
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/community" className="text-purple-600 hover:text-purple-700 font-medium">
              Community
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
