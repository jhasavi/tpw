import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import PageViewTracker from "@/components/analytics/PageViewTracker";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Purple Wings - Women's Financial Empowerment by Shalini Jha",
  description: "Founded by Shalini Jha in Needham, Massachusetts. A one-stop online home where women can learn finance from basics to advanced, at their own pace. Technical support by Sanjeev Jha and Namaste Needham Lab.",
  keywords: ["Shalini Jha", "Shalini", "Sanjeev Jha", "Needham", "Needham MA", "Massachusetts", "financial literacy", "women empowerment", "finance education", "FINRA", "Namaste Needham Lab"],
  icons: {
    icon: '/images/logo-nobg.png',
    shortcut: '/images/logo-nobg.png',
    apple: '/images/logo-nobg.png',
  },
  manifest: '/manifest.json',
  themeColor: '#9333ea',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Purple Wing',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <GoogleAnalytics />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <PageViewTracker />
          <Navigation />
          {children}
          <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4">The Purple Wings</h3>
                <p className="text-gray-400 text-sm">
                  Empowering women through financial education and community support.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="/courses" className="hover:text-white">Courses</a></li>
                  <li><a href="/blog" className="hover:text-white">Blog</a></li>
                  <li><a href="/faq" className="hover:text-white">FAQ</a></li>
                  <li><a href="/about" className="hover:text-white">About</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Resources</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="/learn/womens-financial-literacy/financial-literacy-basics/self-assessment" className="hover:text-white">Take Quiz</a></li>
                  <li><a href="/newsletter/subscribe" className="hover:text-white">Newsletter</a></li>
                  <li><a href="/contact" className="hover:text-white">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Connect</h4>
                <div className="flex gap-4">
                  <a 
                    href="https://www.facebook.com/myPurpleWings/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    title="Facebook"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
              <p>&copy; {new Date().getFullYear()} The Purple Wings. All rights reserved.</p>
              <p className="mt-2 text-xs">
                Founded by <span className="text-purple-400">Shalini Jha</span> in Needham, MA | 
                Technical Support by <span className="text-purple-400">Sanjeev Jha</span> and{' '}
                <a href="https://namaste-needham-lab.org" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">
                  Namaste Needham Lab
                </a>
              </p>
            </div>
          </div>
        </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
