import Image from 'next/image'

export default function TrustBar() {
  return (
    <section className="bg-white border-b border-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">
          Trusted &amp; Featured In
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {/* Needham Observer */}
          <a
            href="https://needhamobserver.com/program-encourages-women-to-spread-financial-literacy-wings/"
            target="_blank"
            rel="noopener noreferrer"
            className="grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100"
            aria-label="Featured in Needham Observer"
          >
            <Image
              src="/images/needhamobserver.webp"
              alt="Needham Observer"
              width={140}
              height={32}
              sizes="140px"
              className="h-8 w-[140px] object-contain"
            />
          </a>

          {/* Boston 25 News */}
          <a
            href="https://www.boston25news.com/news/local/she-had-no-clue-how-much-money-she-had-local-group-empowering-women-understand-finances/JBGKMMBLRRHQPLIP564E6NCNUY/"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-70 hover:opacity-100 transition-all"
            aria-label="Featured in Boston 25 News"
          >
            <span className="text-lg font-bold text-gray-500 hover:text-gray-800 transition-colors">
              Boston 25 News
            </span>
          </a>

          {/* 501(c)(3) Badge */}
          <div className="flex items-center gap-2 bg-purple-50 border border-purple-200 rounded-full px-4 py-2">
            <span className="text-purple-600 text-lg">✓</span>
            <span className="text-sm font-semibold text-purple-700">501(c)(3) Nonprofit</span>
          </div>

          {/* Free Badge */}
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-2">
            <span className="text-green-600 text-lg">💚</span>
            <span className="text-sm font-semibold text-green-700">100% Free Courses</span>
          </div>

          {/* FINRA Badge */}
          <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2">
            <span className="text-blue-600 text-lg">🎓</span>
            <span className="text-sm font-semibold text-blue-700">FINRA-Aligned Content</span>
          </div>
        </div>
      </div>
    </section>
  )
}
