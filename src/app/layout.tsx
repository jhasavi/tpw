import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navigation from "@/components/Navigation";
import CookieConsent from "@/components/CookieConsent";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import PageViewTracker from "@/components/analytics/PageViewTracker";
import { ThemeProvider } from "@/components/ThemeProvider";
import StructuredData from "@/components/StructuredData";
import FloatingQuizCTA from "@/components/FloatingQuizCTA";
import ErrorBoundary from "@/components/ErrorBoundary";
import BreadcrumbNavigation from "@/components/BreadcrumbNavigation";
import { Toaster } from "sonner";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";

const inter = Inter({ subsets: ["latin"] });
const janaganaTenantSlug = process.env.NEXT_PUBLIC_JANAGANA_TENANT_SLUG || 'purple-wings'
const janaganaApiUrl = process.env.NEXT_PUBLIC_JANAGANA_API_URL || 'https://janagana.namasteneedham.com'

export const metadata: Metadata = {
  title: {
    default: "The Purple Wings - Shalini Jha | Women's Financial Empowerment in Needham",
    template: "%s | The Purple Wings",
  },
  description: "Shalini Jha's The Purple Wings offers free financial education for women and girls in Needham. Achieve financial independence and self-empowerment through our comprehensive courses on budgeting, investing, and wealth building.",
  keywords: ["Shalini Jha", "women empowerment", "financial education", "Needham", "girl empowerment", "financial independence", "self-independent women", "women financial literacy", "budgeting courses", "investing education", "retirement planning", "wealth building", "financial empowerment"],
  icons: {
    icon: '/images/logo-nobg.png',
    shortcut: '/images/logo-nobg.png',
    apple: '/images/logo-nobg.png',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Purple Wing',
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.thepurplewings.org',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.thepurplewings.org',
    title: "The Purple Wings - Shalini Jha | Women's Financial Empowerment in Needham",
    description: 'Shalini Jha provides free financial education for women and girls in Needham. Achieve financial independence and self-empowerment through comprehensive courses.',
    siteName: 'The Purple Wings',
    images: [{ 
      url: '/images/Women-fin.png',
      width: 1200,
      height: 630,
      alt: 'Shalini Jha - The Purple Wings - Free Financial Education for Women',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "The Purple Wings - Shalini Jha | Women's Financial Empowerment",
    description: 'Shalini Jha offers free financial education for women and girls in Needham. Achieve financial independence and self-empowerment.',
    images: ['/images/Women-fin.png'],
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.thepurplewings.org'),
  authors: [{ name: 'The Purple Wings', url: 'https://www.thepurplewings.org/about' }],
  creator: 'The Purple Wings',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#9333ea',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://db.ckdshqbrxctjadljjhhy.supabase.co" />
        <link rel="preconnect" href="https://db.ckdshqbrxctjadljjhhy.supabase.co" />
        <meta name="theme-color" content="#9333ea" />
        <meta name="author" content="Shalini Jha" />
        <meta name="robots" content="index, follow" />
        <StructuredData />
        <GoogleAnalytics />
        <Script
          src={`${janaganaApiUrl}/janagana-embed.js`}
          strategy="afterInteractive"
        />
        <Script id="janagana-init" strategy="afterInteractive">
          {`
            (function initJanagana() {
              if (typeof window === 'undefined') return;

              var attempts = 0;
              var maxAttempts = 20;
              var tenantSlug = ${JSON.stringify(janaganaTenantSlug)};
              var apiUrl = ${JSON.stringify(janaganaApiUrl)};

              var tryInit = function() {
                if (window.Janagana && typeof window.Janagana.init === 'function') {
                  window.Janagana.init({ tenantSlug: tenantSlug, apiUrl: apiUrl });
                  return;
                }

                attempts += 1;
                if (attempts < maxAttempts) {
                  window.setTimeout(tryInit, 250);
                }
              };

              tryInit();
            })();
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          <ThemeProvider>
            <PageViewTracker />
            <Navigation />
            <BreadcrumbNavigation />
            {children}
            <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-bold mb-4 text-purple-300">The Purple Wings</h3>
                <p className="text-gray-400 text-sm mb-3">
                  Empowering women through free financial education and community support. A 501(c)(3) nonprofit.
                </p>
                <p className="text-gray-400 text-sm mb-1">
                  📧 <a href="mailto:info@thepurplewings.org" className="hover:text-white transition-colors">info@thepurplewings.org</a>
                </p>
                <p className="text-gray-400 text-sm">
                  📍 Needham, Massachusetts
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-purple-300">Learn</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="/courses" className="hover:text-white transition-colors">All Courses</a></li>
                  <li><a href="/learn/womens-financial-literacy" className="hover:text-white transition-colors">Women&apos;s Curriculum</a></li>
                  <li><a href="/learn/finra-40-hour" className="hover:text-white transition-colors">40-Hour Professional</a></li>
                  <li><a href="/quiz/personality" className="hover:text-white transition-colors">Take the Quiz</a></li>
                  <li><a href="/faq" className="hover:text-white transition-colors">FAQ</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-purple-300">Resources & Community</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="/stories" className="hover:text-white transition-colors">Success Stories</a></li>
                  <li><a href="/get-involved" className="hover:text-white transition-colors">Get Involved</a></li>
                  <li><a href="/events" className="hover:text-white transition-colors">Events</a></li>
                  <li><a href="/community" className="hover:text-white transition-colors">Community</a></li>
                  <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                  <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-purple-300">Stay Connected</h4>
                <p className="text-gray-400 text-sm mb-3">Get weekly financial tips in your inbox.</p>
                <a href="/newsletter/subscribe" className="inline-block bg-purple-600 hover:bg-purple-500 text-white text-sm px-4 py-2 rounded-lg transition-colors mb-4">
                  📬 Subscribe to Newsletter
                </a>
                <div className="flex gap-4 mt-2">
                  <a 
                    href="https://www.facebook.com/myPurpleWings/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label="Follow us on Facebook"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.instagram.com/thepurplewings/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label="Follow us on Instagram"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.linkedin.com/company/the-purple-wings/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label="Follow us on LinkedIn"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.youtube.com/@thepurplewings" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label="Subscribe on YouTube"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 dark:border-gray-700 pt-8 text-center text-sm text-gray-400">
              <p>&copy; {new Date().getFullYear()} The Purple Wings. All rights reserved. 501(c)(3) Nonprofit Organization.</p>
              <p className="mt-2 text-xs">
                Based in <span className="text-purple-400">Needham, Massachusetts</span>
              </p>
              <div className="mt-4 text-xs">
                <a href="/privacy" className="hover:text-white mx-2 transition-colors">Privacy Policy</a>
                <span>•</span>
                <a href="/terms" className="hover:text-white mx-2 transition-colors">Terms of Service</a>
                <span>•</span>
                <a href="/sitemap.xml" className="hover:text-white mx-2 transition-colors">Sitemap</a>
              </div>
            </div>
          </div>
        </footer>
        <FloatingQuizCTA />
        <CookieConsent />
        <Toaster />
        <ExitIntentPopup />
        </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
